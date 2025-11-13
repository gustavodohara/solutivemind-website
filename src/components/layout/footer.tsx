'use client'

import { useEffect, useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/navigation'
import { SCROLL_SECTIONS } from '@/lib/constants/scroll-navigation'

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SolutiveMind</h3>
            <p className="text-muted-foreground text-sm">
              Servicios automatizados para impulsar tu negocio con tecnología de vanguardia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              {SCROLL_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(section.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="text-muted-foreground flex flex-col space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>© {currentYear} SolutiveMind. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
