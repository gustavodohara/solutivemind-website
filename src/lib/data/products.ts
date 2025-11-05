import { Product } from '@/lib/types'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Servicios de Automatización Empresarial',
    slug: 'servicios-automatizacion-empresarial',
    description: `Transformamos tu negocio con soluciones de automatización inteligente diseñadas para optimizar procesos, reducir costos y aumentar la productividad.

Nuestros servicios incluyen análisis detallado de tus procesos actuales, diseño de flujos de trabajo automatizados, implementación de soluciones tecnológicas de vanguardia, y soporte continuo para garantizar el éxito de tu transformación digital.

Trabajamos con las últimas tecnologías en automatización, inteligencia artificial, y análisis de datos para crear soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.`,
    shortDescription:
      'Optimiza tu negocio con automatización inteligente. Reducí costos, aumentá productividad y transformá tus procesos empresariales.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Automatización',
    features: [
      'Análisis y diagnóstico de procesos actuales',
      'Diseño de flujos de trabajo optimizados',
      'Implementación de soluciones a medida',
      'Integración con sistemas existentes',
      'Capacitación del equipo',
      'Soporte y mantenimiento continuo',
      'Reportes y análisis de resultados',
      'Escalabilidad garantizada',
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Helper functions
export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((product) => product.category === category)
}
