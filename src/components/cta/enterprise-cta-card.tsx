import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EnterpriseCTACardProps {
  title: string
  description: string
  features?: string[]
  ctaText: string
  ctaLink: string
  variant?: 'default' | 'bordered' | 'elevated'
  className?: string
}

export function EnterpriseCTACard({
  title,
  description,
  features,
  ctaText,
  ctaLink,
  variant = 'bordered',
  className,
}: EnterpriseCTACardProps) {
  return (
    <Card variant={variant} className={cn('mx-auto max-w-3xl', className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center">
          <Button size="xl" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
