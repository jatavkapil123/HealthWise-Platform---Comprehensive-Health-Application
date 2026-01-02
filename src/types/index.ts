// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'patient' | 'doctor' | 'admin'
  createdAt: Date
  updatedAt: Date
}

// Health Data Types
export interface HealthMetric {
  id: string
  userId: string
  type: 'heart-rate' | 'blood-pressure' | 'temperature' | 'weight' | 'glucose' | 'oxygen-saturation'
  value: number | string
  unit: string
  timestamp: Date
  deviceId?: string
  notes?: string
}

export interface Symptom {
  id: string
  name: string
  category: string
  severity?: 'mild' | 'moderate' | 'severe'
  description?: string
}

export interface SymptomLog {
  id: string
  userId: string
  symptoms: string[]
  severity: number
  duration: string
  notes?: string
  timestamp: Date
}

// Medical Types
export interface Condition {
  id: string
  name: string
  description: string
  symptoms: string[]
  category: string
  severity: 'mild' | 'moderate' | 'severe'
  icd10Code?: string
}

export interface Medication {
  id: string
  name: string
  genericName?: string
  dosage: string
  frequency: string
  instructions: string
  sideEffects: string[]
  interactions: string[]
  category: string
}

export interface Prescription {
  id: string
  userId: string
  doctorId: string
  medications: {
    medicationId: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }[]
  diagnosis: string
  notes?: string
  createdAt: Date
  expiresAt: Date
}

// Appointment Types
export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  type: 'consultation' | 'follow-up' | 'emergency' | 'screening'
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  scheduledAt: Date
  duration: number
  notes?: string
  meetingLink?: string
  createdAt: Date
}

export interface Doctor {
  id: string
  name: string
  specialization: string[]
  qualifications: string[]
  experience: number
  rating: number
  availability: {
    day: string
    slots: string[]
  }[]
  consultationFee: number
  languages: string[]
  avatar?: string
}

// Community Types
export interface SupportGroup {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  isPrivate: boolean
  moderators: string[]
  createdAt: Date
  lastActivity: Date
}

export interface HealthEvent {
  id: string
  title: string
  description: string
  type: 'screening' | 'workshop' | 'seminar' | 'support-group'
  date: Date
  duration: number
  location: string
  maxAttendees?: number
  currentAttendees: number
  organizer: string
  isVirtual: boolean
  meetingLink?: string
}

export interface HealthChallenge {
  id: string
  title: string
  description: string
  type: 'steps' | 'hydration' | 'meditation' | 'exercise' | 'nutrition'
  duration: number
  target: number
  unit: string
  participants: number
  reward: string
  startDate: Date
  endDate: Date
}

// AI & Analysis Types
export interface SymptomAnalysis {
  possibleConditions: {
    name: string
    probability: number
    severity: 'mild' | 'moderate' | 'severe'
    description: string
  }[]
  recommendations: string[]
  urgency: 'low' | 'medium' | 'high'
  shouldSeeDoctor: boolean
  confidence: number
}

export interface HealthInsight {
  id: string
  userId: string
  type: 'trend' | 'alert' | 'recommendation' | 'achievement'
  title: string
  description: string
  data?: any
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  isRead: boolean
}

// Device Integration Types
export interface HealthDevice {
  id: string
  userId: string
  name: string
  type: 'smartwatch' | 'blood-pressure-monitor' | 'glucometer' | 'scale' | 'pulse-oximeter'
  brand: string
  model: string
  isConnected: boolean
  lastSync: Date
  batteryLevel?: number
}

// Emergency Types
export interface EmergencyContact {
  id: string
  userId: string
  name: string
  relationship: string
  phone: string
  email?: string
  isPrimary: boolean
}

export interface EmergencyAlert {
  id: string
  userId: string
  type: 'medical' | 'fall' | 'panic' | 'medication'
  severity: 'low' | 'medium' | 'high' | 'critical'
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  vitals?: HealthMetric[]
  message?: string
  timestamp: Date
  status: 'active' | 'acknowledged' | 'resolved'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Form Types
export interface HealthProfileForm {
  age: number
  gender: 'male' | 'female' | 'other'
  height: number
  weight: number
  bloodType?: string
  allergies: string[]
  chronicConditions: string[]
  medications: string[]
  emergencyContacts: EmergencyContact[]
  insuranceInfo?: {
    provider: string
    policyNumber: string
    groupNumber?: string
  }
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'appointment' | 'medication' | 'health-alert' | 'community' | 'system'
  title: string
  message: string
  data?: any
  isRead: boolean
  createdAt: Date
  scheduledFor?: Date
}