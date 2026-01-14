'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Activity, Heart, Brain, Utensils, Moon, Cigarette, Wine, Dumbbell, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'

export default function HealthRiskAssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    smoking: '',
    alcohol: '',
    exercise: '',
    diet: '',
    sleep_hours: '',
    chronic_conditions: [] as string[],
    family_history: [] as string[],
    current_medications: [] as string[],
    stress_level: '',
    mental_health: ''
  })

  const totalSteps = 5

  const chronicConditionOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid Disorder',
    'Kidney Disease', 'Liver Disease', 'Cancer', 'Arthritis', 'None'
  ]

  const familyHistoryOptions = [
    'Heart Disease', 'Diabetes', 'Cancer', 'Hypertension', 'Stroke',
    'Alzheimer\'s', 'Mental Health Issues', 'None'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[]
      if (value === 'None') {
        return { ...prev, [field]: ['None'] }
      }
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value && v !== 'None')
        : [...currentValues.filter(v => v !== 'None'), value]
      return { ...prev, [field]: newValues }
    })
  }

  const handleSubmit = async () => {
    try {
      // Submit to API
      console.log('Submitting assessment:', formData)
      // Navigate to results page
      router.push('/health-risk-assessment/results')
    } catch (error) {
      console.error('Error submitting assessment:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Let's start with some basic details about you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter height in cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter weight in kg"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifestyle Habits</h2>
              <p className="text-gray-600">Tell us about your daily habits</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Cigarette className="h-5 w-5" />
                  Smoking Status
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['never', 'former', 'current'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('smoking', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.smoking === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Wine className="h-5 w-5" />
                  Alcohol Consumption
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['never', 'occasional', 'regular'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('alcohol', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.alcohol === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Exercise Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {['sedentary', 'light', 'moderate', 'active'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('exercise', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.exercise === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Diet Quality
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {['poor', 'average', 'good', 'excellent'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('diet', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.diet === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Average Sleep Hours per Night
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.sleep_hours}
                  onChange={(e) => handleInputChange('sleep_hours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 7.5"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <AlertCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical History</h2>
              <p className="text-gray-600">Help us understand your health background</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chronic Conditions (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {chronicConditionOptions.map(condition => (
                    <button
                      key={condition}
                      onClick={() => handleMultiSelect('chronic_conditions', condition)}
                      className={`p-3 border-2 rounded-lg text-sm text-center transition-all ${
                        formData.chronic_conditions.includes(condition)
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Family History (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {familyHistoryOptions.map(condition => (
                    <button
                      key={condition}
                      onClick={() => handleMultiSelect('family_history', condition)}
                      className={`p-3 border-2 rounded-lg text-sm text-center transition-all ${
                        formData.family_history.includes(condition)
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mental Wellbeing</h2>
              <p className="text-gray-600">Your mental health is just as important</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Stress Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['low', 'moderate', 'high'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('stress_level', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.stress_level === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Mental Health
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {['poor', 'fair', 'good', 'excellent'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('mental_health', option)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-all ${
                        formData.mental_health === option
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
              <p className="text-gray-600">Please review your responses before submitting</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Age:</span>
                  <p className="font-medium">{formData.age} years</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Gender:</span>
                  <p className="font-medium capitalize">{formData.gender}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Height:</span>
                  <p className="font-medium">{formData.height} cm</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Weight:</span>
                  <p className="font-medium">{formData.weight} kg</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">BMI:</span>
                  <p className="font-medium">
                    {formData.height && formData.weight
                      ? ((parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1))
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Sleep:</span>
                  <p className="font-medium">{formData.sleep_hours} hours</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <span className="text-sm text-gray-600">Lifestyle:</span>
                <p className="font-medium capitalize">
                  {formData.smoking} smoker, {formData.alcohol} alcohol, {formData.exercise} exercise, {formData.diet} diet
                </p>
              </div>

              <div className="border-t pt-4">
                <span className="text-sm text-gray-600">Stress & Mental Health:</span>
                <p className="font-medium capitalize">
                  {formData.stress_level} stress, {formData.mental_health} mental health
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Get My Results
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
