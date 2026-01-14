"""
Health reports and medical records models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class ReportType(str, enum.Enum):
    LAB_RESULT = "lab-result"
    CONSULTATION_SUMMARY = "consultation-summary"
    PRESCRIPTION = "prescription"
    HEALTH_CHECKUP = "health-checkup"
    VACCINATION_RECORD = "vaccination-record"
    MEDICAL_HISTORY = "medical-history"
    IMAGING_REPORT = "imaging-report"

class ReportStatus(str, enum.Enum):
    NORMAL = "normal"
    ABNORMAL = "abnormal"
    CRITICAL = "critical"
    PENDING = "pending"
    REVIEWED = "reviewed"

class HealthReport(Base):
    __tablename__ = "health_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    report_number = Column(String(50), unique=True, nullable=False, index=True)
    
    # Patient Information
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Report Details
    report_type = Column(Enum(ReportType), nullable=False)
    title = Column(String(255), nullable=False)
    summary = Column(Text, nullable=False)
    
    # Medical Information
    findings = Column(JSON)  # List of key findings
    recommendations = Column(JSON)  # List of recommendations
    diagnosis = Column(Text)
    treatment_plan = Column(Text)
    
    # Associated Records
    lab_booking_id = Column(Integer, ForeignKey("lab_bookings.id"))
    consultation_id = Column(Integer, ForeignKey("consultations.id"))
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    
    # Healthcare Provider Information
    doctor_name = Column(String(255))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    lab_name = Column(String(255))
    hospital_name = Column(String(255))
    
    # Report Files
    report_file_url = Column(String(500))
    report_file_path = Column(String(500))
    additional_files = Column(JSON)  # List of additional file URLs
    
    # Report Status
    overall_status = Column(Enum(ReportStatus), default=ReportStatus.PENDING)
    
    # Sharing and Privacy
    is_shared = Column(Boolean, default=False)
    shared_with = Column(JSON)  # List of people/doctors shared with
    sharing_permissions = Column(JSON)  # Sharing permission settings
    
    # Tags and Categories
    tags = Column(JSON)  # List of tags for categorization
    medical_categories = Column(JSON)  # Medical category tags
    
    # Review and Verification
    is_reviewed = Column(Boolean, default=False)
    reviewed_by = Column(String(255))
    reviewed_at = Column(DateTime(timezone=True))
    review_notes = Column(Text)
    
    # Report Metadata
    report_date = Column(DateTime(timezone=True), nullable=False)
    test_date = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="health_reports")
    lab_booking = relationship("LabBooking")
    consultation = relationship("Consultation")
    prescription = relationship("Prescription")
    doctor = relationship("Doctor")

class MedicalHistory(Base):
    __tablename__ = "medical_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Medical Conditions
    chronic_conditions = Column(JSON)  # List of chronic conditions
    past_surgeries = Column(JSON)  # List of past surgeries
    allergies = Column(JSON)  # List of allergies
    current_medications = Column(JSON)  # List of current medications
    
    # Family History
    family_medical_history = Column(JSON)  # Family medical history
    
    # Lifestyle Information
    smoking_status = Column(String(50))
    alcohol_consumption = Column(String(50))
    exercise_frequency = Column(String(50))
    diet_type = Column(String(50))
    
    # Vital Statistics
    height_cm = Column(Integer)
    weight_kg = Column(Integer)
    blood_group = Column(String(5))
    
    # Emergency Contact
    emergency_contact_name = Column(String(255))
    emergency_contact_phone = Column(String(20))
    emergency_contact_relation = Column(String(50))
    
    # Insurance Information
    insurance_provider = Column(String(255))
    insurance_policy_number = Column(String(100))
    insurance_expiry_date = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")

class VaccinationRecord(Base):
    __tablename__ = "vaccination_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Vaccine Information
    vaccine_name = Column(String(255), nullable=False)
    vaccine_type = Column(String(100))
    manufacturer = Column(String(255))
    batch_number = Column(String(100))
    
    # Administration Details
    administered_date = Column(DateTime(timezone=True), nullable=False)
    administered_by = Column(String(255))
    healthcare_facility = Column(String(255))
    
    # Dosage Information
    dose_number = Column(Integer)  # 1st dose, 2nd dose, etc.
    total_doses_required = Column(Integer)
    next_dose_due_date = Column(DateTime(timezone=True))
    
    # Side Effects and Notes
    side_effects = Column(Text)
    notes = Column(Text)
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verification_certificate_url = Column(String(500))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")

class HealthMetric(Base):
    __tablename__ = "health_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Metric Information
    metric_type = Column(String(50), nullable=False)  # heart-rate, blood-pressure, etc.
    value = Column(String(100), nullable=False)
    unit = Column(String(20), nullable=False)
    
    # Additional Data
    systolic = Column(Integer)  # For blood pressure
    diastolic = Column(Integer)  # For blood pressure
    notes = Column(Text)
    
    # Source Information
    device_id = Column(String(100))
    device_name = Column(String(255))
    measurement_method = Column(String(100))  # manual, automatic, device
    
    # Context
    measured_at_location = Column(String(255))
    measured_by = Column(String(255))
    
    # Timestamps
    measured_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")

class ReportShare(Base):
    __tablename__ = "report_shares"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("health_reports.id"), nullable=False)
    shared_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Sharing Details
    shared_with_email = Column(String(255))
    shared_with_phone = Column(String(20))
    shared_with_doctor_id = Column(Integer, ForeignKey("doctors.id"))
    
    # Permissions
    can_view = Column(Boolean, default=True)
    can_download = Column(Boolean, default=False)
    can_share = Column(Boolean, default=False)
    
    # Expiry
    expires_at = Column(DateTime(timezone=True))
    
    # Access Tracking
    access_count = Column(Integer, default=0)
    last_accessed_at = Column(DateTime(timezone=True))
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    report = relationship("HealthReport")
    shared_by = relationship("User")
    shared_with_doctor = relationship("Doctor")