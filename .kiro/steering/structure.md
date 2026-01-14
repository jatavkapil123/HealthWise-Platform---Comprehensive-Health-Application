# Project Structure

## Root Layout

```
healthwise-platform/
├── src/                    # Frontend Next.js application
├── backend/                # Python FastAPI backend
├── .kiro/                  # Kiro configuration and steering
├── start_healthwise.sh     # Quick start script
└── [config files]          # package.json, tsconfig.json, etc.
```

## Frontend Structure (src/)

```
src/
├── app/                           # Next.js App Router pages
│   ├── (auth)/                   # Auth-related pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (services)/               # Health service pages
│   │   ├── lab-tests/
│   │   ├── consult-doctor/
│   │   ├── medicines/
│   │   ├── health-reports/
│   │   ├── book-appointment/
│   │   └── health-alerts/
│   ├── (content)/                # Content pages
│   │   ├── health-library/
│   │   ├── web-stories/
│   │   ├── health-tests/
│   │   ├── corporate-benefits/
│   │   └── medicards/
│   ├── (user)/                   # User account pages
│   │   ├── my-account/
│   │   └── my-orders/
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Homepage
│   ├── providers.tsx             # React Context providers
│   └── globals.css               # Global styles
├── components/
│   ├── home/                     # Homepage components
│   ├── layout/                   # Layout components (Header, Footer, etc.)
│   └── ui/                       # Reusable UI components
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── services/
│   └── api.ts                    # API service layer (Axios)
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   └── helpers.ts                # Utility functions
└── lib/
    └── constants.ts              # App constants and endpoints
```

## Backend Structure (backend/)

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── api.py                    # API router aggregation
│   │       └── endpoints/                # API endpoint handlers
│   │           ├── auth.py               # Authentication endpoints
│   │           ├── users.py              # User management
│   │           ├── appointments.py       # Appointment booking
│   │           ├── consultations.py      # Doctor consultations
│   │           ├── lab_tests.py          # Lab test booking
│   │           ├── medicines.py          # Medicine ordering
│   │           ├── health_reports.py     # Health reports
│   │           ├── health_alerts.py      # Health alerts & monitoring
│   │           └── health_content.py     # Health library content
│   ├── core/
│   │   ├── config.py                     # Application settings
│   │   ├── database.py                   # Database connection
│   │   └── security.py                   # JWT & password utilities
│   ├── models/                           # SQLAlchemy database models
│   │   ├── user.py
│   │   ├── appointments.py
│   │   ├── consultations.py
│   │   ├── lab_tests.py
│   │   ├── medicines.py
│   │   ├── health_reports.py
│   │   ├── health_alerts.py
│   │   ├── health_content.py
│   │   └── password_reset.py
│   ├── schemas/                          # Pydantic validation schemas
│   │   ├── auth.py
│   │   ├── appointments.py
│   │   ├── health_alerts.py
│   │   └── health_content.py
│   ├── services/                         # Business logic layer
│   │   ├── email.py                      # Email service
│   │   └── health_alerts.py             # Health alerts service
│   ├── middleware/
│   │   ├── logging.py                    # Request logging
│   │   └── rate_limit.py                 # Rate limiting
│   └── main.py                           # FastAPI app initialization
├── scripts/
│   ├── init_db.py                        # Full database initialization
│   └── simple_init.py                    # Quick setup with demo data
├── logs/                                 # Application logs
├── uploads/                              # File uploads directory
├── requirements.txt                      # Python dependencies
└── run.py                                # Application entry point
```

## Key Conventions

### Frontend
- **Pages**: Use Next.js App Router with `page.tsx` files
- **Components**: Functional components with TypeScript
- **Styling**: Tailwind CSS utility classes
- **API Calls**: Use `apiService` from `src/services/api.ts`
- **State**: React Context for global state (auth)
- **Imports**: Use `@/` alias for src directory imports

### Backend
- **Endpoints**: RESTful API design under `/api/v1/`
- **Models**: SQLAlchemy ORM models in `app/models/`
- **Schemas**: Pydantic models for request/response validation
- **Services**: Business logic separated from endpoints
- **Auth**: JWT tokens with Bearer authentication
- **Responses**: Consistent JSON response format

## File Naming

### Frontend
- Pages: `page.tsx`
- Components: PascalCase (e.g., `Header.tsx`, `HealthCard.tsx`)
- Utilities: camelCase (e.g., `helpers.ts`, `constants.ts`)
- Types: `index.ts` or descriptive names

### Backend
- Modules: snake_case (e.g., `health_alerts.py`, `lab_tests.py`)
- Classes: PascalCase (e.g., `User`, `HealthAlert`)
- Functions: snake_case (e.g., `get_current_user`, `create_alert`)
- Constants: UPPER_SNAKE_CASE (e.g., `SECRET_KEY`, `DATABASE_URL`)

## Database

- **ORM**: SQLAlchemy with declarative base
- **Migrations**: Alembic (available but not actively used)
- **Initialization**: Use `scripts/simple_init.py` for quick setup
- **Tables**: Defined in `app/models/` with relationships
