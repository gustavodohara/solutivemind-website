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
        'relative overflow-hidden bg-gradient-to-br from-purple-300 via-purple-200 to-pink-200 dark:from-purple-900 dark:via-purple-800 dark:to-pink-900 py-24 md:py-32 lg:py-48',
        className
      )}
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.1) 100px,
              rgba(255, 255, 255, 0.1) 200px
            )`
          }}
        />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {typeof title === 'string' ? (
            <h1 className="text-5xl font-light tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
          ) : (
            <h1 className="text-5xl font-light tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
          )}

          {typeof description === 'string' ? (
            <p className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          ) : (
            <div className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {description}
            </div>
          )}

          {actions && <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
