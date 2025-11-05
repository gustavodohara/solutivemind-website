import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
    <section className="py-16 md:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && <p className="text-muted-foreground text-lg">{description}</p>}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  )
}
