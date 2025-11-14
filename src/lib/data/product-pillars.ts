/**
 * Product pillars data
 * Used in StoryboardSection components
 */

export interface ProductPillar {
  id: string
  title: string
  description: string
  backgroundImage: string
  cta: {
    text: string
    link: string
  }
}

export const PRODUCT_PILLARS: ProductPillar[] = [
  {
    id: 'efficiency',
    title: 'Eficiencia Operativa',
    description:
      'Optimiza tus procesos y reduce tiempos de ejecución hasta en un 80%. Automatiza tareas repetitivas y libera recursos para actividades de mayor valor.',
    backgroundImage: '/images/pillars/efficiency-bg.jpg',
    cta: {
      text: 'Ver Casos de Éxito',
      link: '/servicios',
    },
  },
  {
    id: 'scalability',
    title: 'Escalabilidad',
    description:
      'Soluciones diseñadas para crecer con tu negocio. Implementa sistemas que se adaptan a tus necesidades sin comprometer el rendimiento.',
    backgroundImage: '/images/pillars/scalability-bg.jpg',
    cta: {
      text: 'Explorar Soluciones',
      link: '/servicios',
    },
  },
  {
    id: 'innovation',
    title: 'Innovación Continua',
    description:
      'Mantente a la vanguardia con las últimas tecnologías en automatización e inteligencia artificial. Actualizaciones constantes sin costos adicionales.',
    backgroundImage: '/images/pillars/innovation-bg.jpg',
    cta: {
      text: 'Conocer Más',
      link: '/nosotros',
    },
  },
]
