// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  
  // User Management
  PROFILE: '/api/user/profile',
  HEALTH_PROFILE: '/api/user/health-profile',
  PREFERENCES: '/api/user/preferences',
  
  // Health Data
  SYMPTOMS: '/api/health/symptoms',
  SYMPTOM_ANALYSIS: '/api/health/symptom-analysis',
  HEALTH_METRICS: '/api/health/metrics',
  MEDICATIONS: '/api/health/medications',
  PRESCRIPTIONS: '/api/health/prescriptions',
  
  // Appointments
  APPOINTMENTS: '/api/appointments',
  DOCTORS: '/api/doctors',
  AVAILABILITY: '/api/doctors/availability',
  
  // Community
  SUPPORT_GROUPS: '/api/community/groups',
  HEALTH_EVENTS: '/api/community/events',
  HEALTH_CHALLENGES: '/api/community/challenges',
  FORUMS: '/api/community/forums',
  
  // Emergency
  EMERGENCY_CONTACTS: '/api/emergency/contacts',
  EMERGENCY_ALERTS: '/api/emergency/alerts',
  EMERGENCY_SERVICES: '/api/emergency/services',
  
  // AI Services
  AI_CHAT: '/api/ai/chat',
  HEALTH_INSIGHTS: '/api/ai/insights',
  RISK_ASSESSMENT: '/api/ai/risk-assessment',
  
  // Devices
  HEALTH_DEVICES: '/api/devices',
  DEVICE_SYNC: '/api/devices/sync',
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_PREFERENCES: '/api/notifications/preferences'
} as const

// Health Categories
export const HEALTH_CATEGORIES = {
  GENERAL: 'general',
  CARDIOVASCULAR: 'cardiovascular',
  RESPIRATORY: 'respiratory',
  NEUROLOGICAL: 'neurological',
  DIGESTIVE: 'digestive',
  MUSCULOSKELETAL: 'musculoskeletal',
  DERMATOLOGICAL: 'dermatological',
  MENTAL_HEALTH: 'mental-health',
  REPRODUCTIVE: 'reproductive',
  ENDOCRINE: 'endocrine',
  IMMUNE: 'immune',
  ONCOLOGY: 'oncology'
} as const

// Symptom Severity Levels
export const SYMPTOM_SEVERITY = {
  MILD: 1,
  MODERATE: 2,
  SEVERE: 3,
  CRITICAL: 4
} as const

// Health Metric Types
export const HEALTH_METRIC_TYPES = {
  HEART_RATE: 'heart-rate',
  BLOOD_PRESSURE: 'blood-pressure',
  TEMPERATURE: 'temperature',
  WEIGHT: 'weight',
  HEIGHT: 'height',
  BMI: 'bmi',
  GLUCOSE: 'glucose',
  OXYGEN_SATURATION: 'oxygen-saturation',
  CHOLESTEROL: 'cholesterol',
  STEPS: 'steps',
  SLEEP: 'sleep',
  HYDRATION: 'hydration'
} as const

// Emergency Priority Levels
export const EMERGENCY_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

// Appointment Types
export const APPOINTMENT_TYPES = {
  CONSULTATION: 'consultation',
  FOLLOW_UP: 'follow-up',
  EMERGENCY: 'emergency',
  SCREENING: 'screening',
  THERAPY: 'therapy',
  VACCINATION: 'vaccination'
} as const

// Appointment Status
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show'
} as const

// Device Types
export const DEVICE_TYPES = {
  SMARTWATCH: 'smartwatch',
  BLOOD_PRESSURE_MONITOR: 'blood-pressure-monitor',
  GLUCOMETER: 'glucometer',
  SCALE: 'scale',
  PULSE_OXIMETER: 'pulse-oximeter',
  THERMOMETER: 'thermometer',
  FITNESS_TRACKER: 'fitness-tracker'
} as const

// Notification Types
export const NOTIFICATION_TYPES = {
  APPOINTMENT: 'appointment',
  MEDICATION: 'medication',
  HEALTH_ALERT: 'health-alert',
  COMMUNITY: 'community',
  SYSTEM: 'system',
  EMERGENCY: 'emergency'
} as const

// Health Challenge Types
export const CHALLENGE_TYPES = {
  STEPS: 'steps',
  HYDRATION: 'hydration',
  MEDITATION: 'meditation',
  EXERCISE: 'exercise',
  NUTRITION: 'nutrition',
  SLEEP: 'sleep',
  WEIGHT_LOSS: 'weight-loss'
} as const

// User Roles
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
} as const

// Health Event Types
export const EVENT_TYPES = {
  SCREENING: 'screening',
  WORKSHOP: 'workshop',
  SEMINAR: 'seminar',
  SUPPORT_GROUP: 'support-group',
  VACCINATION: 'vaccination',
  HEALTH_FAIR: 'health-fair'
} as const

// AI Confidence Levels
export const AI_CONFIDENCE = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 0.8,
  VERY_HIGH: 0.9
} as const

// Health Ranges (Normal Values)
export const HEALTH_RANGES = {
  HEART_RATE: {
    MIN: 60,
    MAX: 100,
    UNIT: 'bpm'
  },
  BLOOD_PRESSURE: {
    SYSTOLIC: { MIN: 90, MAX: 120 },
    DIASTOLIC: { MIN: 60, MAX: 80 },
    UNIT: 'mmHg'
  },
  TEMPERATURE: {
    MIN: 97.0,
    MAX: 99.0,
    UNIT: '°F'
  },
  BMI: {
    UNDERWEIGHT: 18.5,
    NORMAL: 24.9,
    OVERWEIGHT: 29.9,
    OBESE: 30.0
  },
  GLUCOSE: {
    FASTING: { MIN: 70, MAX: 100 },
    RANDOM: { MIN: 70, MAX: 140 },
    UNIT: 'mg/dL'
  },
  OXYGEN_SATURATION: {
    MIN: 95,
    MAX: 100,
    UNIT: '%'
  }
} as const

// Emergency Contact Relationships
export const EMERGENCY_RELATIONSHIPS = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Relative',
  'Caregiver',
  'Other'
] as const

// Languages
export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean',
  'Arabic',
  'Hindi',
  'Russian'
] as const

// Time Zones
export const TIME_ZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney'
] as const

// File Upload Limits
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain'
  ]
} as const

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
} as const

// Cache Keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  HEALTH_METRICS: 'health_metrics',
  APPOINTMENTS: 'appointments',
  NOTIFICATIONS: 'notifications',
  DOCTORS: 'doctors',
  SUPPORT_GROUPS: 'support_groups'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const