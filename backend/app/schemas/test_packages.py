from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class TestPackageBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    category: str
    price: float
    original_price: Optional[float] = None
    discount_percentage: int = 0
    test_count: int = 0
    tests_included: List[str] = []
    home_collection: bool = True
    fasting_required: bool = False
    report_time: Optional[str] = None
    is_popular: bool = False


class TestPackageCreate(TestPackageBase):
    pass


class TestPackageUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    discount_percentage: Optional[int] = None
    is_popular: Optional[bool] = None
    is_active: Optional[bool] = None


class TestPackageResponse(TestPackageBase):
    id: int
    rating: float
    total_bookings: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TestPackageBookingCreate(BaseModel):
    package_id: int
    collection_date: datetime
    collection_time_slot: str
    collection_address: str
    city: str
    pincode: str
    phone: str


class TestPackageBookingResponse(BaseModel):
    id: int
    package_id: int
    user_id: int
    booking_date: datetime
    collection_date: datetime
    collection_time_slot: str
    collection_address: str
    city: str
    pincode: str
    phone: str
    status: str
    payment_status: str
    amount_paid: Optional[float] = None
    report_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class HealthRiskAssessmentCreate(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    smoking: str
    alcohol: str
    exercise: str
    diet: str
    sleep_hours: float
    chronic_conditions: List[str] = []
    family_history: List[str] = []
    current_medications: List[str] = []
    stress_level: str
    mental_health: str


class HealthRiskAssessmentResponse(BaseModel):
    id: int
    user_id: int
    age: int
    gender: str
    bmi: float
    risk_score: float
    risk_level: str
    risk_factors: List[str]
    recommendations: List[str]
    created_at: datetime

    class Config:
        from_attributes = True
