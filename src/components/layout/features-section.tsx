'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  MessageCircle,
  Brain,
  Unlock,
  LucideIcon
} from 'lucide-react'
import { Card } from '@/components/ui/card'

// Verify motion.div is available
if (!motion || !motion.div) {
  console.error('framer-motion motion.div is not available. Check your framer-motion installation.')
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'zap': Zap,
  'shield': Shield,
  'trending-up': TrendingUp,
  'clock': Clock,
  'users': Users,
  'sparkles': Sparkles,
  'message-circle': MessageCircle,
  'brain': Brain,
  'unlock': Unlock,
}

interface Feature {
  iconName: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
}

export function FeaturesSection({ title, description, features }: FeaturesSectionProps) {
  return (
    <section className="section-spacing">
      <div className="section-container">
        {/* Section header */}
        {(title || description) && (
          <div className="content-max-width space-y-4 text-center mb-16">
            {title && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground text-xl">{description}</p>
            )}
          </div>
        )}

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.iconName]
            const MotionWrapper = (motion && typeof motion.div !== 'undefined') ? motion.div : 'div'
            const motionProps = (motion && typeof motion.div !== 'undefined') ? {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.5, delay: index * 0.1 }
            } : {}
            
            return (
              <MotionWrapper
                key={index}
                {...motionProps}
              >
                <Card className="h-full p-8 md:p-10 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-border/50">
                  {/* Large icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      {Icon && <Icon className="text-primary h-7 w-7" />}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </MotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
