from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.test_packages import TestPackage, TestPackageBooking, HealthRiskAssessment
from app.schemas.test_packages import (
    TestPackageResponse,
    TestPackageCreate,
    TestPackageUpdate,
    TestPackageBookingCreate,
    TestPackageBookingResponse,
    HealthRiskAssessmentCreate,
    HealthRiskAssessmentResponse
)

router = APIRouter()


@router.get("/packages", response_model=List[TestPackageResponse])
def get_test_packages(
    category: Optional[str] = None,
    popular_only: bool = False,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all test packages with optional filters"""
    query = db.query(TestPackage).filter(TestPackage.is_active == True)
    
    if category:
        query = query.filter(TestPackage.category == category)
    
    if popular_only:
        query = query.filter(TestPackage.is_popular == True)
    
    packages = query.order_by(TestPackage.total_bookings.desc()).offset(skip).limit(limit).all()
    return packages


@router.get("/packages/{package_id}", response_model=TestPackageResponse)
def get_test_package(package_id: int, db: Session = Depends(get_db)):
    """Get a specific test package by ID"""
    package = db.query(TestPackage).filter(TestPackage.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Test package not found")
    return package


@router.post("/packages", response_model=TestPackageResponse)
def create_test_package(
    package: TestPackageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new test package (Admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_package = TestPackage(**package.dict())
    db.add(db_package)
    db.commit()
    db.refresh(db_package)
    return db_package


@router.put("/packages/{package_id}", response_model=TestPackageResponse)
def update_test_package(
    package_id: int,
    package: TestPackageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a test package (Admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_package = db.query(TestPackage).filter(TestPackage.id == package_id).first()
    if not db_package:
        raise HTTPException(status_code=404, detail="Test package not found")
    
    for key, value in package.dict(exclude_unset=True).items():
        setattr(db_package, key, value)
    
    db.commit()
    db.refresh(db_package)
    return db_package


@router.post("/bookings", response_model=TestPackageBookingResponse)
def book_test_package(
    booking: TestPackageBookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Book a test package"""
    # Verify package exists
    package = db.query(TestPackage).filter(TestPackage.id == booking.package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Test package not found")
    
    # Create booking
    db_booking = TestPackageBooking(
        **booking.dict(),
        user_id=current_user.id,
        booking_date=datetime.utcnow(),
        amount_paid=package.price,
        status="pending",
        payment_status="pending"
    )
    
    db.add(db_booking)
    
    # Update package booking count
    package.total_bookings += 1
    
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.get("/bookings", response_model=List[TestPackageBookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's test package bookings"""
    bookings = db.query(TestPackageBooking).filter(
        TestPackageBooking.user_id == current_user.id
    ).order_by(TestPackageBooking.created_at.desc()).all()
    return bookings


@router.get("/bookings/{booking_id}", response_model=TestPackageBookingResponse)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific booking"""
    booking = db.query(TestPackageBooking).filter(
        TestPackageBooking.id == booking_id,
        TestPackageBooking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    return booking


@router.post("/risk-assessment", response_model=HealthRiskAssessmentResponse)
def create_risk_assessment(
    assessment: HealthRiskAssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a health risk assessment"""
    # Calculate BMI
    height_m = assessment.height / 100
    bmi = assessment.weight / (height_m ** 2)
    
    # Calculate risk score (simplified algorithm)
    risk_score = 0
    risk_factors = []
    
    # BMI risk
    if bmi < 18.5:
        risk_score += 10
        risk_factors.append("Underweight")
    elif bmi >= 25 and bmi < 30:
        risk_score += 15
        risk_factors.append("Overweight")
    elif bmi >= 30:
        risk_score += 25
        risk_factors.append("Obese")
    
    # Smoking risk
    if assessment.smoking == "current":
        risk_score += 20
        risk_factors.append("Current smoker")
    
    # Alcohol risk
    if assessment.alcohol == "regular":
        risk_score += 10
        risk_factors.append("Regular alcohol consumption")
    
    # Exercise risk
    if assessment.exercise == "sedentary":
        risk_score += 15
        risk_factors.append("Sedentary lifestyle")
    
    # Sleep risk
    if assessment.sleep_hours < 6 or assessment.sleep_hours > 9:
        risk_score += 10
        risk_factors.append("Inadequate sleep")
    
    # Stress risk
    if assessment.stress_level == "high":
        risk_score += 15
        risk_factors.append("High stress levels")
    
    # Chronic conditions
    if assessment.chronic_conditions:
        risk_score += len(assessment.chronic_conditions) * 10
        risk_factors.extend(assessment.chronic_conditions)
    
    # Determine risk level
    if risk_score < 20:
        risk_level = "low"
    elif risk_score < 40:
        risk_level = "moderate"
    elif risk_score < 60:
        risk_level = "high"
    else:
        risk_level = "very_high"
    
    # Generate recommendations
    recommendations = []
    if bmi >= 25:
        recommendations.append("Maintain a healthy weight through balanced diet and exercise")
    if assessment.smoking == "current":
        recommendations.append("Consider quitting smoking for better health")
    if assessment.exercise == "sedentary":
        recommendations.append("Aim for at least 30 minutes of moderate exercise daily")
    if assessment.sleep_hours < 7:
        recommendations.append("Try to get 7-9 hours of quality sleep each night")
    if assessment.stress_level == "high":
        recommendations.append("Practice stress management techniques like meditation or yoga")
    
    # Create assessment record
    db_assessment = HealthRiskAssessment(
        user_id=current_user.id,
        **assessment.dict(),
        bmi=round(bmi, 2),
        risk_score=risk_score,
        risk_level=risk_level,
        risk_factors=risk_factors,
        recommendations=recommendations
    )
    
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment


@router.get("/risk-assessment/latest", response_model=HealthRiskAssessmentResponse)
def get_latest_risk_assessment(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's latest health risk assessment"""
    assessment = db.query(HealthRiskAssessment).filter(
        HealthRiskAssessment.user_id == current_user.id
    ).order_by(HealthRiskAssessment.created_at.desc()).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="No assessment found")
    
    return assessment
