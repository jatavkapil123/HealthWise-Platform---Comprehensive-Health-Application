# Technology Stack

## Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Axios with interceptors for token management
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **UI Libraries**: Framer Motion, Recharts, React Calendar

## Backend

- **Framework**: FastAPI 0.104+
- **Language**: Python 3.8+
- **Database**: MySQL 8.0+ with SQLAlchemy ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Pydantic schemas and pydantic-settings
- **Server**: Uvicorn (development), Gunicorn (production)
- **Email**: SMTP (Gmail) with simulated emails in development
- **File Storage**: Local uploads directory (Cloudinary integration available)

## Development Tools

- **Package Manager**: npm (frontend), pip with venv (backend)
- **Linting**: ESLint (frontend), Flake8 (backend)
- **Formatting**: Black (backend)
- **Testing**: Jest (frontend), Pytest (backend)

## Common Commands

### Frontend
```bash
npm install              # Install dependencies
npm run dev             # Start development server (port 3000)
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
```

### Backend
```bash
# Setup
python -m venv venv                    # Create virtual environment
source venv/bin/activate               # Activate venv (Linux/Mac)
venv\Scripts\activate                  # Activate venv (Windows)
pip install -r requirements.txt        # Install dependencies

# Database
python scripts/simple_init.py          # Initialize database with demo data
python scripts/init_db.py              # Full database initialization

# Run
python run.py                          # Start backend server (port 8001)
uvicorn app.main:app --reload          # Alternative dev server

# Testing & Quality
pytest                                 # Run tests
black app/                             # Format code
flake8 app/                           # Lint code
```

### Quick Start
```bash
./start_healthwise.sh   # Start both frontend and backend
```

## API Configuration

- **Backend URL**: `http://localhost:8001`
- **Frontend URL**: `http://localhost:3000`
- **API Base**: `/api/v1`
- **API Docs**: `http://localhost:8001/docs` (development only)

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)
```
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/healthwise
SECRET_KEY=your-secret-key
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

## Key Dependencies

### Frontend
- next: ^14.0.0
- react: ^18.2.0
- typescript: ^5.0.0
- axios: ^1.6.0
- tailwindcss: ^3.3.0

### Backend
- fastapi: 0.104.1
- sqlalchemy: 2.0.23
- pymysql: 1.1.0
- python-jose: 3.3.0
- passlib: 1.7.4
