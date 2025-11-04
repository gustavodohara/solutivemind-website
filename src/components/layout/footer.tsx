import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO, NAV_ITEMS } from '@/lib/constants/navigation'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SolutiveMind</h3>
            <p className="text-sm text-muted-foreground">
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
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
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
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} SolutiveMind. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
