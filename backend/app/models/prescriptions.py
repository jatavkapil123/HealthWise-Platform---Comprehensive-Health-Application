from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)
    consultation_id = Column(Integer, ForeignKey("consultations.id"), nullable=True)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Prescription details
    prescription_number = Column(String(100), unique=True, index=True)
    diagnosis = Column(Text)
    symptoms = Column(Text)
    
    # Medications
    medications = Column(JSON)  # List of {name, dosage, frequency, duration, instructions}
    
    # Lab tests recommended
    lab_tests_recommended = Column(JSON)  # List of test names
    
    # Follow-up
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(DateTime(timezone=True))
    follow_up_notes = Column(Text)
    
    # Additional instructions
    dietary_instructions = Column(Text)
    lifestyle_advice = Column(Text)
    precautions = Column(Text)
    
    # Validity
    valid_until = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)
    
    # Digital signature
    doctor_signature_url = Column(String(500))
    doctor_registration_number = Column(String(100))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    doctor = relationship("User", foreign_keys=[doctor_id])
    patient = relationship("User", foreign_keys=[patient_id])


class PrescriptionUpload(Base):
    __tablename__ = "prescription_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Upload details
    file_url = Column(String(500), nullable=False)
    file_name = Column(String(200))
    file_size = Column(Integer)  # in bytes
    file_type = Column(String(50))  # image/pdf
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verified_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime(timezone=True))
    verification_notes = Column(Text)
    
    # Extracted information (if OCR is used)
    extracted_medicines = Column(JSON)
    extracted_doctor_name = Column(String(200))
    extracted_date = Column(DateTime(timezone=True))
    
    # Usage
    used_for_order_id = Column(Integer, nullable=True)
    is_used = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    verified_by_user = relationship("User", foreign_keys=[verified_by])
