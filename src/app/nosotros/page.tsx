import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - SolutiveMind',
  description:
    'Impulsamos la transformación digital de las empresas a través de automatización inteligente y soluciones basadas en IA.',
}

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <Hero
        title="🧠 Sobre SolutiveMind"
        description={
          <>
            Impulsamos la transformación digital de las empresas a través de automatización
            inteligente y soluciones basadas en IA.
            <br />
            Ayudamos a que las organizaciones trabajen mejor, más rápido y con mayor enfoque.
          </>
        }
        className="py-16 md:py-20"
      />

      {/* Main Content */}
      <section className="border-t py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Who We Are */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">💡 Quiénes somos</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  En SolutiveMind, creemos que la tecnología tiene que adaptarse a las personas, no
                  al revés.
                  <br />
                  Nos especializamos en automatizar procesos empresariales para que tu equipo gane
                  tiempo, claridad y eficiencia.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Analizamos tus operaciones, diseñamos soluciones a medida y te acompañamos en cada
                  paso del proceso para asegurar resultados reales y sostenibles.
                </p>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transformar empresas mediante la automatización inteligente, generando valor
                    tangible, eficiencia y crecimiento sostenible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🌍 Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser referentes en soluciones de automatización y transformación digital,
                    ayudando a las empresas a evolucionar hacia el futuro con confianza y agilidad.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>💎 Nuestros valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2">
                    <li>🚀 Innovación: siempre un paso adelante.</li>
                    <li>🧩 Excelencia: buscamos resultados medibles y duraderos.</li>
                    <li>🤝 Compromiso: tu éxito es el nuestro.</li>
                    <li>💬 Transparencia: claridad y confianza en cada proyecto.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">⚙️ Qué hacemos</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ofrecemos soluciones completas para cada etapa de tu transformación digital:
                </p>
                <ul className="text-muted-foreground space-y-2 text-lg">
                  <li>Análisis y diagnóstico de procesos.</li>
                  <li>Diseño de soluciones de automatización personalizadas.</li>
                  <li>Implementación con tecnologías de vanguardia.</li>
                  <li>Integración con tus sistemas actuales.</li>
                  <li>Capacitación y acompañamiento continuo.</li>
                  <li>Soporte y optimización permanente.</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-muted/50 space-y-4 rounded-lg border-2 p-8 text-center">
              <h3 className="text-2xl font-bold">🚀 ¿Listo para dar el siguiente paso?</h3>
              <p className="text-muted-foreground">
                Descubrí cómo la automatización puede transformar tu forma de trabajar.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/servicios">Ver Servicios</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">💬 Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
