'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, MapPin, Star, Phone, Video, MessageCircle, Search } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Doctor {
  id: number
  first_name: string
  last_name: string
  specialization: string
  experience_years: number
  consultation_fee: number
  rating: number
  total_reviews: number
  city: string
  is_available: boolean
  clinic_name?: string
}

export default function BookAppointmentPage() {
  const { user, isAuthenticated } = useAuth()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [consultationType, setConsultationType] = useState('video')
  const [chiefComplaint, setChiefComplaint] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const mockDoctors: Doctor[] = [
    {
      id: 1,
      first_name: 'Rajesh',
      last_name: 'Sharma',
      specialization: 'General Physician',
      experience_years: 15,
      consultation_fee: 500,
      rating: 4.8,
      total_reviews: 245,
      city: 'Mumbai',
      is_available: true,
      clinic_name: 'City Health Center'
    },
    {
      id: 2,
      first_name: 'Priya',
      last_name: 'Patel',
      specialization: 'Cardiologist',
      experience_years: 12,
      consultation_fee: 800,
      rating: 4.9,
      total_reviews: 189,
      city: 'Delhi',
      is_available: true,
      clinic_name: 'Heart Care Clinic'
    }
  ]

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30']

  const consultationTypes = [
    { value: 'video', label: 'Video Call', icon: Video },
    { value: 'audio', label: 'Audio Call', icon: Phone },
    { value: 'chat', label: 'Chat', icon: MessageCircle },
    { value: 'in_person', label: 'In Person', icon: User }
  ]

  const handleBookAppointment = async () => {
    if (!isAuthenticated) {
      alert('Please login to book an appointment')
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert('Appointment booked successfully!')
      setLoading(false)
      setStep(1)
      setSelectedDoctor(null)
      setSelectedDate('')
      setSelectedTime('')
      setChiefComplaint('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
            <p className="text-xl text-gray-600">Connect with expert doctors for your health needs</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select a Doctor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            Dr. {doctor.first_name} {doctor.last_name}
                          </h3>
                          <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">₹{doctor.consultation_fee}</div>
                          <div className="text-sm text-gray-500">Consultation Fee</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({doctor.total_reviews} reviews)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-1" />
                          {doctor.experience_years} years exp.
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {doctor.city} • {doctor.clinic_name}
                      </div>
                      
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Available
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDoctor}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                  >
                    Next: Select Date & Time
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedTime === slot
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                  >
                    Next: Medical Details
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Medical Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {consultationTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <div
                            key={type.value}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              consultationType === type.value
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-primary-300'
                            }`}
                            onClick={() => setConsultationType(type.value)}
                          >
                            <Icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-center">{type.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chief Complaint *
                    </label>
                    <textarea
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      placeholder="Describe your main health concern..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                {selectedDoctor && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Doctor:</span> Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}</div>
                      <div><span className="font-medium">Date:</span> {selectedDate}</div>
                      <div><span className="font-medium">Time:</span> {selectedTime}</div>
                      <div><span className="font-medium">Type:</span> {consultationType.replace('_', ' ')}</div>
                      <div><span className="font-medium">Fee:</span> ₹{selectedDoctor.consultation_fee}</div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={loading || !chiefComplaint}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
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