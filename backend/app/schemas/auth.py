"""
Authentication and user schemas
"""

from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
from datetime import datetime, date
from enum import Enum

class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    LAB_TECHNICIAN = "lab_technician"

class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

# Token Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    user_id: Optional[str] = None

class RefreshTokenRequest(BaseModel):
    refresh_token: str

# User Registration Schema
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    role: UserRole = UserRole.PATIENT
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v
    
    @validator('phone')
    def validate_phone(cls, v):
        if v and (len(v) < 10 or not v.isdigit()):
            raise ValueError('Phone number must be at least 10 digits')
        return v

# User Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# User Profile Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    role: UserRole

class UserProfile(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    email_verified: bool
    phone_verified: bool
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    bio: Optional[str] = None
    
    # Address Information
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    country: Optional[str] = None
    
    # Emergency Contact
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    
    # Medical Information
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    chronic_conditions: Optional[str] = None
    current_medications: Optional[str] = None

# Password Change Schema
class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Passwords do not match')
        return v

# Password Reset Schemas
class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Passwords do not match')
        return v

# Email Verification Schema
class EmailVerification(BaseModel):
    token: str

# Phone Verification Schemas
class PhoneVerificationRequest(BaseModel):
    phone: str

class PhoneVerification(BaseModel):
    phone: str
    otp: str

# Doctor Registration Schema (extends UserRegister)
class DoctorRegister(UserRegister):
    license_number: str
    specialization: List[str]
    qualification: List[str]
    experience_years: int
    consultation_fee: float
    languages: List[str] = ["English", "Hindi"]
    about: Optional[str] = None
    hospital_affiliations: Optional[List[str]] = None
    
    role: UserRole = UserRole.DOCTOR

# Response Schemas
class UserResponse(BaseModel):
    user: UserProfile
    message: str

class LoginResponse(BaseModel):
    user: UserProfile
    token: Token
    message: str

class MessageResponse(BaseModel):
    message: str
    success: bool = True