import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Sobre SolutiveMind
            </h2>
            <p className="text-muted-foreground text-lg">
              Impulsamos la transformación digital de las empresas a través de automatización
              inteligente y soluciones basadas en IA.
            </p>
          </div>

          {/* Who We Are */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quiénes somos</h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                En SolutiveMind, creemos que la tecnología tiene que adaptarse a las personas, no
                al revés. Nos especializamos en automatizar procesos empresariales para que tu
                equipo gane tiempo, claridad y eficiencia.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Transformar empresas mediante la automatización inteligente, generando valor
                  tangible, eficiencia y crecimiento sostenible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Ser referentes en soluciones de automatización y transformación digital.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>Innovación</li>
                  <li>Excelencia</li>
                  <li>Compromiso</li>
                  <li>Transparencia</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
