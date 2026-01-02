'use client'

import { useState } from 'react'
import { MessageCircle, Send, Bot, User, Mic, Camera } from 'lucide-react'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI Health Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])

  const quickQuestions = [
    'What are the symptoms of flu?',
    'How to manage stress?',
    'Healthy diet tips',
    'Exercise recommendations',
    'Sleep hygiene advice'
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'bot',
        content: 'Thank you for your question. Based on current medical guidelines, I can provide you with evidence-based information. Would you like me to elaborate on any specific aspect?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI Health Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant, personalized health guidance powered by advanced AI and medical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Features */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                What Our AI Can Help With
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Symptom Analysis',
                    description: 'Describe your symptoms and get preliminary insights',
                    icon: '🔍'
                  },
                  {
                    title: 'Health Education',
                    description: 'Learn about conditions, treatments, and prevention',
                    icon: '📚'
                  },
                  {
                    title: 'Medication Information',
                    description: 'Get details about drugs, dosages, and interactions',
                    icon: '💊'
                  },
                  {
                    title: 'Lifestyle Guidance',
                    description: 'Receive personalized wellness and lifestyle tips',
                    icon: '🌟'
                  },
                  {
                    title: 'Emergency Guidance',
                    description: 'Know when to seek immediate medical attention',
                    icon: '🚨'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Available 24/7</h3>
              <p className="text-green-100 mb-4">
                Our AI assistant is always ready to help, providing instant responses to your health questions anytime, anywhere.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                  Online Now
                </div>
                <div>Response Time: &lt; 3 seconds</div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">HealthWise AI Assistant</h3>
                  <p className="text-primary-100 text-sm">Always here to help</p>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-primary-600' : 'bg-gray-200'}`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-3 ${msg.type === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about health..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="p-2 text-gray-500 hover:text-primary-600 rounded-full">
                  <Mic className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-primary-600 rounded-full">
                  <Camera className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 text-xl">⚠️</div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Important Medical Disclaimer</h4>
              <p className="text-yellow-700 text-sm">
                This AI assistant provides general health information and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for medical diagnosis and treatment decisions. 
                In case of emergency, call 911 immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}