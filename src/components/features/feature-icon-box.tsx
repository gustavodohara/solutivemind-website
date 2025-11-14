import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface FeatureIconBoxProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
  iconBackground?: string
  variant?: 'default' | 'minimal' | 'bordered'
  className?: string
}

export function FeatureIconBox({
  icon: Icon,
  title,
  description,
  iconColor = 'text-primary',
  iconBackground = 'bg-primary/10',
  variant = 'default',
  className,
}: FeatureIconBoxProps) {
  const variantClasses = {
    default: 'bg-card border',
    minimal: 'bg-transparent',
    bordered: 'bg-card border-2',
  }

  return (
    <div className={cn('rounded-lg p-6 space-y-4', variantClasses[variant], className)}>
      <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-lg', iconBackground)}>
        <Icon className={cn('h-6 w-6', iconColor)} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
