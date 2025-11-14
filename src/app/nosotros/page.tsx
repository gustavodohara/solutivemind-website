import { Metadata } from 'next'
import { Hero } from '@/components/layout/hero'
import { StoryboardSection } from '@/components/layout/storyboard-section'
import { SectionHeader } from '@/components/layout/section-header'
import { CTAButtonPair } from '@/components/ui/cta-button-pair'
import { FeatureIconBox } from '@/components/features/feature-icon-box'
import { Target, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | SolutiveMind',
  description: 'Conocé más sobre SolutiveMind y nuestro equipo',
}

export default function NosotrosPage() {
  const valores = [
    {
      icon: Target,
      title: 'Enfoque en Resultados',
      description: 'Nos enfocamos en entregar soluciones que generen impacto real en tu negocio.',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Cada cliente es único y merece una solución a su medida.',
    },
    {
      icon: Zap,
      title: 'Implementación Ágil',
      description:
        'Desarrollamos e implementamos soluciones rápidamente sin comprometer la calidad.',
    },
  ]

  return (
    <>
      {/* Hero mejorado */}
      <Hero
        title="Sobre SolutiveMind"
        description="Ayudamos a PyMEs a crecer mediante la automatización inteligente de procesos"
        backgroundImage="/images/hero/about-hero.jpg"
      />

      {/* Valores */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title="Nuestros Valores"
            description="Los principios que guían nuestro trabajo"
            alignment="center"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((valor, index) => (
              <FeatureIconBox
                key={index}
                icon={valor.icon}
                title={valor.title}
                description={valor.description}
                variant="bordered"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Storyboard Section */}
      <StoryboardSection
        title="Nuestra Misión"
        description="Democratizar la automatización empresarial para que todas las PyMEs puedan competir en igualdad de condiciones con grandes empresas."
        backgroundImage="/images/pillars/mission-bg.jpg"
        actions={
          <CTAButtonPair
            primaryText="Ver Servicios"
            primaryHref="/servicios"
            secondaryText="Contactar"
            secondaryHref="/contacto"
          />
        }
      />

      {/* CTA final */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-muted/50 space-y-6 rounded-lg border-2 p-8 text-center">
            <h3 className="text-2xl font-bold">¿Listo para dar el siguiente paso?</h3>
            <p className="text-muted-foreground">
              Descubrí cómo la automatización puede transformar tu forma de trabajar.
            </p>
            <CTAButtonPair
              primaryText="Ver Servicios"
              primaryHref="/servicios"
              secondaryText="Contactar"
              secondaryHref="/contacto"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  )
}
