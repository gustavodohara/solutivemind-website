import { Product } from '@/lib/types'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Automatización Empresarial Inteligente',
    slug: 'automatizacion-empresarial-inteligente',
    description: `Transformá tus procesos con flujos de trabajo automatizados que ahorran tiempo, reducen errores y aumentan la eficiencia.

Ideal para empresas que quieren escalar sin aumentar costos operativos.`,
    shortDescription:
      'Transformá tus procesos con flujos de trabajo automatizados que ahorran tiempo, reducen errores y aumentan la eficiencia.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Automatización',
    features: [
      'Integración entre herramientas (CRM, ERP, sistemas internos)',
      'Automatización de tareas repetitivas',
      'Flujos inteligentes con IA para atención, ventas o soporte',
      'Monitoreo y reportes automáticos',
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Optimización de Procesos',
    slug: 'optimizacion-de-procesos',
    description: `Analizamos tus operaciones actuales para identificar cuellos de botella y rediseñar flujos más ágiles y rentables.

Ideal para pymes que buscan orden, claridad y control.`,
    shortDescription:
      'Analizamos tus operaciones actuales para identificar cuellos de botella y rediseñar flujos más ágiles y rentables.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Optimización',
    features: [
      'Auditoría de procesos y diagnóstico',
      'Diseño de mejoras basadas en datos',
      'Implementación de herramientas de eficiencia',
      'Capacitación al equipo',
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Soluciones con IA Aplicada',
    slug: 'soluciones-con-ia-aplicada',
    description: `Llevá tu negocio al siguiente nivel con inteligencia artificial práctica y accesible.

Ideal para empresas que buscan innovar sin depender de grandes equipos técnicos.`,
    shortDescription:
      'Llevá tu negocio al siguiente nivel con inteligencia artificial práctica y accesible.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Inteligencia Artificial',
    features: [
      'Chatbots inteligentes y asistentes virtuales',
      'Análisis predictivo de ventas y clientes',
      'Modelos personalizados de IA para decisiones estratégicas',
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
