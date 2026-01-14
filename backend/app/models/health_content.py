"""
Health content and library models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

from app.core.database import Base

class ContentType(str, enum.Enum):
    ARTICLE = "article"
    VIDEO = "video"
    INFOGRAPHIC = "infographic"
    WEB_STORY = "web_story"
    PODCAST = "podcast"
    GUIDE = "guide"
    FAQ = "faq"
    NEWS = "news"

class ContentCategory(str, enum.Enum):
    GENERAL_HEALTH = "general_health"
    COVID_19 = "covid_19"
    AAROGYA_CARE = "aarogya_care"
    AYURVEDA = "ayurveda"
    CANCER = "cancer"
    CHOLESTEROL = "cholesterol"
    HYPERTENSION = "hypertension"
    HEART_HEALTH = "heart_health"
    DIABETES = "diabetes"
    YOGA_EXERCISE = "yoga_exercise"
    SKIN_HAIR = "skin_hair"
    WOMENS_HEALTH = "womens_health"
    IMMUNITY = "immunity"
    NUTRITION = "nutrition"
    MENTAL_WELLNESS = "mental_wellness"
    THYROID = "thyroid"
    PEDIATRICS = "pediatrics"
    ELDERLY_CARE = "elderly_care"

class ContentStatus(str, enum.Enum):
    DRAFT = "draft"
    REVIEW = "review"
    PUBLISHED = "published"
    ARCHIVED = "archived"

class HealthContent(Base):
    __tablename__ = "health_content"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Content Information
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    summary = Column(Text)
    content = Column(Text, nullable=False)
    
    # Content Classification
    content_type = Column(Enum(ContentType), nullable=False)
    category = Column(Enum(ContentCategory), nullable=False)
    subcategory = Column(String(100))
    tags = Column(JSON)  # Array of tags
    
    # Media
    featured_image = Column(String(500))
    images = Column(JSON)  # Array of image URLs
    videos = Column(JSON)  # Array of video URLs
    audio_url = Column(String(500))
    
    # SEO and Metadata
    meta_title = Column(String(200))
    meta_description = Column(String(500))
    keywords = Column(JSON)  # Array of SEO keywords
    
    # Author Information
    author_name = Column(String(255))
    author_credentials = Column(String(500))
    author_bio = Column(Text)
    reviewed_by = Column(String(255))  # Medical reviewer
    
    # Content Metrics
    read_time_minutes = Column(Integer)
    difficulty_level = Column(String(50))  # beginner, intermediate, advanced
    
    # Engagement
    views_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    shares_count = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    
    # Status and Publishing
    status = Column(Enum(ContentStatus), default=ContentStatus.DRAFT)
    is_featured = Column(Boolean, default=False)
    is_trending = Column(Boolean, default=False)
    
    # Timestamps
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<HealthContent(id={self.id}, title='{self.title}')>"

class WebStory(Base):
    __tablename__ = "web_stories"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Story Information
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    description = Column(Text)
    
    # Story Structure
    slides = Column(JSON, nullable=False)  # Array of slide objects
    total_slides = Column(Integer, nullable=False)
    
    # Media and Design
    cover_image = Column(String(500), nullable=False)
    background_color = Column(String(20))
    text_color = Column(String(20))
    
    # Classification
    category = Column(Enum(ContentCategory), nullable=False)
    tags = Column(JSON)
    
    # Engagement
    views_count = Column(Integer, default=0)
    completion_rate = Column(Float, default=0.0)
    shares_count = Column(Integer, default=0)
    
    # Status
    status = Column(Enum(ContentStatus), default=ContentStatus.DRAFT)
    is_featured = Column(Boolean, default=False)
    
    # Timestamps
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<WebStory(id={self.id}, title='{self.title}')>"

class HealthTest(Base):
    __tablename__ = "health_tests"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Test Information
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    
    # Test Configuration
    questions = Column(JSON, nullable=False)  # Array of question objects
    total_questions = Column(Integer, nullable=False)
    estimated_time = Column(Integer)  # minutes
    
    # Scoring and Results
    scoring_method = Column(String(100))  # points, percentage, category
    result_categories = Column(JSON)  # Array of result category objects
    
    # Classification
    category = Column(Enum(ContentCategory), nullable=False)
    difficulty_level = Column(String(50))
    tags = Column(JSON)
    
    # Engagement
    attempts_count = Column(Integer, default=0)
    completion_rate = Column(Float, default=0.0)
    average_score = Column(Float, default=0.0)
    
    # Status
    status = Column(Enum(ContentStatus), default=ContentStatus.DRAFT)
    is_featured = Column(Boolean, default=False)
    
    # Timestamps
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<HealthTest(id={self.id}, title='{self.title}')>"

class UserTestResult(Base):
    __tablename__ = "user_test_results"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("health_tests.id"), nullable=False)
    
    # Test Results
    answers = Column(JSON, nullable=False)  # User's answers
    score = Column(Float, nullable=False)
    percentage = Column(Float)
    result_category = Column(String(100))
    
    # Timing
    time_taken = Column(Integer)  # seconds
    completed = Column(Boolean, default=True)
    
    # Timestamps
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<UserTestResult(user_id={self.user_id}, test_id={self.test_id}, score={self.score})>"

class CorporateBenefit(Base):
    __tablename__ = "corporate_benefits"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Company Information
    company_name = Column(String(255), nullable=False)
    company_code = Column(String(100), unique=True, nullable=False)
    contact_person = Column(String(255))
    contact_email = Column(String(255))
    contact_phone = Column(String(20))
    
    # Benefit Package
    package_name = Column(String(255), nullable=False)
    description = Column(Text)
    benefits = Column(JSON)  # Array of benefit objects
    
    # Pricing
    employee_count = Column(Integer)
    price_per_employee = Column(Float)
    total_package_price = Column(Float)
    discount_percentage = Column(Float, default=0.0)
    
    # Coverage
    covered_services = Column(JSON)  # Array of covered services
    exclusions = Column(JSON)  # Array of exclusions
    
    # Status
    is_active = Column(Boolean, default=True)
    contract_start_date = Column(DateTime(timezone=True))
    contract_end_date = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<CorporateBenefit(id={self.id}, company='{self.company_name}')>"

class Medicard(Base):
    __tablename__ = "medicards"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Card Information
    card_number = Column(String(50), unique=True, nullable=False)
    card_type = Column(String(100), nullable=False)  # premium, standard, family
    card_name = Column(String(255), nullable=False)
    
    # Membership Details
    membership_level = Column(String(50))  # gold, silver, platinum
    benefits = Column(JSON)  # Array of benefits
    discount_percentage = Column(Float, default=0.0)
    
    # Validity
    issue_date = Column(DateTime(timezone=True), server_default=func.now())
    expiry_date = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Usage
    total_savings = Column(Float, default=0.0)
    usage_count = Column(Integer, default=0)
    last_used = Column(DateTime(timezone=True))
    
    # Family Coverage
    family_members = Column(JSON)  # Array of family member objects
    max_family_members = Column(Integer, default=4)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Medicard(id={self.id}, card_number='{self.card_number}')>"

class ContentEngagement(Base):
    __tablename__ = "content_engagement"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("health_content.id"), nullable=False)
    
    # Engagement Type
    engagement_type = Column(String(50), nullable=False)  # view, like, share, bookmark
    
    # Engagement Details
    time_spent = Column(Integer)  # seconds
    completion_percentage = Column(Float)
    rating = Column(Integer)  # 1-5 stars
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<ContentEngagement(user_id={self.user_id}, content_id={self.content_id})>"