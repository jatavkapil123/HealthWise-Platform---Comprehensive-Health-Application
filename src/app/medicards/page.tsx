'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Star, Gift, Users, Shield, Clock, CheckCircle, Plus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Medicard {
  id: number
  card_number: string
  card_type: string
  card_name: string
  membership_level: string
  discount_percentage: number
  total_savings: number
  usage_count: number
  expiry_date: string
  is_active: boolean
  benefits: string[]
}

interface MedicardPlan {
  id: number
  name: string
  type: string
  price: number
  discount_percentage: number
  benefits: string[]
  popular: boolean
  family_coverage: boolean
}

export default function MedicardsPage() {
  const { user, isAuthenticated } = useAuth()
  const [userCards, setUserCards] = useState<Medicard[]>([])
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const medicardPlans: MedicardPlan[] = [
    {
      id: 1,
      name: 'Silver Care',
      type: 'individual',
      price: 999,
      discount_percentage: 10,
      benefits: [
        '10% discount on all lab tests',
        '5% discount on medicines',
        'Free health checkup once a year',
        'Telemedicine consultations',
        'Health insurance support'
      ],
      popular: false,
      family_coverage: false
    },
    {
      id: 2,
      name: 'Gold Care',
      type: 'individual',
      price: 1999,
      discount_percentage: 15,
      benefits: [
        '15% discount on all lab tests',
        '10% discount on medicines',
        'Free comprehensive health checkup',
        'Unlimited telemedicine consultations',
        'Priority appointment booking',
        'Health insurance support',
        'Wellness programs access'
      ],
      popular: true,
      family_coverage: false
    },
    {
      id: 3,
      name: 'Platinum Care',
      type: 'individual',
      price: 3999,
      discount_percentage: 20,
      benefits: [
        '20% discount on all lab tests',
        '15% discount on medicines',
        'Free executive health checkup',
        'Unlimited consultations',
        'Priority services',
        'Family coverage (up to 4 members)',
        'Chronic disease management',
        'Personalized health plans',
        'Emergency medical support'
      ],
      popular: false,
      family_coverage: true
    },
    {
      id: 4,
      name: 'Family Care',
      type: 'family',
      price: 4999,
      discount_percentage: 18,
      benefits: [
        '18% discount on all services',
        'Coverage for up to 6 family members',
        'Free annual health checkups for all',
        'Unlimited consultations',
        'Pediatric care included',
        'Women\'s health programs',
        'Senior citizen care',
        'Emergency support for all members'
      ],
      popular: false,
      family_coverage: true
    }
  ]

  // Mock user cards
  const mockUserCards: Medicard[] = [
    {
      id: 1,
      card_number: 'HW-GOLD-123456',
      card_type: 'Gold Care',
      card_name: 'John Doe',
      membership_level: 'gold',
      discount_percentage: 15,
      total_savings: 2450,
      usage_count: 12,
      expiry_date: '2024-12-31',
      is_active: true,
      benefits: [
        '15% discount on all lab tests',
        '10% discount on medicines',
        'Free comprehensive health checkup',
        'Unlimited telemedicine consultations'
      ]
    }
  ]

  useEffect(() => {
    if (isAuthenticated) {
      setUserCards(mockUserCards)
    }
  }, [isAuthenticated])

  const handlePurchaseCard = async (planId: number) => {
    if (!isAuthenticated) {
      alert('Please login to purchase a medicard')
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert('Medicard purchased successfully!')
      setLoading(false)
      setSelectedPlan(null)
    }, 2000)
  }

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'silver': return 'from-gray-400 to-gray-600'
      case 'gold': return 'from-yellow-400 to-yellow-600'
      case 'platinum': return 'from-purple-400 to-purple-600'
      default: return 'from-blue-400 to-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Medicards</h1>
            <p className="text-xl text-gray-600">Health membership cards with exclusive benefits</p>
          </div>

          {/* User's Cards */}
          {isAuthenticated && userCards.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Medicards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCards.map((card) => (
                  <div key={card.id} className="relative">
                    <div className={`bg-gradient-to-br ${getMembershipColor(card.membership_level)} rounded-2xl p-6 text-white shadow-lg`}>
                      <div className="flex items-center justify-between mb-4">
                        <CreditCard className="h-8 w-8" />
                        <span className="text-sm font-medium opacity-90">
                          {card.membership_level.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">{card.card_type}</h3>
                        <p className="text-sm opacity-90">{card.card_name}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm opacity-75">Card Number</p>
                        <p className="font-mono text-lg">{card.card_number}</p>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="opacity-75">Expires</p>
                          <p className="font-semibold">{card.expiry_date}</p>
                        </div>
                        <div className="text-right">
                          <p className="opacity-75">Discount</p>
                          <p className="font-semibold">{card.discount_percentage}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">₹{card.total_savings}</p>
                          <p className="text-sm text-gray-600">Total Savings</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-primary-600">{card.usage_count}</p>
                          <p className="text-sm text-gray-600">Times Used</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Plans */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {isAuthenticated && userCards.length > 0 ? 'Upgrade Your Plan' : 'Choose Your Medicard'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicardPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 ${
                    plan.popular ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      ₹{plan.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per year</div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {plan.discount_percentage}% Discount
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
                    {plan.family_coverage && (
                      <div className="flex items-center justify-center text-sm text-primary-600 bg-primary-50 rounded-lg py-2">
                        <Users className="h-4 w-4 mr-1" />
                        Family Coverage
                      </div>
                    )}
                    
                    <button
                      onClick={() => handlePurchaseCard(plan.id)}
                      disabled={loading}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      } disabled:opacity-50`}
                    >
                      {loading ? 'Processing...' : 'Get This Card'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Medicards?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exclusive Discounts</h3>
                <p className="text-gray-600">
                  Get significant discounts on all health services, lab tests, and medicines
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Priority Services</h3>
                <p className="text-gray-600">
                  Skip the queue with priority booking and faster service delivery
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support and emergency medical assistance
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Choose Plan</h5>
                    <p className="text-sm text-gray-600">Select the plan that suits your needs</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Get Your Card</h5>
                    <p className="text-sm text-gray-600">Receive your digital medicard instantly</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Start Saving</h5>
                    <p className="text-sm text-gray-600">Use your card and enjoy exclusive benefits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}