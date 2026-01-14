"""
Appointment booking and management models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum, Float, ForeignKey, Date, Time
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from datetime import datetime, date, time

from app.core.database import Base

class AppointmentType(str, enum.Enum):
    CONSULTATION = "consultation"
    FOLLOW_UP = "follow_up"
    EMERGENCY = "emergency"
    SCREENING = "screening"
    VACCINATION = "vaccination"
    THERAPY = "therapy"
    DIAGNOSTIC = "diagnostic"

class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"
    RESCHEDULED = "rescheduled"

class ConsultationType(str, enum.Enum):
    VIDEO = "video"
    AUDIO = "audio"
    CHAT = "chat"
    IN_PERSON = "in_person"

class DoctorSpecialization(str, enum.Enum):
    GENERAL_PHYSICIAN = "general_physician"
    CARDIOLOGIST = "cardiologist"
    DERMATOLOGIST = "dermatologist"
    GYNECOLOGIST = "gynecologist"
    PEDIATRICIAN = "pediatrician"
    ORTHOPEDIC = "orthopedic"
    NEUROLOGIST = "neurologist"
    PSYCHIATRIST = "psychiatrist"
    ENDOCRINOLOGIST = "endocrinologist"
    GASTROENTEROLOGIST = "gastroenterologist"
    PULMONOLOGIST = "pulmonologist"
    UROLOGIST = "urologist"
    OPHTHALMOLOGIST = "ophthalmologist"
    ENT = "ent"
    DENTIST = "dentist"
    AYURVEDA = "ayurveda"
    HOMEOPATHY = "homeopathy"

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Professional Information
    license_number = Column(String(100), unique=True, nullable=False)
    specialization = Column(Enum(DoctorSpecialization), nullable=False)
    sub_specialization = Column(String(255))
    qualification = Column(Text, nullable=False)  # JSON string of qualifications
    experience_years = Column(Integer, nullable=False)
    
    # Practice Information
    clinic_name = Column(String(255))
    clinic_address = Column(Text)
    consultation_fee = Column(Float, nullable=False)
    languages = Column(Text)  # JSON string of languages
    
    # Availability
    available_days = Column(Text)  # JSON string of available days
    available_hours = Column(Text)  # JSON string of time slots
    
    # Ratings and Reviews
    rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    total_consultations = Column(Integer, default=0)
    
    # Status
    is_verified = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Doctor(id={self.id}, specialization='{self.specialization}')>"

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Appointment Details
    appointment_type = Column(Enum(AppointmentType), nullable=False)
    consultation_type = Column(Enum(ConsultationType), nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED)
    
    # Scheduling
    appointment_date = Column(Date, nullable=False)
    appointment_time = Column(Time, nullable=False)
    duration_minutes = Column(Integer, default=30)
    
    # Patient Information
    chief_complaint = Column(Text)
    symptoms = Column(Text)  # JSON string of symptoms
    medical_history = Column(Text)
    current_medications = Column(Text)
    
    # Consultation Details
    consultation_notes = Column(Text)
    diagnosis = Column(Text)
    prescription = Column(Text)
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(Date)
    
    # Payment
    consultation_fee = Column(Float, nullable=False)
    payment_status = Column(String(50), default="pending")
    payment_method = Column(String(50))
    
    # Meeting Details (for online consultations)
    meeting_link = Column(String(500))
    meeting_id = Column(String(100))
    meeting_password = Column(String(100))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<Appointment(id={self.id}, patient_id={self.patient_id}, doctor_id={self.doctor_id})>"

class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"
    
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Availability Details
    day_of_week = Column(Integer, nullable=False)  # 0=Monday, 6=Sunday
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    slot_duration = Column(Integer, default=30)  # minutes
    
    # Special Dates
    specific_date = Column(Date)  # For specific date availability
    is_available = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<DoctorAvailability(doctor_id={self.doctor_id}, day={self.day_of_week})>"

class AppointmentReview(Base):
    __tablename__ = "appointment_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Review Details
    rating = Column(Integer, nullable=False)  # 1-5 stars
    review_text = Column(Text)
    
    # Review Categories
    doctor_rating = Column(Integer)
    communication_rating = Column(Integer)
    treatment_rating = Column(Integer)
    overall_experience = Column(Integer)
    
    # Recommendations
    would_recommend = Column(Boolean)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<AppointmentReview(appointment_id={self.appointment_id}, rating={self.rating})>"

class DoctorSchedule(Base):
    __tablename__ = "doctor_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Schedule Details
    schedule_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    
    # Slot Information
    total_slots = Column(Integer, nullable=False)
    booked_slots = Column(Integer, default=0)
    available_slots = Column(Integer, nullable=False)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<DoctorSchedule(doctor_id={self.doctor_id}, date={self.schedule_date})>"