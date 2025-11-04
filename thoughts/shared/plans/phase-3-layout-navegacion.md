# Fase 3: Layout y Navegación

## Overview

Crear los componentes de layout principal (Header, Footer, Navigation) y el botón flotante de WhatsApp. Establecer la estructura de navegación responsive que se usará en todo el sitio.

## Current State

- Proyecto Next.js funcionando
- Sistema de temas implementado
- shadcn/ui components disponibles
- No hay header ni footer

## Desired End State

Un layout completo y profesional con:
- Header responsive con navegación
- Footer con información de contacto
- Toggle de dark mode en el header
- Botón flotante de WhatsApp (fijo en esquina inferior derecha)
- Navegación mobile con menú hamburguesa
- Layout aplicado globalmente a todas las páginas

### Verification:
- Header se muestra en todas las páginas
- Navegación funciona en desktop y mobile
- WhatsApp button es clickeable y abre chat
- Footer muestra información relevante
- Layout responsive en todos los tamaños de pantalla

## What We're NOT Doing

- No implementamos mega-menús complejos
- No agregamos animaciones elaboradas de navegación
- No creamos múltiples layouts diferentes
- No implementamos breadcrumbs (por ahora)

## Implementation Approach

Crearemos componentes de layout reutilizables en `src/components/layout/` y los integraremos en el root layout. Usaremos shadcn/ui Sheet component para el menú mobile.

---

## Step 1: Crear Tipos y Constantes de Navegación

### Archivo: `src/lib/constants/navigation.ts`

```typescript
import { NavItem } from '@/lib/types'

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Servicios',
    href: '/servicios',
  },
  {
    label: 'Sobre Nosotros',
    href: '/nosotros',
  },
  {
    label: 'Contacto',
    href: '/contacto',
  },
]

export const CONTACT_INFO = {
  email: 'contacto@solutivemind.com',
  phone: '+54 9 11 1234-5678',
  whatsapp: '5491112345678', // Número sin espacios ni guiones
  whatsappMessage: '¡Hola! Me interesa obtener más información sobre sus servicios.',
  address: 'Buenos Aires, Argentina',
  social: {
    linkedin: 'https://linkedin.com/company/solutivemind',
    twitter: 'https://twitter.com/solutivemind',
    instagram: 'https://instagram.com/solutivemind',
  },
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Archivo se importa sin errores TypeScript

---

## Step 2: Crear Componente de Header

### Archivo: `src/components/layout/header.tsx`

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggleSimple } from '@/components/ui/theme-toggle-simple'
import { NAV_ITEMS } from '@/lib/constants/navigation'
import { MobileNav } from './mobile-nav'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SolutiveMind</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Theme toggle + Mobile menu */}
        <div className="flex items-center space-x-2">
          <ThemeToggleSimple />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Componente compila sin errores TypeScript

---

## Step 3: Crear Componente de Navegación Mobile

### Archivo: `src/components/layout/mobile-nav.tsx`

```typescript
'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/lib/constants/navigation'

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Componente compila sin errores

#### Manual Verification:
- [ ] Sheet se abre y cierra correctamente en mobile

---

## Step 4: Crear Componente de Footer

### Archivo: `src/components/layout/footer.tsx`

```typescript
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT_INFO, NAV_ITEMS } from '@/lib/constants/navigation'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SolutiveMind</h3>
            <p className="text-sm text-muted-foreground">
              Servicios automatizados para impulsar tu negocio con tecnología de vanguardia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} SolutiveMind. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Componente compila sin errores

#### Manual Verification:
- [ ] Footer se muestra correctamente
- [ ] Links de email y teléfono funcionan

---

## Step 5: Crear Botón Flotante de WhatsApp

### Archivo: `src/components/layout/whatsapp-button.tsx`

```typescript
'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export function WhatsAppButton() {
  const handleClick = () => {
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
      CONTACT_INFO.whatsappMessage
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [ ] Botón aparece en esquina inferior derecha
- [ ] Botón es clickeable
- [ ] Abre WhatsApp con mensaje predefinido
- [ ] Funciona en mobile y desktop

---

## Step 6: Actualizar Root Layout

### Archivo: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolutiveMind - Servicios Automatizados',
  description: 'Soluciones automatizadas para impulsar tu negocio con tecnología de vanguardia',
  keywords: ['servicios automatizados', 'tecnología', 'automatización', 'negocios'],
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
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [ ] `npm run build` compila sin errores
- [ ] No hay errores TypeScript

#### Manual Verification:
- [ ] Header y Footer aparecen en todas las páginas
- [ ] Main content ocupa el espacio entre header y footer
- [ ] Layout responsive funciona correctamente

---

## Step 7: Actualizar Página de Inicio Temporal

Para probar el layout:

### Archivo: `src/app/page.tsx`

```typescript
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container py-20">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Bienvenido a <span className="text-primary">SolutiveMind</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Servicios automatizados que impulsan tu negocio con tecnología de vanguardia.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/servicios">Ver Servicios</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [ ] Página de inicio se muestra correctamente
- [ ] Botones navegan a las rutas correctas
- [ ] Layout completo (header + content + footer) visible

---

## Step 8: Crear Hook para Active Link

Para resaltar el link activo en la navegación:

### Archivo: `src/lib/hooks/use-active-path.ts`

```typescript
'use client'

import { usePathname } from 'next/navigation'

export function useActivePath() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return { isActive, pathname }
}
```

### Actualizar Header para usar el hook:

**Archivo**: `src/components/layout/header.tsx` (actualizar sección de nav)

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggleSimple } from '@/components/ui/theme-toggle-simple'
import { NAV_ITEMS } from '@/lib/constants/navigation'
import { MobileNav } from './mobile-nav'
import { useActivePath } from '@/lib/hooks/use-active-path'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isActive } = useActivePath()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SolutiveMind</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <ThemeToggleSimple />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [ ] Link activo se resalta en navegación
- [ ] Funciona en desktop y mobile

---

## Testing Strategy

### Manual Testing Checklist:

#### Desktop (>768px):
- [ ] Header sticky funciona al hacer scroll
- [ ] Navegación horizontal visible
- [ ] Links de navegación funcionan
- [ ] Link activo se resalta
- [ ] Theme toggle funciona
- [ ] Footer se muestra al final
- [ ] WhatsApp button visible y funcional
- [ ] WhatsApp button no interfiere con contenido

#### Mobile (<768px):
- [ ] Header responsive
- [ ] Menú hamburguesa visible
- [ ] Menú hamburguesa abre sheet
- [ ] Links en mobile nav funcionan
- [ ] Sheet se cierra al clickear link
- [ ] Footer responsive con columnas apiladas
- [ ] WhatsApp button visible y accesible

#### Navegación:
- [ ] Todos los links del header navegan correctamente
- [ ] Links del footer navegan correctamente
- [ ] WhatsApp abre con mensaje predefinido
- [ ] Email y teléfono en footer son clickeables

### Automated Testing:
```bash
npm run build    # Verificar compilación
npm run lint     # Verificar code quality
```

---

## Performance Considerations

- Header usa `position: sticky` con backdrop-blur (performance nativa del navegador)
- Mobile nav usa Sheet de shadcn/ui (optimizado con Radix UI)
- WhatsApp button es fixed position (no afecta layout flow)
- Active path detection usa client-side navigation de Next.js

---

## Accessibility Considerations

- Header tiene contraste adecuado
- Botones tienen aria-labels
- Navegación es keyboard-accessible
- Footer tiene estructura semántica correcta
- Links tienen estados hover/focus visibles

---

## References

- Next.js Layouts: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
- shadcn/ui Sheet: https://ui.shadcn.com/docs/components/sheet
- WhatsApp API: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 4: Catálogo de Productos** (`phase-4-catalogo-productos.md`)
