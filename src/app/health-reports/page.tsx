'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Download, Share2, Eye, Calendar, FileText, TestTube, Stethoscope, Activity, Clock, Star } from 'lucide-react'

export default function HealthReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const reportTypes = [
    'Lab Test Results',
    'Doctor Consultations',
    'Prescriptions',
    'Health Checkups',
    'Vaccination Records'
  ]

  const healthReports = [
    {
      id: 'report-1',
      title: 'Full Body Checkup - Basic',
      type: 'Lab Test Results',
      date: '2024-01-05',
      doctorName: 'Dr. Rajesh Sharma',
      labName: 'Apollo Diagnostics',
      summary: 'Comprehensive health screening with 59 biomarkers',
      status: 'normal',
      findings: [
        'All parameters within normal range',
        'Vitamin D levels slightly low',
        'Cholesterol levels optimal'
      ],
      recommendations: [
        'Increase sun exposure for Vitamin D',
        'Continue healthy diet',
        'Regular exercise recommended'
      ],
      fileUrl: '/reports/full-body-checkup-jan-2024.pdf',
      shared: false,
      tags: ['routine', 'preventive', 'annual']
    },
    {
      id: 'report-2',
      title: 'Diabetes Care Consultation',
      type: 'Doctor Consultations',
      date: '2024-01-03',
      doctorName: 'Dr. Priya Patel',
      summary: 'Follow-up consultation for diabetes management',
      status: 'attention',
      findings: [
        'HbA1c levels improved from last visit',
        'Blood pressure under control',
        'Weight management progressing well'
      ],
      recommendations: [
        'Continue current medication',
        'Monitor blood sugar twice daily',
        'Schedule next visit in 3 months'
      ],
      fileUrl: '/reports/diabetes-consultation-jan-2024.pdf',
      shared: true,
      sharedWith: ['Dr. Priya Patel'],
      tags: ['diabetes', 'follow-up', 'chronic-care']
    },
    {
      id: 'report-3',
      title: 'Thyroid Function Test',
      type: 'Lab Test Results',
      date: '2023-12-28',
      labName: 'SRL Diagnostics',
      summary: 'Complete thyroid profile assessment',
      status: 'normal',
      findings: [
        'TSH levels normal',
        'T3 and T4 within range',
        'No thyroid dysfunction detected'
      ],
      recommendations: [
        'Continue regular monitoring',
        'Maintain iodine-rich diet',
        'Annual thyroid screening'
      ],
      fileUrl: '/reports/thyroid-test-dec-2023.pdf',
      shared: false,
      tags: ['thyroid', 'routine', 'hormonal']
    },
    {
      id: 'report-4',
      title: 'Heart Health Consultation',
      type: 'Doctor Consultations',
      date: '2023-12-20',
      doctorName: 'Dr. Amit Singh',
      summary: 'Cardiac risk assessment and ECG review',
      status: 'good',
      findings: [
        'ECG shows normal rhythm',
        'Blood pressure optimal',
        'No signs of cardiac stress'
      ],
      recommendations: [
        'Continue cardio exercises',
        'Maintain low-sodium diet',
        'Annual cardiac screening'
      ],
      fileUrl: '/reports/heart-consultation-dec-2023.pdf',
      shared: true,
      sharedWith: ['Dr. Amit Singh', 'Family Doctor'],
      tags: ['cardiology', 'preventive', 'screening']
    },
    {
      id: 'report-5',
      title: 'Prescription - Hypertension',
      type: 'Prescriptions',
      date: '2023-12-15',
      doctorName: 'Dr. Sunita Gupta',
      summary: 'Medication prescription for blood pressure management',
      status: 'active',
      findings: [
        'Blood pressure elevated',
        'Lifestyle modifications needed',
        'Medication adjustment required'
      ],
      recommendations: [
        'Take prescribed medication daily',
        'Monitor BP twice weekly',
        'Reduce salt intake'
      ],
      fileUrl: '/reports/prescription-hypertension-dec-2023.pdf',
      shared: false,
      tags: ['prescription', 'hypertension', 'medication']
    }
  ]

  const filteredReports = healthReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || report.type === selectedType
    
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'attention':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'active':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lab Test Results':
        return <TestTube className="h-5 w-5" />
      case 'Doctor Consultations':
        return <Stethoscope className="h-5 w-5" />
      case 'Prescriptions':
        return <FileText className="h-5 w-5" />
      case 'Health Checkups':
        return <Activity className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Health Reports & Records</h1>
              <p className="text-gray-600 mt-1">Access all your medical reports, test results, and health records</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search reports, doctors, tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Report Types</option>
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
            </select>

            <div className="text-sm text-gray-600">
              {filteredReports.length} reports found
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-primary-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/lab-tests"
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <TestTube className="h-8 w-8 text-primary-600" />
              <div>
                <div className="font-semibold text-gray-900">Book Lab Tests</div>
                <div className="text-sm text-gray-600">Get new test reports</div>
              </div>
            </Link>
            <Link
              href="/consult-doctor"
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Stethoscope className="h-8 w-8 text-primary-600" />
              <div>
                <div className="font-semibold text-gray-900">Consult Doctor</div>
                <div className="text-sm text-gray-600">Discuss your reports</div>
              </div>
            </Link>
            <button className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Share2 className="h-8 w-8 text-primary-600" />
              <div>
                <div className="font-semibold text-gray-900">Share Reports</div>
                <div className="text-sm text-gray-600">With doctors & family</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Download className="h-8 w-8 text-primary-600" />
              <div>
                <div className="font-semibold text-gray-900">Download All</div>
                <div className="text-sm text-gray-600">Export as PDF</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{report.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(report.date).toLocaleDateString()}</span>
                        </div>
                        {report.doctorName && (
                          <div className="flex items-center gap-1">
                            <Stethoscope className="h-4 w-4" />
                            <span>{report.doctorName}</span>
                          </div>
                        )}
                        {report.labName && (
                          <div className="flex items-center gap-1">
                            <TestTube className="h-4 w-4" />
                            <span>{report.labName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Key Findings */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Findings</h4>
                    <ul className="space-y-1">
                      {report.findings.map((finding, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {report.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags and Sharing */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {report.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {report.shared && report.sharedWith && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Share2 className="h-4 w-4" />
                      <span>Shared with {report.sharedWith.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Link
              href="/lab-tests"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <TestTube className="h-4 w-4" />
              Book Your First Test
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}