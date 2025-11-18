import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO, NAV_ITEMS } from '@/lib/constants/navigation'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn(
      'border-t border-white/10',
      'bg-background/50 backdrop-blur-sm',
      'py-12 md:py-16'
    )}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {item.label}
                </Link>
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
