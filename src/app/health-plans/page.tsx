'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Star, Shield, Video, TestTube, Pill, Calendar, Users, ArrowRight, CreditCard } from 'lucide-react'

export default function HealthPlansPage() {
  const [selectedTenure, setSelectedTenure] = useState(12)

  const plans = [
    {
      id: 1,
      name: 'Health Prime',
      tagline: 'Essential Care',
      price: 699,
      originalPrice: 999,
      discount: 30,
      popular: false,
      features: [
        { icon: Video, text: 'Unlimited video/audio consultations', included: true },
        { icon: TestTube, text: '15% discount on lab tests', included: true },
        { icon: Pill, text: '10% discount on medicines', included: true },
        { icon: Calendar, text: 'Annual health checkup worth ₹3000', included: true },
        { icon: Users, text: 'Network of 1500+ hospitals', included: true },
        { icon: Shield, text: '24/7 support', included: true },
      ],
      benefits: [
        'Digital prescriptions',
        'Health records storage',
        'Medicine reminders',
        'Free home sample collection'
      ]
    },
    {
      id: 2,
      name: 'Health Prime Max',
      tagline: 'Premium Care',
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      popular: true,
      features: [
        { icon: Video, text: 'Unlimited specialist consultations', included: true },
        { icon: TestTube, text: '25% discount on lab tests', included: true },
        { icon: Pill, text: '20% discount on medicines', included: true },
        { icon: Calendar, text: '2 annual checkups worth ₹6000', included: true },
        { icon: Users, text: 'Network of 2000+ hospitals', included: true },
        { icon: Shield, text: '24/7 priority support', included: true },
      ],
      benefits: [
        'Dedicated health manager',
        'Priority appointments',
        'Advanced health analytics',
        'Family coverage (up to 4 members)',
        'Wellness programs access',
        'Mental health counseling'
      ]
    },
    {
      id: 3,
      name: 'Health Prime Tele',
      tagline: 'Consultation Only',
      price: 499,
      originalPrice: 699,
      discount: 29,
      popular: false,
      features: [
        { icon: Video, text: 'Unlimited teleconsultations', included: true },
        { icon: TestTube, text: '10% discount on lab tests', included: true },
        { icon: Pill, text: '5% discount on medicines', included: true },
        { icon: Calendar, text: 'Basic health checkup', included: false },
        { icon: Users, text: 'Network of 1000+ doctors', included: true },
        { icon: Shield, text: 'Email support', included: true },
      ],
      benefits: [
        'Digital prescriptions',
        'Chat with doctors',
        'Health tips & articles'
      ]
    }
  ]

  const emiOptions = [
    {
      tenure: 3,
      monthlyEmi: 500,
      totalAmount: 1500,
      interest: 0
    },
    {
      tenure: 6,
      monthlyEmi: 260,
      totalAmount: 1560,
      interest: 60
    },
    {
      tenure: 12,
      monthlyEmi: 135,
      totalAmount: 1620,
      interest: 120
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Choose Your Health Plan</h1>
            <p className="text-xl text-primary-100 mb-8">
              Comprehensive healthcare coverage with unlimited consultations and exclusive benefits
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>100% Genuine Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>50,000+ Happy Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-white" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-primary-600 relative' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-600">{plan.tagline}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-500 line-through">₹{plan.originalPrice}</span>
                  </div>
                  <div className="text-green-600 font-medium mb-2">{plan.discount}% off</div>
                  <div className="text-sm text-gray-600">per year</div>
                  <div className="text-xs text-gray-500 mt-1">
                    or ₹{Math.round(plan.price / 12)}/month
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex items-center gap-2 flex-1">
                        <feature.icon className="h-4 w-4 text-gray-400" />
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Benefits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Additional Benefits:</h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/health-plans/${plan.id}/subscribe`}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Subscribe Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* EMI Options */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <CreditCard className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Easy EMI Options Available</h2>
            <p className="text-gray-600">Pay in easy installments with zero down payment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emiOptions.map((option) => (
              <div key={option.tenure} className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary-600 transition-colors">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{option.monthlyEmi}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">per month</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-medium">{option.tenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">₹{option.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest:</span>
                      <span className="font-medium text-green-600">
                        {option.interest === 0 ? 'Zero Interest' : `₹${option.interest}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>* EMI options available through Bajaj Finserv and other partners</p>
            <p>Processing fee of ₹199 applicable</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can cancel anytime. Refunds are provided on a pro-rata basis for unused months.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Is family coverage available?</h3>
              <p className="text-gray-600 text-sm">
                Yes, Health Prime Max includes coverage for up to 4 family members at no extra cost.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How do consultations work?</h3>
              <p className="text-gray-600 text-sm">
                Book appointments through our app and connect with doctors via video, audio, or chat instantly.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Are there any hidden charges?</h3>
              <p className="text-gray-600 text-sm">
                No hidden charges. The price you see is what you pay. All benefits are included in the plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
