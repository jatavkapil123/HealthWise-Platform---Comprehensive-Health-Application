import Link from 'next/link'
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Pill, 
  Users, 
  Monitor, 
  Calendar, 
  Shield,
  Smartphone,
  Activity
} from 'lucide-react'

export function FeaturedServices() {
  const services = [
    {
      icon: Stethoscope,
      title: 'AI Symptom Checker',
      description: 'Get instant analysis of your symptoms with our AI-powered diagnostic tool',
      features: ['Instant results', 'Evidence-based', 'Privacy protected'],
      href: '/symptoms',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Monitor,
      title: 'Telemedicine',
      description: 'Connect with certified doctors through secure video consultations',
      features: ['24/7 availability', 'Prescription service', 'Insurance accepted'],
      href: '/telemedicine',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Access therapy, counseling, and mental wellness resources',
      features: ['Licensed therapists', 'Crisis support', 'Mood tracking'],
      href: '/mental-health',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: 'Track vital signs and health metrics with IoT device integration',
      features: ['Real-time data', 'Trend analysis', 'Alert system'],
      href: '/monitoring',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Pill,
      title: 'Medication Management',
      description: 'Smart pill reminders and drug interaction checking',
      features: ['Smart reminders', 'Interaction alerts', 'Refill tracking'],
      href: '/medications',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Community Health',
      description: 'Join support groups and connect with health-focused communities',
      features: ['Support groups', 'Expert forums', 'Local events'],
      href: '/community',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const additionalFeatures = [
    {
      icon: Calendar,
      title: 'Appointment Booking',
      description: 'Schedule with healthcare providers'
    },
    {
      icon: Shield,
      title: 'Health Insurance',
      description: 'Navigate insurance and claims'
    },
    {
      icon: Smartphone,
      title: 'Mobile Health App',
      description: 'Access care on-the-go'
    },
    {
      icon: Activity,
      title: 'Wellness Programs',
      description: 'Personalized health plans'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Health Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered diagnostics to community support, we provide everything you need for better health outcomes.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                  Learn More
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Additional Health Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-md mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Health?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already using HealthWise to improve their health outcomes and quality of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-xl transition-colors">
                Get Started Free
              </Link>
              <Link href="/demo" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-xl transition-colors">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}