import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center space-y-4">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            Contáctanos
          </h2>
          <p className="text-muted-foreground text-lg">
            ¿Tenés preguntas o querés saber cómo la automatización puede transformar tu negocio?
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>
                  Completá el formulario y un especialista de nuestro equipo se pondrá en contacto
                  con vos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Otros medios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Email:{' '}
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-primary hover:underline"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    WhatsApp:{' '}
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Enviar mensaje
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
