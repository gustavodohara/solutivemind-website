---
date: 2025-11-12T23:30:58-03:00
researcher: gustavo
git_commit: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
branch: new-design-openpagelove
repository: wt-new-design-openpagelove
topic: "Implementar diseño similar a Resync Bio en SolutiveMind"
tags: [research, codebase, design-system, resync-bio, one-page-layout, scroll-navigation, layout]
status: complete
last_updated: 2025-11-12
last_updated_by: gustavo
last_updated_note: "Actualizado con requisitos: mantener paleta actual, estructura one-page con scroll navigation"
---

# Research: Implementar diseño similar a Resync Bio en SolutiveMind

**Date**: 2025-11-12T23:30:58-03:00
**Researcher**: gustavo
**Git Commit**: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
**Branch**: new-design-openpagelove
**Repository**: wt-new-design-openpagelove

## Research Question

Necesito implementar un sitio similar a https://backup.onepagelove.com/2025-07-28-resync-bio.html con el contenido del sitio actual.

**Requisitos específicos**:
1. **Mantener la paleta de colores actual** (cyan, dark blue, lime green)
2. **Convertir a estructura de una sola página** (one-page) donde cada menú hace scroll a la sección correspondiente
3. **Mantener la estructura de layout del ejemplo lo más fiel posible** (header fijo, secciones apiladas, footer)
4. **Cambiar texto y CTAs** con el contenido del proyecto actual

## Summary

He analizado tanto el sitio de ejemplo (Resync Bio) como el proyecto actual (SolutiveMind) para identificar los cambios necesarios en la estructura y layout.

**Cambio de arquitectura**: De un sitio multi-página (con /servicios, /contacto, /nosotros) a un **one-page site** con navegación por scroll (smooth scroll).

**Diseño visual**: Se mantendrá la paleta de colores actual del proyecto (cyan/dark blue/lime green) pero se adaptará la estructura, tipografía, espaciado y componentes para que coincidan con el estilo del ejemplo Resync Bio.

La transformación requerirá:
1. ~~Sistema de colores~~ **MANTENER paleta actual** (NO cambiar)
2. Estructura de navegación (convertir a scroll links)
3. Tipografía (pesos más ligeros, tamaños más grandes)
4. Espaciado (secciones más generosas)
5. Componentes (adaptar estilos sin cambiar colores)
6. Layout one-page (consolidar todo en homepage)

## Detailed Findings

### Análisis del Sitio de Ejemplo: Resync Bio

**1. Estructura de Navegación One-Page**
- **Header fijo**: Logo + menú horizontal con enlaces a secciones
- **Scroll navigation**: Cada link del menú hace scroll suave a la sección correspondiente
- **IDs de secciones**: Cada sección tiene un ID único para el anchor linking
- **Sticky header**: Se mantiene visible al hacer scroll

**Estructura de secciones identificada**:
1. **Hero** - Sección inicial con título grande y CTA principal
2. **Workflows** - Sección destacada (equivalente a nuestro "Features")
3. **Casos de uso** - Cards expandibles (equivalente a nuestros "Servicios")
4. **Productos** - Grid de productos/servicios
5. **Acerca de** - Información de la empresa
6. **Footer** - Contacto y enlaces

**2. Sistema de Colores** (NO APLICAREMOS - mantendremos la paleta actual)
- ~~Primario: `#e2aff6` (púrpura pastel)~~
- ~~Negro suave: `#2a2a2a`~~
- ~~Blanco: `white`~~
- ~~Gris claro: `#f7f7f7`~~

**Colores actuales que MANTENDREMOS**:
- **Primary**: `oklch(0.69 0.11 198)` - Cyan (#00B7C2)
- **Secondary**: `oklch(0.32 0.08 245)` - Dark blue (#0F4C75)
- **Accent**: `oklch(0.92 0.22 125)` - Lime green (#B5FF4A)
- **Background**: `oklch(0.98 0.005 210)` - Light grayish white
- **Foreground**: `oklch(0.32 0.08 245)` - Dark blue text

**3. Tipografía** (APLICAREMOS)
- **Font family**: Mantener Geist Sans
- **H1**: `clamp(3rem, 2.26rem + 3.05vw, 5rem)` con `font-weight: 300`
- **H2**: `clamp(2rem, 1.63rem + 1.52vw, 3rem)` con `font-weight: 300`
- **Body**: `1.125rem` con `line-height: 1.4em`
- **Button**: `0.875rem` con `font-weight: 500`
- Usar `text-wrap: balance` en títulos

**4. Espaciado y Layout** (APLICAREMOS)
- **Secciones**: `8rem` (lg), `6rem` (md), `5rem` (sm) - Más generoso que actual
- **Container gap**: `20px` consistente
- **Max width**: `90rem` (1440px) para contenedores principales
- **Padding inputs**: `0.75rem` vertical, `1rem` horizontal
- **Border radius**: Mantener `0.5rem` actual

**5. Componentes** (APLICAREMOS estructura, NO colores)
- **Botones**: Mantener colores actuales, ajustar padding `1rem` x `1.25rem`, transición `0.3s ease`
- **Cards**: Border radius `0.75rem`, borde sutil, flexbox columna
- **Inputs**: Altura mínima `4rem`, fondo transparente

**6. Animaciones** (APLICAREMOS)
- Transiciones de `0.3s` a `0.6s`
- Smooth scroll behavior
- Hover effects sutiles

**7. Responsive** (APLICAREMOS)
- Desktop: 992px+
- Tablet: 768px-991px
- Mobile: 479px-767px

### Análisis del Proyecto Actual: SolutiveMind

**Estructura del Proyecto**
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS v4 con OKLCH colors
- Components: shadcn/ui (New York style)
- Theme: next-themes con dark mode support
- Typography: Geist Sans + Geist Mono

**Sistema de Colores Actual** (OKLCH format):
- **Primary**: `oklch(0.69 0.11 198)` - Cyan (#00B7C2)
- **Secondary**: `oklch(0.32 0.08 245)` - Dark blue (#0F4C75)
- **Accent**: `oklch(0.92 0.22 125)` - Lime green (#B5FF4A)
- **Background**: `oklch(0.98 0.005 210)` - Light grayish white (#F4F9FA)
- **Foreground**: `oklch(0.32 0.08 245)` - Dark blue text

**Estructura de Contenido Actual** (Multi-página):
- **Homepage**: Hero + Features + CTA sections
- **Páginas separadas**:
  - `/servicios` - Lista de servicios (3 productos)
  - `/servicios/[slug]` - Detalle de cada servicio
  - `/contacto` - Formulario de contacto
  - `/nosotros` - Información de la empresa
  - `/theme-demo` - Demo del sistema de temas
- **Layout**: Header (fixed) + Footer + WhatsApp button floating

**Contenido a consolidar en ONE-PAGE**:
1. **Hero** (actual)
2. **Features/Por qué elegirnos** (actual - 6 features)
3. **Servicios** (de /servicios - 3 productos principales)
4. **Nosotros** (de /nosotros)
5. **Contacto** (de /contacto - formulario)
6. **Footer** (actual)

## Code References

### Archivos Críticos para Modificar

#### 1. Sistema de Colores - ⚠️ NO MODIFICAR
- `src/app/globals.css` - **MANTENER colores actuales**
  - Lines 46-103: Light mode palette - NO cambiar
  - Lines 105-159: Dark mode palette - NO cambiar
  - Line 48: Border radius global - Puede ajustarse si es necesario

- `src/lib/theme/palettes.ts` - NO modificar
- `src/lib/constants/theme-config.ts` - NO modificar

#### 2. Navegación - CONVERTIR A SCROLL NAVIGATION

**Nuevo archivo a crear**:
- `src/lib/constants/scroll-navigation.ts` - Definir secciones y anchors

```typescript
// Estructura propuesta
export const SECTIONS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'features', label: 'Por qué elegirnos', href: '#features' },
  { id: 'servicios', label: 'Servicios', href: '#servicios' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
  { id: 'contacto', label: 'Contacto', href: '#contacto' },
]
```

**Archivo a modificar**:
- `src/components/layout/header.tsx`
  - Line 26-47: Desktop navigation - Cambiar Links a scroll anchors
  - Line 49-88: Mobile navigation - Cambiar Links a scroll anchors
  - Agregar smooth scroll behavior
  - Mantener logo y estructura

#### 3. Tipografía - AGREGAR UTILITY CLASSES

- `src/app/globals.css`
  - Agregar utility classes para font weights más ligeros (font-light: 300)
  - Agregar clamp() utilities para responsive typography
  - Agregar `html { scroll-behavior: smooth; }` para smooth scroll

- `src/app/layout.tsx`
  - Lines 10-18: Font configuration - Mantener Geist Sans
  - Agregar font-weight 300 a la configuración si es necesario

#### 4. Componentes UI - AJUSTAR ESTILOS (mantener colores)

**Botones**:
- `src/components/ui/button.tsx`
  - Lines 21-28: Sizes - Aumentar padding a `h-12 px-6` para tamaño default
  - Mantener colores actuales (primary, secondary, etc.)
  - Ajustar transiciones a `0.3s ease`

**Cards**:
- `src/components/ui/card.tsx`
  - Line 10: Base styles - Mantener border y shadow actuales
  - Border radius ya es `0.75rem` (correcto)

**Inputs**:
- `src/components/ui/input.tsx`
  - Lines 11-13: Base styling
  - Aumentar altura: `h-14` (de `h-9`)
  - Ajustar padding: `px-4 py-3`

**Badge**:
- `src/components/ui/badge.tsx`
  - Mantener estructura y colores actuales

#### 5. Nueva Estructura de Homepage - ONE-PAGE LAYOUT

**Archivo principal a modificar**:
- `src/app/page.tsx` - **REFACTORIZACIÓN COMPLETA**

**Estructura nueva propuesta**:
```tsx
<div>
  {/* Sección 1: Hero */}
  <section id="inicio">
    <Hero {...} />
  </section>

  {/* Sección 2: Features/Por qué elegirnos */}
  <section id="features">
    <FeaturesSection {...} />
  </section>

  {/* Sección 3: Servicios (nuevo componente) */}
  <section id="servicios">
    <ServicesSection products={PRODUCTS} />
  </section>

  {/* Sección 4: Nosotros (nuevo componente o importar contenido) */}
  <section id="nosotros">
    <AboutSection {...} />
  </section>

  {/* Sección 5: Contacto (importar ContactForm) */}
  <section id="contacto">
    <ContactSection>
      <ContactForm />
    </ContactSection>
  </section>
</div>
```

**Nuevos componentes a crear**:
- `src/components/sections/services-section.tsx` - Sección de servicios (grid de productos)
- `src/components/sections/about-section.tsx` - Sección "Nosotros" (extraer de /nosotros)
- `src/components/sections/contact-section.tsx` - Wrapper para formulario de contacto

#### 6. Layout Components - AJUSTAR ESPACIADO

**Hero Section**:
- `src/components/layout/hero.tsx`
  - Line 15: Section padding - aumentar a `py-20 md:py-32 lg:py-40`
  - Lines 22-24: Heading typography - agregar `font-light` y usar clamp()
  - Agregar `id="inicio"` a la sección
  - Mantener colores actuales

**Features Section**:
- `src/components/layout/features-section.tsx`
  - Line 18: Section padding - aumentar a `py-20 md:py-32`
  - Agregar `id="features"` a la sección
  - Mantener colores actuales

**Header**:
- `src/components/layout/header.tsx`
  - Convertir navegación a scroll links (ver punto 2)
  - Agregar `position: sticky` si no lo tiene
  - Mantener colores actuales

**Footer**:
- `src/components/layout/footer.tsx`
  - Mantener estructura y colores actuales
  - Agregar links de scroll to top si es necesario

#### 7. Páginas Existentes - MANTENER COMO RESPALDO

**Páginas a mantener** (por si se necesitan en el futuro):
- `/servicios` - Mantener temporalmente
- `/servicios/[slug]` - Mantener para detalles individuales
- `/contacto` - Mantener como página standalone
- `/nosotros` - Mantener como página standalone
- `/theme-demo` - Mantener para testing

**Nota**: Estas páginas seguirán funcionando pero no estarán en la navegación principal.

## Sistema de Diseño a Implementar

### ⚠️ Paleta de Colores - MANTENER ACTUAL (NO CAMBIAR)

```css
/* Paleta ACTUAL de SolutiveMind (MANTENER) */
--background: oklch(0.98 0.005 210);        /* #F4F9FA - Light grayish white */
--foreground: oklch(0.32 0.08 245);         /* #0F4C75 - Dark blue text */

--primary: oklch(0.69 0.11 198);            /* #00B7C2 - Cyan */
--primary-foreground: oklch(1 0 0);         /* White text */

--secondary: oklch(0.32 0.08 245);          /* #0F4C75 - Dark blue */
--secondary-foreground: oklch(1 0 0);       /* White text */

--accent: oklch(0.92 0.22 125);             /* #B5FF4A - Lime green */
--accent-foreground: oklch(0.32 0.08 245);  /* Dark blue text */

--muted: oklch(0.95 0.005 210);             /* Slightly darker than background */
--muted-foreground: oklch(0.50 0.01 230);   /* Medium gray */

--border: oklch(0.90 0.005 210);            /* Light border */
--ring: oklch(0.69 0.11 198);               /* Cyan focus ring */

--radius: 0.5rem;                           /* 8px - mantener o ajustar a 0.75rem */
```

### Tipografía

```css
/* Usar Geist con pesos más ligeros */
- H1: text-5xl md:text-6xl lg:text-7xl font-light
- H2: text-3xl md:text-4xl lg:text-5xl font-light
- H3: text-2xl md:text-3xl font-normal
- Body: text-lg leading-relaxed (1.125rem / 1.4)
- Small: text-sm
```

### Espaciado

```css
/* Más generoso que actual */
- Sections: py-20 md:py-32 (vs actual py-16 md:py-24)
- Container padding: px-6 lg:px-8 (vs actual px-4 sm:px-6 lg:px-8)
- Grid gaps: gap-5 (20px) consistente
- Component gaps: gap-6 entre secciones internas
```

### Componentes

**Buttons**:
```
- Default: bg-secondary text-secondary-foreground (black bg, white text)
- Large: h-12 px-6 text-base
- Transition: transition-all duration-300
```

**Cards**:
```
- Border: border border-border/30
- Radius: rounded-xl
- Shadow: shadow-sm hover:shadow-md
- Padding: p-6
```

**Inputs**:
```
- Height: h-14
- Padding: px-4 py-3
- Border: border-border/50
- Focus: ring-2 ring-ring/20
```

## Architecture Insights

### Tailwind CSS v4 Structure

El proyecto usa Tailwind v4 que **no requiere** `tailwind.config.js`. Toda la configuración se maneja vía:
1. `@theme inline` directive en `globals.css` (lines 6-44)
2. CSS custom properties mapeadas a utilities
3. `@custom-variant` para dark mode (line 4)

**Ventaja**: Cambios de color se hacen únicamente en CSS variables, sin tocar config files.

### Component Architecture

- **shadcn/ui components**: Todos en `src/components/ui/`
- **Variant system**: Usa `class-variance-authority` (CVA)
- **Utility function**: `cn()` en `src/lib/utils.ts` combina clsx + tailwind-merge
- **Theme provider**: `next-themes` en `src/components/providers/theme-provider.tsx`

### Color Token System

El sistema usa **semantic tokens** que se auto-adaptan a light/dark mode:
- `bg-background`, `text-foreground` (automático)
- `bg-primary`, `text-primary-foreground`
- `bg-muted`, `text-muted-foreground`
- `border-border`, `ring-ring`

**Beneficio**: Los componentes no necesitan clases `dark:` explícitas, el sistema lo maneja automáticamente cambiando los CSS variables.

### Current vs Target Comparison

| Aspecto | Actual | Target (Resync Bio adaptado) |
|---------|--------|------------------------------|
| **Estructura** | Multi-página | **One-page con scroll navigation** ✅ |
| **Navegación** | Links a páginas | **Scroll anchors (#seccion)** ✅ |
| **Primary color** | Cyan #00B7C2 | **Mantener Cyan** ✅ |
| **Background** | Off-white #F4F9FA | **Mantener Off-white** ✅ |
| **Text** | Dark blue #0F4C75 | **Mantener Dark blue** ✅ |
| **Accent** | Lime green #B5FF4A | **Mantener Lime green** ✅ |
| **Border radius** | 0.5rem (8px) | 0.5rem o 0.75rem (ajustable) |
| **Section padding** | py-16 md:py-24 | **py-20 md:py-32** ✅ |
| **Typography weight** | Normal (400) | **Light (300) para títulos** ✅ |
| **Button size** | h-9 px-4 | **h-12 px-6** ✅ |
| **Input height** | h-9 | **h-14** ✅ |
| **Overall feel** | Tech/modern/vibrant | **Mantener look actual con layout mejorado** ✅ |

**Nota**: ✅ indica cambios que SÍ se van a implementar

## Implementation Roadmap

### Phase 1: Scroll Navigation Setup (30 min)
1. **Crear** `src/lib/constants/scroll-navigation.ts`:
   - Definir array de secciones con IDs y labels
   - Exportar constante `SECTIONS`

2. **Actualizar** `src/components/layout/header.tsx`:
   - Reemplazar Links con scroll anchors (`<a href="#seccion">`)
   - Agregar smooth scroll behavior handler
   - Mantener sticky positioning

3. **Actualizar** `src/app/globals.css`:
   - Agregar `html { scroll-behavior: smooth; }`
   - Agregar scroll-margin-top para header fijo

### Phase 2: Typography & Utilities (20 min)
1. **Actualizar** `src/app/globals.css`:
   - Agregar utility classes para `font-light` (weight 300)
   - Agregar clamp() para responsive typography
   - Mantener colores actuales

2. **Configurar** font weights en layout si es necesario

### Phase 3: Component Adjustments (45 min)
1. **Button** (`src/components/ui/button.tsx`):
   - Aumentar size default: `h-12 px-6`
   - Ajustar transiciones a `0.3s ease`
   - MANTENER colores actuales

2. **Input** (`src/components/ui/input.tsx`):
   - Aumentar altura: `h-14`
   - Ajustar padding: `px-4 py-3`
   - MANTENER colores actuales

3. **Card** (`src/components/ui/card.tsx`):
   - Verificar border radius (ya es 0.75rem)
   - MANTENER estilos actuales

### Phase 4: New Section Components (1.5 hours)
1. **Crear** `src/components/sections/services-section.tsx`:
   - Grid de servicios (3 productos)
   - Usar ProductCard o crear nuevo diseño
   - IDs para scroll: `id="servicios"`

2. **Crear** `src/components/sections/about-section.tsx`:
   - Extraer contenido de `/nosotros`
   - Adaptar para one-page layout
   - ID: `id="nosotros"`

3. **Crear** `src/components/sections/contact-section.tsx`:
   - Wrapper para ContactForm
   - ID: `id="contacto"`
   - Mantener estilos de formulario actual

### Phase 5: Homepage Refactoring (1 hour)
1. **Refactorizar** `src/app/page.tsx`:
   - Reorganizar en estructura one-page
   - Agregar IDs a cada sección
   - Integrar nuevos componentes de secciones
   - Ajustar spacing entre secciones (py-20 md:py-32)

2. **Actualizar** `src/components/layout/hero.tsx`:
   - Agregar `id="inicio"`
   - Aumentar padding: `py-20 md:py-32 lg:py-40`
   - Aplicar `font-light` a títulos
   - MANTENER colores actuales

3. **Actualizar** `src/components/layout/features-section.tsx`:
   - Agregar `id="features"`
   - Aumentar padding: `py-20 md:py-32`
   - MANTENER colores actuales

### Phase 6: Testing & Refinement (30 min)
1. **Visual verification** con Playwright:
   - Verificar scroll navigation funciona
   - Verificar todos los IDs de secciones
   - Test responsive breakpoints
   - Test smooth scroll en diferentes browsers

2. **Test interactivo**:
   - Click en cada link del menú
   - Verificar scroll to section correcto
   - Test en mobile (menú hamburguesa)
   - Test dark mode

3. **Fine-tuning**:
   - Ajustar scroll-margin-top si es necesario
   - Ajustar spacing entre secciones
   - Verificar contraste y accesibilidad

**Total estimated time**: ~4-4.5 hours

### Orden recomendado de ejecución:
1. Phase 1 (navegación) - Base fundamental
2. Phase 2 (tipografía) - Estilos básicos
3. Phase 3 (componentes) - Ajustes UI
4. Phase 4 (nuevas secciones) - Contenido
5. Phase 5 (homepage) - Integración
6. Phase 6 (testing) - Validación

## Related Research

Este es el primer documento de investigación para este proyecto de rediseño.

## Open Questions

1. **Páginas individuales de servicios**: ¿Mantener `/servicios/[slug]` o todo en one-page?
   - Recomendación: Mantener páginas detalladas como opción, pero no en navegación principal

2. **Gradientes de fondo**: ¿Agregar gradientes sutiles en secciones?
   - Recomendación: Opcional, probar sutilmente con colores actuales (from-primary/10)

3. **Animaciones**: ¿Agregar animaciones de entrada en secciones?
   - Recomendación: Mantener simples, focus en smooth scroll y transiciones

4. **Contenido de "Nosotros"**: ¿Qué incluir en la sección?
   - Requiere: Leer `/nosotros` page para extraer contenido

5. **WhatsApp button**: ¿Mantener flotante en one-page layout?
   - Recomendación: Sí, mantener flotante con colores actuales

6. **Scroll offset**: ¿Cuánto offset necesita el header fijo?
   - Requiere: Medir altura del header (actual: h-16 = 64px)

## Next Steps

1. **Leer contenido actual**:
   - Leer `/nosotros` page para extraer texto
   - Verificar contenido de formulario de contacto

2. **Comenzar implementación**:
   - Crear branch: `feature/one-page-layout`
   - Seguir roadmap en orden (Phase 1-6)

3. **Testing continuo**:
   - Verificar visualmente con Playwright después de cada phase
   - Test smooth scroll en diferentes devices

4. **Documentación**:
   - Actualizar CLAUDE.md con nueva estructura
   - Documentar decisiones de diseño

## Notes

- **Paleta de colores**: MANTENER actual (cyan/dark blue/lime green) - NO cambiar
- **Cambio principal**: Arquitectura de multi-página a one-page con scroll navigation
- **Contenido**: Consolidar todas las páginas en homepage con secciones
- **Layout**: Inspirado en Resync Bio pero con identidad visual actual
- El proyecto ya tiene excelente base con Tailwind v4 y OKLCH
- El sistema de tokens semánticos facilita agregar nuevas secciones
- Dark mode se mantiene automáticamente con el sistema actual
- Testing E2E con Playwright permitirá validar smooth scroll y navegación
- Las páginas existentes (/servicios, /contacto, /nosotros) se mantienen como respaldo
