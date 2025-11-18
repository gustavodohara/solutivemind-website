import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export const metadata: Metadata = {
  title: 'Contacto - SolutiveMind',
  description:
    '¿Tenés preguntas o querés saber cómo la automatización puede transformar tu negocio? En SolutiveMind estamos para ayudarte.',
}

export default function ContactoPage() {
  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Hablemos de tu negocio</h1>
          <p className="text-muted-foreground text-lg">
            ¿Tenés dudas? ¿Querés saber si podés automatizar algo específico? ¿Necesitás un diagnóstico sin compromiso?
            <br />
            <br />
            Escribinos y te respondemos en menos de 24 horas.
            <br />
            <br />
            <strong>Sin tecnicismos. Sin vueltas. Solo soluciones claras.</strong>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Contanos qué necesitás</CardTitle>
                <CardDescription>
                  Completá el formulario y charlamos. Te mostramos cómo podés automatizar tu negocio sin complicarte.
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
                <CardTitle>Otros medios de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div>
                  <p className="text-muted-foreground text-sm">
                    Email:{' '}
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-primary hover:underline"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div> */}
                <div>
                  <p className="text-muted-foreground text-sm">
                    Teléfono:{' '}
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-primary hover:underline"
                    >
                      {CONTACT_INFO.phone}
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
                <div>
                  <p className="text-muted-foreground text-sm">
                    Ubicación: {CONTACT_INFO.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-muted/50 border-t py-16 md:py-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-3xl border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl sm:text-4xl">
                  Cada conversación puede cambiar tu forma de trabajar
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mt-4 text-lg">
                  No necesitás saberlo todo. Solo dar el primer paso.
                  <br />
                  <br />
                  Escribinos hoy y descubrimos juntos cómo hacer que tu negocio trabaje solo mientras vos te enfocás en crecer.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
