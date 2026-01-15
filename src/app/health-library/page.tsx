'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Clock, Eye, Heart, Star } from 'lucide-react'
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

export default function HealthLibraryPage() {
  const [content, setContent] = useState<HealthContent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'exercise_yoga', label: 'Exercise & Yoga', featured: true },
    { value: 'general_health', label: 'General Health' },
    { value: 'covid_19', label: 'COVID-19' },
    { value: 'heart_health', label: 'Heart Health' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'mental_wellness', label: 'Mental Wellness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'womens_health', label: "Women's Health" },
    { value: 'cancer', label: 'Cancer' },
    { value: 'ayurveda', label: 'Ayurveda' }
  ]

  const contentTypes = [
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'guide', label: 'Guides' },
    { value: 'faq', label: 'FAQs' }
  ]

  // Mock data
  const mockContent: HealthContent[] = [
    {
      id: 1,
      title: '10 Essential Tips for Heart Health',
      summary: 'Learn the most effective ways to keep your heart healthy and prevent cardiovascular diseases.',
      category: 'heart_health',
      content_type: 'article',
      read_time_minutes: 8,
      views_count: 1250,
      likes_count: 89,
      rating: 4.7,
      author_name: 'Dr. Priya Sharma',
      published_at: '2024-01-15'
    },
    {
      id: 2,
      title: 'Understanding Diabetes: A Complete Guide',
      summary: 'Comprehensive information about diabetes types, symptoms, management, and prevention.',
      category: 'diabetes',
      content_type: 'guide',
      read_time_minutes: 15,
      views_count: 2100,
      likes_count: 156,
      rating: 4.8,
      author_name: 'Dr. Rajesh Kumar',
      published_at: '2024-01-10'
    }
  ]

  useEffect(() => {
    setContent(mockContent)
  }, [])

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesType = !selectedType || item.content_type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Library</h1>
            <p className="text-xl text-gray-600">Trusted health information and resources</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search health topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Types</option>
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              
              <button className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Featured: Exercise & Yoga Section */}
          <Link href="/health-library/exercise-yoga">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 mb-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-[1.02]">
              <div className="flex flex-col md:flex-row items-center justify-between text-white">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Exercise & Yoga</h2>
                  <p className="text-blue-100 text-lg mb-4">
                    Transform your health with guided exercises and yoga poses
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">12 Exercises</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">Step-by-Step Guides</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">All Levels</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                  <div className="text-4xl font-bold">🧘‍♀️</div>
                  <div className="text-sm mt-2">Start Now</div>
                </div>
              </div>
            </div>
          </Link>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Link key={item.id} href={`/health-library/${item.id}`}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1)}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                    <div className="text-sm text-gray-600">
                      By {item.author_name}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}