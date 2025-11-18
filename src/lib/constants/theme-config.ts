/**
 * THEME CONFIGURATION
 *
 * This file re-exports the active theme palette for easy reference.
 * The actual palette definitions are in src/lib/theme/palettes.ts
 *
 * To change themes:
 * 1. Edit src/lib/theme/palettes.ts
 * 2. Run: npm run generate-theme [palette-name]
 * 3. Copy generated CSS to src/app/globals.css (lines 46-159)
 *
 * OKLCH Format: oklch(lightness chroma hue)
 * Example: oklch(0.69 0.11 198)
 *          └─lightness └─chroma └─hue
 *
 * - Lightness (0-1): Brightness (0=black, 1=white)
 * - Chroma (0-0.4): Color intensity/saturation
 * - Hue (0-360): Color angle (0=red, 120=green, 240=blue)
 *
 * Useful tools:
 * - https://oklch.com/ - OKLCH color picker
 * - https://www.sessions.edu/color-calculator/ - Palette calculator
 */

export { activePalette, allPalettes } from '@/lib/theme/palettes'

// Current active palette values for reference
// These are automatically loaded from activePalette in palettes.ts
export const THEME_CONFIG = {
  light: {
    primary: 'oklch(0.72 0.14 195)', // Bright cyan (Laravel Cloud)
    secondary: 'oklch(0.58 0.22 250)', // Bright blue
    accent: 'oklch(0.72 0.14 195)', // Cyan
  },
  dark: {
    primary: 'oklch(0.69 0.11 198)', // Cyan (slightly darker for light bg)
    secondary: 'oklch(0.32 0.08 245)', // Dark blue
    accent: 'oklch(0.69 0.11 198)', // Cyan
  },
} as const

// Example color palettes for inspiration
// Note: These are examples only. To create a working palette:
// 1. Add it to src/lib/theme/palettes.ts with full color definitions
// 2. Run: npm run generate-theme [palette-name]
// 3. Copy output to src/app/globals.css
export const EXAMPLE_PALETTES = {
  green: {
    light: {
      primary: 'oklch(0.55 0.18 145)', // Emerald green
      secondary: 'oklch(0.97 0 0)',
      accent: 'oklch(0.55 0.18 145)',
    },
    dark: {
      primary: 'oklch(0.65 0.18 145)',
      secondary: 'oklch(0.269 0 0)',
      accent: 'oklch(0.65 0.18 145)',
    },
  },
  purple: {
    light: {
      primary: 'oklch(0.55 0.24 300)', // Purple
      secondary: 'oklch(0.97 0 0)',
      accent: 'oklch(0.55 0.24 300)',
    },
    dark: {
      primary: 'oklch(0.65 0.24 300)',
      secondary: 'oklch(0.269 0 0)',
      accent: 'oklch(0.65 0.24 300)',
    },
  },
  orange: {
    light: {
      primary: 'oklch(0.65 0.20 50)', // Vibrant orange
      secondary: 'oklch(0.97 0 0)',
      accent: 'oklch(0.65 0.20 50)',
    },
    dark: {
      primary: 'oklch(0.70 0.20 50)',
      secondary: 'oklch(0.269 0 0)',
      accent: 'oklch(0.70 0.20 50)',
    },
  },
  red: {
    light: {
      primary: 'oklch(0.55 0.22 25)', // Red
      secondary: 'oklch(0.97 0 0)',
      accent: 'oklch(0.55 0.22 25)',
    },
    dark: {
      primary: 'oklch(0.65 0.22 25)',
      secondary: 'oklch(0.269 0 0)',
      accent: 'oklch(0.65 0.22 25)',
    },
  },
}
