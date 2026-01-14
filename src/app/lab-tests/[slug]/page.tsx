'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Clock, Home, TestTube, Star, Shield, Calendar, MapPin, Phone, User, Play } from 'lucide-react'

export default function LabTestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  })

  // Mock data - In production, fetch from API based on slug
  const packageDetails = {
    'full-body-checkup': {
      id: 'full-body-basic',
      name: 'Full Body Checkup - Basic',
      slug: 'full-body-checkup',
      description: 'Comprehensive health screening with 59+ biomarkers including CBC, Lipid Profile, Liver Function, Kidney Function, Thyroid, Diabetes screening, and essential vitamin levels.',
      price: 499,
      originalPrice: 2500,
      discount: 80,
      tests: 59,
      category: 'Full Body Checkup',
      popular: true,
      homeCollection: true,
      fasting: true,
      reportTime: '24 hours',
      rating: 4.8,
      bookings: 15420,
      videoId: 'WDv4AWk0J3U', // Full Body Health Checkup explanation
      videoTitle: 'Understanding Full Body Health Checkup',
      includes: [
        'Complete Blood Count (CBC)',
        'Lipid Profile (Cholesterol, Triglycerides, HDL, LDL)',
        'Liver Function Test (SGOT, SGPT, Bilirubin)',
        'Kidney Function Test (Creatinine, Urea, BUN)',
        'Thyroid Profile (TSH, T3, T4)',
        'Diabetes Screening (Fasting Glucose, HbA1c)',
        'Vitamin D',
        'Vitamin B12',
        'Iron Studies',
        'Uric Acid',
        'Calcium',
        'Phosphorus'
      ],
      preparation: [
        'Fasting of 10-12 hours required',
        'Water intake is allowed',
        'Avoid alcohol 24 hours before test',
        'Continue regular medications unless advised otherwise',
        'Wear comfortable clothing'
      ],
      whyChoose: [
        'NABL certified partner laboratories',
        'Free home sample collection',
        'Digital reports within 24 hours',
        'Expert consultation available',
        'Secure data handling'
      ]
    },
    'diabetes-care': {
      id: 'diabetes-care',
      name: 'Diabetes Care Package',
      slug: 'diabetes-care',
      description: 'Complete diabetes monitoring and management package with HbA1c, glucose levels, and insulin testing.',
      price: 299,
      originalPrice: 800,
      discount: 63,
      tests: 8,
      category: 'Diabetes Care',
      popular: true,
      homeCollection: true,
      fasting: true,
      reportTime: '6 hours',
      rating: 4.7,
      bookings: 8930,
      videoId: 'jXQ3NhkVUvM', // Diabetes management and testing
      videoTitle: 'Diabetes Testing & Management Guide',
      includes: [
        'HbA1c (Glycated Hemoglobin)',
        'Fasting Blood Glucose',
        'Post Meal Glucose',
        'Insulin Fasting',
        'Microalbumin',
        'Creatinine',
        'Lipid Profile',
        'Urine Routine'
      ],
      preparation: [
        'Fasting of 8-10 hours required',
        'Take post-meal sample 2 hours after breakfast',
        'Continue diabetes medications',
        'Bring list of current medications'
      ],
      whyChoose: [
        'Quick 6-hour report delivery',
        'Comprehensive diabetes assessment',
        'Free doctor consultation',
        'Home sample collection',
        'Trend analysis available'
      ]
    },
    'heart-health': {
      id: 'heart-health',
      name: 'Heart Health Complete',
      slug: 'heart-health',
      description: 'Comprehensive cardiac risk assessment with lipid profile, ECG, and cardiac markers.',
      price: 799,
      originalPrice: 2200,
      discount: 64,
      tests: 15,
      category: 'Heart Health',
      popular: false,
      homeCollection: true,
      fasting: true,
      reportTime: '24 hours',
      rating: 4.9,
      bookings: 5670,
      videoId: 'EE7NqzhMDms', // Heart health and cardiac tests
      videoTitle: 'Understanding Heart Health Tests',
      includes: [
        'Lipid Profile Complete',
        'ECG (Electrocardiogram)',
        'Troponin I',
        'CRP (C-Reactive Protein)',
        'Homocysteine',
        'Lipoprotein (a)',
        'Apolipoprotein A1',
        'Apolipoprotein B',
        'Blood Pressure Monitoring',
        'Fasting Glucose',
        'HbA1c',
        'Kidney Function',
        'Liver Function',
        'Thyroid Profile',
        'Complete Blood Count'
      ],
      preparation: [
        'Fasting of 12 hours required',
        'Avoid smoking 2 hours before test',
        'Rest for 15 minutes before ECG',
        'Wear loose clothing',
        'Bring previous reports if any'
      ],
      whyChoose: [
        'Complete cardiac risk assessment',
        'ECG included in package',
        'Cardiologist consultation available',
        'Early detection of heart disease',
        'Comprehensive report with recommendations'
      ]
    }
  }

  const packageData = packageDetails[slug as keyof typeof packageDetails]

  const timeSlots = [
    '06:00 AM - 07:00 AM',
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBooking = async () => {
    // In production, call API to create booking
    console.log('Booking data:', {
      packageId: packageData.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      ...formData
    })
    
    // Show success message and redirect
    alert('Booking confirmed! You will receive a confirmation email shortly.')
    router.push('/my-orders')
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <Link href="/lab-tests" className="text-primary-600 hover:text-primary-700">
            ← Back to Lab Tests
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/lab-tests" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Lab Tests
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {packageData.popular && (
                <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{packageData.name}</h1>
              <p className="text-gray-600 mb-4">{packageData.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{packageData.rating}</span>
                  <span className="text-gray-500 text-sm">({packageData.bookings.toLocaleString()} bookings)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TestTube className="h-4 w-4" />
                  <span>{packageData.tests} tests included</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Home className="h-4 w-4" />
                  <span>Free home collection</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="h-4 w-4" />
                  <span>Reports in {packageData.reportTime}</span>
                </div>
                {packageData.fasting && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    </span>
                    <span>Fasting required</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tests Included */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tests Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.includes.map((test, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{test}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Test Preparation</h2>
              <ul className="space-y-3">
                {packageData.preparation.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose This Package</h2>
              <div className="space-y-3">
                {packageData.whyChoose.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Video */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Play className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">{packageData.videoTitle}</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Watch this educational video to learn more about the importance of these health tests and how to interpret your results.
              </p>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${packageData.videoId}`}
                  title={packageData.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This video is for educational purposes only. Always consult with your healthcare provider for personalized medical advice.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{packageData.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{packageData.originalPrice}</span>
                </div>
                <div className="text-green-600 font-medium">{packageData.discount}% off</div>
              </div>

              {!showBookingForm ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors mb-4"
                >
                  Book Now
                </button>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Booking Details</h3>
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Collection Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Time Slot
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Personal Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Collection Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      rows={3}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTimeSlot || !formData.name || !formData.phone || !formData.address}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>

                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>100% Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-green-600" />
                  <span>Free Home Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Reports in {packageData.reportTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
