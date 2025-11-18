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
// Paleta: #0F4C75 (textos fuertes), #00B7C2 (cyan), #1B262C (contraste), #F4F9FA (fondo), #B5FF4A (marcadores)
export const solutiveMindPalette: ThemePalette = {
  name: 'SolutiveMind',
  description: 'Professional palette with cyan primary, dark blue secondary, and lime green accents',
  light: {
    // Fondo blanco grisáceo: #F4F9FA
    background: 'oklch(0.98 0.005 210)',
    // Textos fuertes: #0F4C75
    foreground: 'oklch(0.32 0.08 245)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.32 0.08 245)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.32 0.08 245)',
    // Color principal: #00B7C2 (cyan)
    primary: 'oklch(0.69 0.11 198)',
    primaryForeground: 'oklch(1 0 0)',
    // Color secundario: #0F4C75 (textos fuertes/dark blue)
    secondary: 'oklch(0.32 0.08 245)',
    secondaryForeground: 'oklch(1 0 0)',
    // Acento: #B5FF4A (lime green - subrayados/marcadores)
    accent: 'oklch(0.92 0.22 125)',
    accentForeground: 'oklch(0.32 0.08 245)',
    muted: 'oklch(0.95 0.005 210)',
    mutedForeground: 'oklch(0.50 0.01 230)',
    destructive: 'oklch(0.577 0.245 27.325)',
    destructiveForeground: 'oklch(0.985 0 0)',
    border: 'oklch(0.90 0.005 210)',
    input: 'oklch(0.90 0.005 210)',
    ring: 'oklch(0.69 0.11 198)',
  },
  dark: {
    // Fondo oscuro: #1B262C (toques de contraste)
    background: 'oklch(0.16 0.01 230)',
    // Texto claro: #F4F9FA
    foreground: 'oklch(0.98 0.005 210)',
    card: 'oklch(0.20 0.01 230)',
    cardForeground: 'oklch(0.98 0.005 210)',
    popover: 'oklch(0.20 0.01 230)',
    popoverForeground: 'oklch(0.98 0.005 210)',
    // Primary más claro para dark mode
    primary: 'oklch(0.75 0.11 198)',
    primaryForeground: 'oklch(0.16 0.01 230)',
    // Secondary más claro: #0F4C75 variación
    secondary: 'oklch(0.40 0.08 245)',
    secondaryForeground: 'oklch(0.98 0.005 210)',
    // Accent más claro para dark mode
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

// Laravel Cloud Palette (Dark-first design inspired by https://cloud.laravel.com)
export const laravelCloudPalette: ThemePalette = {
  name: 'Laravel Cloud',
  description: 'Dark navy with cyan accents inspired by Laravel Cloud',
  light: {
    // Dark-first: light mode is the "dark" class but has dark colors as default
    background: 'oklch(0.12 0.02 250)',      /* #0A0E27 - Very dark navy */
    foreground: 'oklch(0.92 0.005 240)',     /* #E5E7EB - Off-white text */
    card: 'oklch(0.14 0.02 250 / 95%)',      /* #111827 with transparency */
    cardForeground: 'oklch(0.92 0.005 240)',
    popover: 'oklch(0.14 0.02 250 / 95%)',
    popoverForeground: 'oklch(0.92 0.005 240)',
    primary: 'oklch(0.72 0.14 195)',         /* #06B6D4 - Bright cyan */
    primaryForeground: 'oklch(1 0 0)',       /* Pure white for contrast */
    secondary: 'oklch(0.58 0.22 250)',       /* #3B82F6 - Bright blue */
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.72 0.14 195)',          /* #06B6D4 - Cyan */
    accentForeground: 'oklch(0.12 0.02 250)',
    muted: 'oklch(0.18 0.02 250)',           /* Slightly lighter than background */
    mutedForeground: 'oklch(0.65 0.01 240)', /* Medium gray */
    destructive: 'oklch(0.55 0.25 25)',      /* #EF4444 - Red */
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(1 0 0 / 10%)',            /* 10% white - very subtle borders */
    input: 'oklch(1 0 0 / 15%)',             /* Slightly more visible for inputs */
    ring: 'oklch(0.72 0.14 195)',            /* Cyan focus ring */
  },
  dark: {
    // Inverted: "dark" mode becomes light
    background: 'oklch(0.98 0.005 210)',     /* #F4F9FA - Off-white */
    foreground: 'oklch(0.20 0.05 240)',      /* Dark blue text */
    card: 'oklch(1 0 0)',                    /* Pure white */
    cardForeground: 'oklch(0.20 0.05 240)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.20 0.05 240)',
    primary: 'oklch(0.69 0.11 198)',         /* Cyan (slightly darker for light bg) */
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.32 0.08 245)',       /* Dark blue */
    secondaryForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.69 0.11 198)',          /* Cyan */
    accentForeground: 'oklch(0.20 0.05 240)',
    muted: 'oklch(0.95 0.005 210)',          /* Light gray */
    mutedForeground: 'oklch(0.45 0.03 240)',
    destructive: 'oklch(0.55 0.25 25)',      /* Red */
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(0.90 0.005 210)',         /* Light gray border */
    input: 'oklch(0.90 0.005 210)',
    ring: 'oklch(0.69 0.11 198)',            /* Cyan focus ring */
  },
}

// Export active palette
export const activePalette = laravelCloudPalette

// Export all palettes
export const allPalettes = {
  laravelCloud: laravelCloudPalette,
  solutiveMind: solutiveMindPalette,
  original: originalPalette,
}

