"""
Lab tests and diagnostics models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class TestCategory(str, enum.Enum):
    PATHOLOGY = "pathology"
    RADIOLOGY = "radiology"
    CARDIOLOGY = "cardiology"
    NEUROLOGY = "neurology"

class TestType(str, enum.Enum):
    BLOOD = "blood"
    URINE = "urine"
    IMAGING = "imaging"
    ECG = "ecg"
    ULTRASOUND = "ultrasound"
    MRI = "mri"
    CT_SCAN = "ct-scan"
    X_RAY = "x-ray"

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SAMPLE_COLLECTED = "sample-collected"
    PROCESSING = "processing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"

class CollectionType(str, enum.Enum):
    HOME = "home"
    LAB = "lab"

class LabTest(Base):
    __tablename__ = "lab_tests"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    category = Column(Enum(TestCategory), nullable=False)
    test_type = Column(Enum(TestType), nullable=False)
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float)
    discount_percentage = Column(Float, default=0)
    
    # Test Details
    duration = Column(String(100))  # "2-4 hours", "Same day"
    fasting_required = Column(Boolean, default=False)
    home_collection_available = Column(Boolean, default=True)
    sample_type = Column(String(100))
    report_delivery_time = Column(String(100))
    
    # Test Parameters
    parameters = Column(JSON)  # List of parameters tested
    preparation_instructions = Column(JSON)  # List of preparation steps
    
    # Status
    is_active = Column(Boolean, default=True)
    is_popular = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    package_tests = relationship("LabPackageTest", back_populates="test")
    booking_tests = relationship("LabBookingTest", back_populates="test")

class LabPackage(Base):
    __tablename__ = "lab_packages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    category = Column(String(100), nullable=False)
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    discount_percentage = Column(Float)
    
    # Package Details
    total_tests = Column(Integer, nullable=False)
    home_collection_available = Column(Boolean, default=True)
    report_delivery_time = Column(String(100))
    includes = Column(JSON)  # List of what's included
    
    # Status
    is_active = Column(Boolean, default=True)
    is_popular = Column(Boolean, default=False)
    
    # Ratings
    average_rating = Column(Float, default=0)
    total_bookings = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    package_tests = relationship("LabPackageTest", back_populates="package")
    bookings = relationship("LabBooking", back_populates="package")

class LabPackageTest(Base):
    __tablename__ = "lab_package_tests"
    
    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("lab_packages.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("lab_tests.id"), nullable=False)
    
    # Relationships
    package = relationship("LabPackage", back_populates="package_tests")
    test = relationship("LabTest", back_populates="package_tests")

class LabBooking(Base):
    __tablename__ = "lab_bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_number = Column(String(50), unique=True, nullable=False, index=True)
    
    # User Information
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    package_id = Column(Integer, ForeignKey("lab_packages.id"))
    
    # Patient Information
    patient_name = Column(String(255), nullable=False)
    patient_age = Column(Integer, nullable=False)
    patient_gender = Column(String(10), nullable=False)
    patient_phone = Column(String(20), nullable=False)
    patient_email = Column(String(255))
    
    # Address Information
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255))
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    landmark = Column(String(255))
    
    # Booking Details
    collection_type = Column(Enum(CollectionType), nullable=False)
    preferred_date = Column(DateTime, nullable=False)
    preferred_time = Column(String(20), nullable=False)
    
    # Pricing
    total_amount = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0)
    final_amount = Column(Float, nullable=False)
    
    # Status
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    booking_status = Column(Enum(BookingStatus), default=BookingStatus.PENDING)
    
    # Additional Information
    special_instructions = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    sample_collected_at = Column(DateTime(timezone=True))
    report_generated_at = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User", back_populates="lab_bookings")
    package = relationship("LabPackage", back_populates="bookings")
    booking_tests = relationship("LabBookingTest", back_populates="booking")
    results = relationship("LabResult", back_populates="booking")

class LabBookingTest(Base):
    __tablename__ = "lab_booking_tests"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("lab_bookings.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("lab_tests.id"), nullable=False)
    
    # Relationships
    booking = relationship("LabBooking", back_populates="booking_tests")
    test = relationship("LabTest", back_populates="booking_tests")

class LabResult(Base):
    __tablename__ = "lab_results"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("lab_bookings.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("lab_tests.id"), nullable=False)
    
    # Test Results
    test_name = Column(String(255), nullable=False)
    parameters = Column(JSON)  # List of parameter results
    overall_status = Column(String(20))  # normal, abnormal, critical
    
    # Report Information
    report_url = Column(String(500))
    report_file_path = Column(String(500))
    
    # Medical Review
    reviewed_by = Column(String(255))
    reviewed_at = Column(DateTime(timezone=True))
    medical_notes = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    booking = relationship("LabBooking", back_populates="results")
    test = relationship("LabTest")