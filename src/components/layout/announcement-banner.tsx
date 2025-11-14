'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AnnouncementBannerProps {
  message: string | React.ReactNode
  ctaText?: string
  ctaLink?: string
  dismissible?: boolean
  variant?: 'info' | 'success' | 'warning'
  storageKey?: string
}

export function AnnouncementBanner({
  message,
  ctaText,
  ctaLink,
  dismissible = true,
  variant = 'info',
  storageKey = 'announcement-dismissed',
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(storageKey)
  })

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem(storageKey, 'true')
  }

  if (!isVisible) return null

  const variantClasses = {
    info: 'bg-primary/10 text-primary-foreground border-primary/20',
    success: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20',
  }

  return (
    <div className={cn('border-b px-4 py-2', variantClasses[variant])}>
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <p className="text-sm font-medium">{message}</p>
          {ctaText && ctaLink && (
            <Link href={ctaLink} className="text-sm underline hover:no-underline whitespace-nowrap">
              {ctaText}
            </Link>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDismiss}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
