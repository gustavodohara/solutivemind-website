import { Product } from '@/lib/types'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Automatización Empresarial Inteligente',
    slug: 'automatizacion-empresarial-inteligente',
    description: `¿Te imaginás despertar y ver que tu negocio ya confirmó turnos, envió recordatorios y registró pagos?

Así funciona la automatización. No es magia, es tecnología bien usada.

Dejá de perseguir clientes que olvidan citas, de anotar todo manual y de preocuparte si se te pasó algo. Tus sistemas trabajan 24/7 para que vos no tengas que estar pendiente de todo.

Ideal para empresas que quieren escalar sin saturar a su equipo ni aumentar costos operativos.`,
    shortDescription:
      'Que tu negocio trabaje solo: recordatorios, bots, IA, agendas y respuestas automáticas. Sin vueltas, sin estrés.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Automatización',
    features: [
      'Integración total: Conectamos las herramientas que ya usás (CRM, ERP, WhatsApp, email) para que hablen entre sí',
      'Automatización real: Agendas, recordatorios, cobros... todo funciona solo',
      'Atención inteligente 24/7: Chatbots que responden como si fueras vos, incluso de madrugada',
      'Control en tiempo real: Reportes y monitoreo automático para que siempre sepas qué está pasando',
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Optimización de Procesos',
    slug: 'optimizacion-de-procesos',
    description: `¿Sentís que tu negocio funciona "a los tumbos"?

Tareas que se pierden. Errores que se repiten. Procesos que dependen de una sola persona. Si esa persona falta, todo se frena.

Eso no es falta de compromiso. Es falta de estructura.

Miramos cómo trabajás hoy, te decimos exactamente qué está fallando y rediseñamos los flujos para que todo sea más claro, rápido y confiable.

Ideal para PyMEs que necesitan orden, claridad y la tranquilidad de saber que nada importante se va a caer.`,
    shortDescription:
      'Detectamos qué te está frenando y ordenamos tu operación para que puedas crecer sin caos.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Optimización',
    features: [
      'Auditoría sin vueltas: Te decimos exactamente dónde perdés tiempo y energía',
      'Mejoras con fundamento: Soluciones basadas en datos reales, no en suposiciones',
      'Herramientas que funcionan: Implementamos sistemas simples que tu equipo va a querer usar',
      'Capacitación incluida: Enseñamos paso a paso para que nadie se quede atrás',
    ],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Soluciones con IA Aplicada',
    slug: 'soluciones-con-ia-aplicada',
    description: `La IA ya no es solo para empresas gigantes con presupuestos millonarios.

Hoy podés tener un asistente que responda consultas mientras dormís, que analice tus ventas y te diga qué está funcionando (y qué no), y que te ayude a predecir tendencias antes de que pasen.

Todo sin necesidad de contratar un equipo técnico ni volverse experto en programación.

Ideal para empresas que quieren innovar, atender mejor y tomar decisiones con datos reales, sin complicarse la vida.`,
    shortDescription:
      'IA que entiende tu negocio y te ayuda a vender más, atender mejor y decidir con datos reales.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
      '/images/products/placeholder.svg',
    ],
    category: 'Inteligencia Artificial',
    features: [
      'Chatbots que parecen humanos: Atienden consultas 24/7 como si fueras vos',
      'Análisis predictivo simple: Te mostramos qué va a pasar con tus ventas y clientes',
      'IA a tu medida: Modelos personalizados para decisiones estratégicas (sin necesidad de ser técnico)',
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
