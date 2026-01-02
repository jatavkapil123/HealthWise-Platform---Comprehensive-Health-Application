import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_ENDPOINTS, STORAGE_KEYS } from '@/lib/constants'
import { getFromStorage, setToStorage, removeFromStorage } from '@/utils/helpers'
import type { ApiResponse, PaginatedResponse } from '@/types'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = getFromStorage(STORAGE_KEYS.AUTH_TOKEN, null)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = getFromStorage(STORAGE_KEYS.REFRESH_TOKEN, null)
            if (refreshToken) {
              const response = await this.api.post(API_ENDPOINTS.REFRESH, {
                refreshToken,
              })

              const { accessToken } = response.data
              setToStorage(STORAGE_KEYS.AUTH_TOKEN, accessToken)

              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return this.api(originalRequest)
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.logout()
            window.location.href = '/login'
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.get(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.post(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.put(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.delete(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Paginated requests
  async getPaginated<T>(
    url: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    try {
      const response = await this.api.get(url, { params })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // File upload
  async uploadFile<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await this.api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        },
      })

      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Authentication methods
  async login(email: string, password: string) {
    const response = await this.post(API_ENDPOINTS.LOGIN, { email, password })
    
    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data
      setToStorage(STORAGE_KEYS.AUTH_TOKEN, accessToken)
      setToStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
      return { success: true, user }
    }
    
    return response
  }

  async register(userData: any) {
    return this.post(API_ENDPOINTS.REGISTER, userData)
  }

  logout() {
    removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)
    removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN)
  }

  // Health data methods
  async getSymptoms() {
    return this.get(API_ENDPOINTS.SYMPTOMS)
  }

  async analyzeSymptoms(symptoms: string[], additionalInfo?: any) {
    return this.post(API_ENDPOINTS.SYMPTOM_ANALYSIS, {
      symptoms,
      ...additionalInfo,
    })
  }

  async getHealthMetrics(userId: string, type?: string, dateRange?: { start: Date; end: Date }) {
    const params: any = { userId }
    if (type) params.type = type
    if (dateRange) {
      params.startDate = dateRange.start.toISOString()
      params.endDate = dateRange.end.toISOString()
    }
    
    return this.get(API_ENDPOINTS.HEALTH_METRICS, { params })
  }

  async addHealthMetric(metric: any) {
    return this.post(API_ENDPOINTS.HEALTH_METRICS, metric)
  }

  // Appointment methods
  async getAppointments(userId: string, status?: string) {
    const params: any = { userId }
    if (status) params.status = status
    
    return this.getPaginated(API_ENDPOINTS.APPOINTMENTS, params)
  }

  async bookAppointment(appointmentData: any) {
    return this.post(API_ENDPOINTS.APPOINTMENTS, appointmentData)
  }

  async getDoctors(specialization?: string, location?: string) {
    const params: any = {}
    if (specialization) params.specialization = specialization
    if (location) params.location = location
    
    return this.getPaginated(API_ENDPOINTS.DOCTORS, params)
  }

  async getDoctorAvailability(doctorId: string, date: Date) {
    return this.get(`${API_ENDPOINTS.AVAILABILITY}/${doctorId}`, {
      params: { date: date.toISOString().split('T')[0] }
    })
  }

  // Community methods
  async getSupportGroups(category?: string) {
    const params: any = {}
    if (category) params.category = category
    
    return this.getPaginated(API_ENDPOINTS.SUPPORT_GROUPS, params)
  }

  async joinSupportGroup(groupId: string) {
    return this.post(`${API_ENDPOINTS.SUPPORT_GROUPS}/${groupId}/join`)
  }

  async getHealthEvents(type?: string, location?: string) {
    const params: any = {}
    if (type) params.type = type
    if (location) params.location = location
    
    return this.getPaginated(API_ENDPOINTS.HEALTH_EVENTS, params)
  }

  async registerForEvent(eventId: string) {
    return this.post(`${API_ENDPOINTS.HEALTH_EVENTS}/${eventId}/register`)
  }

  async getHealthChallenges(type?: string, status?: string) {
    const params: any = {}
    if (type) params.type = type
    if (status) params.status = status
    
    return this.getPaginated(API_ENDPOINTS.HEALTH_CHALLENGES, params)
  }

  async joinChallenge(challengeId: string) {
    return this.post(`${API_ENDPOINTS.HEALTH_CHALLENGES}/${challengeId}/join`)
  }

  // AI services
  async chatWithAI(message: string, context?: any) {
    return this.post(API_ENDPOINTS.AI_CHAT, {
      message,
      context,
    })
  }

  async getHealthInsights(userId: string) {
    return this.get(`${API_ENDPOINTS.HEALTH_INSIGHTS}/${userId}`)
  }

  async getRiskAssessment(userId: string, healthData: any) {
    return this.post(`${API_ENDPOINTS.RISK_ASSESSMENT}/${userId}`, healthData)
  }

  // Emergency services
  async getEmergencyContacts(userId: string) {
    return this.get(`${API_ENDPOINTS.EMERGENCY_CONTACTS}/${userId}`)
  }

  async addEmergencyContact(userId: string, contact: any) {
    return this.post(`${API_ENDPOINTS.EMERGENCY_CONTACTS}/${userId}`, contact)
  }

  async triggerEmergencyAlert(userId: string, alertData: any) {
    return this.post(`${API_ENDPOINTS.EMERGENCY_ALERTS}/${userId}`, alertData)
  }

  async getNearbyEmergencyServices(location: { latitude: number; longitude: number }) {
    return this.get(API_ENDPOINTS.EMERGENCY_SERVICES, {
      params: location
    })
  }

  // Device integration
  async getConnectedDevices(userId: string) {
    return this.get(`${API_ENDPOINTS.HEALTH_DEVICES}/${userId}`)
  }

  async connectDevice(userId: string, deviceData: any) {
    return this.post(`${API_ENDPOINTS.HEALTH_DEVICES}/${userId}`, deviceData)
  }

  async syncDeviceData(deviceId: string) {
    return this.post(`${API_ENDPOINTS.DEVICE_SYNC}/${deviceId}`)
  }

  // Notifications
  async getNotifications(userId: string, type?: string) {
    const params: any = { userId }
    if (type) params.type = type
    
    return this.getPaginated(API_ENDPOINTS.NOTIFICATIONS, params)
  }

  async markNotificationAsRead(notificationId: string) {
    return this.put(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`)
  }

  async updateNotificationPreferences(userId: string, preferences: any) {
    return this.put(`${API_ENDPOINTS.NOTIFICATION_PREFERENCES}/${userId}`, preferences)
  }

  // Error handling
  private handleError(error: any): ApiResponse<any> {
    console.error('API Error:', error)
    
    if (error.response) {
      return {
        success: false,
        error: error.response.data?.message || 'An error occurred',
        message: error.response.data?.message || 'Request failed'
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to server'
      }
    } else {
      return {
        success: false,
        error: error.message || 'Unknown error',
        message: 'An unexpected error occurred'
      }
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService()
export default apiService