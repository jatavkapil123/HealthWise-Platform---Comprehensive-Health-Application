from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class MedicationItem(BaseModel):
    name: str
    dosage: str
    frequency: str
    duration: str
    instructions: Optional[str] = None


class PrescriptionCreate(BaseModel):
    consultation_id: Optional[int] = None
    patient_id: int
    diagnosis: str
    symptoms: Optional[str] = None
    medications: List[MedicationItem]
    lab_tests_recommended: List[str] = []
    follow_up_required: bool = False
    follow_up_date: Optional[datetime] = None
    follow_up_notes: Optional[str] = None
    dietary_instructions: Optional[str] = None
    lifestyle_advice: Optional[str] = None
    precautions: Optional[str] = None
    valid_until: Optional[datetime] = None


class PrescriptionResponse(BaseModel):
    id: int
    prescription_number: str
    consultation_id: Optional[int] = None
    doctor_id: int
    patient_id: int
    diagnosis: str
    symptoms: Optional[str] = None
    medications: List[Dict]
    lab_tests_recommended: List[str]
    follow_up_required: bool
    follow_up_date: Optional[datetime] = None
    follow_up_notes: Optional[str] = None
    dietary_instructions: Optional[str] = None
    lifestyle_advice: Optional[str] = None
    precautions: Optional[str] = None
    valid_until: Optional[datetime] = None
    is_active: bool
    doctor_registration_number: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class PrescriptionUploadCreate(BaseModel):
    file_url: str
    file_name: str
    file_size: int
    file_type: str


class PrescriptionUploadResponse(BaseModel):
    id: int
    user_id: int
    file_url: str
    file_name: str
    file_size: int
    file_type: str
    is_verified: bool
    verified_at: Optional[datetime] = None
    is_used: bool
    created_at: datetime

    class Config:
        from_attributes = True
