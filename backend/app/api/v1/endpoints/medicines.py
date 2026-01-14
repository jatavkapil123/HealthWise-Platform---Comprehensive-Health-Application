"""
Medicine ordering endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/")
async def get_medicines(
    skip: int = 0,
    limit: int = 20,
    search: str = None,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get list of medicines"""
    # TODO: Implement medicines retrieval
    return {
        "message": "Medicines endpoint - Coming soon",
        "medicines": []
    }

@router.post("/cart")
async def add_to_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add medicine to cart"""
    # TODO: Implement add to cart
    return {
        "message": "Add to cart endpoint - Coming soon"
    }

@router.post("/order")
async def place_order(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Place medicine order"""
    # TODO: Implement order placement
    return {
        "message": "Place order endpoint - Coming soon"
    }