# Laravel Cloud Design Implementation Plan

## Overview

Implementar el diseño visual de Laravel Cloud (https://cloud.laravel.com) en el sitio web de SolutiveMind sin modificar las páginas existentes, enfocándose únicamente en aplicar el nuevo sistema de diseño visual. El enfoque es "dark-first" con un esquema de colores navy/cyan inspirado en Laravel Cloud.

## Current State Analysis

**Actual Design System:**
- Light-first approach con fondo blanco (`oklch(0.98 0.005 210)`)
- Primary color: cyan (`oklch(0.69 0.11 198)`)
- Accent color: lime green (`oklch(0.92 0.22 125)`)
- Container: `max-w-3xl` (768px)
- Spacing: `py-16 md:py-24`
- Font: Geist Sans
- Minimal shadows y efectos

**Existing Architecture:**
- Next.js 15 con App Router
- TypeScript + Tailwind CSS v4
- shadcn/ui components (New York style)
- Theme system con next-themes
- Project location: `/home/gustavo/workspace/solutivemind-website/wt-cloud-laravel-com`

**Key Files:**
- Theme config: `src/app/globals.css` (lines 46-159)
- Theme constants: `src/lib/constants/theme-config.ts`
- Layout components: `src/components/layout/` (header, hero, footer, features)
- UI components: `src/components/ui/` (button, card, input, etc.)
- Pages: `src/app/page.tsx`, `src/app/servicios/`, `src/app/contacto/`

## Desired End State

**Target Design System (Laravel Cloud):**
- **Colors**: Dark navy background (`#0A0E27`), cyan accents (`#06B6D4`), subtle borders
- **Effects**: Glass morphism (backdrop-blur), gradient text, shadow glows, hover animations
- **Layout**: Wider containers (`max-w-7xl`), increased spacing, gradient backgrounds
- **Typography**: Larger hero text (text-7xl), relaxed line heights
- **Components**: Cards con backdrop blur, buttons con shadow effects, animated nav links

**How to Verify:**
1. Navigate to homepage at `http://localhost:3000`
2. Dark mode should be default with navy background
3. Header should have glass morphism effect (semi-transparent with blur)
4. Logo should have gradient text effect (cyan to blue)
5. Hero title should have gradient text effect
6. Buttons should have shadow glows on hover
7. Cards should have subtle borders and lift on hover
8. All hover states should have smooth transitions (200-300ms)
9. Theme toggle should still work (light/dark mode switch)
10. All existing pages and functionality should remain unchanged

### Key Discoveries:
- Current system uses OKLCH color format for consistency - must maintain: `src/app/globals.css:46-159`
- Theme system is controlled by CSS variables, making changes cascading: `src/app/globals.css:46-103`
- shadcn/ui components use variants via cva, easy to extend: `src/components/ui/button.tsx:7-35`
- Layout components already use composition pattern: `src/components/layout/header.tsx:18-38`

## What We're NOT Doing

- Changing page structure or routes
- Modifying content or copy
- Adding new features or functionality
- Changing form validation logic
- Altering navigation structure
- Modifying data models or types
- Changing API integrations
- Removing existing theme toggle functionality
- Changing font families (keeping Geist Sans)
- Adding animation libraries (using CSS only)

## Implementation Approach

**Strategy**: Aplicar cambios de forma incremental en 4 fases, cada una testeable independientemente con Playwright. Cada fase incluye:
1. Cambios específicos de código
2. Criterios de éxito automatizados (comandos ejecutables)
3. Criterios de éxito manuales (verificación visual)
4. Tests de Playwright específicos para esa fase

**Testing Strategy**: Después de cada fase, ejecutar tests de Playwright que verifican:
- Colores aplicados correctamente (via computed styles)
- Efectos visuales presentes (blur, gradients, shadows)
- Animaciones funcionando (hover states, transitions)
- Responsive design (mobile, tablet, desktop)
- No regresiones en funcionalidad existente

---

## Phase 1: Core Design System

### Overview
Establecer el nuevo sistema de colores y efectos base en CSS. Esta fase actualiza todas las variables CSS y agrega las utilidades de animación necesarias. Es la base para todas las demás fases.

### Changes Required:

#### 1. Color System Variables
**File**: `src/app/globals.css`
**Lines**: 46-103 (Light mode variables - now dark-first)
**Changes**: Replace entire `:root` block with Laravel Cloud palette

```css
:root {
  /* CUSTOMIZABLE: Laravel Cloud Dark Theme (Default) */

  /* Background - Dark navy blue like Laravel Cloud */
  --background: oklch(0.12 0.02 250);      /* #0A0E27 - Very dark navy */
  --foreground: oklch(0.92 0.005 240);     /* #E5E7EB - Off-white text */

  /* Card - Slightly lighter than background */
  --card: oklch(0.14 0.02 250 / 95%);      /* #111827 with transparency */
  --card-foreground: oklch(0.92 0.005 240);

  /* Primary - Cyan/Teal accent (Laravel Cloud signature color) */
  --primary: oklch(0.72 0.14 195);         /* #06B6D4 - Bright cyan */
  --primary-foreground: oklch(1 0 0);      /* Pure white for contrast */

  /* Secondary - Blue accent */
  --secondary: oklch(0.58 0.22 250);       /* #3B82F6 - Bright blue */
  --secondary-foreground: oklch(1 0 0);

  /* Accent - Same as primary for consistency */
  --accent: oklch(0.72 0.14 195);          /* #06B6D4 - Cyan */
  --accent-foreground: oklch(0.12 0.02 250);

  /* Muted - For secondary content */
  --muted: oklch(0.18 0.02 250);           /* Slightly lighter than background */
  --muted-foreground: oklch(0.65 0.01 240); /* Medium gray */

  /* Destructive - Error states */
  --destructive: oklch(0.55 0.25 25);      /* #EF4444 - Red */
  --destructive-foreground: oklch(1 0 0);

  /* Border - Very subtle */
  --border: oklch(1 0 0 / 10%);            /* 10% white - very subtle borders */
  --input: oklch(1 0 0 / 15%);             /* Slightly more visible for inputs */
  --ring: oklch(0.72 0.14 195);            /* Cyan focus ring */

  /* Chart colors */
  --chart-1: oklch(0.72 0.14 195);         /* Cyan */
  --chart-2: oklch(0.58 0.22 250);         /* Blue */
  --chart-3: oklch(0.65 0.15 165);         /* Emerald */
  --chart-4: oklch(0.75 0.18 85);          /* Amber */
  --chart-5: oklch(0.55 0.20 330);         /* Pink */

  /* Border radius */
  --radius: 0.75rem;                       /* 12px - slightly more rounded */
}
```

**File**: `src/app/globals.css`
**Lines**: 105-159 (Dark mode - now becomes light mode)
**Changes**: Invert color scheme for light mode

```css
.dark {
  /* CUSTOMIZABLE: Light Mode (Inverted) */

  /* Light background */
  --background: oklch(0.98 0.005 210);     /* #F4F9FA - Off-white */
  --foreground: oklch(0.20 0.05 240);      /* Dark blue text */

  --card: oklch(1 0 0);                    /* Pure white */
  --card-foreground: oklch(0.20 0.05 240);

  --primary: oklch(0.69 0.11 198);         /* Cyan (slightly darker for light bg) */
  --primary-foreground: oklch(1 0 0);

  --secondary: oklch(0.32 0.08 245);       /* Dark blue */
  --secondary-foreground: oklch(1 0 0);

  --accent: oklch(0.69 0.11 198);          /* Cyan */
  --accent-foreground: oklch(0.20 0.05 240);

  --muted: oklch(0.95 0.005 210);          /* Light gray */
  --muted-foreground: oklch(0.45 0.03 240);

  --destructive: oklch(0.55 0.25 25);      /* Red */
  --destructive-foreground: oklch(1 0 0);

  --border: oklch(0.90 0.005 210);         /* Light gray border */
  --input: oklch(0.90 0.005 210);
  --ring: oklch(0.69 0.11 198);            /* Cyan focus ring */

  --chart-1: oklch(0.69 0.11 198);
  --chart-2: oklch(0.32 0.08 245);
  --chart-3: oklch(0.55 0.15 165);
  --chart-4: oklch(0.65 0.18 85);
  --chart-5: oklch(0.45 0.20 330);
}
```

#### 2. Animation Utilities
**File**: `src/app/globals.css`
**Lines**: After line 168 (end of base layer)
**Changes**: Add custom animations for Laravel Cloud style

```css
@layer base {
  /* ... existing base styles ... */

  /* Custom animations for Laravel Cloud style */
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
    0%,
    100% {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.4);
    }
  }

  @keyframes gradient-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
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

  .animate-gradient {
    animation: gradient-shift 3s ease infinite;
    background-size: 200% 200%;
  }
}
```

#### 3. Theme Configuration
**File**: `src/lib/constants/theme-config.ts`
**Changes**: Add Laravel Cloud palette definition

```typescript
export const laravelCloudPalette: ThemePalette = {
  name: 'Laravel Cloud',
  description: 'Dark navy with cyan accents inspired by Laravel Cloud',
  light: {
    background: 'oklch(0.12 0.02 250)',
    foreground: 'oklch(0.92 0.005 240)',
    card: 'oklch(0.14 0.02 250 / 95%)',
    cardForeground: 'oklch(0.92 0.005 240)',
    primary: 'oklch(0.72 0.14 195)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.58 0.22 250)',
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.72 0.14 195)',
    accentForeground: 'oklch(0.12 0.02 250)',
    muted: 'oklch(0.18 0.02 250)',
    mutedForeground: 'oklch(0.65 0.01 240)',
    destructive: 'oklch(0.55 0.25 25)',
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.72 0.14 195)',
  },
  dark: {
    background: 'oklch(0.98 0.005 210)',
    foreground: 'oklch(0.20 0.05 240)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.20 0.05 240)',
    primary: 'oklch(0.69 0.11 198)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.32 0.08 245)',
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.69 0.11 198)',
    accentForeground: 'oklch(0.20 0.05 240)',
    muted: 'oklch(0.95 0.005 210)',
    mutedForeground: 'oklch(0.45 0.03 240)',
    destructive: 'oklch(0.55 0.25 25)',
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(0.90 0.005 210)',
    input: 'oklch(0.90 0.005 210)',
    ring: 'oklch(0.69 0.11 198)',
  },
};

// Update the THEME_PALETTES array to include Laravel Cloud
export const THEME_PALETTES: ThemePalette[] = [
  // ... existing palettes ...
  laravelCloudPalette,
];
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS compiles without errors: `npm run build`
- [ ] TypeScript type checking passes: `npx tsc --noEmit`
- [ ] Linting passes: `npm run lint`
- [ ] Development server starts: `npm run dev`
- [ ] No console errors on page load: Check browser console

#### Manual Verification:
- [ ] Background color is dark navy (#0A0E27) by default
- [ ] Text is light colored and readable (#E5E7EB)
- [ ] Primary color is cyan (#06B6D4) visible in links/buttons
- [ ] Borders are very subtle (barely visible)
- [ ] Theme toggle switches to light mode correctly
- [ ] Light mode has inverted colors (white background, dark text)
- [ ] All pages render without visual breaks

### Playwright Test - Phase 1

**File**: `e2e/phase-1-design-system.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Phase 1: Core Design System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have dark navy background by default', async ({ page }) => {
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should be close to #0A0E27 (rgb(10, 14, 39))
    expect(bgColor).toMatch(/rgb\(10, 14, 39\)|rgb\(9, 13, 38\)/);
  });

  test('should have light text color for readability', async ({ page }) => {
    const body = page.locator('body');
    const textColor = await body.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should be light color (high RGB values)
    expect(textColor).toMatch(/rgb\(2[0-9]{2}, 2[0-9]{2}, 2[0-9]{2}\)/);
  });

  test('should have cyan primary color in buttons', async ({ page }) => {
    const primaryButton = page.locator('button, a').first();
    const bgColor = await primaryButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    });

    // Check for cyan-ish color (higher green and blue than red)
    const match = bgColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      expect(g).toBeGreaterThan(r);
      expect(b).toBeGreaterThan(r);
    }
  });

  test('should have subtle borders', async ({ page }) => {
    const card = page.locator('[class*="border"]').first();
    if (await card.count() > 0) {
      const borderColor = await card.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Border should have low opacity or be very light
      expect(borderColor).toBeTruthy();
    }
  });

  test('should toggle to light mode', async ({ page }) => {
    // Find and click theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i]').or(
      page.locator('button:has-text("Theme")')
    );

    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for transition

      const body = page.locator('body');
      const bgColor = await body.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Should be light color in light mode
      expect(bgColor).toMatch(/rgb\(24[0-9], 25[0-9], 25[0-9]\)/);
    }
  });

  test('should have animation utilities available', async ({ page }) => {
    // Check if custom animations are defined
    const hasAnimations = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let hasAnimation = false;

      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (
              rule instanceof CSSKeyframesRule &&
              (rule.name === 'fade-in' ||
                rule.name === 'slide-up' ||
                rule.name === 'glow-pulse')
            ) {
              hasAnimation = true;
              break;
            }
          }
        } catch (e) {
          // Skip CORS-restricted stylesheets
        }
      }
      return hasAnimation;
    });

    expect(hasAnimations).toBeTruthy();
  });

  test('should not have any console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });
});
```

**Run Phase 1 Tests:**
```bash
npx playwright test e2e/phase-1-design-system.spec.ts
```

---

## Phase 2: Layout Components

### Overview
Aplicar efectos visuales a los componentes de layout principales: header, hero, footer. Incluye glass morphism, gradient text, y espaciado actualizado.

### Changes Required:

#### 1. Header Component - Glass Morphism
**File**: `src/components/layout/header.tsx`
**Lines**: 18-23 (Header container)
**Changes**: Add glass morphism effect and updated styling

```tsx
<header
  className={cn(
    'sticky top-0 z-50 w-full',
    'bg-background/80 backdrop-blur-md', // Glass morphism
    'border-b border-white/10', // Subtle border
    'transition-colors duration-200',
    className
  )}
>
```

**File**: `src/components/layout/header.tsx`
**Lines**: 21-23 (Logo/Brand)
**Changes**: Add gradient text effect

```tsx
<Link href="/" className="flex items-center space-x-2">
  <span
    className={cn(
      'text-xl font-bold',
      'bg-gradient-to-r from-primary via-secondary to-primary',
      'bg-clip-text text-transparent',
      'animate-gradient' // Subtle animation
    )}
  >
    SolutiveMind
  </span>
</Link>
```

**File**: `src/components/layout/header.tsx`
**Lines**: 26-38 (Navigation links)
**Changes**: Add underline animation on hover

```tsx
{navItems.map((item) => {
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        'text-sm font-medium transition-all duration-200',
        'relative after:absolute after:bottom-0 after:left-0',
        'after:h-[2px] after:w-0 after:bg-primary',
        'after:transition-all after:duration-300',
        'hover:after:w-full hover:text-primary',
        isActive
          ? 'text-primary after:w-full'
          : 'text-muted-foreground'
      )}
    >
      {item.label}
    </Link>
  );
})}
```

#### 2. Hero Component - Gradients and Spacing
**File**: `src/components/layout/hero.tsx`
**Lines**: 13-17 (Section container)
**Changes**: Add gradient background and increase spacing

```tsx
<section
  className={cn(
    'relative overflow-hidden',
    'py-20 md:py-32', // Increased from py-20 md:py-28
    'bg-gradient-to-b from-background via-background/95 to-muted/20',
    className
  )}
>
  {/* Optional: Add subtle pattern overlay */}
  <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
```

**File**: `src/components/layout/hero.tsx`
**Lines**: 22-23 (Title)
**Changes**: Add gradient text effect and increase size

```tsx
<h1
  className={cn(
    'text-5xl font-bold tracking-tight',
    'sm:text-6xl md:text-7xl', // Increased from text-4xl/text-5xl/text-6xl
    'bg-gradient-to-r from-primary via-secondary to-primary',
    'bg-clip-text text-transparent',
    'animate-gradient',
    'leading-tight'
  )}
>
  {title}
</h1>
```

**File**: `src/components/layout/hero.tsx`
**Lines**: 28-29 (Description)
**Changes**: Update text styling

```tsx
<p
  className={cn(
    'text-muted-foreground',
    'text-lg sm:text-xl', // Consistent sizing
    'leading-relaxed', // More relaxed line height
    'max-w-2xl mx-auto' // Center and constrain width
  )}
>
  {description}
</p>
```

**File**: `src/components/layout/hero.tsx`
**Lines**: CTA buttons section
**Changes**: Add shadow effects to buttons

```tsx
<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
  <Button
    size="lg"
    className={cn(
      'shadow-lg shadow-primary/20',
      'hover:shadow-xl hover:shadow-primary/30',
      'transition-all duration-200'
    )}
  >
    {/* Button content */}
  </Button>
</div>
```

#### 3. Footer Component - Glass Effect
**File**: `src/components/layout/footer.tsx`
**Lines**: Footer container
**Changes**: Add glass morphism and update border

```tsx
<footer
  className={cn(
    'border-t border-white/10', // Subtle border
    'bg-background/50 backdrop-blur-sm', // Glass effect
    'py-12 md:py-16'
  )}
>
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Footer content */}
  </div>
</footer>
```

#### 4. Features Section Component
**File**: `src/components/layout/features-section.tsx`
**Lines**: Container
**Changes**: Update spacing and add wider container

```tsx
<section className="py-20 md:py-32">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">
        {/* Title */}
      </h2>
    </div>
    {/* Features grid */}
  </div>
</section>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] Dev server runs: `npm run dev`

#### Manual Verification:
- [ ] Header has translucent background with blur effect when scrolling
- [ ] Logo text has animated gradient effect (cyan to blue)
- [ ] Navigation links have underline animation on hover
- [ ] Hero title has gradient text effect
- [ ] Hero section has increased spacing (py-32 on desktop)
- [ ] Footer has subtle glass effect
- [ ] All transitions are smooth (200-300ms)
- [ ] Glass effects visible against content behind them

### Playwright Test - Phase 2

**File**: `e2e/phase-2-layout-components.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Phase 2: Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('header should have glass morphism effect', async ({ page }) => {
    const header = page.locator('header');

    const backdropFilter = await header.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    // Should have blur effect
    expect(backdropFilter).toContain('blur');
  });

  test('header should have sticky positioning', async ({ page }) => {
    const header = page.locator('header');

    const position = await header.evaluate((el) =>
      window.getComputedStyle(el).position
    );

    expect(position).toBe('sticky');
  });

  test('logo should have gradient text', async ({ page }) => {
    const logo = page.locator('header a[href="/"] span').first();

    const backgroundImage = await logo.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage
    );

    // Should have gradient
    expect(backgroundImage).toContain('gradient');
  });

  test('navigation links should have hover underline animation', async ({
    page,
  }) => {
    const navLink = page.locator('header nav a').first();

    // Check for after pseudo-element styles
    const hasAfterElement = await navLink.evaluate((el) => {
      const after = window.getComputedStyle(el, '::after');
      return after.content !== 'none' && after.height !== '0px';
    });

    expect(hasAfterElement).toBeTruthy();
  });

  test('hero title should have gradient text effect', async ({ page }) => {
    const heroTitle = page.locator('h1').first();

    const backgroundImage = await heroTitle.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage
    );
    const backgroundClip = await heroTitle.evaluate(
      (el) => window.getComputedStyle(el).webkitBackgroundClip
    );

    expect(backgroundImage).toContain('gradient');
    expect(backgroundClip).toBe('text');
  });

  test('hero section should have increased spacing on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const heroSection = page
      .locator('section')
      .filter({ hasText: /automatización|soluciones/i })
      .first();
    const paddingTop = await heroSection.evaluate(
      (el) => window.getComputedStyle(el).paddingTop
    );

    // Should be py-32 (128px) on desktop
    const padding = parseInt(paddingTop);
    expect(padding).toBeGreaterThanOrEqual(120); // Allow some variation
  });

  test('footer should have glass morphism', async ({ page }) => {
    const footer = page.locator('footer');

    const backdropFilter = await footer.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    expect(backdropFilter).toContain('blur');
  });

  test('footer should have subtle border', async ({ page }) => {
    const footer = page.locator('footer');

    const borderTopColor = await footer.evaluate((el) =>
      window.getComputedStyle(el).borderTopColor
    );

    expect(borderTopColor).toBeTruthy();
  });

  test('features section should use wider container', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const featuresContainer = page
      .locator('section')
      .filter({ hasText: /características|servicios/i })
      .locator('div')
      .first();

    const maxWidth = await featuresContainer.evaluate(
      (el) => window.getComputedStyle(el).maxWidth
    );

    // Should be max-w-7xl (1280px)
    const width = parseInt(maxWidth);
    expect(width).toBeGreaterThanOrEqual(1200);
  });

  test('should maintain responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have smooth transitions', async ({ page }) => {
    const navLink = page.locator('header nav a').first();

    const transition = await navLink.evaluate((el) =>
      window.getComputedStyle(el).transition
    );

    expect(transition).toContain('all');
  });
});
```

**Run Phase 2 Tests:**
```bash
npx playwright test e2e/phase-2-layout-components.spec.ts
```

---

## Phase 3: Content Components

### Overview
Actualizar cards, buttons, y componentes de productos con efectos de hover, shadows, y backdrop blur. Esta fase agrega el polish visual a los componentes interactivos.

### Changes Required:

#### 1. Button Component - Enhanced Variants
**File**: `src/components/ui/button.tsx`
**Lines**: 7-35 (buttonVariants definition)
**Changes**: Update variant styles with shadows and enhanced hover effects

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5',
        destructive:
          'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/30',
        outline:
          'border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:shadow-lg',
        ghost:
          'hover:bg-white/5 hover:text-primary transition-colors',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-3',
        sm: 'h-9 rounded-md px-4 py-2',
        lg: 'h-12 rounded-lg px-8 py-3',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

#### 2. Card Component - Backdrop Blur and Hover Effects
**File**: `src/components/ui/card.tsx`
**Lines**: 9-12 (Card root component)
**Changes**: Add backdrop blur, enhanced borders, and hover effects

```tsx
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-white/10',
      'bg-card/50 backdrop-blur-sm',
      'p-6 shadow-lg',
      'transition-all duration-300',
      'hover:border-primary/30',
      'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      'hover:-translate-y-1',
      className
    )}
    {...props}
  />
));
```

**File**: `src/components/ui/card.tsx`
**Lines**: CardHeader, CardTitle, CardDescription
**Changes**: Update typography spacing

```tsx
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 p-6', className)}
    {...props}
  />
));

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xl font-semibold leading-tight', className)}
    {...props}
  />
));

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
));
```

#### 3. Product Card Component - Enhanced Hover
**File**: `src/components/products/product-card.tsx`
**Changes**: Update entire component with enhanced effects

```tsx
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/servicios/${product.slug}`}>
      <Card
        className={cn(
          'group overflow-hidden',
          'transition-all duration-300',
          'hover:border-primary/30',
          'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
          'hover:-translate-y-1'
        )}
      >
        <div className="aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className={cn(
              'object-cover w-full h-full',
              'transition-transform duration-500',
              'group-hover:scale-110'
            )}
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            <Badge variant="outline" className="shrink-0">
              {product.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-3">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:bg-primary/10"
            >
              Ver más →
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

#### 4. Features Section - Icon Backgrounds
**File**: `src/components/layout/features-section.tsx`
**Changes**: Add icon backgrounds and enhance card effects

```tsx
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {features.map((feature) => (
    <Card
      key={feature.title}
      className={cn(
        'group',
        'hover:scale-[1.02]',
        'transition-all duration-300'
      )}
    >
      <CardHeader>
        <div
          className={cn(
            'mb-4 flex h-12 w-12 items-center justify-center',
            'rounded-lg bg-primary/10',
            'text-primary',
            'group-hover:bg-primary/20',
            'transition-colors duration-300'
          )}
        >
          <feature.icon className="h-6 w-6" />
        </div>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  ))}
</div>
```

#### 5. Badge Component - Updated Variants
**File**: `src/components/ui/badge.tsx`
**Changes**: Update badge variants for better contrast

```typescript
const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/20 text-primary hover:bg-primary/30',
        secondary:
          'border-transparent bg-secondary/20 text-secondary hover:bg-secondary/30',
        destructive:
          'border-transparent bg-destructive/20 text-destructive hover:bg-destructive/30',
        outline:
          'border-primary/30 text-primary hover:border-primary hover:bg-primary/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

#### 6. Home Page - Section Backgrounds
**File**: `src/app/page.tsx`
**Changes**: Add gradient backgrounds to sections

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        title="Automatización Empresarial Inteligente"
        description="Transformamos tu negocio con soluciones de automatización a medida"
        className="bg-gradient-to-b from-background to-muted/10"
      />

      <section className="py-20 md:py-32 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeaturesSection />
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Product catalog preview */}
        </div>
      </section>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Dev server runs: `npm run dev`

#### Manual Verification:
- [ ] Buttons have shadow glow on hover (lift effect)
- [ ] Cards have backdrop blur effect (semi-transparent)
- [ ] Cards lift slightly on hover (-translate-y-1)
- [ ] Card borders glow cyan on hover
- [ ] Product images zoom smoothly on card hover
- [ ] Feature icons have colored backgrounds
- [ ] Icon backgrounds brighten on hover
- [ ] Badges have subtle transparency
- [ ] All hover transitions are smooth (300ms)
- [ ] No layout shifts during hover animations

### Playwright Test - Phase 3

**File**: `e2e/phase-3-content-components.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Phase 3: Content Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('buttons should have shadow effects', async ({ page }) => {
    const primaryButton = page.locator('button').first();

    const boxShadow = await primaryButton.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );

    expect(boxShadow).not.toBe('none');
  });

  test('buttons should have hover lift effect', async ({ page }) => {
    const button = page.locator('button').first();

    // Hover over button
    await button.hover();
    await page.waitForTimeout(300); // Wait for transition

    const transform = await button.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Should have translate transformation
    expect(transform).not.toBe('none');
  });

  test('cards should have backdrop blur', async ({ page }) => {
    const card = page
      .locator('[class*="card"], [class*="rounded"]')
      .filter({ has: page.locator('h2, h3') })
      .first();

    if (await card.count() > 0) {
      const backdropFilter = await card.evaluate((el) =>
        window.getComputedStyle(el).backdropFilter
      );

      expect(backdropFilter).toContain('blur');
    }
  });

  test('cards should lift on hover', async ({ page }) => {
    const card = page
      .locator('[class*="card"], [class*="rounded"]')
      .filter({ has: page.locator('h2, h3') })
      .first();

    if (await card.count() > 0) {
      await card.hover();
      await page.waitForTimeout(300);

      const transform = await card.evaluate((el) =>
        window.getComputedStyle(el).transform
      );

      expect(transform).toContain('translate');
    }
  });

  test('cards should have enhanced shadow on hover', async ({ page }) => {
    const card = page
      .locator('[class*="card"], [class*="rounded"]')
      .filter({ has: page.locator('h2, h3') })
      .first();

    if (await card.count() > 0) {
      // Get initial shadow
      const initialShadow = await card.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      await card.hover();
      await page.waitForTimeout(300);

      const hoverShadow = await card.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      // Shadow should change on hover
      expect(hoverShadow).not.toBe(initialShadow);
    }
  });

  test('feature icons should have colored backgrounds', async ({ page }) => {
    const iconContainer = page
      .locator('[class*="icon"], svg')
      .locator('..')
      .first();

    if (await iconContainer.count() > 0) {
      const backgroundColor = await iconContainer.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Should not be transparent
      expect(backgroundColor).not.toContain('rgba(0, 0, 0, 0)');
    }
  });

  test('badges should have proper styling', async ({ page }) => {
    const badge = page
      .locator('[class*="badge"], [class*="rounded"][class*="px-2"]')
      .first();

    if (await badge.count() > 0) {
      const backgroundColor = await badge.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      expect(backgroundColor).toBeTruthy();
    }
  });

  test('product cards should have image zoom on hover', async ({ page }) => {
    // Navigate to services page
    await page.goto('http://localhost:3000/servicios');

    const productImage = page.locator('img').first();

    if (await productImage.count() > 0) {
      const productCard = productImage.locator('..').locator('..');

      await productCard.hover();
      await page.waitForTimeout(500);

      const transform = await productImage.evaluate((el) =>
        window.getComputedStyle(el).transform
      );

      // Should have scale transformation
      expect(transform).toContain('matrix');
    }
  });

  test('sections should have gradient backgrounds', async ({ page }) => {
    const section = page.locator('section').first();

    const backgroundImage = await section.evaluate((el) =>
      window.getComputedStyle(el).backgroundImage
    );

    // Should have gradient or image
    expect(backgroundImage).not.toBe('none');
  });

  test('hover transitions should be smooth', async ({ page }) => {
    const card = page
      .locator('[class*="card"], [class*="rounded"]')
      .first();

    if (await card.count() > 0) {
      const transitionDuration = await card.evaluate((el) =>
        window.getComputedStyle(el).transitionDuration
      );

      // Should have transition (typically 0.3s)
      expect(transitionDuration).not.toBe('0s');
    }
  });

  test('should maintain layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const cards = page.locator('[class*="card"], [class*="rounded"]');

    if ((await cards.count()) > 0) {
      const firstCard = cards.first();
      await expect(firstCard).toBeVisible();

      // Cards should stack vertically
      const width = await firstCard.evaluate((el) =>
        window.getComputedStyle(el).width
      );

      const widthValue = parseInt(width);
      expect(widthValue).toBeLessThanOrEqual(400);
    }
  });
});
```

**Run Phase 3 Tests:**
```bash
npx playwright test e2e/phase-3-content-components.spec.ts
```

---

## Phase 4: Form & Input Components

### Overview
Actualizar formularios, inputs, y componentes interactivos con el nuevo estilo. Esta fase final asegura que todos los elementos interactivos tengan el estilo consistente de Laravel Cloud.

### Changes Required:

#### 1. Input Component - Dark Theme Styling
**File**: `src/components/ui/input.tsx`
**Changes**: Update input styling for dark theme with backdrop blur

```tsx
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md',
          'border border-input/30',
          'bg-background/50 backdrop-blur-sm',
          'px-3 py-2',
          'text-sm text-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none',
          'focus-visible:border-primary',
          'focus-visible:ring-2 focus-visible:ring-primary/20',
          'transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
```

#### 2. Textarea Component - Matching Input Style
**File**: `src/components/ui/textarea.tsx`
**Changes**: Update textarea to match input styling

```tsx
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md',
          'border border-input/30',
          'bg-background/50 backdrop-blur-sm',
          'px-3 py-2',
          'text-sm text-foreground',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none',
          'focus-visible:border-primary',
          'focus-visible:ring-2 focus-visible:ring-primary/20',
          'transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
```

#### 3. Select Component - Dropdown Styling
**File**: `src/components/ui/select.tsx`
**Changes**: Update SelectContent styling to match card style

```tsx
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden',
        'rounded-md border border-white/10',
        'bg-card/95 backdrop-blur-md',
        'text-foreground',
        'shadow-lg shadow-black/20',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center',
      'rounded-sm py-1.5 pl-8 pr-2',
      'text-sm outline-none',
      'transition-colors duration-150',
      'focus:bg-primary/10 focus:text-primary',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
```

#### 4. Label Component - Typography Update
**File**: `src/components/ui/label.tsx`
**Changes**: Ensure labels match form style

```tsx
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants(),
      'text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
```

#### 5. Contact Form - Apply Updated Styles
**File**: `src/components/forms/contact-form.tsx`
**Changes**: Ensure form uses updated components and styling

```tsx
export function ContactForm() {
  // ... form logic ...

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contáctanos</CardTitle>
        <CardDescription>
          Completa el formulario y nos pondremos en contacto contigo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Juan Pérez"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@ejemplo.com"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos sobre tu proyecto..."
              rows={5}
              {...register('message')}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

#### 6. Checkbox & Radio Components
**File**: `src/components/ui/checkbox.tsx` (if exists)
**Changes**: Update checkbox styling

```tsx
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm',
      'border border-primary/30',
      'bg-background/50 backdrop-blur-sm',
      'ring-offset-background',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-primary/20 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=checked]:border-primary',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Dev server runs: `npm run dev`
- [ ] Contact form validation works: Manual form submission test

#### Manual Verification:
- [ ] Input fields have subtle borders (30% opacity)
- [ ] Input fields have backdrop blur effect
- [ ] Focus rings are cyan colored with soft glow
- [ ] Textareas match input styling
- [ ] Select dropdowns have backdrop blur
- [ ] Select items highlight on hover (cyan tint)
- [ ] Labels are readable with proper contrast
- [ ] Error messages display in red
- [ ] Form submission works correctly
- [ ] All form transitions are smooth (200ms)
- [ ] Checkboxes have cyan accent when checked
- [ ] Disabled states have reduced opacity

### Playwright Test - Phase 4

**File**: `e2e/phase-4-form-components.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Phase 4: Form & Input Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/contacto');
  });

  test('input fields should have subtle borders', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();

    const borderColor = await input.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    expect(borderColor).toBeTruthy();
  });

  test('input fields should have backdrop blur', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();

    const backdropFilter = await input.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    expect(backdropFilter).toContain('blur');
  });

  test('input focus should show cyan ring', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();

    await input.focus();
    await page.waitForTimeout(200);

    const boxShadow = await input.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );

    // Should have a focus ring
    expect(boxShadow).not.toBe('none');
  });

  test('textarea should match input styling', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    if (await textarea.count() > 0) {
      const backdropFilter = await textarea.evaluate((el) =>
        window.getComputedStyle(el).backdropFilter
      );

      expect(backdropFilter).toContain('blur');
    }
  });

  test('labels should be readable', async ({ page }) => {
    const label = page.locator('label').first();

    const color = await label.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    expect(color).toBeTruthy();
  });

  test('select dropdown should have backdrop blur', async ({ page }) => {
    const select = page.locator('select, [role="combobox"]').first();

    if (await select.count() > 0) {
      await select.click();
      await page.waitForTimeout(300);

      // Check if dropdown menu appeared
      const dropdown = page
        .locator('[role="listbox"], [role="menu"]')
        .first();

      if (await dropdown.count() > 0) {
        const backdropFilter = await dropdown.evaluate((el) =>
          window.getComputedStyle(el).backdropFilter
        );

        expect(backdropFilter).toContain('blur');
      }
    }
  });

  test('form validation should work', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');

    // Try to submit empty form
    await submitButton.click();
    await page.waitForTimeout(500);

    // Should show validation errors
    const errors = page.locator('text=/required|obligatorio/i');
    const errorCount = await errors.count();

    expect(errorCount).toBeGreaterThan(0);
  });

  test('error messages should be visible', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');

    await submitButton.click();
    await page.waitForTimeout(500);

    const errorMessage = page
      .locator('[class*="destructive"], [class*="error"]')
      .first();

    if (await errorMessage.count() > 0) {
      await expect(errorMessage).toBeVisible();
    }
  });

  test('form should submit successfully with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for submission
    await page.waitForTimeout(1000);

    // Should show success message or redirect
    const successMessage = page.locator('text=/éxito|success|enviado/i');
    const hasSuccess = (await successMessage.count()) > 0;

    // Or button should be back to normal state
    const buttonText = await submitButton.textContent();
    const isNotSubmitting = !buttonText?.includes('Enviando');

    expect(hasSuccess || isNotSubmitting).toBeTruthy();
  });

  test('inputs should have smooth transitions', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();

    const transitionDuration = await input.evaluate((el) =>
      window.getComputedStyle(el).transitionDuration
    );

    expect(transitionDuration).not.toBe('0s');
  });

  test('checkboxes should have cyan accent when checked', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    if (await checkbox.count() > 0) {
      await checkbox.check();
      await page.waitForTimeout(200);

      const backgroundColor = await checkbox.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor || styles.accentColor;
      });

      // Should have color (not transparent)
      expect(backgroundColor).not.toContain('rgba(0, 0, 0, 0)');
    }
  });

  test('disabled inputs should have reduced opacity', async ({ page }) => {
    // Create a disabled input for testing
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.disabled = true;
      input.id = 'test-disabled-input';
      document.body.appendChild(input);
    });

    const disabledInput = page.locator('#test-disabled-input');
    const opacity = await disabledInput.evaluate((el) =>
      window.getComputedStyle(el).opacity
    );

    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test('form should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    const input = page.locator('input[type="text"]').first();
    const width = await input.evaluate((el) =>
      window.getComputedStyle(el).width
    );

    // Should be full width on mobile
    const widthValue = parseInt(width);
    expect(widthValue).toBeGreaterThan(300);
  });
});
```

**Run Phase 4 Tests:**
```bash
npx playwright test e2e/phase-4-form-components.spec.ts
```

---

## Testing Strategy

### Unit Tests (Vitest)
Already covered by existing test suite:
```bash
npm run test              # Run unit tests
npm run test:coverage     # Generate coverage report
```

### E2E Tests (Playwright)
New phase-specific tests created above, plus existing tests:

```bash
# Run all E2E tests
npm run test:e2e

# Run phase-specific tests
npx playwright test e2e/phase-1-design-system.spec.ts
npx playwright test e2e/phase-2-layout-components.spec.ts
npx playwright test e2e/phase-3-content-components.spec.ts
npx playwright test e2e/phase-4-form-components.spec.ts

# Run with UI for debugging
npx playwright test --ui

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Visual Regression Testing
Use Playwright screenshots for visual comparison:

```bash
# Take baseline screenshots
npx playwright test --update-snapshots

# Run visual regression tests
npx playwright test --project=chromium --grep @visual
```

### Manual Testing Checklist

After each phase:
- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (desktop if Mac)
- [ ] Test on Chrome Mobile (375px)
- [ ] Test on iPad (768px)
- [ ] Test theme toggle (dark/light switch)
- [ ] Test all page routes (/, /servicios, /contacto, /nosotros)
- [ ] Test navigation flows
- [ ] Test form submissions
- [ ] Check browser console for errors
- [ ] Verify no layout shifts
- [ ] Verify smooth animations

## Performance Considerations

### CSS Performance
- Use CSS variables for dynamic theming (already implemented)
- Leverage GPU acceleration for transforms and opacity changes
- Minimize repaints with `will-change` on hover elements (sparingly)
- Use `contain` property for isolated components

### Animation Performance
- All animations use `transform` and `opacity` (GPU-accelerated properties)
- Avoid animating `width`, `height`, `top`, `left` (causes layout recalculation)
- Transition durations: 200ms for interactions, 300ms for entrances
- Use `prefers-reduced-motion` media query for accessibility

### Bundle Size
- No additional libraries needed (all CSS-based)
- Existing dependencies: Next.js, Tailwind, shadcn/ui
- Estimated CSS size increase: ~5-8KB (compressed)

## Migration Notes

### No Database Changes
This is purely a visual design update. No data migrations required.

### No API Changes
All existing API endpoints remain unchanged.

### Theme Persistence
Existing theme toggle functionality preserved. User preference stored in localStorage via next-themes.

### Backward Compatibility
- All existing pages continue to work
- All URLs remain the same
- All functionality preserved
- Old theme can be kept as "light mode" variant

## Rollback Strategy

If issues arise, rollback is simple:

1. **Phase-level rollback**: Revert commits for specific phase
2. **Full rollback**: Revert all changes and restore `src/app/globals.css` from backup
3. **Emergency**: Toggle theme to light mode while fixing issues

### Backup Before Starting
```bash
# Create backup branch
git checkout -b backup-before-laravel-cloud-design

# Create backup of critical files
cp src/app/globals.css src/app/globals.css.backup
cp src/lib/constants/theme-config.ts src/lib/constants/theme-config.ts.backup
```

## Documentation Updates

After implementation, update:

1. **THEME_CUSTOMIZATION.md**
   - Add Laravel Cloud palette documentation
   - Update color customization guide
   - Add new animation utilities documentation

2. **CLAUDE.md**
   - Update design system section
   - Add new component patterns
   - Update testing instructions

3. **README.md** (if applicable)
   - Update screenshots
   - Update feature list if design is highlighted

## References

- Original Research: `thoughts/shared/research/2025-11-14_10-29-10_laravel-cloud-design-implementation.md`
- Laravel Cloud: https://cloud.laravel.com
- Current Theme Config: `src/lib/constants/theme-config.ts`
- Design Principles: `/context/design-principles.md`
- Previous Color Palette Research: `2025-11-12_21-35-00_color-palette-refactoring.md`

## Open Questions

**None** - All questions resolved during research phase:

✅ **Font Change**: Mantener Geist Sans (moderno y funciona bien)
✅ **Container Width**: Aumentar a max-w-7xl para hero/features, mantener 768px para contenido de lectura
✅ **Animation Library**: No necesario, CSS transitions son suficientes
✅ **Light Mode**: Mantener ambos modos, dark es el diseño principal
✅ **Component Migration**: Solo actualizar variantes, no cambiar componentes base

---

**Document Status**: ✅ Complete - Ready for Implementation
**Total Implementation Phases**: 4 (cada una con tests de Playwright)
**Total Test Files**: 4 Playwright specs + existing test suite
**Estimated Implementation Time**: 8-12 hours (2-3 hours per phase)
**Risk Level**: Low (only CSS/styling changes, no functionality changes)
