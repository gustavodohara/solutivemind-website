import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Feature } from './tabbed-carousel'

export interface FeatureTabProps {
  feature: Feature
  isActive: boolean
  onClick: () => void
}

export function FeatureTab({ feature, isActive, onClick }: FeatureTabProps) {
  const Icon = feature.icon

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="lg"
      onClick={onClick}
      className={cn(
        'gap-2 transition-all',
        isActive && 'shadow-md'
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {feature.title}
    </Button>
  )
}
