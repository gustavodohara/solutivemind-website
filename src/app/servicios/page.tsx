import { Metadata } from 'next'
import { Hero } from '@/components/layout/hero'
import { ProductGrid } from '@/components/products/product-grid'
import { SectionHeader } from '@/components/layout/section-header'
import { getAllProducts } from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Servicios | SolutiveMind',
  description: 'Servicios de automatización empresarial para PyMEs',
}

export default function ServiciosPage() {
  const products = getAllProducts()

  return (
    <>
      {/* Hero mejorado */}
      <Hero
        title="Nuestros Servicios de Automatización"
        description="Soluciones diseñadas para optimizar cada aspecto de tu negocio"
        backgroundImage="/images/hero/servicios-hero.jpg"
      />

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title="Explorá nuestros servicios"
            description="Cada servicio está diseñado para resolver problemas específicos de tu negocio"
            alignment="center"
            badge={`${products.length} Servicios`}
          />
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </>
  )
}
