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
from app.models.test_packages import TestPackage, TestPackageBooking, HealthRiskAssessment
from app.models.prescriptions import Prescription, PrescriptionUpload
from app.models.health_plans import HealthPlan, HealthPlanSubscription, EMIOption
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
        
        # Create sample test packages
        existing_packages = db.query(TestPackage).first()
        if not existing_packages:
            packages = [
                TestPackage(
                    name="Full Body Checkup - Basic",
                    slug="full-body-basic",
                    description="Comprehensive health screening with 59+ biomarkers",
                    category="Full Body Checkup",
                    price=499,
                    original_price=2500,
                    discount_percentage=80,
                    test_count=59,
                    tests_included=["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Diabetes", "Vitamin D", "Vitamin B12"],
                    home_collection=True,
                    fasting_required=True,
                    report_time="24 hours",
                    is_popular=True,
                    rating=4.8,
                    total_bookings=15420
                ),
                TestPackage(
                    name="Diabetes Care Package",
                    slug="diabetes-care",
                    description="Complete diabetes monitoring and management",
                    category="Diabetes Care",
                    price=299,
                    original_price=800,
                    discount_percentage=63,
                    test_count=8,
                    tests_included=["HbA1c", "Fasting Glucose", "Post Meal Glucose", "Insulin", "Microalbumin"],
                    home_collection=True,
                    fasting_required=True,
                    report_time="6 hours",
                    is_popular=True,
                    rating=4.7,
                    total_bookings=8930
                ),
                TestPackage(
                    name="Heart Health Complete",
                    slug="heart-health",
                    description="Comprehensive cardiac risk assessment",
                    category="Heart Health",
                    price=799,
                    original_price=2200,
                    discount_percentage=64,
                    test_count=15,
                    tests_included=["Lipid Profile", "ECG", "Echo", "Troponin", "CRP", "Homocysteine"],
                    home_collection=True,
                    fasting_required=True,
                    report_time="24 hours",
                    is_popular=False,
                    rating=4.9,
                    total_bookings=5670
                )
            ]
            for package in packages:
                db.add(package)
            logger.info("Sample test packages created")
        
        # Create sample health plans
        existing_plans = db.query(HealthPlan).first()
        if not existing_plans:
            plans = [
                HealthPlan(
                    name="Health Prime",
                    slug="health-prime",
                    description="Unlimited tele/video consultations with comprehensive benefits",
                    price=699,
                    original_price=999,
                    duration_months=12,
                    benefits=[
                        "Unlimited video/audio consultations",
                        "15% discount on lab tests",
                        "10% discount on medicines",
                        "Annual health checkup worth ₹3000",
                        "Network discounts at 1500+ hospitals"
                    ],
                    consultation_limit=-1,
                    consultation_types=["video", "audio", "chat"],
                    lab_test_discount=15.0,
                    medicine_discount=10.0,
                    annual_checkup_included=True,
                    checkup_value=3000.0,
                    network_hospitals=1500,
                    network_labs=4000,
                    network_pharmacies=5000,
                    features=["24/7 support", "Digital prescriptions", "Health records"],
                    is_popular=True,
                    display_order=1
                ),
                HealthPlan(
                    name="Health Prime Max",
                    slug="health-prime-max",
                    description="Premium health plan with maximum benefits",
                    price=1499,
                    original_price=2499,
                    duration_months=12,
                    benefits=[
                        "Unlimited specialist consultations",
                        "25% discount on lab tests",
                        "20% discount on medicines",
                        "2 annual health checkups worth ₹6000",
                        "Priority appointments",
                        "Home sample collection"
                    ],
                    consultation_limit=-1,
                    consultation_types=["video", "audio", "chat"],
                    lab_test_discount=25.0,
                    medicine_discount=20.0,
                    annual_checkup_included=True,
                    checkup_value=6000.0,
                    network_hospitals=2000,
                    network_labs=5000,
                    network_pharmacies=6000,
                    features=["24/7 priority support", "Digital prescriptions", "Health records", "Dedicated health manager"],
                    is_popular=True,
                    display_order=2
                )
            ]
            for plan in plans:
                db.add(plan)
            logger.info("Sample health plans created")
        
        # Create sample EMI options
        existing_emi = db.query(EMIOption).first()
        if not existing_emi:
            emi_options = [
                EMIOption(
                    name="Bajaj Finserv EMI",
                    description="Easy EMI with zero down payment",
                    min_amount=5000,
                    max_amount=500000,
                    tenure_months=[3, 6, 9, 12, 18, 24],
                    interest_rate=0,
                    processing_fee=199,
                    provider_name="Bajaj Finserv",
                    is_active=True,
                    display_order=1
                ),
                EMIOption(
                    name="Standard EMI",
                    description="Flexible EMI options with low interest",
                    min_amount=3000,
                    max_amount=200000,
                    tenure_months=[3, 6, 9, 12],
                    interest_rate=12.0,
                    processing_fee=99,
                    provider_name="HealthWise Finance",
                    is_active=True,
                    display_order=2
                )
            ]
            for emi in emi_options:
                db.add(emi)
            logger.info("Sample EMI options created")
        
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