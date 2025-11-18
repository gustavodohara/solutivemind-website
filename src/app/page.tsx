import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { FeaturesSection } from '@/components/layout/features-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'SolutiveMind - Servicios de Automatización Empresarial',
  description:
    'Transformamos tu negocio con soluciones de automatización inteligente. Optimiza procesos, reduce costos y aumenta la productividad.',
  keywords: [
    'automatización',
    'servicios empresariales',
    'transformación digital',
    'optimización de procesos',
  ],
}

const features = [
  {
    iconName: 'message-circle' as const,
    title: 'Lenguaje Claro, Sin Vueltas',
    description:
      'Te explicamos todo como si se lo contaras a un amigo. Nada de palabras raras ni tecnicismos que te confundan.',
  },
  {
    iconName: 'brain' as const,
    title: 'Alivio Mental Real',
    description:
      'No se trata solo de ahorrar tiempo. Es liberar tu cabeza de tareas repetitivas para que puedas pensar en grande.',
  },
  {
    iconName: 'zap' as const,
    title: 'Implementación Rápida',
    description: 'Sistemas listos en semanas, no meses. Para que veas resultados sin esperar eternamente.',
  },
  {
    iconName: 'unlock' as const,
    title: 'Sin Ataduras',
    description: 'Empezá cuando quieras, crecé a tu ritmo. Sin contratos eternos ni compromisos que te aten.',
  },
  {
    iconName: 'users' as const,
    title: 'Acompañamiento Personalizado',
    description: 'Te escuchamos antes de programar. Y seguimos ahí después de entregar. Siempre.',
  },
  {
    iconName: 'trending-up' as const,
    title: 'Resultados Medibles',
    description:
      'Menos errores, más control, y procesos que funcionan mientras vos te ocupás de lo importante.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={
          <>
            Transforma tu negocio con{' '}
            <span className="text-primary">automatización inteligente</span>
          </>
        }
        description={
          <>
            ¿Te imaginás que tu negocio trabaje solo mientras vos te enfocás en crecer?
            <br />
            <br />
            <span className="max-w-[90%] mx-auto block">
              Dejá de perder tiempo en tareas repetitivas. Automatizamos procesos para que tu equipo gane claridad, tiempo y energía mental.
            </span>
            <br />
            <br />
            <strong>Sin tecnicismos. Sin complicaciones. Solo resultados.</strong>
            <br />
            <br />
            Descubrí cómo →{' '}
            <Link href="/servicios" className="text-primary underline hover:text-primary/80">
              Ver Servicios
            </Link>
          </>
        }
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/servicios">Ver Servicios</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contacto">Hablemos de tu caso</Link>
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <FeaturesSection
        title="¿Por qué elegir SolutiveMind?"
        description="Automatización accesible, rápida y comprensible. Te lo explicamos de forma simple y adaptado a lo que realmente necesitás."
        features={features}
      />

      {/* CTA Section */}
      <section className="bg-muted/50 border-t py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-3xl border-2">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 w-fit">Diagnóstico Gratuito</Badge>
              <CardTitle className="text-3xl sm:text-4xl">
                ¿Listo para que tu negocio trabaje solo?
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Cada tarea que automatizás es tiempo que ganás. Y tiempo es lo que necesitás para crecer sin saturarte.
                <br />
                <br />
                Agendá un diagnóstico gratuito y te mostramos qué podés automatizar en tu negocio ahora mismo.
                <br />
                <br />
                <strong>No necesitás ser técnico. Solo dar el primer paso.</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contacto">Agendá tu Diagnóstico</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/nosotros">Conocer Más</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
