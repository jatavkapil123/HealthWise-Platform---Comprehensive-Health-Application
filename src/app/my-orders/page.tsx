'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Package, Clock, CheckCircle, XCircle, Truck, Calendar, 
  MapPin, Phone, Download, Eye, RefreshCw, Filter, Search,
  Activity, Stethoscope, Pill, FileText
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Order {
  id: string
  type: 'lab-test' | 'consultation' | 'medicine' | 'health-report'
  title: string
  description: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  date: string
  amount: number
  items?: string[]
  doctor?: string
  location?: string
  trackingId?: string
}

export default function MyOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    // Mock orders data - in real app, fetch from API
    const mockOrders: Order[] = [
      {
        id: 'LAB001',
        type: 'lab-test',
        title: 'Full Body Checkup - Basic',
        description: '59 tests including CBC, Lipid Profile, Liver Function',
        status: 'completed',
        date: '2024-01-05',
        amount: 499,
        items: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test'],
        location: 'Home Collection - Completed'
      },
      {
        id: 'CON001',
        type: 'consultation',
        title: 'General Physician Consultation',
        description: 'Online consultation with Dr. Sarah Johnson',
        status: 'completed',
        date: '2024-01-03',
        amount: 299,
        doctor: 'Dr. Sarah Johnson',
        location: 'Video Consultation'
      },
      {
        id: 'MED001',
        type: 'medicine',
        title: 'Medicine Order',
        description: 'Prescription medicines and supplements',
        status: 'in-progress',
        date: '2024-01-07',
        amount: 156,
        items: ['Paracetamol 500mg', 'Vitamin D3', 'Calcium Tablets'],
        trackingId: 'TRK123456789'
      },
      {
        id: 'LAB002',
        type: 'lab-test',
        title: 'Diabetes Care Package',
        description: '8 tests for diabetes monitoring',
        status: 'confirmed',
        date: '2024-01-08',
        amount: 299,
        items: ['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin Level'],
        location: 'Scheduled for Jan 10, 2024'
      },
      {
        id: 'REP001',
        type: 'health-report',
        title: 'Health Report Analysis',
        description: 'AI-powered health insights and recommendations',
        status: 'completed',
        date: '2024-01-06',
        amount: 99,
        items: ['Health Score Analysis', 'Risk Assessment', 'Personalized Recommendations']
      }
    ]
    
    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
  }, [])

  useEffect(() => {
    let filtered = orders

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(order => order.type === selectedFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredOrders(filtered)
  }, [orders, selectedFilter, searchQuery])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100'
      case 'in-progress':
        return 'text-blue-700 bg-blue-100'
      case 'confirmed':
        return 'text-purple-700 bg-purple-100'
      case 'pending':
        return 'text-yellow-700 bg-yellow-100'
      case 'cancelled':
        return 'text-red-700 bg-red-100'
      default:
        return 'text-gray-700 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      case 'confirmed':
        return <Calendar className="h-4 w-4" />
      case 'pending':
        return <RefreshCw className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab-test':
        return <Activity className="h-5 w-5 text-blue-600" />
      case 'consultation':
        return <Stethoscope className="h-5 w-5 text-green-600" />
      case 'medicine':
        return <Pill className="h-5 w-5 text-red-600" />
      case 'health-report':
        return <FileText className="h-5 w-5 text-purple-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab-test':
        return 'Lab Test'
      case 'consultation':
        return 'Consultation'
      case 'medicine':
        return 'Medicine'
      case 'health-report':
        return 'Health Report'
      default:
        return 'Order'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'lab-test', label: 'Lab Tests', count: orders.filter(o => o.type === 'lab-test').length },
    { value: 'consultation', label: 'Consultations', count: orders.filter(o => o.type === 'consultation').length },
    { value: 'medicine', label: 'Medicines', count: orders.filter(o => o.type === 'medicine').length },
    { value: 'health-report', label: 'Reports', count: orders.filter(o => o.type === 'health-report').length }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your health service orders</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t placed any orders yet'
                }
              </p>
              {!searchQuery && selectedFilter === 'all' && (
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="/lab-tests"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Lab Test
                  </a>
                  <a
                    href="/consult-doctor"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Consult Doctor
                  </a>
                  <a
                    href="/medicines"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Order Medicine
                  </a>
                </div>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getTypeIcon(order.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{order.title}</h3>
                          <span className="text-sm text-gray-500">#{order.id}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{order.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                          
                          {order.doctor && (
                            <div className="flex items-center gap-1">
                              <Stethoscope className="h-4 w-4" />
                              {order.doctor}
                            </div>
                          )}
                          
                          {order.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {order.location}
                            </div>
                          )}
                          
                          {order.trackingId && (
                            <div className="flex items-center gap-1">
                              <Truck className="h-4 w-4" />
                              Track: {order.trackingId}
                            </div>
                          )}
                        </div>
                        
                        {order.items && order.items.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                            <div className="flex flex-wrap gap-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {item}
                                </span>
                              ))}
                              {order.items.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  +{order.items.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount and Actions */}
                  <div className="flex flex-col lg:items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₹{order.amount}</div>
                      <div className="text-sm text-gray-500">{getTypeLabel(order.type)}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                      
                      {order.status === 'completed' && (
                        <button className="flex items-center gap-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      )}
                      
                      {order.trackingId && (
                        <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Truck className="h-4 w-4" />
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Something Else?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/lab-tests"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Activity className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-blue-900">Book Lab Test</span>
              </a>
              
              <a
                href="/consult-doctor"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Stethoscope className="h-6 w-6 text-green-600" />
                <span className="font-medium text-green-900">Consult Doctor</span>
              </a>
              
              <a
                href="/medicines"
                className="flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Pill className="h-6 w-6 text-red-600" />
                <span className="font-medium text-red-900">Order Medicine</span>
              </a>
              
              <a
                href="/health-reports"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <FileText className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-purple-900">View Reports</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}