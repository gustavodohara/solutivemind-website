import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { VideoPlayer } from '@/components/media/video-player'

export interface HeroProps {
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  backgroundVideo?: string  // YouTube video ID
  backgroundImage?: string
  overlay?: boolean
  className?: string
}

export function Hero({
  title,
  description,
  actions,
  backgroundVideo,
  backgroundImage,
  overlay = true,
  className,
}: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      {/* Background Video (YouTube) */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <VideoPlayer
            videoId={backgroundVideo}
            autoplay
            muted
            loop
            controls={false}
            className="h-full w-full"
          />
          {overlay && <div className="absolute inset-0 bg-background/80" />}
        </div>
      )}

      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {overlay && <div className="absolute inset-0 bg-background/80" />}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {typeof title === 'string' ? (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <p className="text-muted-foreground text-lg sm:text-xl">{description}</p>
          ) : (
            description
          )}
          {actions && (
            <div className="flex flex-wrap justify-center gap-6 pt-4">{actions}</div>
          )}
        </div>
      </div>
    </section>
  )
}
