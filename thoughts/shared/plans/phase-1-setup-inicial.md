# Fase 1: Setup Inicial del Proyecto

## Overview

Configurar el proyecto Next.js 15 desde cero con todas las dependencias necesarias, estructura de carpetas, y herramientas de desarrollo. Esta fase establece la base técnica sobre la cual se construirá todo el sitio web.

## Current State

- Repositorio git inicializado
- Solo contiene README.md vacío y directorio thoughts/
- No existe código de aplicación

## Desired End State

Un proyecto Next.js 15 completamente configurado con:
- TypeScript funcionando
- Tailwind CSS configurado
- shadcn/ui instalado y listo para usar
- ESLint y Prettier configurados
- Estructura de carpetas profesional
- Servidor de desarrollo corriendo sin errores

### Verification:
- `npm run dev` inicia el servidor sin errores
- `npm run build` compila exitosamente
- `npm run lint` no muestra errores
- Navegar a `http://localhost:3000` muestra la página de inicio de Next.js

## What We're NOT Doing

- No configuramos backend/database
- No agregamos sistema de pagos
- No implementamos autenticación
- No creamos componentes de UI personalizados (eso es Fase 2+)
- No configuramos CI/CD (se hace en Fase 7)

## Implementation Approach

Usaremos `create-next-app` con las flags correctas para tener TypeScript, Tailwind y App Router desde el inicio. Luego instalaremos shadcn/ui y las dependencias adicionales necesarias. Finalmente crearemos la estructura de carpetas siguiendo las mejores prácticas de Next.js 15.

---

## Step 1: Crear Proyecto Next.js

### Comando:

```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
```

**Flags explicadas:**
- `.` - Instalar en el directorio actual (ya tenemos el repo creado)
- `--typescript` - Usar TypeScript
- `--tailwind` - Configurar Tailwind CSS
- `--app` - Usar App Router (no Pages Router)
- `--eslint` - Configurar ESLint
- `--src-dir` - Usar directorio `src/` para código
- `--import-alias "@/*"` - Usar alias `@/` para imports

### Notas:
- Si pregunta "Ok to proceed?", responder `y`
- Si pregunta sobre sobrescribir README.md, responder `y`
- Esto creará la estructura base del proyecto

### Success Criteria:

#### Automated Verification:
- [ ] Comando ejecuta sin errores
- [ ] Se crean archivos: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- [ ] Se crea directorio `src/app/`
- [ ] Archivo `src/app/layout.tsx` existe
- [ ] Archivo `src/app/page.tsx` existe

---

## Step 2: Instalar Dependencias Adicionales

### Comando:

```bash
npm install zustand react-hook-form @hookform/resolvers zod framer-motion lucide-react
```

**Dependencias:**
- `zustand` - State management (aunque no hay cart, puede servir para otras cosas)
- `react-hook-form` - Manejo de formularios
- `@hookform/resolvers` - Integración Zod con React Hook Form
- `zod` - Validación de esquemas
- `framer-motion` - Animaciones
- `lucide-react` - Iconos

### Success Criteria:

#### Automated Verification:
- [ ] Todas las dependencias aparecen en `package.json`
- [ ] `node_modules/` contiene las dependencias instaladas
- [ ] No hay errores de instalación

---

## Step 3: Configurar shadcn/ui

### Comandos:

```bash
# Inicializar shadcn/ui
npx shadcn@latest init

# Cuando pregunte, usar estas opciones:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - TypeScript: Yes
# - Tailwind config: tailwind.config.ts
# - Components location: @/components
# - Utils location: @/lib/utils
# - React Server Components: Yes
# - Overwrite globals.css: Yes
```

### Instalar componentes iniciales:

```bash
npx shadcn@latest add button card dialog sheet badge input label textarea select
```

**Componentes instalados:**
- `button` - Botones
- `card` - Tarjetas para productos
- `dialog` - Modales
- `sheet` - Sidebar/drawer
- `badge` - Badges para etiquetas
- `input` - Input fields
- `label` - Labels para forms
- `textarea` - Textarea para formularios
- `select` - Dropdowns

### Success Criteria:

#### Automated Verification:
- [ ] Archivo `components.json` existe en la raíz
- [ ] Directorio `src/components/ui/` creado con componentes
- [ ] Archivo `src/lib/utils.ts` existe
- [ ] Archivo `src/app/globals.css` actualizado con variables CSS

#### Manual Verification:
- [ ] Los componentes shadcn/ui se pueden importar sin errores

---

## Step 4: Configurar Prettier (Opcional pero Recomendado)

### Instalación:

```bash
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier
```

### Crear archivo `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Actualizar `.eslintrc.json`:

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

### Crear `.prettierignore`:

```
node_modules
.next
out
public
*.md
package-lock.json
```

### Success Criteria:

#### Automated Verification:
- [ ] `npx prettier --check .` ejecuta sin errores (puede mostrar archivos a formatear)
- [ ] `npx prettier --write .` formatea correctamente

---

## Step 5: Configurar next-themes para Dark Mode

### Instalación:

```bash
npm install next-themes
```

### Crear Theme Provider:

**Archivo**: `src/components/providers/theme-provider.tsx`

```typescript
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Actualizar Root Layout:

**Archivo**: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolutiveMind - Servicios Automatizados',
  description: 'Soluciones automatizadas para tu negocio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] No hay errores de TypeScript: `npm run build`
- [ ] Servidor inicia correctamente: `npm run dev`

#### Manual Verification:
- [ ] Dark mode se puede alternar (se verifica en Fase 2 con el theme toggle)

---

## Step 6: Estructura de Carpetas

### Crear estructura de directorios:

```bash
mkdir -p src/components/layout
mkdir -p src/components/products
mkdir -p src/components/forms
mkdir -p src/lib/data
mkdir -p src/lib/types
mkdir -p src/lib/constants
mkdir -p public/images/products
```

### Estructura final esperada:

```
solutivemind-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── providers/       # Context providers
│   │   ├── layout/          # Header, Footer, etc.
│   │   ├── products/        # Product components
│   │   └── forms/           # Form components
│   └── lib/
│       ├── data/            # Mock data
│       ├── types/           # TypeScript types
│       ├── constants/       # Constants
│       └── utils.ts         # Utility functions
├── public/
│   └── images/
│       └── products/        # Product images
├── thoughts/
│   └── shared/
│       ├── plans/           # Implementation plans
│       └── research/        # Research docs
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── components.json
└── README.md
```

### Success Criteria:

#### Automated Verification:
- [ ] Todos los directorios existen: `ls -R src/`

---

## Step 7: Crear Archivo de Tipos Base

### Archivo: `src/lib/types/index.ts`

```typescript
// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  currency: string
  images: string[]
  category: string
  features: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  productId?: string
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Archivo se puede importar sin errores: `import { Product } from '@/lib/types'`

---

## Step 8: Verificar Instalación Completa

### Comandos de verificación:

```bash
# Verificar que el proyecto compila
npm run build

# Verificar lint
npm run lint

# Iniciar servidor de desarrollo
npm run dev
```

### Success Criteria:

#### Automated Verification:
- [ ] `npm run build` completa sin errores
- [ ] `npm run lint` no muestra errores
- [ ] `npm run dev` inicia el servidor en `http://localhost:3000`

#### Manual Verification:
- [ ] Navegar a `http://localhost:3000` muestra la página de inicio de Next.js
- [ ] No hay errores en la consola del navegador
- [ ] Hot reload funciona al editar archivos

---

## Step 9: Configurar Testing Framework (Vitest + React Testing Library)

### Instalación de dependencias de testing:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Crear archivo de configuración de Vitest:

**Archivo**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Crear archivo de setup:

**Archivo**: `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom'
```

### Actualizar package.json con scripts de testing:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Crear primer test de ejemplo:

**Archivo**: `src/lib/utils.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should override conflicting tailwind classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})
```

### Success Criteria:

#### Automated Verification:
- [ ] `npm run test` ejecuta los tests
- [ ] Test de utils pasa correctamente
- [ ] No hay errores de configuración

---

## Step 10: Configurar E2E Testing (Playwright)

### Instalación:

```bash
npm install -D @playwright/test
npx playwright install
```

### Crear configuración de Playwright:

**Archivo**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Crear directorio e2e:

```bash
mkdir e2e
```

### Crear primer test E2E:

**Archivo**: `e2e/home.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SolutiveMind/)
  })

  test('should display main content', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    // Los tests específicos de navegación se agregarán en Fase 3
  })
})
```

### Actualizar package.json:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] `npm run test:e2e` ejecuta los tests E2E
- [ ] Test de home page pasa
- [ ] Playwright puede iniciar el servidor

---

## Testing Strategy

### Unit Tests (Vitest):
Tests en esta fase:
- [ ] Utils function (`cn`) funciona correctamente
- [ ] Type definitions son correctas

Comandos:
```bash
npm run test              # Run tests
npm run test:coverage     # Coverage report
```

### E2E Tests (Playwright):
Tests en esta fase:
- [ ] Página de inicio carga correctamente
- [ ] Título de página es correcto
- [ ] No hay errores en consola

Comandos:
```bash
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # Run with UI
npm run test:e2e:headed   # Run with browser visible
```

### Verificaciones Manuales:
1. Abrir el proyecto en el navegador
2. Verificar que no hay errores en la consola
3. Editar `src/app/page.tsx` y verificar hot reload
4. Verificar que TypeScript funciona con autocomplete en el IDE

### Comandos de Verificación Completos:
```bash
npm run build            # Build de producción
npm run lint             # Linting
npm run test             # Unit tests
npm run test:e2e         # E2E tests
npm run dev              # Servidor desarrollo
```

---

## Performance Considerations

- Next.js 15 incluye optimizaciones automáticas de imágenes
- Tailwind CSS usa PurgeCSS automáticamente en producción
- TypeScript ayuda a detectar errores en build time

---

## Migration Notes

N/A - Este es un proyecto nuevo desde cero.

---

## References

- Research original: `thoughts/shared/research/2025-11-03_22-43-57_next-js-tech-stack-recommendations.md`
- Next.js 15 Docs: https://nextjs.org/docs
- shadcn/ui Docs: https://ui.shadcn.com
- Tailwind CSS Docs: https://tailwindcss.com

---

## Common Issues and Solutions

### Issue: `create-next-app` fails in current directory
**Solution**: Asegurarse que solo existen `.git/`, `README.md`, y `thoughts/` antes de ejecutar el comando

### Issue: Port 3000 already in use
**Solution**: `kill -9 $(lsof -ti:3000)` o usar otro puerto con `npm run dev -- -p 3001`

### Issue: TypeScript errors after installation
**Solution**: Reiniciar el IDE/TypeScript server

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 2: Sistema de Temas y Diseño** (`phase-2-sistema-temas.md`)
