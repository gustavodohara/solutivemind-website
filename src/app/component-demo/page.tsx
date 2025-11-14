import { VideoPlayer } from '@/components/media/video-player'
import { LogoCarousel, Partner } from '@/components/showcase/logo-carousel'
import { SectionHeader } from '@/components/layout/section-header'
import { CTAButtonPair } from '@/components/ui/cta-button-pair'
import { IntegrationGrid, Integration } from '@/components/showcase/integration-grid'
import { StoryboardSection } from '@/components/layout/storyboard-section'

const mockLogos: Partner[] = [
  { name: 'Partner 1', src: '/images/logo.svg', alt: 'Partner 1' },
  { name: 'Partner 2', src: '/images/logo.svg', alt: 'Partner 2' },
  { name: 'Partner 3', src: '/images/logo.svg', alt: 'Partner 3' },
]

const mockIntegrations: Integration[] = [
  { name: 'Integration 1', logo: '/images/logo.svg', category: 'ide' },
  { name: 'Integration 2', logo: '/images/logo.svg', category: 'tool' },
  { name: 'Integration 3', logo: '/images/logo.svg', category: 'platform' },
  { name: 'Integration 4', logo: '/images/logo.svg', category: 'ide' },
]

export default function ComponentDemoPage() {
  return (
    <div className="space-y-16 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Component Demo Page</h1>

        {/* VideoPlayer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">VideoPlayer</h2>
          <VideoPlayer
            videoId="dQw4w9WgXcQ"
            title="Demo Video"
            autoplay={false}
            muted={true}
            controls={true}
          />
        </section>

        {/* LogoCarousel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">LogoCarousel</h2>
          <LogoCarousel logos={mockLogos} autoplay={true} speed={3000} />
        </section>

        {/* SectionHeader */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">SectionHeader</h2>
          <SectionHeader
            title="Section Title"
            description="This is a section description"
            badge="New Feature"
            alignment="center"
          />
        </section>

        {/* CTAButtonPair */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">CTAButtonPair</h2>
          <CTAButtonPair
            primaryText="Get Started"
            primaryHref="/contacto"
            secondaryText="Learn More"
            secondaryHref="/nosotros"
            size="lg"
          />
        </section>

        {/* IntegrationGrid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">IntegrationGrid</h2>
          <IntegrationGrid integrations={mockIntegrations} columns={4} />
        </section>
      </div>

      {/* StoryboardSection */}
      <StoryboardSection
        title="Storyboard Section Title"
        description="This is a storyboard section with a background image"
        backgroundImage="/images/hero-bg.jpg"
        alignment="center"
        overlay={true}
      />
    </div>
  )
}
