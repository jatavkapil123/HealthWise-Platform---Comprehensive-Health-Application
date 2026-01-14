'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Truck, Shield, Clock, MapPin, CreditCard } from 'lucide-react'

export default function MedicineCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'paracetamol-500',
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      packSize: '15 tablets',
      price: 25,
      mrp: 30,
      quantity: 2,
      prescription: false,
      imageUrl: '/api/placeholder/80/80'
    },
    {
      id: 'vitamin-d3',
      name: 'Vitamin D3 60K IU',
      brand: 'Uprise-D3',
      packSize: '4 capsules',
      price: 120,
      mrp: 140,
      quantity: 1,
      prescription: false,
      imageUrl: '/api/placeholder/80/80'
    },
    {
      id: 'omeprazole-20',
      name: 'Omeprazole 20mg',
      brand: 'Omez',
      packSize: '15 capsules',
      price: 85,
      mrp: 100,
      quantity: 1,
      prescription: true,
      imageUrl: '/api/placeholder/80/80'
    }
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = cartItems.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0)
  const deliveryCharges = subtotal >= 500 ? 0 : 50
  const total = subtotal + deliveryCharges

  const hasPrescriptionItems = cartItems.some(item => item.prescription)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/medicines"
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{cartItems.length} items in your cart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-green-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">100% Genuine</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Free Delivery ₹500+</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Same Day Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Pan India Service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some medicines to get started</p>
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Prescription Upload Notice */}
              {hasPrescriptionItems && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">Rx</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Prescription Required</h4>
                      <p className="text-blue-800 text-sm mb-3">
                        Some items in your cart require a valid prescription. Please upload your prescription to proceed.
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Upload Prescription
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start gap-4">
                      {/* Medicine Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💊</span>
                      </div>

                      {/* Medicine Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.brand} • {item.packSize}</p>
                            {item.prescription && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                                Prescription Required
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                            <span className="text-sm text-gray-500 line-through">₹{item.mrp}</span>
                            <span className="text-sm text-green-600 font-medium">
                              {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="pt-4">
                <Link
                  href="/medicines"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-₹{savings}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
                  </div>
                  {subtotal < 500 && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      Add ₹{500 - subtotal} more for free delivery
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5" />
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Safe and Secure Payments</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Estimated delivery: 1-2 days</span>
                  </div>
                </div>
              </div>

              {/* Offers */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Available Offers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span className="text-gray-700">Get 10% off on orders above ₹1000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span className="text-gray-700">Free delivery on orders above ₹500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}