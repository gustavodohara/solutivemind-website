# Fase 6: Páginas Adicionales

## Overview

Crear las páginas complementarias del sitio: Home (landing page), Sobre Nosotros, y página 404 personalizada. Estas páginas completan la experiencia del usuario y proveen información importante sobre la empresa.

## Current State

- Todas las features principales funcionando (layout, productos, contacto)
- Página de inicio temporal existe pero es muy básica
- No existe página "Sobre Nosotros"
- Página 404 usa el default de Next.js

## Desired End State

Sitio web completo con:
- Landing page profesional con hero section, features, CTA
- Página "Sobre Nosotros" con información de la empresa
- Página 404 personalizada y útil
- Todas las páginas responsive y con buen SEO
- Contenido en español y profesional

### Verification:
- Landing page atractiva en `/`
- Página sobre nosotros en `/nosotros`
- 404 personalizada al navegar a ruta inexistente
- Todas las páginas responsive
- Buena navegación entre páginas

## What We're NOT Doing

- No creamos blog (puede agregarse después)
- No implementamos testimonios/reviews (se agrega con datos reales)
- No agregamos equipo/staff (se agrega cuando esté definido)
- No creamos múltiples landing pages
- No implementamos A/B testing

## Implementation Approach

Crearemos páginas estáticas usando componentes shadcn/ui reutilizables, con contenido placeholder profesional que puede ser reemplazado fácilmente. Usaremos Framer Motion para animaciones sutiles que mejoren la experiencia.

---

## Step 1: Crear Hero Component Reutilizable

### Archivo: `src/components/layout/hero.tsx`

```typescript
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode
  className?: string
}

export function Hero({ title, description, actions, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 md:py-28',
        className
      )}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {typeof title === 'string' ? (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
          ) : (
            title
          )}

          {typeof description === 'string' ? (
            <p className="text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          ) : (
            description
          )}

          {actions && <div className="flex flex-wrap justify-center gap-4">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores

---

## Step 2: Crear Features Section Component

### Archivo: `src/components/layout/features-section.tsx`

```typescript
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
}

export function FeaturesSection({ title, description, features }: FeaturesSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {(title || description) && (
          <div className="mx-auto max-w-2xl text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores

---

## Step 3: Actualizar Landing Page (Home)

### Archivo: `src/app/page.tsx`

```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { FeaturesSection } from '@/components/layout/features-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
    title: 'Automatización Inteligente',
    description:
      'Implementamos soluciones que automatizan tareas repetitivas, liberando tiempo para actividades estratégicas.',
  },
  {
    icon: TrendingUp,
    title: 'Optimización de Procesos',
    description:
      'Analizamos y mejoramos tus procesos actuales para maximizar eficiencia y resultados.',
  },
  {
    icon: Shield,
    title: 'Soluciones Confiables',
    description:
      'Tecnología robusta y probada que garantiza continuidad y seguridad en tus operaciones.',
  },
  {
    icon: Clock,
    title: 'Ahorro de Tiempo',
    description:
      'Reduce drásticamente el tiempo dedicado a tareas manuales y repetitivas.',
  },
  {
    icon: Users,
    title: 'Soporte Continuo',
    description:
      'Acompañamiento permanente para asegurar el éxito de tu transformación digital.',
  },
  {
    icon: Sparkles,
    title: 'Innovación Constante',
    description:
      'Utilizamos las últimas tecnologías para mantener tu negocio a la vanguardia.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={
          <>
            Transforma tu negocio con{' '}
            <span className="text-primary">automatización inteligente</span>
          </>
        }
        description="Optimiza procesos, reduce costos y aumenta la productividad de tu empresa con nuestras soluciones de automatización a medida."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/servicios">Ver Servicios</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contacto">Contactar</Link>
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <FeaturesSection
        title="¿Por qué elegirnos?"
        description="Soluciones completas de automatización diseñadas para impulsar tu negocio"
        features={features}
      />

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-16 md:py-24">
        <div className="container">
          <Card className="mx-auto max-w-3xl border-2">
            <CardHeader className="text-center">
              <Badge className="mx-auto w-fit mb-4">Comenzá Hoy</Badge>
              <CardTitle className="text-3xl sm:text-4xl">
                ¿Listo para optimizar tu negocio?
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Contáctanos para una consulta gratuita y descubre cómo la
                automatización puede transformar tu empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contacto">Solicitar Consulta</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/nosotros">Conocer Más</Link>
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
- [x] Página compila sin errores
- [x] `npm run build` exitoso

#### Manual Verification:
- [x] Landing page se ve profesional
- [x] Todas las secciones visibles
- [x] CTAs funcionan correctamente
- [x] Responsive en mobile

---

## Step 4: Crear Página "Sobre Nosotros"

### Archivo: `src/app/nosotros/page.tsx`

```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/layout/hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - SolutiveMind',
  description:
    'Conoce más sobre SolutiveMind y nuestro compromiso con la transformación digital empresarial.',
}

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <Hero
        title="Sobre SolutiveMind"
        description="Impulsamos la transformación digital de empresas a través de soluciones de automatización inteligente."
        className="py-16 md:py-20"
      />

      {/* Main Content */}
      <section className="py-16 border-t">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Who We Are */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">¿Quiénes somos?</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  SolutiveMind es una empresa especializada en servicios de automatización
                  empresarial. Ayudamos a organizaciones a optimizar sus procesos,
                  reducir costos operativos y aumentar la productividad mediante la
                  implementación de soluciones tecnológicas innovadoras.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nuestro enfoque se centra en entender las necesidades específicas de cada
                  cliente para diseñar e implementar soluciones a medida que generen
                  resultados tangibles y sostenibles en el tiempo.
                </p>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid gap-6 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transformar empresas mediante automatización inteligente que genere
                    valor real y sostenible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ser líderes en soluciones de automatización que impulsen la
                    transformación digital empresarial.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Innovación, excelencia, compromiso con el cliente y resultados
                    medibles.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">¿Qué hacemos?</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ofrecemos servicios completos de automatización empresarial que incluyen:
                </p>
                <ul className="text-lg text-muted-foreground space-y-2">
                  <li>Análisis y diagnóstico de procesos actuales</li>
                  <li>Diseño de soluciones de automatización personalizadas</li>
                  <li>Implementación de tecnologías de vanguardia</li>
                  <li>Integración con sistemas existentes</li>
                  <li>Capacitación y acompañamiento continuo</li>
                  <li>Soporte y optimización permanente</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-lg border-2 bg-muted/50 p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">¿Listo para comenzar?</h3>
              <p className="text-muted-foreground">
                Descubre cómo podemos ayudarte a transformar tu negocio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/servicios">Ver Servicios</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Página compila sin errores
- [x] `npm run build` exitoso

#### Manual Verification:
- [x] Navegar a `/nosotros` muestra la página
- [x] Contenido bien estructurado
- [x] Cards de misión/visión/valores visibles
- [x] CTAs funcionan

---

## Step 5: Crear Página 404 Personalizada

### Archivo: `src/app/not-found.tsx`

```typescript
import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-20">
      <div className="mx-auto max-w-md text-center space-y-6">
        {/* 404 Large Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-20 w-20 text-muted-foreground/40" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Página no encontrada</h2>
          <p className="text-lg text-muted-foreground">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver Atrás
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">O visita:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/servicios" className="text-primary hover:underline">
              Servicios
            </Link>
            <Link href="/nosotros" className="text-primary hover:underline">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="text-primary hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [x] Navegar a ruta inexistente muestra 404 personalizada
- [x] Botón "Ir al Inicio" funciona
- [x] Botón "Volver Atrás" funciona
- [x] Quick links funcionan

---

## Step 6: Mejorar Metadata y SEO Global

### Actualizar: `src/app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://solutivemind.com'), // Cambiar por tu dominio real
  title: {
    default: 'SolutiveMind - Servicios de Automatización Empresarial',
    template: '%s | SolutiveMind',
  },
  description:
    'Transformamos tu negocio con soluciones de automatización inteligente. Optimiza procesos, reduce costos y aumenta la productividad.',
  keywords: [
    'automatización empresarial',
    'transformación digital',
    'optimización de procesos',
    'servicios automatizados',
    'consultoría tecnológica',
  ],
  authors: [{ name: 'SolutiveMind' }],
  creator: 'SolutiveMind',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://solutivemind.com',
    siteName: 'SolutiveMind',
    title: 'SolutiveMind - Servicios de Automatización Empresarial',
    description:
      'Transformamos tu negocio con soluciones de automatización inteligente.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolutiveMind - Servicios de Automatización Empresarial',
    description:
      'Transformamos tu negocio con soluciones de automatización inteligente.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}
```

### Success Criteria:

#### Automated Verification:
- [x] Metadata compila sin errores

#### Manual Verification:
- [x] View page source muestra metadata correcta
- [x] OpenGraph tags presentes

---

## Step 7: Crear Sitemap

### Archivo: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solutivemind.com' // Cambiar por tu dominio

  const products = getAllProducts()

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/servicios/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...productUrls,
  ]
}
```

### Success Criteria:

#### Manual Verification:
- [x] Navegar a `/sitemap.xml` muestra el sitemap
- [x] Todas las páginas listadas

---

## Step 8: Crear robots.txt

### Archivo: `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://solutivemind.com' // Cambiar por tu dominio

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/theme-demo/'], // Páginas de desarrollo
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Success Criteria:

#### Manual Verification:
- [x] Navegar a `/robots.txt` muestra el archivo
- [x] Sitemap URL presente

---

## Testing Strategy

### Manual Testing Checklist:

#### Home Page (`/`):
- [x] Hero section atractiva
- [x] Features grid (6 items, 3 columnas)
- [x] CTA section visible
- [x] Todos los botones funcionan
- [x] Responsive (mobile: 1 col, tablet: 2 cols, desktop: 3 cols)

#### Sobre Nosotros (`/nosotros`):
- [x] Hero section
- [x] Contenido "¿Quiénes somos?" visible
- [x] Cards de misión/visión/valores (3 columnas desktop)
- [x] Sección "¿Qué hacemos?" con lista
- [x] CTA final funciona
- [x] Responsive

#### 404 Page:
- [x] Navegar a `/pagina-inexistente` muestra 404
- [x] Gran "404" con ícono
- [x] Mensaje claro
- [x] Botón "Ir al Inicio" funciona
- [x] Botón "Volver Atrás" funciona
- [x] Quick links funcionan

#### SEO:
- [x] Cada página tiene título único
- [x] Meta descriptions presentes
- [x] OpenGraph tags en HTML
- [x] `/sitemap.xml` accesible
- [x] `/robots.txt` accesible

#### Navigation:
- [x] Todos los links del header funcionan
- [x] Todos los links del footer funcionan
- [x] Links internos entre páginas funcionan

### Automated Testing:
```bash
npm run build    # Verificar compilación
npm run lint     # Code quality
```

---

## Performance Considerations

- Hero sections usan gradients CSS (no imágenes)
- Components lazy-loaded cuando es apropiado
- Sitemap generado estáticamente en build time
- Metadata pre-renderizada para SEO

---

## Accessibility Considerations

- Headings hierarchy correcta (h1 → h2 → h3)
- Semantic HTML (section, nav, main, footer)
- Botones con labels descriptivos
- Links con texto significativo
- Color contrast adecuado

---

## Content Guidelines

El contenido placeholder puede ser reemplazado editando:
- `src/app/page.tsx` - Home content
- `src/app/nosotros/page.tsx` - About content
- `src/lib/constants/navigation.ts` - Contact info

Mantener:
- Tono profesional pero accesible
- Enfoque en beneficios para el cliente
- Llamados a acción claros
- Contenido en español argentino

---

## Future Enhancements

Cuando haya más contenido:
- Blog/Noticias
- Casos de éxito / Portfolio
- Testimonios de clientes
- Equipo / Staff
- FAQ section
- Recursos descargables

---

## References

- Next.js Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js Sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js Robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 7: Optimizaciones y Deploy** (`phase-7-optimizaciones-deploy.md`)
