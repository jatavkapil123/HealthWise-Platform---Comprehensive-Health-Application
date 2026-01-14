'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  AlertTriangle, Heart, Pill, Calendar, Activity, Bell, 
  CheckCircle, XCircle, Clock, Filter, Search, Plus,
  Thermometer, Zap, Shield, Phone, User, Target
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface HealthAlert {
  id: number
  title: string
  message: string
  alert_type: string
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency'
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed'
  triggered_at: string
  acknowledged_at?: string
  resolved_at?: string
  action_required: boolean
  alert_data?: any
}

interface VitalSigns {
  id: number
  heart_rate?: number
  systolic_bp?: number
  diastolic_bp?: number
  temperature?: number
  oxygen_saturation?: number
  blood_glucose?: number
  weight?: number
  recorded_at: string
}

interface MedicationReminder {
  id: number
  medication_name: string
  dosage: string
  frequency: string
  next_dose_time: string
  is_active: boolean
  total_doses: number
  missed_doses: number
}

export default function HealthAlertsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  const [alerts, setAlerts] = useState<HealthAlert[]>([])
  const [vitalSigns, setVitalSigns] = useState<VitalSigns[]>([])
  const [medications, setMedications] = useState<MedicationReminder[]>([])
  const [selectedTab, setSelectedTab] = useState('alerts')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadHealthData()
    }
  }, [isAuthenticated])

  const loadHealthData = async () => {
    setIsLoadingData(true)
    try {
      // Mock data for demonstration
      const mockAlerts: HealthAlert[] = [
        {
          id: 1,
          title: "High Blood Pressure Alert",
          message: "Your blood pressure reading of 150/95 mmHg is elevated. Please monitor closely and consult your doctor.",
          alert_type: "vital_signs",
          severity: "high",
          status: "active",
          triggered_at: "2024-01-08T10:30:00Z",
          action_required: true,
          alert_data: { systolic: 150, diastolic: 95 }
        },
        {
          id: 2,
          title: "Medication Reminder",
          message: "You missed your Lisinopril dose scheduled for 8:00 AM. Please take it now if safe to do so.",
          alert_type: "medication",
          severity: "medium",
          status: "active",
          triggered_at: "2024-01-08T08:15:00Z",
          action_required: true
        },
        {
          id: 3,
          title: "Heart Rate Normal",
          message: "Your heart rate of 72 BPM is within normal range. Keep up the good work!",
          alert_type: "vital_signs",
          severity: "low",
          status: "acknowledged",
          triggered_at: "2024-01-07T14:20:00Z",
          acknowledged_at: "2024-01-07T14:25:00Z",
          action_required: false
        },
        {
          id: 4,
          title: "Health Goal Progress",
          message: "Great job! You've completed 80% of your daily step goal. Just 2,000 more steps to go!",
          alert_type: "health_reminder",
          severity: "low",
          status: "active",
          triggered_at: "2024-01-08T16:00:00Z",
          action_required: false
        }
      ]

      const mockVitalSigns: VitalSigns[] = [
        {
          id: 1,
          heart_rate: 72,
          systolic_bp: 120,
          diastolic_bp: 80,
          temperature: 36.5,
          oxygen_saturation: 98,
          recorded_at: "2024-01-08T09:00:00Z"
        },
        {
          id: 2,
          heart_rate: 78,
          systolic_bp: 150,
          diastolic_bp: 95,
          temperature: 36.8,
          oxygen_saturation: 97,
          recorded_at: "2024-01-08T10:30:00Z"
        }
      ]

      const mockMedications: MedicationReminder[] = [
        {
          id: 1,
          medication_name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          next_dose_time: "2024-01-09T08:00:00Z",
          is_active: true,
          total_doses: 25,
          missed_doses: 2
        },
        {
          id: 2,
          medication_name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          next_dose_time: "2024-01-08T20:00:00Z",
          is_active: true,
          total_doses: 48,
          missed_doses: 1
        }
      ]

      setAlerts(mockAlerts)
      setVitalSigns(mockVitalSigns)
      setMedications(mockMedications)
    } catch (error) {
      console.error('Error loading health data:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'high':
        return 'text-orange-700 bg-orange-100 border-orange-200'
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-200'
      case 'emergency':
        return 'text-red-800 bg-red-200 border-red-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-4 w-4" />
      case 'medium':
        return <Clock className="h-4 w-4" />
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'critical':
        return <XCircle className="h-4 w-4" />
      case 'emergency':
        return <Zap className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vital_signs':
        return <Activity className="h-5 w-5 text-blue-600" />
      case 'medication':
        return <Pill className="h-5 w-5 text-green-600" />
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-600" />
      case 'health_reminder':
        return <Target className="h-5 w-5 text-orange-600" />
      case 'emergency':
        return <Phone className="h-5 w-5 text-red-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const acknowledgeAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged', acknowledged_at: new Date().toISOString() }
        : alert
    ))
  }

  const resolveAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved', resolved_at: new Date().toISOString() }
        : alert
    ))
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity
    const matchesSearch = searchQuery === '' || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSeverity && matchesSearch
  })

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health alerts...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Alerts & Monitoring</h1>
          <p className="text-gray-600">Stay on top of your health with real-time alerts and monitoring</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-orange-600">
                  {alerts.filter(a => a.severity === 'critical' || a.severity === 'emergency').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medications</p>
                <p className="text-2xl font-bold text-green-600">
                  {medications.filter(m => m.is_active).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Pill className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-blue-600">85%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'alerts', label: 'Health Alerts', icon: Bell },
                { id: 'vitals', label: 'Vital Signs', icon: Activity },
                { id: 'medications', label: 'Medications', icon: Pill },
                { id: 'emergency', label: 'Emergency', icon: Phone }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'alerts' && (
              <div>
                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                  <div className="flex flex-wrap gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="acknowledged">Acknowledged</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <select
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Severity</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  <div className="relative w-full lg:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Alerts List */}
                <div className="space-y-4">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                      <p className="text-gray-600">
                        {searchQuery || filterStatus !== 'all' || filterSeverity !== 'all'
                          ? 'Try adjusting your filters'
                          : 'All good! No health alerts at the moment.'
                        }
                      </p>
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <div key={alert.id} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex-shrink-0">
                              {getTypeIcon(alert.alert_type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                                  {getSeverityIcon(alert.severity)}
                                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-3">{alert.message}</p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>
                                  {new Date(alert.triggered_at).toLocaleDateString()} at{' '}
                                  {new Date(alert.triggered_at).toLocaleTimeString()}
                                </span>
                                {alert.acknowledged_at && (
                                  <span className="text-green-600">
                                    Acknowledged {new Date(alert.acknowledged_at).toLocaleDateString()}
                                  </span>
                                )}
                                {alert.resolved_at && (
                                  <span className="text-blue-600">
                                    Resolved {new Date(alert.resolved_at).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {alert.status === 'active' && (
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => acknowledgeAlert(alert.id)}
                                className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                              >
                                Acknowledge
                              </button>
                              <button
                                onClick={() => resolveAlert(alert.id)}
                                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                              >
                                Resolve
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {selectedTab === 'vitals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Vital Signs</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Record Vitals
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vitalSigns.map((vital) => (
                    <div key={vital.id} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">
                          {new Date(vital.recorded_at).toLocaleDateString()}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(vital.recorded_at).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {vital.heart_rate && (
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="text-sm">
                              <strong>{vital.heart_rate}</strong> BPM
                            </span>
                          </div>
                        )}
                        
                        {vital.systolic_bp && vital.diastolic_bp && (
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">
                              <strong>{vital.systolic_bp}/{vital.diastolic_bp}</strong> mmHg
                            </span>
                          </div>
                        )}
                        
                        {vital.temperature && (
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">
                              <strong>{vital.temperature}</strong>°C
                            </span>
                          </div>
                        )}
                        
                        {vital.oxygen_saturation && (
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              <strong>{vital.oxygen_saturation}</strong>% O₂
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'medications' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Medication Reminders</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add Medication
                  </button>
                </div>

                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Pill className="h-6 w-6 text-green-600" />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">{med.medication_name}</h4>
                            <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                            <p className="text-sm text-gray-500">
                              Next dose: {new Date(med.next_dose_time).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            <div>Taken: {med.total_doses}</div>
                            <div className="text-red-600">Missed: {med.missed_doses}</div>
                          </div>
                          <button className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                            Take Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'emergency' && (
              <div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-900">Emergency Alert System</h3>
                  </div>
                  
                  <p className="text-red-800 mb-4">
                    In case of a medical emergency, use the button below to immediately alert your emergency contacts and healthcare providers.
                  </p>
                  
                  <button className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
                    🚨 TRIGGER EMERGENCY ALERT
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Dr. Sarah Johnson</div>
                          <div className="text-sm text-gray-600">Primary Care Physician</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">+1 (555) 123-4567</div>
                        <div className="text-sm text-gray-600">Primary Contact</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-gray-600">Spouse</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">+1 (555) 987-6543</div>
                        <div className="text-sm text-gray-600">Emergency Contact</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add Emergency Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}