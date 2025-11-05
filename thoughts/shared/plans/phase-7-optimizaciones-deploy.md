# Fase 7: Optimizaciones y Deploy

## Overview

Optimizar el sitio para producción, implementar mejoras de performance y SEO, y deployar a Vercel. Esta fase final asegura que el sitio esté listo para usuarios reales con el mejor rendimiento posible.

## Current State

- Sitio web completo funcionalmente
- Todas las páginas implementadas
- Código funcional en desarrollo
- No optimizado para producción
- No deployado

## Desired End State

Sitio web en producción con:
- Build optimizado sin errores ni warnings
- Performance score >90 en Lighthouse
- SEO score >90 en Lighthouse
- Accessibility score >90
- Deployado en Vercel con dominio
- Analytics configurado (opcional)
- Error tracking configurado (opcional)
- Documentación de deployment

### Verification:
- `npm run build` exitoso sin warnings
- Lighthouse scores >90 en todas las categorías
- Sitio accesible públicamente
- Dominio custom configurado (si aplica)
- HTTPS funcionando
- Performance medible

## What We're NOT Doing

- No implementamos CDN custom (Vercel ya lo provee)
- No configuramos múltiples ambientes (staging/prod por ahora)
- No implementamos CI/CD complejo (Vercel lo maneja)
- No agregamos monitoreo avanzado (puede agregarse después)

## Implementation Approach

Revisaremos y optimizaremos el código, configuraremos Next.js para producción, ejecutaremos auditorías de performance, y deployaremos a Vercel con configuración óptima.

---

## Step 1: Optimizar next.config.ts

### Actualizar: `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimizaciones de producción
  reactStrictMode: true,

  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Si usas imágenes externas, agregar dominios aquí
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'ejemplo.com',
    //   },
    // ],
  },

  // Optimización de bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Success Criteria:

#### Automated Verification:
- [x] Config compila sin errores
- [x] `npm run build` exitoso

---

## Step 2: Optimizar package.json Scripts

### Actualizar: `package.json`

Agregar scripts útiles:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "ANALYZE=true next build",
    "postbuild": "next-sitemap"
  }
}
```

### Success Criteria:

#### Automated Verification:
- [x] Todos los scripts ejecutan correctamente

---

## Step 3: Configurar Environment Variables

### Crear: `.env.example`

```bash
# Sitio
NEXT_PUBLIC_SITE_URL=https://solutivemind.com

# Analytics (opcional)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (para futuro)
# RESEND_API_KEY=re_xxxxxxxxxxxx

# Contact Info
NEXT_PUBLIC_CONTACT_EMAIL=contacto@solutivemind.com
NEXT_PUBLIC_CONTACT_PHONE=+5491112345678
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
```

### Crear: `.env.local` (gitignored)

Copiar de `.env.example` y llenar con valores reales.

### Actualizar: `.gitignore`

Asegurar que está:

```
# Environment variables
.env*.local
.env.local
.env.production.local
```

### Success Criteria:

#### Manual Verification:
- [x] `.env.example` committed al repo
- [x] `.env.local` en .gitignore

---

## Step 4: Auditoría de Performance con Lighthouse

### Ejecutar build de producción:

```bash
npm run build
npm run start
```

### Abrir en navegador y ejecutar Lighthouse:

1. Abrir Chrome DevTools (F12)
2. Ir a tab "Lighthouse"
3. Seleccionar todas las categorías
4. Seleccionar "Desktop" y "Mobile"
5. Click "Analyze page load"

### Objetivos mínimos:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Optimizaciones comunes si scores bajos:

**Performance:**
- Lazy load images fuera del viewport inicial
- Usar `priority` en imágenes above-the-fold
- Minimizar JavaScript no usado

**Accessibility:**
- Verificar contraste de colores
- Asegurar alt text en todas las imágenes
- Labels en todos los form inputs

**SEO:**
- Meta descriptions en todas las páginas
- Headings hierarchy correcta
- Sitemap y robots.txt presentes

### Success Criteria:

#### Manual Verification:
- [ ] Lighthouse Performance >90
- [ ] Lighthouse Accessibility >90
- [ ] Lighthouse Best Practices >90
- [ ] Lighthouse SEO >90

---

## Step 5: Optimizar Imágenes

### Si usas imágenes reales:

Optimizar todas las imágenes antes de commit:

```bash
# Instalar sharp (si no está)
npm install sharp

# Usar herramientas online:
# - https://squoosh.app/
# - https://tinypng.com/
```

### Recomendaciones:
- Formato: WebP o AVIF
- Tamaño máximo: 1920px ancho
- Calidad: 80-85%
- Usar Next.js Image component siempre

### Actualizar imágenes placeholder si es necesario:

Si quieres mejores placeholders, usar https://placehold.co/:

```typescript
// Ejemplo en products.ts
images: [
  'https://placehold.co/800x600/png?text=Automation+Service',
]
```

### Success Criteria:

#### Manual Verification:
- [ ] Todas las imágenes optimizadas
- [ ] Next/Image usado en todos lados
- [ ] No hay warnings de Image en build

---

## Step 6: Limpieza de Código

### Ejecutar linting y formatting:

```bash
npm run lint:fix
npm run format
npm run type-check
```

### Eliminar código no usado:

- Eliminar componentes no utilizados
- Eliminar imports no usados
- Eliminar console.logs innecesarios
- Eliminar comentarios TODO obsoletos

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` sin errores ni warnings
- [x] `npm run type-check` sin errores
- [x] `npm run build` sin warnings

---

## Step 7: Configurar Vercel para Deploy

### Opción 1: Deploy desde Vercel Dashboard (Recomendado)

1. **Crear cuenta en Vercel**: https://vercel.com/signup
2. **Conectar repositorio GitHub**:
   - Click "Add New Project"
   - Importar tu repo de GitHub
3. **Configurar proyecto**:
   - Framework Preset: Next.js (auto-detectado)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. **Environment Variables**:
   - Agregar las variables de `.env.example`
   - `NEXT_PUBLIC_SITE_URL` debe ser el dominio de Vercel
5. **Deploy**:
   - Click "Deploy"
   - Esperar build (2-5 minutos)

### Opción 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Success Criteria:

#### Manual Verification:
- [ ] Deploy exitoso
- [ ] Sitio accesible en URL de Vercel
- [ ] No errores en Vercel logs

---

## Step 8: Configurar Dominio Custom (Opcional)

Si tienes un dominio:

1. **En Vercel Dashboard**:
   - Ir a proyecto → Settings → Domains
   - Click "Add Domain"
   - Ingresar tu dominio

2. **En tu proveedor de DNS**:
   - Agregar registro CNAME:
     - Name: `www` o `@`
     - Value: `cname.vercel-dns.com`
   - O registro A:
     - Name: `@`
     - Value: IP de Vercel (provista en dashboard)

3. **Esperar propagación DNS** (puede tomar hasta 48hs, usualmente <1hr)

4. **Verificar HTTPS**:
   - Vercel automáticamente provisiona SSL

### Actualizar URLs:

Actualizar en:
- `src/app/sitemap.ts` - baseUrl
- `src/app/robots.ts` - baseUrl
- `src/app/layout.tsx` - metadataBase
- `.env.production` - NEXT_PUBLIC_SITE_URL

### Success Criteria:

#### Manual Verification:
- [ ] Dominio custom funciona
- [ ] HTTPS habilitado
- [ ] Redirección www → non-www (o viceversa)

---

## Step 9: Configurar Analytics (Opcional)

### Opción 1: Vercel Analytics (Más simple)

```bash
npm install @vercel/analytics
```

**Actualizar**: `src/app/layout.tsx`

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider {...}>
          {/* ... */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Opción 2: Google Analytics 4

```bash
npm install @next/third-parties
```

**Actualizar**: `src/app/layout.tsx`

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider {...}>
          {/* ... */}
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  )
}
```

### Success Criteria:

#### Manual Verification:
- [ ] Analytics events se registran
- [ ] Dashboard muestra datos

---

## Step 10: Crear Documentación de Deployment

### Archivo: `DEPLOYMENT.md`

```markdown
# Guía de Deployment - SolutiveMind Website

## Deploy Automático (Vercel)

El sitio se deploya automáticamente cuando se hace push a la rama `main` en GitHub.

### Proceso:
1. Push código a `main`
2. Vercel detecta el push
3. Ejecuta build automáticamente
4. Deploy a producción si build es exitoso

### URLs:
- Producción: https://solutivemind.com (o tu dominio)
- Preview: Cada PR genera un preview deployment

## Deploy Manual

Si necesitas deployar manualmente:

```bash
# Asegurar que estás en la rama correcta
git checkout main
git pull origin main

# Build local (opcional, para verificar)
npm run build

# Deploy con Vercel CLI
vercel --prod
```

## Environment Variables

Variables necesarias en Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_SITE_URL` - URL del sitio
- `NEXT_PUBLIC_CONTACT_EMAIL` - Email de contacto
- `NEXT_PUBLIC_CONTACT_PHONE` - Teléfono
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp

Variables opcionales:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `RESEND_API_KEY` - Para emails (futuro)

## Verificación Post-Deploy

Después de cada deploy, verificar:

1. **Funcionalidad**:
   - [ ] Todas las páginas cargan correctamente
   - [ ] Navegación funciona
   - [ ] Formulario de contacto funcional
   - [ ] WhatsApp button funciona

2. **Performance**:
   - [ ] Lighthouse score >90
   - [ ] Imágenes cargan rápido
   - [ ] No errores en consola

3. **SEO**:
   - [ ] Meta tags correctos
   - [ ] Sitemap accesible: /sitemap.xml
   - [ ] Robots.txt accesible: /robots.txt

## Rollback

Si necesitas hacer rollback a un deploy anterior:

1. Ir a Vercel Dashboard → Deployments
2. Encontrar deployment funcional anterior
3. Click en "..." → "Promote to Production"

## Troubleshooting

### Build falla en Vercel pero funciona local

- Verificar versión de Node.js en Vercel matches local
- Verificar que todas las dependencies están en package.json
- Revisar Vercel build logs para error específico

### Imágenes no cargan

- Verificar que están en `/public/images/`
- Verificar rutas en código (case-sensitive en producción)
- Verificar formato es soportado (jpg, png, webp, avif)

### Environment variables no funcionan

- Verificar que tienen prefijo `NEXT_PUBLIC_` si se usan en client
- Verificar que están configuradas en Vercel Dashboard
- Re-deploy después de agregar variables

## Contacto

Para issues con deployment, contactar a [tu-email@ejemplo.com]
```

### Success Criteria:

#### Manual Verification:
- [x] Documentación clara y completa

---

## Step 11: Verificación Final Pre-Launch

### Checklist completo:

#### Build & Code Quality
- [x] `npm run build` exitoso sin warnings
- [x] `npm run lint` sin errores
- [x] `npm run type-check` sin errores
- [x] No console.logs en producción

#### Funcionalidad
- [ ] Todas las páginas accesibles
- [ ] Navegación funciona en desktop y mobile
- [ ] Formulario de contacto funciona
- [ ] WhatsApp button abre chat
- [ ] Dark mode funciona
- [ ] 404 page muestra correctamente

#### Performance
- [ ] Lighthouse Performance >90
- [ ] Imágenes optimizadas
- [ ] Bundle size razonable (<500KB first load)
- [ ] No layout shifts (CLS <0.1)

#### SEO
- [ ] Meta tags en todas las páginas
- [ ] Sitemap.xml accesible
- [ ] Robots.txt accesible
- [ ] URLs amigables (slugs)
- [ ] Open Graph tags presentes

#### Accessibility
- [ ] Lighthouse Accessibility >90
- [ ] Keyboard navigation funciona
- [ ] Screen readers funcionan
- [ ] Color contrast adecuado

#### Security
- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] No API keys expuestas en client

#### Content
- [ ] Texto en español correcto
- [ ] No typos evidentes
- [ ] Información de contacto correcta
- [ ] Links externos abren en nueva tab

---

## Step 12: Post-Launch Monitoring

### Primeras 24 horas:

**Verificar**:
- [ ] Sitio accesible desde diferentes dispositivos
- [ ] No errores en Vercel logs
- [ ] Analytics tracking funcionando
- [ ] Formulario de contacto recibe mensajes

**Monitorear**:
- Vercel Dashboard → Analytics
- Google Search Console (registrar sitio)
- Error tracking (si configurado)

### Primera semana:

- Revisar performance metrics
- Revisar user feedback
- Optimizar según datos reales

---

## Testing Strategy

### Pre-Deploy Testing:

```bash
# Build de producción local
npm run build
npm run start

# Abrir en http://localhost:3000
# Ejecutar Lighthouse
# Verificar todas las páginas
# Verificar funcionalidad
```

### Post-Deploy Testing:

- Verificar en diferentes browsers (Chrome, Firefox, Safari, Edge)
- Verificar en diferentes dispositivos (Desktop, Tablet, Mobile)
- Verificar diferentes resoluciones
- Verificar con/sin adblockers

---

## Performance Budget

Targets para mantener:

- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1
- Speed Index: <3.4s
- Bundle Size (First Load JS): <500KB

---

## References

- Vercel Deployment: https://vercel.com/docs/deployments/overview
- Next.js Production: https://nextjs.org/docs/going-to-production
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Web Vitals: https://web.dev/vitals/

---

## Success Criteria Summary

### Automated Verification:
- [x] `npm run build` exitoso sin warnings
- [x] `npm run lint` sin errores
- [x] `npm run type-check` sin errores
- [ ] Deploy automático funciona en Vercel

### Manual Verification:
- [ ] Lighthouse scores >90 en todas las categorías
- [ ] Sitio accesible públicamente
- [ ] HTTPS funcionando
- [ ] Todas las funcionalidades probadas
- [ ] Performance medible con Analytics

---

## Congratulations! 🎉

Una vez completada esta fase, tu sitio web estará:
- ✅ Optimizado para producción
- ✅ Deployado y accesible públicamente
- ✅ Performante y accesible
- ✅ Bien posicionado para SEO
- ✅ Listo para usuarios reales

## Próximos Pasos (Futuro)

Cuando quieras expandir:
- Integrar backend real (Supabase, Firebase)
- Agregar más productos/servicios
- Implementar blog/noticias
- Agregar casos de éxito
- Implementar newsletter
- Agregar chat en vivo
- A/B testing de landing page
