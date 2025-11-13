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

