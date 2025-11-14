'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  className?: string
}

export function Hero({ title, description, actions, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-24 md:py-40',
        'bg-gradient-to-b from-muted/30 via-background to-background',
        className
      )}
    >
      <div className="section-container">
        <div className="content-max-width space-y-8 text-center">
          {/* Title with fade-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {typeof title === 'string' ? (
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {title}
              </h1>
            ) : (
              title
            )}
          </motion.div>

          {/* Description with slight delay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            {typeof description === 'string' ? (
              <p className="text-muted-foreground text-xl sm:text-2xl md:text-3xl font-light leading-relaxed">
                {description}
              </p>
            ) : (
              description
            )}
          </motion.div>

          {/* Actions with more delay */}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>

      {/* Optional: Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
    </section>
  )
}
