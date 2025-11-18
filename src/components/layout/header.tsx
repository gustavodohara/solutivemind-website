'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggleSimple } from '@/components/ui/theme-toggle-simple'
import { NAV_ITEMS } from '@/lib/constants/navigation'
import { MobileNav } from './mobile-nav'
import { useActivePath } from '@/lib/hooks/use-active-path'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isActive } = useActivePath()

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full',
      'bg-background/80 backdrop-blur-md',
      'border-b border-white/10',
      'transition-colors duration-200'
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className={cn(
            'text-xl font-bold',
            'bg-gradient-to-r from-primary via-secondary to-primary',
            'bg-clip-text text-transparent',
            'animate-gradient'
          )}>
            SolutiveMind
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-all duration-200',
                'relative after:absolute after:bottom-0 after:left-0',
                'after:h-[2px] after:w-0 after:bg-primary',
                'after:transition-all after:duration-300',
                'hover:after:w-full hover:text-primary',
                isActive(item.href)
                  ? 'text-primary after:w-full'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Theme toggle + Mobile menu */}
        <div className="flex items-center space-x-2">
          <ThemeToggleSimple />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
