"""
Simple database initialization script
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import logging

from app.core.config import settings
from app.core.database import Base
from app.models.user import User, UserRole, Gender
from app.models.password_reset import PasswordResetToken
from app.models.health_alerts import HealthAlert, VitalSigns, MedicationReminder, EmergencyContact, HealthGoal
from app.models.appointments import Doctor, DoctorSchedule, DoctorSpecialization
from app.models.health_content import (
    HealthContent, WebStory, HealthTest, CorporateBenefit, Medicard,
    ContentType, ContentCategory, ContentStatus
)
from app.core.security import get_password_hash
from datetime import datetime, date, time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """Initialize database with basic setup"""
    try:
        # Create engine and tables
        engine = create_engine(settings.DATABASE_URL)
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Create session
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        # Check if admin user exists
        existing_admin = db.query(User).filter(User.email == "admin@healthwise.com").first()
        if not existing_admin:
            # Create admin user
            admin_user = User(
                email="admin@healthwise.com",
                hashed_password=get_password_hash("admin123"),
                first_name="Admin",
                last_name="User",
                role=UserRole.ADMIN,
                is_active=True,
                is_verified=True,
                email_verified=True
            )
            db.add(admin_user)
            logger.info("Admin user created")
        
        # Check if patient user exists
        existing_patient = db.query(User).filter(User.email == "patient@example.com").first()
        if not existing_patient:
            # Create sample patient
            patient_user = User(
                email="patient@example.com",
                hashed_password=get_password_hash("patient123"),
                first_name="John",
                last_name="Doe",
                phone="9876543210",
                role=UserRole.PATIENT,
                gender=Gender.MALE,
                is_active=True,
                blood_group="O+",
                city="Mumbai",
                state="Maharashtra",
                pincode="400001"
            )
            db.add(patient_user)
            logger.info("Patient user created")
        
        # Check if doctor user exists
        existing_doctor = db.query(User).filter(User.email == "doctor@example.com").first()
        if not existing_doctor:
            # Create sample doctor
            doctor_user = User(
                email="doctor@example.com",
                hashed_password=get_password_hash("doctor123"),
                first_name="Dr. Rajesh",
                last_name="Sharma",
                phone="9876543211",
                role=UserRole.DOCTOR,
                gender=Gender.MALE,
                is_active=True,
                license_number="MH12345",
                specialization="General Physician,Internal Medicine",
                qualification="MBBS,MD Internal Medicine",
                experience_years=15,
                consultation_fee=500,
                bio="Experienced general physician with expertise in preventive care"
            )
            db.add(doctor_user)
            db.commit()
            db.refresh(doctor_user)
            
            # Create doctor profile
            doctor_profile = Doctor(
                user_id=doctor_user.id,
                license_number="MH12345",
                specialization=DoctorSpecialization.GENERAL_PHYSICIAN,
                qualification="MBBS, MD Internal Medicine",
                experience_years=15,
                consultation_fee=500.0,
                languages="English, Hindi, Marathi",
                clinic_name="City Health Center",
                clinic_address="123 Main Street, Mumbai, Maharashtra",
                rating=4.8,
                total_reviews=245,
                total_consultations=1200,
                is_verified=True,
                is_available=True
            )
            db.add(doctor_profile)
            
            # Create doctor schedule
            doctor_schedule = DoctorSchedule(
                doctor_id=doctor_profile.id,
                schedule_date=date.today(),
                start_time=time(9, 0),
                end_time=time(17, 0),
                total_slots=16,
                booked_slots=4,
                available_slots=12,
                is_active=True
            )
            db.add(doctor_schedule)
            logger.info("Doctor user and profile created")
        
        # Create sample health content
        existing_content = db.query(HealthContent).first()
        if not existing_content:
            sample_content = HealthContent(
                title="10 Essential Tips for Heart Health",
                slug="10-essential-tips-heart-health",
                summary="Learn the most effective ways to keep your heart healthy and prevent cardiovascular diseases.",
                content="<p>Heart health is crucial for overall wellbeing. Here are 10 essential tips...</p>",
                content_type=ContentType.ARTICLE,
                category=ContentCategory.HEART_HEALTH,
                featured_image="/images/heart-health.jpg",
                author_name="Dr. Priya Sharma",
                author_credentials="MD Cardiology",
                read_time_minutes=8,
                views_count=1250,
                likes_count=89,
                rating=4.7,
                rating_count=45,
                status=ContentStatus.PUBLISHED,
                is_featured=True,
                published_at=datetime.utcnow()
            )
            db.add(sample_content)
            
            # Create sample web story
            sample_story = WebStory(
                title="5 Morning Habits for Better Health",
                slug="5-morning-habits-better-health",
                description="Start your day right with these simple health habits",
                slides=[
                    {"id": 1, "title": "Wake up early", "content": "Early rising improves productivity"},
                    {"id": 2, "title": "Drink water", "content": "Hydrate your body first thing"},
                    {"id": 3, "title": "Exercise", "content": "Get your blood flowing"},
                    {"id": 4, "title": "Healthy breakfast", "content": "Fuel your body properly"},
                    {"id": 5, "title": "Meditation", "content": "Start with a calm mind"}
                ],
                total_slides=5,
                cover_image="/images/morning-habits.jpg",
                category=ContentCategory.GENERAL_HEALTH,
                views_count=1500,
                status=ContentStatus.PUBLISHED,
                is_featured=True,
                published_at=datetime.utcnow()
            )
            db.add(sample_story)
            
            # Create sample health test
            sample_test = HealthTest(
                title="Heart Health Assessment",
                slug="heart-health-assessment",
                description="Evaluate your cardiovascular health risk factors and get personalized recommendations.",
                questions=[
                    {
                        "id": 1,
                        "question": "How often do you exercise?",
                        "type": "multiple_choice",
                        "options": ["Daily", "3-4 times a week", "1-2 times a week", "Rarely"],
                        "correct_answer": "Daily",
                        "points": 1
                    },
                    {
                        "id": 2,
                        "question": "Do you smoke?",
                        "type": "yes_no",
                        "correct_answer": "No",
                        "points": 1
                    }
                ],
                total_questions=2,
                estimated_time=15,
                scoring_method="percentage",
                result_categories=[
                    {"name": "Excellent", "min_percentage": 80, "max_percentage": 100},
                    {"name": "Good", "min_percentage": 60, "max_percentage": 79},
                    {"name": "Needs Improvement", "min_percentage": 0, "max_percentage": 59}
                ],
                category=ContentCategory.HEART_HEALTH,
                difficulty_level="intermediate",
                attempts_count=1250,
                average_score=78.5,
                status=ContentStatus.PUBLISHED,
                is_featured=True,
                published_at=datetime.utcnow()
            )
            db.add(sample_test)
            
            # Create sample corporate benefit
            sample_corporate = CorporateBenefit(
                company_name="TechCorp Solutions",
                company_code="TECH001",
                contact_person="HR Manager",
                contact_email="hr@techcorp.com",
                contact_phone="9876543210",
                package_name="Comprehensive Care",
                description="Complete health solution for growing companies",
                benefits=[
                    {"name": "Health Checkup", "description": "Annual comprehensive checkup"},
                    {"name": "Lab Tests", "description": "Discounted diagnostic tests"},
                    {"name": "Consultations", "description": "Specialist consultations"}
                ],
                employee_count=150,
                price_per_employee=2500.0,
                total_package_price=375000.0,
                discount_percentage=15.0,
                covered_services=[
                    {"service": "Lab Tests", "discount": "20%"},
                    {"service": "Consultations", "discount": "15%"}
                ],
                is_active=True,
                contract_start_date=datetime.utcnow(),
                contract_end_date=datetime(2024, 12, 31)
            )
            db.add(sample_corporate)
            
            logger.info("Sample health content created")
        
        # Create sample medicard for patient
        existing_patient = db.query(User).filter(User.email == "patient@example.com").first()
        if existing_patient:
            existing_medicard = db.query(Medicard).filter(Medicard.user_id == existing_patient.id).first()
            if not existing_medicard:
                sample_medicard = Medicard(
                    user_id=existing_patient.id,
                    card_number="HW-GOLD-123456",
                    card_type="Gold Care",
                    card_name=f"{existing_patient.first_name} {existing_patient.last_name}",
                    membership_level="gold",
                    benefits=[
                        {"name": "Lab Tests", "discount": "15%"},
                        {"name": "Medicines", "discount": "10%"},
                        {"name": "Consultations", "discount": "20%"}
                    ],
                    discount_percentage=15.0,
                    expiry_date=datetime(2024, 12, 31),
                    total_savings=2450.0,
                    usage_count=12,
                    family_members=[
                        {"name": "Jane Doe", "relation": "Spouse", "age": 28}
                    ],
                    max_family_members=4,
                    is_active=True
                )
                db.add(sample_medicard)
                logger.info("Sample medicard created")
        
        db.commit()
        db.close()
        
        logger.info("Database initialization completed successfully!")
        logger.info("Sample credentials:")
        logger.info("Admin: admin@healthwise.com / admin123")
        logger.info("Patient: patient@example.com / patient123")
        logger.info("Doctor: doctor@example.com / doctor123")
        
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()