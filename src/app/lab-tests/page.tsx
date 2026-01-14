'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Clock, Home, TestTube, Star, ArrowRight, Shield, Truck, FileText } from 'lucide-react'
import { LAB_TEST_CATEGORIES, POPULAR_LAB_PACKAGES } from '@/lib/constants'

export default function LabTestsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [homeCollection, setHomeCollection] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const categories = Object.values(LAB_TEST_CATEGORIES)

  const labPackages = [
    {
      id: 'full-body-basic',
      name: 'Full Body Checkup - Basic',
      description: 'Comprehensive health screening with 59+ biomarkers',
      price: 499,
      originalPrice: 2500,
      discount: 80,
      tests: 59,
      category: 'Full Body Checkup',
      popular: true,
      homeCollection: true,
      fasting: true,
      reportTime: '24 hours',
      includes: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid', 'Diabetes', 'Vitamin D', 'Vitamin B12'],
      rating: 4.8,
      bookings: 15420
    },
    {
      id: 'diabetes-care',
      name: 'Diabetes Care Package',
      description: 'Complete diabetes monitoring and management',
      price: 299,
      originalPrice: 800,
      discount: 63,
      tests: 8,
      category: 'Diabetes Care',
      popular: true,
      homeCollection: true,
      fasting: true,
      reportTime: '6 hours',
      includes: ['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin', 'Microalbumin'],
      rating: 4.7,
      bookings: 8930
    },
    {
      id: 'heart-health',
      name: 'Heart Health Complete',
      description: 'Comprehensive cardiac risk assessment',
      price: 799,
      originalPrice: 2200,
      discount: 64,
      tests: 15,
      category: 'Heart Health',
      popular: false,
      homeCollection: true,
      fasting: true,
      reportTime: '24 hours',
      includes: ['Lipid Profile', 'ECG', 'Echo', 'Troponin', 'CRP', 'Homocysteine'],
      rating: 4.9,
      bookings: 5670
    },
    {
      id: 'thyroid-complete',
      name: 'Thyroid Profile Complete',
      description: 'Complete thyroid function assessment',
      price: 199,
      originalPrice: 600,
      discount: 67,
      tests: 3,
      category: 'Thyroid Function',
      popular: true,
      homeCollection: true,
      fasting: false,
      reportTime: '12 hours',
      includes: ['TSH', 'T3', 'T4'],
      rating: 4.6,
      bookings: 12340
    },
    {
      id: 'women-health',
      name: 'Women Health Package',
      description: 'Comprehensive health screening for women',
      price: 899,
      originalPrice: 2800,
      discount: 68,
      tests: 45,
      category: 'Women Health',
      popular: false,
      homeCollection: true,
      fasting: true,
      reportTime: '24 hours',
      includes: ['Pap Smear', 'Mammography', 'Bone Density', 'Hormones', 'Vitamin Profile'],
      rating: 4.8,
      bookings: 4560
    },
    {
      id: 'vitamin-deficiency',
      name: 'Vitamin Deficiency Package',
      description: 'Complete vitamin and mineral assessment',
      price: 399,
      originalPrice: 1200,
      discount: 67,
      tests: 12,
      category: 'Vitamin Deficiency',
      popular: false,
      homeCollection: true,
      fasting: false,
      reportTime: '48 hours',
      includes: ['Vitamin D', 'Vitamin B12', 'Folate', 'Iron', 'Calcium', 'Magnesium'],
      rating: 4.5,
      bookings: 7890
    }
  ]

  const filteredPackages = labPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    const matchesCollection = !homeCollection || pkg.homeCollection

    return matchesSearch && matchesCategory && matchesPrice && matchesCollection
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Tests & Health Packages</h1>
              <p className="text-gray-600 mt-1">Book pathology & radiology tests with home sample collection</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tests, packages, or conditions..."
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={homeCollection}
                onChange={(e) => setHomeCollection(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Home Collection</span>
            </label>

            <div className="text-sm text-gray-600">
              {filteredPackages.length} packages found
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
              <span className="text-sm font-medium text-gray-700">NABL Certified Labs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Home className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Free Home Collection</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Reports in 24 Hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Digital Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Packages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Health Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TestTube className="h-4 w-4" />
                        <span>{pkg.tests} tests included</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({pkg.bookings.toLocaleString()} bookings)</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Home className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Free home collection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">Reports in {pkg.reportTime}</span>
                    </div>
                    {pkg.fasting && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        </span>
                        <span className="text-gray-700">Fasting required</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                          <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice}</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium">{pkg.discount}% off</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href={`/lab-tests/${pkg.id}`}
                        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Tests Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Tests</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <TestTube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Individual Tests</h3>
              <p className="text-gray-600 mb-6">Search from thousands of individual pathology and radiology tests</p>
              <Link
                href="/lab-tests/individual"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Browse All Tests
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}