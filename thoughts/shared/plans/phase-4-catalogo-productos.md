# Fase 4: Catálogo de Productos

## Overview

Implementar el sistema de productos con datos mock, componentes de visualización (ProductCard, ProductDetail), y las páginas necesarias para mostrar el catálogo. Inicialmente con un solo producto (servicios automatizados), preparado para escalar a múltiples productos.

## Current State

- Layout completo funcionando (Header, Footer, WhatsApp)
- Sistema de temas implementado
- Tipos TypeScript definidos para Product
- No hay datos de productos
- No hay componentes de visualización de productos

## Desired End State

Un catálogo de productos funcional con:
- Datos mock de al menos un producto (Servicios Automatizados)
- Página de listado de servicios (`/servicios`)
- Página de detalle de producto individual (`/servicios/[slug]`)
- Componentes reutilizables (ProductCard, ProductGrid, ProductDetail)
- Imágenes placeholder/mock
- Diseño responsive y atractivo

### Verification:
- Navegar a `/servicios` muestra la lista de productos
- Click en un producto navega a su página de detalle
- Página de detalle muestra información completa
- Todo funciona en mobile y desktop
- Imágenes se cargan correctamente

## What We're NOT Doing

- No implementamos filtros/búsqueda (se agrega cuando haya más productos)
- No agregamos paginación (no necesario con 1 producto)
- No implementamos sistema de reviews/ratings
- No creamos CMS para gestionar productos
- No agregamos carrito de compras (fuera de alcance)

## Implementation Approach

Crearemos datos mock en archivos TypeScript, componentes de visualización usando shadcn/ui, y páginas dinámicas usando App Router de Next.js 15. Las imágenes serán placeholders hasta tener assets reales.

---

## Step 1: Crear Datos Mock de Productos

### Archivo: `src/lib/data/products.ts`

```typescript
import { Product } from '@/lib/types'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Servicios de Automatización Empresarial',
    slug: 'servicios-automatizacion-empresarial',
    description: `Transformamos tu negocio con soluciones de automatización inteligente diseñadas para optimizar procesos, reducir costos y aumentar la productividad.

Nuestros servicios incluyen análisis detallado de tus procesos actuales, diseño de flujos de trabajo automatizados, implementación de soluciones tecnológicas de vanguardia, y soporte continuo para garantizar el éxito de tu transformación digital.

Trabajamos con las últimas tecnologías en automatización, inteligencia artificial, y análisis de datos para crear soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa.`,
    shortDescription:
      'Optimiza tu negocio con automatización inteligente. Reducí costos, aumentá productividad y transformá tus procesos empresariales.',
    price: 0, // Precio a consultar
    currency: 'ARS',
    images: [
      '/images/products/automation-1.jpg',
      '/images/products/automation-2.jpg',
      '/images/products/automation-3.jpg',
    ],
    category: 'Automatización',
    features: [
      'Análisis y diagnóstico de procesos actuales',
      'Diseño de flujos de trabajo optimizados',
      'Implementación de soluciones a medida',
      'Integración con sistemas existentes',
      'Capacitación del equipo',
      'Soporte y mantenimiento continuo',
      'Reportes y análisis de resultados',
      'Escalabilidad garantizada',
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
```

### Success Criteria:

#### Automated Verification:
- [x] Archivo se importa sin errores TypeScript
- [x] Helper functions funcionan correctamente

---

## Step 2: Crear Imágenes Placeholder

### Comando para crear directorio:

```bash
mkdir -p public/images/products
```

### Crear archivos placeholder temporales:

Para desarrollo, podemos usar servicios de placeholder o crear SVGs simples.

**Opción 1: Usar placeholder service** (automático en img tags)

**Opción 2: Crear SVG placeholder**

**Archivo**: `public/images/products/placeholder.svg`

```svg
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#e2e8f0"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#64748b" text-anchor="middle" dominant-baseline="middle">
    Imagen de Producto
  </text>
</svg>
```

### Actualizar producto mock para usar placeholder:

```typescript
images: [
  '/images/products/placeholder.svg',
  '/images/products/placeholder.svg',
  '/images/products/placeholder.svg',
],
```

### Success Criteria:

#### Manual Verification:
- [x] Directorio de imágenes existe
- [x] Placeholder SVG se puede ver en navegador

---

## Step 3: Crear Componente ProductCard

### Archivo: `src/components/products/product-card.tsx`

```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Precio a consultar'
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
    }).format(price)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader>
        {/* Category Badge */}
        <Badge className="w-fit mb-2">{product.category}</Badge>

        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
          <Button asChild>
            <Link href={`/servicios/${product.slug}`}>
              Ver más
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores TypeScript

#### Manual Verification:
- [x] Card muestra imagen, título, descripción y precio correctamente

---

## Step 4: Crear Componente ProductGrid

### Archivo: `src/components/products/product-grid.tsx`

```typescript
import { Product } from '@/lib/types'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-muted-foreground">
          No se encontraron servicios disponibles.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores

---

## Step 5: Crear Página de Listado de Servicios

### Archivo: `src/app/servicios/page.tsx`

```typescript
import { Metadata } from 'next'
import { getAllProducts } from '@/lib/data/products'
import { ProductGrid } from '@/components/products/product-grid'

export const metadata: Metadata = {
  title: 'Servicios - SolutiveMind',
  description: 'Descubre nuestros servicios de automatización empresarial',
}

export default function ServiciosPage() {
  const products = getAllProducts()

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Nuestros Servicios</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Descubre cómo nuestros servicios de automatización pueden transformar tu negocio,
          optimizar procesos y aumentar la productividad de tu equipo.
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Página compila sin errores
- [x] `npm run build` exitoso

#### Manual Verification:
- [x] Navegar a `/servicios` muestra la página
- [x] Grid de productos se muestra correctamente
- [x] Responsive funciona (1 col mobile, 2 tablet, 3 desktop)

---

## Step 6: Crear Componente ProductDetail

### Archivo: `src/components/products/product-detail.tsx`

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check, MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/navigation'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const formatPrice = (price: number) => {
    if (price === 0) return 'Precio a consultar'
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
    }).format(price)
  }

  const handleContactWhatsApp = () => {
    const message = `Hola! Me interesa obtener más información sobre: ${product.name}`
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[selectedImage]}
            alt={`${product.name} - imagen ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video overflow-hidden rounded-md border-2 transition-all ${
                  selectedImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-muted-foreground'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 16vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Badge>{product.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-slate dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Características incluidas:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleContactWhatsApp}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Consultar por WhatsApp
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Contáctanos para recibir una cotización personalizada
          </p>
        </div>

        {/* Stock Status */}
        {product.inStock ? (
          <Badge variant="outline" className="w-fit">
            Disponible
          </Badge>
        ) : (
          <Badge variant="destructive" className="w-fit">
            No disponible
          </Badge>
        )}
      </div>
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores

#### Manual Verification:
- [x] Imágenes se cambian al clickear thumbnails
- [x] Botón de WhatsApp funciona correctamente
- [x] Features list se muestra correctamente

---

## Step 7: Crear Página de Detalle de Producto (Dynamic Route)

### Archivo: `src/app/servicios/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllProducts, getProductBySlug } from '@/lib/data/products'
import { ProductDetail } from '@/components/products/product-detail'
import { Button } from '@/components/ui/button'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  return {
    title: `${product.name} - SolutiveMind`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-10">
      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/servicios">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a servicios
        </Link>
      </Button>

      {/* Product Detail */}
      <ProductDetail product={product} />
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Página compila sin errores
- [x] `npm run build` genera páginas estáticas para todos los productos
- [x] No hay errores de TypeScript

#### Manual Verification:
- [x] Navegar a `/servicios/servicios-automatizacion-empresarial` muestra el producto
- [x] Botón "Volver" funciona
- [x] Metadata SEO correcta en el HTML

---

## Step 8: Crear Página 404 para Productos No Encontrados

### Archivo: `src/app/servicios/[slug]/not-found.tsx`

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-3xl font-bold mb-2">Servicio no encontrado</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, el servicio que buscas no existe o ha sido removido.
      </p>
      <Button asChild>
        <Link href="/servicios">Ver todos los servicios</Link>
      </Button>
    </div>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [x] Navegar a `/servicios/producto-inexistente` muestra la página 404
- [x] Botón regresa a listado de servicios

---

## Step 9: Actualizar Link de Header

Asegurarse que el link "Servicios" en el header apunte a `/servicios`:

Ya está configurado en `src/lib/constants/navigation.ts`:
```typescript
{
  label: 'Servicios',
  href: '/servicios',
}
```

### Success Criteria:

#### Manual Verification:
- [x] Click en "Servicios" en el header navega a `/servicios`

---

## Step 10: Agregar Imágenes Reales (Opcional - Placeholder OK)

Si tienes imágenes reales:

1. Colocarlas en `public/images/products/`
2. Actualizar `src/lib/data/products.ts` con las rutas correctas
3. Asegurarse que tienen nombres descriptivos (ej: `automation-hero.jpg`)

**Recomendaciones de imágenes:**
- Formato: WebP o JPG
- Tamaño: ~1200x800px para imagen principal
- Optimizar antes de subir (usar https://squoosh.app/)

### Success Criteria:

#### Manual Verification:
- [x] Imágenes se cargan rápidamente
- [x] Next.js Image optimization funciona (verificar Network tab)

---

## Testing Strategy

### Manual Testing Checklist:

#### Página de Servicios (`/servicios`):
- [x] Título y descripción se muestran correctamente
- [x] Grid responsive (1 col → 2 cols → 3 cols)
- [x] ProductCard muestra: imagen, título, descripción, precio, badge
- [x] Hover effect en card funciona
- [x] Click en "Ver más" navega a detalle

#### Página de Detalle (`/servicios/[slug]`):
- [x] Imagen principal se muestra
- [x] Thumbnails permiten cambiar imagen
- [x] Título, precio, descripción correctos
- [x] Features list se muestra
- [x] Badge de categoría visible
- [x] Badge de stock correcto
- [x] Botón WhatsApp abre chat con mensaje personalizado
- [x] Botón "Volver" funciona

#### Responsive:
- [x] Mobile (<640px): 1 columna, imágenes completas
- [x] Tablet (640-1024px): 2 columnas en grid
- [x] Desktop (>1024px): 3 columnas en grid, layout 2 columnas en detalle

#### SEO:
- [x] Metadata correcta en cada página
- [x] Open Graph tags presentes
- [x] URLs amigables (slugs)

### Automated Testing:
```bash
npm run build    # Verificar SSG
npm run lint     # Code quality
```

---

## Performance Considerations

- Usar Next.js `<Image>` component para optimización automática
- Imágenes lazy-loaded por defecto
- Static Site Generation (SSG) para todas las páginas de productos
- Metadata pre-renderizada para SEO

---

## SEO Optimizations

- Cada página tiene `<title>` y `<description>` únicos
- Open Graph metadata para compartir en redes
- URLs semánticas con slugs descriptivos
- Imágenes con alt text descriptivo
- Structured data (puede agregarse en futuro)

---

## Future Enhancements

Cuando se agreguen más productos:
- Filtros por categoría
- Búsqueda de productos
- Ordenamiento (precio, nombre, fecha)
- Paginación
- Productos relacionados

---

## References

- Next.js Dynamic Routes: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 5: Formulario de Contacto** (`phase-5-formulario-contacto.md`)
