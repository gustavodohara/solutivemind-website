import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-[80px] w-full rounded-md',
        'border border-input/30',
        'bg-background/50 backdrop-blur-sm',
        'px-3 py-2',
        'text-sm text-foreground',
        'placeholder:text-muted-foreground',
        'shadow-xs transition-all duration-200 outline-none',
        'focus-visible:border-primary',
        'focus-visible:ring-2 focus-visible:ring-primary/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
