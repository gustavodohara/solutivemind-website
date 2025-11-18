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

// Superlist-inspired Palette
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

// Export active palette
export const activePalette = superlistPalette

// Export all palettes
export const allPalettes = {
  solutiveMind: solutiveMindPalette,
  original: originalPalette,
  superlist: superlistPalette,
}

