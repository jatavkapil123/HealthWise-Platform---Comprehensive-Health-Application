'use client'

import { useState } from 'react'
import { Activity, Heart, Thermometer, Droplets, Moon, TrendingUp, Calendar, Plus } from 'lucide-react'

export function HealthMetrics() {
  const [selectedMetric, setSelectedMetric] = useState('heart-rate')

  const healthData = {
    'heart-rate': {
      current: 72,
      unit: 'bpm',
      status: 'normal',
      trend: 'stable',
      data: [68, 70, 72, 71, 73, 72, 74]
    },
    'blood-pressure': {
      current: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'improving',
      data: [118, 120, 119, 121, 120, 118, 120]
    },
    'temperature': {
      current: 98.6,
      unit: '°F',
      status: 'normal',
      trend: 'stable',
      data: [98.4, 98.6, 98.5, 98.7, 98.6, 98.5, 98.6]
    },
    'hydration': {
      current: 6,
      unit: 'glasses',
      status: 'good',
      trend: 'improving',
      data: [5, 6, 7, 6, 8, 6, 7]
    }
  }

  const metrics = [
    {
      id: 'heart-rate',
      icon: Heart,
      name: 'Heart Rate',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 'blood-pressure',
      icon: Activity,
      name: 'Blood Pressure',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'temperature',
      icon: Thermometer,
      name: 'Temperature',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'hydration',
      icon: Droplets,
      name: 'Hydration',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50'
    }
  ]

  const recentActivities = [
    {
      type: 'exercise',
      title: 'Morning Walk',
      duration: '30 min',
      calories: 150,
      time: '2 hours ago'
    },
    {
      type: 'medication',
      title: 'Vitamin D',
      dosage: '1000 IU',
      time: '4 hours ago'
    },
    {
      type: 'meal',
      title: 'Healthy Lunch',
      calories: 450,
      time: '6 hours ago'
    }
  ]

  const currentData = healthData[selectedMetric as keyof typeof healthData]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Health Monitoring Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your vital signs and health metrics in real-time with IoT device integration and AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metrics Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric) => {
                const data = healthData[metric.id as keyof typeof healthData]
                const isSelected = selectedMetric === metric.id
                
                return (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${metric.bgColor} mb-3`}>
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600">{metric.name}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {data.current} <span className="text-sm font-normal">{data.unit}</span>
                      </p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className={`h-3 w-3 mr-1 ${
                          data.trend === 'improving' ? 'text-green-500' : 
                          data.trend === 'declining' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          data.status === 'normal' || data.status === 'good' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Detailed Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {metrics.find(m => m.id === selectedMetric)?.name} Trend
                </h3>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Last 7 days</span>
                </div>
              </div>
              
              {/* Simple Chart Visualization */}
              <div className="h-48 flex items-end space-x-2">
                {currentData.data.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary-500 rounded-t-sm transition-all hover:bg-primary-600"
                      style={{ 
                        height: `${(value / Math.max(...currentData.data)) * 100}%`,
                        minHeight: '20px'
                      }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Reading</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.current} {currentData.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-medium ${
                      currentData.status === 'normal' || currentData.status === 'good' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {currentData.status.charAt(0).toUpperCase() + currentData.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Health Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: 'Log Symptom', color: 'bg-red-500' },
                  { icon: Heart, label: 'Record Vitals', color: 'bg-blue-500' },
                  { icon: Moon, label: 'Sleep Log', color: 'bg-purple-500' },
                  { icon: Droplets, label: 'Water Intake', color: 'bg-cyan-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">
                        {activity.duration && `${activity.duration} • `}
                        {activity.dosage && `${activity.dosage} • `}
                        {activity.calories && `${activity.calories} cal • `}
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Goals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Goals</h3>
              <div className="space-y-4">
                {[
                  { label: 'Steps', current: 7500, target: 10000, unit: 'steps' },
                  { label: 'Water', current: 6, target: 8, unit: 'glasses' },
                  { label: 'Sleep', current: 7, target: 8, unit: 'hours' }
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{goal.label}</span>
                      <span className="text-sm text-gray-600">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Devices</h3>
              <div className="space-y-3">
                {[
                  { name: 'Smart Watch', status: 'connected', battery: 85 },
                  { name: 'Blood Pressure Monitor', status: 'connected', battery: 92 },
                  { name: 'Smart Scale', status: 'offline', battery: 0 }
                ].map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        device.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-700">{device.name}</span>
                    </div>
                    {device.status === 'connected' && (
                      <span className="text-xs text-gray-500">{device.battery}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}