'use client'

import { useState, useEffect } from 'react'
import { Play, Eye, Share2, Clock } from 'lucide-react'
import Link from 'next/link'

interface WebStory {
  id: number
  title: string
  description: string
  cover_image: string
  total_slides: number
  views_count: number
  category: string
  published_at: string
}

export default function WebStoriesPage() {
  const [stories, setStories] = useState<WebStory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { value: 'general_health', label: 'General Health' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'mental_wellness', label: 'Mental Wellness' },
    { value: 'womens_health', label: "Women's Health" }
  ]

  const mockStories: WebStory[] = [
    {
      id: 1,
      title: '5 Morning Habits for Better Health',
      description: 'Start your day right with these simple health habits',
      cover_image: '/api/placeholder/400/600',
      total_slides: 6,
      views_count: 1500,
      category: 'general_health',
      published_at: '2024-01-15'
    },
    {
      id: 2,
      title: 'Superfoods for Immunity',
      description: 'Boost your immune system with these powerful foods',
      cover_image: '/api/placeholder/400/600',
      total_slides: 8,
      views_count: 2200,
      category: 'nutrition',
      published_at: '2024-01-12'
    }
  ]

  useEffect(() => {
    setStories(mockStories)
  }, [])

  const filteredStories = stories.filter(story => 
    !selectedCategory || story.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Stories</h1>
            <p className="text-xl text-gray-600">Interactive health stories and tips</p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  !selectedCategory 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Stories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredStories.map((story) => (
              <Link key={story.id} href={`/web-stories/${story.id}`}>
                <div className="relative group cursor-pointer">
                  <div className="aspect-[9/16] bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary-600 ml-1" />
                      </div>
                    </div>
                    
                    {/* Story Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {story.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {story.total_slides} slides
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {story.views_count}
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-primary-800 text-xs font-medium rounded-full">
                        {categories.find(c => c.value === story.category)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Stories Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredStories.slice(0, 2).map((story) => (
                <Link key={story.id} href={`/web-stories/${story.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Play className="h-10 w-10 text-primary-600 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {story.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {story.total_slides} slides
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {story.views_count} views
                          </div>
                        </div>
                        
                        <button className="flex items-center text-primary-600 hover:text-primary-700">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}