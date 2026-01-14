"""
Appointment-related Pydantic schemas
"""

from typing import Optional, List
from datetime import date, time, datetime
from pydantic import BaseModel, Field, validator

from app.models.appointments import (
    AppointmentType, AppointmentStatus, ConsultationType, DoctorSpecialization
)

class AppointmentCreate(BaseModel):
    doctor_id: int
    appointment_type: AppointmentType
    consultation_type: ConsultationType
    appointment_date: date
    appointment_time: time
    duration_minutes: Optional[int] = 30
    chief_complaint: Optional[str] = None
    symptoms: Optional[str] = None
    medical_history: Optional[str] = None
    current_medications: Optional[str] = None

    @validator('appointment_date')
    def validate_appointment_date(cls, v):
        if v < date.today():
            raise ValueError('Appointment date cannot be in the past')
        return v

class AppointmentUpdate(BaseModel):
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    chief_complaint: Optional[str] = None
    symptoms: Optional[str] = None
    medical_history: Optional[str] = None
    current_medications: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    appointment_type: AppointmentType
    consultation_type: ConsultationType
    status: AppointmentStatus
    appointment_date: date
    appointment_time: time
    duration_minutes: int
    chief_complaint: Optional[str]
    symptoms: Optional[str]
    medical_history: Optional[str]
    current_medications: Optional[str]
    consultation_notes: Optional[str]
    diagnosis: Optional[str]
    prescription: Optional[str]
    consultation_fee: float
    payment_status: str
    meeting_link: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class DoctorCreate(BaseModel):
    user_id: int
    license_number: str
    specialization: DoctorSpecialization
    sub_specialization: Optional[str] = None
    qualification: str
    experience_years: int
    clinic_name: Optional[str] = None
    clinic_address: Optional[str] = None
    consultation_fee: float
    languages: Optional[str] = None

class DoctorResponse(BaseModel):
    id: int
    user_id: int
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    city: Optional[str]
    state: Optional[str]
    specialization: DoctorSpecialization
    sub_specialization: Optional[str]
    qualification: str
    experience_years: int
    consultation_fee: float
    languages: Optional[str]
    rating: float
    total_reviews: int
    total_consultations: int
    clinic_name: Optional[str]
    clinic_address: Optional[str]
    is_available: bool

    class Config:
        from_attributes = True

class DoctorAvailabilityResponse(BaseModel):
    id: int
    doctor_id: int
    day_of_week: int
    start_time: time
    end_time: time
    slot_duration: int
    specific_date: Optional[date]
    is_available: bool

    class Config:
        from_attributes = True

class DoctorScheduleResponse(BaseModel):
    id: int
    doctor_id: int
    schedule_date: date
    start_time: time
    end_time: time
    total_slots: int
    booked_slots: int
    available_slots: int
    is_active: bool

    class Config:
        from_attributes = True

class AppointmentReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    review_text: Optional[str] = None
    doctor_rating: Optional[int] = Field(None, ge=1, le=5)
    communication_rating: Optional[int] = Field(None, ge=1, le=5)
    treatment_rating: Optional[int] = Field(None, ge=1, le=5)
    overall_experience: Optional[int] = Field(None, ge=1, le=5)
    would_recommend: Optional[bool] = None

class AppointmentReviewResponse(BaseModel):
    id: int
    appointment_id: int
    patient_id: int
    doctor_id: int
    rating: int
    review_text: Optional[str]
    doctor_rating: Optional[int]
    communication_rating: Optional[int]
    treatment_rating: Optional[int]
    overall_experience: Optional[int]
    would_recommend: Optional[bool]
    created_at: datetime

    class Config:
        from_attributes = True

class TimeSlot(BaseModel):
    time: time
    available: bool
    booked: bool = False

class DoctorAvailabilitySlots(BaseModel):
    date: date
    slots: List[TimeSlot]
    total_slots: int
    available_slots: int
    booked_slots: int