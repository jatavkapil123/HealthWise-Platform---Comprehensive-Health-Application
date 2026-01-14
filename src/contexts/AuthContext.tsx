'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getFromStorage, setToStorage, removeFromStorage } from '@/utils/helpers'
import { STORAGE_KEYS } from '@/lib/constants'
import { apiService } from '@/services/api'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = getFromStorage(STORAGE_KEYS.AUTH_TOKEN, null)
    const userData = getFromStorage(STORAGE_KEYS.USER_DATA, null)
    
    if (token && userData) {
      setUser(userData)
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password)
      
      if (response.success && response.user) {
        setUser(response.user)
        setToStorage(STORAGE_KEYS.USER_DATA, response.user)
        return { success: true }
      }
      
      return { success: false, error: response.error || 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const logout = () => {
    setUser(null)
    removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)
    removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN)
    removeFromStorage(STORAGE_KEYS.USER_DATA)
    apiService.logout()
    
    // Redirect to home page
    window.location.href = '/'
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      setToStorage(STORAGE_KEYS.USER_DATA, updatedUser)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}