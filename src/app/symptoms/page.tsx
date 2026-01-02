'use client'

import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, Clock, ArrowRight, Brain, Stethoscope } from 'lucide-react'

export default function SymptomsPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const commonSymptoms = [
    { id: 'headache', name: 'Headache', category: 'neurological' },
    { id: 'fever', name: 'Fever', category: 'general' },
    { id: 'cough', name: 'Cough', category: 'respiratory' },
    { id: 'fatigue', name: 'Fatigue', category: 'general' },
    { id: 'nausea', name: 'Nausea', category: 'digestive' },
    { id: 'chest-pain', name: 'Chest Pain', category: 'cardiovascular' },
    { id: 'shortness-breath', name: 'Shortness of Breath', category: 'respiratory' },
    { id: 'dizziness', name: 'Dizziness', category: 'neurological' },
    { id: 'stomach-pain', name: 'Stomach Pain', category: 'digestive' },
    { id: 'muscle-aches', name: 'Muscle Aches', category: 'musculoskeletal' },
    { id: 'sore-throat', name: 'Sore Throat', category: 'respiratory' },
    { id: 'rash', name: 'Skin Rash', category: 'dermatological' }
  ]

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const analyzeSymptoms = () => {
    // Simulate AI analysis
    const mockResult = {
      possibleConditions: [
        {
          name: 'Common Cold',
          probability: 75,
          severity: 'mild',
          description: 'A viral infection of the upper respiratory tract'
        },
        {
          name: 'Seasonal Flu',
          probability: 60,
          severity: 'moderate',
          description: 'Influenza virus infection affecting respiratory system'
        },
        {
          name: 'Stress/Anxiety',
          probability: 45,
          severity: 'mild',
          description: 'Physical symptoms related to psychological stress'
        }
      ],
      recommendations: [
        'Rest and stay hydrated',
        'Monitor temperature regularly',
        'Consider over-the-counter pain relief',
        'Consult a doctor if symptoms worsen'
      ],
      urgency: 'low',
      shouldSeeDoctor: false
    }
    
    setAnalysisResult(mockResult)
  }

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-10 w-10 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Symptom Checker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered insights about possible conditions and next steps.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Important Medical Disclaimer</h3>
              <p className="text-yellow-700 text-sm mt-1">
                This tool provides general information only and should not replace professional medical advice. 
                Always consult healthcare providers for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptom Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Symptoms</h2>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Symptom Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{symptom.name}</span>
                      {selectedSymptoms.includes(symptom.id) && (
                        <CheckCircle className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{symptom.category}</span>
                  </button>
                ))}
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Selected Symptoms ({selectedSymptoms.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptomId) => {
                      const symptom = commonSymptoms.find(s => s.id === symptomId)
                      return (
                        <span
                          key={symptomId}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                        >
                          {symptom?.name}
                          <button
                            onClick={() => toggleSymptom(symptomId)}
                            className="ml-2 text-primary-500 hover:text-primary-700"
                          >
                            ×
                          </button>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  selectedSymptoms.length > 0
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Stethoscope className="h-5 w-5 inline mr-2" />
                Analyze Symptoms
              </button>
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
                
                {/* Urgency Level */}
                <div className={`p-4 rounded-lg mb-6 ${
                  analysisResult.urgency === 'high' ? 'bg-red-50 border border-red-200' :
                  analysisResult.urgency === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-5 w-5 ${
                      analysisResult.urgency === 'high' ? 'text-red-600' :
                      analysisResult.urgency === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    <span className={`font-medium ${
                      analysisResult.urgency === 'high' ? 'text-red-800' :
                      analysisResult.urgency === 'medium' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                      {analysisResult.urgency === 'high' ? 'High Priority' :
                       analysisResult.urgency === 'medium' ? 'Medium Priority' :
                       'Low Priority'}
                    </span>
                  </div>
                </div>

                {/* Possible Conditions */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Possible Conditions</h3>
                  <div className="space-y-3">
                    {analysisResult.possibleConditions.map((condition: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{condition.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            condition.severity === 'mild' ? 'bg-green-100 text-green-700' :
                            condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {condition.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{condition.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Match probability</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${condition.probability}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{condition.probability}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Next Steps</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    Based on your symptoms, we recommend monitoring your condition and considering professional medical advice.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary">
                      Book Consultation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                    <button className="btn-secondary">
                      Find Nearby Doctor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-red-900">Emergency Symptoms</h3>
              </div>
              <p className="text-red-800 text-sm mb-4">
                Call 911 immediately if you experience:
              </p>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Chest pain or pressure</li>
                <li>• Difficulty breathing</li>
                <li>• Severe bleeding</li>
                <li>• Loss of consciousness</li>
                <li>• Severe allergic reaction</li>
                <li>• Signs of stroke (FAST)</li>
              </ul>
              <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                Call Emergency Services
              </button>
            </div>

            {/* Quick Health Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Health Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Stay hydrated by drinking 8-10 glasses of water daily</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Get 7-9 hours of quality sleep each night</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Exercise regularly for at least 30 minutes daily</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Practice stress management techniques</p>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="font-medium text-gray-900">Drug Interaction Checker</div>
                  <div className="text-gray-600 text-sm">Check medication interactions</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="font-medium text-gray-900">BMI Calculator</div>
                  <div className="text-gray-600 text-sm">Calculate body mass index</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="font-medium text-gray-900">Health Risk Assessment</div>
                  <div className="text-gray-600 text-sm">Evaluate health risks</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}