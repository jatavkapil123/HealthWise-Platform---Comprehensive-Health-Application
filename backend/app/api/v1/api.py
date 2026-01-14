"""
Main API router that includes all endpoint routers
"""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth, users, lab_tests, consultations, medicines, 
    health_reports, health_alerts, appointments, health_content,
    test_packages, prescriptions, health_plans
)

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(lab_tests.router, prefix="/lab-tests", tags=["Lab Tests"])
api_router.include_router(test_packages.router, prefix="/test-packages", tags=["Test Packages"])
api_router.include_router(consultations.router, prefix="/consultations", tags=["Consultations"])
api_router.include_router(prescriptions.router, prefix="/prescriptions", tags=["Prescriptions"])
api_router.include_router(medicines.router, prefix="/medicines", tags=["Medicines"])
api_router.include_router(health_reports.router, prefix="/health-reports", tags=["Health Reports"])
api_router.include_router(health_alerts.router, prefix="/health-alerts", tags=["Health Alerts"])
api_router.include_router(health_plans.router, prefix="/health-plans", tags=["Health Plans"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(health_content.router, prefix="/content", tags=["Health Content"])