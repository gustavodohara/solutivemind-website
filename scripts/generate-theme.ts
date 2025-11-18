/**
 * Theme Generator Script
 *
 * Usage: npm run generate-theme [palette-name]
 * Example: npm run generate-theme solutiveMind
 *
 * This script:
 * 1. Reads palette from src/lib/theme/palettes.ts
 * 2. Generates CSS variables for globals.css
 * 3. Outputs formatted CSS that can be copied to globals.css
 */

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

  // Chart colors based on palette (customizable per palette)
  const chartColors = {
    light: {
      chart1: palette.light.primary,
      chart2: palette.light.secondary,
      chart3: palette.light.accent,
      chart4: 'oklch(0.75 0.10 200)', // Lighter cyan variant
      chart5: 'oklch(0.50 0.12 220)', // Blue-cyan blend
    },
    dark: {
      chart1: palette.dark.primary,
      chart2: palette.dark.secondary,
      chart3: palette.dark.accent,
      chart4: 'oklch(0.80 0.10 200)', // Light cyan variant
      chart5: 'oklch(0.55 0.12 220)', // Medium blue-cyan blend
    },
  }

  return `/* Generated from palette: ${palette.name} */
/* ${palette.description} */

:root {
  /* Border radius - CUSTOMIZABLE */
  --radius: 0.5rem;

${lightVars}

  /* Chart colors - Updated to match new palette */
  --chart-1: ${chartColors.light.chart1};          /* Cyan (primary) */
  --chart-2: ${chartColors.light.chart2};          /* Dark blue (secondary) */
  --chart-3: ${chartColors.light.chart3};          /* Lime green (accent) */
  --chart-4: ${chartColors.light.chart4};          /* Lighter cyan variant */
  --chart-5: ${chartColors.light.chart5};          /* Blue-cyan blend */

  /* Sidebar colors */
  --sidebar: ${palette.light.background};
  --sidebar-foreground: ${palette.light.foreground};
  --sidebar-primary: ${palette.light.primary};
  --sidebar-primary-foreground: ${palette.light.primaryForeground};
  --sidebar-accent: ${palette.light.muted};
  --sidebar-accent-foreground: ${palette.light.foreground};
  --sidebar-border: ${palette.light.border};
  --sidebar-ring: ${palette.light.ring};
}

.dark {
${darkVars}

  /* Dark mode chart colors - Updated to match new palette */
  --chart-1: ${chartColors.dark.chart1};          /* Brighter cyan */
  --chart-2: ${chartColors.dark.chart2};          /* Lighter dark blue */
  --chart-3: ${chartColors.dark.chart3};          /* Bright lime */
  --chart-4: ${chartColors.dark.chart4};          /* Light cyan variant */
  --chart-5: ${chartColors.dark.chart5};          /* Medium blue-cyan blend */

  /* Dark mode sidebar colors */
  --sidebar: ${palette.dark.card};
  --sidebar-foreground: ${palette.dark.foreground};
  --sidebar-primary: ${palette.dark.primary};
  --sidebar-primary-foreground: ${palette.dark.primaryForeground};
  --sidebar-accent: ${palette.dark.muted};
  --sidebar-accent-foreground: ${palette.dark.foreground};
  --sidebar-border: ${palette.dark.border};
  --sidebar-ring: ${palette.dark.ring};
}`
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

main().catch((error) => {
  console.error('Error generating theme:', error)
  process.exit(1)
})

