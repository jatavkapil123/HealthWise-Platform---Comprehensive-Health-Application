from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import uuid

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.prescriptions import Prescription, PrescriptionUpload
from app.schemas.prescriptions import (
    PrescriptionCreate,
    PrescriptionResponse,
    PrescriptionUploadCreate,
    PrescriptionUploadResponse
)

router = APIRouter()


@router.post("/", response_model=PrescriptionResponse)
def create_prescription(
    prescription: PrescriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new prescription (Doctor only)"""
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can create prescriptions")
    
    # Generate unique prescription number
    prescription_number = f"RX{datetime.utcnow().strftime('%Y%m%d')}{uuid.uuid4().hex[:8].upper()}"
    
    # Set validity (default 30 days)
    valid_until = prescription.valid_until or datetime.utcnow() + timedelta(days=30)
    
    db_prescription = Prescription(
        **prescription.dict(exclude={'valid_until'}),
        doctor_id=current_user.id,
        prescription_number=prescription_number,
        valid_until=valid_until,
        doctor_registration_number=current_user.registration_number if hasattr(current_user, 'registration_number') else None
    )
    
    db.add(db_prescription)
    db.commit()
    db.refresh(db_prescription)
    return db_prescription


@router.get("/", response_model=List[PrescriptionResponse])
def get_prescriptions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get prescriptions for current user"""
    if current_user.role == "doctor":
        # Doctors see prescriptions they created
        prescriptions = db.query(Prescription).filter(
            Prescription.doctor_id == current_user.id
        ).order_by(Prescription.created_at.desc()).all()
    else:
        # Patients see their own prescriptions
        prescriptions = db.query(Prescription).filter(
            Prescription.patient_id == current_user.id
        ).order_by(Prescription.created_at.desc()).all()
    
    return prescriptions


@router.get("/{prescription_id}", response_model=PrescriptionResponse)
def get_prescription(
    prescription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific prescription"""
    prescription = db.query(Prescription).filter(Prescription.id == prescription_id).first()
    
    if not prescription:
        raise HTTPException(status_code=404, detail="Prescription not found")
    
    # Check authorization
    if current_user.role not in ["admin", "doctor"] and prescription.patient_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this prescription")
    
    return prescription


@router.post("/upload", response_model=PrescriptionUploadResponse)
async def upload_prescription(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload a prescription image/PDF"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, and PDF allowed")
    
    # Read file
    contents = await file.read()
    file_size = len(contents)
    
    # Validate file size (max 5MB)
    if file_size > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")
    
    # In production, upload to cloud storage (S3, Cloudinary, etc.)
    # For now, we'll simulate with a local path
    file_url = f"/uploads/prescriptions/{current_user.id}/{uuid.uuid4().hex}_{file.filename}"
    
    # Create upload record
    db_upload = PrescriptionUpload(
        user_id=current_user.id,
        file_url=file_url,
        file_name=file.filename,
        file_size=file_size,
        file_type=file.content_type
    )
    
    db.add(db_upload)
    db.commit()
    db.refresh(db_upload)
    
    return db_upload


@router.get("/uploads/my", response_model=List[PrescriptionUploadResponse])
def get_my_uploads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's prescription uploads"""
    uploads = db.query(PrescriptionUpload).filter(
        PrescriptionUpload.user_id == current_user.id
    ).order_by(PrescriptionUpload.created_at.desc()).all()
    
    return uploads


@router.put("/uploads/{upload_id}/verify")
def verify_prescription_upload(
    upload_id: int,
    verification_notes: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Verify a prescription upload (Admin/Doctor only)"""
    if current_user.role not in ["admin", "doctor"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    upload = db.query(PrescriptionUpload).filter(PrescriptionUpload.id == upload_id).first()
    if not upload:
        raise HTTPException(status_code=404, detail="Upload not found")
    
    upload.is_verified = True
    upload.verified_by = current_user.id
    upload.verified_at = datetime.utcnow()
    upload.verification_notes = verification_notes
    
    db.commit()
    db.refresh(upload)
    
    return {"message": "Prescription verified successfully"}
