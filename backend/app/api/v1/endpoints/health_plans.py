from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import math

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.health_plans import HealthPlan, HealthPlanSubscription, EMIOption
from app.schemas.health_plans import (
    HealthPlanResponse,
    HealthPlanCreate,
    HealthPlanUpdate,
    HealthPlanSubscriptionCreate,
    HealthPlanSubscriptionResponse,
    EMIOptionResponse,
    EMICalculation
)

router = APIRouter()


@router.get("/plans", response_model=List[HealthPlanResponse])
def get_health_plans(
    popular_only: bool = False,
    db: Session = Depends(get_db)
):
    """Get all health plans"""
    query = db.query(HealthPlan).filter(HealthPlan.is_active == True)
    
    if popular_only:
        query = query.filter(HealthPlan.is_popular == True)
    
    plans = query.order_by(HealthPlan.display_order, HealthPlan.price).all()
    return plans


@router.get("/plans/{plan_id}", response_model=HealthPlanResponse)
def get_health_plan(plan_id: int, db: Session = Depends(get_db)):
    """Get a specific health plan"""
    plan = db.query(HealthPlan).filter(HealthPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Health plan not found")
    return plan


@router.post("/plans", response_model=HealthPlanResponse)
def create_health_plan(
    plan: HealthPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new health plan (Admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_plan = HealthPlan(**plan.dict())
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan


@router.put("/plans/{plan_id}", response_model=HealthPlanResponse)
def update_health_plan(
    plan_id: int,
    plan: HealthPlanUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a health plan (Admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_plan = db.query(HealthPlan).filter(HealthPlan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Health plan not found")
    
    for key, value in plan.dict(exclude_unset=True).items():
        setattr(db_plan, key, value)
    
    db.commit()
    db.refresh(db_plan)
    return db_plan


@router.post("/subscriptions", response_model=HealthPlanSubscriptionResponse)
def subscribe_to_plan(
    subscription: HealthPlanSubscriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Subscribe to a health plan"""
    # Verify plan exists
    plan = db.query(HealthPlan).filter(HealthPlan.id == subscription.plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Health plan not found")
    
    # Check if user already has an active subscription
    existing = db.query(HealthPlanSubscription).filter(
        HealthPlanSubscription.user_id == current_user.id,
        HealthPlanSubscription.status == "active",
        HealthPlanSubscription.end_date > datetime.utcnow()
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="You already have an active subscription")
    
    # Calculate dates
    start_date = datetime.utcnow()
    end_date = start_date + timedelta(days=plan.duration_months * 30)
    
    # Create subscription
    db_subscription = HealthPlanSubscription(
        plan_id=subscription.plan_id,
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date,
        amount_paid=plan.price,
        payment_method=subscription.payment_method,
        auto_renew=subscription.auto_renew,
        status="active"
    )
    
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription


@router.get("/subscriptions/my", response_model=List[HealthPlanSubscriptionResponse])
def get_my_subscriptions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's subscriptions"""
    subscriptions = db.query(HealthPlanSubscription).filter(
        HealthPlanSubscription.user_id == current_user.id
    ).order_by(HealthPlanSubscription.created_at.desc()).all()
    return subscriptions


@router.get("/subscriptions/active", response_model=HealthPlanSubscriptionResponse)
def get_active_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's active subscription"""
    subscription = db.query(HealthPlanSubscription).filter(
        HealthPlanSubscription.user_id == current_user.id,
        HealthPlanSubscription.status == "active",
        HealthPlanSubscription.end_date > datetime.utcnow()
    ).first()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription found")
    
    return subscription


@router.put("/subscriptions/{subscription_id}/cancel")
def cancel_subscription(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel a subscription"""
    subscription = db.query(HealthPlanSubscription).filter(
        HealthPlanSubscription.id == subscription_id,
        HealthPlanSubscription.user_id == current_user.id
    ).first()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    
    subscription.status = "cancelled"
    subscription.auto_renew = False
    
    db.commit()
    return {"message": "Subscription cancelled successfully"}


@router.get("/emi-options", response_model=List[EMIOptionResponse])
def get_emi_options(
    amount: float = None,
    db: Session = Depends(get_db)
):
    """Get available EMI options"""
    query = db.query(EMIOption).filter(EMIOption.is_active == True)
    
    if amount:
        query = query.filter(
            EMIOption.min_amount <= amount,
            (EMIOption.max_amount >= amount) | (EMIOption.max_amount == None)
        )
    
    options = query.order_by(EMIOption.display_order).all()
    return options


@router.post("/emi-calculate", response_model=EMICalculation)
def calculate_emi(
    principal: float,
    tenure_months: int,
    interest_rate: float,
    processing_fee: float = 0
):
    """Calculate EMI amount"""
    # Monthly interest rate
    monthly_rate = interest_rate / 12 / 100
    
    # EMI calculation using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    if monthly_rate > 0:
        emi = principal * monthly_rate * math.pow(1 + monthly_rate, tenure_months) / (math.pow(1 + monthly_rate, tenure_months) - 1)
    else:
        emi = principal / tenure_months
    
    total_amount = (emi * tenure_months) + processing_fee
    total_interest = total_amount - principal - processing_fee
    
    return EMICalculation(
        principal=principal,
        tenure_months=tenure_months,
        interest_rate=interest_rate,
        processing_fee=processing_fee,
        monthly_emi=round(emi, 2),
        total_amount=round(total_amount, 2),
        total_interest=round(total_interest, 2)
    )
