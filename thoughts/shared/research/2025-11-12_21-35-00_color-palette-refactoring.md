---
date: 2025-11-12T21:34:59-03:00
researcher: Claude
git_commit: ada723892777ae3ae4d3a71e3bda24df1ae20156
branch: design-new-colors
repository: solutivemind-website
topic: "Color Palette Change and Theme Refactoring"
tags: [research, theme, colors, refactoring, OKLCH, tailwind]
status: complete
last_updated: 2025-11-12
last_updated_by: Claude
---

# Research: Color Palette Change and Theme Refactoring

**Date**: 2025-11-12T21:34:59-03:00
**Researcher**: Claude
**Git Commit**: ada723892777ae3ae4d3a71e3bda24df1ae20156
**Branch**: design-new-colors
**Repository**: solutivemind-website

## Research Question

How to change the website colors to use the palette from https://coolors.co/0f4c75-00b7c2-1b262c-f4f9fa-b5ff4a and refactor the theme system to make future color changes easier?

## Summary

The SolutiveMind website uses a sophisticated theming system built on:
- **CSS Variables in OKLCH format** (defined in `src/app/globals.css`)
- **Tailwind CSS v4** with inline `@theme` configuration
- **next-themes** for runtime light/dark mode switching

The new color palette can be integrated by:
1. Converting hex colors to OKLCH format
2. Mapping colors to semantic theme tokens (primary, secondary, accent, etc.)
3. Updating CSS variables in `globals.css`
4. Optionally creating a theme configuration system for easier future changes

**Files that need modification**: Only 1-2 files need to be edited:
- `src/app/globals.css` (required - color definitions)
- `src/lib/constants/theme-config.ts` (optional - documentation/presets)

## New Color Palette Conversion

### Hex to OKLCH Conversions

The coolors.co palette converted to OKLCH format:

| Hex | Color Name | RGB | OKLCH Format |
|-----|------------|-----|--------------|
| `#0F4C75` | Dark Blue | rgb(15, 76, 117) | `oklch(0.32 0.08 245)` |
| `#00B7C2` | Cyan/Turquoise | rgb(0, 183, 194) | `oklch(0.69 0.11 198)` |
| `#1B262C` | Very Dark Gray | rgb(27, 38, 44) | `oklch(0.16 0.01 230)` |
| `#F4F9FA` | Very Light Blue | rgb(244, 249, 250) | `oklch(0.98 0.005 210)` |
| `#B5FF4A` | Bright Lime Green | rgb(181, 255, 74) | `oklch(0.92 0.22 125)` |

### OKLCH Format Explanation

`oklch(lightness chroma hue)`:
- **Lightness** (0-1): 0 = black, 1 = white
- **Chroma** (0-0.4): Color saturation/intensity
- **Hue** (0-360): Color angle (0=red, 120=green, 240=blue)

## Recommended Color Mapping Strategy

### Option 1: Professional Dark Theme (Recommended)

This mapping creates a modern, professional look with cyan as the primary brand color and lime green as an accent:

#### Light Mode
```css
:root {
  /* Background colors */
  --background: oklch(0.98 0.005 210);      /* #F4F9FA - Very light blue */
  --foreground: oklch(0.16 0.01 230);       /* #1B262C - Very dark gray */

  /* Card colors */
  --card: oklch(1 0 0);                     /* Pure white for cards */
  --card-foreground: oklch(0.16 0.01 230);  /* Very dark gray text */

  /* Primary brand color - CUSTOMIZABLE */
  --primary: oklch(0.69 0.11 198);          /* #00B7C2 - Cyan */
  --primary-foreground: oklch(1 0 0);       /* White text */

  /* Secondary color - CUSTOMIZABLE */
  --secondary: oklch(0.32 0.08 245);        /* #0F4C75 - Dark blue */
  --secondary-foreground: oklch(1 0 0);     /* White text */

  /* Accent color - CUSTOMIZABLE */
  --accent: oklch(0.92 0.22 125);           /* #B5FF4A - Lime green */
  --accent-foreground: oklch(0.16 0.01 230); /* Dark text for contrast */

  /* Muted colors */
  --muted: oklch(0.95 0.005 210);           /* Slightly darker than background */
  --muted-foreground: oklch(0.50 0.01 230); /* Medium gray */

  /* Border colors */
  --border: oklch(0.90 0.005 210);          /* Light border */
  --input: oklch(0.90 0.005 210);
  --ring: oklch(0.69 0.11 198);             /* Same as primary */
}
```

#### Dark Mode
```css
.dark {
  /* Dark mode background */
  --background: oklch(0.16 0.01 230);       /* #1B262C - Very dark gray */
  --foreground: oklch(0.98 0.005 210);      /* Very light blue */

  /* Dark mode cards */
  --card: oklch(0.20 0.01 230);             /* Slightly lighter than background */
  --card-foreground: oklch(0.98 0.005 210);

  /* Dark mode primary - CUSTOMIZABLE */
  --primary: oklch(0.75 0.11 198);          /* Brighter cyan for contrast */
  --primary-foreground: oklch(0.16 0.01 230); /* Dark background */

  /* Dark mode secondary - CUSTOMIZABLE */
  --secondary: oklch(0.40 0.08 245);        /* Lighter dark blue */
  --secondary-foreground: oklch(0.98 0.005 210);

  /* Dark mode accent - CUSTOMIZABLE */
  --accent: oklch(0.90 0.22 125);           /* Bright lime (slightly darker) */
  --accent-foreground: oklch(0.16 0.01 230); /* Dark text */

  /* Dark mode muted */
  --muted: oklch(0.22 0.01 230);
  --muted-foreground: oklch(0.65 0.005 210);

  /* Dark mode borders */
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.75 0.11 198);
}
```

### Option 2: High-Contrast Lime Accent

Alternative mapping with lime green as the primary color for a more vibrant, energetic look:

```css
:root {
  --primary: oklch(0.92 0.22 125);    /* Lime green */
  --secondary: oklch(0.69 0.11 198);  /* Cyan */
  --accent: oklch(0.32 0.08 245);     /* Dark blue */
}
```

### Color Usage Examples

After applying the new palette, components will look like this:

- **Primary buttons**: Cyan background (`#00B7C2`) with white text
- **Secondary buttons**: Dark blue background (`#0F4C75`) with white text
- **Accent badges/highlights**: Lime green (`#B5FF4A`) with dark text
- **Background**: Very light blue (`#F4F9FA`) in light mode, very dark gray (`#1B262C`) in dark mode
- **Cards**: White cards on light background

## Files That Need Modification

### Primary File (Required)

#### 1. `src/app/globals.css`

**Lines to modify**: 46-159 (CSS variable definitions)

**What to change**:
- Update all `--primary`, `--secondary`, `--accent` values with new OKLCH colors
- Update `--background` and `--foreground` colors
- Update `--card` colors if needed
- Adjust `--muted`, `--border`, `--ring` colors to match the new palette

**Example changes**:
```css
/* Line 51: OLD */
--background: oklch(1 0 0); /* Pure white */

/* Line 51: NEW */
--background: oklch(0.98 0.005 210); /* #F4F9FA - Very light blue */
```

```css
/* Line 63: OLD */
--primary: oklch(0.55 0.22 250); /* Vibrant blue */

/* Line 63: NEW */
--primary: oklch(0.69 0.11 198); /* #00B7C2 - Cyan */
```

### Secondary File (Optional - Documentation)

#### 2. `src/lib/constants/theme-config.ts`

**Lines to modify**: 25-89 (theme configuration examples)

**What to change**:
- Update `THEME_CONFIG` object with new color values
- Optionally add the new palette as a named preset in `EXAMPLE_PALETTES`

**This file is for documentation only** - it doesn't affect the actual theme. The real colors come from `globals.css`.

### Files That DON'T Need Changes

The following files automatically adapt to the new colors via CSS variable inheritance:

- ✅ All UI components (`src/components/ui/*.tsx`) - use semantic classes like `bg-primary`
- ✅ Layout components (`src/components/layout/*.tsx`) - use theme-aware classes
- ✅ Product components (`src/components/products/*.tsx`)
- ✅ Pages (`src/app/**/page.tsx`)
- ✅ Theme toggle components - work with any color scheme

**Exception**: Only `src/components/layout/whatsapp-button.tsx` uses a hardcoded color (`#25D366` for WhatsApp brand green), which should remain unchanged.

## Current Theme System Architecture

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User toggles theme                                       │
│    └─> next-themes adds/removes .dark class on <html>      │
└──────────────┬────────────────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────────────────┐
│ 2. CSS variables re-evaluate based on .dark class          │
│    :root { --primary: oklch(0.69 0.11 198); }  ← light     │
│    .dark { --primary: oklch(0.75 0.11 198); }  ← dark      │
└──────────────┬────────────────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────────────────┐
│ 3. Tailwind maps utilities to CSS variables                │
│    @theme inline {                                          │
│      --color-primary: var(--primary);                       │
│    }                                                        │
└──────────────┬────────────────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────────────────┐
│ 4. Components use Tailwind classes                         │
│    <Button className="bg-primary">Click</Button>           │
│    └─> background-color: var(--color-primary)              │
│        └─> var(--primary)                                   │
│            └─> oklch(0.69 0.11 198)                         │
└─────────────────────────────────────────────────────────────┘
```

### Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/app/globals.css` | CSS variable definitions (OKLCH), Tailwind @theme mapping | 1-169 |
| `src/app/layout.tsx` | ThemeProvider setup with next-themes | 74-91 |
| `src/components/providers/theme-provider.tsx` | next-themes wrapper | all |
| `src/components/ui/theme-toggle.tsx` | Theme switching UI | all |
| `src/lib/constants/theme-config.ts` | Documentation/example palettes | all |

## Refactoring Plan: Improved Theme System

### Current Limitations

1. **No centralized color management**: Colors are only defined in CSS, no JavaScript access
2. **Manual color editing**: Must edit CSS directly for changes
3. **No theme presets**: Can't easily switch between multiple pre-defined palettes
4. **Limited tooling**: No helper functions for color manipulation

### Proposed Improvements

#### Improvement 1: Create a Theme Configuration Module

**New file**: `src/lib/theme/palettes.ts`

```typescript
/**
 * Color Palette Definitions
 *
 * Define all theme palettes here. Each palette includes:
 * - Light and dark mode variants
 * - All semantic color tokens
 * - OKLCH format for perceptual uniformity
 */

export interface ThemePalette {
  name: string
  description: string
  light: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    muted: string
    mutedForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  dark: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    muted: string
    mutedForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
}

// New SolutiveMind Palette (from coolors.co)
export const solutiveMindPalette: ThemePalette = {
  name: 'SolutiveMind',
  description: 'Professional cyan and lime green palette',
  light: {
    background: 'oklch(0.98 0.005 210)',
    foreground: 'oklch(0.16 0.01 230)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.16 0.01 230)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.16 0.01 230)',
    primary: 'oklch(0.69 0.11 198)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.32 0.08 245)',
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.92 0.22 125)',
    accentForeground: 'oklch(0.16 0.01 230)',
    muted: 'oklch(0.95 0.005 210)',
    mutedForeground: 'oklch(0.50 0.01 230)',
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(0.985 0 0)',
    border: 'oklch(0.90 0.005 210)',
    input: 'oklch(0.90 0.005 210)',
    ring: 'oklch(0.69 0.11 198)',
  },
  dark: {
    background: 'oklch(0.16 0.01 230)',
    foreground: 'oklch(0.98 0.005 210)',
    card: 'oklch(0.20 0.01 230)',
    cardForeground: 'oklch(0.98 0.005 210)',
    popover: 'oklch(0.20 0.01 230)',
    popoverForeground: 'oklch(0.98 0.005 210)',
    primary: 'oklch(0.75 0.11 198)',
    primaryForeground: 'oklch(0.16 0.01 230)',
    secondary: 'oklch(0.40 0.08 245)',
    secondaryForeground: 'oklch(0.98 0.005 210)',
    accent: 'oklch(0.90 0.22 125)',
    accentForeground: 'oklch(0.16 0.01 230)',
    muted: 'oklch(0.22 0.01 230)',
    mutedForeground: 'oklch(0.65 0.005 210)',
    destructive: 'oklch(0.704 0.191 22.216)',
    destructiveForeground: 'oklch(0.985 0 0)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.75 0.11 198)',
  },
}

// Original palette (for reference/fallback)
export const originalPalette: ThemePalette = {
  name: 'Original',
  description: 'Original blue palette',
  light: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.55 0.22 250)',
    primaryForeground: 'oklch(0.985 0 0)',
    secondary: 'oklch(0.97 0 0)',
    secondaryForeground: 'oklch(0.205 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    muted: 'oklch(0.97 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(0.985 0 0)',
    border: 'oklch(0.922 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.55 0.22 250)',
  },
  dark: {
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    card: 'oklch(0.205 0 0)',
    cardForeground: 'oklch(0.985 0 0)',
    popover: 'oklch(0.205 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',
    primary: 'oklch(0.65 0.22 250)',
    primaryForeground: 'oklch(0.145 0 0)',
    secondary: 'oklch(0.269 0 0)',
    secondaryForeground: 'oklch(0.985 0 0)',
    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)',
    destructive: 'oklch(0.704 0.191 22.216)',
    destructiveForeground: 'oklch(0.985 0 0)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.65 0.22 250)',
  },
}

// Export active palette
export const activePalette = solutiveMindPalette

// Export all palettes
export const allPalettes = {
  solutiveMind: solutiveMindPalette,
  original: originalPalette,
}
```

#### Improvement 2: Theme Generator Script

**New file**: `scripts/generate-theme.ts`

```typescript
/**
 * Theme Generator Script
 *
 * Usage: npm run generate-theme [palette-name]
 * Example: npm run generate-theme solutiveMind
 *
 * This script:
 * 1. Reads palette from src/lib/theme/palettes.ts
 * 2. Generates CSS variables for globals.css
 * 3. Updates theme-config.ts with current palette
 */

import fs from 'fs'
import path from 'path'
import { allPalettes, type ThemePalette } from '../src/lib/theme/palettes'

function generateCSSVariables(palette: ThemePalette): string {
  const lightVars = Object.entries(palette.light)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join('\n')

  const darkVars = Object.entries(palette.dark)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join('\n')

  return `
/* Generated from palette: ${palette.name} */
/* ${palette.description} */

:root {
  /* Border radius - CUSTOMIZABLE */
  --radius: 0.5rem;

${lightVars}

  /* Chart colors (unchanged) */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
${darkVars}

  /* Dark mode chart colors (unchanged) */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}
`.trim()
}

async function main() {
  const paletteName = process.argv[2] || 'solutiveMind'

  const palette = allPalettes[paletteName as keyof typeof allPalettes]
  if (!palette) {
    console.error(`Error: Palette "${paletteName}" not found`)
    console.log('Available palettes:', Object.keys(allPalettes).join(', '))
    process.exit(1)
  }

  console.log(`Generating theme from palette: ${palette.name}`)
  console.log(`Description: ${palette.description}`)

  const cssContent = generateCSSVariables(palette)

  // Output to console (can be piped to file or copied)
  console.log('\n' + '='.repeat(60))
  console.log('Copy the following CSS to src/app/globals.css (lines 46-159):')
  console.log('='.repeat(60) + '\n')
  console.log(cssContent)
  console.log('\n' + '='.repeat(60))
}

main()
```

Add to `package.json`:
```json
{
  "scripts": {
    "generate-theme": "tsx scripts/generate-theme.ts"
  }
}
```

#### Improvement 3: Update theme-config.ts to Reference Palettes

**Modified file**: `src/lib/constants/theme-config.ts`

```typescript
/**
 * THEME CONFIGURATION
 *
 * This file re-exports the active theme palette for easy reference.
 * The actual palette definitions are in src/lib/theme/palettes.ts
 *
 * To change themes:
 * 1. Edit src/lib/theme/palettes.ts
 * 2. Run: npm run generate-theme [palette-name]
 * 3. Copy generated CSS to src/app/globals.css
 */

export { activePalette, allPalettes } from '@/lib/theme/palettes'

// For backwards compatibility
export const THEME_CONFIG = {
  light: {
    primary: 'See src/lib/theme/palettes.ts',
    secondary: 'See src/lib/theme/palettes.ts',
    accent: 'See src/lib/theme/palettes.ts',
  },
  dark: {
    primary: 'See src/lib/theme/palettes.ts',
    secondary: 'See src/lib/theme/palettes.ts',
    accent: 'See src/lib/theme/palettes.ts',
  },
}
```

## Implementation Plan

### Phase 1: Quick Implementation (Current System)

**Time**: 10-15 minutes

**Steps**:

1. **Backup current theme**:
   ```bash
   cp src/app/globals.css src/app/globals.css.backup
   ```

2. **Update `src/app/globals.css`** (lines 46-159):
   - Replace light mode CSS variables with new OKLCH values (see "Option 1" mapping above)
   - Replace dark mode CSS variables with new OKLCH values
   - Keep chart colors unchanged (or adjust if needed)

3. **Test the changes**:
   ```bash
   npm run dev
   ```
   - Navigate to `/theme-demo` page
   - Toggle between light and dark modes
   - Check all button variants
   - Verify badges, cards, and forms look correct

4. **Optional: Update `src/lib/constants/theme-config.ts`**:
   - Update example values to match new palette
   - Add new palette to `EXAMPLE_PALETTES` as `coolors` or `solutivemind`

5. **Test E2E**:
   ```bash
   npm run test:e2e
   ```

**Result**: New color palette applied, theme system unchanged.

### Phase 2: Enhanced System (Optional Refactoring)

**Time**: 1-2 hours

**Steps**:

1. **Create new directory structure**:
   ```bash
   mkdir -p src/lib/theme scripts
   ```

2. **Create `src/lib/theme/palettes.ts`** with palette definitions (see code above)

3. **Create `scripts/generate-theme.ts`** generator script (see code above)

4. **Install dependencies** (if needed):
   ```bash
   npm install -D tsx
   ```

5. **Add npm script** to `package.json`:
   ```json
   {
     "scripts": {
       "generate-theme": "tsx scripts/generate-theme.ts"
     }
   }
   ```

6. **Generate and apply theme**:
   ```bash
   npm run generate-theme solutiveMind
   # Copy output to src/app/globals.css lines 46-159
   ```

7. **Update `src/lib/constants/theme-config.ts`** to reference new system

8. **Test thoroughly**:
   - Run dev server: `npm run dev`
   - Check `/theme-demo` page
   - Run unit tests: `npm run test`
   - Run E2E tests: `npm run test:e2e`

9. **Documentation**:
   - Update `THEME_CUSTOMIZATION.md` with new workflow
   - Add examples of using the theme generator
   - Document how to create new palettes

**Result**: Improved theme system with:
- Type-safe palette definitions
- Easy theme switching via script
- Centralized color management
- Better tooling for future changes

### Phase 3: Advanced Features (Future Enhancement)

**Possible additions**:

1. **Runtime theme switching**: Allow users to pick from multiple palettes via UI
2. **Color accessibility checker**: Validate contrast ratios automatically
3. **Theme preview tool**: Visual editor for creating palettes
4. **CSS-in-JS integration**: Access theme colors from JavaScript/TypeScript
5. **Design tokens export**: Generate tokens for Figma, Sketch, etc.

## Testing Strategy

### Visual Testing Checklist

After applying new colors, verify:

- [ ] `/` (Home page)
  - [ ] Hero section gradient
  - [ ] Feature cards with icons
  - [ ] Call-to-action buttons
  - [ ] WhatsApp button (should remain green)

- [ ] `/servicios` (Services page)
  - [ ] Product grid layout
  - [ ] Product cards with images
  - [ ] Category badges

- [ ] `/servicios/[slug]` (Service detail page)
  - [ ] Image gallery
  - [ ] Features list
  - [ ] Contact button

- [ ] `/contacto` (Contact page)
  - [ ] Form inputs and labels
  - [ ] Select dropdowns
  - [ ] Submit button
  - [ ] Focus states (ring color)

- [ ] `/nosotros` (About page)
  - [ ] Typography hierarchy
  - [ ] Link colors

- [ ] `/theme-demo` (Theme demo page)
  - [ ] All color swatches
  - [ ] Button variants
  - [ ] Badge variants
  - [ ] Dark mode toggle

- [ ] Global components
  - [ ] Header navigation (active states)
  - [ ] Footer links
  - [ ] Theme toggle button

### Automated Tests

Run existing test suites:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

**Expected**: All tests should pass without modification (theme changes are CSS-only).

### Accessibility Validation

Check contrast ratios:
- Primary color vs white: Must be ≥ 4.5:1
- Foreground vs background: Must be ≥ 4.5:1
- Accent (lime) vs dark: Must be ≥ 4.5:1

Tools:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse

## Code References

### Theme System Files

- `src/app/globals.css:46-159` - CSS variable definitions
- `src/app/globals.css:1-44` - Tailwind @theme mapping
- `src/app/layout.tsx:74-91` - ThemeProvider setup
- `src/components/providers/theme-provider.tsx` - next-themes wrapper
- `src/components/ui/theme-toggle.tsx` - Theme switching UI
- `src/components/ui/button.tsx:7-35` - Button variants using theme colors
- `src/components/ui/badge.tsx:7-24` - Badge variants
- `src/lib/constants/theme-config.ts` - Current theme config (documentation only)

### Color Usage Patterns

- `src/components/ui/button.tsx` - Semantic color usage in variants
- `src/components/ui/card.tsx` - Card background and text colors
- `src/components/ui/input.tsx` - Input borders and focus states
- `src/components/layout/header.tsx:28-37` - Navigation active states
- `src/components/layout/features-section.tsx:33-42` - Icon color accents
- `src/components/layout/whatsapp-button.tsx:28-38` - Hardcoded brand color (exception)

### Test Files

- `src/lib/constants/theme-config.test.ts` - Theme config validation
- `e2e/theme.spec.ts` - E2E theme switching tests

## Architecture Insights

### Two-Level Indirection Pattern

The theme system uses a clever two-level indirection:

```
Component → Tailwind utility → --color-* → var(--*) → OKLCH value
```

**Benefits**:
- Change one CSS variable, update entire site
- No component modifications needed
- Zero runtime overhead (pure CSS)
- Type-safe via Tailwind classes

### OKLCH Advantages

Why OKLCH over HSL/RGB:
- **Perceptually uniform**: Same lightness looks consistent across hues
- **Better saturation**: More vibrant colors
- **Predictable**: Easier to create harmonious palettes
- **Modern**: Designed for wide-gamut displays

### Dark Mode Strategy

Current approach uses `.dark` class switching:
- ✅ No flash of unstyled content
- ✅ Respects system preference
- ✅ Persists user choice (localStorage)
- ✅ SSR-safe with hydration protection

## Open Questions

1. **Should the lime green (#B5FF4A) be the primary or accent color?**
   - Recommendation: Use as accent (more versatile, less overwhelming)
   - Alternative: Primary for maximum impact (more energetic brand)

2. **Should chart colors be updated to match the new palette?**
   - Current: Chart colors are independent
   - Option: Derive chart colors from palette for consistency

3. **Do we need the enhanced theme system (Phase 2) now?**
   - Recommendation: Start with Phase 1 (quick), add Phase 2 if frequent theme changes are expected

4. **Should we support multiple theme palettes for users to choose from?**
   - Complexity: Medium (requires runtime theme switching)
   - Benefit: Personalization, accessibility options
   - Recommendation: Add later if user research indicates demand

## Related Research

- `THEME_CUSTOMIZATION.md` - Current theme customization guide
- `thoughts/shared/research/` - Future research on theme enhancements

## Conclusion

The color palette change requires minimal code modifications (1-2 files) due to the well-architected theme system. The recommended approach is:

1. **Immediate**: Apply Phase 1 (direct CSS updates) to change colors quickly
2. **Short-term**: Implement Phase 2 (enhanced system) for better maintainability
3. **Long-term**: Consider Phase 3 (advanced features) based on user needs

All changes are backwards-compatible and reversible by restoring the backup of `globals.css`.

---

**Next Steps**: Proceed with Phase 1 implementation by updating `src/app/globals.css` with the new OKLCH values from the "Option 1" mapping.
