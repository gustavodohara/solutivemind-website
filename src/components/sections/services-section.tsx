import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/lib/types'

interface ServicesSectionProps {
  products: Product[]
}

export function ServicesSection({ products }: ServicesSectionProps) {
  return (
    <section id="servicios" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubrí cómo la automatización inteligente puede transformar tu negocio, optimizar
            procesos y liberar el potencial de tu equipo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
