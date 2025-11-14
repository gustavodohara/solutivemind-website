import { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/layout/hero'
import { SectionHeader } from '@/components/layout/section-header'
import { CTAButtonPair } from '@/components/ui/cta-button-pair'
import { PARTNERS } from '@/lib/data/partners'
import { FEATURE_DEMOS } from '@/lib/data/feature-demos'
import { PRODUCT_PILLARS } from '@/lib/data/product-pillars'
import { INTEGRATIONS } from '@/lib/data/integrations'

// Lazy load heavy components for better performance
const LogoCarousel = dynamic(
  () => import('@/components/showcase/logo-carousel').then((mod) => ({ default: mod.LogoCarousel })),
  {
    loading: () => <div className="text-center py-12">Cargando...</div>,
  }
)

const TabbedCarousel = dynamic(
  () => import('@/components/features/tabbed-carousel').then((mod) => ({ default: mod.TabbedCarousel })),
  {
    loading: () => <div className="text-center py-12">Cargando...</div>,
  }
)

const StoryboardSection = dynamic(
  () => import('@/components/layout/storyboard-section').then((mod) => ({ default: mod.StoryboardSection })),
  {
    loading: () => <div className="text-center py-12">Cargando...</div>,
  }
)

const IntegrationGrid = dynamic(
  () => import('@/components/showcase/integration-grid').then((mod) => ({ default: mod.IntegrationGrid })),
  {
    loading: () => <div className="text-center py-12">Cargando...</div>,
  }
)

const EnterpriseCTACard = dynamic(
  () => import('@/components/cta/enterprise-cta-card').then((mod) => ({ default: mod.EnterpriseCTACard })),
  {
    loading: () => <div className="text-center py-12">Cargando...</div>,
  }
)

export const metadata: Metadata = {
  title: 'SolutiveMind - Servicios de Automatización Empresarial',
  description:
    'Transformamos tu negocio con soluciones de automatización inteligente. Optimiza procesos, reduce costos y aumenta la productividad.',
  keywords: [
    'automatización',
    'servicios empresariales',
    'transformación digital',
    'optimización de procesos',
  ],
}

export default function HomePage() {
  // Convert FEATURE_DEMOS to TabbedCarousel format
  const tabbedFeatures = FEATURE_DEMOS.map((demo) => ({
    id: demo.id,
    title: demo.title,
    description: demo.description,
    content: (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2">
        <Image src={demo.image} alt={demo.title} fill className="object-cover" />
      </div>
    ),
  }))

  return (
    <>
      {/* 1. Hero con video background */}
      <Hero
        title="Automatización Empresarial para tu PyME"
        description="Transformamos procesos manuales en sistemas automatizados que ahorran tiempo y reducen errores."
        backgroundVideo="dQw4w9WgXcQ"
        actions={
          <CTAButtonPair
            primaryText="Solicitar Consulta"
            primaryHref="/contacto"
            secondaryText="Ver Servicios"
            secondaryHref="/servicios"
            size="xl"
          />
        }
      />

      {/* 2. Partner logos carousel */}
      <section className="border-b py-12">
        <div className="container">
          <p className="text-muted-foreground mb-6 text-center text-sm">
            Tecnologías y herramientas que utilizamos
          </p>
          <LogoCarousel logos={PARTNERS} autoplay speed={3000} />
        </div>
      </section>

      {/* 3. Interactive feature tabs */}
      <section className="py-24">
        <div className="container">
          <SectionHeader
            title="¿Qué podemos automatizar para vos?"
            description="Desde la gestión de documentos hasta la integración de sistemas"
            alignment="center"
            badge="Servicios"
          />
          <div className="mt-12">
            <TabbedCarousel features={tabbedFeatures} />
          </div>
        </div>
      </section>

      {/* 4. Product pillars (Storyboard sections) */}
      {PRODUCT_PILLARS.map((pillar) => (
        <StoryboardSection
          key={pillar.id}
          title={pillar.title}
          description={pillar.description}
          backgroundImage={pillar.backgroundImage}
          actions={
            <CTAButtonPair
              primaryText={pillar.cta.text}
              primaryHref={pillar.cta.link}
              secondaryText="Contactar"
              secondaryHref="/contacto"
            />
          }
        />
      ))}

      {/* 5. Integration showcase */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <SectionHeader
            title="Integraciones que potencian tu negocio"
            description="Conectamos tus herramientas favoritas"
            alignment="center"
          />
          <div className="mt-12">
            <IntegrationGrid integrations={INTEGRATIONS} columns={4} />
          </div>
        </div>
      </section>

      {/* 6. Enterprise CTA */}
      <section className="py-24">
        <div className="container">
          <EnterpriseCTACard
            title="¿Listo para empezar?"
            description="Agenda una consulta gratuita y descubrí cómo la automatización puede transformar tu negocio."
            features={[
              'Consulta inicial sin cargo',
              'Análisis de procesos actuales',
              'Propuesta personalizada',
              'Soporte continuo',
            ]}
            ctaText="Solicitar Consulta"
            ctaLink="/contacto"
          />
        </div>
      </section>
    </>
  )
}
