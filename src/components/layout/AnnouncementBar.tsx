'use client'

import Link from 'next/link'
import { X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-2 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-white/5"></div>
      </div>
      
      <div className="container relative">
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">
              🎉 <strong>Limited Time Offer:</strong> Full Body Checkup at just ₹499 (59 biomarkers) | 
              <Link href="/book-test" className="underline hover:no-underline ml-1 font-semibold">
                Book Now
              </Link>
            </span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}