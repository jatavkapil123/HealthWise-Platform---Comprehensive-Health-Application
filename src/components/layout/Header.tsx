'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Heart, Phone, User, Bell, ChevronDown, MapPin, Clock, Shield, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigation = [
    { 
      name: 'Book Appointment', 
      href: '/book-appointment',
      description: 'Schedule consultations with doctors'
    },
    { 
      name: 'Book Lab Test', 
      href: '/lab-tests',
      description: 'Book pathology & radiology tests',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Full Body Checkup', href: '/lab-tests/full-body-checkup', price: '₹499' },
        { name: 'Diabetes Package', href: '/lab-tests/diabetes-package', price: '₹299' },
        { name: 'Thyroid Profile', href: '/lab-tests/thyroid-profile', price: '₹199' },
        { name: 'Heart Health', href: '/lab-tests/heart-health', price: '₹799' },
        { name: 'Women Health', href: '/lab-tests/women-health', price: '₹899' },
      ]
    },
    { 
      name: 'Health Library', 
      href: '/health-library',
      description: 'Medical information & resources',
      hasDropdown: true,
      dropdownItems: [
        { name: 'General Health', href: '/health-library/general-health' },
        { name: 'Covid-19', href: '/health-library/covid-19' },
        { name: 'Aarogya Care', href: '/health-library/aarogya-care' },
        { name: 'Ayurveda', href: '/health-library/ayurveda' },
        { name: 'Cancer', href: '/health-library/cancer' },
        { name: 'Cholesterol', href: '/health-library/cholesterol' },
        { name: 'Hypertension', href: '/health-library/hypertension' },
        { name: 'Heart Health', href: '/health-library/heart-health' },
        { name: 'Diabetes', href: '/health-library/diabetes' },
        { name: 'Yoga & Exercise', href: '/health-library/yoga-exercise' },
        { name: 'Skin & Hair', href: '/health-library/skin-hair' },
        { name: 'Women\'s Health', href: '/health-library/womens-health' },
        { name: 'Immunity', href: '/health-library/immunity' },
        { name: 'Nutrition', href: '/health-library/nutrition' },
        { name: 'Mental Wellness', href: '/health-library/mental-wellness' },
        { name: 'Thyroid', href: '/health-library/thyroid' }
      ]
    },
    { 
      name: 'Web Stories', 
      href: '/web-stories',
      description: 'Interactive health stories'
    },
    { 
      name: 'Health Tests', 
      href: '/health-tests',
      description: 'Comprehensive health assessments'
    },
    { 
      name: 'Corporate Benefits', 
      href: '/corporate-benefits',
      description: 'Employee health programs'
    },
    { 
      name: 'Medicards', 
      href: '/medicards',
      description: 'Health membership cards'
    }
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-800 text-white py-2 hidden md:block">
        <div className="container">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>24/7 Helpline: 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Pan India Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Home Sample Collection Available</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/track-order" className="hover:text-primary-200 transition-colors">
                Track Your Order
              </Link>
              <Link href="/download-reports" className="hover:text-primary-200 transition-colors">
                Download Reports
              </Link>
              <Link href="/help" className="hover:text-primary-200 transition-colors">
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-800 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <Heart className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary-900">HealthWise</span>
                <div className="text-xs text-gray-600 -mt-1">Your Health Partner</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-primary-800 font-medium transition-colors rounded-lg hover:bg-primary-50 group"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-4">
                        <div className="text-sm font-semibold text-gray-900 mb-3">Popular Tests</div>
                        <div className="space-y-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 transition-colors group/item"
                            >
                              <div>
                                <div className="font-medium text-gray-900 group-hover/item:text-primary-800">
                                  {dropdownItem.name}
                                </div>
                              </div>
                              {'price' in dropdownItem && (
                                <div className="text-primary-800 font-bold">
                                  {dropdownItem.price}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link
                            href="/lab-tests"
                            className="block text-center bg-primary-800 hover:bg-primary-900 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                          >
                            View All Tests
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tests, packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-72 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-800 transition-colors"
                />
              </div>
              
              {/* Emergency Button */}
              <Link 
                href="/emergency" 
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Emergency</span>
              </Link>

              {/* User Actions */}
              <div className="flex items-center space-x-2">
                <button className="relative p-2.5 text-gray-600 hover:text-primary-800 hover:bg-primary-50 rounded-xl transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2.5 text-gray-600 hover:text-primary-800 hover:bg-primary-50 rounded-xl transition-colors">
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                    <span className="sr-only">Profile</span>
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <div className="font-medium text-gray-900">{user?.first_name} {user?.last_name}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                          </div>
                          <Link href="/my-account" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg transition-colors">
                            My Account
                          </Link>
                          <Link href="/my-orders" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg transition-colors">
                            My Orders
                          </Link>
                          <Link href="/health-reports" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg transition-colors">
                            Health Reports
                          </Link>
                          <hr className="my-2" />
                          <button 
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-800 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg transition-colors">
                            Sign In
                          </Link>
                          <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg transition-colors">
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-800 hover:bg-primary-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              {/* Mobile Search */}
              <div className="mb-4 px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search tests, packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-800"
                  />
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-1 px-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                      </div>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    
                    {/* Mobile Dropdown Items */}
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{dropdownItem.name}</span>
                            {'price' in dropdownItem && (
                              <span className="text-primary-800 font-bold">{dropdownItem.price}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Emergency Button */}
              <div className="mt-6 px-4">
                <Link 
                  href="/emergency" 
                  className="flex items-center justify-center space-x-2 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  <span>Emergency Help</span>
                </Link>
              </div>

              {/* Mobile User Actions */}
              <div className="mt-4 px-4 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="text-center py-2">
                      <div className="font-medium text-gray-900">{user?.first_name} {user?.last_name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/my-account"
                        className="flex items-center justify-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Account</span>
                      </Link>
                      <Link
                        href="/my-orders"
                        className="flex items-center justify-center space-x-2 border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Search className="h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      className="flex items-center justify-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/track-order"
                      className="flex items-center justify-center space-x-2 border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Search className="h-4 w-4" />
                      <span>Track Order</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Trust Bar */}
      <div className="bg-primary-50 border-b border-primary-100 py-3 hidden lg:block">
        <div className="container">
          <div className="flex items-center justify-center space-x-8 text-sm text-primary-800">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>NABL Certified Labs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>500+ Expert Doctors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Same Day Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Home Sample Collection</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}