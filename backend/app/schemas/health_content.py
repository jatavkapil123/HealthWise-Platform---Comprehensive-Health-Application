"""
Health content related Pydantic schemas
"""

from typing import Optional, List, Dict, Any
from datetime import datetime, date
from pydantic import BaseModel, Field

from app.models.health_content import ContentType, ContentCategory, ContentStatus

class HealthContentResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: Optional[str]
    content: str
    content_type: ContentType
    category: ContentCategory
    subcategory: Optional[str]
    tags: Optional[List[str]]
    featured_image: Optional[str]
    images: Optional[List[str]]
    videos: Optional[List[str]]
    audio_url: Optional[str]
    meta_title: Optional[str]
    meta_description: Optional[str]
    keywords: Optional[List[str]]
    author_name: Optional[str]
    author_credentials: Optional[str]
    author_bio: Optional[str]
    reviewed_by: Optional[str]
    read_time_minutes: Optional[int]
    difficulty_level: Optional[str]
    views_count: int
    likes_count: int
    shares_count: int
    rating: float
    rating_count: int
    status: ContentStatus
    is_featured: bool
    is_trending: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class WebStoryResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: Optional[str]
    slides: List[Dict[str, Any]]
    total_slides: int
    cover_image: str
    background_color: Optional[str]
    text_color: Optional[str]
    category: ContentCategory
    tags: Optional[List[str]]
    views_count: int
    completion_rate: float
    shares_count: int
    status: ContentStatus
    is_featured: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class HealthTestResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    questions: List[Dict[str, Any]]
    total_questions: int
    estimated_time: Optional[int]
    scoring_method: Optional[str]
    result_categories: Optional[List[Dict[str, Any]]]
    category: ContentCategory
    difficulty_level: Optional[str]
    tags: Optional[List[str]]
    attempts_count: int
    completion_rate: float
    average_score: float
    status: ContentStatus
    is_featured: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class UserTestResultCreate(BaseModel):
    answers: Dict[str, Any]
    time_taken: Optional[int] = None
    completed_at: Optional[datetime] = None

class UserTestResultResponse(BaseModel):
    id: int
    user_id: int
    test_id: int
    answers: Dict[str, Any]
    score: float
    percentage: Optional[float]
    result_category: Optional[str]
    time_taken: Optional[int]
    completed: bool
    started_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True

class CorporateBenefitResponse(BaseModel):
    id: int
    company_name: str
    company_code: str
    contact_person: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    package_name: str
    description: Optional[str]
    benefits: Optional[List[Dict[str, Any]]]
    employee_count: Optional[int]
    price_per_employee: Optional[float]
    total_package_price: Optional[float]
    discount_percentage: float
    covered_services: Optional[List[Dict[str, Any]]]
    exclusions: Optional[List[Dict[str, Any]]]
    is_active: bool
    contract_start_date: Optional[datetime]
    contract_end_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class MedicardResponse(BaseModel):
    id: int
    user_id: int
    card_number: str
    card_type: str
    card_name: str
    membership_level: Optional[str]
    benefits: Optional[List[Dict[str, Any]]]
    discount_percentage: float
    issue_date: datetime
    expiry_date: datetime
    is_active: bool
    total_savings: float
    usage_count: int
    last_used: Optional[datetime]
    family_members: Optional[List[Dict[str, Any]]]
    max_family_members: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ContentEngagementCreate(BaseModel):
    content_id: int
    engagement_type: str
    time_spent: Optional[int] = None
    completion_percentage: Optional[float] = None
    rating: Optional[int] = Field(None, ge=1, le=5)

class ContentEngagementResponse(BaseModel):
    id: int
    user_id: int
    content_id: int
    engagement_type: str
    time_spent: Optional[int]
    completion_percentage: Optional[float]
    rating: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True

class HealthCategoryResponse(BaseModel):
    value: str
    label: str
    description: str
    content_count: Optional[int] = 0

class ContentSearchResponse(BaseModel):
    content: List[HealthContentResponse]
    total_count: int
    page: int
    per_page: int
    total_pages: int

class PopularContentResponse(BaseModel):
    trending: List[HealthContentResponse]
    most_viewed: List[HealthContentResponse]
    most_liked: List[HealthContentResponse]
    featured: List[HealthContentResponse]