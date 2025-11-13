/**
 * CONFIGURACIÓN DE COLORES DEL TEMA
 *
 * Este archivo re-exporta la paleta activa para fácil referencia.
 * Las definiciones de paletas están en src/lib/theme/palettes.ts
 *
 * Para cambiar temas:
 * 1. Edita src/lib/theme/palettes.ts
 * 2. Ejecuta: npm run generate-theme [nombre-paleta]
 * 3. Copia el CSS generado a src/app/globals.css
 *
 * Formato OKLCH: oklch(lightness chroma hue)
 * Ejemplo: oklch(0.69 0.11 198)
 *          └─light └─chroma └─hue
 *
 * - Lightness (0-1): Claridad (0=negro, 1=blanco)
 * - Chroma (0-0.4): Intensidad del color
 * - Hue (0-360): El color base (0=rojo, 120=verde, 240=azul)
 *
 * Herramientas útiles:
 * - https://oklch.com/ - Color picker para OKLCH
 * - https://www.sessions.edu/color-calculator/ - Calcular paletas
 */

export { activePalette, allPalettes } from '@/lib/theme/palettes'

// Para compatibilidad hacia atrás
export const THEME_CONFIG = {
  // Valores por defecto (referencia)
  light: {
    primary: 'oklch(0.69 0.11 198)', // Cyan
    secondary: 'oklch(0.32 0.08 245)', // Dark blue
    accent: 'oklch(0.92 0.22 125)', // Lime green
  },
  dark: {
    primary: 'oklch(0.75 0.11 198)', // Brighter cyan
    secondary: 'oklch(0.40 0.08 245)', // Lighter dark blue
    accent: 'oklch(0.90 0.22 125)', // Bright lime
  },
} as const

// Ejemplos de paletas alternativas:
export const EXAMPLE_PALETTES = {
  green: {
    light: {
      primary: 'oklch(0.55 0.18 145)', // Verde esmeralda
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
      primary: 'oklch(0.55 0.24 300)', // Púrpura
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
      primary: 'oklch(0.65 0.20 50)', // Naranja vibrante
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
      primary: 'oklch(0.55 0.22 25)', // Rojo
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
