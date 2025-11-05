import { Metadata } from 'next'
import { getAllProducts } from '@/lib/data/products'
import { ProductGrid } from '@/components/products/product-grid'

export const metadata: Metadata = {
  title: 'Servicios - SolutiveMind',
  description: 'Descubre nuestros servicios de automatización empresarial',
}

export default function ServiciosPage() {
  const products = getAllProducts()

  return (
    <div className="container px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Nuestros Servicios</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Descubre cómo nuestros servicios de automatización pueden transformar tu negocio,
          optimizar procesos y aumentar la productividad de tu equipo.
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
