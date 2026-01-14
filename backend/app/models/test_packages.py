from sqlalchemy import Column, Integer, String, Float, Boolean, Text, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class TestPackage(Base):
    __tablename__ = "test_packages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True)
    description = Column(Text)
    category = Column(String(100), index=True)
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float)
    discount_percentage = Column(Integer, default=0)
    
    # Package details
    test_count = Column(Integer, default=0)
    tests_included = Column(JSON)  # List of test names
    
    # Features
    home_collection = Column(Boolean, default=True)
    fasting_required = Column(Boolean, default=False)
    report_time = Column(String(50))  # e.g., "24 hours", "6 hours"
    
    # Metadata
    is_popular = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    rating = Column(Float, default=0.0)
    total_bookings = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    bookings = relationship("TestPackageBooking", back_populates="package")


class TestPackageBooking(Base):
    __tablename__ = "test_package_bookings"

    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("test_packages.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Booking details
    booking_date = Column(DateTime(timezone=True), nullable=False)
    collection_date = Column(DateTime(timezone=True))
    collection_time_slot = Column(String(50))
    
    # Address
    collection_address = Column(Text)
    city = Column(String(100))
    pincode = Column(String(10))
    phone = Column(String(20))
    
    # Status
    status = Column(String(50), default="pending")  # pending, confirmed, sample_collected, completed, cancelled
    payment_status = Column(String(50), default="pending")
    payment_id = Column(String(200))
    
    # Results
    report_url = Column(String(500))
    report_uploaded_at = Column(DateTime(timezone=True))
    
    # Pricing
    amount_paid = Column(Float)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    package = relationship("TestPackage", back_populates="bookings")
    user = relationship("User")


class HealthRiskAssessment(Base):
    __tablename__ = "health_risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Lifestyle factors
    age = Column(Integer)
    gender = Column(String(20))
    height = Column(Float)  # in cm
    weight = Column(Float)  # in kg
    bmi = Column(Float)
    
    # Habits
    smoking = Column(String(50))  # never, former, current
    alcohol = Column(String(50))  # never, occasional, regular
    exercise = Column(String(50))  # sedentary, light, moderate, active
    diet = Column(String(50))  # poor, average, good, excellent
    sleep_hours = Column(Float)
    
    # Medical history
    chronic_conditions = Column(JSON)  # List of conditions
    family_history = Column(JSON)  # List of family conditions
    current_medications = Column(JSON)
    
    # Stress and mental health
    stress_level = Column(String(50))  # low, moderate, high
    mental_health = Column(String(50))
    
    # Assessment results
    risk_score = Column(Float)  # 0-100
    risk_level = Column(String(50))  # low, moderate, high, very_high
    risk_factors = Column(JSON)  # List of identified risk factors
    recommendations = Column(JSON)  # List of recommendations
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")
