import { ReactNode } from 'react'
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
        'relative overflow-hidden',
        'py-20 md:py-32',
        'bg-gradient-to-b from-background via-background/95 to-muted/20',
        className
      )}
    >
      {/* Optional: Add subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {typeof title === 'string' ? (
            <h1 className={cn(
              'text-5xl font-bold tracking-tight',
              'sm:text-6xl md:text-7xl',
              'bg-gradient-to-r from-primary via-secondary to-primary',
              'bg-clip-text text-transparent',
              'animate-gradient',
              'leading-tight'
            )}>
              {title}
            </h1>
          ) : (
            title
          )}

          {typeof description === 'string' ? (
            <p className={cn(
              'text-muted-foreground',
              'text-lg sm:text-xl',
              'leading-relaxed',
              'max-w-2xl mx-auto'
            )}>
              {description}
            </p>
          ) : (
            description
          )}

          {actions && (
            <div className="flex flex-wrap justify-center gap-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
