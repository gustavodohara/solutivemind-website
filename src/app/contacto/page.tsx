import { Metadata } from 'next'
import { Hero } from '@/components/layout/hero'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export const metadata: Metadata = {
  title: 'Contacto | SolutiveMind',
  description: 'Contactá con SolutiveMind para una consulta gratuita',
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero mejorado */}
      <Hero
        title="Hablemos de tu Proyecto"
        description="Estamos listos para ayudarte a automatizar y optimizar tu negocio"
        backgroundImage="/images/hero/contact-hero.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Información de Contacto</h2>
                <p className="text-muted-foreground mt-4">
                  Completá el formulario o contactanos directamente por estos medios.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ubicación</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (mantener actual) */}
            <div className="bg-card rounded-lg border-2 p-8">
              <h2 className="mb-6 text-2xl font-bold">Envianos tu Consulta</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
