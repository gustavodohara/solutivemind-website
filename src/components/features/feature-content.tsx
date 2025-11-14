import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { Feature } from './tabbed-carousel'

export interface FeatureContentProps {
  feature: Feature
}

export function FeatureContent({ feature }: FeatureContentProps) {
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">{feature.title}</CardTitle>
        <CardDescription className="text-base">{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {typeof feature.content === 'string' ? (
          <p className="text-muted-foreground">{feature.content}</p>
        ) : (
          feature.content
        )}
      </CardContent>
    </Card>
  )
}
