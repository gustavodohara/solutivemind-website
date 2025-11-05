import { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - SolutiveMind',
  description:
    'Conoce más sobre SolutiveMind y nuestro compromiso con la transformación digital empresarial.',
}

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <Hero
        title="Sobre SolutiveMind"
        description="Impulsamos la transformación digital de empresas a través de soluciones de automatización inteligente."
        className="py-16 md:py-20"
      />

      {/* Main Content */}
      <section className="border-t py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Who We Are */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">¿Quiénes somos?</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  SolutiveMind es una empresa especializada en servicios de automatización
                  empresarial. Ayudamos a organizaciones a optimizar sus procesos, reducir costos
                  operativos y aumentar la productividad mediante la implementación de soluciones
                  tecnológicas innovadoras.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nuestro enfoque se centra en entender las necesidades específicas de cada cliente
                  para diseñar e implementar soluciones a medida que generen resultados tangibles y
                  sostenibles en el tiempo.
                </p>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid gap-6 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                    <Target className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transformar empresas mediante automatización inteligente que genere valor real y
                    sostenible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                    <Eye className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser líderes en soluciones de automatización que impulsen la transformación
                    digital empresarial.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                    <Award className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Innovación, excelencia, compromiso con el cliente y resultados medibles.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">¿Qué hacemos?</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ofrecemos servicios completos de automatización empresarial que incluyen:
                </p>
                <ul className="text-muted-foreground space-y-2 text-lg">
                  <li>Análisis y diagnóstico de procesos actuales</li>
                  <li>Diseño de soluciones de automatización personalizadas</li>
                  <li>Implementación de tecnologías de vanguardia</li>
                  <li>Integración con sistemas existentes</li>
                  <li>Capacitación y acompañamiento continuo</li>
                  <li>Soporte y optimización permanente</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-muted/50 space-y-4 rounded-lg border-2 p-8 text-center">
              <h3 className="text-2xl font-bold">¿Listo para comenzar?</h3>
              <p className="text-muted-foreground">
                Descubre cómo podemos ayudarte a transformar tu negocio
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/servicios">Ver Servicios</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
