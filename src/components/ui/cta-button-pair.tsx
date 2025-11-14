import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CTAButtonPairProps {
  primaryText: string
  primaryHref: string
  secondaryText: string
  secondaryHref: string
  size?: 'default' | 'lg' | 'xl' | '2xl'
  fullWidth?: boolean
  className?: string
}

export function CTAButtonPair({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  size = 'lg',
  fullWidth = false,
  className,
}: CTAButtonPairProps) {
  return (
    <div className={cn('flex flex-wrap gap-4', fullWidth && 'w-full', className)}>
      <Button asChild size={size} className={fullWidth ? 'flex-1' : ''}>
        <Link href={primaryHref}>{primaryText}</Link>
      </Button>
      <Button asChild variant="outline" size={size} className={fullWidth ? 'flex-1' : ''}>
        <Link href={secondaryHref}>{secondaryText}</Link>
      </Button>
    </div>
  )
}
