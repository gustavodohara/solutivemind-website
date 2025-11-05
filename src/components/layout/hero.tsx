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
        'relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 md:py-28',
        className
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {typeof title === 'string' ? (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
          ) : (
            title
          )}

          {typeof description === 'string' ? (
            <p className="text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          ) : (
            description
          )}

          {actions && <div className="flex flex-wrap justify-center gap-4">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
