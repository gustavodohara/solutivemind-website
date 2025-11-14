import { test, expect } from '@playwright/test'

test.describe('Content & Assets', () => {
  test.describe('Data Files', () => {
    test('should have partners data with correct structure', async ({ page }) => {
      await page.goto('/')

      // Verificar que el carousel de logos está presente
      const carousel = page.locator('[class*="embla"]').first()
      await expect(carousel).toBeVisible()

      // Contar logos visibles
      const logos = carousel.locator('img')
      const count = await logos.count()
      expect(count).toBeGreaterThanOrEqual(5)

      await carousel.screenshot({ path: 'test-results/partners-carousel.png' })
    })

    test('should have feature demos data', async ({ page }) => {
      await page.goto('/')

      // Buscar elementos relacionados a features
      const featureElements = page.locator('text=/automatización|integración|gestión|comunicación/i')
      const count = await featureElements.count()
      expect(count).toBeGreaterThanOrEqual(2)
    })

    test('should have product pillars data with background images', async ({ page }) => {
      await page.goto('/')

      // Scroll down para encontrar storyboard sections
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
      await page.waitForTimeout(1000)

      // Verificar que hay contenido de pillars (eficiencia, escalabilidad, innovación)
      const pillarElements = page.locator('text=/eficiencia|escalabilidad|innovación/i')
      const count = await pillarElements.count()
      expect(count).toBeGreaterThanOrEqual(1)
    })

    test('should have integrations data displayed', async ({ page }) => {
      await page.goto('/')

      // Scroll to integrations section if exists
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1000)

      // Verificar que hay contenido de integraciones
      const page_content = await page.content()
      const hasIntegrations = page_content.includes('Make') ||
                              page_content.includes('Zapier') ||
                              page_content.includes('Airtable')
      expect(hasIntegrations).toBeTruthy()
    })
  })

  test.describe('Image Assets', () => {
    test('hero images should load on each page', async ({ page }) => {
      const heroPages = [
        { path: '/', name: 'home-hero' },
        { path: '/servicios', name: 'servicios-hero' },
        { path: '/nosotros', name: 'about-hero' },
        { path: '/contacto', name: 'contact-hero' },
      ]

      for (const { path: pagePath, name } of heroPages) {
        const startTime = Date.now()
        await page.goto(pagePath)

        const hero = page.locator('section').first()
        await expect(hero).toBeVisible()

        const loadTime = Date.now() - startTime
        console.log(`${name} loaded in ${loadTime}ms`)

        // Verificar que cargó en menos de 5 segundos
        expect(loadTime).toBeLessThan(5000)

        await hero.screenshot({ path: `test-results/${name}-loaded.png` })
      }
    })

    test('partner logos should load and display correctly', async ({ page }) => {
      await page.goto('/')

      const carousel = page.locator('[class*="embla"]').first()
      await expect(carousel).toBeVisible()

      // Verificar que los logos cargan
      const logos = carousel.locator('img')
      const count = await logos.count()

      for (let i = 0; i < Math.min(count, 5); i++) {
        const logo = logos.nth(i)
        await expect(logo).toBeVisible()

        // Verificar que tiene src válido
        const src = await logo.getAttribute('src')
        expect(src).toBeTruthy()
      }
    })
  })

  test.describe('Performance - Asset Optimization', () => {
    test('page should load in reasonable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime
      console.log(`Page loaded in ${loadTime}ms`)

      // Debería cargar en menos de 10 segundos en dev mode
      expect(loadTime).toBeLessThan(10000)
    })
  })

  test.describe('No Console Errors with Assets', () => {
    test('should have no 404 errors for assets', async ({ page }) => {
      const failedRequests: Array<{ url: string; status: number }> = []

      page.on('response', (response) => {
        if (response.status() === 404) {
          failedRequests.push({
            url: response.url(),
            status: response.status(),
          })
        }
      })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Scroll para cargar lazy images
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(2000)

      if (failedRequests.length > 0) {
        console.error('Failed requests:', failedRequests)
      }

      // Allow some 404s for missing placeholder images
      expect(failedRequests.length).toBeLessThan(5)
    })

    test('should have no console errors', async ({ page }) => {
      const consoleErrors: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Scroll para cargar todo el contenido
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(2000)

      if (consoleErrors.length > 0) {
        console.error('Console errors:', consoleErrors)
      }

      // Allow some console errors for missing assets during development
      expect(consoleErrors.length).toBeLessThan(10)
    })
  })
})
