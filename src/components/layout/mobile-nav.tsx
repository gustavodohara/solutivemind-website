'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/lib/constants/navigation'
import { SCROLL_SECTIONS } from '@/lib/constants/scroll-navigation'

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col space-y-4">
          {SCROLL_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={section.href}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(section.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
                onOpenChange(false)
              }}
              className="hover:text-primary text-lg font-medium transition-colors"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
