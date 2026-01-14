"""
Database initialization script
Creates tables and populates with sample data
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
from app.models.lab_tests import LabTest, LabPackage, TestCategory, TestType
from app.models.consultations import Doctor, DoctorSpecialization
from app.models.medicines import Medicine, MedicineCategory, MedicineType
from app.core.security import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_database():
    """Create database tables"""
    try:
        engine = create_engine(settings.DATABASE_URL)
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        return engine
    except Exception as e:
        logger.error(f"Error creating database: {e}")
        raise

def populate_sample_data():
    """Populate database with sample data"""
    try:
        engine = create_engine(settings.DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
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
        
        # Create sample lab tests
        lab_tests = [
            LabTest(
                name="Complete Blood Count (CBC)",
                description="Comprehensive blood analysis including RBC, WBC, platelets",
                category=TestCategory.PATHOLOGY,
                test_type=TestType.BLOOD,
                price=299,
                original_price=500,
                discount_percentage=40,
                duration="4-6 hours",
                fasting_required=False,
                home_collection_available=True,
                sample_type="Blood",
                report_delivery_time="Same day",
                parameters=["Hemoglobin", "RBC Count", "WBC Count", "Platelet Count"],
                is_active=True,
                is_popular=True
            ),
            LabTest(
                name="Lipid Profile",
                description="Cholesterol and triglyceride levels assessment",
                category=TestCategory.PATHOLOGY,
                test_type=TestType.BLOOD,
                price=399,
                original_price=600,
                discount_percentage=33,
                duration="12 hours",
                fasting_required=True,
                home_collection_available=True,
                sample_type="Blood",
                report_delivery_time="Same day",
                parameters=["Total Cholesterol", "HDL", "LDL", "Triglycerides"],
                preparation_instructions=["Fast for 12 hours", "Only water allowed"],
                is_active=True,
                is_popular=True
            ),
            LabTest(
                name="Thyroid Profile (T3, T4, TSH)",
                description="Complete thyroid function assessment",
                category=TestCategory.PATHOLOGY,
                test_type=TestType.BLOOD,
                price=599,
                original_price=900,
                discount_percentage=33,
                duration="24 hours",
                fasting_required=False,
                home_collection_available=True,
                sample_type="Blood",
                report_delivery_time="Next day",
                parameters=["T3", "T4", "TSH"],
                is_active=True,
                is_popular=True
            )
        ]
        
        for test in lab_tests:
            db.add(test)
        
        db.commit()
        
        # Create sample lab packages
        full_body_package = LabPackage(
            name="Full Body Checkup - Basic",
            description="Comprehensive health screening with 59+ biomarkers",
            category="Full Body Checkup",
            price=499,
            original_price=2500,
            discount_percentage=80,
            total_tests=59,
            home_collection_available=True,
            report_delivery_time="24 hours",
            includes=["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Diabetes", "Vitamin D", "Vitamin B12"],
            is_active=True,
            is_popular=True,
            average_rating=4.8,
            total_bookings=15420
        )
        db.add(full_body_package)
        
        diabetes_package = LabPackage(
            name="Diabetes Care Package",
            description="Complete diabetes monitoring and management",
            category="Diabetes Care",
            price=299,
            original_price=800,
            discount_percentage=63,
            total_tests=8,
            home_collection_available=True,
            report_delivery_time="6 hours",
            includes=["HbA1c", "Fasting Glucose", "Post Meal Glucose", "Insulin", "Microalbumin"],
            is_active=True,
            is_popular=True,
            average_rating=4.7,
            total_bookings=8930
        )
        db.add(diabetes_package)
        
        db.commit()
        
        # Create sample medicines
        medicines = [
            Medicine(
                name="Paracetamol 500mg",
                generic_name="Paracetamol",
                brand="Crocin",
                manufacturer="GSK",
                category=MedicineCategory.OTC,
                medicine_type=MedicineType.TABLET,
                strength="500mg",
                pack_size="15 tablets",
                price=25,
                mrp=30,
                discount_percentage=17,
                prescription_required=False,
                in_stock=True,
                stock_quantity=1000,
                description="Pain relief and fever reducer",
                uses=["Headache", "Fever", "Body ache", "Cold symptoms"],
                side_effects=["Nausea", "Stomach upset (rare)"],
                dosage_instructions="1-2 tablets every 4-6 hours as needed",
                storage_instructions="Store in cool, dry place",
                is_active=True,
                fast_delivery_available=True,
                average_rating=4.5,
                total_reviews=2340
            ),
            Medicine(
                name="Amoxicillin 250mg",
                generic_name="Amoxicillin",
                brand="Novamox",
                manufacturer="Cipla",
                category=MedicineCategory.PRESCRIPTION,
                medicine_type=MedicineType.CAPSULE,
                strength="250mg",
                pack_size="10 capsules",
                price=45,
                mrp=55,
                discount_percentage=18,
                prescription_required=True,
                in_stock=True,
                stock_quantity=500,
                description="Antibiotic for bacterial infections",
                uses=["Bacterial infections", "Respiratory tract infections", "Skin infections"],
                side_effects=["Nausea", "Diarrhea", "Allergic reactions"],
                contraindications=["Penicillin allergy"],
                dosage_instructions="As prescribed by doctor",
                storage_instructions="Store below 25°C",
                is_active=True,
                fast_delivery_available=True,
                average_rating=4.3,
                total_reviews=1560
            )
        ]
        
        for medicine in medicines:
            db.add(medicine)
        
        db.commit()
        db.close()
        
        logger.info("Sample data populated successfully")
        
    except Exception as e:
        logger.error(f"Error populating sample data: {e}")
        raise

def main():
    """Main function to initialize database"""
    logger.info("Initializing HealthWise database...")
    
    try:
        # Create tables
        create_database()
        
        # Populate sample data
        populate_sample_data()
        
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