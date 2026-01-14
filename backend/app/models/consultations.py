"""
Doctor consultation and appointment models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class ConsultationType(str, enum.Enum):
    VIDEO = "video"
    AUDIO = "audio"
    CHAT = "chat"

class ConsultationStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no-show"

class DoctorSpecialization(str, enum.Enum):
    GENERAL_PHYSICIAN = "General Physician"
    CARDIOLOGIST = "Cardiologist"
    DERMATOLOGIST = "Dermatologist"
    GYNECOLOGIST = "Gynecologist"
    PEDIATRICIAN = "Pediatrician"
    ORTHOPEDIC = "Orthopedic"
    NEUROLOGIST = "Neurologist"
    PSYCHIATRIST = "Psychiatrist"
    ENDOCRINOLOGIST = "Endocrinologist"
    GASTROENTEROLOGIST = "Gastroenterologist"
    PULMONOLOGIST = "Pulmonologist"
    UROLOGIST = "Urologist"
    OPHTHALMOLOGIST = "Ophthalmologist"
    ENT = "ENT Specialist"
    DENTIST = "Dentist"

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Professional Information
    license_number = Column(String(100), unique=True, nullable=False)
    specialization = Column(JSON)  # List of specializations
    qualification = Column(JSON)  # List of qualifications
    experience_years = Column(Integer, nullable=False)
    
    # Consultation Details
    consultation_fee = Column(Float, nullable=False)
    languages = Column(JSON)  # List of languages spoken
    consultation_types = Column(JSON)  # List of supported consultation types
    
    # Profile Information
    about = Column(Text)
    hospital_affiliations = Column(JSON)  # List of hospitals
    
    # Ratings and Reviews
    average_rating = Column(Float, default=0)
    total_reviews = Column(Integer, default=0)
    total_consultations = Column(Integer, default=0)
    
    # Availability
    is_available = Column(Boolean, default=True)
    next_available_slot = Column(DateTime(timezone=True))
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verified_at = Column(DateTime(timezone=True))
    verified_by = Column(String(255))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")
    availability_slots = relationship("DoctorAvailability", back_populates="doctor")
    consultations = relationship("Consultation", back_populates="doctor")

class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"
    
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Availability Details
    day_of_week = Column(String(10), nullable=False)  # monday, tuesday, etc.
    start_time = Column(String(10), nullable=False)  # "09:00"
    end_time = Column(String(10), nullable=False)    # "17:00"
    slot_duration = Column(Integer, default=30)      # minutes
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    doctor = relationship("Doctor", back_populates="availability_slots")

class Consultation(Base):
    __tablename__ = "consultations"
    
    id = Column(Integer, primary_key=True, index=True)
    consultation_number = Column(String(50), unique=True, nullable=False, index=True)
    
    # Participants
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Consultation Details
    consultation_type = Column(Enum(ConsultationType), nullable=False)
    appointment_date = Column(DateTime(timezone=True), nullable=False)
    duration_minutes = Column(Integer, default=30)
    
    # Reason and Symptoms
    reason_for_visit = Column(Text, nullable=False)
    symptoms = Column(JSON)  # List of symptoms
    patient_notes = Column(Text)
    
    # Consultation Fee
    consultation_fee = Column(Float, nullable=False)
    payment_status = Column(String(20), default="pending")
    
    # Status
    status = Column(Enum(ConsultationStatus), default=ConsultationStatus.SCHEDULED)
    
    # Meeting Information
    meeting_link = Column(String(500))
    meeting_id = Column(String(100))
    meeting_password = Column(String(50))
    
    # Consultation Notes
    doctor_notes = Column(Text)
    diagnosis = Column(Text)
    treatment_plan = Column(Text)
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(DateTime(timezone=True))
    
    # Prescription
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    started_at = Column(DateTime(timezone=True))
    ended_at = Column(DateTime(timezone=True))
    
    # Relationships
    patient = relationship("User", back_populates="consultations")
    doctor = relationship("Doctor", back_populates="consultations")
    prescription = relationship("Prescription", back_populates="consultation")

class Prescription(Base):
    __tablename__ = "prescriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    prescription_number = Column(String(50), unique=True, nullable=False, index=True)
    
    # Patient and Doctor
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Prescription Details
    diagnosis = Column(Text, nullable=False)
    medications = Column(JSON, nullable=False)  # List of prescribed medications
    
    # Instructions
    general_instructions = Column(Text)
    dietary_instructions = Column(Text)
    lifestyle_recommendations = Column(Text)
    
    # Validity
    valid_until = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Digital Signature
    digital_signature = Column(String(500))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    patient = relationship("User")
    doctor = relationship("Doctor")
    consultation = relationship("Consultation", back_populates="prescription")

class ConsultationReview(Base):
    __tablename__ = "consultation_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    consultation_id = Column(Integer, ForeignKey("consultations.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    
    # Review Details
    rating = Column(Integer, nullable=False)  # 1-5 stars
    review_text = Column(Text)
    
    # Review Categories
    communication_rating = Column(Integer)
    treatment_effectiveness = Column(Integer)
    punctuality_rating = Column(Integer)
    
    # Status
    is_verified = Column(Boolean, default=False)
    is_public = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    consultation = relationship("Consultation")
    patient = relationship("User")
    doctor = relationship("Doctor")