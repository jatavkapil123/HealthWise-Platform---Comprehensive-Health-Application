"""
User model for authentication and user management
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum, Date
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    LAB_TECHNICIAN = "lab_technician"

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    
    # Personal Information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, index=True)
    date_of_birth = Column(Date)
    gender = Column(Enum(Gender))
    
    # Address Information
    address_line1 = Column(String(255))
    address_line2 = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    country = Column(String(100), default="India")
    
    # Account Status
    role = Column(Enum(UserRole), default=UserRole.PATIENT)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    email_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)
    
    # Profile Information
    avatar_url = Column(String(500))
    bio = Column(Text)
    
    # Emergency Contact
    emergency_contact_name = Column(String(100))
    emergency_contact_phone = Column(String(20))
    emergency_contact_relation = Column(String(50))
    
    # Medical Information (for patients)
    blood_group = Column(String(5))
    allergies = Column(Text)
    chronic_conditions = Column(Text)
    current_medications = Column(Text)
    
    # Professional Information (for doctors)
    license_number = Column(String(100))
    specialization = Column(String(255))
    qualification = Column(String(500))
    experience_years = Column(Integer)
    consultation_fee = Column(Integer)  # in rupees
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True))
    
    # Relationships will be added after all models are defined
    # lab_bookings = relationship("LabBooking", back_populates="user")
    # consultations = relationship("Consultation", back_populates="patient")
    # medicine_orders = relationship("MedicineOrder", back_populates="user")
    # health_reports = relationship("HealthReport", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_patient(self):
        return self.role == UserRole.PATIENT
    
    @property
    def is_doctor(self):
        return self.role == UserRole.DOCTOR
    
    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN