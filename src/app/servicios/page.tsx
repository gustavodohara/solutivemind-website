import { Metadata } from 'next'
import { getAllProducts } from '@/lib/data/products'
import { ProductGrid } from '@/components/products/product-grid'

export const metadata: Metadata = {
  title: 'Servicios - SolutiveMind',
  description:
    'Descubrí cómo la automatización inteligente puede transformar tu negocio, optimizar procesos y liberar el potencial de tu equipo.',
}

export default function ServiciosPage() {
  const products = getAllProducts()

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">⚙️ Nuestros Servicios</h1>
        <p className="text-muted-foreground text-lg">
          Descubrí cómo la automatización inteligente puede transformar tu negocio, optimizar
          procesos y liberar el potencial de tu equipo.
          <br />
          En SolutiveMind, diseñamos soluciones a medida que combinan tecnología, estrategia e
          inteligencia artificial.
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
