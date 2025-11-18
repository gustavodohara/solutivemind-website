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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo - larger and bolder */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
            SolutiveMind
          </span>
        </Link>

        {/* Desktop Navigation - improved spacing and hover */}
        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-base font-medium transition-all duration-200 hover:text-primary relative',
                isActive(item.href)
                  ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                  : 'text-foreground/70 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Theme toggle + Mobile menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggleSimple />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
