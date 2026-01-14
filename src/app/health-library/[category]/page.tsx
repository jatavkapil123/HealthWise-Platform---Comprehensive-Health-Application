'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Search, Clock, Eye, Heart, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface HealthContent {
  id: number
  title: string
  summary: string
  category: string
  content_type: string
  read_time_minutes: number
  views_count: number
  likes_count: number
  rating: number
  featured_image?: string
  author_name?: string
  published_at: string
}

export default function HealthLibraryCategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [content, setContent] = useState<HealthContent[]>([])
  const [loading, setLoading] = useState(true)

  const categoryLabels: { [key: string]: string } = {
    'general-health': 'General Health',
    'covid-19': 'COVID-19',
    'heart-health': 'Heart Health',
    'diabetes': 'Diabetes',
    'mental-wellness': 'Mental Wellness',
    'nutrition': 'Nutrition',
    'womens-health': "Women's Health",
    'cancer': 'Cancer',
    'ayurveda': 'Ayurveda',
    'cholesterol': 'Cholesterol',
    'hypertension': 'Hypertension',
    'yoga-exercise': 'Yoga & Exercise',
    'skin-hair': 'Skin & Hair',
    'immunity': 'Immunity',
    'thyroid': 'Thyroid'
  }

  const categoryDescriptions: { [key: string]: string } = {
    'general-health': 'Essential health information for everyday wellness',
    'covid-19': 'Latest information and guidelines about COVID-19',
    'heart-health': 'Cardiovascular health tips and prevention strategies',
    'diabetes': 'Managing and preventing diabetes effectively',
    'mental-wellness': 'Mental health resources and wellness strategies',
    'nutrition': 'Healthy eating habits and nutritional guidance',
    'womens-health': 'Health topics specifically for women',
    'cancer': 'Cancer prevention, treatment, and support information',
    'ayurveda': 'Traditional Ayurvedic medicine and practices'
  }

  // Mock data based on category
  const mockContent: HealthContent[] = [
    {
      id: 1,
      title: `Understanding ${categoryLabels[category] || 'Health'}: A Complete Guide`,
      summary: `Comprehensive information about ${categoryLabels[category]?.toLowerCase() || 'health'} management and prevention.`,
      category: category.replace('-', '_'),
      content_type: 'article',
      read_time_minutes: 12,
      views_count: 2100,
      likes_count: 156,
      rating: 4.8,
      author_name: 'Dr. Priya Sharma',
      published_at: '2024-01-15'
    },
    {
      id: 2,
      title: `Top 10 Tips for Better ${categoryLabels[category] || 'Health'}`,
      summary: `Practical tips and strategies to improve your ${categoryLabels[category]?.toLowerCase() || 'health'}.`,
      category: category.replace('-', '_'),
      content_type: 'guide',
      read_time_minutes: 8,
      views_count: 1850,
      likes_count: 124,
      rating: 4.6,
      author_name: 'Dr. Rajesh Kumar',
      published_at: '2024-01-10'
    }
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setContent(mockContent)
      setLoading(false)
    }, 1000)
  }, [category])

  const categoryLabel = categoryLabels[category] || 'Health Information'
  const categoryDescription = categoryDescriptions[category] || 'Health information and resources'

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6">
            <Link href="/health-library" className="flex items-center text-primary-600 hover:text-primary-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Health Library
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryLabel}</h1>
            <p className="text-xl text-gray-600">{categoryDescription}</p>
          </div>

          {/* Content Grid */}
          <div className="space-y-6">
            {content.map((item) => (
              <Link key={item.id} href={`/health-library/${item.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mr-3">
                          {item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1)}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-lg">
                        {item.summary}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.read_time_minutes} min read
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views_count} views
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes_count}
                          </div>
                        </div>
                        
                        {item.author_name && (
                          <div className="text-primary-600 font-medium">
                            By {item.author_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {content.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No content available</h3>
              <p className="text-gray-600">Content for this category is coming soon.</p>
            </div>
          )}

          {/* Related Categories */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(categoryLabels)
                .filter(([key]) => key !== category)
                .slice(0, 6)
                .map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/health-library/${key}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-center transition-colors"
                  >
                    {label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}