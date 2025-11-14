'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Partner {
  name: string
  src: string
  alt: string
  url?: string
}

export interface LogoCarouselProps {
  logos: Partner[]
  autoplay?: boolean
  speed?: number
  className?: string
}

export function LogoCarousel({
  logos,
  autoplay = true,
  speed = 3000,
  className,
}: LogoCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    autoplay ? [Autoplay({ delay: speed, stopOnInteraction: false })] : []
  )

  return (
    <div className={cn('overflow-hidden', className)} ref={emblaRef}>
      <div className="flex gap-8">
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-[0_0_auto] flex items-center justify-center px-4"
            style={{ minWidth: '150px' }}
          >
            {logo.url ? (
              <Link href={logo.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </Link>
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="grayscale opacity-50"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
