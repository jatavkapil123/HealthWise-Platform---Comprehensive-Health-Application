// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// User Types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone?: string
  date_of_birth?: string
  gender?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
  role: 'patient' | 'doctor' | 'admin'
  is_active: boolean
  is_verified?: boolean
  email_verified?: boolean
  phone_verified?: boolean
  avatar_url?: string
  bio?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relation?: string
  blood_group?: string
  allergies?: string
  chronic_conditions?: string
  current_medications?: string
  license_number?: string
  specialization?: string
  qualification?: string
  experience_years?: number
  consultation_fee?: number
  created_at: string
  updated_at?: string
  last_login?: string
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

// Lab Tests Types
export interface LabTest {
  id: string
  name: string
  description: string
  category: 'pathology' | 'radiology' | 'cardiology' | 'neurology'
  type: 'blood' | 'urine' | 'imaging' | 'ecg' | 'ultrasound' | 'mri' | 'ct-scan' | 'x-ray'
  price: number
  originalPrice?: number
  duration: string // "2-4 hours", "Same day", etc.
  fasting: boolean
  homeCollection: boolean
  parameters: string[]
  preparation?: string[]
  sampleType?: string
  reportDelivery: string
}

export interface LabPackage {
  id: string
  name: string
  description: string
  category: string
  tests: LabTest[]
  totalTests: number
  price: number
  originalPrice: number
  discount: number
  popular: boolean
  homeCollection: boolean
  reportDelivery: string
  includes: string[]
}

export interface LabBooking {
  id: string
  userId: string
  packageId?: string
  testIds: string[]
  patientInfo: {
    name: string
    age: number
    gender: 'male' | 'female' | 'other'
    phone: string
    email: string
  }
  address: {
    street: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  collectionType: 'home' | 'lab'
  preferredDate: Date
  preferredTime: string
  totalAmount: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  bookingStatus: 'confirmed' | 'sample-collected' | 'processing' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface LabResult {
  id: string
  bookingId: string
  userId: string
  testId: string
  testName: string
  parameters: {
    name: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'high' | 'low' | 'critical'
  }[]
  overallStatus: 'normal' | 'abnormal' | 'critical'
  reportUrl: string
  reportedAt: Date
  reviewedBy?: string
}

// Doctor Consultation Types
export interface Doctor {
  id: string
  name: string
  specialization: string[]
  qualification: string[]
  experience: number
  rating: number
  reviewCount: number
  languages: string[]
  consultationFee: number
  avatar?: string
  about: string
  availability: {
    day: string
    slots: string[]
  }[]
  hospitalAffiliation?: string[]
  verified: boolean
}

export interface ConsultationBooking {
  id: string
  userId: string
  doctorId: string
  type: 'video' | 'audio' | 'chat'
  appointmentDate: Date
  appointmentTime: string
  duration: number // in minutes
  reason: string
  symptoms?: string[]
  patientNotes?: string
  consultationFee: number
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'no-show'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  meetingLink?: string
  prescriptionId?: string
  followUpRequired?: boolean
  createdAt: Date
  updatedAt: Date
}

// Medicine Types
export interface Medicine {
  id: string
  name: string
  genericName: string
  brand: string
  manufacturer: string
  category: string
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops'
  strength: string
  packSize: string
  price: number
  mrp: number
  discount: number
  prescription: boolean
  inStock: boolean
  description: string
  uses: string[]
  sideEffects: string[]
  contraindications: string[]
  interactions: string[]
  dosage: string
  storage: string
  imageUrl?: string
}

export interface MedicineOrder {
  id: string
  userId: string
  items: {
    medicineId: string
    quantity: number
    price: number
  }[]
  prescriptionId?: string
  deliveryAddress: {
    name: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  totalAmount: number
  deliveryCharges: number
  discount: number
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
  estimatedDelivery: Date
  trackingId?: string
  createdAt: Date
  updatedAt: Date
}

// Health Reports
export interface HealthReport {
  id: string
  userId: string
  type: 'lab-result' | 'consultation-summary' | 'prescription' | 'health-checkup'
  title: string
  date: Date
  doctorName?: string
  labName?: string
  summary: string
  findings: string[]
  recommendations: string[]
  fileUrl: string
  tags: string[]
  shared: boolean
  sharedWith?: string[]
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