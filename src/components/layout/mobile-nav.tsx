'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/lib/constants/navigation'

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] backdrop-blur-md">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold">Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="text-xl font-medium transition-all duration-200 hover:text-primary hover:translate-x-2 py-4 px-2 rounded-lg hover:bg-muted/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
