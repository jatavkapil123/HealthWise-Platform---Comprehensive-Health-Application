"""
Doctor consultation endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/doctors")
async def get_doctors(
    skip: int = 0,
    limit: int = 20,
    specialization: str = None,
    db: Session = Depends(get_db)
):
    """Get list of doctors"""
    # TODO: Implement doctors retrieval
    return {
        "message": "Doctors endpoint - Coming soon",
        "doctors": []
    }

@router.post("/book")
async def book_consultation(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Book a consultation"""
    # TODO: Implement consultation booking
    return {
        "message": "Consultation booking endpoint - Coming soon"
    }