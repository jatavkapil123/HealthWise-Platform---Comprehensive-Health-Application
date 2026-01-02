import Link from 'next/link'
import { Users, MessageSquare, Calendar, MapPin, Award, TrendingUp, Heart, Star } from 'lucide-react'

export function CommunityHealth() {
  const communityStats = [
    { label: 'Active Members', value: '50K+', icon: Users },
    { label: 'Support Groups', value: '200+', icon: Heart },
    { label: 'Health Events', value: '150+', icon: Calendar },
    { label: 'Expert Answers', value: '10K+', icon: MessageSquare }
  ]

  const supportGroups = [
    {
      name: 'Diabetes Support',
      members: 1250,
      category: 'Chronic Conditions',
      lastActive: '2 hours ago',
      image: '🩺'
    },
    {
      name: 'Mental Wellness',
      members: 2100,
      category: 'Mental Health',
      lastActive: '30 minutes ago',
      image: '🧠'
    },
    {
      name: 'Heart Health Warriors',
      members: 890,
      category: 'Cardiovascular',
      lastActive: '1 hour ago',
      image: '❤️'
    },
    {
      name: 'Cancer Survivors',
      members: 650,
      category: 'Oncology',
      lastActive: '45 minutes ago',
      image: '🎗️'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Free Health Screening',
      date: 'Jan 15, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Community Center',
      attendees: 45,
      type: 'screening'
    },
    {
      title: 'Mental Health Workshop',
      date: 'Jan 18, 2024',
      time: '2:00 PM - 4:00 PM',
      location: 'Online',
      attendees: 120,
      type: 'workshop'
    },
    {
      title: 'Nutrition Seminar',
      date: 'Jan 22, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Health Center',
      attendees: 78,
      type: 'seminar'
    }
  ]

  const healthChallenges = [
    {
      title: '10,000 Steps Challenge',
      participants: 2500,
      duration: '30 days',
      reward: 'Health Badge',
      progress: 65
    },
    {
      title: 'Mindful January',
      participants: 1800,
      duration: '31 days',
      reward: 'Wellness Points',
      progress: 45
    },
    {
      title: 'Hydration Hero',
      participants: 3200,
      duration: '7 days',
      reward: 'Achievement Badge',
      progress: 80
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Community Health Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with others on similar health journeys, participate in local health initiatives, and build a supportive wellness community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Groups */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Support Groups</h3>
                <Link href="/community/groups" className="text-primary-600 hover:text-primary-700 font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportGroups.map((group, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{group.image}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{group.name}</h4>
                          <p className="text-sm text-gray-600">{group.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{group.members}</div>
                        <div className="text-xs text-gray-500">members</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last active: {group.lastActive}</span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Join Group
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Health Challenges */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Active Health Challenges</h3>
                <div className="space-y-4">
                  {healthChallenges.map((challenge, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                          <p className="text-sm text-gray-600">
                            {challenge.participants} participants • {challenge.duration} • Reward: {challenge.reward}
                          </p>
                        </div>
                        <Award className="h-6 w-6 text-yellow-500" />
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Join Challenge
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Register →
                    </button>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/community/events" 
                className="block mt-6 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View All Events
              </Link>
            </div>

            {/* Community Impact */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-100">Lives Improved</span>
                  <span className="font-bold">25,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-100">Health Screenings</span>
                  <span className="font-bold">5,200+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-100">Support Sessions</span>
                  <span className="font-bold">12,500+</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-green-400">
                <p className="text-green-100 text-sm">
                  "This community has been a lifeline for my health journey. The support and resources are incredible."
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-green-100 text-xs ml-2">- Sarah M.</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Involved</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Start a Support Group
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  Volunteer for Events
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  Share Your Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}