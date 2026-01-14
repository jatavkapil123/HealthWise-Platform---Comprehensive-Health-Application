from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class HealthPlanBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    duration_months: int = 12
    benefits: List[str] = []
    consultation_limit: Optional[int] = None
    consultation_types: List[str] = []
    lab_test_discount: float = 0
    free_lab_tests: List[str] = []
    medicine_discount: float = 0
    annual_checkup_included: bool = False
    checkup_value: Optional[float] = None
    network_hospitals: Optional[int] = None
    network_labs: Optional[int] = None
    network_pharmacies: Optional[int] = None
    features: List[str] = []
    is_popular: bool = False


class HealthPlanCreate(HealthPlanBase):
    pass


class HealthPlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    is_popular: Optional[bool] = None
    is_active: Optional[bool] = None


class HealthPlanResponse(HealthPlanBase):
    id: int
    is_active: bool
    display_order: int
    created_at: datetime

    class Config:
        from_attributes = True


class HealthPlanSubscriptionCreate(BaseModel):
    plan_id: int
    payment_method: str
    auto_renew: bool = False


class HealthPlanSubscriptionResponse(BaseModel):
    id: int
    plan_id: int
    user_id: int
    start_date: datetime
    end_date: datetime
    status: str
    amount_paid: float
    payment_id: Optional[str] = None
    consultations_used: int
    lab_tests_used: int
    checkup_used: bool
    auto_renew: bool
    created_at: datetime

    class Config:
        from_attributes = True


class EMIOptionResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    min_amount: float
    max_amount: Optional[float] = None
    tenure_months: List[int]
    interest_rate: float
    processing_fee: float
    provider_name: str
    provider_logo_url: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True


class EMICalculation(BaseModel):
    principal: float
    tenure_months: int
    interest_rate: float
    processing_fee: float
    monthly_emi: float
    total_amount: float
    total_interest: float
