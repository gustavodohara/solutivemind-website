'use client'

import { cn } from '@/lib/utils'

export interface VideoPlayerProps {
  videoId: string          // YouTube video ID
  poster?: string          // Imagen poster opcional
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  className?: string
  title?: string
}

export function VideoPlayer({
  videoId,
  poster,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  className,
  title = 'Video',
}: VideoPlayerProps) {
  // Construir URL de YouTube embed
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    loop: loop ? '1' : '0',
    controls: controls ? '1' : '0',
    playlist: loop ? videoId : '', // Required for loop
  })

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden rounded-lg', className)}>
      {poster && !autoplay && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }} />
      )}
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
