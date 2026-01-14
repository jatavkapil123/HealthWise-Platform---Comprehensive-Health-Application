"""
Health Alerts Service - Business logic for health monitoring and alerts
"""

from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import logging

from app.models.health_alerts import (
    HealthAlert, VitalSigns, MedicationReminder, EmergencyContact, HealthGoal,
    AlertType, AlertSeverity, AlertStatus
)
from app.models.user import User
from app.schemas.health_alerts import (
    HealthAlertCreate, VitalSignsCreate, EmergencyAlertCreate
)
from app.services.email import email_service

logger = logging.getLogger(__name__)

class HealthAlertsService:
    
    def __init__(self, db: Session):
        self.db = db
    
    # Vital Signs Analysis
    def analyze_vital_signs(self, vital_signs: VitalSigns) -> List[HealthAlert]:
        """Analyze vital signs and generate alerts if needed"""
        alerts = []
        user_id = vital_signs.user_id
        
        # Heart Rate Analysis
        if vital_signs.heart_rate:
            if vital_signs.heart_rate < 50:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="Low Heart Rate Alert",
                    message=f"Your heart rate is {vital_signs.heart_rate} BPM, which is below normal range (60-100 BPM). Please consult a doctor.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.HIGH,
                    alert_data={"heart_rate": vital_signs.heart_rate, "normal_range": "60-100 BPM"}
                ))
            elif vital_signs.heart_rate > 120:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="High Heart Rate Alert",
                    message=f"Your heart rate is {vital_signs.heart_rate} BPM, which is above normal range (60-100 BPM). Consider rest and hydration.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.MEDIUM,
                    alert_data={"heart_rate": vital_signs.heart_rate, "normal_range": "60-100 BPM"}
                ))
        
        # Blood Pressure Analysis
        if vital_signs.systolic_bp and vital_signs.diastolic_bp:
            if vital_signs.systolic_bp >= 180 or vital_signs.diastolic_bp >= 120:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="Critical Blood Pressure Alert",
                    message=f"Your blood pressure is {vital_signs.systolic_bp}/{vital_signs.diastolic_bp} mmHg, which is critically high. Seek immediate medical attention.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.CRITICAL,
                    alert_data={"systolic": vital_signs.systolic_bp, "diastolic": vital_signs.diastolic_bp}
                ))
            elif vital_signs.systolic_bp >= 140 or vital_signs.diastolic_bp >= 90:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="High Blood Pressure Alert",
                    message=f"Your blood pressure is {vital_signs.systolic_bp}/{vital_signs.diastolic_bp} mmHg, which is elevated. Monitor closely and consult your doctor.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.HIGH,
                    alert_data={"systolic": vital_signs.systolic_bp, "diastolic": vital_signs.diastolic_bp}
                ))
        
        # Temperature Analysis
        if vital_signs.temperature:
            if vital_signs.temperature >= 38.5:  # Celsius
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="High Fever Alert",
                    message=f"Your temperature is {vital_signs.temperature}°C, indicating fever. Monitor symptoms and consider medical consultation.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.MEDIUM,
                    alert_data={"temperature": vital_signs.temperature, "unit": "Celsius"}
                ))
            elif vital_signs.temperature <= 35.0:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="Low Body Temperature Alert",
                    message=f"Your temperature is {vital_signs.temperature}°C, which is below normal. Seek warmth and medical attention if persistent.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.HIGH,
                    alert_data={"temperature": vital_signs.temperature, "unit": "Celsius"}
                ))
        
        # Oxygen Saturation Analysis
        if vital_signs.oxygen_saturation:
            if vital_signs.oxygen_saturation < 90:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="Low Oxygen Saturation Alert",
                    message=f"Your oxygen saturation is {vital_signs.oxygen_saturation}%, which is below normal (95-100%). Seek immediate medical attention.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.CRITICAL,
                    alert_data={"oxygen_saturation": vital_signs.oxygen_saturation, "normal_range": "95-100%"}
                ))
        
        # Blood Glucose Analysis
        if vital_signs.blood_glucose:
            if vital_signs.blood_glucose > 250:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="High Blood Sugar Alert",
                    message=f"Your blood glucose is {vital_signs.blood_glucose} mg/dL, which is very high. Check ketones and contact your doctor immediately.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.CRITICAL,
                    alert_data={"blood_glucose": vital_signs.blood_glucose, "unit": "mg/dL"}
                ))
            elif vital_signs.blood_glucose < 70:
                alerts.append(self._create_alert(
                    user_id=user_id,
                    title="Low Blood Sugar Alert",
                    message=f"Your blood glucose is {vital_signs.blood_glucose} mg/dL, which is low. Consume fast-acting carbohydrates immediately.",
                    alert_type=AlertType.VITAL_SIGNS,
                    severity=AlertSeverity.HIGH,
                    alert_data={"blood_glucose": vital_signs.blood_glucose, "unit": "mg/dL"}
                ))
        
        return alerts
    
    def _create_alert(self, user_id: int, title: str, message: str, alert_type: AlertType, 
                     severity: AlertSeverity, alert_data: Dict[str, Any] = None) -> HealthAlert:
        """Create and save a health alert"""
        alert = HealthAlert(
            user_id=user_id,
            title=title,
            message=message,
            alert_type=alert_type,
            severity=severity,
            alert_data=alert_data,
            source="system_analysis",
            action_required=severity in [AlertSeverity.HIGH, AlertSeverity.CRITICAL, AlertSeverity.EMERGENCY]
        )
        
        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)
        
        # Send notifications for critical alerts
        if severity in [AlertSeverity.CRITICAL, AlertSeverity.EMERGENCY]:
            self._send_alert_notifications(alert)
        
        return alert
    
    def _send_alert_notifications(self, alert: HealthAlert):
        """Send notifications for critical alerts"""
        try:
            # Get user information
            user = self.db.query(User).filter(User.id == alert.user_id).first()
            if not user:
                return
            
            # Send email notification
            if user.email:
                email_sent = email_service.send_health_alert_email(
                    user.email,
                    user.full_name,
                    alert.title,
                    alert.message,
                    alert.severity.value
                )
                alert.email_sent = email_sent
            
            # Get emergency contacts for critical/emergency alerts
            if alert.severity == AlertSeverity.EMERGENCY:
                emergency_contacts = self.db.query(EmergencyContact).filter(
                    EmergencyContact.user_id == alert.user_id,
                    EmergencyContact.notify_on_emergency == True
                ).all()
                
                for contact in emergency_contacts:
                    if contact.email:
                        email_service.send_emergency_alert_email(
                            contact.email,
                            contact.name,
                            user.full_name,
                            alert.title,
                            alert.message
                        )
            
            alert.notification_sent = True
            self.db.commit()
            
        except Exception as e:
            logger.error(f"Failed to send alert notifications: {e}")
    
    # Medication Reminders
    def check_medication_reminders(self) -> List[HealthAlert]:
        """Check for missed medications and create alerts"""
        alerts = []
        current_time = datetime.utcnow()
        
        # Find overdue medications
        overdue_reminders = self.db.query(MedicationReminder).filter(
            MedicationReminder.is_active == True,
            MedicationReminder.reminder_enabled == True,
            MedicationReminder.next_dose_time < current_time
        ).all()
        
        for reminder in overdue_reminders:
            # Calculate how late the medication is
            delay_minutes = (current_time - reminder.next_dose_time).total_seconds() / 60
            
            if delay_minutes > 60:  # More than 1 hour late
                severity = AlertSeverity.HIGH
            elif delay_minutes > 30:  # More than 30 minutes late
                severity = AlertSeverity.MEDIUM
            else:
                severity = AlertSeverity.LOW
            
            alert = self._create_alert(
                user_id=reminder.user_id,
                title=f"Missed Medication: {reminder.medication_name}",
                message=f"You missed your {reminder.medication_name} dose scheduled for {reminder.next_dose_time.strftime('%I:%M %p')}. Please take it now if safe to do so.",
                alert_type=AlertType.MEDICATION,
                severity=severity,
                alert_data={
                    "medication_name": reminder.medication_name,
                    "scheduled_time": reminder.next_dose_time.isoformat(),
                    "delay_minutes": int(delay_minutes)
                }
            )
            alerts.append(alert)
            
            # Update missed doses count
            reminder.missed_doses += 1
            self.db.commit()
        
        return alerts
    
    # Health Goals Monitoring
    def check_health_goals(self) -> List[HealthAlert]:
        """Check health goals progress and create motivational alerts"""
        alerts = []
        current_date = datetime.utcnow()
        
        # Find goals that need attention
        goals = self.db.query(HealthGoal).filter(
            HealthGoal.is_active == True,
            HealthGoal.reminder_enabled == True
        ).all()
        
        for goal in goals:
            days_remaining = (goal.target_date - current_date).days
            
            # Goal deadline approaching
            if days_remaining <= 7 and goal.progress_percentage < 80:
                alert = self._create_alert(
                    user_id=goal.user_id,
                    title=f"Goal Deadline Approaching: {goal.title}",
                    message=f"Your goal '{goal.title}' is due in {days_remaining} days and you're at {goal.progress_percentage:.1f}% completion. Time to accelerate your efforts!",
                    alert_type=AlertType.HEALTH_REMINDER,
                    severity=AlertSeverity.MEDIUM,
                    alert_data={
                        "goal_id": goal.id,
                        "progress": goal.progress_percentage,
                        "days_remaining": days_remaining
                    }
                )
                alerts.append(alert)
            
            # Goal completed
            elif goal.progress_percentage >= 100 and not goal.is_completed:
                alert = self._create_alert(
                    user_id=goal.user_id,
                    title=f"Congratulations! Goal Achieved: {goal.title}",
                    message=f"You've successfully completed your goal '{goal.title}'! Great job on your health journey.",
                    alert_type=AlertType.HEALTH_REMINDER,
                    severity=AlertSeverity.LOW,
                    alert_data={
                        "goal_id": goal.id,
                        "completion_date": current_date.isoformat()
                    }
                )
                alerts.append(alert)
        
        return alerts
    
    # Emergency Alerts
    def create_emergency_alert(self, emergency_data: EmergencyAlertCreate) -> HealthAlert:
        """Create an emergency alert and notify contacts"""
        alert = self._create_alert(
            user_id=emergency_data.user_id,
            title=f"Emergency Alert: {emergency_data.alert_type}",
            message=emergency_data.message or "Emergency situation detected. Immediate attention required.",
            alert_type=AlertType.EMERGENCY,
            severity=emergency_data.severity,
            alert_data={
                "location": emergency_data.location,
                "vital_signs": emergency_data.vital_signs,
                "emergency_type": emergency_data.alert_type
            }
        )
        
        # Notify emergency contacts if requested
        if emergency_data.contact_emergency_contacts:
            self._notify_emergency_contacts(alert)
        
        return alert
    
    def _notify_emergency_contacts(self, alert: HealthAlert):
        """Notify all emergency contacts about the alert"""
        try:
            user = self.db.query(User).filter(User.id == alert.user_id).first()
            emergency_contacts = self.db.query(EmergencyContact).filter(
                EmergencyContact.user_id == alert.user_id,
                EmergencyContact.notify_on_emergency == True
            ).all()
            
            for contact in emergency_contacts:
                if contact.email:
                    email_service.send_emergency_alert_email(
                        contact.email,
                        contact.name,
                        user.full_name if user else "User",
                        alert.title,
                        alert.message
                    )
                
                # TODO: Add SMS notification here
                logger.info(f"Emergency alert sent to {contact.name} ({contact.phone})")
        
        except Exception as e:
            logger.error(f"Failed to notify emergency contacts: {e}")
    
    # Alert Management
    def get_user_alerts(self, user_id: int, status: Optional[AlertStatus] = None, 
                       alert_type: Optional[AlertType] = None, limit: int = 50) -> List[HealthAlert]:
        """Get alerts for a user with optional filtering"""
        query = self.db.query(HealthAlert).filter(HealthAlert.user_id == user_id)
        
        if status:
            query = query.filter(HealthAlert.status == status)
        
        if alert_type:
            query = query.filter(HealthAlert.alert_type == alert_type)
        
        return query.order_by(HealthAlert.triggered_at.desc()).limit(limit).all()
    
    def acknowledge_alert(self, alert_id: int, user_id: int, action_taken: Optional[str] = None) -> bool:
        """Acknowledge an alert"""
        alert = self.db.query(HealthAlert).filter(
            HealthAlert.id == alert_id,
            HealthAlert.user_id == user_id
        ).first()
        
        if not alert:
            return False
        
        alert.status = AlertStatus.ACKNOWLEDGED
        alert.acknowledged_at = datetime.utcnow()
        if action_taken:
            alert.action_taken = action_taken
        
        self.db.commit()
        return True
    
    def resolve_alert(self, alert_id: int, user_id: int, action_taken: Optional[str] = None) -> bool:
        """Resolve an alert"""
        alert = self.db.query(HealthAlert).filter(
            HealthAlert.id == alert_id,
            HealthAlert.user_id == user_id
        ).first()
        
        if not alert:
            return False
        
        alert.status = AlertStatus.RESOLVED
        alert.resolved_at = datetime.utcnow()
        if action_taken:
            alert.action_taken = action_taken
        
        self.db.commit()
        return True
    
    # Health Analytics
    def get_health_summary(self, user_id: int) -> Dict[str, Any]:
        """Get comprehensive health summary for a user"""
        # Get recent alerts
        recent_alerts = self.get_user_alerts(user_id, limit=10)
        active_alerts = [alert for alert in recent_alerts if alert.status == AlertStatus.ACTIVE]
        critical_alerts = [alert for alert in active_alerts if alert.is_critical]
        
        # Get recent vital signs
        recent_vitals = self.db.query(VitalSigns).filter(
            VitalSigns.user_id == user_id
        ).order_by(VitalSigns.recorded_at.desc()).limit(5).all()
        
        # Get medication adherence
        active_medications = self.db.query(MedicationReminder).filter(
            MedicationReminder.user_id == user_id,
            MedicationReminder.is_active == True
        ).all()
        
        # Get active health goals
        active_goals = self.db.query(HealthGoal).filter(
            HealthGoal.user_id == user_id,
            HealthGoal.is_active == True
        ).all()
        
        return {
            "total_alerts": len(recent_alerts),
            "active_alerts": len(active_alerts),
            "critical_alerts": len(critical_alerts),
            "recent_vitals_count": len(recent_vitals),
            "active_medications": len(active_medications),
            "active_goals": len(active_goals),
            "health_score": self._calculate_health_score(user_id),
            "last_checkup": recent_vitals[0].recorded_at if recent_vitals else None
        }
    
    def _calculate_health_score(self, user_id: int) -> float:
        """Calculate a health score based on various factors"""
        score = 100.0
        
        # Deduct points for active critical alerts
        critical_alerts = self.db.query(HealthAlert).filter(
            HealthAlert.user_id == user_id,
            HealthAlert.status == AlertStatus.ACTIVE,
            HealthAlert.severity.in_([AlertSeverity.CRITICAL, AlertSeverity.EMERGENCY])
        ).count()
        score -= critical_alerts * 20
        
        # Deduct points for missed medications
        missed_medications = self.db.query(MedicationReminder).filter(
            MedicationReminder.user_id == user_id,
            MedicationReminder.missed_doses > 0
        ).count()
        score -= missed_medications * 5
        
        # Add points for goal completion
        completed_goals = self.db.query(HealthGoal).filter(
            HealthGoal.user_id == user_id,
            HealthGoal.progress_percentage >= 100
        ).count()
        score += completed_goals * 10
        
        return max(0, min(100, score))