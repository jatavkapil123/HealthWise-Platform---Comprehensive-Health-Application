'use client'

import { useState, useEffect } from 'react'
import { Clock, Users, Star, Play, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface HealthTest {
  id: number
  title: string
  description: string
  category: string
  difficulty_level: string
  total_questions: number
  estimated_time: number
  attempts_count: number
  average_score: number
  is_featured: boolean
}

export default function HealthTestsPage() {
  const [tests, setTests] = useState<HealthTest[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  const categories = [
    { value: 'general_health', label: 'General Health' },
    { value: 'heart_health', label: 'Heart Health' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'mental_wellness', label: 'Mental Wellness' },
    { value: 'nutrition', label: 'Nutrition' }
  ]

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const mockTests: HealthTest[] = [
    {
      id: 1,
      title: 'Heart Health Assessment',
      description: 'Evaluate your cardiovascular health risk factors and get personalized recommendations.',
      category: 'heart_health',
      difficulty_level: 'intermediate',
      total_questions: 25,
      estimated_time: 15,
      attempts_count: 1250,
      average_score: 78.5,
      is_featured: true
    },
    {
      id: 2,
      title: 'Diabetes Risk Evaluation',
      description: 'Assess your risk of developing diabetes and learn prevention strategies.',
      category: 'diabetes',
      difficulty_level: 'beginner',
      total_questions: 20,
      estimated_time: 12,
      attempts_count: 890,
      average_score: 82.3,
      is_featured: true
    },
    {
      id: 3,
      title: 'Mental Wellness Check',
      description: 'Evaluate your mental health status and get insights for better wellbeing.',
      category: 'mental_wellness',
      difficulty_level: 'intermediate',
      total_questions: 30,
      estimated_time: 18,
      attempts_count: 2100,
      average_score: 75.8,
      is_featured: false
    }
  ]

  useEffect(() => {
    setTests(mockTests)
  }, [])

  const filteredTests = tests.filter(test => {
    const matchesCategory = !selectedCategory || test.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || test.difficulty_level === selectedDifficulty
    return matchesCategory && matchesDifficulty
  })

  const featuredTests = tests.filter(test => test.is_featured)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Tests</h1>
            <p className="text-xl text-gray-600">Comprehensive health assessments and evaluations</p>
          </div>

          {/* Featured Tests */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTests.map((test) => (
                <Link key={test.id} href={`/health-tests/${test.id}`}>
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Award className="h-6 w-6 text-yellow-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{test.title}</h3>
                    <p className="text-primary-100 mb-4 line-clamp-2">{test.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {test.estimated_time} min
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {test.attempts_count}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{test.average_score}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty_level)} bg-opacity-20 text-white`}>
                        {test.difficulty_level.charAt(0).toUpperCase() + test.difficulty_level.slice(1)}
                      </span>
                      <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
                        <Play className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Start Test</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Levels</option>
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* All Tests */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Health Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <Link key={test.id} href={`/health-tests/${test.id}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{test.title}</h3>
                      {test.is_featured && (
                        <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{test.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {test.estimated_time} minutes
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {test.attempts_count} taken
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty_level)}`}>
                        {test.difficulty_level.charAt(0).toUpperCase() + test.difficulty_level.slice(1)}
                      </span>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{test.average_score}% avg</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{test.total_questions} questions</span>
                      <div className="flex items-center text-primary-600 font-medium">
                        <Play className="h-4 w-4 mr-1" />
                        Start Test
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