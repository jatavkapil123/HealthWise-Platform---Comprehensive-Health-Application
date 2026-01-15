'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dumbbell, Heart, Clock, TrendingUp, Play, BookOpen } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  category: 'yoga' | 'aerobics' | 'strength' | 'cardio';
  image: string;
  duration: string;
  calories: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  steps: string[];
}

const exercises: Exercise[] = [
  // Yoga Poses
  {
    id: 'yoga-1',
    name: 'Mountain Pose (Tadasana)',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    duration: '5-10 min',
    calories: '20-30 kcal',
    difficulty: 'Beginner',
    description: 'Foundation pose that improves posture and balance',
    steps: [
      'Stand with feet together, arms at sides',
      'Distribute weight evenly across both feet',
      'Engage thigh muscles and lift kneecaps',
      'Draw shoulders back and down',
      'Breathe deeply for 5-10 breaths'
    ]
  },
  {
    id: 'yoga-2',
    name: 'Downward Dog (Adho Mukha Svanasana)',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    duration: '5-10 min',
    calories: '30-40 kcal',
    difficulty: 'Beginner',
    description: 'Full body stretch that energizes and strengthens',
    steps: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Straighten legs, press heels toward floor',
      'Spread fingers wide, press palms down',
      'Hold for 5-10 breaths'
    ]
  },
  {
    id: 'yoga-3',
    name: 'Warrior II (Virabhadrasana II)',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    duration: '10-15 min',
    calories: '40-50 kcal',
    difficulty: 'Intermediate',
    description: 'Strengthens legs and opens hips and chest',
    steps: [
      'Stand with feet wide apart',
      'Turn right foot out 90 degrees',
      'Bend right knee over ankle',
      'Extend arms parallel to floor',
      'Gaze over right hand, hold 5 breaths'
    ]
  },
  {
    id: 'yoga-4',
    name: 'Tree Pose (Vrksasana)',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800',
    duration: '5-10 min',
    calories: '25-35 kcal',
    difficulty: 'Intermediate',
    description: 'Improves balance and strengthens legs',
    steps: [
      'Stand on left leg',
      'Place right foot on inner left thigh',
      'Bring hands to prayer position',
      'Focus on a fixed point',
      'Hold for 30 seconds, switch sides'
    ]
  },
  // Aerobics
  {
    id: 'aerobic-1',
    name: 'Jumping Jacks',
    category: 'aerobics',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    duration: '10-15 min',
    calories: '100-150 kcal',
    difficulty: 'Beginner',
    description: 'Full body cardio exercise that increases heart rate',
    steps: [
      'Stand with feet together, arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump back to starting position',
      'Maintain steady rhythm',
      'Repeat for 30-60 seconds'
    ]
  },
  {
    id: 'aerobic-2',
    name: 'High Knees',
    category: 'aerobics',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    duration: '10-15 min',
    calories: '120-180 kcal',
    difficulty: 'Intermediate',
    description: 'Cardio exercise that strengthens legs and core',
    steps: [
      'Stand with feet hip-width apart',
      'Lift right knee to chest',
      'Quickly switch to left knee',
      'Pump arms as you run in place',
      'Continue for 30-60 seconds'
    ]
  },
  {
    id: 'aerobic-3',
    name: 'Burpees',
    category: 'aerobics',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    duration: '15-20 min',
    calories: '200-300 kcal',
    difficulty: 'Advanced',
    description: 'Full body exercise combining strength and cardio',
    steps: [
      'Start in standing position',
      'Drop into squat, place hands on floor',
      'Jump feet back to plank position',
      'Do a push-up',
      'Jump feet forward, explode up'
    ]
  },
  {
    id: 'aerobic-4',
    name: 'Mountain Climbers',
    category: 'aerobics',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    duration: '10-15 min',
    calories: '150-200 kcal',
    difficulty: 'Intermediate',
    description: 'Dynamic exercise that works entire body',
    steps: [
      'Start in plank position',
      'Bring right knee toward chest',
      'Quickly switch legs',
      'Keep core engaged',
      'Continue alternating for 30-60 seconds'
    ]
  },
  // Strength Training
  {
    id: 'strength-1',
    name: 'Push-ups',
    category: 'strength',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800',
    duration: '10-15 min',
    calories: '80-120 kcal',
    difficulty: 'Beginner',
    description: 'Upper body strength exercise',
    steps: [
      'Start in plank position',
      'Lower body until chest nearly touches floor',
      'Keep elbows close to body',
      'Push back up to starting position',
      'Repeat 10-15 times'
    ]
  },
  {
    id: 'strength-2',
    name: 'Squats',
    category: 'strength',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
    duration: '10-15 min',
    calories: '100-150 kcal',
    difficulty: 'Beginner',
    description: 'Lower body strength exercise',
    steps: [
      'Stand with feet shoulder-width apart',
      'Lower body as if sitting in chair',
      'Keep knees behind toes',
      'Push through heels to stand',
      'Repeat 15-20 times'
    ]
  },
  {
    id: 'strength-3',
    name: 'Plank',
    category: 'strength',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    duration: '5-10 min',
    calories: '50-80 kcal',
    difficulty: 'Intermediate',
    description: 'Core strengthening exercise',
    steps: [
      'Start in forearm plank position',
      'Keep body in straight line',
      'Engage core muscles',
      'Hold position without sagging',
      'Hold for 30-60 seconds'
    ]
  },
  {
    id: 'strength-4',
    name: 'Lunges',
    category: 'strength',
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800',
    duration: '10-15 min',
    calories: '90-130 kcal',
    difficulty: 'Beginner',
    description: 'Leg and glute strengthening exercise',
    steps: [
      'Stand with feet hip-width apart',
      'Step forward with right leg',
      'Lower until both knees at 90 degrees',
      'Push back to starting position',
      'Alternate legs for 10-15 reps each'
    ]
  }
];

export default function ExerciseYogaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const categories = [
    { id: 'all', name: 'All Exercises', icon: Dumbbell },
    { id: 'yoga', name: 'Yoga', icon: Heart },
    { id: 'aerobics', name: 'Aerobics', icon: TrendingUp },
    { id: 'strength', name: 'Strength', icon: Dumbbell }
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exercise & Yoga</h1>
          <p className="text-xl text-blue-100">
            Transform your health with guided exercises and yoga poses
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="relative h-48">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exercise.difficulty === 'Beginner' ? 'bg-green-500' :
                    exercise.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } text-white`}>
                    {exercise.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {exercise.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {exercise.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {exercise.calories}
                  </div>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  View Steps
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <Image
                src={selectedExercise.image}
                alt={selectedExercise.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedExercise.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedExercise.description}
              </p>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>{selectedExercise.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>{selectedExercise.calories}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedExercise.difficulty === 'Beginner' ? 'bg-green-500' :
                  selectedExercise.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                  'bg-red-500'
                } text-white`}>
                  {selectedExercise.difficulty}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3">
                  {selectedExercise.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
