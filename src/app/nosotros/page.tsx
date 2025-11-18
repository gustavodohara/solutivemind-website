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
        title="Hacemos que la tecnología sea simple"
        description={
          <>
            En SolutiveMind creemos que la tecnología tiene que adaptarse a las personas, no al revés.
            <br />
            <br />
            Automatizamos procesos para que tu equipo gane tiempo, claridad y energía mental. Sin tecnicismos, sin estrés, sin depender de expertos.
            <br />
            <br />
            <strong>Solo soluciones que funcionan.</strong>
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
              <h2 className="text-3xl font-bold tracking-tight">Quiénes somos</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Somos un equipo que cree que las personas talentosas deberían enfocarse en lo que realmente importa, no en tareas que la tecnología puede automatizar.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Creemos que automatizar no es "volverse técnico". Es hacer que tu negocio trabaje por vos.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Por eso diseñamos soluciones accesibles, rápidas y comprensibles. Te explicamos todo en lenguaje humano, sin palabras raras. Y te acompañamos en cada paso hasta que veas los resultados.
                </p>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Propósito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acercar software de calidad a todo el mundo, simplificando los procesos tecnológicos y haciendo que las herramientas digitales sean comprensibles y útiles para cualquier persona.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser la opción más accesible y confiable en automatización de procesos para PyMEs y emprendedores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nuestros valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2">
                    <li><strong>Claridad y cercanía:</strong> Te explicamos fácil, te escuchamos de verdad.</li>
                    <li><strong>Accesibilidad tecnológica:</strong> Software de calidad sin presupuestos imposibles.</li>
                    <li><strong>Agilidad y compromiso:</strong> Resultados rápidos y acompañamiento real.</li>
                    <li><strong>Educación y acompañamiento:</strong> No te dejamos solo. Te enseñamos a usar lo que implementamos.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Qué hacemos</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Te acompañamos en cada etapa para que tu negocio funcione mejor:
                </p>
                <ul className="text-muted-foreground space-y-2 text-lg">
                  <li><strong>Escuchamos primero:</strong> Entendemos tu negocio y detectamos qué te está frenando</li>
                  <li><strong>Diseñamos a tu medida:</strong> Soluciones personalizadas, no paquetes genéricos</li>
                  <li><strong>Implementamos rápido:</strong> Sistemas funcionando en semanas, no meses</li>
                  <li><strong>Integramos todo:</strong> Conectamos con las herramientas que ya usás</li>
                  <li><strong>Te enseñamos:</strong> Capacitación paso a paso para que puedas usarlo sin miedo</li>
                  <li><strong>Seguimos al lado:</strong> Soporte permanente para cuando lo necesites</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-muted/50 space-y-4 rounded-lg border-2 p-8 text-center">
              <h3 className="text-2xl font-bold">¿Listo para que tu negocio trabaje solo?</h3>
              <p className="text-muted-foreground">
                No necesitás ser técnico. Solo necesitás dar el primer paso.
                <br />
                <br />
                Descubrí cómo la automatización puede darte más tiempo, claridad y control.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/servicios">Ver Servicios</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">Hablemos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
