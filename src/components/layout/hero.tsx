import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  id?: string
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  className?: string
}

export function Hero({ id, title, description, actions, className }: HeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'from-muted/50 to-background relative overflow-hidden bg-gradient-to-b py-20 md:py-32 lg:py-40',
        className
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {typeof title === 'string' ? (
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">{title}</h1>
          ) : (
            title
          )}

          {typeof description === 'string' ? (
            <p className="text-muted-foreground text-lg sm:text-xl">{description}</p>
          ) : (
            description
          )}

          {actions && <div className="flex flex-wrap justify-center gap-4">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
