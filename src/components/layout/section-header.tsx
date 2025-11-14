import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface SectionHeaderProps {
  title: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
  badge?: string
  className?: string
}

export function SectionHeader({
  title,
  description,
  alignment = 'center',
  badge,
  className,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className={cn('max-w-3xl space-y-4', alignmentClasses[alignment], className)}>
      {badge && (
        <div className={cn('flex', alignment === 'center' && 'justify-center', alignment === 'right' && 'justify-end')}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg">{description}</p>
      )}
    </div>
  )
}
