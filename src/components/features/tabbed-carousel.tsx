'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FeatureTab } from './feature-tab'
import { FeatureContent } from './feature-content'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  id: string
  title: string
  description: string
  content: React.ReactNode | string
  icon?: LucideIcon
}

export interface TabbedCarouselProps {
  features: Feature[]
  defaultTab?: string
  className?: string
}

export function TabbedCarousel({
  features,
  defaultTab,
  className,
}: TabbedCarouselProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || features[0]?.id)

  const activeFeature = features.find((f) => f.id === activeTab)

  return (
    <div className={cn('space-y-8', className)}>
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {features.map((feature) => (
          <FeatureTab
            key={feature.id}
            feature={feature}
            isActive={activeTab === feature.id}
            onClick={() => setActiveTab(feature.id)}
          />
        ))}
      </div>

      {/* Content Display */}
      {activeFeature && <FeatureContent feature={activeFeature} />}
    </div>
  )
}
