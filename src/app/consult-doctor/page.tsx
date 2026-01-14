'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Clock, Video, MessageCircle, Phone, Calendar, MapPin, Award, Languages, ArrowRight, Shield, Users } from 'lucide-react'
import { DOCTOR_SPECIALIZATIONS } from '@/lib/constants'

export default function ConsultDoctorPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')
  const [consultationType, setConsultationType] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 2000])

  const specializations = Object.values(DOCTOR_SPECIALIZATIONS)

  const doctors = [
    {
      id: 'dr-sharma',
      name: 'Dr. Rajesh Sharma',
      specialization: ['General Physician', 'Internal Medicine'],
      qualification: ['MBBS', 'MD Internal Medicine'],
      experience: 15,
      rating: 4.8,
      reviewCount: 2340,
      consultationFee: 500,
      languages: ['English', 'Hindi'],
      avatar: '/api/placeholder/100/100',
      about: 'Experienced general physician with expertise in preventive care and chronic disease management.',
      nextAvailable: '2 hours',
      hospitalAffiliation: ['Apollo Hospital', 'Max Healthcare'],
      verified: true,
      consultationTypes: ['video', 'audio', 'chat'],
      totalConsultations: 15420,
      availability: 'Available Now'
    },
    {
      id: 'dr-patel',
      name: 'Dr. Priya Patel',
      specialization: ['Cardiologist'],
      qualification: ['MBBS', 'MD Cardiology', 'DM Cardiology'],
      experience: 12,
      rating: 4.9,
      reviewCount: 1890,
      consultationFee: 800,
      languages: ['English', 'Hindi', 'Gujarati'],
      avatar: '/api/placeholder/100/100',
      about: 'Specialist in interventional cardiology and heart disease prevention.',
      nextAvailable: '4 hours',
      hospitalAffiliation: ['Fortis Hospital', 'Medanta'],
      verified: true,
      consultationTypes: ['video', 'audio'],
      totalConsultations: 8930,
      availability: 'Available Today'
    },
    {
      id: 'dr-singh',
      name: 'Dr. Amit Singh',
      specialization: ['Dermatologist'],
      qualification: ['MBBS', 'MD Dermatology'],
      experience: 8,
      rating: 4.7,
      reviewCount: 1560,
      consultationFee: 600,
      languages: ['English', 'Hindi'],
      avatar: '/api/placeholder/100/100',
      about: 'Expert in skin disorders, cosmetic dermatology, and hair treatments.',
      nextAvailable: '1 hour',
      hospitalAffiliation: ['AIIMS', 'Safdarjung Hospital'],
      verified: true,
      consultationTypes: ['video', 'chat'],
      totalConsultations: 6780,
      availability: 'Available Now'
    },
    {
      id: 'dr-gupta',
      name: 'Dr. Sunita Gupta',
      specialization: ['Gynecologist'],
      qualification: ['MBBS', 'MS Gynecology'],
      experience: 18,
      rating: 4.9,
      reviewCount: 2890,
      consultationFee: 700,
      languages: ['English', 'Hindi'],
      avatar: '/api/placeholder/100/100',
      about: 'Specialist in women\'s health, pregnancy care, and reproductive medicine.',
      nextAvailable: '6 hours',
      hospitalAffiliation: ['Cloudnine Hospital', 'Motherhood Hospital'],
      verified: true,
      consultationTypes: ['video', 'audio', 'chat'],
      totalConsultations: 12450,
      availability: 'Available Tomorrow'
    },
    {
      id: 'dr-kumar',
      name: 'Dr. Vikash Kumar',
      specialization: ['Pediatrician'],
      qualification: ['MBBS', 'MD Pediatrics'],
      experience: 10,
      rating: 4.8,
      reviewCount: 1670,
      consultationFee: 550,
      languages: ['English', 'Hindi'],
      avatar: '/api/placeholder/100/100',
      about: 'Child specialist with expertise in newborn care and childhood diseases.',
      nextAvailable: '3 hours',
      hospitalAffiliation: ['Rainbow Children Hospital', 'Manipal Hospital'],
      verified: true,
      consultationTypes: ['video', 'audio'],
      totalConsultations: 9340,
      availability: 'Available Today'
    },
    {
      id: 'dr-mehta',
      name: 'Dr. Rohit Mehta',
      specialization: ['Orthopedic'],
      qualification: ['MBBS', 'MS Orthopedics'],
      experience: 14,
      rating: 4.6,
      reviewCount: 1230,
      consultationFee: 750,
      languages: ['English', 'Hindi'],
      avatar: '/api/placeholder/100/100',
      about: 'Specialist in joint replacement, sports injuries, and spine disorders.',
      nextAvailable: '5 hours',
      hospitalAffiliation: ['BLK Hospital', 'Indian Spinal Injuries Centre'],
      verified: true,
      consultationTypes: ['video'],
      totalConsultations: 5670,
      availability: 'Available Today'
    }
  ]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 doctor.specialization.includes(selectedSpecialization)
    const matchesConsultationType = consultationType === 'all' || 
                                   doctor.consultationTypes.includes(consultationType)
    const matchesPrice = doctor.consultationFee >= priceRange[0] && doctor.consultationFee <= priceRange[1]

    return matchesSearch && matchesSpecialization && matchesConsultationType && matchesPrice
  })

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'audio': return <Phone className="h-4 w-4" />
      case 'chat': return <MessageCircle className="h-4 w-4" />
      default: return null
    }
  }

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Now')) return 'text-green-600 bg-green-50'
    if (availability.includes('Today')) return 'text-blue-600 bg-blue-50'
    return 'text-orange-600 bg-orange-50'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consult with Doctors Online</h1>
              <p className="text-gray-600 mt-1">Connect with certified doctors through video, audio, or chat consultations</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search doctors, specializations..."
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
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <select
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Consultation Types</option>
              <option value="video">Video Call</option>
              <option value="audio">Audio Call</option>
              <option value="chat">Chat</option>
            </select>

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Any Time</option>
              <option value="now">Available Now</option>
              <option value="today">Available Today</option>
              <option value="tomorrow">Available Tomorrow</option>
            </select>

            <div className="text-sm text-gray-600">
              {filteredDoctors.length} doctors found
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-primary-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Verified Doctors</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Video className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">HD Video Consultation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">24/7 Available</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">100,000+ Doctors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Doctor Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-600">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                            {doctor.verified && (
                              <Shield className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <p className="text-primary-600 font-medium">{doctor.specialization.join(', ')}</p>
                          <p className="text-gray-600 text-sm">{doctor.qualification.join(', ')}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(doctor.availability)}`}>
                          {doctor.availability}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Award className="h-4 w-4" />
                          <span>{doctor.experience} years exp</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{doctor.totalConsultations.toLocaleString()} consultations</span>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-3">{doctor.about}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Languages className="h-4 w-4" />
                          <span>{doctor.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.hospitalAffiliation[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        {doctor.consultationTypes.map(type => (
                          <div key={type} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm">
                            {getConsultationTypeIcon(type)}
                            <span className="capitalize">{type}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</span>
                          <span className="text-gray-600 text-sm ml-1">consultation fee</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/consult-doctor/${doctor.id}`}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            View Profile
                          </Link>
                          <Link
                            href={`/consult-doctor/${doctor.id}/book`}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                          >
                            Book Now
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Consultation */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
              <p className="text-primary-100 mb-4">Connect with available doctors instantly</p>
              <button className="w-full bg-white text-primary-600 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Quick Consultation
              </button>
            </div>

            {/* Health Packages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Packages</h3>
              <div className="space-y-3">
                <Link href="/lab-tests" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-gray-900">Full Body Checkup</div>
                  <div className="text-sm text-gray-600">Starting from ₹499</div>
                </Link>
                <Link href="/lab-tests" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-gray-900">Diabetes Care</div>
                  <div className="text-sm text-gray-600">Starting from ₹299</div>
                </Link>
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Medical Emergency?</h3>
              <p className="text-red-700 text-sm mb-4">Get immediate medical assistance</p>
              <Link
                href="/emergency"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Emergency Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}