"""
Health Alerts and Monitoring Models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

from app.core.database import Base

class AlertType(str, enum.Enum):
    VITAL_SIGNS = "vital_signs"
    MEDICATION = "medication"
    APPOINTMENT = "appointment"
    LAB_RESULT = "lab_result"
    EMERGENCY = "emergency"
    HEALTH_REMINDER = "health_reminder"
    CHRONIC_CONDITION = "chronic_condition"
    PREVENTIVE_CARE = "preventive_care"

class AlertSeverity(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"
    EMERGENCY = "emergency"

class AlertStatus(str, enum.Enum):
    ACTIVE = "active"
    ACKNOWLEDGED = "acknowledged"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"

class HealthAlert(Base):
    __tablename__ = "health_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Alert Information
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    alert_type = Column(Enum(AlertType), nullable=False)
    severity = Column(Enum(AlertSeverity), nullable=False)
    status = Column(Enum(AlertStatus), default=AlertStatus.ACTIVE)
    
    # Alert Data
    alert_data = Column(JSON)  # Store additional alert-specific data
    source = Column(String(100))  # Source of the alert (device, manual, system)
    
    # Timing
    triggered_at = Column(DateTime(timezone=True), server_default=func.now())
    acknowledged_at = Column(DateTime(timezone=True))
    resolved_at = Column(DateTime(timezone=True))
    expires_at = Column(DateTime(timezone=True))
    
    # Actions
    action_required = Column(Boolean, default=False)
    action_taken = Column(Text)
    
    # Notifications
    notification_sent = Column(Boolean, default=False)
    email_sent = Column(Boolean, default=False)
    sms_sent = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<HealthAlert(id={self.id}, type='{self.alert_type}', severity='{self.severity}')>"
    
    @property
    def is_active(self):
        return self.status == AlertStatus.ACTIVE
    
    @property
    def is_critical(self):
        return self.severity in [AlertSeverity.CRITICAL, AlertSeverity.EMERGENCY]
    
    @property
    def is_expired(self):
        if self.expires_at:
            return datetime.utcnow() > self.expires_at
        return False

class VitalSigns(Base):
    __tablename__ = "vital_signs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Vital Signs Data
    heart_rate = Column(Integer)  # BPM
    systolic_bp = Column(Integer)  # mmHg
    diastolic_bp = Column(Integer)  # mmHg
    temperature = Column(Float)  # Celsius
    oxygen_saturation = Column(Float)  # Percentage
    respiratory_rate = Column(Integer)  # Breaths per minute
    blood_glucose = Column(Float)  # mg/dL
    weight = Column(Float)  # kg
    height = Column(Float)  # cm
    
    # Metadata
    device_id = Column(String(100))
    location = Column(String(255))
    notes = Column(Text)
    
    # Timestamps
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<VitalSigns(id={self.id}, user_id={self.user_id}, recorded_at='{self.recorded_at}')>"

class MedicationReminder(Base):
    __tablename__ = "medication_reminders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Medication Information
    medication_name = Column(String(255), nullable=False)
    dosage = Column(String(100), nullable=False)
    frequency = Column(String(100), nullable=False)  # "twice daily", "every 8 hours"
    instructions = Column(Text)
    
    # Timing
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True))
    next_dose_time = Column(DateTime(timezone=True), nullable=False)
    
    # Settings
    is_active = Column(Boolean, default=True)
    reminder_enabled = Column(Boolean, default=True)
    snooze_minutes = Column(Integer, default=15)
    
    # Tracking
    total_doses = Column(Integer, default=0)
    missed_doses = Column(Integer, default=0)
    last_taken = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<MedicationReminder(id={self.id}, medication='{self.medication_name}')>"

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Contact Information
    name = Column(String(255), nullable=False)
    relationship = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255))
    address = Column(Text)
    
    # Settings
    is_primary = Column(Boolean, default=False)
    notify_on_emergency = Column(Boolean, default=True)
    notify_on_alerts = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<EmergencyContact(id={self.id}, name='{self.name}', relationship='{self.relationship}')>"

class HealthGoal(Base):
    __tablename__ = "health_goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Goal Information
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))  # weight_loss, exercise, medication_adherence
    target_value = Column(Float)
    current_value = Column(Float, default=0)
    unit = Column(String(50))
    
    # Timing
    start_date = Column(DateTime(timezone=True), nullable=False)
    target_date = Column(DateTime(timezone=True), nullable=False)
    
    # Settings
    is_active = Column(Boolean, default=True)
    reminder_enabled = Column(Boolean, default=True)
    
    # Progress Tracking
    progress_percentage = Column(Float, default=0)
    last_updated = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<HealthGoal(id={self.id}, title='{self.title}', progress={self.progress_percentage}%)>"
    
    @property
    def is_completed(self):
        return self.progress_percentage >= 100
    
    @property
    def days_remaining(self):
        if self.target_date:
            delta = self.target_date - datetime.utcnow()
            return max(0, delta.days)
        return 0