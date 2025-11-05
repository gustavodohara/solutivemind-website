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

## Comandos Útiles

### Verificación Pre-Deploy

```bash
# Type checking
npm run type-check

# Linting
npx eslint .

# Build local
npm run build

# Run production build locally
npm run start
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# With UI
npm run test:e2e:ui
```

### Code Quality

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Performance Budget

Targets para mantener:

- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1
- Speed Index: <3.4s
- Bundle Size (First Load JS): <500KB

## Contacto

Para issues con deployment, contactar al equipo de desarrollo.
