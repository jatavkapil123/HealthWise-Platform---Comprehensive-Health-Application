"""
Health Alerts API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.health_alerts import (
    HealthAlert, VitalSigns, MedicationReminder, EmergencyContact, HealthGoal,
    AlertType, AlertSeverity, AlertStatus
)
from app.schemas.health_alerts import (
    HealthAlertResponse, HealthAlertCreate, HealthAlertUpdate,
    VitalSignsResponse, VitalSignsCreate,
    MedicationReminderResponse, MedicationReminderCreate, MedicationReminderUpdate,
    EmergencyContactResponse, EmergencyContactCreate, EmergencyContactUpdate,
    HealthGoalResponse, HealthGoalCreate, HealthGoalUpdate,
    AlertSummary, HealthDashboard, EmergencyAlertCreate, EmergencyAlertResponse
)
from app.services.health_alerts import HealthAlertsService

router = APIRouter()

# Health Alerts Endpoints
@router.get("/alerts", response_model=List[HealthAlertResponse])
async def get_user_alerts(
    status: Optional[AlertStatus] = None,
    alert_type: Optional[AlertType] = None,
    limit: int = Query(50, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's health alerts with optional filtering"""
    service = HealthAlertsService(db)
    alerts = service.get_user_alerts(current_user.id, status, alert_type, limit)
    return alerts

@router.get("/alerts/summary", response_model=AlertSummary)
async def get_alerts_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get summary of user's alerts"""
    service = HealthAlertsService(db)
    
    # Get all alerts for summary
    all_alerts = service.get_user_alerts(current_user.id, limit=1000)
    active_alerts = [a for a in all_alerts if a.status == AlertStatus.ACTIVE]
    critical_alerts = [a for a in active_alerts if a.is_critical]
    
    # Group by type and severity
    alerts_by_type = {}
    alerts_by_severity = {}
    
    for alert in all_alerts:
        alerts_by_type[alert.alert_type.value] = alerts_by_type.get(alert.alert_type.value, 0) + 1
        alerts_by_severity[alert.severity.value] = alerts_by_severity.get(alert.severity.value, 0) + 1
    
    return AlertSummary(
        total_alerts=len(all_alerts),
        active_alerts=len(active_alerts),
        critical_alerts=len(critical_alerts),
        alerts_by_type=alerts_by_type,
        alerts_by_severity=alerts_by_severity,
        recent_alerts=all_alerts[:10]
    )

@router.post("/alerts", response_model=HealthAlertResponse)
async def create_alert(
    alert_data: HealthAlertCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new health alert"""
    # Ensure user can only create alerts for themselves (unless admin)
    if alert_data.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create alerts for other users"
        )
    
    alert = HealthAlert(**alert_data.dict())
    db.add(alert)
    db.commit()
    db.refresh(alert)
    
    return alert

@router.put("/alerts/{alert_id}", response_model=HealthAlertResponse)
async def update_alert(
    alert_id: int,
    alert_update: HealthAlertUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an alert (acknowledge, resolve, etc.)"""
    alert = db.query(HealthAlert).filter(
        HealthAlert.id == alert_id,
        HealthAlert.user_id == current_user.id
    ).first()
    
    if not alert:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    # Update alert fields
    for field, value in alert_update.dict(exclude_unset=True).items():
        setattr(alert, field, value)
    
    db.commit()
    db.refresh(alert)
    
    return alert

@router.post("/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(
    alert_id: int,
    action_taken: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Acknowledge an alert"""
    service = HealthAlertsService(db)
    success = service.acknowledge_alert(alert_id, current_user.id, action_taken)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    return {"message": "Alert acknowledged successfully"}

@router.post("/alerts/{alert_id}/resolve")
async def resolve_alert(
    alert_id: int,
    action_taken: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Resolve an alert"""
    service = HealthAlertsService(db)
    success = service.resolve_alert(alert_id, current_user.id, action_taken)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    return {"message": "Alert resolved successfully"}

# Vital Signs Endpoints
@router.get("/vital-signs", response_model=List[VitalSignsResponse])
async def get_vital_signs(
    limit: int = Query(50, le=100),
    days: int = Query(30, le=365),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's vital signs history"""
    start_date = datetime.utcnow() - timedelta(days=days)
    
    vital_signs = db.query(VitalSigns).filter(
        VitalSigns.user_id == current_user.id,
        VitalSigns.recorded_at >= start_date
    ).order_by(VitalSigns.recorded_at.desc()).limit(limit).all()
    
    return vital_signs

@router.post("/vital-signs", response_model=VitalSignsResponse)
async def record_vital_signs(
    vital_signs_data: VitalSignsCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Record new vital signs and analyze for alerts"""
    # Ensure user can only record for themselves
    if vital_signs_data.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot record vital signs for other users"
        )
    
    # Create vital signs record
    vital_signs = VitalSigns(**vital_signs_data.dict())
    db.add(vital_signs)
    db.commit()
    db.refresh(vital_signs)
    
    # Analyze vital signs and create alerts if needed
    service = HealthAlertsService(db)
    alerts = service.analyze_vital_signs(vital_signs)
    
    return vital_signs

# Medication Reminders Endpoints
@router.get("/medication-reminders", response_model=List[MedicationReminderResponse])
async def get_medication_reminders(
    active_only: bool = True,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's medication reminders"""
    query = db.query(MedicationReminder).filter(MedicationReminder.user_id == current_user.id)
    
    if active_only:
        query = query.filter(MedicationReminder.is_active == True)
    
    reminders = query.order_by(MedicationReminder.next_dose_time).all()
    return reminders

@router.post("/medication-reminders", response_model=MedicationReminderResponse)
async def create_medication_reminder(
    reminder_data: MedicationReminderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new medication reminder"""
    if reminder_data.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create reminders for other users"
        )
    
    # Calculate next dose time based on start date and frequency
    reminder = MedicationReminder(**reminder_data.dict())
    reminder.next_dose_time = reminder_data.start_date
    
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    
    return reminder

@router.put("/medication-reminders/{reminder_id}", response_model=MedicationReminderResponse)
async def update_medication_reminder(
    reminder_id: int,
    reminder_update: MedicationReminderUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a medication reminder"""
    reminder = db.query(MedicationReminder).filter(
        MedicationReminder.id == reminder_id,
        MedicationReminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medication reminder not found"
        )
    
    for field, value in reminder_update.dict(exclude_unset=True).items():
        setattr(reminder, field, value)
    
    db.commit()
    db.refresh(reminder)
    
    return reminder

@router.post("/medication-reminders/{reminder_id}/take-dose")
async def record_dose_taken(
    reminder_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Record that a medication dose was taken"""
    reminder = db.query(MedicationReminder).filter(
        MedicationReminder.id == reminder_id,
        MedicationReminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medication reminder not found"
        )
    
    # Update reminder
    reminder.last_taken = datetime.utcnow()
    reminder.total_doses += 1
    
    # Calculate next dose time (simplified - in production, use proper scheduling logic)
    if "daily" in reminder.frequency.lower():
        reminder.next_dose_time = reminder.next_dose_time + timedelta(days=1)
    elif "twice" in reminder.frequency.lower():
        reminder.next_dose_time = reminder.next_dose_time + timedelta(hours=12)
    elif "8 hours" in reminder.frequency.lower():
        reminder.next_dose_time = reminder.next_dose_time + timedelta(hours=8)
    
    db.commit()
    
    return {"message": "Dose recorded successfully", "next_dose": reminder.next_dose_time}

# Emergency Contacts Endpoints
@router.get("/emergency-contacts", response_model=List[EmergencyContactResponse])
async def get_emergency_contacts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's emergency contacts"""
    contacts = db.query(EmergencyContact).filter(
        EmergencyContact.user_id == current_user.id
    ).order_by(EmergencyContact.is_primary.desc(), EmergencyContact.name).all()
    
    return contacts

@router.post("/emergency-contacts", response_model=EmergencyContactResponse)
async def create_emergency_contact(
    contact_data: EmergencyContactCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new emergency contact"""
    if contact_data.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create contacts for other users"
        )
    
    # If this is set as primary, unset other primary contacts
    if contact_data.is_primary:
        db.query(EmergencyContact).filter(
            EmergencyContact.user_id == current_user.id,
            EmergencyContact.is_primary == True
        ).update({"is_primary": False})
    
    contact = EmergencyContact(**contact_data.dict())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    
    return contact

# Health Goals Endpoints
@router.get("/health-goals", response_model=List[HealthGoalResponse])
async def get_health_goals(
    active_only: bool = True,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's health goals"""
    query = db.query(HealthGoal).filter(HealthGoal.user_id == current_user.id)
    
    if active_only:
        query = query.filter(HealthGoal.is_active == True)
    
    goals = query.order_by(HealthGoal.target_date).all()
    return goals

@router.post("/health-goals", response_model=HealthGoalResponse)
async def create_health_goal(
    goal_data: HealthGoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new health goal"""
    if goal_data.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create goals for other users"
        )
    
    goal = HealthGoal(**goal_data.dict())
    db.add(goal)
    db.commit()
    db.refresh(goal)
    
    return goal

@router.put("/health-goals/{goal_id}/progress")
async def update_goal_progress(
    goal_id: int,
    current_value: float,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update progress on a health goal"""
    goal = db.query(HealthGoal).filter(
        HealthGoal.id == goal_id,
        HealthGoal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health goal not found"
        )
    
    goal.current_value = current_value
    goal.progress_percentage = min(100, (current_value / goal.target_value) * 100)
    goal.last_updated = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Progress updated successfully", "progress": goal.progress_percentage}

# Emergency Alert Endpoints
@router.post("/emergency-alert", response_model=EmergencyAlertResponse)
async def create_emergency_alert(
    emergency_data: EmergencyAlertCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create an emergency alert"""
    if emergency_data.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create emergency alerts for other users"
        )
    
    service = HealthAlertsService(db)
    alert = service.create_emergency_alert(emergency_data)
    
    # Get emergency contacts that were notified
    contacts = db.query(EmergencyContact).filter(
        EmergencyContact.user_id == current_user.id,
        EmergencyContact.notify_on_emergency == True
    ).all()
    
    return EmergencyAlertResponse(
        id=alert.id,
        user_id=alert.user_id,
        alert_sent=True,
        contacts_notified=[contact.name for contact in contacts],
        emergency_services_contacted=False,  # Would be implemented based on severity
        created_at=alert.created_at
    )

# Health Dashboard
@router.get("/dashboard", response_model=HealthDashboard)
async def get_health_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive health dashboard"""
    service = HealthAlertsService(db)
    
    # Get alert summary
    all_alerts = service.get_user_alerts(current_user.id, limit=1000)
    active_alerts = [a for a in all_alerts if a.status == AlertStatus.ACTIVE]
    critical_alerts = [a for a in active_alerts if a.is_critical]
    
    alerts_by_type = {}
    alerts_by_severity = {}
    for alert in all_alerts:
        alerts_by_type[alert.alert_type.value] = alerts_by_type.get(alert.alert_type.value, 0) + 1
        alerts_by_severity[alert.severity.value] = alerts_by_severity.get(alert.severity.value, 0) + 1
    
    alert_summary = AlertSummary(
        total_alerts=len(all_alerts),
        active_alerts=len(active_alerts),
        critical_alerts=len(critical_alerts),
        alerts_by_type=alerts_by_type,
        alerts_by_severity=alerts_by_severity,
        recent_alerts=all_alerts[:10]
    )
    
    # Get other dashboard data
    active_goals = db.query(HealthGoal).filter(
        HealthGoal.user_id == current_user.id,
        HealthGoal.is_active == True
    ).all()
    
    upcoming_reminders = db.query(MedicationReminder).filter(
        MedicationReminder.user_id == current_user.id,
        MedicationReminder.is_active == True,
        MedicationReminder.next_dose_time >= datetime.utcnow()
    ).order_by(MedicationReminder.next_dose_time).limit(5).all()
    
    emergency_contacts = db.query(EmergencyContact).filter(
        EmergencyContact.user_id == current_user.id
    ).all()
    
    health_summary = service.get_health_summary(current_user.id)
    
    return HealthDashboard(
        user_id=current_user.id,
        alert_summary=alert_summary,
        medication_adherence=[],  # Would be calculated from medication history
        active_goals=active_goals,
        upcoming_reminders=upcoming_reminders,
        emergency_contacts=emergency_contacts,
        health_score=health_summary.get("health_score"),
        recommendations=[
            "Keep tracking your vital signs regularly",
            "Take medications as prescribed",
            "Stay active and maintain your health goals",
            "Schedule regular check-ups with your doctor"
        ]
    )

# Background Tasks
@router.post("/check-reminders")
async def check_medication_reminders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check for medication reminders and create alerts (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    service = HealthAlertsService(db)
    alerts = service.check_medication_reminders()
    
    return {"message": f"Checked reminders, created {len(alerts)} alerts"}

@router.post("/check-health-goals")
async def check_health_goals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check health goals and create motivational alerts (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    service = HealthAlertsService(db)
    alerts = service.check_health_goals()
    
    return {"message": f"Checked health goals, created {len(alerts)} alerts"}