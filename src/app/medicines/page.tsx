'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, ShoppingCart, Truck, Shield, Clock, Plus, Minus, Star, Pill, Upload, MapPin } from 'lucide-react'
import { MEDICINE_CATEGORIES } from '@/lib/constants'

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [prescriptionRequired, setPrescriptionRequired] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [cart, setCart] = useState<{[key: string]: number}>({})

  const categories = Object.values(MEDICINE_CATEGORIES)

  const medicines = [
    {
      id: 'paracetamol-500',
      name: 'Paracetamol 500mg',
      genericName: 'Paracetamol',
      brand: 'Crocin',
      manufacturer: 'GSK',
      category: 'Over the Counter',
      type: 'tablet',
      strength: '500mg',
      packSize: '15 tablets',
      price: 25,
      mrp: 30,
      discount: 17,
      prescription: false,
      inStock: true,
      description: 'Pain relief and fever reducer',
      uses: ['Headache', 'Fever', 'Body ache', 'Cold symptoms'],
      rating: 4.5,
      reviews: 2340,
      fastDelivery: true,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 'amoxicillin-250',
      name: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      brand: 'Novamox',
      manufacturer: 'Cipla',
      category: 'Prescription Medicines',
      type: 'capsule',
      strength: '250mg',
      packSize: '10 capsules',
      price: 45,
      mrp: 55,
      discount: 18,
      prescription: true,
      inStock: true,
      description: 'Antibiotic for bacterial infections',
      uses: ['Bacterial infections', 'Respiratory tract infections', 'Skin infections'],
      rating: 4.3,
      reviews: 1560,
      fastDelivery: true,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 'vitamin-d3',
      name: 'Vitamin D3 60K IU',
      genericName: 'Cholecalciferol',
      brand: 'Uprise-D3',
      manufacturer: 'Alkem',
      category: 'Vitamins & Supplements',
      type: 'capsule',
      strength: '60000 IU',
      packSize: '4 capsules',
      price: 120,
      mrp: 140,
      discount: 14,
      prescription: false,
      inStock: true,
      description: 'Vitamin D3 supplement for bone health',
      uses: ['Vitamin D deficiency', 'Bone health', 'Immunity'],
      rating: 4.6,
      reviews: 890,
      fastDelivery: false,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 'omeprazole-20',
      name: 'Omeprazole 20mg',
      genericName: 'Omeprazole',
      brand: 'Omez',
      manufacturer: 'Dr. Reddy\'s',
      category: 'Prescription Medicines',
      type: 'capsule',
      strength: '20mg',
      packSize: '15 capsules',
      price: 85,
      mrp: 100,
      discount: 15,
      prescription: true,
      inStock: true,
      description: 'Proton pump inhibitor for acidity',
      uses: ['Acidity', 'GERD', 'Peptic ulcer', 'Heartburn'],
      rating: 4.4,
      reviews: 1230,
      fastDelivery: true,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 'cetirizine-10',
      name: 'Cetirizine 10mg',
      genericName: 'Cetirizine',
      brand: 'Zyrtec',
      manufacturer: 'UCB',
      category: 'Over the Counter',
      type: 'tablet',
      strength: '10mg',
      packSize: '10 tablets',
      price: 35,
      mrp: 42,
      discount: 17,
      prescription: false,
      inStock: true,
      description: 'Antihistamine for allergies',
      uses: ['Allergic rhinitis', 'Urticaria', 'Skin allergies', 'Hay fever'],
      rating: 4.2,
      reviews: 670,
      fastDelivery: true,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 'metformin-500',
      name: 'Metformin 500mg',
      genericName: 'Metformin',
      brand: 'Glycomet',
      manufacturer: 'USV',
      category: 'Prescription Medicines',
      type: 'tablet',
      strength: '500mg',
      packSize: '20 tablets',
      price: 65,
      mrp: 75,
      discount: 13,
      prescription: true,
      inStock: true,
      description: 'Diabetes medication',
      uses: ['Type 2 diabetes', 'PCOS', 'Insulin resistance'],
      rating: 4.5,
      reviews: 1890,
      fastDelivery: true,
      imageUrl: '/api/placeholder/150/150'
    }
  ]

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory
    const matchesPrescription = prescriptionRequired === 'all' || 
                               (prescriptionRequired === 'prescription' && medicine.prescription) ||
                               (prescriptionRequired === 'otc' && !medicine.prescription)

    return matchesSearch && matchesCategory && matchesPrescription
  })

  const addToCart = (medicineId: string) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }))
  }

  const removeFromCart = (medicineId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [medicineId, quantity]) => {
      const medicine = medicines.find(m => m.id === medicineId)
      return total + (medicine ? medicine.price * quantity : 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Medicines Online</h1>
              <p className="text-gray-600 mt-1">Get medicines delivered to your doorstep with prescription upload</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search medicines, brands, or conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Cart */}
            {getTotalCartItems() > 0 && (
              <Link
                href="/medicines/cart"
                className="relative bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({getTotalCartItems()})</span>
                <span className="ml-2 font-semibold">₹{getTotalCartValue()}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Upload Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Upload className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Have a prescription?</h3>
                <p className="text-blue-100 text-sm">Upload and get medicines delivered</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Upload Prescription
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
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

            <select
              value={prescriptionRequired}
              onChange={(e) => setPrescriptionRequired(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Medicines</option>
              <option value="otc">Over the Counter</option>
              <option value="prescription">Prescription Required</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="text-sm text-gray-600">
              {filteredMedicines.length} medicines found
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">100% Genuine Medicines</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Free Delivery Above ₹500</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Same Day Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Pan India Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* Medicine Image */}
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Pill className="h-12 w-12 text-gray-400" />
                </div>

                {/* Medicine Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{medicine.name}</h3>
                    {medicine.prescription && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Rx</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm">{medicine.brand} • {medicine.packSize}</p>
                  <p className="text-gray-500 text-xs">{medicine.manufacturer}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{medicine.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({medicine.reviews})</span>
                    {medicine.fastDelivery && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Fast</span>
                    )}
                  </div>

                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Uses:</span> {medicine.uses.slice(0, 2).join(', ')}
                    {medicine.uses.length > 2 && '...'}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">₹{medicine.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{medicine.mrp}</span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">{medicine.discount}% off</div>
                    </div>
                  </div>

                  {cart[medicine.id] ? (
                    <div className="flex items-center justify-between bg-primary-50 border border-primary-200 rounded-lg p-2">
                      <button
                        onClick={() => removeFromCart(medicine.id)}
                        className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium text-primary-900">{cart[medicine.id]}</span>
                      <button
                        onClick={() => addToCart(medicine.id)}
                        className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(medicine.id)}
                      disabled={!medicine.inStock}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        medicine.inStock
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}

                  <Link
                    href={`/medicines/${medicine.id}`}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}