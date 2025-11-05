# Fase 2: Sistema de Temas y Diseño

## Overview

Implementar un sistema de temas centralizado y customizable que permita cambiar colores fácilmente, con soporte para modo oscuro. Crear componentes base de UI reutilizables siguiendo un sistema de diseño consistente.

## Current State

- Proyecto Next.js configurado
- Tailwind CSS funcionando
- shadcn/ui instalado con componentes base
- next-themes instalado pero no hay toggle UI

## Desired End State

Un sistema de temas completo con:
- Archivo(s) de configuración de colores fácilmente editables
- Variables CSS organizadas por propósito (primary, secondary, accent, etc.)
- Dark mode completamente funcional con toggle UI
- Componentes de tema aplicados globalmente
- Documentación de cómo cambiar colores

### Verification:
- Cambiar valores en el archivo de tema actualiza los colores en toda la app
- Toggle de dark mode funciona visualmente
- Los componentes shadcn/ui respetan los colores del tema
- No hay "flash" de tema incorrecto al cargar

## What We're NOT Doing

- No creamos múltiples temas predefinidos (solo light/dark del mismo esquema de colores)
- No implementamos selector de múltiples color schemes
- No agregamos animaciones complejas de transición de tema
- No personalizamos todos los componentes shadcn/ui (solo los necesarios)

## Implementation Approach

Vamos a extender la configuración base de Tailwind y shadcn/ui para crear un sistema de temas centralizado usando CSS variables. Esto permite cambiar colores editando un solo archivo sin tocar componentes individuales.

---

## Step 1: Configurar Variables de Tema en CSS

### Actualizar: `src/app/globals.css`

Reemplazar el contenido con variables de tema organizadas:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    /* Card colors */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    /* Popover colors */
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    /* Primary brand colors - CUSTOMIZABLE */
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;

    /* Secondary colors - CUSTOMIZABLE */
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    /* Accent colors - CUSTOMIZABLE */
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    /* Muted colors */
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    /* Destructive (errors, delete) */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    /* Border colors */
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    /* Border radius - CUSTOMIZABLE */
    --radius: 0.5rem;
  }

  .dark {
    /* Dark mode background */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    /* Dark mode cards */
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    /* Dark mode popover */
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    /* Dark mode primary - CUSTOMIZABLE */
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    /* Dark mode secondary - CUSTOMIZABLE */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    /* Dark mode accent - CUSTOMIZABLE */
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    /* Dark mode muted */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    /* Dark mode destructive */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    /* Dark mode borders */
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Archivo compila sin errores CSS
- [ ] `npm run dev` inicia correctamente

#### Manual Verification:
- [ ] Los colores base se aplican en la app

---

## Step 2: Crear Archivo de Configuración de Tema

Para facilitar la customización, crear un archivo separado de documentación:

### Archivo: `src/lib/constants/theme-config.ts`

```typescript
/**
 * CONFIGURACIÓN DE COLORES DEL TEMA
 *
 * Para cambiar los colores del sitio, modifica los valores HSL en src/app/globals.css
 *
 * Busca las variables marcadas con "CUSTOMIZABLE":
 * - --primary: Color principal de marca (botones, links, CTA)
 * - --secondary: Color secundario (fondos, cards)
 * - --accent: Color de acento (highlights, badges)
 * - --radius: Border radius global (0.5rem = redondeado medio)
 *
 * Formato HSL: hue saturation% lightness%
 * Ejemplo: 221.2 83.2% 53.3%
 *          └─hue └─sat  └─light
 *
 * Herramientas útiles:
 * - https://hslpicker.com/ - Seleccionar colores en HSL
 * - https://www.sessions.edu/color-calculator/ - Calcular paletas
 */

export const THEME_CONFIG = {
  // Valores por defecto (referencia)
  light: {
    primary: '221.2 83.2% 53.3%',      // Azul vibrante
    secondary: '210 40% 96.1%',         // Gris muy claro
    accent: '210 40% 96.1%',            // Mismo que secondary
  },
  dark: {
    primary: '217.2 91.2% 59.8%',      // Azul más claro para contraste
    secondary: '217.2 32.6% 17.5%',     // Gris oscuro
    accent: '217.2 32.6% 17.5%',        // Mismo que secondary
  },
} as const

// Ejemplos de paletas alternativas:
export const EXAMPLE_PALETTES = {
  green: {
    light: {
      primary: '142 71% 45%',    // Verde esmeralda
      secondary: '210 40% 96.1%',
      accent: '142 71% 45%',
    },
    dark: {
      primary: '142 71% 55%',
      secondary: '217.2 32.6% 17.5%',
      accent: '142 71% 55%',
    },
  },
  purple: {
    light: {
      primary: '262 83% 58%',    // Púrpura
      secondary: '210 40% 96.1%',
      accent: '262 83% 58%',
    },
    dark: {
      primary: '262 83% 68%',
      secondary: '217.2 32.6% 17.5%',
      accent: '262 83% 68%',
    },
  },
  orange: {
    light: {
      primary: '24 95% 53%',     // Naranja vibrante
      secondary: '210 40% 96.1%',
      accent: '24 95% 53%',
    },
    dark: {
      primary: '24 95% 63%',
      secondary: '217.2 32.6% 17.5%',
      accent: '24 95% 63%',
    },
  },
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Archivo se importa sin errores TypeScript

---

## Step 3: Crear Componente de Toggle de Dark Mode

### Archivo: `src/components/ui/theme-toggle.tsx`

```typescript
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Instalar componente dropdown:

```bash
npx shadcn@latest add dropdown-menu
```

### Success Criteria:

#### Automated Verification:
- [ ] Componente compila sin errores TypeScript
- [ ] `npm run build` exitoso

#### Manual Verification:
- [ ] Componente se puede importar y renderizar

---

## Step 4: Crear Componente de Toggle Simple (Alternativa)

Para usar en el header sin dropdown:

### Archivo: `src/components/ui/theme-toggle-simple.tsx`

```typescript
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggleSimple() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Evitar hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Cambiar tema"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Componente compila sin errores

---

## Step 5: Actualizar Tailwind Config para Usar Variables

### Archivo: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### Success Criteria:

#### Automated Verification:
- [ ] Archivo compila sin errores
- [ ] `npm run dev` funciona correctamente

---

## Step 6: Crear Página de Demostración de Tema

Para probar visualmente todos los colores:

### Archivo: `src/app/theme-demo/page.tsx`

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Demostración de Tema</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* Colores de fondo */}
        <Card>
          <CardHeader>
            <CardTitle>Colores de Fondo</CardTitle>
            <CardDescription>Background, Card, Popover</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Background</p>
                <div className="h-20 rounded-md bg-background border" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Card</p>
                <div className="h-20 rounded-md bg-card border" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Popover</p>
                <div className="h-20 rounded-md bg-popover border" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colores de marca */}
        <Card>
          <CardHeader>
            <CardTitle>Colores de Marca</CardTitle>
            <CardDescription>Primary, Secondary, Accent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Primary</p>
                <div className="h-20 rounded-md bg-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Secondary</p>
                <div className="h-20 rounded-md bg-secondary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Accent</p>
                <div className="h-20 rounded-md bg-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <Card>
          <CardHeader>
            <CardTitle>Botones</CardTitle>
            <CardDescription>Diferentes variantes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>

        {/* Texto */}
        <Card>
          <CardHeader>
            <CardTitle>Tipografía</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <p className="text-lg">Párrafo grande con texto foreground</p>
            <p className="text-base">Párrafo normal con texto foreground</p>
            <p className="text-sm text-muted-foreground">Texto muted (secundario)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [ ] Navegar a `/theme-demo` muestra la página correctamente
- [ ] Toggle de tema cambia todos los colores visualmente
- [ ] No hay "flash" al cambiar de tema
- [ ] Todos los componentes se ven bien en light y dark mode

---

## Step 7: Crear README de Customización de Tema

### Archivo: `THEME_CUSTOMIZATION.md` (en la raíz)

```markdown
# Guía de Customización de Tema

Este proyecto usa un sistema de temas basado en CSS variables y Tailwind CSS.

## Cómo Cambiar Colores

### 1. Editar Variables CSS

Abre `src/app/globals.css` y busca las variables marcadas con `CUSTOMIZABLE`:

#### Light Mode
```css
:root {
  --primary: 221.2 83.2% 53.3%;      /* Color principal */
  --secondary: 210 40% 96.1%;         /* Color secundario */
  --accent: 210 40% 96.1%;            /* Color de acento */
  --radius: 0.5rem;                   /* Border radius */
}
```

#### Dark Mode
```css
.dark {
  --primary: 217.2 91.2% 59.8%;      /* Color principal (dark) */
  --secondary: 217.2 32.6% 17.5%;     /* Color secundario (dark) */
  --accent: 217.2 32.6% 17.5%;        /* Color de acento (dark) */
}
```

### 2. Formato HSL

Los colores usan formato HSL: `hue saturation% lightness%`

- **Hue (0-360)**: El color base (0=rojo, 120=verde, 240=azul)
- **Saturation (0-100%)**: Intensidad del color
- **Lightness (0-100%)**: Claridad (0%=negro, 100%=blanco)

### 3. Herramientas Útiles

- [HSL Color Picker](https://hslpicker.com/) - Seleccionar colores en HSL
- [Coolors](https://coolors.co/) - Generar paletas
- [Adobe Color](https://color.adobe.com/) - Crear esquemas de color

### 4. Paletas de Ejemplo

Ve ejemplos en `src/lib/constants/theme-config.ts`

## Cambiar Border Radius

Para hacer el diseño más/menos redondeado:

```css
--radius: 0rem;      /* Sin redondeo */
--radius: 0.25rem;   /* Poco redondeado */
--radius: 0.5rem;    /* Medio (default) */
--radius: 1rem;      /* Muy redondeado */
```

## Probar Cambios

1. Inicia el servidor: `npm run dev`
2. Ve a `/theme-demo` para ver todos los componentes
3. Usa el toggle de dark mode para verificar ambos temas

## Tips

- Mantén suficiente contraste entre `primary` y `primary-foreground`
- En dark mode, usa colores más claros que en light mode
- Prueba la accesibilidad con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
```

### Success Criteria:

#### Manual Verification:
- [ ] El archivo README es claro y fácil de seguir

---

## Testing Strategy

### Unit Tests (Vitest):

**Archivo**: `src/components/ui/theme-toggle.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeToggle } from './theme-toggle'
import { ThemeProvider } from '@/components/providers/theme-provider'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
    theme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ThemeToggle', () => {
  it('should render theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should have accessible label', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /cambiar tema/i })
    expect(button).toBeInTheDocument()
  })

  it('should open dropdown menu on click', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/claro/i)).toBeInTheDocument()
    expect(screen.getByText(/oscuro/i)).toBeInTheDocument()
    expect(screen.getByText(/sistema/i)).toBeInTheDocument()
  })
})
```

**Archivo**: `src/components/ui/theme-toggle-simple.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeToggleSimple } from './theme-toggle-simple'
import { ThemeProvider } from '@/components/providers/theme-provider'

vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
    theme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ThemeToggleSimple', () => {
  it('should render toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggleSimple />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should toggle theme on click', async () => {
    const setTheme = vi.fn()
    vi.mocked(require('next-themes').useTheme).mockReturnValue({
      setTheme,
      theme: 'light',
    })

    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeToggleSimple />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
```

**Tests de configuración de tema**:

**Archivo**: `src/lib/constants/theme-config.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { THEME_CONFIG, EXAMPLE_PALETTES } from './theme-config'

describe('Theme Configuration', () => {
  it('should have valid light theme colors', () => {
    expect(THEME_CONFIG.light.primary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
    expect(THEME_CONFIG.light.secondary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
    expect(THEME_CONFIG.light.accent).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
  })

  it('should have valid dark theme colors', () => {
    expect(THEME_CONFIG.dark.primary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
    expect(THEME_CONFIG.dark.secondary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
    expect(THEME_CONFIG.dark.accent).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
  })

  it('should have example palettes with valid colors', () => {
    Object.values(EXAMPLE_PALETTES).forEach((palette) => {
      expect(palette.light.primary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
      expect(palette.dark.primary).toMatch(/^\d+\.?\d* \d+\.?\d*% \d+\.?\d*%$/)
    })
  })
})
```

**Comandos de test**:
```bash
npm run test                 # Run all unit tests
npm run test theme-toggle    # Run specific tests
npm run test:coverage        # Coverage report
```

### E2E Tests (Playwright):

**Archivo**: `e2e/theme.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Theme System', () => {
  test('should load with system theme', async ({ page }) => {
    await page.goto('/')

    // Verificar que el theme provider está presente
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'es')
  })

  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/')

    // Click en theme toggle (asumiendo que está en el header en Fase 3)
    // Este test se completará en Fase 3 cuando el header esté implementado
  })

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/')

    // Cambiar a dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark')
    })

    await page.reload()

    // Verificar que se mantuvo dark mode
    const theme = await page.evaluate(() => localStorage.getItem('theme'))
    expect(theme).toBe('dark')
  })

  test('should display theme demo page correctly', async ({ page }) => {
    await page.goto('/theme-demo')

    // Verificar título
    await expect(page.getByRole('heading', { name: /demostración de tema/i })).toBeVisible()

    // Verificar secciones
    await expect(page.getByText(/colores de fondo/i)).toBeVisible()
    await expect(page.getByText(/colores de marca/i)).toBeVisible()
    await expect(page.getByText(/botones/i)).toBeVisible()
  })

  test('should render all theme components on demo page', async ({ page }) => {
    await page.goto('/theme-demo')

    // Verificar que hay botones de diferentes variantes
    await expect(page.getByRole('button', { name: /default/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /secondary/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /destructive/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /outline/i })).toBeVisible()
  })

  test('should work in both desktop and mobile', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/theme-demo')
    await expect(page.getByText(/demostración de tema/i)).toBeVisible()

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/theme-demo')
    await expect(page.getByText(/demostración de tema/i)).toBeVisible()
  })
})
```

**Comandos de E2E test**:
```bash
npm run test:e2e             # Run all E2E tests
npm run test:e2e:ui          # Run with UI
npm run test:e2e -- theme    # Run only theme tests
```

### Manual Testing Checklist:
1. [ ] Iniciar servidor de desarrollo
2. [ ] Ir a `/theme-demo`
3. [ ] Verificar que todos los componentes se renderizan correctamente
4. [ ] Cambiar entre light/dark mode y verificar transición suave
5. [ ] Verificar que no hay "flash" de tema incorrecto al cargar
6. [ ] Cambiar valores de color en `globals.css` y verificar actualización inmediata
7. [ ] Verificar en diferentes navegadores (Chrome, Firefox, Safari)
8. [ ] Verificar que la preferencia se persiste al recargar la página
9. [ ] Verificar que el toggle funciona correctamente
10. [ ] Verificar contraste de colores con herramientas de accesibilidad

### Verificación de Accesibilidad:
```bash
# Opcional: Instalar axe para tests de accesibilidad
npm install -D @axe-core/playwright

# Agregar test de accesibilidad
```

**Archivo**: `e2e/theme-accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Theme Accessibility', () => {
  test('should not have accessibility violations in light mode', async ({ page }) => {
    await page.goto('/theme-demo')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility violations in dark mode', async ({ page }) => {
    await page.goto('/theme-demo')

    // Cambiar a dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
```

### Coverage Goals:
- Unit tests: >80% coverage en theme components
- E2E tests: Cubrir todos los flujos de cambio de tema
- Accessibility tests: Sin violaciones WCAG AA

---

## Performance Considerations

- CSS variables tienen performance nativa del navegador
- No hay JS runtime overhead para el sistema de temas
- `next-themes` usa localStorage para persistir preferencia

---

## References

- shadcn/ui Theming: https://ui.shadcn.com/docs/theming
- Tailwind CSS Variables: https://tailwindcss.com/docs/customizing-colors
- next-themes: https://github.com/pacocoursey/next-themes

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 3: Layout y Navegación** (`phase-3-layout-navegacion.md`)
