import { Hero } from '@/components/home/Hero'
import { FeaturedServices } from '@/components/home/FeaturedServices'
import { HealthMetrics } from '@/components/home/HealthMetrics'
import { EmergencyAccess } from '@/components/home/EmergencyAccess'
import { AIAssistant } from '@/components/home/AIAssistant'
import { CommunityHealth } from '@/components/home/CommunityHealth'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <EmergencyAccess />
      <FeaturedServices />
      <AIAssistant />
      <HealthMetrics />
      <CommunityHealth />
    </div>
  )
}