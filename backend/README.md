# HealthWise Backend API

A comprehensive healthcare platform backend built with FastAPI, MySQL, and modern Python technologies.

## 🚀 Features

- **User Authentication & Authorization** with JWT tokens
- **Lab Tests Management** - Book tests, manage packages, view results
- **Doctor Consultations** - Video/audio consultations, appointments
- **Medicine Ordering** - Online pharmacy with prescription management
- **Health Reports** - Digital health records and report management
- **Secure File Upload** - Prescription and report file handling
- **Real-time Features** - WebSocket support for live consultations
- **Payment Integration** - Stripe payment processing
- **SMS/Email Notifications** - Twilio and SMTP integration

## 🛠️ Tech Stack

- **Framework**: FastAPI 0.104+
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Pydantic schemas
- **File Storage**: Cloudinary integration
- **Caching**: Redis
- **Payment**: Stripe
- **SMS**: Twilio
- **Email**: SMTP (Gmail)

## 📋 Prerequisites

- Python 3.8+
- MySQL 8.0+
- Redis (optional, for caching)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd healthwise-backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Database Setup

#### Install MySQL
```bash
# On Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# On macOS (using Homebrew)
brew install mysql

# On Windows
# Download and install from https://dev.mysql.com/downloads/mysql/
```

#### Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE healthwise;
CREATE USER 'healthwise_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON healthwise.* TO 'healthwise_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Database
DATABASE_URL=mysql+pymysql://healthwise_user:your_password@localhost:3306/healthwise
DATABASE_USER=healthwise_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=healthwise

# Security
SECRET_KEY=your-super-secret-key-change-in-production

# Email (Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Optional Services
CLOUDINARY_CLOUD_NAME=your-cloud-name
STRIPE_SECRET_KEY=sk_test_your-secret-key
TWILIO_ACCOUNT_SID=your-account-sid
```

### 6. Initialize Database
```bash
python scripts/init_db.py
```

This will create all tables and populate sample data including:
- Admin user: `admin@healthwise.com` / `admin123`
- Sample patient: `patient@example.com` / `patient123`
- Sample doctor: `doctor@example.com` / `doctor123`

### 7. Run the Application
```bash
python run.py
```

The API will be available at:
- **API Server**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user profile

### Lab Tests Endpoints
- `GET /api/v1/lab-tests/` - List all lab tests
- `GET /api/v1/lab-tests/packages` - List lab packages
- `POST /api/v1/lab-tests/booking` - Book lab test
- `GET /api/v1/lab-tests/bookings` - Get user bookings

### Consultations Endpoints
- `GET /api/v1/consultations/doctors` - List doctors
- `POST /api/v1/consultations/book` - Book consultation
- `GET /api/v1/consultations/` - Get user consultations

### Medicines Endpoints
- `GET /api/v1/medicines/` - List medicines
- `POST /api/v1/medicines/cart` - Add to cart
- `POST /api/v1/medicines/order` - Place order

### Health Reports Endpoints
- `GET /api/v1/health-reports/` - List user reports
- `POST /api/v1/health-reports/upload` - Upload report
- `GET /api/v1/health-reports/{id}/download` - Download report

## 🔒 Security Features

- **JWT Authentication** with access and refresh tokens
- **Password Hashing** using bcrypt
- **Input Validation** with Pydantic schemas
- **SQL Injection Protection** with SQLAlchemy ORM
- **CORS Configuration** for frontend integration
- **Rate Limiting** to prevent abuse
- **File Upload Validation** for security

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts and profiles
- `doctors` - Doctor-specific information
- `lab_tests` - Available lab tests
- `lab_packages` - Test packages
- `lab_bookings` - Test bookings
- `consultations` - Doctor consultations
- `medicines` - Medicine catalog
- `medicine_orders` - Medicine orders
- `health_reports` - Health reports and records

## 🚀 Deployment

### Using Docker (Recommended)
```bash
# Build image
docker build -t healthwise-api .

# Run with docker-compose
docker-compose up -d
```

### Manual Deployment
```bash
# Install production dependencies
pip install gunicorn

# Run with Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## 📝 Development

### Code Style
```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

### Database Migrations
```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | Required |
| `SECRET_KEY` | JWT secret key | Required |
| `ENVIRONMENT` | Environment (development/production) | development |
| `DEBUG` | Debug mode | true |
| `SMTP_USER` | Email username | Optional |
| `SMTP_PASSWORD` | Email password | Optional |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@healthwise.com
- Documentation: [API Docs](http://localhost:8000/docs)
- Issues: [GitHub Issues](https://github.com/healthwise/backend/issues)

## 🔄 API Integration with Frontend

Update your frontend API configuration to use the new backend:

```typescript
// In your frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

The backend is fully compatible with your existing frontend and provides all the endpoints needed for:
- User authentication and registration
- Lab test booking and management
- Doctor consultation booking
- Medicine ordering
- Health report management

Start the backend server and your frontend will seamlessly integrate with the new Python API!