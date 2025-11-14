import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TabbedCarousel, type Feature as TabbedFeature } from '@/components/features/tabbed-carousel'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
  displayMode?: 'grid' | 'tabs'  // 'carousel' removido por simplicidad
  columns?: 2 | 3 | 4
  className?: string
}

export function FeaturesSection({
  title,
  description,
  features,
  displayMode = 'grid',
  columns = 3,
  className,
}: FeaturesSectionProps) {
  const columnClasses = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Convertir features a formato TabbedCarousel si es necesario
  const tabbedFeatures: TabbedFeature[] = features.map((feature, index) => ({
    id: `feature-${index}`,
    title: feature.title,
    description: feature.description,
    content: '', // Puede ser vacío para tabs simples
    icon: feature.icon,
  }))

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && <p className="text-muted-foreground text-lg">{description}</p>}
          </div>
        )}

        {/* Content */}
        {displayMode === 'grid' ? (
          <div className={cn('grid gap-6', columnClasses[columns])}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <TabbedCarousel features={tabbedFeatures} />
        )}
      </div>
    </section>
  )
}
