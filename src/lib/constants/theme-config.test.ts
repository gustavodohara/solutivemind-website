import { describe, it, expect } from 'vitest'
import { THEME_CONFIG, EXAMPLE_PALETTES } from './theme-config'

describe('Theme Configuration', () => {
  it('should have valid light theme colors in OKLCH format', () => {
    // OKLCH format: oklch(lightness chroma hue)
    const oklchRegex = /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/
    expect(THEME_CONFIG.light.primary).toMatch(oklchRegex)
    expect(THEME_CONFIG.light.secondary).toMatch(oklchRegex)
    expect(THEME_CONFIG.light.accent).toMatch(oklchRegex)
  })

  it('should have valid dark theme colors in OKLCH format', () => {
    const oklchRegex = /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/
    expect(THEME_CONFIG.dark.primary).toMatch(oklchRegex)
    expect(THEME_CONFIG.dark.secondary).toMatch(oklchRegex)
    expect(THEME_CONFIG.dark.accent).toMatch(oklchRegex)
  })

  it('should have example palettes with valid colors', () => {
    const oklchRegex = /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/
    Object.values(EXAMPLE_PALETTES).forEach((palette) => {
      expect(palette.light.primary).toMatch(oklchRegex)
      expect(palette.dark.primary).toMatch(oklchRegex)
    })
  })

  it('should have all expected example palettes', () => {
    expect(EXAMPLE_PALETTES).toHaveProperty('green')
    expect(EXAMPLE_PALETTES).toHaveProperty('purple')
    expect(EXAMPLE_PALETTES).toHaveProperty('orange')
    expect(EXAMPLE_PALETTES).toHaveProperty('red')
  })
})
