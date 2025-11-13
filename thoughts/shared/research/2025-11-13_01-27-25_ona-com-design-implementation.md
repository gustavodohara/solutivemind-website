---
date: 2025-11-13T01:27:25-03:00
researcher: Gustavo Dohara
git_commit: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
branch: new-design-ona-com
repository: wt-ona-com
topic: "Implementación del diseño de ONA.com en SolutiveMind Website"
tags: [research, codebase, design-system, ona-com, ui-components, architecture]
status: complete
last_updated: 2025-11-13
last_updated_by: Gustavo Dohara
last_updated_note: "Aclaraciones sobre alcance: mantener navegación actual, sin páginas nuevas, migración incremental, respuestas a open questions"
---

# Research: Implementación del diseño de ONA.com en SolutiveMind Website

**Date**: 2025-11-13T01:27:25-03:00
**Researcher**: Gustavo Dohara
**Git Commit**: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
**Branch**: new-design-ona-com
**Repository**: wt-ona-com

## Research Question

Investigar el diseño de https://ona.com/ y determinar todos los archivos necesarios (modificar y crear) para implementar ese diseño en el proyecto actual SolutiveMind Website. El objetivo es **NO implementar**, solo documentar el análisis completo de la arquitectura necesaria.

## Summary

Después de analizar exhaustivamente el sitio ona.com y el codebase actual de SolutiveMind, he identificado que la implementación del diseño de ONA requerirá:

1. **Creación de 12 nuevos componentes** especializados (video players, carouseles, logo grids, etc.)
2. **Modificación de 5 componentes existentes** (Hero, Footer, Features Section, Button, Card)
3. **Actualización del sistema de colores** (de cyan/azul a navy/onyx negro)
4. **Rediseño de páginas existentes** (home, servicios, sobre nosotros, contacto) - **sin crear páginas nuevas**
5. **Integración de nuevas dependencias** (considerar alternativas a Mux, bibliotecas de carrusel)
6. **Creación de assets y data structures** para el nuevo contenido

**Aclaraciones importantes:**
- ✅ **Navegación actual se mantiene** - No modificar estructura de navegación (Início, Servicios, Sobre Nosotros, Contacto)
- ✅ **Sin páginas nuevas** - Adaptar diseño ONA a las 4 páginas existentes
- ✅ **Rama ya existe** - Trabajar en la rama `new-design-ona-com` (ya creada)
- ✅ **Migración incremental** - Implementación por fases, minimizando riesgos
- ✅ **Mantener branding SolutiveMind** - No cambiar nombre ni identidad de marca
- ✅ **Contenido estático** - No necesita CMS, backend adicional, ni autenticación
- ✅ **Solo español** - No internacionalización por ahora
- ✅ **Sin analytics avanzado** - No tracking especial por el momento

El diseño de ONA es significativamente más complejo que el actual, con énfasis en:
- Enterprise positioning (vs. SMB en SolutiveMind)
- Demostraciones interactivas de producto
- Integración de video prominente
- Sistema de partners y certificaciones
- Arquitectura de agentes AI como concepto central

## Detailed Findings

### 1. Análisis del Diseño de ONA.com

#### 1.1 Sistema de Colores

**Paleta Principal de ONA:**
- **Background (Dark Mode)**: `#0A0E19` (Deep navy/onyx black)
- **Background (Light Mode)**: White
- **Text Primary**: Grey-800 para texto secundario
- **Accents**: Uso minimalista de colores accent
- **Containers**: Fondos blancos con bordes sutilmente redondeados

**Contraste vs. SolutiveMind:**
- SolutiveMind usa cyan vibrante (`oklch(0.69 0.11 198)` - `#00B7C2`)
- ONA usa tonos navy/negros más sobrios y empresariales
- SolutiveMind tiene accent lime (`#B5FF4A`), ONA usa accents más contenidos

**Archivos a modificar:**
- `src/app/globals.css:46-159` - Redefinir todas las variables de color
- `src/lib/theme/palettes.ts:59-114` - Crear nuevo `onaPalette`
- `src/lib/constants/theme-config.ts:29-40` - Actualizar configuración de tema activo

#### 1.2 Tipografía

**ONA Typography:**
- Tamaños: `text-xl`, `text-l`, `text-s` hasta `text-micro`
- Sans-serif consistente en todo el sitio
- Texto centrado para hero y feature sections
- Headlines grandes y bold para secciones principales

**Actual (SolutiveMind):**
- Usa Geist Sans/Mono
- Escala: `text-4xl` a `text-sm`
- Ya tiene buena base tipográfica

**Archivos a considerar:**
- `src/app/layout.tsx:10-18` - Mantener Geist fonts o cambiar según branding
- Posible nueva configuración de tamaños en `globals.css`

#### 1.3 Estructura de Navegación

**ONA Navigation:**
```
- Product
- Solutions
- Resources
- Enterprise
- Blog
- Docs
- Pricing
```

**Actual (SolutiveMind) - MANTENER SIN CAMBIOS:**
```
- Início
- Servicios
- Sobre Nosotros
- Contacto
```

**⚠️ DECISIÓN: Mantener navegación actual**
- **NO modificar** `src/lib/constants/navigation.ts:3-20`
- **NO agregar** items de navegación nuevos
- **NO implementar** dropdown menus en header
- Adaptar el diseño visual de ONA a la estructura de navegación existente

### 2. Componentes Nuevos a Crear

#### 2.1 Video Player Component

**Propósito**: Hero video background con controles play/pause
**Tecnología requerida**: Evaluar alternativas a Mux (ver Open Questions)

**Nuevo archivo a crear:**
```
src/components/media/video-player.tsx
```

**⚠️ Dependencias por decidir:**
- **Opción 1 (Mux)**: `@mux/mux-player-react` + `@mux/upchunk`
- **Opción 2 (HTML5 nativo)**: Sin dependencias, usar `<video>` tag con Next.js
- **Opción 3 (Cloudflare Stream)**: Cliente de Cloudflare
- **Opción 4 (YouTube embeds)**: API de YouTube

**Decisión pendiente**: Ver sección "Open Questions" #1

**Props interface:**
```typescript
interface VideoPlayerProps {
  playbackId: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  className?: string
}
```

**Referencias de implementación:**
- Análisis ONA: Video autoplay en hero section
- Pattern existente: Image handling en `src/components/products/product-card.tsx:25-32`

#### 2.2 Logo Carousel Component

**Propósito**: Showcase de partners/integraciones
**Diseño ONA**: Carrusel horizontal con logos en escala de grises

**Nuevo archivo a crear:**
```
src/components/showcase/logo-carousel.tsx
```

**Dependencias opcionales:**
```json
{
  "embla-carousel-react": "^8.x.x",
  "embla-carousel-autoplay": "^8.x.x"
}
```

**Props interface:**
```typescript
interface LogoCarouselProps {
  logos: Array<{
    name: string
    src: string
    alt: string
    url?: string
  }>
  autoplay?: boolean
  speed?: number
  className?: string
}
```

**Archivos de datos a crear:**
```
src/lib/data/partners.ts
```

**Estructura de datos:**
```typescript
export const PARTNERS = [
  { name: 'VS Code', src: '/images/partners/vscode.svg', url: 'https://...' },
  { name: 'Cursor', src: '/images/partners/cursor.svg', url: 'https://...' },
  // ... más partners
]
```

#### 2.3 Tabbed Carousel Component

**Propósito**: "Ask Ona to..." feature demonstration
**Complejidad**: Tab navigation + content carousel sincronizado

**Nuevos archivos a crear:**
```
src/components/features/tabbed-carousel.tsx
src/components/features/feature-tab.tsx
src/components/features/feature-content.tsx
```

**Props interface:**
```typescript
interface TabbedCarouselProps {
  features: Array<{
    id: string
    title: string
    description: string
    content: ReactNode | string
    icon?: LucideIcon
  }>
  defaultTab?: string
  className?: string
}
```

**Dependencias UI necesarias:**
- Ya existe `src/components/ui/dialog.tsx` - puede reutilizarse
- Tabs component: crear nuevo o usar Radix primitives

**Archivo de datos a crear:**
```
src/lib/data/feature-demos.ts
```

#### 2.4 Integration Grid Component

**Propósito**: Grid 4-columnas de logos de herramientas integradas

**Nuevo archivo a crear:**
```
src/components/showcase/integration-grid.tsx
```

**Props interface:**
```typescript
interface IntegrationGridProps {
  integrations: Array<{
    name: string
    logo: string
    category: 'ide' | 'tool' | 'platform'
  }>
  columns?: 2 | 3 | 4
  showCategories?: boolean
}
```

**Basado en pattern existente:**
- `src/components/products/product-grid.tsx:8-24` - Estructura de grid similar
- Modificar para layout específico de logos

#### 2.5 Compliance Badge Component

**Propósito**: Badges de certificaciones (SOC 2, ISO, etc.)

**Nuevo archivo a crear:**
```
src/components/ui/compliance-badge.tsx
```

**Props interface:**
```typescript
interface ComplianceBadgeProps {
  certification: 'soc2' | 'iso27001' | 'gdpr' | 'hipaa'
  verified?: boolean
  date?: string
  className?: string
}
```

**Assets requeridos:**
```
public/images/certifications/
  - soc2.svg
  - iso27001.svg
  - gdpr.svg
  - hipaa.svg
```

#### 2.6 Storyboard Section Component

**Propósito**: Secciones tipo storytelling con imagen de fondo

**Nuevo archivo a crear:**
```
src/components/layout/storyboard-section.tsx
```

**Props interface:**
```typescript
interface StoryboardSectionProps {
  title: string
  description: string
  backgroundImage: string
  alignment?: 'left' | 'center' | 'right'
  actions?: ReactNode
  overlay?: boolean
}
```

**Archivo de datos a crear:**
```
src/lib/data/product-pillars.ts
```

**Ejemplo de datos:**
```typescript
export const PRODUCT_PILLARS = [
  {
    id: 'agents',
    title: 'Agents: Your Personal Development Team',
    description: '...',
    backgroundImage: '/images/pillars/agents-bg.jpg',
  },
  {
    id: 'environments',
    title: 'Environments: API-First Development',
    description: '...',
    backgroundImage: '/images/pillars/environments-bg.jpg',
  },
  {
    id: 'guardrails',
    title: 'Guardrails: Bank-Grade Security',
    description: '...',
    backgroundImage: '/images/pillars/guardrails-bg.jpg',
  },
]
```

#### 2.7 Announcement Banner Component

**Propósito**: Banner persistente tipo "Gitpod is now Ona"

**Nuevo archivo a crear:**
```
src/components/layout/announcement-banner.tsx
```

**Props interface:**
```typescript
interface AnnouncementBannerProps {
  message: string | ReactNode
  ctaText?: string
  ctaLink?: string
  dismissible?: boolean
  variant?: 'info' | 'success' | 'warning'
}
```

**Integración:**
- Agregar en `src/app/layout.tsx` antes del Header
- Agregar estado de dismissal con localStorage

#### 2.8 CTA Button Pair Component

**Propósito**: Par de botones (primary + outline) estándar ONA

**Nuevo archivo a crear:**
```
src/components/ui/cta-button-pair.tsx
```

**Props interface:**
```typescript
interface CTAButtonPairProps {
  primaryText: string
  primaryHref: string
  secondaryText: string
  secondaryHref: string
  size?: 'default' | 'lg'
  fullWidth?: boolean
}
```

**Basado en pattern existente:**
- Ya existe en `src/app/page.tsx:120-128` - extraer como componente reutilizable

#### 2.9 Feature Icon Box Component

**Propósito**: Box con icono, color de fondo, título y descripción

**Archivo existente a extender:**
```
src/components/layout/features-section.tsx:30-45
```

**Crear variante específica:**
```
src/components/features/feature-icon-box.tsx
```

**Props interface:**
```typescript
interface FeatureIconBoxProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
  iconBackground?: string
  variant?: 'default' | 'minimal' | 'bordered'
}
```

#### 2.10 Container Query Card Component

**Propósito**: Card con container queries para responsiveness avanzado

**Archivo existente a modificar:**
```
src/components/ui/card.tsx:5-76
```

**Mejoras necesarias:**
- Ya tiene `@container/card-header` en línea 23
- Extender para más variantes de layout
- Agregar variantes de tamaño

#### 2.11 Section Header Component

**Propósito**: Header reutilizable para secciones (título + descripción)

**Nuevo archivo a crear:**
```
src/components/layout/section-header.tsx
```

**Props interface:**
```typescript
interface SectionHeaderProps {
  title: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
  badge?: string
  className?: string
}
```

#### 2.12 Enterprise CTA Card Component

**Propósito**: Card destacado para enterprise conversions

**Nuevo archivo a crear:**
```
src/components/cta/enterprise-cta-card.tsx
```

**Props interface:**
```typescript
interface EnterpriseCTACardProps {
  title: string
  description: string
  features?: string[]
  ctaText: string
  ctaLink: string
  variant?: 'default' | 'gradient' | 'bordered'
}
```

### 3. Componentes Existentes a Modificar

#### 3.1 Hero Component

**Archivo**: `src/components/layout/hero.tsx:11-38`

**Modificaciones necesarias:**
1. **Agregar soporte para video background**
   - Nueva prop: `backgroundVideo?: string`
   - Integración con VideoPlayer component
   - Overlay transparente sobre video

2. **Actualizar layout para contenido centrado**
   - ONA usa centrado más prominente
   - Ajustar `max-w-3xl` a `max-w-4xl` o `max-w-5xl`

3. **Soporte para múltiples CTAs con estilos específicos**
   - Ya existe `actions` prop
   - Mejorar spacing con `gap-6` en lugar de `gap-4`

**Código de referencia modificado:**
```typescript
interface HeroProps {
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  backgroundVideo?: string  // NUEVO
  backgroundImage?: string  // NUEVO
  overlay?: boolean         // NUEVO
  className?: string
}

export function Hero({
  title,
  description,
  actions,
  backgroundVideo,
  backgroundImage,
  overlay = true,
  className
}: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      {/* Background Video/Image */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <VideoPlayer
            playbackId={backgroundVideo}
            autoplay
            muted
            loop
            controls={false}
          />
          {overlay && <div className="bg-background/80 absolute inset-0" />}
        </div>
      )}

      {backgroundImage && !backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <Image src={backgroundImage} fill className="object-cover" />
          {overlay && <div className="bg-background/80 absolute inset-0" />}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* ... resto del contenido */}
        </div>
      </div>
    </section>
  )
}
```

#### 3.2 Header Component

**Archivo**: `src/components/layout/header.tsx:13-62`

**⚠️ DECISIÓN: Mantener estructura actual, solo mejoras visuales**

**Modificaciones mínimas necesarias:**
1. **NO agregar más items de navegación** - Mantener los 4 actuales
2. **NO agregar Authentication controls** - No necesario por ahora
3. **Opcional: Integrar Announcement Banner**
   - Banner sobre header (opcional)
   - Solo si hay mensajes importantes que comunicar

**Cambios solo visuales:**
- Ajustar estilos para match con estética ONA (bordes, sombras, spacing)
- Mantener funcionalidad actual (navegación, theme toggle, mobile menu)
- No agregar complejidad innecesaria

#### 3.3 Footer Component

**Archivo**: `src/components/layout/footer.tsx:8-73`

**Modificaciones necesarias:**
1. **Expandir a 4-5 columnas** (actual: 3)
   - Product links
   - Solutions links
   - Resources links
   - Company links
   - Social + Legal

2. **Agregar social media icons**
   - Usar lucide-react icons
   - LinkedIn, Twitter, GitHub

3. **Compliance badges en footer**
   - Integrar ComplianceBadge component
   - SOC 2, ISO certifications

**Código de referencia:**
```typescript
export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        {/* Grid de 5 columnas */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* 5 secciones */}
        </div>

        {/* Compliance badges */}
        <div className="mt-8 flex flex-wrap gap-4">
          <ComplianceBadge certification="soc2" />
          <ComplianceBadge certification="iso27001" />
        </div>

        {/* Copyright bar */}
      </div>
    </footer>
  )
}
```

#### 3.4 Features Section Component

**Archivo**: `src/components/layout/features-section.tsx:16-50`

**Modificaciones necesarias:**
1. **Soporte para 8 features en carrusel** (ONA tiene 8 tabs)
   - Integrar con TabbedCarousel component
   - O mantener grid y agregar variante "carousel"

2. **Agregar variante de visualización**
   - `displayMode: 'grid' | 'carousel' | 'tabs'`

**Código de referencia:**
```typescript
interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
  displayMode?: 'grid' | 'carousel' | 'tabs'  // NUEVO
  columns?: 2 | 3 | 4                         // NUEVO
}
```

#### 3.5 Product Card Component

**Archivo**: `src/components/products/product-card.tsx:13-56`

**Modificaciones necesarias:**
1. **Simplificar para casos de uso tipo "service tile"**
   - ONA no muestra precios en tiles
   - Foco en descripción y CTA simple

2. **Crear variante específica para ONA**
   - Menos información
   - Más espacio visual
   - Iconos más grandes

**Alternativa**: Crear nuevo componente:
```
src/components/services/service-tile.tsx
```

#### 3.6 Button Component

**Archivo**: `src/components/ui/button.tsx:7-35`

**Modificaciones necesarias:**
1. **Agregar nuevas variantes de tamaño**
   - ONA usa botones más grandes en hero
   - Agregar size `xl` y `2xl`

2. **Refinar estados de hover**
   - ONA tiene transiciones más suaves
   - Ajustar `transition-colors` a `transition-all duration-200`

**Código de referencia:**
```typescript
const buttonVariants = cva('...', {
  variants: {
    // ...
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-10 px-6',
      xl: 'h-12 px-8 text-base',     // NUEVO
      '2xl': 'h-14 px-10 text-lg',   // NUEVO
      icon: 'size-9',
      'icon-sm': 'size-8',
      'icon-lg': 'size-10',
    },
  },
})
```

#### 3.7 Card Component

**Archivo**: `src/components/ui/card.tsx:5-76`

**Modificaciones necesarias:**
1. **Agregar más variantes visuales**
   - Bordes más sutiles (ONA usa bordes muy suaves)
   - Sombras más pronunciadas en hover
   - Variante con imagen de fondo

2. **Soporte para overlay content**
   - Texto sobre imagen de fondo
   - Gradiente overlay

**Código de referencia:**
```typescript
interface CardProps {
  // props existentes
  variant?: 'default' | 'bordered' | 'elevated' | 'image-bg'  // NUEVO
  backgroundImage?: string                                     // NUEVO
  overlay?: boolean                                            // NUEVO
}
```

#### 3.8 Theme System

**Archivos a modificar:**
1. `src/app/globals.css:46-159` - Variables de color
2. `src/lib/theme/palettes.ts:59-114` - Nuevo palette ONA
3. `src/lib/constants/theme-config.ts:29-40` - Config activa

**Nuevo palette a crear:**
```typescript
export const onaPalette: ThemePalette = {
  light: {
    background: 'oklch(1 0 0)',                    // White
    foreground: 'oklch(0.20 0.01 240)',            // Nearly black
    primary: 'oklch(0.25 0.02 240)',               // Deep navy
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.45 0.02 240)',             // Mid navy
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.60 0.08 200)',                // Subtle teal
    accentForeground: 'oklch(1 0 0)',
    muted: 'oklch(0.96 0.002 240)',
    mutedForeground: 'oklch(0.45 0.01 240)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.20 0.01 240)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.20 0.01 240)',
    border: 'oklch(0.90 0.002 240)',
    input: 'oklch(0.90 0.002 240)',
    ring: 'oklch(0.25 0.02 240)',
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(1 0 0)',
  },
  dark: {
    background: 'oklch(0.12 0.01 240)',            // #0A0E19 approx
    foreground: 'oklch(0.98 0.002 240)',
    primary: 'oklch(0.35 0.02 240)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.25 0.02 240)',
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.65 0.08 200)',
    accentForeground: 'oklch(0.12 0.01 240)',
    muted: 'oklch(0.18 0.01 240)',
    mutedForeground: 'oklch(0.65 0.01 240)',
    card: 'oklch(0.15 0.01 240)',
    cardForeground: 'oklch(0.98 0.002 240)',
    popover: 'oklch(0.15 0.01 240)',
    popoverForeground: 'oklch(0.98 0.002 240)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.35 0.02 240)',
    destructive: 'oklch(0.65 0.245 27.325)',
    destructiveForeground: 'oklch(0.12 0.01 240)',
  },
}
```

### 4. Páginas EXISTENTES a Rediseñar

**⚠️ DECISIÓN: NO crear páginas nuevas, adaptar diseño ONA a páginas existentes**

Las 4 páginas actuales son:
1. **Home** (`src/app/page.tsx`) - Página principal
2. **Servicios** (`src/app/servicios/page.tsx` y `src/app/servicios/[slug]/page.tsx`) - Catálogo de servicios
3. **Sobre Nosotros** (`src/app/nosotros/page.tsx`) - Información de la empresa
4. **Contacto** (`src/app/contacto/page.tsx`) - Formulario de contacto

#### 4.1 Home Page (Rediseño completo)

**Archivo**: `src/app/page.tsx:5-136`

**Estructura actual:**
- Hero simple
- Features grid (6 items)
- CTA card

**Nueva estructura adaptada de ONA:**
```typescript
export default function HomePage() {
  return (
    <>
      {/* 1. Hero con video background */}
      <Hero
        title="Your Personal Development Team"
        description="Ambient agents that write code, fix bugs, and ship features while you sleep."
        backgroundVideo="mux-playback-id"
        actions={
          <CTAButtonPair
            primaryText="Start Building"
            primaryHref="/signup"
            secondaryText="View Docs"
            secondaryHref="/docs"
          />
        }
      />

      {/* 2. Video demonstration */}
      <section className="py-16">
        <VideoPlayer playbackId="..." />
      </section>

      {/* 3. Partner logos carousel */}
      <section className="py-12">
        <LogoCarousel logos={PARTNERS} autoplay />
      </section>

      {/* 4. Interactive feature tabs */}
      <section className="py-24">
        <SectionHeader
          title="Ask Ona to..."
          description="8 ways our ambient agents transform your workflow"
          alignment="center"
        />
        <TabbedCarousel features={FEATURE_DEMOS} />
      </section>

      {/* 5. Product pillars (Storyboard sections) */}
      <section className="py-24">
        {PRODUCT_PILLARS.map((pillar) => (
          <StoryboardSection
            key={pillar.id}
            title={pillar.title}
            description={pillar.description}
            backgroundImage={pillar.backgroundImage}
          />
        ))}
      </section>

      {/* 6. Integration showcase */}
      <section className="bg-muted/50 py-24">
        <SectionHeader
          title="Works with your favorite tools"
          alignment="center"
        />
        <IntegrationGrid integrations={INTEGRATIONS} columns={4} />

        {/* Compliance badges */}
        <div className="mt-12 flex justify-center gap-4">
          <ComplianceBadge certification="soc2" verified />
          <ComplianceBadge certification="iso27001" verified />
        </div>
      </section>

      {/* 7. Enterprise CTA */}
      <section className="py-24">
        <EnterpriseCTACard
          title="Ready for Enterprise?"
          description="Bank-grade security, dedicated support, and custom SLAs."
          features={['99.9% uptime SLA', '24/7 support', 'Custom integrations']}
          ctaText="Contact Sales"
          ctaLink="/enterprise"
        />
      </section>
    </>
  )
}
```

#### 4.2 Servicios Page (Rediseño)

**Archivos existentes**:
- `src/app/servicios/page.tsx` - Listado de servicios
- `src/app/servicios/[slug]/page.tsx` - Detalle de servicio

**Mejoras a implementar:**
- Mantener estructura de catálogo actual
- Mejorar visualización de service cards con estética ONA
- Agregar filtros o categorías visuales
- Integrar testimonials o social proof
- Mejorar páginas de detalle con imágenes de alta calidad

#### 4.3 Sobre Nosotros Page (Rediseño)

**Archivo existente**: `src/app/nosotros/page.tsx`

**Mejoras a implementar:**
- Hero con imagen de fondo estilo ONA
- Timeline de empresa o valores con StoryboardSection
- Team section mejorado
- Trust signals (certificaciones, partners)
- CTA hacia servicios o contacto

#### 4.4 Contacto Page (Mejoras)

**Archivo existente**: `src/app/contacto/page.tsx`

**Mejoras a implementar:**
- Hero más atractivo
- Form actual mantener (ya es bueno)
- Agregar información de contacto más visible
- Integrar mapa (opcional)
- Trust badges o testimonials

### 5. Datos y Configuración

#### 5.1 Nuevos archivos de datos a crear

```
src/lib/data/
├── partners.ts              # Partner/integration logos
├── feature-demos.ts         # Interactive feature demonstrations
├── product-pillars.ts       # Main product value propositions
├── integrations.ts          # Tool integrations grid
├── certifications.ts        # Compliance certifications
├── testimonials.ts          # Customer quotes
└── pricing-tiers.ts         # Pricing plans
```

**Ejemplo - partners.ts:**
```typescript
export interface Partner {
  name: string
  logo: string
  url: string
  category: 'ide' | 'vcs' | 'ci' | 'cloud'
}

export const PARTNERS: Partner[] = [
  {
    name: 'VS Code',
    logo: '/images/partners/vscode.svg',
    url: 'https://code.visualstudio.com',
    category: 'ide',
  },
  {
    name: 'Cursor',
    logo: '/images/partners/cursor.svg',
    url: 'https://cursor.sh',
    category: 'ide',
  },
  // ... 12+ more
]
```

**Ejemplo - feature-demos.ts:**
```typescript
export interface FeatureDemo {
  id: string
  title: string
  description: string
  demoContent: ReactNode | string
  icon: LucideIcon
}

export const FEATURE_DEMOS: FeatureDemo[] = [
  {
    id: 'debug-code',
    title: 'Debug code',
    description: 'Ona identifies and fixes bugs automatically',
    demoContent: <VideoPlayer playbackId="..." />,
    icon: Bug,
  },
  // ... 7 more features
]
```

**Ejemplo - product-pillars.ts:**
```typescript
export interface ProductPillar {
  id: string
  title: string
  description: string
  backgroundImage: string
  features: string[]
  cta: {
    text: string
    link: string
  }
}

export const PRODUCT_PILLARS: ProductPillar[] = [
  {
    id: 'agents',
    title: 'Agents: Your Personal Development Team',
    description: 'Ambient AI agents that autonomously write, test, and ship code.',
    backgroundImage: '/images/pillars/agents-hero.jpg',
    features: [
      'Write full features from natural language',
      'Fix bugs while you sleep',
      'Continuous code review',
    ],
    cta: { text: 'Learn about Agents', link: '/product/agents' },
  },
  // ... 2 more pillars
]
```

#### 5.2 Archivos de configuración a actualizar

**`src/lib/constants/navigation.ts`:**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  {
    label: 'Resources',
    href: '/resources',
    children: [                          // NUEVO - dropdown items
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs' },
      { label: 'Community', href: '/community' },
    ]
  },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Pricing', href: '/pricing' },
]

export const CONTACT_INFO = {
  // ... actualizar info de contacto
}
```

**Actualizar type:**
```typescript
// src/lib/types/index.ts
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]  // NUEVO - para dropdowns
}
```

### 6. Assets Necesarios

#### 6.1 Imágenes

```
public/images/
├── hero/
│   ├── hero-video-poster.jpg
│   └── hero-background.jpg
├── partners/
│   ├── vscode.svg
│   ├── cursor.svg
│   ├── vim.svg
│   ├── claude-code.svg
│   ├── github.svg
│   ├── gitlab.svg
│   ├── aws.svg
│   ├── azure.svg
│   ├── gcp.svg
│   └── [8-12 more logos]
├── pillars/
│   ├── agents-hero.jpg
│   ├── environments-hero.jpg
│   └── guardrails-hero.jpg
├── certifications/
│   ├── soc2.svg
│   ├── iso27001.svg
│   ├── gdpr.svg
│   └── hipaa.svg
└── features/
    ├── debug-demo.mp4
    ├── refactor-demo.mp4
    └── [6-8 more demo videos/images]
```

#### 6.2 Videos (Mux)

- Hero background video
- 8 feature demonstration videos
- Product pillar videos (optional)

**Nota**: Videos deben ser subidos a Mux y obtener playback IDs

### 7. Dependencias a Instalar

**Nuevas dependencias npm:**
```json
{
  "dependencies": {
    "@mux/mux-player-react": "^2.9.0",
    "@mux/upchunk": "^3.4.0",
    "embla-carousel-react": "^8.3.0",
    "embla-carousel-autoplay": "^8.3.0"
  }
}
```

**Comandos de instalación:**
```bash
npm install @mux/mux-player-react @mux/upchunk
npm install embla-carousel-react embla-carousel-autoplay
```

### 8. Migraciones y Consideraciones

#### 8.1 Estrategia de Migración

**Opción 1: Migración incremental**
1. Crear nueva rama `feature/ona-design`
2. Implementar sistema de colores primero
3. Crear componentes nuevos uno por uno
4. Modificar página home primero
5. Agregar páginas nuevas
6. Testing exhaustivo
7. Deploy gradual

**Opción 2: Rediseño completo**
1. Crear nueva rama `redesign/ona`
2. Implementar todos los componentes en paralelo
3. Crear todas las páginas nuevas
4. Testing completo
5. Deploy total (big bang)

**Recomendación**: Opción 1 (incremental) para minimizar riesgos

#### 8.2 Compatibilidad con Código Existente

**Componentes a deprecar (mantener temporalmente):**
- `src/components/products/*` - Reemplazar con service tiles
- `src/app/servicios/*` - Migrar a nueva estructura /solutions

**Componentes a mantener:**
- `src/components/ui/*` - Base sólida, solo modificar
- `src/components/forms/contact-form.tsx` - Reutilizable
- `src/components/providers/*` - Sin cambios

#### 8.3 Testing Requerido

**Unit Tests (Vitest):**
- Nuevos componentes: VideoPlayer, LogoCarousel, TabbedCarousel
- Modificados: Hero, Header, Footer
- Schemas de datos: partners.ts, feature-demos.ts

**E2E Tests (Playwright):**
- Hero video playback
- Tab navigation en feature carousel
- Partner logo carousel autoplay
- Form submissions
- Navigation dropdown menus
- Dark mode toggle

**Nuevos archivos de test:**
```
e2e/
├── video-player.spec.ts
├── logo-carousel.spec.ts
├── tabbed-carousel.spec.ts
├── navigation-dropdown.spec.ts
└── enterprise-flow.spec.ts
```

### 9. Performance Considerations

#### 9.1 Optimizaciones Necesarias

**Lazy loading:**
```typescript
// src/app/page.tsx
const VideoPlayer = dynamic(() => import('@/components/media/video-player'), {
  loading: () => <div>Loading video...</div>,
  ssr: false,
})

const TabbedCarousel = dynamic(() => import('@/components/features/tabbed-carousel'), {
  loading: () => <div>Loading...</div>,
})
```

**Image optimization:**
- Usar Next.js Image component para todos los logos
- Implementar blur placeholders
- Responsive image sizes

**Video optimization:**
- Mux automáticamente optimiza videos
- Configurar autoplay con preload="metadata"
- Lazy load videos fuera del viewport

#### 9.2 Bundle Size Impact

**Estimación de aumento:**
- Mux Player: ~120KB (gzipped)
- Embla Carousel: ~15KB (gzipped)
- Nuevos componentes: ~30-40KB (estimado)
- **Total adicional**: ~165-175KB

**Mitigación:**
- Code splitting por ruta
- Lazy loading de features pesadas
- Tree shaking de lucide-react icons

### 10. SEO Considerations

#### 10.1 Metadata Updates

**Archivo**: `src/app/layout.tsx:25-53`

**Actualizar metadata:**
```typescript
export const metadata: Metadata = {
  title: {
    default: 'ONA - Your Personal Development Team',
    template: '%s | ONA',
  },
  description: 'Ambient AI agents that write code, fix bugs, and ship features autonomously. Enterprise-grade development automation.',
  keywords: ['AI agents', 'development automation', 'code generation', 'devops'],
  // ... rest
}
```

#### 10.2 Structured Data

**Nuevo archivo**: `src/app/structured-data.tsx`

**Schema.org markup para:**
- Organization
- Product
- SoftwareApplication
- Review/Rating (si hay testimonials)

## Code References

### Archivos Principales a Modificar

**Sistema de Colores:**
- `src/app/globals.css:46-159` - Sistema de colores completo
- `src/lib/theme/palettes.ts:59-114` - Nuevo palette ONA
- `src/lib/constants/theme-config.ts:29-40` - Configuración activa de tema

**Componentes:**
- `src/components/layout/hero.tsx:11-38` - Hero con video/imagen background
- `src/components/layout/footer.tsx:8-73` - Mejoras visuales en footer
- `src/components/layout/features-section.tsx:16-50` - Variantes de visualización
- `src/components/ui/button.tsx:7-35` - Nuevas variantes de tamaño
- `src/components/ui/card.tsx:5-76` - Variantes adicionales

**Páginas:**
- `src/app/page.tsx:5-136` - Rediseño completo de home page
- `src/app/servicios/page.tsx` - Mejoras visuales
- `src/app/nosotros/page.tsx` - Hero mejorado + storytelling
- `src/app/contacto/page.tsx` - Hero mejorado

**Opcionales:**
- `src/app/layout.tsx:77-82` - Integración de announcement banner (opcional)

**⚠️ NO MODIFICAR:**
- ❌ `src/lib/constants/navigation.ts:3-20` - Mantener navegación actual
- ❌ `src/components/layout/header.tsx:13-62` - Solo ajustes CSS mínimos

### Nuevos Archivos a Crear

**Componentes Core:**
- `src/components/media/video-player.tsx` - Player de video (HTML5 o Mux)
- `src/components/showcase/logo-carousel.tsx` - Carrusel de partners
- `src/components/showcase/integration-grid.tsx` - Grid de integraciones
- `src/components/layout/section-header.tsx` - Headers de sección
- `src/components/ui/cta-button-pair.tsx` - Par de CTAs estandarizado
- `src/components/layout/storyboard-section.tsx` - Secciones con background
- `src/components/layout/announcement-banner.tsx` - Banner (opcional)

**Componentes Avanzados:**
- `src/components/features/tabbed-carousel.tsx` - Feature demos con tabs
- `src/components/features/feature-tab.tsx` - Tab individual
- `src/components/features/feature-content.tsx` - Contenido de feature
- `src/components/features/feature-icon-box.tsx` - Box con icono
- `src/components/ui/compliance-badge.tsx` - Badges de certificaciones (opcional)
- `src/components/cta/enterprise-cta-card.tsx` - CTA card especial (opcional)

**Datos:**
- `src/lib/data/partners.ts` - Logos de partners/tecnologías
- `src/lib/data/feature-demos.ts` - Demos de features interactivos
- `src/lib/data/product-pillars.ts` - Pilares de valor (3-4)
- `src/lib/data/integrations.ts` - Integraciones de herramientas
- `src/lib/data/testimonials.ts` - Testimonios (opcional)

**Tests:**
- `e2e/video-player.spec.ts` - Test de video player
- `e2e/logo-carousel.spec.ts` - Test de carrusel
- `e2e/tabbed-carousel.spec.ts` - Test de tabs
- `e2e/home-redesign.spec.ts` - Test de home page rediseñada

**⚠️ NO CREAR:**
- ❌ Páginas nuevas (product, solutions, enterprise, pricing)
- ❌ `src/lib/data/pricing-tiers.ts` - No necesario
- ❌ `src/lib/data/certifications.ts` - Usar inline en badge component
- ❌ `e2e/navigation-dropdown.spec.ts` - No hay dropdowns
- ❌ `e2e/enterprise-flow.spec.ts` - No hay flujo enterprise

## Architecture Insights

### Patrones Arquitectónicos Identificados

1. **Component Composition**
   - ONA usa composición pesada de componentes pequeños
   - Cada sección es independiente y reutilizable
   - Pattern "Container/Content" muy prominente

2. **Data-Driven UI**
   - Todo el contenido viene de archivos de datos centralizados
   - Fácil de actualizar sin tocar componentes
   - Separación clara entre contenido y presentación

3. **Progressive Enhancement**
   - Funcionalidad core sin JavaScript
   - Enhancements progresivos (videos, carruseles)
   - Fallbacks para todos los features interactivos

4. **Design System First**
   - Sistema de colores centralizado y reutilizable
   - Componentes base exhaustivos antes de features
   - Theming completo desde el inicio

5. **Performance-Oriented**
   - Code splitting por ruta
   - Lazy loading de componentes pesados
   - Image optimization automática
   - Video optimization via Mux

### Decisiones de Diseño de ONA

1. **Enterprise Positioning**
   - Énfasis en seguridad y compliance
   - Testimonios y social proof prominentes
   - Pricing transparente pero con tier enterprise

2. **Developer Experience**
   - IDE integration como feature principal
   - Demos interactivos de producto
   - Documentación accesible desde nav principal

3. **Visual Hierarchy**
   - Mucho white space
   - Colores sobrios y profesionales
   - Tipografía grande y bold para headlines
   - CTAs claros y destacados

4. **Trust Building**
   - Logos de partners prominentes
   - Certificaciones visibles
   - Testimonios de clientes conocidos

### Comparación Arquitectónica

**SolutiveMind (Actual):**
- SMB-focused
- Simple 4-page structure
- Product catalog approach
- Spanish language
- Argentina market

**ONA (Target):**
- Enterprise-focused
- Complex multi-page structure
- SaaS platform approach
- English language
- Global market

**Key Differences:**
- Complejidad: Simple → Complejo
- Target: PyMES → Enterprise
- Features: Catálogo estático → Demos interactivos
- Messaging: Servicios → Producto SaaS

## Historical Context (from thoughts/)

No hay documentación histórica previa en el directorio `thoughts/` relacionada con este proyecto. Este es el primer documento de research para el rediseño basado en ONA.com.

## Related Research

No hay documentos de research previos en `thoughts/shared/research/` relacionados con este tema.

## Open Questions

### Respondidas ✅

2. **Migración de Contenido** - ✅ **RESPONDIDA**
   - **Decisión**: Mantener estructura actual de "Servicios"
   - No migrar a nueva estructura, solo mejorar visualización
   - **Implicación**: Mantener SEO y URLs existentes intactos

3. **Branding** - ✅ **RESPONDIDA**
   - **Decisión**: Mantener nombre SolutiveMind
   - No cambiar identidad de marca
   - Solo adoptar estética visual de ONA

4. **Backend Requirements** - ✅ **RESPONDIDA**
   - **Decisión**: No necesita backend adicional por ahora
   - Contenido estático suficiente
   - Form de contacto actual es suficiente

5. **Internacionalización** - ✅ **RESPONDIDA**
   - **Decisión**: Mantener solo español
   - No implementar sistema i18n por ahora
   - Priorizar mercado Argentina

6. **Analytics** - ✅ **RESPONDIDA**
   - **Decisión**: No implementar analytics avanzado por ahora
   - Mantener analytics básico actual
   - No tracking especial de interacciones

7. **Authentication** - ✅ **RESPONDIDA**
   - **Decisión**: No implementar sistema de autenticación
   - No necesario para sitio informativo
   - Sin complejidad adicional

8. **CMS Integration** - ✅ **RESPONDIDA**
   - **Decisión**: Contenido estático, sin CMS
   - Actualización de contenido vía código (archivo de datos)
   - Workflow simple y directo

### Pendientes ⚠️

1. **Mux vs. Alternativas** - ⚠️ **PENDIENTE DE DECISIÓN**
   - **Opciones evaluadas**:
     - **Mux**: Profesional, CDN global, analytics, pero costoso (~$50-100/mes base)
     - **HTML5 nativo + Hosting propio**: Gratis pero sin CDN optimizado
     - **Cloudflare Stream**: Pricing más bajo que Mux (~$1/1000 minutos)
     - **YouTube embeds**: Gratis pero menos control, branding de YouTube
     - **Vimeo Pro**: ~$20/mes, buen balance
   - **Recomendación**: Empezar con HTML5 nativo + video local, migrar a Cloudflare Stream si necesita CDN
   - **Implicación**: Costos mensuales de hosting de video vs. performance

## Next Steps

**Rama actual**: `new-design-ona-com` (ya creada)
**Estrategia**: Migración incremental (Opción 1)

### Plan de Implementación por Fases

**0. Decisiones Pendientes**
   - ✅ Decidir solución de video (Mux vs. HTML5 vs. Cloudflare Stream)
   - Aprobar paleta de colores ONA
   - Definir prioridad de componentes

**1. Setup Inicial** (1-2 días)
   - Instalar dependencias base (embla-carousel)
   - Decidir e instalar solución de video si necesaria
   - Crear estructura de directorios para nuevos componentes

**2. Fase 1: Design System** (3-4 días)
   - Implementar nuevo sistema de colores (onaPalette)
   - Actualizar componentes base (Button, Card)
   - Testing de dark mode con nuevos colores
   - Ajustar tipografía y spacing global

**3. Fase 2: Componentes Core** (5-7 días)
   - VideoPlayer component (o alternativa)
   - LogoCarousel component
   - SectionHeader component
   - CTAButtonPair component
   - Testing de cada componente

**4. Fase 3: Componentes Avanzados** (5-7 días)
   - TabbedCarousel component
   - IntegrationGrid component
   - StoryboardSection component
   - ComplianceBadge component (opcional)
   - FeatureIconBox component
   - Testing completo

**5. Fase 4: Layouts** (3-4 días)
   - Modificar Hero con soporte para video/imagen background
   - Mejorar Footer visualmente (mantener columnas actuales)
   - Refinamiento visual de Header (sin cambios estructurales)
   - AnnouncementBanner (opcional)

**6. Fase 5: Páginas - Rediseño Incremental** (8-10 días)
   - **Home page** (3-4 días): Rediseño completo con nuevos componentes
   - **Servicios** (2-3 días): Mejorar cards y layout
   - **Sobre Nosotros** (2 días): Hero mejorado + storyboard sections
   - **Contacto** (1 día): Hero mejorado, mantener form
   - Testing E2E de cada página después del rediseño

**7. Fase 6: Content & Assets** (3-4 días)
   - Crear archivos de datos (partners, features, testimonials)
   - Obtener/crear assets (imágenes, videos)
   - Optimizar imágenes para web
   - Upload de videos si necesario

**8. Fase 7: Polish & Testing** (3-4 días)
   - Performance optimization (lazy loading, code splitting)
   - Accessibility audit (WCAG 2.1 AA)
   - Cross-browser testing (Chrome, Firefox, Safari, Edge)
   - Mobile responsiveness validation
   - SEO validation (metadata, structured data)
   - Lighthouse audit

**9. Fase 8: Deployment** (1-2 días)
   - Merge a main branch
   - Staging deployment
   - QA completo en staging
   - Production deployment
   - Monitoreo post-deploy

**Tiempo total estimado: 3-4 semanas** (asumiendo 1 desarrollador full-time)

### Milestones Clave

- ✅ **Milestone 1**: Design system implementado y testeado
- ✅ **Milestone 2**: Todos los componentes core creados
- ✅ **Milestone 3**: Home page rediseñada
- ✅ **Milestone 4**: Todas las páginas actualizadas
- ✅ **Milestone 5**: En producción con monitoreo activo

## Summary of Files

### Archivos a MODIFICAR (9 totales):

**Sistema de Colores:**
1. `src/app/globals.css` - Sistema de colores OKLCH completo
2. `src/lib/theme/palettes.ts` - Nuevo onaPalette
3. `src/lib/constants/theme-config.ts` - Config de tema activo

**Componentes de Layout:**
4. `src/components/layout/hero.tsx` - Soporte para video/imagen background
5. `src/components/layout/footer.tsx` - Mejoras visuales (mantener estructura)
6. `src/components/layout/features-section.tsx` - Variantes de visualización

**Componentes UI:**
7. `src/components/ui/button.tsx` - Nuevas variantes de tamaño (xl, 2xl)
8. `src/components/ui/card.tsx` - Variantes visuales adicionales

**Páginas:**
9. `src/app/page.tsx` - Rediseño completo de home
10. `src/app/servicios/page.tsx` - Mejoras visuales
11. `src/app/nosotros/page.tsx` - Hero mejorado + storytelling
12. `src/app/contacto/page.tsx` - Hero mejorado

**⚠️ NO MODIFICAR:**
- ❌ `src/lib/constants/navigation.ts` - Mantener navegación actual
- ❌ `src/components/layout/header.tsx` - Solo ajustes visuales mínimos

### Archivos a CREAR (22 totales):

**Componentes Core (7):**
1. `src/components/media/video-player.tsx` - Player de video (HTML5 o Mux)
2. `src/components/showcase/logo-carousel.tsx` - Carrusel de partners
3. `src/components/showcase/integration-grid.tsx` - Grid de integraciones
4. `src/components/layout/section-header.tsx` - Headers de sección reutilizables
5. `src/components/ui/cta-button-pair.tsx` - Par de CTAs estandarizado
6. `src/components/layout/storyboard-section.tsx` - Secciones con imagen de fondo
7. `src/components/layout/announcement-banner.tsx` - Banner de anuncios (opcional)

**Componentes Avanzados (6):**
8. `src/components/features/tabbed-carousel.tsx` - Feature demos con tabs
9. `src/components/features/feature-tab.tsx` - Tab individual
10. `src/components/features/feature-content.tsx` - Contenido de feature
11. `src/components/features/feature-icon-box.tsx` - Box con icono destacado
12. `src/components/ui/compliance-badge.tsx` - Badges de certificaciones (opcional)
13. `src/components/cta/enterprise-cta-card.tsx` - CTA card especial (opcional)

**Datos (5):**
14. `src/lib/data/partners.ts` - Logos de partners/tecnologías
15. `src/lib/data/feature-demos.ts` - Demos de features interactivos
16. `src/lib/data/product-pillars.ts` - Pilares de valor (3-4)
17. `src/lib/data/integrations.ts` - Integraciones de herramientas
18. `src/lib/data/testimonials.ts` - Testimonios de clientes (opcional)

**Tests (4):**
19. `e2e/video-player.spec.ts` - Test de video player
20. `e2e/logo-carousel.spec.ts` - Test de carrusel
21. `e2e/tabbed-carousel.spec.ts` - Test de tabs
22. `e2e/home-redesign.spec.ts` - Test de home page rediseñada

**⚠️ NO CREAR:**
- ❌ Páginas nuevas (product, solutions, enterprise, pricing)
- ❌ pricing-tiers.ts (no necesario sin página de pricing)
- ❌ navigation-dropdown.spec.ts (no hay dropdowns)
- ❌ enterprise-flow.spec.ts (no hay flujo enterprise)

### Assets Necesarios:

**Imágenes (~25-30 archivos):**
- `public/images/hero/` (2 archivos)
- `public/images/partners/` (12-15 archivos)
- `public/images/pillars/` (3 archivos)
- `public/images/certifications/` (4 archivos)
- `public/images/features/` (8-10 archivos)

**Videos (Mux hosting):**
- 1 hero video
- 8 feature demo videos
- 3 product pillar videos (opcional)

### Dependencias npm:

**Esenciales:**
```json
{
  "embla-carousel-react": "^8.3.0",
  "embla-carousel-autoplay": "^8.3.0"
}
```

**Opcionales (según decisión de video):**
```json
{
  "@mux/mux-player-react": "^2.9.0",  // Solo si se elige Mux
  "@mux/upchunk": "^3.4.0"            // Solo si se elige Mux
}
```

---

## Conclusión

Este documento proporciona una hoja de ruta completa y **actualizada** para implementar el diseño de ONA.com en el proyecto SolutiveMind. La implementación se ha simplificado significativamente:

### Resumen Actualizado:

**Alcance Reducido:**
- ✅ Sin páginas nuevas - Rediseñar 4 páginas existentes
- ✅ Sin modificación de navegación - Mantener estructura actual
- ✅ Sin backend adicional - Contenido estático
- ✅ Sin autenticación ni CMS
- ✅ Sin internacionalización
- ✅ Migración incremental en rama existente `new-design-ona-com`

**Estimaciones:**
- **Tiempo estimado**: 3-4 semanas (1 desarrollador full-time)
- **Complejidad**: Media-Alta (nuevos componentes visuales, integración de video, refinamiento de páginas)
- **Riesgo**: Medio (cambios mayormente visuales, sin cambios arquitectónicos drásticos)
- **Beneficio**: Alto (diseño enterprise-grade, mejor UX, estética moderna)

**Archivos afectados:**
- 12 archivos a modificar (colores, componentes, páginas)
- 22 archivos nuevos a crear (componentes, datos, tests)
- Total: ~34 archivos

**Decisión pendiente crítica:**
- ⚠️ Elegir solución de video (Mux, HTML5 nativo, Cloudflare Stream, YouTube, Vimeo)
- Recomendación: Empezar con HTML5 nativo, migrar a Cloudflare Stream si necesita CDN

**Estrategia confirmada:**
- ✅ Migración incremental por fases
- ✅ Testing continuo después de cada fase
- ✅ Deploy gradual para minimizar riesgos

**Próximo paso inmediato**: Decidir solución de video y comenzar Fase 1 (Design System)
