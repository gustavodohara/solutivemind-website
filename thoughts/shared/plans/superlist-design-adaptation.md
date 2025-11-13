---
date: 2025-11-13
author: Claude Code
git_commit: e19b7a3
branch: new-design-superlist
repository: wt-super-list
status: ready-for-implementation
tags: [implementation-plan, design-system, superlist, tailwind, shadcn-ui, next-js, playwright]
---

# Superlist Design Adaptation Implementation Plan

## Overview

This plan outlines the step-by-step adaptation of the Superlist design aesthetic (https://www.superlist.com/) to the SolutiveMind website. The project will maintain all existing content and functionality while modernizing the visual design with Superlist's bold typography, vibrant colors, generous spacing, and sophisticated animations.

## Current State Analysis

**Tech Stack:**
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS v4 with OKLCH color format
- shadcn/ui components (New York style)
- next-themes for dark mode support
- Framer Motion for animations
- Vitest + Playwright for testing

**Current Design Characteristics:**
- **Colors**: Cyan primary (#00B7C2), Dark blue secondary (#0F4C75), Lime accent (#B5FF4A)
- **Typography**: Geist font family, moderate sizes
- **Spacing**: Standard padding (40-60px between sections)
- **Effects**: Basic transitions, no blur effects
- **Layout**: Centered, responsive grid system

**Key Files Identified:**
- Theme system: `src/lib/theme/palettes.ts`, `src/app/globals.css`
- Layout components: `src/components/layout/` (Header, Hero, Features)
- Product components: `src/components/products/` (ProductCard, ProductGrid)
- UI components: `src/components/ui/` (14 shadcn components)
- Pages: `src/app/` (Home, Servicios, Contacto, Nosotros)

## Desired End State

After implementation, the website will feature:

1. **Superlist-inspired visual design** with bold typography and vibrant colors
2. **Enhanced user experience** with smooth animations and sophisticated hover effects
3. **Maintained functionality** - all existing features work identically
4. **Professional aesthetic** that conveys modernity and quality
5. **Full responsiveness** across mobile, tablet, and desktop
6. **Accessibility compliance** with WCAG 2.1 AA standards

### Verification Criteria:
- Design matches Superlist aesthetic (large typography, generous spacing, modern effects)
- All E2E tests pass: `npm run test:e2e`
- No console errors on any page
- Lighthouse scores: Performance >90, Accessibility >95
- Visual regression testing via Playwright screenshots

## What We're NOT Doing

- ❌ Adding new pages or routes
- ❌ Changing core functionality or business logic
- ❌ Modifying the content management approach
- ❌ Replacing the Next.js framework
- ❌ Changing from Tailwind CSS v4
- ❌ Removing existing features
- ❌ Changing the Geist font family
- ❌ Modifying form validation logic or data schemas

## Implementation Approach

The implementation follows a **progressive enhancement strategy** with 10 distinct phases. Each phase is self-contained, testable, and builds upon previous phases. Visual testing with Playwright is integrated at every step to ensure quality and catch regressions early.

**Key Principles:**
1. **Test-driven**: Every change is verified visually and functionally
2. **Incremental**: Small, focused changes that don't break existing functionality
3. **Reversible**: Each phase can be rolled back independently
4. **Progressive**: Later phases build on foundations from earlier phases

---

## Phase 1: Create Superlist-Inspired Color Palette

### Overview
Establish a new color palette inspired by Superlist's design, featuring darker backgrounds, higher contrast, and vibrant accent colors while maintaining OKLCH format for perceptual uniformity.

### Changes Required

#### 1. Color Palette Definition
**File**: `src/lib/theme/palettes.ts`
**Changes**: Add new `superlistPalette` export

```typescript
// Add after existing palettes (line ~114)
export const superlistPalette: ThemePalette = {
  name: 'Superlist',
  description: 'Bold, modern palette inspired by Superlist with dark backgrounds and vibrant accents',
  light: {
    // Very light, subtle gray background
    background: 'oklch(0.97 0.005 240)',
    // Deep, almost black text for maximum contrast
    foreground: 'oklch(0.15 0.02 240)',
    // Pure white cards that pop
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.15 0.02 240)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.15 0.02 240)',
    // Vibrant red primary (Superlist-inspired)
    primary: 'oklch(0.55 0.20 10)',
    primaryForeground: 'oklch(1 0 0)',
    // Deep blue secondary
    secondary: 'oklch(0.45 0.15 250)',
    secondaryForeground: 'oklch(1 0 0)',
    // Bright blue accent
    accent: 'oklch(0.65 0.22 200)',
    accentForeground: 'oklch(0.15 0.02 240)',
    // Subtle gray muted elements
    muted: 'oklch(0.94 0.005 240)',
    mutedForeground: 'oklch(0.50 0.01 240)',
    // Standard destructive
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(0.985 0 0)',
    // Light borders
    border: 'oklch(0.88 0.005 240)',
    input: 'oklch(0.88 0.005 240)',
    ring: 'oklch(0.55 0.20 10)',
  },
  dark: {
    // Very dark, almost black background (Superlist style)
    background: 'oklch(0.15 0.02 240)',
    // Almost white foreground for high contrast
    foreground: 'oklch(0.95 0.01 240)',
    // Slightly lighter cards
    card: 'oklch(0.18 0.02 240)',
    cardForeground: 'oklch(0.95 0.01 240)',
    popover: 'oklch(0.18 0.02 240)',
    popoverForeground: 'oklch(0.95 0.01 240)',
    // Brighter vibrant red for dark mode
    primary: 'oklch(0.60 0.20 10)',
    primaryForeground: 'oklch(1 0 0)',
    // Lighter deep blue
    secondary: 'oklch(0.50 0.15 250)',
    secondaryForeground: 'oklch(1 0 0)',
    // Bright blue accent
    accent: 'oklch(0.70 0.22 200)',
    accentForeground: 'oklch(0.15 0.02 240)',
    // Dark muted elements
    muted: 'oklch(0.25 0.03 240)',
    mutedForeground: 'oklch(0.65 0.01 240)',
    // Destructive for dark mode
    destructive: 'oklch(0.704 0.191 22.216)',
    destructiveForeground: 'oklch(0.985 0 0)',
    // Subtle borders with transparency
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.60 0.20 10)',
  },
}
```

**Changes**: Update active palette export (line ~165)
```typescript
// Change from:
export const activePalette = solutiveMindPalette

// To:
export const activePalette = superlistPalette
```

**Changes**: Update allPalettes export (line ~168)
```typescript
export const allPalettes = {
  solutiveMind: solutiveMindPalette,
  original: originalPalette,
  superlist: superlistPalette,  // ADD THIS LINE
}
```

#### 2. Generate CSS Variables
**File**: `scripts/generate-theme.ts` (Run command)
**Command**:
```bash
npm run generate-theme superlist
```

**Action**: The script will output CSS variables. Copy the output.

#### 3. Update Global Styles
**File**: `src/app/globals.css`
**Changes**: Replace color variables in `:root` (lines 46-103) and `.dark` (lines 105-159)

Paste the generated CSS from step 2 into these sections, replacing all color variable definitions while keeping the structure intact.

#### 4. Update Theme Config Documentation
**File**: `src/lib/constants/theme-config.ts`
**Changes**: Update THEME_CONFIG reference values (lines 29-40)

```typescript
export const THEME_CONFIG = {
  light: {
    primary: 'oklch(0.55 0.20 10)', // Vibrant red
    secondary: 'oklch(0.45 0.15 250)', // Deep blue
    accent: 'oklch(0.65 0.22 200)', // Bright blue
  },
  dark: {
    primary: 'oklch(0.60 0.20 10)', // Brighter red
    secondary: 'oklch(0.50 0.15 250)', // Lighter blue
    accent: 'oklch(0.70 0.22 200)', // Bright blue
  },
} as const
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build` (dry run, no errors)
- [ ] Linting passes: `npm run lint`
- [ ] Theme script executes successfully: `npm run generate-theme superlist`
- [ ] Dev server starts without errors: `npm run dev`

#### Manual Verification:
- [ ] Navigate to `http://localhost:3000` - colors reflect new palette
- [ ] Navigate to `http://localhost:3000/theme-demo` - all color tokens visible
- [ ] Toggle theme (light/dark) - both modes work with new colors
- [ ] Check contrast with browser DevTools - WCAG AA compliance
- [ ] Take Playwright screenshots of home and theme-demo in both modes
- [ ] No console errors in browser

**Playwright Testing Commands:**
```bash
# Start dev server (in background)
npm run dev

# In another terminal/using Playwright tools:
# Navigate and capture
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_take_screenshot() # Capture home light mode

# Toggle to dark mode and capture
mcp__playwright__browser_click(theme_toggle_button)
mcp__playwright__browser_take_screenshot() # Capture home dark mode

# Navigate to theme demo
mcp__playwright__browser_navigate("http://localhost:3000/theme-demo")
mcp__playwright__browser_take_screenshot() # Verify all color tokens

# Check console for errors
mcp__playwright__browser_console_messages({onlyErrors: true})
```

---

## Phase 2: Typography and Global Spacing

### Overview
Enhance typography with larger, bolder text and implement generous spacing between sections to match Superlist's spacious, readable design.

### Changes Required

#### 1. Typography Variables
**File**: `src/app/globals.css`
**Changes**: Add custom typography properties in `@layer base` section (after line 161)

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }

  /* Superlist-inspired Typography */
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }

  h1 {
    @apply text-5xl sm:text-6xl md:text-7xl;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  h2 {
    @apply text-3xl sm:text-4xl md:text-5xl;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  h3 {
    @apply text-2xl sm:text-3xl md:text-4xl;
    line-height: 1.3;
  }

  h4 {
    @apply text-xl sm:text-2xl;
    line-height: 1.4;
  }

  p {
    @apply text-base sm:text-lg;
    line-height: 1.6;
  }

  /* Utility classes for Superlist-style spacing */
  .section-spacing {
    @apply py-20 md:py-32;
  }

  .section-container {
    @apply mx-auto max-w-7xl px-6 md:px-12;
  }

  .content-max-width {
    @apply mx-auto max-w-4xl;
  }
}
```

#### 2. Update Border Radius
**File**: `src/app/globals.css`
**Changes**: Modify `:root` border-radius variable (line 48)

```css
/* From: */
--radius: 0.5rem;

/* To: */
--radius: 0.75rem; /* More rounded, modern feel */
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] CSS compiles without errors: `npm run dev`

#### Manual Verification:
- [ ] All heading sizes are noticeably larger and bolder
- [ ] Line heights are generous (not cramped)
- [ ] Text remains readable on mobile (375px width)
- [ ] Text scales appropriately on tablet (768px) and desktop (1440px)
- [ ] No text overflow or layout breaking
- [ ] Border radius is more pronounced on cards/buttons

**Playwright Testing Commands:**
```bash
# Test responsive typography
mcp__playwright__browser_navigate("http://localhost:3000")

# Mobile
mcp__playwright__browser_resize(375, 667)
mcp__playwright__browser_take_screenshot("typography-mobile")

# Tablet
mcp__playwright__browser_resize(768, 1024)
mcp__playwright__browser_take_screenshot("typography-tablet")

# Desktop
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("typography-desktop")

# Test on different pages
mcp__playwright__browser_navigate("http://localhost:3000/servicios")
mcp__playwright__browser_take_screenshot()

mcp__playwright__browser_navigate("http://localhost:3000/nosotros")
mcp__playwright__browser_take_screenshot()

mcp__playwright__browser_navigate("http://localhost:3000/contacto")
mcp__playwright__browser_take_screenshot()
```

---

## Phase 3: Header Enhancement

### Overview
Modernize the header with increased padding, backdrop blur effects, improved hover states, and better visual hierarchy.

### Changes Required

#### 1. Header Component
**File**: `src/components/layout/header.tsx`
**Changes**: Update header styling and animations (lines 18-61)

```typescript
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isActive } = useActivePath()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo - larger and bolder */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
            SolutiveMind
          </span>
        </Link>

        {/* Desktop Navigation - improved spacing and hover */}
        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-base font-medium transition-all duration-200 hover:text-primary relative',
                isActive(item.href)
                  ? 'text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                  : 'text-foreground/70 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Theme toggle + Mobile menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggleSimple />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
```

#### 2. Mobile Navigation
**File**: `src/components/layout/mobile-nav.tsx`
**Changes**: Read the file first to understand current implementation, then enhance animations and spacing

Expected changes:
- Increase padding in mobile menu
- Improve slide-in animation smoothness
- Enlarge touch targets for better mobile UX
- Add backdrop blur to sheet background

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Component renders without errors

#### Manual Verification:
- [ ] Header has visible backdrop blur effect
- [ ] Navigation links have smooth hover transitions
- [ ] Active page indicator (underline) appears correctly
- [ ] Logo hover effect works smoothly
- [ ] Mobile menu button is easily tappable (min 44x44px)
- [ ] Mobile menu opens/closes smoothly with animation
- [ ] Header remains readable when scrolling over different content

**Playwright Testing Commands:**
```bash
# Desktop header testing
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("header-desktop")

# Test hover states
mcp__playwright__browser_hover(nav_link_servicios)
mcp__playwright__browser_take_screenshot("header-hover")

# Test scroll blur effect
mcp__playwright__browser_evaluate("window.scrollTo(0, 500)")
mcp__playwright__browser_take_screenshot("header-scrolled")

# Mobile header testing
mcp__playwright__browser_resize(375, 667)
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_take_screenshot("header-mobile")

# Test mobile menu
mcp__playwright__browser_click(mobile_menu_button)
mcp__playwright__browser_take_screenshot("mobile-menu-open")

# Verify no console errors
mcp__playwright__browser_console_messages({onlyErrors: true})
```

---

## Phase 4: Hero Section Redesign

### Overview
Transform the hero section into a bold, impactful entry point with large typography, generous spacing, and subtle entrance animations.

### Changes Required

#### 1. Hero Component
**File**: `src/components/layout/hero.tsx`
**Changes**: Complete rewrite with animations and enhanced styling

```typescript
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
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
        'relative overflow-hidden py-24 md:py-40',
        'bg-gradient-to-b from-muted/30 via-background to-background',
        className
      )}
    >
      <div className="section-container">
        <div className="content-max-width space-y-8 text-center">
          {/* Title with fade-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {typeof title === 'string' ? (
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {title}
              </h1>
            ) : (
              title
            )}
          </motion.div>

          {/* Description with slight delay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            {typeof description === 'string' ? (
              <p className="text-muted-foreground text-xl sm:text-2xl md:text-3xl font-light leading-relaxed">
                {description}
              </p>
            ) : (
              description
            )}
          </motion.div>

          {/* Actions with more delay */}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>

      {/* Optional: Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
    </section>
  )
}
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Framer Motion animations compile correctly

#### Manual Verification:
- [ ] Hero title is dramatically larger (visually impactful)
- [ ] Fade-up animations are smooth (not jarring)
- [ ] Vertical spacing is generous (not cramped)
- [ ] Hero works on mobile without text overflow
- [ ] Gradient background is subtle and attractive
- [ ] CTA buttons are easily visible and tappable

**Playwright Testing Commands:**
```bash
# Test hero on home page
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)

# Wait for animations to complete
mcp__playwright__browser_wait_for(text: "SolutiveMind")
mcp__playwright__browser_take_screenshot("hero-desktop")

# Test responsive hero
mcp__playwright__browser_resize(375, 667)
mcp__playwright__browser_take_screenshot("hero-mobile")

mcp__playwright__browser_resize(768, 1024)
mcp__playwright__browser_take_screenshot("hero-tablet")

# Test on other pages with heroes
mcp__playwright__browser_navigate("http://localhost:3000/nosotros")
mcp__playwright__browser_take_screenshot("hero-nosotros")

mcp__playwright__browser_navigate("http://localhost:3000/contacto")
mcp__playwright__browser_take_screenshot("hero-contacto")
```

---

## Phase 5: Features Section Modernization

### Overview
Redesign the features/benefits section with spacious cards, enhanced hover effects, and a clean 3-column grid layout.

### Changes Required

#### 1. Features Section Component
**File**: `src/components/layout/features-section.tsx`
**Changes**: Read file first, then apply modern card design with animations

Expected changes:
- Increase internal card padding (p-8, p-10)
- Implement 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)
- Add sophisticated hover effects (scale, shadow, blur)
- Increase icon sizes significantly
- Add subtle entrance animations with Framer Motion
- More rounded corners (rounded-2xl)

Example structure:
```typescript
'use client'

import { motion } from 'framer-motion'
// ... other imports

export function FeaturesSection() {
  const features = [/* feature data */]

  return (
    <section className="section-spacing">
      <div className="section-container">
        {/* Section header */}
        <div className="content-max-width space-y-4 text-center mb-16">
          <h2>Features Title</h2>
          <p className="text-muted-foreground text-xl">Description</p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-8 md:p-10 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-border/50">
                {/* Large icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Framer Motion viewport animations work

#### Manual Verification:
- [ ] Feature cards have generous internal spacing
- [ ] 3-column layout on desktop (≥1024px), 2-column on tablet (≥768px), 1-column on mobile
- [ ] Hover effects are smooth (scale + shadow)
- [ ] Icons are large and clearly visible
- [ ] Cards have rounded corners (rounded-2xl)
- [ ] Entrance animations trigger when scrolling into view
- [ ] Gap between cards is sufficient (not cramped)

**Playwright Testing Commands:**
```bash
# Navigate to home page (features section)
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)

# Scroll to features section
mcp__playwright__browser_evaluate("document.querySelector('.features-section')?.scrollIntoView({behavior: 'smooth'})")
mcp__playwright__browser_wait_for(1000) # Wait for scroll
mcp__playwright__browser_take_screenshot("features-desktop")

# Test hover effects on each card
mcp__playwright__browser_hover(feature_card_1)
mcp__playwright__browser_take_screenshot("features-hover-1")

mcp__playwright__browser_hover(feature_card_2)
mcp__playwright__browser_take_screenshot("features-hover-2")

# Test responsive grid
mcp__playwright__browser_resize(768, 1024) # Tablet - should show 2 columns
mcp__playwright__browser_take_screenshot("features-tablet")

mcp__playwright__browser_resize(375, 667) # Mobile - should show 1 column
mcp__playwright__browser_take_screenshot("features-mobile")
```

---

## Phase 6: Product Cards and Grid

### Overview
Modernize product/service cards with enhanced visuals, better hover states, and improved information hierarchy.

### Changes Required

#### 1. Product Card Component
**File**: `src/components/products/product-card.tsx`
**Changes**: Enhance styling and interactions (lines 23-55)

```typescript
export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Precio a consultar'
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-border/50 rounded-2xl">
      {/* Image with enhanced hover effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="p-8">
        {/* Category Badge - more prominent */}
        <Badge className="mb-3 w-fit text-sm px-3 py-1">
          {product.category}
        </Badge>

        <CardTitle className="text-2xl font-bold line-clamp-2 mb-3">
          {product.name}
        </CardTitle>

        <CardDescription className="text-base text-muted-foreground line-clamp-3 leading-relaxed">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">
            {formatPrice(product.price)}
          </p>

          <Button
            asChild
            className="group/btn"
            size="lg"
          >
            <Link href={`/servicios/${product.slug}`}>
              Ver más
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### 2. Product Grid Component
**File**: `src/components/products/product-grid.tsx`
**Changes**: Update grid spacing and layout

```typescript
// Expected change in grid container
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

#### 3. Product Detail Page
**File**: `src/components/products/product-detail.tsx`
**Changes**: Read file first, then enhance spacing, typography, and layout

Expected changes:
- Increase section padding
- Larger product images
- Enhanced typography hierarchy
- More whitespace around content blocks

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Image optimization works correctly

#### Manual Verification:
- [ ] Product cards have generous internal padding
- [ ] Hover effects are smooth (scale + shadow + image zoom)
- [ ] Badge, title, description, and price are clearly hierarchical
- [ ] Button has arrow animation on hover
- [ ] Grid has appropriate gaps (not cramped)
- [ ] Cards maintain aspect ratio on all screen sizes
- [ ] Clicking card navigates to detail page correctly

**Playwright Testing Commands:**
```bash
# Navigate to services page
mcp__playwright__browser_navigate("http://localhost:3000/servicios")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("products-grid-desktop")

# Test hover on first product card
mcp__playwright__browser_hover(first_product_card)
mcp__playwright__browser_take_screenshot("product-hover")

# Click to navigate to detail
mcp__playwright__browser_click(first_product_card_button)
mcp__playwright__browser_wait_for(product_detail_title)
mcp__playwright__browser_take_screenshot("product-detail")

# Test responsive grid
mcp__playwright__browser_navigate("http://localhost:3000/servicios")
mcp__playwright__browser_resize(768, 1024) # Tablet
mcp__playwright__browser_take_screenshot("products-tablet")

mcp__playwright__browser_resize(375, 667) # Mobile
mcp__playwright__browser_take_screenshot("products-mobile")
```

---

## Phase 7: Contact Form Enhancement

### Overview
Modernize the contact form with larger inputs, better focus states, clearer validation messages, and improved overall UX.

### Changes Required

#### 1. Contact Form Component
**File**: `src/components/forms/contact-form.tsx`
**Changes**: Read file first, then enhance styling of form controls

Expected changes:
- Increase input/textarea padding (p-4 or more)
- Larger font size (text-lg)
- More pronounced focus states (ring, shadow)
- Larger border radius (rounded-xl)
- Clearer error message positioning and styling
- Increase submit button size
- Add subtle animations on focus/blur

Key areas to modify:
```typescript
// Input fields - example
<Input
  className="text-lg p-4 rounded-xl border-2 focus:ring-4 focus:ring-primary/20"
  {...field}
/>

// Textarea - example
<Textarea
  className="text-lg p-4 rounded-xl border-2 focus:ring-4 focus:ring-primary/20 min-h-[150px]"
  {...field}
/>

// Submit button - example
<Button
  type="submit"
  size="lg"
  className="text-lg px-8 py-6 rounded-xl"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
</Button>

// Error messages - example
{errors.email && (
  <p className="text-destructive text-sm font-medium mt-1 flex items-center gap-1">
    <AlertCircle className="h-4 w-4" />
    {errors.email.message}
  </p>
)}
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Form validation logic unchanged: `npm run test` (Vitest)

#### Manual Verification:
- [ ] Input fields have generous padding (easy to tap/click)
- [ ] Input fields are larger (text-lg or bigger)
- [ ] Focus states are clearly visible with ring/shadow
- [ ] Error messages are easy to read and well-positioned
- [ ] Submit button is large and prominent
- [ ] Form is easy to use on mobile (inputs not too small)
- [ ] Tab navigation works correctly through form
- [ ] Validation triggers appropriately

**Playwright Testing Commands:**
```bash
# Navigate to contact page
mcp__playwright__browser_navigate("http://localhost:3000/contacto")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("contact-form-desktop")

# Test focus states
mcp__playwright__browser_click(input_nombre)
mcp__playwright__browser_take_screenshot("form-focus-nombre")

mcp__playwright__browser_click(input_email)
mcp__playwright__browser_take_screenshot("form-focus-email")

mcp__playwright__browser_click(textarea_mensaje)
mcp__playwright__browser_take_screenshot("form-focus-mensaje")

# Test validation (submit empty)
mcp__playwright__browser_click(submit_button)
mcp__playwright__browser_take_screenshot("form-validation-errors")

# Fill out form correctly
mcp__playwright__browser_type(input_nombre, "Juan Pérez")
mcp__playwright__browser_type(input_email, "juan@example.com")
mcp__playwright__browser_type(input_telefono, "1234567890")
mcp__playwright__browser_type(textarea_mensaje, "Mensaje de prueba")
mcp__playwright__browser_take_screenshot("form-filled")

# Test on mobile
mcp__playwright__browser_resize(375, 667)
mcp__playwright__browser_navigate("http://localhost:3000/contacto")
mcp__playwright__browser_take_screenshot("contact-form-mobile")
```

---

## Phase 8: UI Components Refinement

### Overview
Update all shadcn/ui base components for consistency with the new design system, ensuring proper padding, border radius, and effects throughout.

### Changes Required

#### 1. Button Component
**File**: `src/components/ui/button.tsx`
**Changes**: Increase padding, border-radius, and font-weight in variant definitions

Look for `buttonVariants` and adjust:
- Increase padding in size variants (e.g., `default: "h-11 px-8"` instead of `h-10 px-4`)
- Increase border-radius if not using `rounded-{size}` utilities
- Ensure font-weight is bold enough (font-medium to font-semibold)

#### 2. Card Component
**File**: `src/components/ui/card.tsx`
**Changes**: Update default styling for cards

```typescript
// Example updates
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
)

// Update CardHeader for more padding
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 p-8", className)}
      {...props}
    />
  )
)
```

#### 3. Input Component
**File**: `src/components/ui/input.tsx`
**Changes**: Increase padding and border-radius

```typescript
// Example
className={cn(
  "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base",
  "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
  "disabled:cursor-not-allowed disabled:opacity-50",
  className
)}
```

#### 4. Textarea Component
**File**: `src/components/ui/textarea.tsx`
**Changes**: Similar to Input - padding and border-radius

#### 5. Dialog/Sheet Components
**Files**:
- `src/components/ui/dialog.tsx`
- `src/components/ui/sheet.tsx`

**Changes**: Add backdrop-blur to overlay

```typescript
// In DialogOverlay or SheetOverlay
className={cn(
  "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  className
)}
```

#### 6. Other Components
Review and adjust as needed:
- `badge.tsx` - sizing consistency
- `label.tsx` - font-size adjustment
- `select.tsx` - padding/border-radius
- `dropdown-menu.tsx` - spacing and sizing
- `form.tsx` - error message styling

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Unit tests pass: `npm run test` (if any component tests exist)

#### Manual Verification:
- [ ] All buttons are consistent in size and padding
- [ ] All cards use rounded-2xl
- [ ] All inputs have generous padding and larger text
- [ ] Dialog/Sheet overlays have backdrop blur
- [ ] Form components look cohesive
- [ ] No visual regressions on any page

**Playwright Testing Commands:**
```bash
# Navigate to theme-demo (should showcase all components)
mcp__playwright__browser_navigate("http://localhost:3000/theme-demo")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("components-overview")

# Test button variants
mcp__playwright__browser_hover(button_primary)
mcp__playwright__browser_take_screenshot("button-primary-hover")

mcp__playwright__browser_hover(button_secondary)
mcp__playwright__browser_take_screenshot("button-secondary-hover")

# Test input focus
mcp__playwright__browser_click(example_input)
mcp__playwright__browser_take_screenshot("input-focus")

# Test dialog/modal
mcp__playwright__browser_click(open_dialog_button)
mcp__playwright__browser_take_screenshot("dialog-open-blur")

mcp__playwright__browser_click(close_dialog_button)

# Toggle theme to verify both modes
mcp__playwright__browser_click(theme_toggle)
mcp__playwright__browser_take_screenshot("components-dark-mode")

# Check console for errors
mcp__playwright__browser_console_messages({onlyErrors: true})
```

---

## Phase 9: Animations and Effects Polish

### Overview
Add final polish with smooth animations, optimized transitions, and sophisticated visual effects throughout the application.

### Changes Required

#### 1. Review All Framer Motion Animations
**Files**: All components using Framer Motion

**Changes**:
- Ensure consistent animation durations (200-300ms for micro-interactions, 500ms for page elements)
- Use `ease: 'easeOut'` or `ease: [0.4, 0, 0.2, 1]` for natural motion
- Add `viewport={{ once: true }}` to prevent re-triggering on scroll
- Optimize animation properties (prefer `transform` and `opacity` for GPU acceleration)

#### 2. Optimize Backdrop Blur Usage
**Files**: Components using backdrop-blur

Review performance:
- Limit backdrop-blur usage (it's expensive)
- Use `backdrop-blur-sm` or `backdrop-blur-md` (not `-lg` or `-xl`)
- Apply only where necessary (header, modals, overlays)

#### 3. Add Page Transition Effects
**File**: `src/app/layout.tsx` or create new transition wrapper

Consider adding subtle page transition animations:
```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

#### 4. Image Loading Optimization
**Files**: All Image components

Ensure:
- `loading="lazy"` is set (default in Next.js Image)
- Proper `sizes` attribute for responsive images
- Consider blur placeholders: `placeholder="blur"`

#### 5. Smooth Scroll Behavior
**File**: `src/app/globals.css`

Add smooth scrolling:
```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  /* Optional: Custom scrollbar styling for modern look */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--muted);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--muted-foreground);
  }
}
```

### Success Criteria

#### Automated Verification:
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Build completes successfully without warnings
- [ ] Lighthouse Performance score >90: `npm run build && npm run start`

#### Manual Verification:
- [ ] All animations are smooth (60fps, no jank)
- [ ] Page transitions feel polished
- [ ] No stuttering when scrolling
- [ ] Images load progressively without layout shift
- [ ] Backdrop blur doesn't cause performance issues on mid-range devices
- [ ] Hover effects are instantaneous (no delay)
- [ ] Focus states are clearly visible

**Playwright Testing Commands:**
```bash
# Test animation smoothness
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)

# Capture initial state
mcp__playwright__browser_take_screenshot("animations-home")

# Test slow scroll to see all animations
mcp__playwright__browser_evaluate(`
  window.scrollTo({top: 1000, behavior: 'smooth'})
`)
mcp__playwright__browser_wait_for(2000)
mcp__playwright__browser_take_screenshot("animations-scrolled")

# Test page transitions
mcp__playwright__browser_click(nav_servicios)
mcp__playwright__browser_wait_for(500)
mcp__playwright__browser_take_screenshot("transition-servicios")

mcp__playwright__browser_click(nav_contacto)
mcp__playwright__browser_wait_for(500)
mcp__playwright__browser_take_screenshot("transition-contacto")

# Test on lower-end device (CPU throttling)
mcp__playwright__browser_emulate({cpuThrottlingRate: 4})
mcp__playwright__browser_navigate("http://localhost:3000")
# Verify animations still feel smooth

# Check for performance warnings
mcp__playwright__browser_console_messages()
```

---

## Phase 10: Comprehensive Testing and Quality Assurance

### Overview
Perform exhaustive end-to-end testing across all pages, devices, and user flows to ensure the design adaptation is complete, functional, and meets quality standards.

### Changes Required

No code changes expected in this phase - purely verification and documentation.

### Success Criteria

#### Automated Verification:
- [ ] All unit tests pass: `npm run test`
- [ ] All E2E tests pass: `npm run test:e2e`
- [ ] Type checking passes: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors on any page
- [ ] Lighthouse scores (run on localhost:3000):
  - Performance: >90
  - Accessibility: >95
  - Best Practices: >90
  - SEO: >90

#### Manual Verification - Complete User Flows:
- [ ] **Navigation Flow**: Home → Servicios → Service Detail → Contacto → Nosotros → Home (no errors)
- [ ] **Product Browsing**: View all services, click each card, verify detail pages load
- [ ] **Contact Form**: Fill out and submit form, verify toast notification
- [ ] **Theme Toggle**: Toggle light/dark on every page, verify persistence
- [ ] **Mobile Navigation**: Open/close mobile menu, navigate between pages
- [ ] **Keyboard Navigation**: Tab through all interactive elements, verify focus states
- [ ] **Link Functionality**: All internal/external links work correctly

#### Manual Verification - Responsive Design:
Test all pages at these breakpoints:
- [ ] Mobile: 375px (iPhone SE)
- [ ] Mobile Large: 414px (iPhone Pro Max)
- [ ] Tablet: 768px (iPad)
- [ ] Laptop: 1024px
- [ ] Desktop: 1440px
- [ ] Large Desktop: 1920px

Pages to test:
- [ ] Home (`/`)
- [ ] Servicios (`/servicios`)
- [ ] Service Detail (`/servicios/[slug]`)
- [ ] Contacto (`/contacto`)
- [ ] Nosotros (`/nosotros`)
- [ ] Theme Demo (`/theme-demo`)

#### Manual Verification - Design Compliance:
- [ ] Typography is large, bold, and impactful
- [ ] Spacing between sections is generous (80px+ vertical)
- [ ] Colors match Superlist-inspired palette
- [ ] Hover effects are sophisticated (scale, shadow, smooth)
- [ ] Border radius is modern (rounded-xl, rounded-2xl)
- [ ] Animations are smooth and subtle
- [ ] Backdrop blur effects are present where intended
- [ ] Overall design feels premium and modern

#### Manual Verification - Accessibility:
- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] Color contrast meets WCAG AA (check with browser DevTools)
- [ ] Keyboard navigation works throughout site
- [ ] Focus indicators are clearly visible
- [ ] Screen reader can navigate site (test with VoiceOver/NVDA)
- [ ] No accessibility errors in Lighthouse audit

#### Manual Verification - Browser Compatibility:
Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Comprehensive Playwright Testing Script:**

```bash
# 1. Full User Flow Test
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("qa-home")

# Navigate to Servicios
mcp__playwright__browser_click(nav_servicios)
mcp__playwright__browser_wait_for(text: "Nuestros Servicios")
mcp__playwright__browser_take_screenshot("qa-servicios")

# Click first service card
mcp__playwright__browser_click(first_service_card)
mcp__playwright__browser_wait_for(service_detail_title)
mcp__playwright__browser_take_screenshot("qa-service-detail")

# Navigate to Contacto
mcp__playwright__browser_click(nav_contacto)
mcp__playwright__browser_wait_for(contact_form)
mcp__playwright__browser_take_screenshot("qa-contacto")

# Fill out contact form
mcp__playwright__browser_fill_form([
  {field: "nombre", value: "Test User"},
  {field: "email", value: "test@example.com"},
  {field: "telefono", value: "1234567890"},
  {field: "mensaje", value: "Testing the new design"}
])
mcp__playwright__browser_take_screenshot("qa-form-filled")

# Navigate to Nosotros
mcp__playwright__browser_click(nav_nosotros)
mcp__playwright__browser_wait_for(text: "Sobre")
mcp__playwright__browser_take_screenshot("qa-nosotros")

# 2. Responsive Testing - All Breakpoints
breakpoints = [
  {width: 375, height: 667, name: "mobile-se"},
  {width: 414, height: 896, name: "mobile-pro"},
  {width: 768, height: 1024, name: "tablet"},
  {width: 1024, height: 768, name: "laptop"},
  {width: 1440, height: 900, name: "desktop"},
  {width: 1920, height: 1080, name: "large-desktop"}
]

pages = [
  {url: "http://localhost:3000", name: "home"},
  {url: "http://localhost:3000/servicios", name: "servicios"},
  {url: "http://localhost:3000/contacto", name: "contacto"},
  {url: "http://localhost:3000/nosotros", name: "nosotros"}
]

for (page in pages) {
  for (breakpoint in breakpoints) {
    mcp__playwright__browser_resize(breakpoint.width, breakpoint.height)
    mcp__playwright__browser_navigate(page.url)
    mcp__playwright__browser_take_screenshot(`qa-${page.name}-${breakpoint.name}`)
  }
}

# 3. Theme Toggle Testing
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_resize(1440, 900)
mcp__playwright__browser_take_screenshot("qa-light-mode")

mcp__playwright__browser_click(theme_toggle)
mcp__playwright__browser_take_screenshot("qa-dark-mode")

# Verify persistence
mcp__playwright__browser_navigate("http://localhost:3000/servicios")
mcp__playwright__browser_take_screenshot("qa-dark-mode-persisted")

# 4. Accessibility Testing
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_snapshot() # Accessibility tree

# Test keyboard navigation
mcp__playwright__browser_press_key("Tab")
mcp__playwright__browser_take_screenshot("qa-focus-1")
mcp__playwright__browser_press_key("Tab")
mcp__playwright__browser_take_screenshot("qa-focus-2")
mcp__playwright__browser_press_key("Tab")
mcp__playwright__browser_take_screenshot("qa-focus-3")

# 5. Console and Network Error Checking
all_pages = [
  "http://localhost:3000",
  "http://localhost:3000/servicios",
  "http://localhost:3000/nosotros",
  "http://localhost:3000/contacto",
  "http://localhost:3000/theme-demo"
]

for (page in all_pages) {
  mcp__playwright__browser_navigate(page)

  # Check for console errors
  errors = mcp__playwright__browser_console_messages({onlyErrors: true})
  # Report if errors exist

  # Check for failed network requests
  requests = mcp__playwright__browser_network_requests()
  # Report any 4xx or 5xx responses
}

# 6. Animation Performance Testing
mcp__playwright__browser_navigate("http://localhost:3000")
mcp__playwright__browser_emulate({cpuThrottlingRate: 4}) # Simulate slower device

# Scroll and verify smooth animations
mcp__playwright__browser_evaluate(`
  window.scrollTo({top: 2000, behavior: 'smooth'})
`)
mcp__playwright__browser_wait_for(3000)
mcp__playwright__browser_take_screenshot("qa-animations-throttled")

# 7. Run Existing E2E Tests
# Exit Playwright and run from terminal:
npm run test:e2e
```

#### Final Checklist:
- [ ] All automated tests pass
- [ ] All manual verification items checked
- [ ] No console errors across all pages
- [ ] Design matches Superlist aesthetic
- [ ] Performance is acceptable (Lighthouse >90)
- [ ] Accessibility standards met (WCAG AA)
- [ ] Cross-browser compatibility verified
- [ ] Mobile experience is excellent
- [ ] All user flows work correctly
- [ ] Documentation is complete

---

## Testing Strategy

### Automated Testing

**Unit Tests (Vitest):**
- Run before and after each phase: `npm run test`
- Should cover utilities, helpers, and pure functions
- No new tests needed unless functionality changes

**E2E Tests (Playwright):**
- Existing tests in `e2e/` directory must continue to pass
- Run after major phases: `npm run test:e2e`
- May need to update selectors if markup significantly changes

### Manual Testing

**Visual Regression Testing:**
- Capture screenshots at each phase using Playwright
- Compare before/after at key breakpoints (375px, 768px, 1440px)
- Store screenshots in `.playwright-mcp/` directory

**Interactive Testing:**
- Test all interactive elements (buttons, forms, navigation)
- Verify animations and transitions
- Test theme toggle functionality
- Verify responsive behavior

**Accessibility Testing:**
- Use browser DevTools (Chrome Lighthouse)
- Test keyboard navigation
- Check color contrast ratios
- Verify ARIA labels and semantic HTML

## Performance Considerations

**Optimization Strategies:**
1. **Animations**: Use only `transform` and `opacity` for GPU acceleration
2. **Backdrop Blur**: Limit usage, prefer `-sm` or `-md` variants
3. **Images**: Ensure proper `sizes` and lazy loading
4. **Fonts**: Already optimized with next/font (Geist)
5. **Bundle Size**: Monitor during build - should not increase significantly

**Monitoring:**
- Track bundle size: Check `.next/analyze` after build
- Lighthouse performance scores: Target >90
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

## Migration and Rollback

**Rollback Strategy:**
Each phase is independent and can be rolled back via git:

```bash
# To rollback a specific phase
git log --oneline  # Find commit before phase started
git revert <commit-hash>

# Or reset to before phase
git reset --hard <commit-hash>
```

**Best Practice:**
- Commit after each phase completion
- Use descriptive commit messages: "Phase X: [Phase Name]"
- Tag major milestones: `git tag phase-3-complete`

**No Data Migration Required:**
- No database changes
- No content changes
- Purely visual/CSS updates

## References

- Original research document: `thoughts/shared/research/2025-11-13_15-08-34_superlist-design-adaptation.md`
- Superlist website: https://www.superlist.com/
- Current color palette: `src/lib/theme/palettes.ts`
- Theme customization guide: `THEME_CUSTOMIZATION.md`
- Project instructions: `CLAUDE.md`

## Appendix: Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build
npm run start                  # Run production build locally

# Testing
npm run test                   # Run Vitest unit tests
npm run test:e2e              # Run Playwright E2E tests
npm run test:e2e:ui           # Run E2E with Playwright UI
npm run test:coverage         # Generate test coverage report

# Theme Generation
npm run generate-theme superlist  # Generate CSS for superlist palette

# Code Quality
npm run lint                   # Run ESLint
npx prettier --write .        # Format code with Prettier

# Playwright Commands (via MCP)
# See each phase's "Playwright Testing Commands" section for specific usage
```
