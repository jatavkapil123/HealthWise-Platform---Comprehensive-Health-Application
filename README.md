# HealthWise - AI-Powered Health Platform

A modern, comprehensive health platform built with Next.js and Python FastAPI, featuring AI-powered diagnostics, telemedicine, lab test booking, medicine ordering, and complete user authentication.

## ✨ Features

### Core Features
- **🔐 User Authentication** - Complete login/register system with JWT tokens and password reset
- **👤 User Account Management** - Profile management and comprehensive order tracking
- **🧪 Lab Test Booking** - Book pathology and radiology tests with home collection
- **👨‍⚕️ Doctor Consultations** - Connect with certified doctors through video/audio/chat
- **💊 Medicine Ordering** - Order prescription and OTC medicines with delivery tracking
- **📊 Health Reports** - Digital health reports and medical history management
- **🏥 Emergency Care** - 24/7 emergency support and immediate assistance

### New Features (Inspired by Bajaj Finserv Health)
- **📦 Test Package System** - Comprehensive health packages (Full Body Checkup at ₹499 with 59+ biomarkers)
- **📋 Digital Prescriptions** - Doctors can generate digital prescriptions with medications and follow-up
- **📤 Prescription Upload** - Patients can upload prescription images/PDFs for medicine orders
- **🎯 Health Risk Assessment** - Interactive 5-step lifestyle quiz with personalized recommendations
- **💳 Health Plans & Subscriptions** - Multiple subscription tiers with unlimited consultations and discounts
- **💰 EMI Payment Options** - Flexible EMI plans with zero down payment through Bajaj Finserv
- **🏠 Home Sample Collection** - Free home collection for lab tests with scheduling
- **🎖️ NABL Certified Labs** - Partner with certified laboratories for quality assurance
- **📱 Digital Reports** - Instant digital report delivery within 24 hours

## �️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context for authentication
- **API Integration**: Axios with interceptors for token management

### Backend (Python FastAPI)
- **Framework**: FastAPI with SQLAlchemy ORM
- **Database**: MySQL for data persistence
- **Authentication**: JWT tokens with refresh token support
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- MySQL 8.0+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthwise-platform
   ```

2. **Start the platform**
   ```bash
   chmod +x start_healthwise.sh
   ./start_healthwise.sh
   ```

   This will automatically:
   - Check prerequisites
   - Start the Python backend on port 8001
   - Start the Next.js frontend on port 3000
   - Display demo login credentials

### Manual Setup

#### Backend Setup
1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MySQL configuration:
   ```env
   DATABASE_URL=mysql+pymysql://healthwise_user:healthwise123@localhost:3306/healthwise
   DATABASE_HOST=localhost
   DATABASE_USER=healthwise_user
   DATABASE_PASSWORD=healthwise123
   DATABASE_NAME=healthwise
   
   # Email Configuration (Optional - for production)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAILS_FROM_EMAIL=noreply@healthwise.com
   EMAILS_FROM_NAME=HealthWise
   
   # Frontend URL for email links
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Note**: In development mode, emails are simulated and logged to console instead of being sent.

5. **Initialize database**
   ```bash
   python scripts/simple_init.py
   ```

6. **Start backend server**
   ```bash
   python run.py
   ```

#### Frontend Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔑 Demo Accounts

The platform comes with pre-configured demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Patient** | patient@example.com | patient123 | Regular user account |
| **Doctor** | doctor@example.com | doctor123 | Healthcare provider |
| **Admin** | admin@healthwise.com | admin123 | Administrator access |

## 🔑 Authentication Features

### Email-Based Login System
- **Secure Login** - Email and password authentication with JWT tokens
- **Password Security** - Strong password requirements and bcrypt hashing
- **Session Management** - Automatic token refresh and secure logout
- **Demo Accounts** - Pre-configured accounts for easy testing

### Forgot Password Functionality
- **Email Reset** - Send password reset links via email
- **Secure Tokens** - Time-limited reset tokens (1 hour expiry)
- **Token Validation** - Verify token validity before password reset
- **Email Simulation** - Development mode logs emails instead of sending

### User Account Management
- **Profile Management** - Update personal information and preferences
- **Account Dashboard** - View health overview and quick stats
- **Order Tracking** - Complete history of all health service orders
- **Settings** - Manage notifications, privacy, and billing preferences

### My Account Dashboard
- **Profile Information** - Edit personal details, contact info, and health profile
- **Health Overview** - Quick stats on lab tests, consultations, and health reports
- **Quick Actions** - Easy access to book services and view reports
- **Account Settings** - Manage notifications, privacy, and billing preferences

### My Orders Tracking
- **Order History** - Complete history of all health service orders
- **Real-time Status** - Track lab tests, consultations, and medicine orders
- **Filter & Search** - Find orders by type, status, or date
- **Download Reports** - Access completed lab results and prescriptions
- **Reorder Services** - Quick reorder of previous services

### Health Services
- **Lab Tests** - Browse and book pathology/radiology tests with home collection
- **Doctor Consultations** - Schedule appointments with specialists
- **Medicine Orders** - Order prescription and OTC medicines with delivery
- **Health Reports** - Access and manage digital health records

## 🛠 Built With

### Frontend Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Axios** - HTTP client with interceptors

### Backend Stack
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Python SQL toolkit and ORM
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Pydantic** - Data validation using Python type annotations

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/                      # Next.js App Router pages
│   │   │   ├── login/               # Login page
│   │   │   ├── register/            # Registration page
│   │   │   ├── forgot-password/     # Password reset request
│   │   │   ├── reset-password/      # Password reset form
│   │   │   ├── my-account/          # User account dashboard
│   │   │   ├── my-orders/           # Order tracking page
│   │   │   ├── lab-tests/           # Lab test booking
│   │   │   ├── consult-doctor/      # Doctor consultation
│   │   │   ├── medicines/           # Medicine ordering
│   │   │   ├── health-reports/      # Health reports
│   │   │   ├── health-risk-assessment/  # NEW: Health risk quiz
│   │   │   └── health-plans/        # NEW: Subscription plans
│   │   ├── components/              # Reusable UI components
│   │   ├── contexts/                # React contexts (Auth, etc.)
│   │   ├── services/                # API service layer
│   │   ├── types/                   # TypeScript definitions
│   │   └── utils/                   # Helper utilities
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/        # API route handlers
│   │   │   ├── auth.py             # Authentication
│   │   │   ├── users.py            # User management
│   │   │   ├── test_packages.py    # NEW: Test packages
│   │   │   ├── prescriptions.py    # NEW: Digital prescriptions
│   │   │   ├── health_plans.py     # NEW: Health plans
│   │   │   ├── lab_tests.py        # Lab tests
│   │   │   ├── consultations.py    # Consultations
│   │   │   └── medicines.py        # Medicines
│   │   ├── core/                   # Core functionality (auth, config)
│   │   ├── models/                 # Database models
│   │   │   ├── user.py
│   │   │   ├── test_packages.py    # NEW
│   │   │   ├── prescriptions.py    # NEW
│   │   │   ├── health_plans.py     # NEW
│   │   │   └── ...
│   │   ├── schemas/                # Pydantic schemas
│   │   └── middleware/             # Custom middleware
│   ├── scripts/                    # Database initialization scripts
│   └── requirements.txt            # Python dependencies
└── start_healthwise.sh             # Quick start script
```

## 🔧 API Endpoints

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login with email/password
- `POST /api/v1/auth/forgot-password` - Request password reset email
- `POST /api/v1/auth/reset-password` - Reset password with token
- `POST /api/v1/auth/verify-reset-token` - Verify reset token validity
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user profile

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `POST /api/v1/users/change-password` - Change password

### Test Packages (NEW)
- `GET /api/v1/test-packages/packages` - List all test packages
- `GET /api/v1/test-packages/packages/{id}` - Get package details
- `POST /api/v1/test-packages/bookings` - Book a test package
- `GET /api/v1/test-packages/bookings` - Get user's bookings
- `POST /api/v1/test-packages/risk-assessment` - Create health risk assessment
- `GET /api/v1/test-packages/risk-assessment/latest` - Get latest assessment

### Prescriptions (NEW)
- `POST /api/v1/prescriptions/` - Create prescription (doctors only)
- `GET /api/v1/prescriptions/` - List prescriptions
- `GET /api/v1/prescriptions/{id}` - Get prescription details
- `POST /api/v1/prescriptions/upload` - Upload prescription image/PDF
- `GET /api/v1/prescriptions/uploads/my` - Get user's uploads
- `PUT /api/v1/prescriptions/uploads/{id}/verify` - Verify prescription

### Health Plans (NEW)
- `GET /api/v1/health-plans/plans` - List all health plans
- `GET /api/v1/health-plans/plans/{id}` - Get plan details
- `POST /api/v1/health-plans/subscriptions` - Subscribe to a plan
- `GET /api/v1/health-plans/subscriptions/my` - Get user subscriptions
- `GET /api/v1/health-plans/subscriptions/active` - Get active subscription
- `PUT /api/v1/health-plans/subscriptions/{id}/cancel` - Cancel subscription
- `GET /api/v1/health-plans/emi-options` - Get EMI options
- `POST /api/v1/health-plans/emi-calculate` - Calculate EMI

### Health Services
- `GET /api/v1/lab-tests` - Get available lab tests
- `POST /api/v1/lab-tests/booking` - Book lab test
- `GET /api/v1/consultations` - Get consultation history
- `POST /api/v1/consultations/booking` - Book consultation
- `GET /api/v1/medicines` - Search medicines
- `POST /api/v1/medicines/orders` - Place medicine order

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication with refresh tokens
- **Password Security** - Bcrypt hashing with strong password requirements
- **Email Verification** - Password reset via secure email tokens
- **Token Expiry** - Time-limited reset tokens (1 hour) for security
- **CORS Protection** - Configured CORS for frontend-backend communication
- **Input Validation** - Pydantic models for request validation
- **SQL Injection Protection** - SQLAlchemy ORM prevents SQL injection
- **Rate Limiting** - API rate limiting middleware

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Friendly** - Adaptive layouts for tablets  
- **Desktop Enhanced** - Rich desktop experience
- **Touch Optimized** - Proper touch targets and gestures

## 🧪 Testing Authentication Features

### Login Testing
1. **Navigate to**: http://localhost:3000/login
2. **Use demo accounts** or click demo buttons:
   - Patient: patient@example.com / patient123
   - Doctor: doctor@example.com / doctor123  
   - Admin: admin@healthwise.com / admin123

### Forgot Password Testing
1. **Navigate to**: http://localhost:3000/login
2. **Click "Forgot Password?"** link
3. **Enter email**: Use any of the demo account emails
4. **Check backend logs** for simulated email with reset token
5. **Copy reset token** from logs
6. **Navigate to**: http://localhost:3000/reset-password?token=YOUR_TOKEN
7. **Set new password** and test login

### Email Simulation (Development)
In development mode, emails are logged to the backend console instead of being sent:
```
=== EMAIL SIMULATION ===
To: patient@example.com
Subject: Reset Your HealthWise Password
Content: [Reset link and instructions]
========================
```

### Production Email Setup
For production, configure real SMTP credentials in the `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 🚀 Deployment
```bash
# Production setup
pip install -r requirements.txt
python scripts/init_db.py  # Initialize production database
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

### Frontend Deployment
```bash
# Build for production
npm run build
npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **Emergency**: 911 or +1-800-HEALTH

## 🆕 New Features Details

### Test Package System
Book comprehensive health checkup packages with home sample collection:
- **Full Body Checkup** - ₹499 (59+ biomarkers, 80% off)
- **Diabetes Care Package** - ₹299 (8 tests, 63% off)
- **Heart Health Complete** - ₹799 (15 tests, 64% off)
- Free home collection with flexible scheduling
- Digital reports within 24 hours
- NABL certified partner labs

### Health Risk Assessment
Interactive 5-step quiz evaluating:
- Basic health metrics (BMI, age, gender)
- Lifestyle habits (smoking, alcohol, exercise, diet, sleep)
- Medical history (chronic conditions, family history)
- Mental wellbeing (stress, mental health)
- Personalized risk score and recommendations

### Digital Prescription System
- Doctors can generate digital prescriptions with medications, dosage, and instructions
- Patients can upload prescription images/PDFs (up to 5MB)
- Prescription verification workflow
- Follow-up scheduling and reminders
- Dietary and lifestyle advice included

### Health Plans & Subscriptions
Three subscription tiers available:
1. **Health Prime** (₹699/year) - Unlimited consultations, 15% lab discount, 10% medicine discount
2. **Health Prime Max** (₹1499/year) - Specialist consultations, 25% lab discount, 20% medicine discount, family coverage
3. **Health Prime Tele** (₹499/year) - Unlimited teleconsultations, basic discounts

### EMI Payment Options
- Zero down payment available
- Flexible tenures: 3, 6, 9, 12, 18, 24 months
- Bajaj Finserv integration ready
- Low interest rates with transparent pricing

## 📚 Documentation

For detailed implementation information, see:
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Complete feature documentation
- **[API Documentation](http://localhost:8001/docs)** - Interactive API docs (when backend is running)

---

**Made with ❤️ for better health outcomes**