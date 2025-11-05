/**
 * CONFIGURACIÓN DE COLORES DEL TEMA
 *
 * Para cambiar los colores del sitio, modifica los valores OKLCH en src/app/globals.css
 *
 * Busca las variables marcadas con "CUSTOMIZABLE":
 * - --primary: Color principal de marca (botones, links, CTA)
 * - --secondary: Color secundario (fondos, cards)
 * - --accent: Color de acento (highlights, badges)
 * - --radius: Border radius global (0.5rem = redondeado medio)
 *
 * Formato OKLCH: oklch(lightness chroma hue)
 * Ejemplo: oklch(0.55 0.22 250)
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

export const THEME_CONFIG = {
  // Valores por defecto (referencia)
  light: {
    primary: 'oklch(0.55 0.22 250)', // Azul vibrante
    secondary: 'oklch(0.97 0 0)', // Gris muy claro
    accent: 'oklch(0.97 0 0)', // Mismo que secondary
  },
  dark: {
    primary: 'oklch(0.65 0.22 250)', // Azul más claro para contraste
    secondary: 'oklch(0.269 0 0)', // Gris oscuro
    accent: 'oklch(0.269 0 0)', // Mismo que secondary
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
