"""
Lab tests endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.auth import MessageResponse

router = APIRouter()

@router.get("/")
async def get_lab_tests(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get list of lab tests"""
    # TODO: Implement lab tests retrieval
    return {
        "message": "Lab tests endpoint - Coming soon",
        "tests": []
    }

@router.get("/packages")
async def get_lab_packages(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get list of lab packages"""
    # TODO: Implement lab packages retrieval
    return {
        "message": "Lab packages endpoint - Coming soon",
        "packages": []
    }

@router.post("/booking")
async def book_lab_test(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Book a lab test"""
    # TODO: Implement lab test booking
    return {
        "message": "Lab test booking endpoint - Coming soon"
    }