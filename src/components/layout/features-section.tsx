import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
}

export function FeaturesSection({ title, description, features }: FeaturesSectionProps) {
  return (
    <>
      {(title || description) && (
        <div className="text-center mb-16">
          {title && <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">{title}</h2>}
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
        </div>
      )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={cn('group', 'hover:scale-[1.02]', 'transition-all duration-300')}
              >
                <CardHeader>
                  <div
                    className={cn(
                      'mb-4 flex h-12 w-12 items-center justify-center',
                      'rounded-lg bg-primary/10',
                      'text-primary',
                      'group-hover:bg-primary/20',
                      'transition-colors duration-300'
                    )}
                  >
                    <Icon className="h-6 w-6" />
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
    </>
  )
}
