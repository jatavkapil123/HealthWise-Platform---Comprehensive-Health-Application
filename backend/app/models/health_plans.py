from sqlalchemy import Column, Integer, String, Float, Boolean, Text, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class HealthPlan(Base):
    __tablename__ = "health_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True)
    description = Column(Text)
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float)
    duration_months = Column(Integer, default=12)  # Plan duration
    
    # Benefits
    benefits = Column(JSON)  # List of benefits
    
    # Consultation benefits
    consultation_limit = Column(Integer)  # -1 for unlimited
    consultation_types = Column(JSON)  # ['video', 'audio', 'chat']
    
    # Lab test benefits
    lab_test_discount = Column(Float, default=0)  # Percentage discount
    free_lab_tests = Column(JSON)  # List of included tests
    
    # Medicine benefits
    medicine_discount = Column(Float, default=0)
    
    # Health checkup
    annual_checkup_included = Column(Boolean, default=False)
    checkup_value = Column(Float)
    
    # Network benefits
    network_hospitals = Column(Integer)
    network_labs = Column(Integer)
    network_pharmacies = Column(Integer)
    
    # Additional features
    features = Column(JSON)
    
    # Metadata
    is_popular = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    subscriptions = relationship("HealthPlanSubscription", back_populates="plan")


class HealthPlanSubscription(Base):
    __tablename__ = "health_plan_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("health_plans.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Subscription details
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String(50), default="active")  # active, expired, cancelled
    
    # Payment
    amount_paid = Column(Float)
    payment_id = Column(String(200))
    payment_method = Column(String(50))
    
    # Usage tracking
    consultations_used = Column(Integer, default=0)
    lab_tests_used = Column(Integer, default=0)
    checkup_used = Column(Boolean, default=False)
    
    # Auto-renewal
    auto_renew = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    plan = relationship("HealthPlan", back_populates="subscriptions")
    user = relationship("User")


class EMIOption(Base):
    __tablename__ = "emi_options"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    
    # EMI details
    min_amount = Column(Float, nullable=False)
    max_amount = Column(Float)
    tenure_months = Column(JSON)  # List of available tenures [3, 6, 9, 12]
    interest_rate = Column(Float, default=0)  # Annual interest rate
    processing_fee = Column(Float, default=0)
    
    # Eligibility
    min_credit_score = Column(Integer)
    required_documents = Column(JSON)
    
    # Provider
    provider_name = Column(String(100))
    provider_logo_url = Column(String(500))
    
    # Metadata
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
