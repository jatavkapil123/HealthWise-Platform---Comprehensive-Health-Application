"""
Authentication endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
import logging

from app.core.database import get_db
from app.core.security import (
    authenticate_user, create_access_token, create_refresh_token,
    get_password_hash, verify_token, get_current_user
)
from app.core.config import settings
from app.models.user import User
from app.schemas.auth import (
    UserRegister, UserLogin, DoctorRegister, Token, LoginResponse,
    UserResponse, MessageResponse, PasswordChange, PasswordResetRequest,
    PasswordReset, RefreshTokenRequest
)

router = APIRouter()
security = HTTPBearer()
logger = logging.getLogger(__name__)

@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check phone number if provided
    if user_data.phone:
        existing_phone = db.query(User).filter(User.phone == user_data.phone).first()
        if existing_phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered"
            )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone,
        date_of_birth=user_data.date_of_birth,
        gender=user_data.gender,
        role=user_data.role
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return UserResponse(
        user=db_user,
        message="User registered successfully"
    )

@router.post("/register/doctor", response_model=UserResponse)
async def register_doctor(doctor_data: DoctorRegister, db: Session = Depends(get_db)):
    """Register a new doctor"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == doctor_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check license number
    existing_license = db.query(User).filter(User.license_number == doctor_data.license_number).first()
    if existing_license:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="License number already registered"
        )
    
    # Create new doctor
    hashed_password = get_password_hash(doctor_data.password)
    
    db_user = User(
        email=doctor_data.email,
        hashed_password=hashed_password,
        first_name=doctor_data.first_name,
        last_name=doctor_data.last_name,
        phone=doctor_data.phone,
        date_of_birth=doctor_data.date_of_birth,
        gender=doctor_data.gender,
        role=doctor_data.role,
        license_number=doctor_data.license_number,
        specialization=",".join(doctor_data.specialization),
        qualification=",".join(doctor_data.qualification),
        experience_years=doctor_data.experience_years,
        consultation_fee=doctor_data.consultation_fee,
        bio=doctor_data.about
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return UserResponse(
        user=db_user,
        message="Doctor registered successfully. Account pending verification."
    )

@router.post("/login", response_model=LoginResponse)
async def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return access token"""
    
    user = authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )
    
    # Create access and refresh tokens
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    # Update last login
    from datetime import datetime
    user.last_login = datetime.utcnow()
    db.commit()
    
    return LoginResponse(
        user=user,
        token=Token(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        ),
        message="Login successful"
    )

@router.post("/refresh", response_model=Token)
async def refresh_access_token(
    refresh_data: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    
    token_data = verify_token(refresh_data.refresh_token, token_type="refresh")
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_data.refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@router.post("/logout", response_model=MessageResponse)
async def logout_user(current_user: User = Depends(get_current_user)):
    """Logout user (client should discard tokens)"""
    return MessageResponse(message="Logged out successfully")

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return UserResponse(
        user=current_user,
        message="Profile retrieved successfully"
    )

@router.post("/change-password", response_model=MessageResponse)
async def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Change user password"""
    
    from app.core.security import verify_password
    
    # Verify current password
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password"
        )
    
    # Update password
    current_user.hashed_password = get_password_hash(password_data.new_password)
    db.commit()
    
    return MessageResponse(message="Password changed successfully")

@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(
    reset_data: PasswordResetRequest,
    db: Session = Depends(get_db)
):
    """Request password reset"""
    
    user = db.query(User).filter(User.email == reset_data.email).first()
    if not user:
        # Don't reveal if email exists or not for security
        return MessageResponse(message="If the email exists, a reset link has been sent")
    
    # Import here to avoid circular imports
    from app.services.email import email_service, generate_reset_token
    from app.models.password_reset import PasswordResetToken
    
    # Generate reset token
    reset_token = generate_reset_token()
    
    # Save token to database
    db_token = PasswordResetToken.create_token(user.id, reset_token)
    db.add(db_token)
    db.commit()
    
    # Send email (in production, this should be done asynchronously)
    try:
        email_sent = email_service.send_password_reset_email(
            user.email, 
            reset_token, 
            user.full_name
        )
        if not email_sent:
            logger.warning(f"Failed to send password reset email to {user.email}")
    except Exception as e:
        logger.error(f"Error sending password reset email: {e}")
    
    return MessageResponse(message="If the email exists, a reset link has been sent")

@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    """Reset password using token"""
    
    from app.models.password_reset import PasswordResetToken
    
    # Find and validate token
    db_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == reset_data.token
    ).first()
    
    if not db_token or not db_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Get user
    user = db.query(User).filter(User.id == db_token.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(reset_data.new_password)
    
    # Mark token as used
    db_token.used = True
    
    # Invalidate all other reset tokens for this user
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user.id,
        PasswordResetToken.used == False
    ).update({"used": True})
    
    db.commit()
    
    return MessageResponse(message="Password reset successfully")

@router.post("/verify-reset-token", response_model=MessageResponse)
async def verify_reset_token(
    token: str,
    db: Session = Depends(get_db)
):
    """Verify if reset token is valid"""
    
    from app.models.password_reset import PasswordResetToken
    
    db_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token
    ).first()
    
    if not db_token or not db_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    return MessageResponse(message="Token is valid")

@router.post("/verify-email", response_model=MessageResponse)
async def verify_email(
    token: str,
    db: Session = Depends(get_db)
):
    """Verify email address"""
    
    # TODO: Verify email token and update user
    return MessageResponse(message="Email verified successfully")