"""
Email service for sending notifications and password reset emails
"""

import smtplib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.EMAILS_FROM_EMAIL
        self.from_name = settings.EMAILS_FROM_NAME
    
    def _create_smtp_connection(self):
        """Create SMTP connection"""
        try:
            server = smtplib.SMTP(self.smtp_host, self.smtp_port)
            server.starttls()
            if self.smtp_user and self.smtp_password:
                server.login(self.smtp_user, self.smtp_password)
            return server
        except Exception as e:
            logger.error(f"Failed to create SMTP connection: {e}")
            return None
    
    def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> bool:
        """Send email"""
        try:
            # In development mode, just log the email instead of sending
            if settings.ENVIRONMENT == "development":
                logger.info(f"=== EMAIL SIMULATION ===")
                logger.info(f"To: {to_email}")
                logger.info(f"Subject: {subject}")
                logger.info(f"Content: {text_content or 'HTML content provided'}")
                logger.info(f"========================")
                return True
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email
            
            # Add text content
            if text_content:
                text_part = MIMEText(text_content, 'plain')
                msg.attach(text_part)
            
            # Add HTML content
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Send email
            server = self._create_smtp_connection()
            if not server:
                return False
            
            server.send_message(msg)
            server.quit()
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {e}")
            return False
    
    def send_password_reset_email(self, to_email: str, reset_token: str, user_name: str) -> bool:
        """Send password reset email"""
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
        
        subject = "Reset Your HealthWise Password"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                .button {{ display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                .warning {{ background: #fef3cd; border: 1px solid #fecaca; padding: 15px; border-radius: 5px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏥 HealthWise</h1>
                    <h2>Password Reset Request</h2>
                </div>
                <div class="content">
                    <p>Hello {user_name},</p>
                    
                    <p>We received a request to reset your password for your HealthWise account. If you made this request, click the button below to reset your password:</p>
                    
                    <div style="text-align: center;">
                        <a href="{reset_url}" class="button">Reset My Password</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; background: #e2e8f0; padding: 10px; border-radius: 5px;">{reset_url}</p>
                    
                    <div class="warning">
                        <strong>⚠️ Important:</strong>
                        <ul>
                            <li>This link will expire in 1 hour for security reasons</li>
                            <li>If you didn't request this reset, please ignore this email</li>
                            <li>Your password will remain unchanged until you create a new one</li>
                        </ul>
                    </div>
                    
                    <p>If you're having trouble clicking the button, you can also reset your password by:</p>
                    <ol>
                        <li>Going to the HealthWise login page</li>
                        <li>Clicking "Forgot Password?"</li>
                        <li>Entering your email address</li>
                    </ol>
                    
                    <p>For security reasons, we recommend:</p>
                    <ul>
                        <li>Using a strong, unique password</li>
                        <li>Not sharing your password with anyone</li>
                        <li>Logging out of shared devices</li>
                    </ul>
                </div>
                <div class="footer">
                    <p>This email was sent by HealthWise Platform</p>
                    <p>If you have any questions, contact our support team</p>
                    <p>© 2024 HealthWise. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        HealthWise - Password Reset Request
        
        Hello {user_name},
        
        We received a request to reset your password for your HealthWise account.
        
        To reset your password, please visit the following link:
        {reset_url}
        
        This link will expire in 1 hour for security reasons.
        
        If you didn't request this reset, please ignore this email.
        Your password will remain unchanged until you create a new one.
        
        For security, we recommend using a strong, unique password.
        
        If you have any questions, please contact our support team.
        
        © 2024 HealthWise. All rights reserved.
        """
        
        return self.send_email(to_email, subject, html_content, text_content)
    
    def send_welcome_email(self, to_email: str, user_name: str) -> bool:
        """Send welcome email to new users"""
        subject = "Welcome to HealthWise!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to HealthWise</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                .button {{ display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .feature {{ background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #0ea5e9; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏥 Welcome to HealthWise!</h1>
                    <p>Your journey to better health starts here</p>
                </div>
                <div class="content">
                    <p>Hello {user_name},</p>
                    
                    <p>Welcome to HealthWise! We're excited to have you join our community of health-conscious individuals.</p>
                    
                    <div style="text-align: center;">
                        <a href="{settings.FRONTEND_URL}" class="button">Explore HealthWise</a>
                    </div>
                    
                    <h3>What you can do with HealthWise:</h3>
                    
                    <div class="feature">
                        <h4>🧪 Lab Tests</h4>
                        <p>Book pathology and radiology tests with home collection service</p>
                    </div>
                    
                    <div class="feature">
                        <h4>👨‍⚕️ Doctor Consultations</h4>
                        <p>Connect with certified doctors through secure video consultations</p>
                    </div>
                    
                    <div class="feature">
                        <h4>💊 Medicine Orders</h4>
                        <p>Order prescription and OTC medicines with fast delivery</p>
                    </div>
                    
                    <div class="feature">
                        <h4>📊 Health Reports</h4>
                        <p>Access and manage your digital health records securely</p>
                    </div>
                    
                    <p>Ready to get started? Log in to your account and explore all the features we have to offer!</p>
                </div>
                <div class="footer">
                    <p>Need help? Contact our support team anytime</p>
                    <p>© 2024 HealthWise. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)

    def send_health_alert_email(self, to_email: str, user_name: str, alert_title: str, alert_message: str, severity: str) -> bool:
        """Send health alert email"""
        subject = f"HealthWise Alert: {alert_title}"
        
        severity_colors = {
            "low": "#10b981",
            "medium": "#f59e0b", 
            "high": "#ef4444",
            "critical": "#dc2626",
            "emergency": "#991b1b"
        }
        
        severity_color = severity_colors.get(severity.lower(), "#6b7280")
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Health Alert</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: {severity_color}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                .alert-box {{ background: white; border-left: 4px solid {severity_color}; padding: 20px; margin: 20px 0; border-radius: 5px; }}
                .button {{ display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                .severity {{ background: {severity_color}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏥 HealthWise Alert</h1>
                    <span class="severity">{severity} Priority</span>
                </div>
                <div class="content">
                    <p>Hello {user_name},</p>
                    
                    <div class="alert-box">
                        <h3>{alert_title}</h3>
                        <p>{alert_message}</p>
                    </div>
                    
                    <p><strong>What should you do?</strong></p>
                    <ul>
                        <li>Review the alert details carefully</li>
                        <li>Take any recommended actions</li>
                        <li>Consult your healthcare provider if needed</li>
                        <li>Log into your HealthWise account to acknowledge this alert</li>
                    </ul>
                    
                    <div style="text-align: center;">
                        <a href="{settings.FRONTEND_URL}/health-alerts" class="button">View Alert Details</a>
                    </div>
                    
                    <p><strong>Important:</strong> If this is a medical emergency, please call emergency services immediately.</p>
                </div>
                <div class="footer">
                    <p>This alert was generated by HealthWise Health Monitoring System</p>
                    <p>© 2024 HealthWise. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)
    
    def send_emergency_alert_email(self, to_email: str, contact_name: str, patient_name: str, alert_title: str, alert_message: str) -> bool:
        """Send emergency alert email to emergency contacts"""
        subject = f"EMERGENCY: HealthWise Alert for {patient_name}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Emergency Alert</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #fef2f2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #dc2626; }}
                .emergency-box {{ background: white; border: 2px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 5px; }}
                .button {{ display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚨 EMERGENCY ALERT</h1>
                    <h2>HealthWise Emergency Notification</h2>
                </div>
                <div class="content">
                    <p>Dear {contact_name},</p>
                    
                    <div class="emergency-box">
                        <h3>Emergency Alert for: {patient_name}</h3>
                        <h4>{alert_title}</h4>
                        <p><strong>Details:</strong> {alert_message}</p>
                        <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
                    </div>
                    
                    <p><strong>IMMEDIATE ACTION REQUIRED:</strong></p>
                    <ul>
                        <li>Contact {patient_name} immediately</li>
                        <li>Assess if emergency services are needed</li>
                        <li>Provide assistance as appropriate</li>
                        <li>Follow up on their condition</li>
                    </ul>
                    
                    <p><strong>⚠️ If this is a life-threatening emergency, call emergency services (911) immediately.</strong></p>
                    
                    <div style="text-align: center;">
                        <a href="{settings.FRONTEND_URL}/emergency" class="button">Emergency Response Guide</a>
                    </div>
                </div>
                <div class="footer">
                    <p>You are receiving this as an emergency contact for {patient_name}</p>
                    <p>HealthWise Emergency Notification System</p>
                    <p>© 2024 HealthWise. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)

# Create email service instance
email_service = EmailService()

def generate_reset_token() -> str:
    """Generate a secure random token for password reset"""
    return secrets.token_urlsafe(32)