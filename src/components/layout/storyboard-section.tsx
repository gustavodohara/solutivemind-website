import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface StoryboardSectionProps {
  title: string
  description: string
  backgroundImage: string
  alignment?: 'left' | 'center' | 'right'
  actions?: React.ReactNode
  overlay?: boolean
  className?: string
}

export function StoryboardSection({
  title,
  description,
  backgroundImage,
  alignment = 'center',
  actions,
  overlay = true,
  className,
}: StoryboardSectionProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <section className={cn('relative overflow-hidden py-24 md:py-32', className)}>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover z-0"
        priority={false}
      />

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-background/80 z-0" />}

      {/* Content */}
      <div className="container relative z-10">
        <div className={cn('mx-auto max-w-3xl space-y-6 flex flex-col', alignmentClasses[alignment])}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
          <p className="text-muted-foreground text-lg sm:text-xl">{description}</p>
          {actions && <div className="pt-4">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
