'use client'

import { useState } from 'react'
import { Building2, Users, Shield, Heart, Phone, Mail, CheckCircle, Star } from 'lucide-react'

interface CorporatePackage {
  id: number
  name: string
  description: string
  price_per_employee: number
  min_employees: number
  features: string[]
  popular: boolean
}

export default function CorporateBenefitsPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [companySize, setCompanySize] = useState('')
  const [contactForm, setContactForm] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    message: ''
  })

  const packages: CorporatePackage[] = [
    {
      id: 1,
      name: 'Essential Care',
      description: 'Basic health coverage for small teams',
      price_per_employee: 1200,
      min_employees: 10,
      features: [
        'Annual Health Checkup',
        'Basic Lab Tests',
        'Telemedicine Consultations',
        'Health Insurance Support',
        'Wellness Workshops'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Comprehensive Care',
      description: 'Complete health solution for growing companies',
      price_per_employee: 2500,
      min_employees: 50,
      features: [
        'Comprehensive Health Checkup',
        'Advanced Diagnostic Tests',
        'Specialist Consultations',
        'Mental Health Support',
        'Nutrition Counseling',
        'Fitness Programs',
        'Emergency Medical Services',
        'Health Risk Assessment'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Premium Care',
      description: 'Premium health benefits for large enterprises',
      price_per_employee: 4000,
      min_employees: 200,
      features: [
        'Executive Health Checkup',
        'Full Body Imaging',
        'Genetic Testing',
        'Personalized Health Plans',
        'Dedicated Health Manager',
        'Family Coverage',
        'International Medical Support',
        'Preventive Care Programs',
        'Chronic Disease Management'
      ],
      popular: false
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Employee Wellness',
      description: 'Comprehensive health programs to keep your team healthy and productive'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Early detection and prevention of health issues through regular screenings'
    },
    {
      icon: Users,
      title: 'Team Health',
      description: 'Group health initiatives and wellness challenges for better team bonding'
    },
    {
      icon: Building2,
      title: 'Workplace Wellness',
      description: 'On-site health services and workplace wellness programs'
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your interest! Our team will contact you soon.')
    setContactForm({
      company_name: '',
      contact_person: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Corporate Health Benefits</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive healthcare solutions for your employees
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <Icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Packages Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Choose Your Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 ${
                    pkg.popular ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      ₹{pkg.price_per_employee.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per employee/year</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Minimum {pkg.min_employees} employees
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Get Quote
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get a Custom Quote</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.company_name}
                      onChange={(e) => setContactForm({...contactForm, company_name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.contact_person}
                      onChange={(e) => setContactForm({...contactForm, contact_person: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select company size</option>
                      <option value="10-50">10-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Tell us about your specific requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Request Quote
                  </button>
                </form>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Why Choose Our Corporate Plans?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Customizable Packages</h5>
                      <p className="text-gray-600 text-sm">Tailored to your company's specific needs and budget</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Dedicated Support</h5>
                      <p className="text-gray-600 text-sm">Dedicated account manager for seamless service</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Cost Effective</h5>
                      <p className="text-gray-600 text-sm">Significant savings compared to individual plans</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Easy Implementation</h5>
                      <p className="text-gray-600 text-sm">Quick setup with minimal administrative burden</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="font-semibold text-primary-900">Call us directly</span>
                  </div>
                  <p className="text-primary-800 font-bold text-lg">1800-123-4567</p>
                  
                  <div className="flex items-center mt-4 mb-2">
                    <Mail className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="font-semibold text-primary-900">Email us</span>
                  </div>
                  <p className="text-primary-800">corporate@healthwise.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}