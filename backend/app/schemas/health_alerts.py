"""
Health Alerts and Monitoring Schemas
"""

from pydantic import BaseModel, validator
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class AlertType(str, Enum):
    VITAL_SIGNS = "vital_signs"
    MEDICATION = "medication"
    APPOINTMENT = "appointment"
    LAB_RESULT = "lab_result"
    EMERGENCY = "emergency"
    HEALTH_REMINDER = "health_reminder"
    CHRONIC_CONDITION = "chronic_condition"
    PREVENTIVE_CARE = "preventive_care"

class AlertSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"
    EMERGENCY = "emergency"

class AlertStatus(str, Enum):
    ACTIVE = "active"
    ACKNOWLEDGED = "acknowledged"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"

# Health Alert Schemas
class HealthAlertBase(BaseModel):
    title: str
    message: str
    alert_type: AlertType
    severity: AlertSeverity
    alert_data: Optional[Dict[str, Any]] = None
    source: Optional[str] = None
    action_required: bool = False
    expires_at: Optional[datetime] = None

class HealthAlertCreate(HealthAlertBase):
    user_id: int

class HealthAlertUpdate(BaseModel):
    status: Optional[AlertStatus] = None
    action_taken: Optional[str] = None
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None

class HealthAlertResponse(HealthAlertBase):
    id: int
    user_id: int
    status: AlertStatus
    triggered_at: datetime
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    notification_sent: bool
    email_sent: bool
    sms_sent: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Vital Signs Schemas
class VitalSignsBase(BaseModel):
    heart_rate: Optional[int] = None
    systolic_bp: Optional[int] = None
    diastolic_bp: Optional[int] = None
    temperature: Optional[float] = None
    oxygen_saturation: Optional[float] = None
    respiratory_rate: Optional[int] = None
    blood_glucose: Optional[float] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    device_id: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class VitalSignsCreate(VitalSignsBase):
    user_id: int

class VitalSignsResponse(VitalSignsBase):
    id: int
    user_id: int
    recorded_at: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True

# Medication Reminder Schemas
class MedicationReminderBase(BaseModel):
    medication_name: str
    dosage: str
    frequency: str
    instructions: Optional[str] = None
    start_date: datetime
    end_date: Optional[datetime] = None
    reminder_enabled: bool = True
    snooze_minutes: int = 15

class MedicationReminderCreate(MedicationReminderBase):
    user_id: int

class MedicationReminderUpdate(BaseModel):
    medication_name: Optional[str] = None
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    instructions: Optional[str] = None
    end_date: Optional[datetime] = None
    is_active: Optional[bool] = None
    reminder_enabled: Optional[bool] = None
    snooze_minutes: Optional[int] = None

class MedicationReminderResponse(MedicationReminderBase):
    id: int
    user_id: int
    next_dose_time: datetime
    is_active: bool
    total_doses: int
    missed_doses: int
    last_taken: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Emergency Contact Schemas
class EmergencyContactBase(BaseModel):
    name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    is_primary: bool = False
    notify_on_emergency: bool = True
    notify_on_alerts: bool = False

class EmergencyContactCreate(EmergencyContactBase):
    user_id: int

class EmergencyContactUpdate(BaseModel):
    name: Optional[str] = None
    relationship: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    is_primary: Optional[bool] = None
    notify_on_emergency: Optional[bool] = None
    notify_on_alerts: Optional[bool] = None

class EmergencyContactResponse(EmergencyContactBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Health Goal Schemas
class HealthGoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    target_value: float
    unit: str
    start_date: datetime
    target_date: datetime
    reminder_enabled: bool = True

class HealthGoalCreate(HealthGoalBase):
    user_id: int

class HealthGoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_value: Optional[float] = None
    current_value: Optional[float] = None
    unit: Optional[str] = None
    target_date: Optional[datetime] = None
    is_active: Optional[bool] = None
    reminder_enabled: Optional[bool] = None

class HealthGoalResponse(HealthGoalBase):
    id: int
    user_id: int
    current_value: float
    is_active: bool
    progress_percentage: float
    last_updated: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Alert Summary Schemas
class AlertSummary(BaseModel):
    total_alerts: int
    active_alerts: int
    critical_alerts: int
    alerts_by_type: Dict[str, int]
    alerts_by_severity: Dict[str, int]
    recent_alerts: List[HealthAlertResponse]

class VitalSignsAnalysis(BaseModel):
    user_id: int
    analysis_date: datetime
    heart_rate_status: str
    blood_pressure_status: str
    temperature_status: str
    oxygen_status: str
    overall_status: str
    recommendations: List[str]
    alerts_generated: List[HealthAlertResponse]

# Emergency Alert Schemas
class EmergencyAlertCreate(BaseModel):
    user_id: int
    alert_type: str
    severity: AlertSeverity
    location: Optional[str] = None
    vital_signs: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    contact_emergency_contacts: bool = True

class EmergencyAlertResponse(BaseModel):
    id: int
    user_id: int
    alert_sent: bool
    contacts_notified: List[str]
    emergency_services_contacted: bool
    response_time: Optional[float] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Medication Adherence Schemas
class MedicationAdherence(BaseModel):
    user_id: int
    medication_id: int
    adherence_percentage: float
    doses_taken: int
    doses_missed: int
    total_scheduled: int
    period_start: datetime
    period_end: datetime
    
class MedicationDoseLog(BaseModel):
    medication_reminder_id: int
    taken_at: datetime
    scheduled_time: datetime
    was_on_time: bool
    notes: Optional[str] = None

# Health Monitoring Dashboard
class HealthDashboard(BaseModel):
    user_id: int
    alert_summary: AlertSummary
    vital_signs_summary: Optional[VitalSignsAnalysis] = None
    medication_adherence: List[MedicationAdherence]
    active_goals: List[HealthGoalResponse]
    upcoming_reminders: List[MedicationReminderResponse]
    emergency_contacts: List[EmergencyContactResponse]
    health_score: Optional[float] = None
    recommendations: List[str]