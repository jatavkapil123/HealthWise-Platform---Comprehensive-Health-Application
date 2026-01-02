import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HEALTH_RANGES } from '@/lib/constants'

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'time':
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    default:
      return dateObj.toLocaleDateString()
  }
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(dateObj)
}

// Health metric utilities
export function calculateBMI(weight: number, height: number): number {
  // weight in kg, height in cm
  const heightInMeters = height / 100
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export function getBMICategory(bmi: number): string {
  if (bmi < HEALTH_RANGES.BMI.UNDERWEIGHT) return 'Underweight'
  if (bmi <= HEALTH_RANGES.BMI.NORMAL) return 'Normal'
  if (bmi <= HEALTH_RANGES.BMI.OVERWEIGHT) return 'Overweight'
  return 'Obese'
}

export function isHealthMetricNormal(type: string, value: number | string): boolean {
  switch (type) {
    case 'heart-rate':
      const hr = Number(value)
      return hr >= HEALTH_RANGES.HEART_RATE.MIN && hr <= HEALTH_RANGES.HEART_RATE.MAX
    
    case 'temperature':
      const temp = Number(value)
      return temp >= HEALTH_RANGES.TEMPERATURE.MIN && temp <= HEALTH_RANGES.TEMPERATURE.MAX
    
    case 'oxygen-saturation':
      const oxygen = Number(value)
      return oxygen >= HEALTH_RANGES.OXYGEN_SATURATION.MIN && oxygen <= HEALTH_RANGES.OXYGEN_SATURATION.MAX
    
    case 'blood-pressure':
      // Assuming format "120/80"
      const [systolic, diastolic] = String(value).split('/').map(Number)
      return (
        systolic >= HEALTH_RANGES.BLOOD_PRESSURE.SYSTOLIC.MIN &&
        systolic <= HEALTH_RANGES.BLOOD_PRESSURE.SYSTOLIC.MAX &&
        diastolic >= HEALTH_RANGES.BLOOD_PRESSURE.DIASTOLIC.MIN &&
        diastolic <= HEALTH_RANGES.BLOOD_PRESSURE.DIASTOLIC.MAX
      )
    
    default:
      return true
  }
}

export function getHealthMetricStatus(type: string, value: number | string): 'normal' | 'low' | 'high' | 'critical' {
  if (isHealthMetricNormal(type, value)) return 'normal'
  
  switch (type) {
    case 'heart-rate':
      const hr = Number(value)
      if (hr < 50) return 'critical'
      if (hr < HEALTH_RANGES.HEART_RATE.MIN) return 'low'
      if (hr > 120) return 'critical'
      return 'high'
    
    case 'temperature':
      const temp = Number(value)
      if (temp < 95 || temp > 104) return 'critical'
      if (temp < HEALTH_RANGES.TEMPERATURE.MIN) return 'low'
      return 'high'
    
    case 'blood-pressure':
      const [systolic, diastolic] = String(value).split('/').map(Number)
      if (systolic > 180 || diastolic > 120) return 'critical'
      if (systolic < 90 || diastolic < 60) return 'low'
      return 'high'
    
    default:
      return 'normal'
  }
}

// String utilities
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return strongPasswordRegex.test(password)
}

// Number utilities
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

// Color utilities
export function getHealthStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'normal':
    case 'good':
    case 'healthy':
      return 'text-green-600 bg-green-50'
    case 'warning':
    case 'moderate':
    case 'elevated':
      return 'text-yellow-600 bg-yellow-50'
    case 'high':
    case 'severe':
    case 'critical':
      return 'text-red-600 bg-red-50'
    case 'low':
      return 'text-blue-600 bg-blue-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'mild':
      return 'text-green-600 bg-green-100'
    case 'moderate':
      return 'text-yellow-600 bg-yellow-100'
    case 'severe':
      return 'text-red-600 bg-red-100'
    case 'critical':
      return 'text-red-800 bg-red-200'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// URL utilities
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  return searchParams.toString()
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate random ID
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// Age calculation
export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}