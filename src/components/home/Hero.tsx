'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Shield, Clock, Users, Brain, Sparkles, Heart, Activity, Phone, Stethoscope, TestTube, Calendar, FileText } from 'lucide-react'
import { LabTestIllustration, DoctorIllustration, HeartHealthIllustration, HealthReportIllustration } from '@/components/ui/HealthIllustrations'
import { MedicalPattern } from '@/components/ui/BackgroundPatterns'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    {
      icon: TestTube,
      title: 'Lab Tests at Home',
      description: 'Book pathology & radiology tests with home sample collection',
      color: 'from-primary-800 to-primary-700',
      link: '/lab-tests'
    },
    {
      icon: Stethoscope,
      title: 'Consult Doctors Online',
      description: 'Connect with certified doctors through video consultations',
      color: 'from-primary-700 to-primary-600',
      link: '/consult-doctor'
    },
    {
      icon: Heart,
      title: 'Order Medicines',
      description: 'Get genuine medicines delivered to your doorstep',
      color: 'from-primary-600 to-primary-500',
      link: '/medicines'
    },
    {
      icon: FileText,
      title: 'Digital Health Reports',
      description: 'Get detailed digital reports with health risk assessment',
      color: 'from-primary-500 to-primary-400',
      link: '/health-reports'
    }
  ]

  const healthServices = [
    { name: 'Full Body Checkup', price: '₹499', tests: '59 biomarkers', link: '/lab-tests' },
    { name: 'Doctor Consultation', price: '₹500', tests: 'Video/Audio', link: '/consult-doctor' },
    { name: 'Medicine Delivery', price: 'Free', tests: 'Above ₹500', link: '/medicines' },
    { name: 'Health Reports', price: 'Digital', tests: '24 hours', link: '/health-reports' },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100/30 pt-20 pb-32 overflow-hidden">
      {/* Background Pattern */}
      <MedicalPattern className="text-primary-800" opacity={0.05} />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-800/10 to-primary-700/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-primary-600/10 to-primary-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-primary-400/10 to-primary-300/10 rounded-full blur-2xl"></div>
        
        {/* Medical Icons Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-20">
            <Heart className="h-8 w-8 text-primary-800 animate-pulse" />
          </div>
          <div className="absolute top-48 right-32">
            <Stethoscope className="h-6 w-6 text-primary-700 animate-bounce-gentle" />
          </div>
          <div className="absolute bottom-32 left-32">
            <TestTube className="h-7 w-7 text-primary-600 animate-float" />
          </div>
        </div>
      </div>

      <div className="container relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-primary-800 text-white rounded-full mb-8 shadow-lg">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Trusted Healthcare Platform</span>
          </div>

          {/* Main Heading - Bajaj Style */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Take Charge of Your Health with{' '}
            <span className="text-primary-800">HealthWise</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Book Lab Tests, Consult Doctors Online & Get Comprehensive Health Checkups
          </p>

          {/* Special Offer Banner - Bajaj Style */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Full Body Checkup at just ₹499!</h3>
                <p className="text-primary-100">Includes 59 biomarkers • Hassle Free Home Sample Collection • Detailed Digital Reports</p>
              </div>
              <Link href="/book-test" className="bg-white text-primary-800 hover:bg-primary-50 px-8 py-3 rounded-xl font-bold transition-colors whitespace-nowrap">
                Book Now
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search for lab tests, health packages, or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-40 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary-800 shadow-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-800 hover:bg-primary-900 text-white px-8 py-2 rounded-xl font-medium transition-colors">
                <Search className="h-5 w-5 mr-2 inline" />
                Search
              </button>
            </div>
          </div>

          {/* Quick Actions - Bajaj Style */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            {healthServices.map((service, index) => (
              <Link 
                key={index} 
                href={service.link}
                className="bg-white border-2 border-gray-100 hover:border-primary-800 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer group"
              >
                <div className="text-primary-800 font-bold text-lg group-hover:text-primary-900">{service.price}</div>
                <div className="font-semibold text-gray-900 mb-1 group-hover:text-primary-800">{service.name}</div>
                <div className="text-sm text-gray-600">{service.tests}</div>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/lab-tests" className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
              <TestTube className="mr-3 h-6 w-6 inline" />
              Book Lab Tests
            </Link>
            <Link href="/consult-doctor" className="bg-white border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              <Stethoscope className="mr-3 h-6 w-6 inline" />
              Consult Doctor
            </Link>
            <Link href="/emergency" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
              <Phone className="mr-3 h-6 w-6 inline" />
              Emergency
            </Link>
          </div>

          {/* Hero Image Section */}
          <div className="mt-16 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl font-bold text-primary-900 mb-4">
                  Book Pathology & Radiology Tests Effortlessly
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Comprehensive Healthcare Solutions for Modern Living. Our seamless diagnostic experience combines convenience with clinical excellence, making preventive healthcare an effortless part of your wellness routine.
                </p>
                <Link href="/lab-tests" className="bg-primary-800 hover:bg-primary-900 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                  Visit Our Lab Tests Section
                </Link>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-center text-primary-800">
                    <div className="text-6xl mb-4">🧪</div>
                    <div className="text-lg font-semibold">Lab Tests at Home</div>
                    <div className="text-sm">Professional Sample Collection</div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <TestTube className="h-8 w-8 text-primary-800" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Solutions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
              Comprehensive Diagnostic Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <HeartHealthIllustration size="md" className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2 text-center">Full Body Checkups</h3>
                <p className="text-gray-600 text-sm text-center">Overall health diagnosis including CBC, Lipid Profile, Thyroid Function, Blood Glucose, Vitamin Panels, and more</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <DoctorIllustration size="md" className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2 text-center">Body Organs</h3>
                <p className="text-gray-600 text-sm text-center">Assess major organ function with Liver Health, Kidney Performance, Cardiac Risk Assessment, Hormone Levels</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <LabTestIllustration size="md" className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2 text-center">Lifestyle Habits</h3>
                <p className="text-gray-600 text-sm text-center">Customized testing for diabetes management, nutritional deficiencies, immunity profiles, and more</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <HealthReportIllustration size="md" className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2 text-center">ECG, X-Ray, MRI & Scans</h3>
                <p className="text-gray-600 text-sm text-center">Radiology based lab tests including ECG, X-Ray, MRI, CT Scan, Ultrasound, and advanced imaging</p>
              </div>
            </div>
          </div>

          {/* Health Risk Assessment */}
          <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">Health Risk Assessment</h3>
                <p className="text-primary-800 mb-4">A quiz based on your lifestyle to understand your health better</p>
                <Link href="/health-quiz" className="bg-primary-800 hover:bg-primary-900 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                  Get Free Health Checkup
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Comprehensive Healthcare Solutions for Modern Living</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-800" />
                <span className="text-sm font-medium">Certified Labs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary-800" />
                <span className="text-sm font-medium">Expert Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <TestTube className="h-5 w-5 text-primary-800" />
                <span className="text-sm font-medium">Home Collection</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary-800" />
                <span className="text-sm font-medium">Digital Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}