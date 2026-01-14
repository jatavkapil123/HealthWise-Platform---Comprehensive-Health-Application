"""
Appointment booking and management endpoints
"""

from typing import List, Optional
from datetime import date, datetime, time
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.appointments import (
    Appointment, Doctor, DoctorAvailability, AppointmentReview, 
    DoctorSchedule, AppointmentType, AppointmentStatus, 
    ConsultationType, DoctorSpecialization
)
from app.schemas.appointments import (
    AppointmentCreate, AppointmentResponse, DoctorResponse,
    DoctorAvailabilityResponse, AppointmentReviewCreate,
    AppointmentUpdate, DoctorCreate, DoctorScheduleResponse
)

router = APIRouter()

@router.get("/doctors", response_model=List[DoctorResponse])
async def get_doctors(
    specialization: Optional[DoctorSpecialization] = None,
    city: Optional[str] = None,
    available_today: bool = False,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get list of doctors with optional filters"""
    query = db.query(Doctor).join(User).filter(
        Doctor.is_available == True,
        Doctor.is_verified == True,
        User.is_active == True
    )
    
    if specialization:
        query = query.filter(Doctor.specialization == specialization)
    
    if city:
        query = query.filter(User.city.ilike(f"%{city}%"))
    
    if available_today:
        today = date.today()
        query = query.join(DoctorSchedule).filter(
            DoctorSchedule.schedule_date == today,
            DoctorSchedule.available_slots > 0,
            DoctorSchedule.is_active == True
        )
    
    doctors = query.offset(skip).limit(limit).all()
    
    # Convert to response format with user details
    result = []
    for doctor in doctors:
        user = db.query(User).filter(User.id == doctor.user_id).first()
        if user:
            doctor_data = {
                "id": doctor.id,
                "user_id": doctor.user_id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "city": user.city,
                "state": user.state,
                "specialization": doctor.specialization,
                "sub_specialization": doctor.sub_specialization,
                "qualification": doctor.qualification,
                "experience_years": doctor.experience_years,
                "consultation_fee": doctor.consultation_fee,
                "languages": doctor.languages,
                "rating": doctor.rating,
                "total_reviews": doctor.total_reviews,
                "total_consultations": doctor.total_consultations,
                "clinic_name": doctor.clinic_name,
                "clinic_address": doctor.clinic_address,
                "is_available": doctor.is_available
            }
            result.append(doctor_data)
    
    return result

@router.get("/doctors/{doctor_id}", response_model=DoctorResponse)
async def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    """Get doctor details by ID"""
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    
    user = db.query(User).filter(User.id == doctor.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor user not found"
        )
    
    return {
        "id": doctor.id,
        "user_id": doctor.user_id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone": user.phone,
        "city": user.city,
        "state": user.state,
        "specialization": doctor.specialization,
        "sub_specialization": doctor.sub_specialization,
        "qualification": doctor.qualification,
        "experience_years": doctor.experience_years,
        "consultation_fee": doctor.consultation_fee,
        "languages": doctor.languages,
        "rating": doctor.rating,
        "total_reviews": doctor.total_reviews,
        "total_consultations": doctor.total_consultations,
        "clinic_name": doctor.clinic_name,
        "clinic_address": doctor.clinic_address,
        "is_available": doctor.is_available
    }

@router.get("/doctors/{doctor_id}/availability", response_model=List[DoctorScheduleResponse])
async def get_doctor_availability(
    doctor_id: int,
    start_date: date = Query(...),
    end_date: Optional[date] = None,
    db: Session = Depends(get_db)
):
    """Get doctor availability for date range"""
    if not end_date:
        end_date = start_date
    
    schedules = db.query(DoctorSchedule).filter(
        DoctorSchedule.doctor_id == doctor_id,
        DoctorSchedule.schedule_date >= start_date,
        DoctorSchedule.schedule_date <= end_date,
        DoctorSchedule.is_active == True,
        DoctorSchedule.available_slots > 0
    ).all()
    
    return [
        {
            "id": schedule.id,
            "doctor_id": schedule.doctor_id,
            "schedule_date": schedule.schedule_date,
            "start_time": schedule.start_time,
            "end_time": schedule.end_time,
            "total_slots": schedule.total_slots,
            "booked_slots": schedule.booked_slots,
            "available_slots": schedule.available_slots,
            "is_active": schedule.is_active
        }
        for schedule in schedules
    ]

@router.post("/appointments", response_model=AppointmentResponse)
async def book_appointment(
    appointment_data: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Book a new appointment"""
    # Verify doctor exists and is available
    doctor = db.query(Doctor).filter(
        Doctor.id == appointment_data.doctor_id,
        Doctor.is_available == True,
        Doctor.is_verified == True
    ).first()
    
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found or not available"
        )
    
    # Check if slot is available
    schedule = db.query(DoctorSchedule).filter(
        DoctorSchedule.doctor_id == appointment_data.doctor_id,
        DoctorSchedule.schedule_date == appointment_data.appointment_date,
        DoctorSchedule.start_time <= appointment_data.appointment_time,
        DoctorSchedule.end_time > appointment_data.appointment_time,
        DoctorSchedule.available_slots > 0,
        DoctorSchedule.is_active == True
    ).first()
    
    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected time slot is not available"
        )
    
    # Check for existing appointment at same time
    existing_appointment = db.query(Appointment).filter(
        Appointment.doctor_id == appointment_data.doctor_id,
        Appointment.appointment_date == appointment_data.appointment_date,
        Appointment.appointment_time == appointment_data.appointment_time,
        Appointment.status.in_([AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED])
    ).first()
    
    if existing_appointment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Time slot already booked"
        )
    
    # Create appointment
    appointment = Appointment(
        patient_id=current_user.id,
        doctor_id=appointment_data.doctor_id,
        appointment_type=appointment_data.appointment_type,
        consultation_type=appointment_data.consultation_type,
        appointment_date=appointment_data.appointment_date,
        appointment_time=appointment_data.appointment_time,
        duration_minutes=appointment_data.duration_minutes or 30,
        chief_complaint=appointment_data.chief_complaint,
        symptoms=appointment_data.symptoms,
        medical_history=appointment_data.medical_history,
        current_medications=appointment_data.current_medications,
        consultation_fee=doctor.consultation_fee,
        status=AppointmentStatus.SCHEDULED
    )
    
    db.add(appointment)
    
    # Update schedule availability
    schedule.booked_slots += 1
    schedule.available_slots -= 1
    
    db.commit()
    db.refresh(appointment)
    
    return {
        "id": appointment.id,
        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,
        "appointment_type": appointment.appointment_type,
        "consultation_type": appointment.consultation_type,
        "status": appointment.status,
        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,
        "duration_minutes": appointment.duration_minutes,
        "chief_complaint": appointment.chief_complaint,
        "symptoms": appointment.symptoms,
        "medical_history": appointment.medical_history,
        "current_medications": appointment.current_medications,
        "consultation_fee": appointment.consultation_fee,
        "payment_status": appointment.payment_status,
        "created_at": appointment.created_at
    }

@router.get("/appointments", response_model=List[AppointmentResponse])
async def get_user_appointments(
    status: Optional[AppointmentStatus] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's appointments"""
    query = db.query(Appointment).filter(Appointment.patient_id == current_user.id)
    
    if status:
        query = query.filter(Appointment.status == status)
    
    appointments = query.order_by(Appointment.appointment_date.desc(), Appointment.appointment_time.desc()).offset(skip).limit(limit).all()
    
    return [
        {
            "id": appointment.id,
            "patient_id": appointment.patient_id,
            "doctor_id": appointment.doctor_id,
            "appointment_type": appointment.appointment_type,
            "consultation_type": appointment.consultation_type,
            "status": appointment.status,
            "appointment_date": appointment.appointment_date,
            "appointment_time": appointment.appointment_time,
            "duration_minutes": appointment.duration_minutes,
            "chief_complaint": appointment.chief_complaint,
            "symptoms": appointment.symptoms,
            "medical_history": appointment.medical_history,
            "current_medications": appointment.current_medications,
            "consultation_notes": appointment.consultation_notes,
            "diagnosis": appointment.diagnosis,
            "prescription": appointment.prescription,
            "consultation_fee": appointment.consultation_fee,
            "payment_status": appointment.payment_status,
            "meeting_link": appointment.meeting_link,
            "created_at": appointment.created_at
        }
        for appointment in appointments
    ]

@router.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get appointment details"""
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.patient_id == current_user.id
    ).first()
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    return {
        "id": appointment.id,
        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,
        "appointment_type": appointment.appointment_type,
        "consultation_type": appointment.consultation_type,
        "status": appointment.status,
        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,
        "duration_minutes": appointment.duration_minutes,
        "chief_complaint": appointment.chief_complaint,
        "symptoms": appointment.symptoms,
        "medical_history": appointment.medical_history,
        "current_medications": appointment.current_medications,
        "consultation_notes": appointment.consultation_notes,
        "diagnosis": appointment.diagnosis,
        "prescription": appointment.prescription,
        "consultation_fee": appointment.consultation_fee,
        "payment_status": appointment.payment_status,
        "meeting_link": appointment.meeting_link,
        "created_at": appointment.created_at
    }

@router.put("/appointments/{appointment_id}/cancel")
async def cancel_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Cancel an appointment"""
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.patient_id == current_user.id,
        Appointment.status.in_([AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED])
    ).first()
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or cannot be cancelled"
        )
    
    # Update appointment status
    appointment.status = AppointmentStatus.CANCELLED
    
    # Free up the slot
    schedule = db.query(DoctorSchedule).filter(
        DoctorSchedule.doctor_id == appointment.doctor_id,
        DoctorSchedule.schedule_date == appointment.appointment_date
    ).first()
    
    if schedule:
        schedule.booked_slots -= 1
        schedule.available_slots += 1
    
    db.commit()
    
    return {"message": "Appointment cancelled successfully"}

@router.post("/appointments/{appointment_id}/review", response_model=dict)
async def add_appointment_review(
    appointment_id: int,
    review_data: AppointmentReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add review for completed appointment"""
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.patient_id == current_user.id,
        Appointment.status == AppointmentStatus.COMPLETED
    ).first()
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or not completed"
        )
    
    # Check if review already exists
    existing_review = db.query(AppointmentReview).filter(
        AppointmentReview.appointment_id == appointment_id
    ).first()
    
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review already exists for this appointment"
        )
    
    # Create review
    review = AppointmentReview(
        appointment_id=appointment_id,
        patient_id=current_user.id,
        doctor_id=appointment.doctor_id,
        rating=review_data.rating,
        review_text=review_data.review_text,
        doctor_rating=review_data.doctor_rating,
        communication_rating=review_data.communication_rating,
        treatment_rating=review_data.treatment_rating,
        overall_experience=review_data.overall_experience,
        would_recommend=review_data.would_recommend
    )
    
    db.add(review)
    
    # Update doctor's rating
    doctor = db.query(Doctor).filter(Doctor.id == appointment.doctor_id).first()
    if doctor:
        total_rating = (doctor.rating * doctor.total_reviews) + review_data.rating
        doctor.total_reviews += 1
        doctor.rating = total_rating / doctor.total_reviews
    
    db.commit()
    
    return {"message": "Review added successfully"}

@router.get("/specializations")
async def get_specializations():
    """Get list of available specializations"""
    return [
        {"value": spec.value, "label": spec.value.replace("_", " ").title()}
        for spec in DoctorSpecialization
    ]

@router.get("/appointment-types")
async def get_appointment_types():
    """Get list of appointment types"""
    return [
        {"value": apt_type.value, "label": apt_type.value.replace("_", " ").title()}
        for apt_type in AppointmentType
    ]

@router.get("/consultation-types")
async def get_consultation_types():
    """Get list of consultation types"""
    return [
        {"value": cons_type.value, "label": cons_type.value.replace("_", " ").title()}
        for cons_type in ConsultationType
    ]