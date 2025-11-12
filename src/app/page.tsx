import { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Clock, Users, Sparkles } from 'lucide-react'
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
    icon: Zap,
    title: '⚙️ Automatización Inteligente',
    description:
      'Eliminamos tareas repetitivas para que tu equipo pueda enfocarse en la estrategia y el crecimiento.',
  },
  {
    icon: TrendingUp,
    title: '🔍 Optimización de Procesos',
    description:
      'Analizamos, simplificamos y potenciamos tus flujos de trabajo para lograr resultados medibles.',
  },
  {
    icon: Shield,
    title: '🔒 Soluciones Confiables',
    description:
      'Tecnología robusta y segura, con resultados probados y soporte experto en cada paso.',
  },
  {
    icon: Clock,
    title: '⏱️ Ahorro de Tiempo',
    description: 'Automatizá hasta el 80 % de tus tareas rutinarias y liberá recursos para innovar.',
  },
  {
    icon: Users,
    title: '🤝 Soporte Continuo',
    description: 'Te acompañamos antes, durante y después de la implementación.',
  },
  {
    icon: Sparkles,
    title: '🚀 Innovación Constante',
    description: 'Actualizamos nuestras soluciones con las últimas tecnologías en IA y automatización.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={
          <>
            🧠 Transforma tu negocio con{' '}
            <span className="text-primary">automatización inteligente</span>
          </>
        }
        description={
          <>
            Impulsá tu empresa con soluciones basadas en IA que optimizan procesos, reducen costos y
            aumentan la productividad.
            <br />
            <br />
            🔹 Menos tareas manuales.
            <br />
            🔹 Más enfoque en lo que realmente importa.
            <br />
            <br />
            👉 Descubrí cómo →{' '}
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
              <Link href="/contacto">Contactar</Link>
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <FeaturesSection
        title="💼 ¿Por qué elegir SolutiveMind :)?"
        description="Soluciones completas de automatización diseñadas para llevar tu negocio al siguiente nivel."
        features={features}
      />

      {/* CTA Section */}
      <section className="bg-muted/50 border-t py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-3xl border-2">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 w-fit">Comenzá Hoy</Badge>
              <CardTitle className="text-3xl sm:text-4xl">
                🚀 Empezá hoy tu transformación digital
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Cada proceso optimizado es un paso hacia un negocio más rentable.
                <br />
                💬 Agenda una consulta gratuita y descubrí cómo la automatización puede cambiar tu
                forma de trabajar.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contacto">Solicitar Consulta</Link>
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
