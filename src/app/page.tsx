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
    title: 'Automatización Inteligente',
    description:
      'Implementamos soluciones que automatizan tareas repetitivas, liberando tiempo para actividades estratégicas.',
  },
  {
    icon: TrendingUp,
    title: 'Optimización de Procesos',
    description:
      'Analizamos y mejoramos tus procesos actuales para maximizar eficiencia y resultados.',
  },
  {
    icon: Shield,
    title: 'Soluciones Confiables',
    description:
      'Tecnología robusta y probada que garantiza continuidad y seguridad en tus operaciones.',
  },
  {
    icon: Clock,
    title: 'Ahorro de Tiempo',
    description: 'Reduce drásticamente el tiempo dedicado a tareas manuales y repetitivas.',
  },
  {
    icon: Users,
    title: 'Soporte Continuo',
    description: 'Acompañamiento permanente para asegurar el éxito de tu transformación digital.',
  },
  {
    icon: Sparkles,
    title: 'Innovación Constante',
    description: 'Utilizamos las últimas tecnologías para mantener tu negocio a la vanguardia.',
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
        description="Optimiza procesos, reduce costos y aumenta la productividad de tu empresa con nuestras soluciones de automatización a medida."
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
        title="¿Por qué elegirnos?"
        description="Soluciones completas de automatización diseñadas para impulsar tu negocio"
        features={features}
      />

      {/* CTA Section */}
      <section className="bg-muted/50 border-t py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-3xl border-2">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 w-fit">Comenzá Hoy</Badge>
              <CardTitle className="text-3xl sm:text-4xl">
                ¿Listo para optimizar tu negocio?
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Contáctanos para una consulta gratuita y descubre cómo la automatización puede
                transformar tu empresa.
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
