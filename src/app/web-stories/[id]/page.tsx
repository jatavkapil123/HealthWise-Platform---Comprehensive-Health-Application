'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, Share2, Bookmark, Play } from 'lucide-react'

export default function WebStoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Mock data - In production, fetch from API
  const stories = {
    '1': {
      id: 1,
      title: '5 Morning Habits for Better Health',
      description: 'Start your day right with these simple health habits',
      category: 'General Health',
      slides: [
        {
          id: 1,
          title: 'Wake Up Early',
          content: 'Early rising improves productivity and mental clarity. Aim for 6-7 AM wake time.',
          image: '/images/morning-1.jpg',
          backgroundColor: 'from-blue-500 to-blue-600'
        },
        {
          id: 2,
          title: 'Drink Water',
          content: 'Hydrate your body first thing. Drink 2 glasses of water to kickstart metabolism.',
          image: '/images/morning-2.jpg',
          backgroundColor: 'from-cyan-500 to-cyan-600'
        },
        {
          id: 3,
          title: 'Exercise',
          content: 'Get your blood flowing with 20-30 minutes of exercise or yoga.',
          image: '/images/morning-3.jpg',
          backgroundColor: 'from-green-500 to-green-600'
        },
        {
          id: 4,
          title: 'Healthy Breakfast',
          content: 'Fuel your body with protein, fiber, and healthy fats. Never skip breakfast!',
          image: '/images/morning-4.jpg',
          backgroundColor: 'from-orange-500 to-orange-600'
        },
        {
          id: 5,
          title: 'Meditation',
          content: 'Start with a calm mind. 10 minutes of meditation reduces stress and anxiety.',
          image: '/images/morning-5.jpg',
          backgroundColor: 'from-purple-500 to-purple-600'
        }
      ],
      views: 1500,
      likes: 234
    },
    '2': {
      id: 2,
      title: 'Heart Health Tips',
      description: 'Essential tips to keep your heart healthy',
      category: 'Heart Health',
      slides: [
        {
          id: 1,
          title: 'Exercise Regularly',
          content: '30 minutes of cardio daily strengthens your heart and improves circulation.',
          backgroundColor: 'from-red-500 to-red-600'
        },
        {
          id: 2,
          title: 'Eat Heart-Healthy Foods',
          content: 'Include omega-3 fatty acids, whole grains, and plenty of fruits and vegetables.',
          backgroundColor: 'from-pink-500 to-pink-600'
        },
        {
          id: 3,
          title: 'Manage Stress',
          content: 'Chronic stress damages your heart. Practice relaxation techniques daily.',
          backgroundColor: 'from-rose-500 to-rose-600'
        },
        {
          id: 4,
          title: 'Quit Smoking',
          content: 'Smoking is the leading cause of heart disease. Quit today for a healthier tomorrow.',
          backgroundColor: 'from-red-600 to-red-700'
        },
        {
          id: 5,
          title: 'Regular Checkups',
          content: 'Monitor blood pressure, cholesterol, and blood sugar regularly.',
          backgroundColor: 'from-red-500 to-pink-600'
        }
      ],
      views: 2100,
      likes: 456
    },
    '3': {
      id: 3,
      title: 'Diabetes Management Guide',
      description: 'Control your blood sugar with these proven strategies',
      category: 'Diabetes',
      slides: [
        {
          id: 1,
          title: 'Monitor Blood Sugar',
          content: 'Check your glucose levels regularly. Keep a log to track patterns and trends.',
          backgroundColor: 'from-indigo-500 to-indigo-600'
        },
        {
          id: 2,
          title: 'Balanced Diet',
          content: 'Focus on low glycemic index foods. Control portion sizes and carb intake.',
          backgroundColor: 'from-blue-500 to-blue-600'
        },
        {
          id: 3,
          title: 'Stay Active',
          content: 'Exercise helps insulin work better. Aim for 150 minutes of activity per week.',
          backgroundColor: 'from-cyan-500 to-cyan-600'
        },
        {
          id: 4,
          title: 'Take Medications',
          content: 'Never skip your diabetes medications. Set reminders to stay on schedule.',
          backgroundColor: 'from-teal-500 to-teal-600'
        },
        {
          id: 5,
          title: 'Regular Checkups',
          content: 'Visit your doctor every 3 months. Get HbA1c tested to track long-term control.',
          backgroundColor: 'from-blue-600 to-indigo-600'
        }
      ],
      views: 1850,
      likes: 312
    },
    '4': {
      id: 4,
      title: 'Mental Wellness Tips',
      description: 'Take care of your mental health every day',
      category: 'Mental Health',
      slides: [
        {
          id: 1,
          title: 'Practice Mindfulness',
          content: 'Be present in the moment. Mindfulness reduces anxiety and improves focus.',
          backgroundColor: 'from-purple-500 to-purple-600'
        },
        {
          id: 2,
          title: 'Connect with Others',
          content: 'Social connections boost mental health. Reach out to friends and family regularly.',
          backgroundColor: 'from-violet-500 to-violet-600'
        },
        {
          id: 3,
          title: 'Get Quality Sleep',
          content: '7-9 hours of sleep is essential. Poor sleep affects mood and mental clarity.',
          backgroundColor: 'from-indigo-500 to-purple-600'
        },
        {
          id: 4,
          title: 'Limit Screen Time',
          content: 'Too much screen time increases stress. Take regular digital detox breaks.',
          backgroundColor: 'from-purple-600 to-pink-600'
        },
        {
          id: 5,
          title: 'Seek Help When Needed',
          content: 'It\'s okay to ask for help. Talk to a therapist if you\'re struggling.',
          backgroundColor: 'from-pink-500 to-purple-600'
        }
      ],
      views: 2450,
      likes: 567
    },
    '5': {
      id: 5,
      title: 'Nutrition Essentials',
      description: 'Build a healthy plate with these nutrition basics',
      category: 'Nutrition',
      slides: [
        {
          id: 1,
          title: 'Eat the Rainbow',
          content: 'Different colored fruits and vegetables provide different nutrients. Aim for variety!',
          backgroundColor: 'from-green-500 to-green-600'
        },
        {
          id: 2,
          title: 'Protein Power',
          content: 'Include lean protein in every meal. It keeps you full and builds muscle.',
          backgroundColor: 'from-emerald-500 to-emerald-600'
        },
        {
          id: 3,
          title: 'Healthy Fats',
          content: 'Choose nuts, avocados, and olive oil. Healthy fats support brain and heart health.',
          backgroundColor: 'from-lime-500 to-lime-600'
        },
        {
          id: 4,
          title: 'Whole Grains',
          content: 'Switch to whole grains for sustained energy. They\'re rich in fiber and nutrients.',
          backgroundColor: 'from-yellow-500 to-yellow-600'
        },
        {
          id: 5,
          title: 'Stay Hydrated',
          content: 'Drink 8-10 glasses of water daily. Proper hydration is key to good health.',
          backgroundColor: 'from-cyan-500 to-blue-600'
        }
      ],
      views: 1920,
      likes: 398
    },
    '6': {
      id: 6,
      title: 'Fitness Fundamentals',
      description: 'Get fit with these essential exercise tips',
      category: 'Fitness',
      slides: [
        {
          id: 1,
          title: 'Start Slow',
          content: 'Begin with 10-15 minutes daily. Gradually increase duration and intensity.',
          backgroundColor: 'from-orange-500 to-orange-600'
        },
        {
          id: 2,
          title: 'Mix It Up',
          content: 'Combine cardio, strength training, and flexibility exercises for best results.',
          backgroundColor: 'from-amber-500 to-amber-600'
        },
        {
          id: 3,
          title: 'Warm Up & Cool Down',
          content: 'Always warm up before and cool down after exercise to prevent injuries.',
          backgroundColor: 'from-red-500 to-orange-600'
        },
        {
          id: 4,
          title: 'Listen to Your Body',
          content: 'Rest when needed. Overtraining can lead to injuries and burnout.',
          backgroundColor: 'from-orange-600 to-red-600'
        },
        {
          id: 5,
          title: 'Stay Consistent',
          content: 'Consistency beats intensity. Make exercise a daily habit, not a chore.',
          backgroundColor: 'from-red-500 to-pink-600'
        }
      ],
      views: 2780,
      likes: 623
    },
    '7': {
      id: 7,
      title: 'Sleep Better Tonight',
      description: 'Improve your sleep quality with these proven tips',
      category: 'Sleep Health',
      slides: [
        {
          id: 1,
          title: 'Set a Schedule',
          content: 'Go to bed and wake up at the same time daily. Your body loves routine!',
          backgroundColor: 'from-slate-600 to-slate-700'
        },
        {
          id: 2,
          title: 'Create a Sleep Sanctuary',
          content: 'Keep your bedroom cool, dark, and quiet. Invest in a comfortable mattress.',
          backgroundColor: 'from-gray-600 to-gray-700'
        },
        {
          id: 3,
          title: 'Limit Caffeine',
          content: 'Avoid caffeine after 2 PM. It stays in your system for 6-8 hours.',
          backgroundColor: 'from-zinc-600 to-zinc-700'
        },
        {
          id: 4,
          title: 'Wind Down Routine',
          content: 'Create a relaxing bedtime routine. Read, meditate, or take a warm bath.',
          backgroundColor: 'from-neutral-600 to-neutral-700'
        },
        {
          id: 5,
          title: 'No Screens Before Bed',
          content: 'Blue light disrupts sleep. Turn off devices 1 hour before bedtime.',
          backgroundColor: 'from-stone-600 to-stone-700'
        }
      ],
      views: 3120,
      likes: 789
    },
    '8': {
      id: 8,
      title: 'Immunity Boosters',
      description: 'Strengthen your immune system naturally',
      category: 'Immunity',
      slides: [
        {
          id: 1,
          title: 'Vitamin C Rich Foods',
          content: 'Citrus fruits, berries, and bell peppers boost immunity. Eat them daily!',
          backgroundColor: 'from-yellow-500 to-orange-600'
        },
        {
          id: 2,
          title: 'Get Enough Sleep',
          content: 'Sleep is when your body repairs and strengthens. Aim for 7-9 hours nightly.',
          backgroundColor: 'from-orange-500 to-red-600'
        },
        {
          id: 3,
          title: 'Exercise Regularly',
          content: 'Moderate exercise enhances immune function. Just 30 minutes daily helps!',
          backgroundColor: 'from-red-500 to-pink-600'
        },
        {
          id: 4,
          title: 'Manage Stress',
          content: 'Chronic stress weakens immunity. Practice yoga, meditation, or deep breathing.',
          backgroundColor: 'from-pink-500 to-purple-600'
        },
        {
          id: 5,
          title: 'Stay Hydrated',
          content: 'Water helps produce lymph, which carries immune cells. Drink up!',
          backgroundColor: 'from-blue-500 to-cyan-600'
        }
      ],
      views: 2650,
      likes: 534
    },
    '9': {
      id: 9,
      title: 'Women\'s Health Essentials',
      description: 'Important health tips every woman should know',
      category: 'Women\'s Health',
      slides: [
        {
          id: 1,
          title: 'Regular Screenings',
          content: 'Get annual mammograms after 40 and Pap smears every 3 years. Early detection saves lives!',
          backgroundColor: 'from-pink-500 to-rose-600'
        },
        {
          id: 2,
          title: 'Bone Health Matters',
          content: 'Women are at higher risk for osteoporosis. Get enough calcium and vitamin D daily.',
          backgroundColor: 'from-rose-500 to-pink-600'
        },
        {
          id: 3,
          title: 'Heart Health Priority',
          content: 'Heart disease is the #1 killer of women. Monitor blood pressure and cholesterol regularly.',
          backgroundColor: 'from-red-500 to-pink-600'
        },
        {
          id: 4,
          title: 'Reproductive Health',
          content: 'Track your menstrual cycle. Irregular periods can signal health issues. Consult your doctor.',
          backgroundColor: 'from-pink-600 to-purple-600'
        },
        {
          id: 5,
          title: 'Mental Health Care',
          content: 'Women are twice as likely to experience depression. Prioritize self-care and seek help when needed.',
          backgroundColor: 'from-purple-500 to-pink-600'
        }
      ],
      views: 3450,
      likes: 892,
      videoId: 'Ep3OUx2k8bI',
      videoTitle: 'Women\'s Health: Essential Screenings and Prevention'
    }
  }

  const story = stories[storyId as keyof typeof stories]

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <Link href="/web-stories" className="text-blue-400 hover:text-blue-300">
            ← Back to Web Stories
          </Link>
        </div>
      </div>
    )
  }

  const currentSlideData = story.slides[currentSlide]
  const isFirstSlide = currentSlide === 0
  const isLastSlide = currentSlide === story.slides.length - 1

  const nextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Story Container */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '9/16' }}>
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-4">
            {story.slides.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-white transition-all duration-300 ${
                    index < currentSlide ? 'w-full' : index === currentSlide ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-8 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center justify-between">
              <Link href="/web-stories" className="text-white">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className="text-white"
                >
                  <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="text-white"
                >
                  <Bookmark className={`h-6 w-6 ${bookmarked ? 'fill-white' : ''}`} />
                </button>
                <button onClick={handleShare} className="text-white">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundColor} flex flex-col items-center justify-center p-8 text-white`}>
            <div className="text-center space-y-6">
              <div className="text-6xl font-bold mb-4">{currentSlide + 1}</div>
              <h2 className="text-3xl font-bold leading-tight">{currentSlideData.title}</h2>
              <p className="text-xl leading-relaxed opacity-90">{currentSlideData.content}</p>
            </div>
          </div>

          {/* Navigation Areas */}
          <div className="absolute inset-0 flex">
            <button
              onClick={prevSlide}
              disabled={isFirstSlide}
              className="flex-1 cursor-pointer"
              aria-label="Previous slide"
            />
            <button
              onClick={nextSlide}
              disabled={isLastSlide}
              className="flex-1 cursor-pointer"
              aria-label="Next slide"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8">
            <button
              onClick={prevSlide}
              disabled={isFirstSlide}
              className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-opacity ${
                isFirstSlide ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className="text-white text-sm font-medium">
              {currentSlide + 1} / {story.slides.length}
            </div>

            {isLastSlide ? (
              <Link
                href="/web-stories"
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30"
              >
                <ArrowLeft className="h-6 w-6 rotate-180" />
              </Link>
            ) : (
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        {/* Story Info */}
        <div className="mt-4 text-white text-center">
          <h3 className="text-xl font-bold mb-2">{story.title}</h3>
          <p className="text-gray-400 mb-2">{story.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>{story.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{story.likes} likes</span>
          </div>
        </div>

        {/* Educational Video Section (if available) */}
        {story.videoId && (
          <div className="mt-8 bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Play className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-bold text-white">{story.videoTitle || 'Learn More'}</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Watch this educational video to learn more about {story.title.toLowerCase()}.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${story.videoId}`}
                title={story.videoTitle || story.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 p-4 bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-200">
                <strong>Note:</strong> This video is for educational purposes only. Always consult with your healthcare provider for personalized medical advice.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
