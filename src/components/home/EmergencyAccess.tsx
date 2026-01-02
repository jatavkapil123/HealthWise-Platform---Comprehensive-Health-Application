'use client'

import { Phone, MapPin, Truck, AlertTriangle, Clock, Shield, Heart, Stethoscope } from 'lucide-react'
import Link from 'next/link'

export function EmergencyAccess() {
  const emergencyServices = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      description: '24/7 immediate medical assistance',
      number: '911',
      action: 'Call Now',
      urgent: true
    },
    {
      icon: Truck,
      title: 'Ambulance Service',
      description: 'Emergency medical transportation',
      number: '1-800-AMBULANCE',
      action: 'Request Ambulance',
      urgent: true
    },
    {
      icon: MapPin,
      title: 'Find Hospital',
      description: 'Locate nearest emergency facility',
      number: 'GPS Location',
      action: 'Find Now',
      urgent: false
    },
    {
      icon: Stethoscope,
      title: 'Emergency Doctor',
      description: 'Urgent medical consultation',
      number: '1-800-DOC-HELP',
      action: 'Consult Now',
      urgent: false
    }
  ]

  const emergencyGuide = [
    'Chest pain or difficulty breathing',
    'Severe bleeding or major injury',
    'Loss of consciousness',
    'Severe allergic reaction',
    'Signs of stroke (FAST test)',
    'Poisoning or overdose',
    'Severe burns',
    'Suicidal thoughts'
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6 shadow-lg">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Emergency Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get immediate help when you need it most. Our emergency services are available 24/7.
          </p>
        </div>

        {/* Emergency Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {emergencyServices.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                service.urgent ? 'border-gray-300 hover:border-gray-400' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-md ${
                  service.urgent ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  <service.icon className="h-8 w-8" />
                </div>
                
                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm text-gray-500 mb-1">Contact:</div>
                  <div className="font-bold text-gray-900">{service.number}</div>
                </div>
                
                {/* Action Button */}
                <button className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                  service.urgent 
                    ? 'bg-gray-800 hover:bg-gray-900 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}>
                  {service.action}
                </button>
                
                {/* Urgent Badge */}
                {service.urgent && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      <Clock className="h-3 w-3 mr-1" />
                      Urgent
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Call Emergency Services</h3>
            <p className="text-gray-600">Call 911 immediately if you experience any of these symptoms:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {emergencyGuide.map((symptom, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="bg-gray-800 rounded-2xl p-8 text-white text-center">
            <Phone className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm opacity-90">National Emergency</div>
                <a href="tel:911" className="text-3xl font-bold hover:text-gray-300 transition-colors">911</a>
              </div>
              <div>
                <div className="text-sm opacity-90">Poison Control</div>
                <a href="tel:1-800-222-1222" className="text-xl font-bold hover:text-gray-300 transition-colors">1-800-222-1222</a>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Trusted Care</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Availability</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Certified Professionals</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Life-Saving Response</span>
              </div>
            </div>
            <Link 
              href="/emergency/guide" 
              className="inline-block mt-6 bg-gray-800 text-white hover:bg-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Emergency Guide
            </Link>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-gray-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Important Notice</h4>
              <p className="text-gray-700">
                If you are experiencing a life-threatening emergency, call 911 immediately. 
                Do not use online services or wait for appointments in critical situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
