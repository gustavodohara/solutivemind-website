import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CONTACT_INFO } from '@/lib/constants/navigation'
import { MessageCircle } from 'lucide-react'

// Instagram SVG icon (lucide's Instagram is deprecated)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

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

        {/* Contact Info Cards */}
        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
          {/* WhatsApp */}
          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                La forma más rápida de contactarnos
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-medium text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar mensaje
              </a>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10">
                <InstagramIcon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-2xl">Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Seguinos para ver casos de éxito y tips
              </p>
              <a
                href="https://www.instagram.com/solutive.mind/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-medium text-white transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
                Seguir en Instagram
              </a>
            </CardContent>
          </Card>
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
                <p className="text-muted-foreground mt-4 text-lg">
                  No necesitás saberlo todo. Solo dar el primer paso.
                  <br />
                  <br />
                  Escribinos hoy y descubrimos juntos cómo hacer que tu negocio trabaje solo mientras vos te enfocás en crecer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
