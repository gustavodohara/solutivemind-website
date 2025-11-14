/**
 * Feature demos data
 * Used in TabbedCarousel component
 */

export interface FeatureDemo {
  id: string
  title: string
  description: string
  image: string
  tags?: string[]
}

export const FEATURE_DEMOS: FeatureDemo[] = [
  {
    id: 'automation',
    title: 'Automatización de Procesos',
    description:
      'Elimina tareas repetitivas y libera tiempo para lo que realmente importa. Automatiza flujos de trabajo complejos con herramientas de integración.',
    image: '/images/features/automation.jpg',
    tags: ['Make', 'Zapier', 'API'],
  },
  {
    id: 'ai-integration',
    title: 'Integración con IA',
    description:
      'Potencia tus procesos con inteligencia artificial. Desde chatbots hasta análisis de datos, incorpora IA en tus operaciones diarias.',
    image: '/images/features/ai-integration.jpg',
    tags: ['OpenAI', 'Claude', 'Machine Learning'],
  },
  {
    id: 'data-management',
    title: 'Gestión de Datos',
    description:
      'Centraliza y organiza tu información en bases de datos inteligentes. Accede a insights en tiempo real y toma decisiones informadas.',
    image: '/images/features/data-management.jpg',
    tags: ['Airtable', 'Notion', 'Google Sheets'],
  },
  {
    id: 'communication',
    title: 'Comunicación Empresarial',
    description:
      'Mejora la colaboración y comunicación del equipo. Integra herramientas de mensajería, email y videoconferencias.',
    image: '/images/features/communication.jpg',
    tags: ['Slack', 'Email', 'Calendar'],
  },
]
