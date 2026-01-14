"""
Health content and library endpoints
"""

from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc

from app.core.database import get_db
from app.core.security import get_current_user, get_current_user_optional
from app.models.user import User
from app.models.health_content import (
    HealthContent, WebStory, HealthTest, UserTestResult, 
    CorporateBenefit, Medicard, ContentEngagement,
    ContentType, ContentCategory, ContentStatus
)
from app.schemas.health_content import (
    HealthContentResponse, WebStoryResponse, HealthTestResponse,
    UserTestResultCreate, UserTestResultResponse, CorporateBenefitResponse,
    MedicardResponse, ContentEngagementCreate
)

router = APIRouter()

# Health Library Endpoints
@router.get("/health-library", response_model=List[HealthContentResponse])
async def get_health_library_content(
    category: Optional[ContentCategory] = None,
    content_type: Optional[ContentType] = None,
    featured: Optional[bool] = None,
    trending: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get health library content with filters"""
    query = db.query(HealthContent).filter(HealthContent.status == ContentStatus.PUBLISHED)
    
    if category:
        query = query.filter(HealthContent.category == category)
    
    if content_type:
        query = query.filter(HealthContent.content_type == content_type)
    
    if featured is not None:
        query = query.filter(HealthContent.is_featured == featured)
    
    if trending is not None:
        query = query.filter(HealthContent.is_trending == trending)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                HealthContent.title.ilike(search_term),
                HealthContent.summary.ilike(search_term),
                HealthContent.content.ilike(search_term)
            )
        )
    
    content = query.order_by(desc(HealthContent.published_at)).offset(skip).limit(limit).all()
    
    # Track view engagement if user is logged in
    if current_user and content:
        for item in content:
            item.views_count += 1
            
            # Create engagement record
            engagement = ContentEngagement(
                user_id=current_user.id,
                content_id=item.id,
                engagement_type="view"
            )
            db.add(engagement)
        
        db.commit()
    
    return content

@router.get("/health-library/categories")
async def get_health_categories():
    """Get all health content categories"""
    return [
        {
            "value": category.value,
            "label": category.value.replace("_", " ").title(),
            "description": get_category_description(category)
        }
        for category in ContentCategory
    ]

@router.get("/health-library/{content_id}", response_model=HealthContentResponse)
async def get_health_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get specific health content by ID"""
    content = db.query(HealthContent).filter(
        HealthContent.id == content_id,
        HealthContent.status == ContentStatus.PUBLISHED
    ).first()
    
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Increment view count
    content.views_count += 1
    
    # Track engagement if user is logged in
    if current_user:
        engagement = ContentEngagement(
            user_id=current_user.id,
            content_id=content.id,
            engagement_type="view"
        )
        db.add(engagement)
    
    db.commit()
    
    return content

@router.post("/health-library/{content_id}/like")
async def like_content(
    content_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Like health content"""
    content = db.query(HealthContent).filter(HealthContent.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Check if already liked
    existing_like = db.query(ContentEngagement).filter(
        ContentEngagement.user_id == current_user.id,
        ContentEngagement.content_id == content_id,
        ContentEngagement.engagement_type == "like"
    ).first()
    
    if existing_like:
        # Unlike
        db.delete(existing_like)
        content.likes_count -= 1
        message = "Content unliked"
    else:
        # Like
        engagement = ContentEngagement(
            user_id=current_user.id,
            content_id=content_id,
            engagement_type="like"
        )
        db.add(engagement)
        content.likes_count += 1
        message = "Content liked"
    
    db.commit()
    return {"message": message, "likes_count": content.likes_count}

# Web Stories Endpoints
@router.get("/web-stories", response_model=List[WebStoryResponse])
async def get_web_stories(
    category: Optional[ContentCategory] = None,
    featured: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get web stories"""
    query = db.query(WebStory).filter(WebStory.status == ContentStatus.PUBLISHED)
    
    if category:
        query = query.filter(WebStory.category == category)
    
    if featured is not None:
        query = query.filter(WebStory.is_featured == featured)
    
    stories = query.order_by(desc(WebStory.published_at)).offset(skip).limit(limit).all()
    return stories

@router.get("/web-stories/{story_id}", response_model=WebStoryResponse)
async def get_web_story(
    story_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get specific web story"""
    story = db.query(WebStory).filter(
        WebStory.id == story_id,
        WebStory.status == ContentStatus.PUBLISHED
    ).first()
    
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Web story not found"
        )
    
    # Increment view count
    story.views_count += 1
    db.commit()
    
    return story

# Health Tests Endpoints
@router.get("/health-tests", response_model=List[HealthTestResponse])
async def get_health_tests(
    category: Optional[ContentCategory] = None,
    difficulty: Optional[str] = None,
    featured: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get health tests"""
    query = db.query(HealthTest).filter(HealthTest.status == ContentStatus.PUBLISHED)
    
    if category:
        query = query.filter(HealthTest.category == category)
    
    if difficulty:
        query = query.filter(HealthTest.difficulty_level == difficulty)
    
    if featured is not None:
        query = query.filter(HealthTest.is_featured == featured)
    
    tests = query.order_by(desc(HealthTest.published_at)).offset(skip).limit(limit).all()
    return tests

@router.get("/health-tests/{test_id}", response_model=HealthTestResponse)
async def get_health_test(test_id: int, db: Session = Depends(get_db)):
    """Get specific health test"""
    test = db.query(HealthTest).filter(
        HealthTest.id == test_id,
        HealthTest.status == ContentStatus.PUBLISHED
    ).first()
    
    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health test not found"
        )
    
    return test

@router.post("/health-tests/{test_id}/submit", response_model=UserTestResultResponse)
async def submit_test_result(
    test_id: int,
    result_data: UserTestResultCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit health test result"""
    test = db.query(HealthTest).filter(HealthTest.id == test_id).first()
    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health test not found"
        )
    
    # Calculate score based on test configuration
    score = calculate_test_score(test, result_data.answers)
    percentage = (score / len(test.questions)) * 100 if test.questions else 0
    
    # Determine result category
    result_category = determine_result_category(test, percentage)
    
    # Create test result
    test_result = UserTestResult(
        user_id=current_user.id,
        test_id=test_id,
        answers=result_data.answers,
        score=score,
        percentage=percentage,
        result_category=result_category,
        time_taken=result_data.time_taken,
        completed=True,
        completed_at=result_data.completed_at
    )
    
    db.add(test_result)
    
    # Update test statistics
    test.attempts_count += 1
    if test.attempts_count > 0:
        total_score = (test.average_score * (test.attempts_count - 1)) + score
        test.average_score = total_score / test.attempts_count
    
    db.commit()
    db.refresh(test_result)
    
    return test_result

@router.get("/health-tests/results", response_model=List[UserTestResultResponse])
async def get_user_test_results(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's test results"""
    results = db.query(UserTestResult).filter(
        UserTestResult.user_id == current_user.id
    ).order_by(desc(UserTestResult.completed_at)).all()
    
    return results

# Corporate Benefits Endpoints
@router.get("/corporate-benefits", response_model=List[CorporateBenefitResponse])
async def get_corporate_benefits(
    company_code: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get corporate benefits packages"""
    query = db.query(CorporateBenefit).filter(CorporateBenefit.is_active == True)
    
    if company_code:
        query = query.filter(CorporateBenefit.company_code == company_code)
    
    benefits = query.offset(skip).limit(limit).all()
    return benefits

@router.get("/corporate-benefits/{benefit_id}", response_model=CorporateBenefitResponse)
async def get_corporate_benefit(benefit_id: int, db: Session = Depends(get_db)):
    """Get specific corporate benefit package"""
    benefit = db.query(CorporateBenefit).filter(
        CorporateBenefit.id == benefit_id,
        CorporateBenefit.is_active == True
    ).first()
    
    if not benefit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Corporate benefit package not found"
        )
    
    return benefit

# Medicards Endpoints
@router.get("/medicards", response_model=List[MedicardResponse])
async def get_user_medicards(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's medicards"""
    medicards = db.query(Medicard).filter(
        Medicard.user_id == current_user.id,
        Medicard.is_active == True
    ).all()
    
    return medicards

@router.get("/medicards/{card_id}", response_model=MedicardResponse)
async def get_medicard(
    card_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get specific medicard"""
    medicard = db.query(Medicard).filter(
        Medicard.id == card_id,
        Medicard.user_id == current_user.id,
        Medicard.is_active == True
    ).first()
    
    if not medicard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicard not found"
        )
    
    return medicard

@router.post("/medicards/{card_id}/use")
async def use_medicard(
    card_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Use medicard for transaction"""
    medicard = db.query(Medicard).filter(
        Medicard.id == card_id,
        Medicard.user_id == current_user.id,
        Medicard.is_active == True
    ).first()
    
    if not medicard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicard not found"
        )
    
    # Update usage statistics
    medicard.usage_count += 1
    medicard.last_used = datetime.utcnow()
    
    db.commit()
    
    return {
        "message": "Medicard used successfully",
        "discount_percentage": medicard.discount_percentage,
        "usage_count": medicard.usage_count
    }

# Helper functions
def get_category_description(category: ContentCategory) -> str:
    """Get description for content category"""
    descriptions = {
        ContentCategory.GENERAL_HEALTH: "General health tips and information",
        ContentCategory.COVID_19: "COVID-19 related health information",
        ContentCategory.AAROGYA_CARE: "Aarogya care and wellness programs",
        ContentCategory.AYURVEDA: "Traditional Ayurvedic medicine and practices",
        ContentCategory.CANCER: "Cancer prevention, treatment, and care",
        ContentCategory.CHOLESTEROL: "Cholesterol management and heart health",
        ContentCategory.HYPERTENSION: "Blood pressure management",
        ContentCategory.HEART_HEALTH: "Cardiovascular health and wellness",
        ContentCategory.DIABETES: "Diabetes management and prevention",
        ContentCategory.YOGA_EXERCISE: "Yoga, exercise, and fitness",
        ContentCategory.SKIN_HAIR: "Skin and hair care",
        ContentCategory.WOMENS_HEALTH: "Women's health and wellness",
        ContentCategory.IMMUNITY: "Immune system support",
        ContentCategory.NUTRITION: "Nutrition and dietary guidance",
        ContentCategory.MENTAL_WELLNESS: "Mental health and wellness",
        ContentCategory.THYROID: "Thyroid health and disorders"
    }
    return descriptions.get(category, "Health information and resources")

def calculate_test_score(test: HealthTest, answers: dict) -> float:
    """Calculate test score based on answers"""
    if not test.questions or not answers:
        return 0.0
    
    score = 0
    questions = test.questions if isinstance(test.questions, list) else []
    
    for question in questions:
        question_id = str(question.get('id', ''))
        if question_id in answers:
            user_answer = answers[question_id]
            correct_answer = question.get('correct_answer')
            
            if user_answer == correct_answer:
                score += question.get('points', 1)
    
    return float(score)

def determine_result_category(test: HealthTest, percentage: float) -> str:
    """Determine result category based on percentage"""
    if not test.result_categories:
        if percentage >= 80:
            return "Excellent"
        elif percentage >= 60:
            return "Good"
        elif percentage >= 40:
            return "Average"
        else:
            return "Needs Improvement"
    
    # Use test-specific categories
    categories = test.result_categories if isinstance(test.result_categories, list) else []
    for category in categories:
        min_score = category.get('min_percentage', 0)
        max_score = category.get('max_percentage', 100)
        
        if min_score <= percentage <= max_score:
            return category.get('name', 'Unknown')
    
    return "Unknown"