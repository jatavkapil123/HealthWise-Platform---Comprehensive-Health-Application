# HealthWise New Features - Quick Start Guide

## 🚀 Quick Access

### Frontend Pages
- **Health Risk Assessment**: http://localhost:3000/health-risk-assessment
- **Health Plans**: http://localhost:3000/health-plans
- **Lab Tests (Enhanced)**: http://localhost:3000/lab-tests
- **Medicines (Enhanced)**: http://localhost:3000/medicines
- **Consult Doctor (Enhanced)**: http://localhost:3000/consult-doctor

### API Documentation
- **Swagger UI**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

## 📦 Feature 1: Test Package System

### What's New
- Comprehensive health checkup packages
- Home sample collection scheduling
- Digital report delivery
- NABL certified labs

### How to Use
1. Navigate to `/lab-tests`
2. Browse available packages (Full Body, Diabetes, Heart Health, etc.)
3. Click "Book Now" on any package
4. Select collection date and time slot
5. Enter collection address
6. Complete booking

### API Endpoints
```bash
# List all packages
GET /api/v1/test-packages/packages

# Get package details
GET /api/v1/test-packages/packages/{id}

# Book a package
POST /api/v1/test-packages/bookings
{
  "package_id": 1,
  "collection_date": "2024-01-20T10:00:00",
  "collection_time_slot": "10:00 AM - 11:00 AM",
  "collection_address": "123 Main St",
  "city": "Mumbai",
  "pincode": "400001",
  "phone": "9876543210"
}

# Get my bookings
GET /api/v1/test-packages/bookings
```

### Sample Packages
| Package | Price | Tests | Discount |
|---------|-------|-------|----------|
| Full Body Checkup | ₹499 | 59 | 80% |
| Diabetes Care | ₹299 | 8 | 63% |
| Heart Health | ₹799 | 15 | 64% |

## 🎯 Feature 2: Health Risk Assessment

### What's New
- Interactive 5-step questionnaire
- BMI calculation
- Risk score (0-100)
- Personalized recommendations
- Risk level categorization

### How to Use
1. Navigate to `/health-risk-assessment`
2. Complete 5 steps:
   - Step 1: Basic Information (age, gender, height, weight)
   - Step 2: Lifestyle Habits (smoking, alcohol, exercise, diet, sleep)
   - Step 3: Medical History (chronic conditions, family history)
   - Step 4: Mental Wellbeing (stress, mental health)
   - Step 5: Review & Submit
3. Get instant results with risk score and recommendations

### API Endpoints
```bash
# Create assessment
POST /api/v1/test-packages/risk-assessment
{
  "age": 35,
  "gender": "male",
  "height": 175,
  "weight": 75,
  "smoking": "never",
  "alcohol": "occasional",
  "exercise": "moderate",
  "diet": "good",
  "sleep_hours": 7,
  "chronic_conditions": [],
  "family_history": ["diabetes"],
  "current_medications": [],
  "stress_level": "moderate",
  "mental_health": "good"
}

# Get latest assessment
GET /api/v1/test-packages/risk-assessment/latest
```

### Risk Levels
- **Low** (0-19): Excellent health status
- **Moderate** (20-39): Some areas need attention
- **High** (40-59): Multiple risk factors present
- **Very High** (60+): Immediate lifestyle changes recommended

## 📋 Feature 3: Digital Prescription System

### What's New
- Doctors can generate digital prescriptions
- Patients can upload prescription images/PDFs
- Prescription verification workflow
- Follow-up scheduling

### How to Use (Doctor)
1. Login as doctor
2. After consultation, create prescription
3. Add medications with dosage and instructions
4. Add lab test recommendations
5. Set follow-up date if needed
6. Generate prescription

### How to Use (Patient)
1. Navigate to `/medicines`
2. Click "Upload Prescription" banner
3. Select image or PDF file (max 5MB)
4. Upload prescription
5. Wait for verification
6. Order medicines based on prescription

### API Endpoints
```bash
# Create prescription (Doctor only)
POST /api/v1/prescriptions/
{
  "patient_id": 2,
  "diagnosis": "Seasonal Flu",
  "symptoms": "Fever, cough, body ache",
  "medications": [
    {
      "name": "Paracetamol 500mg",
      "dosage": "1 tablet",
      "frequency": "3 times daily",
      "duration": "5 days",
      "instructions": "Take after meals"
    }
  ],
  "lab_tests_recommended": ["CBC", "CRP"],
  "follow_up_required": true,
  "follow_up_date": "2024-01-27T10:00:00",
  "dietary_instructions": "Drink plenty of fluids",
  "lifestyle_advice": "Get adequate rest"
}

# Upload prescription (Patient)
POST /api/v1/prescriptions/upload
Content-Type: multipart/form-data
file: [prescription image/PDF]

# List my prescriptions
GET /api/v1/prescriptions/

# Get prescription details
GET /api/v1/prescriptions/{id}
```

## 💳 Feature 4: Health Plans & Subscriptions

### What's New
- Three subscription tiers
- Unlimited consultations
- Lab test and medicine discounts
- Annual health checkups
- Family coverage options

### Available Plans

#### Health Prime (₹699/year)
- Unlimited video/audio consultations
- 15% discount on lab tests
- 10% discount on medicines
- Annual health checkup worth ₹3000
- Network of 1500+ hospitals
- 24/7 support

#### Health Prime Max (₹1499/year)
- Unlimited specialist consultations
- 25% discount on lab tests
- 20% discount on medicines
- 2 annual checkups worth ₹6000
- Priority appointments
- Dedicated health manager
- Family coverage (up to 4 members)
- 24/7 priority support

#### Health Prime Tele (₹499/year)
- Unlimited teleconsultations
- 10% discount on lab tests
- 5% discount on medicines
- Network of 1000+ doctors
- Email support

### How to Use
1. Navigate to `/health-plans`
2. Compare plans
3. Click "Subscribe Now"
4. Choose payment method
5. Complete subscription

### API Endpoints
```bash
# List all plans
GET /api/v1/health-plans/plans

# Get plan details
GET /api/v1/health-plans/plans/{id}

# Subscribe to plan
POST /api/v1/health-plans/subscriptions
{
  "plan_id": 1,
  "payment_method": "card",
  "auto_renew": true
}

# Get my subscriptions
GET /api/v1/health-plans/subscriptions/my

# Get active subscription
GET /api/v1/health-plans/subscriptions/active

# Cancel subscription
PUT /api/v1/health-plans/subscriptions/{id}/cancel
```

## 💰 Feature 5: EMI Payment Options

### What's New
- Zero down payment
- Flexible tenures (3, 6, 9, 12, 18, 24 months)
- Low interest rates
- Transparent pricing

### Available EMI Options

#### Bajaj Finserv EMI
- Min Amount: ₹5,000
- Max Amount: ₹5,00,000
- Interest Rate: 0%
- Processing Fee: ₹199
- Tenures: 3, 6, 9, 12, 18, 24 months

#### Standard EMI
- Min Amount: ₹3,000
- Max Amount: ₹2,00,000
- Interest Rate: 12% per annum
- Processing Fee: ₹99
- Tenures: 3, 6, 9, 12 months

### How to Use
1. Select any service (lab test, medicine, health plan)
2. At checkout, choose "EMI" payment option
3. Select tenure
4. View EMI breakdown
5. Complete payment

### API Endpoints
```bash
# Get EMI options
GET /api/v1/health-plans/emi-options?amount=10000

# Calculate EMI
POST /api/v1/health-plans/emi-calculate
{
  "principal": 10000,
  "tenure_months": 12,
  "interest_rate": 12,
  "processing_fee": 199
}

# Response
{
  "principal": 10000,
  "tenure_months": 12,
  "interest_rate": 12,
  "processing_fee": 199,
  "monthly_emi": 888.49,
  "total_amount": 10860.88,
  "total_interest": 661.88
}
```

## 🧪 Testing Guide

### Test Scenario 1: Book Test Package
```bash
# Login as patient
curl -X POST http://localhost:8001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"patient123"}'

# Get packages
curl http://localhost:8001/api/v1/test-packages/packages

# Book package
curl -X POST http://localhost:8001/api/v1/test-packages/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": 1,
    "collection_date": "2024-01-20T10:00:00",
    "collection_time_slot": "10:00 AM - 11:00 AM",
    "collection_address": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001",
    "phone": "9876543210"
  }'
```

### Test Scenario 2: Health Risk Assessment
```bash
# Complete assessment
curl -X POST http://localhost:8001/api/v1/test-packages/risk-assessment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "gender": "male",
    "height": 175,
    "weight": 75,
    "smoking": "never",
    "alcohol": "occasional",
    "exercise": "moderate",
    "diet": "good",
    "sleep_hours": 7,
    "chronic_conditions": [],
    "family_history": [],
    "current_medications": [],
    "stress_level": "moderate",
    "mental_health": "good"
  }'
```

### Test Scenario 3: Create Prescription (Doctor)
```bash
# Login as doctor
curl -X POST http://localhost:8001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@example.com","password":"doctor123"}'

# Create prescription
curl -X POST http://localhost:8001/api/v1/prescriptions/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": 2,
    "diagnosis": "Seasonal Flu",
    "medications": [
      {
        "name": "Paracetamol 500mg",
        "dosage": "1 tablet",
        "frequency": "3 times daily",
        "duration": "5 days",
        "instructions": "Take after meals"
      }
    ]
  }'
```

### Test Scenario 4: Subscribe to Health Plan
```bash
# Get plans
curl http://localhost:8001/api/v1/health-plans/plans

# Subscribe
curl -X POST http://localhost:8001/api/v1/health-plans/subscriptions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plan_id": 1,
    "payment_method": "card",
    "auto_renew": true
  }'
```

## 🐛 Troubleshooting

### Issue: Database tables not created
**Solution**: Run database initialization
```bash
cd backend
python scripts/simple_init.py
```

### Issue: API returns 401 Unauthorized
**Solution**: Check if token is valid and included in Authorization header
```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Issue: Prescription upload fails
**Solution**: Check file size (max 5MB) and type (JPEG, PNG, PDF only)

### Issue: EMI calculation incorrect
**Solution**: Ensure all parameters are provided (principal, tenure, interest_rate, processing_fee)

## 📊 Database Schema

### New Tables
- `test_packages` - Test package catalog
- `test_package_bookings` - Package bookings
- `health_risk_assessments` - Risk assessment records
- `prescriptions` - Digital prescriptions
- `prescription_uploads` - Uploaded prescriptions
- `health_plans` - Subscription plans
- `health_plan_subscriptions` - User subscriptions
- `emi_options` - EMI payment options

## 🔗 Related Documentation

- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Detailed implementation guide
- [README.md](README.md) - Main project documentation
- [API Documentation](http://localhost:8001/docs) - Interactive API docs

## 💡 Tips

1. **Use demo accounts** for quick testing
2. **Check backend logs** for simulated emails
3. **Use Swagger UI** for API testing
4. **Enable auto-renew** for subscriptions to test renewal logic
5. **Upload sample prescriptions** to test verification workflow

## 🎯 Next Steps

1. Integrate payment gateway (Razorpay/Stripe)
2. Add WebRTC for video consultations
3. Implement push notifications
4. Add multi-language support
5. Create mobile app (React Native)
6. Add AI-powered prescription OCR
7. Integrate with insurance providers

---

**Need help? Check the main README or API documentation!**
