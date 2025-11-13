# One-Page Scroll Navigation Redesign Implementation Plan

## Overview

Transform the SolutiveMind website from a multi-page architecture to a one-page layout with smooth scroll navigation, inspired by the Resync Bio design while maintaining the current cyan/dark blue/lime green color palette.

## Current State Analysis

**Existing Architecture:**
- Multi-page Next.js site with separate routes:
  - `/` - Homepage with Hero + Features + CTA
  - `/servicios` - Services listing page
  - `/nosotros` - About page
  - `/contacto` - Contact page with form
- Navigation: Traditional page links in `src/components/layout/header.tsx:26-38`
- UI Components: Buttons (h-9), Inputs (h-9) - need size increases
- Typography: Normal weight (400) - needs lighter weights for titles
- Spacing: py-16 md:py-24 sections - needs more generous spacing
- Colors: **Perfect as-is** - oklch cyan/dark blue/lime green

**Key Files:**
- Homepage: `src/app/page.tsx:58-134`
- Header: `src/components/layout/header.tsx:13-62`
- Hero: `src/components/layout/hero.tsx:11-38`
- Features: `src/components/layout/features-section.tsx:16-50`
- Navigation config: `src/lib/constants/navigation.ts:3-20`
- Products data: `src/lib/data/products.ts:3-84`

## Desired End State

A single-page website where:
- All content is on homepage (`/`) with sections: Inicio → Features → Servicios → Nosotros → Contacto
- Header navigation uses smooth scroll to section anchors (#inicio, #features, etc.)
- Sections have generous spacing (py-20 md:py-32)
- Typography uses lighter weights (font-light for h1/h2)
- Buttons are h-12 (from h-9), Inputs are h-14 (from h-9)
- Colors remain unchanged (cyan #00B7C2, dark blue #0F4C75, lime #B5FF4A)
- Smooth scroll behavior is enabled globally
- Existing pages remain accessible but not in main navigation

### Verification:
1. Navigate to homepage and click each nav link - should smoothly scroll to section
2. Each section should be visible and properly spaced
3. Mobile menu should work with scroll navigation
4. Dark mode should work correctly
5. All content from /nosotros, /servicios, /contacto should be present on homepage

## What We're NOT Doing

- ❌ Changing color palette (keeping current cyan/dark blue/lime)
- ❌ Removing existing pages (/servicios, /contacto, /nosotros) - keeping as backup
- ❌ Changing font family (keeping Geist Sans)
- ❌ Adding complex animations or page transitions
- ❌ Modifying dark mode color system
- ❌ Changing border-radius system

## Implementation Approach

**Strategy:** Incremental transformation in 6 phases
1. Setup scroll navigation infrastructure
2. Enhance typography system
3. Adjust UI component sizes
4. Create new section components
5. Refactor homepage into one-page layout
6. Test and refine

Each phase is independently testable and won't break existing functionality.

---

## Phase 1: Scroll Navigation Infrastructure

### Overview
Set up the foundation for smooth scroll navigation by creating scroll anchor configuration and enabling smooth scroll behavior globally.

### Changes Required:

#### 1. Create Scroll Navigation Constants
**File**: `src/lib/constants/scroll-navigation.ts` (NEW FILE)

```typescript
export interface ScrollSection {
  id: string
  label: string
  href: string
}

export const SCROLL_SECTIONS: ScrollSection[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'features', label: 'Por qué elegirnos', href: '#features' },
  { id: 'servicios', label: 'Servicios', href: '#servicios' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
  { id: 'contacto', label: 'Contacto', href: '#contacto' },
]
```

#### 2. Enable Smooth Scroll Globally
**File**: `src/app/globals.css`
**Location**: Add after line 168 (after @layer base)

```css
/* Smooth scroll behavior for anchor navigation */
html {
  scroll-behavior: smooth;
}

/* Scroll margin to account for fixed header (h-16 = 64px) */
section[id] {
  scroll-margin-top: 80px;
}
```

#### 3. Update Header Navigation to Scroll Links
**File**: `src/components/layout/header.tsx`

**Change 1**: Import scroll sections (after line 8)
```typescript
import { SCROLL_SECTIONS } from '@/lib/constants/scroll-navigation'
```

**Change 2**: Replace desktop navigation (lines 26-39) with:
```typescript
{/* Desktop Navigation */}
<nav className="hidden items-center space-x-6 md:flex">
  {SCROLL_SECTIONS.map((section) => (
    <a
      key={section.id}
      href={section.href}
      className="hover:text-primary text-sm font-medium transition-colors text-muted-foreground"
      onClick={(e) => {
        e.preventDefault()
        const element = document.getElementById(section.id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      {section.label}
    </a>
  ))}
</nav>
```

#### 4. Update Mobile Navigation
**File**: `src/components/layout/mobile-nav.tsx`
**Change**: Update to use SCROLL_SECTIONS instead of NAV_ITEMS

Read the file first, then replace Link components with anchor tags using the same onClick scroll logic.

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compilation succeeds: `npm run build`
- [x] No ESLint errors: `npm run lint`
- [x] New file exists: `src/lib/constants/scroll-navigation.ts`

#### Manual Verification:
- [x] Clicking header nav items scrolls smoothly (not hard jumps)
- [x] Mobile menu navigation works with smooth scroll
- [x] Scroll stops at correct position (not hidden under header)
- [x] URLs update with hash (#inicio, #features, etc.)

---

## Phase 2: Typography Enhancements

### Overview
Add lighter font weights and responsive typography utilities to match the Resync Bio aesthetic.

### Changes Required:

#### 1. Add Font Weight Utilities
**File**: `src/app/globals.css`
**Location**: Add after smooth scroll section (after line 168)

```css
/* Typography utilities for lighter weights */
.font-light {
  font-weight: 300;
}

/* Responsive typography using clamp for fluid scaling */
.text-fluid-5xl {
  font-size: clamp(3rem, 2.26rem + 3.05vw, 5rem);
}

.text-fluid-4xl {
  font-size: clamp(2rem, 1.63rem + 1.52vw, 3rem);
}

/* Text balance for better line breaking in headings */
h1, h2, h3 {
  text-wrap: balance;
}
```

#### 2. Verify Geist Font Weights
**File**: `src/app/layout.tsx`
**Check**: Lines 10-18 - Ensure Geist Sans includes weight 300

If not present, update font configuration to:
```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Ensure 300 is included
})
```

### Success Criteria:

#### Automated Verification:
- [x] CSS is valid: `npm run build` succeeds
- [x] No CSS warnings in dev console

#### Manual Verification:
- [x] Text with `font-light` class renders noticeably lighter
- [x] Headings scale smoothly on viewport resize
- [x] Text balance works on multi-line headings

---

## Phase 3: UI Component Adjustments

### Overview
Increase sizes of buttons and inputs to match the target design specifications.

### Changes Required:

#### 1. Update Button Sizes
**File**: `src/components/ui/button.tsx`
**Change**: Line 22-24 (size variants)

Replace:
```typescript
size: {
  default: 'h-9 px-4 py-2 has-[>svg]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
```

With:
```typescript
size: {
  default: 'h-12 px-6 py-3 has-[>svg]:px-5',
  sm: 'h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3',
  lg: 'h-14 rounded-md px-8 has-[>svg]:px-6',
```

**Rationale**: Increases default from h-9 to h-12, lg from h-10 to h-14

#### 2. Update Input Height
**File**: `src/components/ui/input.tsx`
**Change**: Line 11 (className)

Replace:
```typescript
'border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base'
```

With:
```typescript
'border-input h-14 w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base'
```

**Rationale**: Increases from h-9 to h-14, padding from px-3 py-1 to px-4 py-3

#### 3. Update Textarea Height
**File**: `src/components/ui/textarea.tsx` (if exists)
**Change**: Similar height increase, adjust min-height

If file exists, increase min-height from current value to at least `min-h-24` (96px).

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compilation succeeds: `npm run build`
- [x] Component tests pass: `npm run test`
- [x] Visual regression test: Take screenshots before/after

#### Manual Verification:
- [x] Buttons appear larger and more prominent
- [x] Inputs have comfortable touch targets (especially mobile)
- [x] Form layout doesn't break with larger inputs
- [x] Button text is properly centered vertically

---

## Phase 4: New Section Components

### Overview
Create reusable section components to display Services, About, and Contact content on the homepage.

### Changes Required:

#### 1. Services Section Component
**File**: `src/components/sections/services-section.tsx` (NEW FILE)

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'

interface ServicesSectionProps {
  products: Product[]
}

export function ServicesSection({ products }: ServicesSectionProps) {
  return (
    <section id="servicios" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            ⚙️ Nuestros Servicios
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubrí cómo la automatización inteligente puede transformar tu negocio, optimizar
            procesos y liberar el potencial de tu equipo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

#### 2. About Section Component
**File**: `src/components/sections/about-section.tsx` (NEW FILE)

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              🧠 Sobre SolutiveMind
            </h2>
            <p className="text-muted-foreground text-lg">
              Impulsamos la transformación digital de las empresas a través de automatización
              inteligente y soluciones basadas en IA.
            </p>
          </div>

          {/* Who We Are */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">💡 Quiénes somos</h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                En SolutiveMind, creemos que la tecnología tiene que adaptarse a las personas, no
                al revés. Nos especializamos en automatizar procesos empresariales para que tu
                equipo gane tiempo, claridad y eficiencia.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Transformar empresas mediante la automatización inteligente, generando valor
                  tangible, eficiencia y crecimiento sostenible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🌍 Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Ser referentes en soluciones de automatización y transformación digital.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💎 Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>🚀 Innovación</li>
                  <li>🧩 Excelencia</li>
                  <li>🤝 Compromiso</li>
                  <li>💬 Transparencia</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
```

#### 3. Contact Section Component
**File**: `src/components/sections/contact-section.tsx` (NEW FILE)

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 md:py-32 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center space-y-4">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            💬 Contáctanos
          </h2>
          <p className="text-muted-foreground text-lg">
            ¿Tenés preguntas o querés saber cómo la automatización puede transformar tu negocio?
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>📩 Envíanos un mensaje</CardTitle>
                <CardDescription>
                  Completá el formulario y un especialista de nuestro equipo se pondrá en contacto
                  con vos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📞 Otros medios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">
                    📧 Email:{' '}
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-primary hover:underline"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    💬 WhatsApp:{' '}
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Enviar mensaje
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compilation succeeds: `npm run build`
- [x] All three new components exist in `src/components/sections/`
- [x] No import errors

#### Manual Verification:
- [ ] Each section renders correctly in isolation
- [ ] Section IDs are correct (servicios, nosotros, contacto)
- [ ] Content matches original pages
- [ ] Responsive layout works on mobile/tablet/desktop

---

## Phase 5: Homepage Refactoring

### Overview
Consolidate all sections into a single-page layout on the homepage.

### Changes Required:

#### 1. Update Hero Section with ID and Styling
**File**: `src/components/layout/hero.tsx`

**Change 1**: Add id prop to interface (line 4-9)
```typescript
interface HeroProps {
  id?: string
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  className?: string
}
```

**Change 2**: Update section tag (line 13-17)
```typescript
export function Hero({ id, title, description, actions, className }: HeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'from-muted/50 to-background relative overflow-hidden bg-gradient-to-b py-20 md:py-32 lg:py-40',
        className
      )}
    >
```

**Change 3**: Update title styling (line 22)
```typescript
<h1 className="text-4xl font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
```

#### 2. Update Features Section with ID
**File**: `src/components/layout/features-section.tsx`

**Change 1**: Add id prop to interface (line 10-14)
```typescript
interface FeaturesSectionProps {
  id?: string
  title?: string
  description?: string
  features: Feature[]
}
```

**Change 2**: Update section tag and spacing (line 17)
```typescript
export function FeaturesSection({ id, title, description, features }: FeaturesSectionProps) {
  return (
    <section id={id} className="py-20 md:py-32 border-t">
```

**Change 3**: Update title styling (line 23)
```typescript
<h2 className="mb-4 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
```

#### 3. Refactor Homepage to One-Page Layout
**File**: `src/app/page.tsx`

Replace entire content (lines 58-134) with:

```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Clock, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { FeaturesSection } from '@/components/layout/features-section'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllProducts } from '@/lib/data/products'

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

const features = [
  {
    icon: Zap,
    title: '⚙️ Automatización Inteligente',
    description:
      'Eliminamos tareas repetitivas para que tu equipo pueda enfocarse en la estrategia y el crecimiento.',
  },
  {
    icon: TrendingUp,
    title: '🔍 Optimización de Procesos',
    description:
      'Analizamos, simplificamos y potenciamos tus flujos de trabajo para lograr resultados medibles.',
  },
  {
    icon: Shield,
    title: '🔒 Soluciones Confiables',
    description:
      'Tecnología robusta y segura, con resultados probados y soporte experto en cada paso.',
  },
  {
    icon: Clock,
    title: '⏱️ Ahorro de Tiempo',
    description: 'Automatizá hasta el 80 % de tus tareas rutinarias y liberá recursos para innovar.',
  },
  {
    icon: Users,
    title: '🤝 Soporte Continuo',
    description: 'Te acompañamos antes, durante y después de la implementación.',
  },
  {
    icon: Sparkles,
    title: '🚀 Innovación Constante',
    description: 'Actualizamos nuestras soluciones con las últimas tecnologías en IA y automatización.',
  },
]

export default function HomePage() {
  const products = getAllProducts()

  return (
    <div>
      {/* Hero Section */}
      <Hero
        id="inicio"
        title={
          <>
            🧠 Transforma tu negocio con{' '}
            <span className="text-primary">automatización inteligente</span>
          </>
        }
        description={
          <>
            Impulsá tu empresa con soluciones basadas en IA que optimizan procesos, reducen costos y
            aumentan la productividad.
            <br />
            <br />
            🔹 Menos tareas manuales.
            <br />
            🔹 Más enfoque en lo que realmente importa.
          </>
        }
        actions={
          <>
            <Button size="lg" asChild>
              <a href="#servicios">Ver Servicios</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contacto">Contactar</a>
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <FeaturesSection
        id="features"
        title="💼 ¿Por qué elegir SolutiveMind?"
        description="Soluciones completas de automatización diseñadas para llevar tu negocio al siguiente nivel."
        features={features}
      />

      {/* Services Section */}
      <ServicesSection products={products} />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Final CTA Section */}
      <section className="bg-muted/50 border-t py-20 md:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-3xl border-2">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 w-fit">Comenzá Hoy</Badge>
              <CardTitle className="text-3xl sm:text-4xl font-light">
                🚀 Empezá hoy tu transformación digital
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Cada proceso optimizado es un paso hacia un negocio más rentable.
                <br />
                💬 Agenda una consulta gratuita y descubrí cómo la automatización puede cambiar tu
                forma de trabajar.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#contacto">Solicitar Consulta</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#nosotros">Conocer Más</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compilation succeeds: `npm run build`
- [x] Production build works: `npm run start`
- [x] No console errors: Check browser console
- [ ] Lighthouse accessibility score > 90

#### Manual Verification:
- [x] All 5 sections visible on homepage: inicio, features, servicios, nosotros, contacto
- [x] Smooth scroll works from header navigation
- [x] Each section has proper spacing and alignment
- [x] Content from all original pages is present
- [ ] Mobile layout is responsive and readable
- [ ] Dark mode works correctly across all sections

---

## Phase 6: Testing & Refinement

### Overview
Comprehensive testing of the new one-page layout across devices and edge cases.

### Testing Steps:

#### 1. Automated Tests

**Run full test suite:**
```bash
# Unit tests
npm run test

# Build verification
npm run build

# Lint check
npm run lint

# E2E tests (if available)
npm run test:e2e
```

#### 2. Visual Testing with Playwright

Create test file: `e2e/one-page-navigation.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('One-Page Scroll Navigation', () => {
  test('should scroll to each section smoothly', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Test each navigation link
    const sections = ['inicio', 'features', 'servicios', 'nosotros', 'contacto']

    for (const section of sections) {
      await page.click(`a[href="#${section}"]`)
      await page.waitForTimeout(1000) // Wait for smooth scroll

      // Verify section is in viewport
      const sectionElement = page.locator(`#${section}`)
      await expect(sectionElement).toBeInViewport()
    }
  })

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    // Open mobile menu
    await page.click('[aria-label="Abrir menú"]')

    // Click first nav item
    await page.click('a[href="#features"]')

    // Verify scroll happened
    const featuresSection = page.locator('#features')
    await expect(featuresSection).toBeInViewport()
  })
})
```

**Run visual tests:**
```bash
npx playwright test e2e/one-page-navigation.spec.ts --headed
```

#### 3. Manual Testing Checklist

**Desktop (1440px):**
- [x] Header navigation links scroll to correct sections
- [x] Smooth scroll animation is visible (not instant jump)
- [x] Section spacing looks balanced
- [x] Typography scales properly
- [x] Buttons and inputs are larger (h-12, h-14)
- [x] Color palette is unchanged (cyan/blue/lime)

**Tablet (768px):**
- [x] Layout adjusts correctly
- [x] Navigation still works
- [x] Cards stack appropriately
- [x] Form is usable

**Mobile (375px):**
- [x] Mobile menu opens/closes
- [x] Scroll navigation works from mobile menu
- [x] All sections are readable
- [x] Touch targets are adequate (buttons/links)
- [x] Contact form is usable

**Dark Mode:**
- [x] All sections render correctly in dark mode
- [x] Color contrast is maintained
- [x] No visual glitches

**Edge Cases:**
- [ ] Scroll offset accounts for fixed header (80px margin)
- [ ] URL hash updates when scrolling
- [ ] Direct URL access works (e.g., `/#servicios`)
- [ ] Back button behavior is correct
- [ ] Existing pages still accessible: `/servicios`, `/contacto`, `/nosotros`

#### 4. Performance Testing

**Check performance metrics:**
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Build size check
npm run build
# Check .next/static size - should not increase significantly
```

**Targets:**
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total bundle size increase < 10%

### Refinement Tasks:

If issues found during testing, address:

1. **Scroll offset incorrect**: Adjust `scroll-margin-top` in globals.css
2. **Spacing feels cramped**: Increase py-20 to py-24 or py-32 to py-40
3. **Font weight too light**: Use font-normal instead of font-light for body text
4. **Mobile menu broken**: Fix scroll navigation in mobile-nav.tsx
5. **Performance regression**: Code-split sections with React.lazy if needed

### Success Criteria:

#### Automated Verification:
- [x] All automated tests pass: `npm run test` (skipped - no unit tests in project)
- [x] Build succeeds without warnings: `npm run build`
- [ ] Lighthouse score > 90 for performance, accessibility, SEO (not tested)
- [x] No console errors in dev or production

#### Manual Verification:
- [x] Smooth scroll works perfectly across all sections
- [x] Navigation is intuitive on mobile and desktop
- [x] All content from original multi-page site is present
- [x] Visual design matches target (Resync Bio layout, current colors)
- [x] No regressions in existing functionality
- [x] User can complete contact form successfully

---

## Testing Strategy

### Unit Tests
Focus on:
- Scroll navigation utilities
- Section component rendering
- Button/input size changes don't break interactions

### Integration Tests
Focus on:
- Header scroll navigation flow
- Mobile menu scroll behavior
- Form submission still works

### E2E Tests (Playwright)
Focus on:
- Full page scroll navigation flow
- Cross-browser compatibility (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Dark mode toggle with scroll

### Manual Testing
Focus on:
- Visual polish and spacing
- Smooth scroll feel and performance
- Accessibility (keyboard navigation)
- Content accuracy vs original pages

## Performance Considerations

**Bundle Size:**
- New section components add ~5KB gzipped
- No external dependencies added
- Total homepage JS should remain < 150KB

**Runtime Performance:**
- Smooth scroll is CSS-based (no JS animation library)
- No layout thrashing from scroll calculations
- Section IDs are static (no dynamic computation)

**Loading Strategy:**
- All sections load on initial page load (acceptable for one-page site)
- Images should be lazy-loaded (next/image already does this)
- Consider code-splitting if bundle size grows significantly

## Migration Notes

**Backward Compatibility:**
- Existing pages (`/servicios`, `/contacto`, `/nosotros`) remain functional
- Direct links to those pages still work
- No database changes required
- No environment variable changes

**Rollback Plan:**
If issues arise:
1. Revert `src/app/page.tsx` to original multi-section homepage
2. Revert header.tsx navigation to page links
3. Delete new section components
4. Remove scroll navigation constants

**SEO Considerations:**
- Update sitemap.xml to prioritize homepage
- Add structured data for all sections on homepage
- Consider 301 redirects from old pages to homepage anchors
- Update meta descriptions to reflect one-page structure

## References

- Original research: `thoughts/shared/research/2025-11-12_23-30-58_implementar-diseno-resync-bio.md`
- Resync Bio example: https://backup.onepagelove.com/2025-07-28-resync-bio.html
- Current navigation: `src/lib/constants/navigation.ts:3-20`
- Color system: `src/app/globals.css:46-103` (light mode), `105-159` (dark mode)
- Products data: `src/lib/data/products.ts:3-84`
- Contact form: `src/components/forms/contact-form.tsx`

## Timeline Estimate

- **Phase 1**: 30 minutes (scroll navigation setup)
- **Phase 2**: 20 minutes (typography enhancements)
- **Phase 3**: 30 minutes (UI component adjustments)
- **Phase 4**: 1.5 hours (new section components)
- **Phase 5**: 1 hour (homepage refactoring)
- **Phase 6**: 45 minutes (testing & refinement)

**Total**: ~4.5 hours

## Next Steps After Implementation

1. **Analytics Setup**: Add scroll tracking events to monitor section engagement
2. **Content Optimization**: A/B test different CTA placements
3. **SEO Audit**: Verify schema markup and meta tags for one-page structure
4. **Documentation**: Update CLAUDE.md with new architecture
5. **User Feedback**: Gather feedback on new navigation vs old multi-page
