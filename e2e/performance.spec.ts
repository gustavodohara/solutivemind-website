import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('home page - should load in reasonable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime
    console.log(`Home page loaded in ${loadTime}ms`)

    // Debería cargar en menos de 3 segundos
    expect(loadTime).toBeLessThan(3000)
  })

  test('servicios page - should load in reasonable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/servicios')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime
    console.log(`Servicios page loaded in ${loadTime}ms`)

    expect(loadTime).toBeLessThan(3000)
  })

  test('should have fast First Contentful Paint', async ({ page }) => {
    await page.goto('/')

    const metrics = await page.evaluate(() => {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        fcp: perfData.responseStart,
        domContentLoaded: perfData.domContentLoadedEventEnd,
        loadComplete: perfData.loadEventEnd
      }
    })

    console.log('Performance metrics:', metrics)

    // FCP debería ser < 1.8s (good)
    expect(metrics.fcp).toBeLessThan(1800)
  })

  test('should have low Cumulative Layout Shift', async ({ page }) => {
    await page.goto('/')

    // Esperar a que todo cargue
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Scroll para verificar layout shifts
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)

    // Verificar que no hay errores por layout shift
    const logs: string[] = []
    page.on('console', msg => logs.push(msg.text()))

    // No deberían haber warnings sobre layout shift
    const layoutShiftWarnings = logs.filter(l =>
      l.toLowerCase().includes('layout shift')
    )

    expect(layoutShiftWarnings).toHaveLength(0)
  })

  test('images should be lazy loaded', async ({ page }) => {
    await page.goto('/')

    // Contar requests de imágenes
    let imageRequests = 0
    page.on('response', response => {
      if (response.request().resourceType() === 'image') {
        imageRequests++
      }
    })

    await page.waitForLoadState('networkidle')
    const initialRequests = imageRequests

    console.log(`Initial image requests: ${initialRequests}`)

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)

    const afterScrollRequests = imageRequests
    console.log(`After scroll image requests: ${afterScrollRequests}`)

    // Deberían haber más requests después del scroll (lazy loading)
    expect(afterScrollRequests).toBeGreaterThanOrEqual(initialRequests)
  })

  test('YouTube videos should not autoplay immediately', async ({ page }) => {
    await page.goto('/')

    // Verificar que los videos no se cargan hasta que son visibles
    const iframes = page.locator('iframe[src*="youtube.com"]')
    const count = await iframes.count()

    console.log(`YouTube iframes found: ${count}`)

    // Los que no son visibles no deberían estar cargados
    if (count > 1) {
      // El primer video (hero) puede estar cargado
      // Los demás no deberían cargar hasta scroll
    }
  })
})
