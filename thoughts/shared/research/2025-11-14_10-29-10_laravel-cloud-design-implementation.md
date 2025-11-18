---
date: 2025-11-14 10:29:10 -03
researcher: Claude
git_commit: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
branch: new-design-cloud-lavarel-com
repository: wt-cloud-laravel-com
topic: "Laravel Cloud Design Implementation - Design Research Document"
tags: [research, design, laravel-cloud, ui-redesign, dark-mode, styling]
status: complete
last_updated: 2025-11-14
last_updated_by: Claude
---

# Research: Laravel Cloud Design Implementation

**Date**: 2025-11-14 10:29:10 -03
**Researcher**: Claude
**Git Commit**: e19b7a3172e1e72b0e590cd00e6bfc40fc07d26e
**Branch**: new-design-cloud-lavarel-com
**Repository**: wt-cloud-laravel-com

## Research Question

¿Cómo implementar el diseño de Laravel Cloud (https://cloud.laravel.com) en el sitio web de SolutiveMind sin cambiar las páginas existentes, enfocándose únicamente en aplicar el nuevo diseño visual?

## Summary

Laravel Cloud presenta un diseño moderno y sofisticado con las siguientes características principales:

1. **Color Scheme**: Fondo oscuro profundo (#0A0E27 - navy/dark blue) con elementos cyan/teal brillantes para acentos
2. **Typography**: Tipografía limpia y moderna con jerarquía clara usando Inter/Sistema
3. **Layout**: Diseño espacioso con mucho aire blanco (dark space), cards con bordes sutiles
4. **Components**: Botones con bordes redondeados, cards con sombras suaves, iconografía moderna
5. **Animations**: Transiciones suaves y estados hover sofisticados
6. **Glass Morphism**: Efectos de vidrio esmerilado en header y overlays
7. **Gradients**: Uso de gradientes sutiles en backgrounds y acentos

## Laravel Cloud Design Analysis

### 1. Color Palette (Dark Mode First)

**Primary Colors:**
- Background: `#0A0E27` (Very dark navy/blue) - Similar a `oklch(0.12 0.02 250)`
- Foreground/Text: `#E5E7EB` (Off-white gray) - Similar a `oklch(0.92 0.005 240)`
- Primary Accent: `#06B6D4` (Cyan/Teal) - Similar a `oklch(0.72 0.14 195)`
- Secondary Accent: `#3B82F6` (Blue) - Similar a `oklch(0.58 0.22 250)`

**UI Element Colors:**
- Card Background: `#111827` con transparencia - `oklch(0.14 0.02 250 / 95%)`
- Border: `rgba(255,255,255,0.1)` - Bordes muy sutiles
- Hover: Ligero brightening + border glow
- Focus Ring: Cyan (#06B6D4) con opacity

**Status Colors:**
- Success: Green `#10B981`
- Warning: Amber `#F59E0B`
- Error: Red `#EF4444`
- Info: Blue `#3B82F6`

### 2. Typography System

**Font Stack:**
```css
font-family: Inter, system-ui, -apple-system, sans-serif
```

**Size Scale (Tailwind-based):**
- Hero Title: `text-5xl md:text-6xl lg:text-7xl` (48px → 60px → 72px)
- Section Title: `text-3xl md:text-4xl` (30px → 36px)
- Card Title: `text-xl font-semibold` (20px, 600 weight)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Caption: `text-xs` (12px)

**Weight Scale:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Line Heights:**
- Headings: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)

### 3. Spacing System

**Container:**
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`

**Section Spacing:**
- Vertical: `py-20 md:py-32` (80px → 128px)
- Between sections: `space-y-16 md:space-y-24`

**Component Spacing:**
- Card padding: `p-6 md:p-8`
- Card gap: `gap-8 md:gap-12`
- Grid gap: `gap-6 md:gap-8`

### 4. Border Radius

**Consistent rounding:**
- Buttons: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Large panels: `rounded-2xl` (16px)
- Images: `rounded-lg`

### 5. Shadows & Effects

**Card Shadows:**
```css
box-shadow: 0 0 0 1px rgba(255,255,255,0.05),
            0 10px 30px -10px rgba(0,0,0,0.4);
```

**Hover Effects:**
```css
/* Subtle lift + glow */
transform: translateY(-2px);
box-shadow: 0 0 0 1px rgba(6,182,212,0.3),
            0 20px 40px -15px rgba(6,182,212,0.2);
```

**Glass Morphism (Header):**
```css
background: rgba(10, 14, 39, 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255,255,255,0.1);
```

### 6. Component Patterns

**Buttons:**
```tsx
// Primary
className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg
          font-medium transition-all shadow-lg shadow-primary/20
          hover:shadow-xl hover:shadow-primary/30"

// Secondary/Outline
className="border border-primary/30 hover:border-primary text-primary
          px-6 py-3 rounded-lg font-medium transition-all
          hover:bg-primary/5"

// Ghost
className="hover:bg-white/5 text-foreground px-4 py-2 rounded-lg
          transition-colors"
```

**Cards:**
```tsx
className="bg-card/50 backdrop-blur-sm border border-white/10
          rounded-xl p-6 md:p-8 hover:border-primary/30
          transition-all hover:shadow-xl"
```

**Header:**
```tsx
className="sticky top-0 z-50 bg-background/80 backdrop-blur-md
          border-b border-white/10"
```

### 7. Layout Structure

**Hero Section:**
- Centered content with max-w-4xl
- Large typography with gradient text effects
- CTA buttons prominently displayed
- Background with subtle gradient or pattern

**Feature Cards:**
- 3-column grid on desktop (`grid-cols-1 md:grid-cols-3`)
- Icon + Title + Description pattern
- Hover effects with scale/shadow

**Content Sections:**
- Alternating image/text layout
- Full-width backgrounds with contained content
- Consistent spacing rhythm

### 8. Animation Patterns

**Transitions:**
```css
transition: all 0.2s ease-out; /* Fast for interactions */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth for entrances */
```

**Hover States:**
- Scale: `hover:scale-[1.02]`
- Translate: `hover:-translate-y-1`
- Opacity: `hover:opacity-80`
- Border glow: `hover:border-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]`

**Page Transitions:**
- Fade in: `animate-in fade-in duration-500`
- Slide up: `animate-in slide-in-from-bottom-4 duration-700`

## Current SolutiveMind Design System

### Color System (Current)

**Light Mode:**
- Background: `oklch(0.98 0.005 210)` - #F4F9FA (off-white blue tint)
- Foreground: `oklch(0.32 0.08 245)` - #0F4C75 (dark blue)
- Primary: `oklch(0.69 0.11 198)` - #00B7C2 (cyan)
- Secondary: `oklch(0.32 0.08 245)` - #0F4C75 (dark blue)
- Accent: `oklch(0.92 0.22 125)` - #B5FF4A (lime green)

**Dark Mode:**
- Background: `oklch(0.16 0.01 230)` - #1B262C (dark blue-gray)
- Foreground: `oklch(0.98 0.005 210)` - #F4F9FA (light)
- Primary: `oklch(0.75 0.11 198)` - Brighter cyan
- Accent: `oklch(0.90 0.22 125)` - Bright lime

### Typography (Current)
- Font: Geist Sans + Geist Mono
- Sizes: Tailwind default scale
- Weights: Regular, Medium, Semibold, Bold

### Layout (Current)
- Max width: `max-w-3xl` (768px) - Más estrecho que Laravel Cloud
- Padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16 md:py-24`

## Affected Files & Code Sections for Implementation

### 1. Color System & Theme Configuration

#### `src/app/globals.css` - CRITICAL

**Lines to modify:**

**Lines 46-103 (Light Mode Variables):**
```css
:root {
  /* NEW: Dark-first approach - invert for light mode */
  --background: oklch(0.12 0.02 250);      /* #0A0E27 - Dark navy */
  --foreground: oklch(0.92 0.005 240);     /* #E5E7EB - Off-white */

  --card: oklch(0.14 0.02 250 / 95%);      /* #111827 - Dark card */
  --card-foreground: oklch(0.92 0.005 240);

  --primary: oklch(0.72 0.14 195);         /* #06B6D4 - Cyan/Teal */
  --primary-foreground: oklch(1 0 0);      /* White */

  --secondary: oklch(0.58 0.22 250);       /* #3B82F6 - Blue */
  --secondary-foreground: oklch(1 0 0);

  --accent: oklch(0.72 0.14 195);          /* Same as primary */
  --accent-foreground: oklch(0.12 0.02 250);

  --muted: oklch(0.18 0.02 250);           /* Slightly lighter than bg */
  --muted-foreground: oklch(0.65 0.01 240); /* Medium gray */

  --border: oklch(1 0 0 / 10%);            /* Very subtle white borders */
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.72 0.14 195);            /* Cyan for focus */
}
```

**Lines 105-159 (Dark Mode - becomes light mode):**
```css
.dark {
  /* Light mode (inverted) */
  --background: oklch(0.98 0.005 210);
  --foreground: oklch(0.20 0.05 240);
  /* ... etc */
}
```

**Reasoning:** Laravel Cloud es dark-first, por lo que invertimos el esquema actual.

#### `src/lib/constants/theme-config.ts` - Medium Priority

**Entire file needs update** to match new Laravel Cloud palette.

Create new palette object:
```typescript
export const laravelCloudPalette: ThemePalette = {
  name: 'Laravel Cloud',
  description: 'Dark navy with cyan accents inspired by Laravel Cloud',
  light: {
    background: 'oklch(0.12 0.02 250)',
    foreground: 'oklch(0.92 0.005 240)',
    // ... all colors
  },
  dark: {
    background: 'oklch(0.98 0.005 210)',
    foreground: 'oklch(0.20 0.05 240)',
    // ... inverted
  }
}
```

### 2. Layout Components

#### `src/components/layout/header.tsx` - HIGH PRIORITY

**Lines 18-23 (Header styling):**
```tsx
<header className="
  sticky top-0 z-50 w-full
  bg-background/80 backdrop-blur-md     /* Glass morphism */
  border-b border-white/10              /* Subtle border */
  transition-colors
">
```

**Lines 21-23 (Logo):**
```tsx
<Link href="/" className="flex items-center space-x-2">
  <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary
                   bg-clip-text text-transparent">
    SolutiveMind
  </span>
</Link>
```

**Lines 26-38 (Nav links):**
```tsx
<Link
  className={cn(
    'text-sm font-medium transition-all hover:text-primary',
    'relative after:absolute after:bottom-0 after:left-0',
    'after:h-[2px] after:w-0 after:bg-primary',
    'after:transition-all hover:after:w-full',
    isActive(item.href)
      ? 'text-primary after:w-full'
      : 'text-muted-foreground'
  )}
>
```

#### `src/components/layout/hero.tsx` - HIGH PRIORITY

**Lines 13-17 (Hero container):**
```tsx
<section className={cn(
  'relative overflow-hidden py-20 md:py-32',
  'bg-gradient-to-b from-background via-background/95 to-muted/20',
  className
)}>
```

**Lines 22-23 (Hero title):**
```tsx
<h1 className="
  text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl
  bg-gradient-to-r from-primary via-secondary to-primary
  bg-clip-text text-transparent
">
```

**Lines 28-29 (Description):**
```tsx
<p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
```

#### `src/components/layout/footer.tsx` - Medium Priority

**Add glass morphism and updated colors:**
```tsx
<footer className="
  border-t border-white/10 bg-background/50 backdrop-blur-sm
  py-12 md:py-16
">
```

### 3. UI Components

#### `src/components/ui/button.tsx` - HIGH PRIORITY

**Lines 7-35 (Variant definitions):**

Add new variants for Laravel Cloud style:

```typescript
variants: {
  variant: {
    default: `
      bg-primary hover:bg-primary/90 text-primary-foreground
      shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
      transition-all duration-200
    `,
    outline: `
      border border-primary/30 hover:border-primary bg-transparent
      text-primary hover:bg-primary/5
      transition-all duration-200
    `,
    ghost: `
      hover:bg-white/5 text-foreground
      transition-colors
    `,
    // ... other variants
  },
  size: {
    default: 'h-11 px-6 py-3',  // Slightly larger
    sm: 'h-9 px-4 py-2',
    lg: 'h-12 px-8 py-3',       // Larger buttons
    icon: 'size-11',
  }
}
```

#### `src/components/ui/card.tsx` - HIGH PRIORITY

**Lines 9-12 (Card root):**
```tsx
<div className={cn(
  'rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm',
  'p-6 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl',
  'hover:-translate-y-1',
  className
)} />
```

**Add hover glow effect:**
```tsx
<div className={cn(
  'rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm',
  'p-6 shadow-lg transition-all duration-300',
  'hover:border-primary/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
  'hover:-translate-y-1',
  className
)} />
```

#### `src/components/ui/badge.tsx` - Low Priority

Update badge variants for better contrast:
```typescript
variant: {
  default: 'border-transparent bg-primary/20 text-primary',
  secondary: 'border-transparent bg-secondary/20 text-secondary',
  outline: 'border-primary/30 text-primary',
}
```

### 4. Page Components

#### `src/app/page.tsx` - Medium Priority

**Add gradient backgrounds to sections:**
```tsx
<section className="
  relative overflow-hidden
  bg-gradient-to-b from-background to-muted/10
  py-20 md:py-32
">
```

**Update button styling:**
```tsx
<Button size="lg" className="
  shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
">
  Comenzar
</Button>
```

#### `src/components/layout/features-section.tsx` - Medium Priority

**Lines 18-35 (Feature cards layout):**
```tsx
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {features.map((feature) => (
    <Card className="
      group hover:scale-[1.02] transition-all duration-300
      hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
    ">
      <CardHeader>
        <div className="
          mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-primary/10 text-primary group-hover:bg-primary/20
          transition-colors
        ">
          <Icon className="h-6 w-6" />
        </div>
        {/* ... rest */}
      </CardHeader>
    </Card>
  ))}
</div>
```

#### `src/components/products/product-card.tsx` - Medium Priority

**Update card styling:**
```tsx
<Card className="
  group overflow-hidden transition-all duration-300
  hover:border-primary/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
  hover:-translate-y-1
">
  <div className="aspect-video overflow-hidden">
    <Image
      className="
        object-cover transition-transform duration-500
        group-hover:scale-110
      "
      // ...
    />
  </div>
  {/* ... rest */}
</Card>
```

### 5. Typography Changes

#### `src/app/layout.tsx` - Low Priority

**Consider switching fonts (lines 10-18):**

Option 1: Keep Geist (modern, clean - good match)
Option 2: Add Inter as alternative:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})
```

Update body:
```tsx
<body className={`${inter.variable} antialiased`}>
```

Update globals.css:
```css
--font-sans: var(--font-inter);
```

### 6. Animation & Transitions

#### `src/app/globals.css` - Medium Priority

**Add after line 168 (base layer):**

```css
@layer base {
  /* ... existing ... */

  /* Custom animations for Laravel Cloud style */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.4);
    }
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.7s ease-out;
  }

  .animate-glow {
    animation: glow-pulse 2s ease-in-out infinite;
  }
}
```

### 7. Additional Component Updates

#### `src/components/ui/input.tsx` - Low Priority

**Update input styling for dark theme:**
```tsx
className={cn(
  'flex h-10 w-full rounded-md border border-input/30',
  'bg-background/50 backdrop-blur-sm px-3 py-2',
  'text-sm transition-colors',
  'focus-visible:border-primary focus-visible:ring-2',
  'focus-visible:ring-primary/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
  className
)}
```

#### `src/components/ui/select.tsx` - Low Priority

Update dropdown styling to match card style.

#### `src/components/forms/contact-form.tsx` - Low Priority

Ensure form fields use updated input styles.

## Implementation Priority Matrix

### Phase 1: Core Design System (CRITICAL)
**Files to modify FIRST:**

1. `src/app/globals.css` (lines 46-159)
   - Update all CSS color variables
   - Add new animation utilities
   - Update border/shadow tokens

2. `src/lib/constants/theme-config.ts` (entire file)
   - Create laravelCloudPalette
   - Update color definitions

### Phase 2: Layout Components (HIGH PRIORITY)
**Files to modify SECOND:**

3. `src/components/layout/header.tsx` (lines 18-38)
   - Add glass morphism
   - Update nav link styling
   - Add gradient to logo

4. `src/components/layout/hero.tsx` (lines 13-31)
   - Update gradient backgrounds
   - Add text gradients
   - Increase spacing

5. `src/components/ui/button.tsx` (lines 7-35)
   - Update variant styles
   - Add shadow effects
   - Update hover states

6. `src/components/ui/card.tsx` (lines 9-12)
   - Add backdrop blur
   - Update borders
   - Add hover effects

### Phase 3: Content Components (MEDIUM PRIORITY)
**Files to modify THIRD:**

7. `src/components/layout/features-section.tsx` (lines 18-35)
   - Update card grid
   - Add hover animations
   - Update icon backgrounds

8. `src/components/layout/footer.tsx` (entire component)
   - Add glass morphism
   - Update border styling

9. `src/components/products/product-card.tsx` (entire component)
   - Update hover effects
   - Add shadow transitions

10. `src/app/page.tsx` (section backgrounds)
    - Add gradient backgrounds
    - Update spacing

### Phase 4: Form & Input Components (LOW PRIORITY)
**Files to modify LAST:**

11. `src/components/ui/input.tsx`
12. `src/components/ui/textarea.tsx`
13. `src/components/ui/select.tsx`
14. `src/components/ui/badge.tsx`
15. `src/components/forms/contact-form.tsx`

## Code Sections Summary by File

### Critical Changes

| File | Lines | Changes Required |
|------|-------|------------------|
| `src/app/globals.css` | 46-159 | Replace all color variables with Laravel Cloud palette |
| `src/app/globals.css` | 161+ | Add custom animations and utilities |
| `src/lib/constants/theme-config.ts` | All | Create new laravelCloudPalette object |
| `src/components/layout/header.tsx` | 18 | Add glass morphism (bg-background/80 backdrop-blur-md) |
| `src/components/layout/header.tsx` | 21-23 | Add gradient to logo text |
| `src/components/layout/header.tsx` | 32 | Add underline animation to nav links |
| `src/components/layout/hero.tsx` | 15 | Update gradient background |
| `src/components/layout/hero.tsx` | 22 | Add gradient text effect to title |
| `src/components/ui/button.tsx` | 10-18 | Update default variant with shadows |
| `src/components/ui/button.tsx` | 16 | Add shadow effects to outline variant |
| `src/components/ui/card.tsx` | 10 | Add backdrop-blur-sm and hover effects |

### Medium Priority Changes

| File | Lines | Changes Required |
|------|-------|------------------|
| `src/components/layout/features-section.tsx` | 18-35 | Update card hover effects |
| `src/components/layout/footer.tsx` | All | Add glass morphism and border updates |
| `src/components/products/product-card.tsx` | 23-30 | Update card and image hover effects |
| `src/app/page.tsx` | Section wrappers | Add gradient backgrounds |

### Low Priority Changes

| File | Lines | Changes Required |
|------|-------|------------------|
| `src/components/ui/input.tsx` | className | Update border and focus styles |
| `src/components/ui/textarea.tsx` | className | Match input styling |
| `src/components/ui/select.tsx` | Dropdown | Update dropdown styling |
| `src/components/ui/badge.tsx` | variants | Update color opacity |

## Design Tokens Comparison

### Colors

| Token | Current (SolutiveMind) | Target (Laravel Cloud) | Change Required |
|-------|------------------------|------------------------|------------------|
| --background | `oklch(0.98 0.005 210)` light | `oklch(0.12 0.02 250)` dark navy | YES - Invert |
| --foreground | `oklch(0.32 0.08 245)` dark | `oklch(0.92 0.005 240)` light | YES - Invert |
| --primary | `oklch(0.69 0.11 198)` cyan | `oklch(0.72 0.14 195)` cyan | MINOR - Adjust |
| --secondary | `oklch(0.32 0.08 245)` dark blue | `oklch(0.58 0.22 250)` blue | YES - Change |
| --accent | `oklch(0.92 0.22 125)` lime | `oklch(0.72 0.14 195)` cyan | YES - Change |
| --border | `oklch(0.90 0.005 210)` light | `oklch(1 0 0 / 10%)` subtle | YES - More subtle |

### Spacing

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| Container max-width | `max-w-3xl` (768px) | `max-w-7xl` (1280px) | Increase |
| Hero py | `py-20 md:py-28` | `py-20 md:py-32` | Increase md |
| Section py | `py-16 md:py-24` | `py-20 md:py-32` | Increase both |
| Card padding | `p-6` | `p-6 md:p-8` | Add responsive |
| Grid gap | `gap-6` | `gap-8 md:gap-12` | Increase |

### Typography

| Element | Current | Target | Change |
|---------|---------|--------|--------|
| Hero h1 | `text-4xl sm:text-5xl md:text-6xl` | `text-5xl sm:text-6xl md:text-7xl` | Increase all |
| Font family | Geist Sans | Inter/System | Optional change |
| Line height (body) | `leading-normal` | `leading-relaxed` | Increase |

### Effects

| Effect | Current | Target | Change |
|--------|---------|--------|--------|
| Glass morphism | None | `backdrop-blur-md` | Add |
| Card shadows | `shadow-sm` | `shadow-lg` + hover glow | Enhance |
| Button shadows | None | `shadow-lg shadow-primary/20` | Add |
| Hover translate | None | `hover:-translate-y-1` | Add |
| Gradient text | None | `bg-gradient-to-r bg-clip-text` | Add |

## Testing Checklist

After implementation, verify:

### Visual Testing
- [ ] Dark mode is default and looks correct
- [ ] Light mode (inverted) still works
- [ ] All colors match Laravel Cloud palette
- [ ] Glass morphism effects visible on header
- [ ] Gradient text effects render correctly
- [ ] Shadows and glows appear on hover
- [ ] Borders are subtle (10% opacity)

### Component Testing
- [ ] Buttons have correct shadow effects
- [ ] Cards hover effects work smoothly
- [ ] Navigation underline animations work
- [ ] Hero gradient background visible
- [ ] Feature cards scale on hover
- [ ] Product cards image zoom works
- [ ] Form inputs have correct focus styles

### Responsive Testing
- [ ] Mobile (375px): Layout stacks correctly
- [ ] Tablet (768px): 2-column grids work
- [ ] Desktop (1280px): 3-column grids work
- [ ] Max-width container is 1280px
- [ ] Text sizes scale appropriately

### Accessibility
- [ ] Focus rings visible (cyan color)
- [ ] Contrast ratios meet WCAG AA (4.5:1 minimum)
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader labels remain intact

### Performance
- [ ] No layout shift on page load
- [ ] Animations run at 60fps
- [ ] Images lazy load correctly
- [ ] Fonts load without FOUT

## Related Research

- [Color Palette Refactoring](2025-11-12_21-35-00_color-palette-refactoring.md) - Previous color system analysis
- [Next.js Tech Stack Recommendations](2025-11-03_22-43-57_next-js-tech-stack-recommendations.md) - Tech stack decisions

## Open Questions

1. **Font Change**: ¿Cambiar de Geist Sans a Inter para más similitud con Laravel Cloud?
   - **Recomendación**: Mantener Geist (es moderno y funciona bien)

2. **Container Width**: ¿Aumentar max-width de 768px a 1280px en todas las páginas?
   - **Recomendación**: Sí, para hero y features. Mantener 768px para contenido de lectura.

3. **Animation Library**: ¿Usar Framer Motion para animaciones más complejas?
   - **Recomendación**: No es necesario inicialmente. CSS transitions son suficientes.

4. **Light Mode**: ¿Mantener light mode o enfocarse solo en dark?
   - **Recomendación**: Mantener ambos, pero dark es el diseño principal.

5. **Component Migration**: ¿Migrar todos los shadcn/ui components a nueva API?
   - **Recomendación**: Solo actualizar variantes, no cambiar componentes base.

## Next Steps for Planning Phase

1. **Review this document** with team/stakeholders
2. **Prioritize changes** based on business impact
3. **Estimate effort** for each phase (1-4)
4. **Create implementation tasks** in project management tool
5. **Set up theme switching** mechanism if needed
6. **Create design mockups** for key pages using new system
7. **Plan testing strategy** (unit, visual regression, E2E)
8. **Document migration guide** for future components

## Implementation Notes

- **NO CAMBIAR** las páginas existentes (estructura, contenido, rutas)
- **SOLO APLICAR** nuevos estilos visuales
- **MANTENER** toda la funcionalidad actual
- **TESTEAR** en todas las páginas después de cambios de color
- **DOCUMENTAR** cambios en THEME_CUSTOMIZATION.md
- **COMMIT** cambios de forma incremental por fase

---

**Document Status**: ✅ Complete - Ready for Planning Phase
**Total Files Affected**: 15 critical, 10 medium priority, 5 low priority
**Estimated LOC Changes**: ~500-800 lines across all files
