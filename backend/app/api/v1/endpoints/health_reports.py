"""
Health reports endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/")
async def get_health_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's health reports"""
    # TODO: Implement health reports retrieval
    return {
        "message": "Health reports endpoint - Coming soon",
        "reports": []
    }

@router.post("/upload")
async def upload_report(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload health report"""
    # TODO: Implement report upload
    return {
        "message": "Report upload endpoint - Coming soon"
    }