import { Metadata } from 'next'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export const metadata: Metadata = {
  title: 'Contacto - SolutiveMind',
  description: 'Contáctanos para más información sobre nuestros servicios de automatización',
}

export default function ContactoPage() {
  return (
    <div className="container px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Contáctanos</h1>
          <p className="text-lg text-muted-foreground">
            ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te
            responderemos lo antes posible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Email */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Email</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Teléfono</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">WhatsApp</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Enviar mensaje
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Ubicación</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {CONTACT_INFO.address}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
