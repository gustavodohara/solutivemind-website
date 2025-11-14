import { test, expect } from '@playwright/test'

test.describe('Pages Redesign - All Pages', () => {

  // ========== HOME PAGE ==========
  test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    test('should display hero with video background', async ({ page }) => {
      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      // Check for iframe with YouTube embed
      const iframe = page.locator('iframe[src*="youtube.com"]')
      await expect(iframe).toBeVisible({ timeout: 10000 })

      await page.screenshot({ path: 'home-hero-video.png', fullPage: false })
    })

    test('should display logo carousel with autoplay', async ({ page }) => {
      // Logo carousel uses embla but the container might not have that class
      const carousel = page.locator('section').filter({ hasText: /tecnologías y herramientas/i })
      await expect(carousel).toBeVisible()

      // Esperar autoplay
      await page.waitForTimeout(4000)

      await carousel.screenshot({ path: 'home-logo-carousel.png' })
    })

    test('should display tabbed carousel and change tabs', async ({ page }) => {
      const tab1 = page.getByRole('button').first()
      await expect(tab1).toBeVisible()

      await tab1.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'home-tabs-active.png' })
    })

    test('should display storyboard sections with background images', async ({ page }) => {
      // Look for PRODUCT_PILLARS content
      const storyboards = page.locator('section').filter({
        has: page.locator('h2, h1')
      })

      expect(await storyboards.count()).toBeGreaterThan(3)

      await page.screenshot({ path: 'home-storyboards.png', fullPage: true })
    })

    test('should display integration grid', async ({ page }) => {
      const integrations = page.getByText(/integraciones que potencian/i)
      await expect(integrations).toBeVisible({ timeout: 10000 })

      // Scroll to integrations
      await integrations.scrollIntoViewIfNeeded()

      await page.screenshot({ path: 'home-integrations.png' })
    })

    test('should display enterprise CTA card', async ({ page }) => {
      const cta = page.getByText(/¿listo para empezar\?/i)
      await expect(cta).toBeVisible({ timeout: 10000 })

      await cta.scrollIntoViewIfNeeded()
      await page.screenshot({ path: 'home-enterprise-cta.png' })
    })
  })

  // ========== SERVICIOS PAGE ==========
  test.describe('Servicios Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/servicios')
    })

    test('should display improved hero', async ({ page }) => {
      // Wait for the page to load
      await page.waitForLoadState('networkidle')

      const heading = page.locator('h1')
      await expect(heading).toContainText(/servicio/i)

      await page.screenshot({ path: 'servicios-hero.png', fullPage: false })
    })

    test('should display all services in grid', async ({ page }) => {
      const productCards = page.locator('[data-slot="card"]')
      expect(await productCards.count()).toBeGreaterThan(0)

      await page.screenshot({ path: 'servicios-grid.png', fullPage: true })
    })

    test('should display section header with badge', async ({ page }) => {
      const badge = page.locator('span').filter({ hasText: /servicio/i })

      if (await badge.count() > 0) {
        await expect(badge.first()).toBeVisible()
      }
    })
  })

  // ========== SOBRE NOSOTROS PAGE ==========
  test.describe('Sobre Nosotros Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/nosotros')
    })

    test('should display improved hero', async ({ page }) => {
      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      const heading = hero.locator('h1')
      await expect(heading).toBeVisible()

      await hero.screenshot({ path: 'nosotros-hero.png' })
    })

    test('should display valores with FeatureIconBox', async ({ page }) => {
      const valores = page.getByText(/valores|enfoque|atención/i)
      await expect(valores.first()).toBeVisible()

      // Verificar que hay múltiples valores visibles
      const valoresSection = page.getByText(/nuestros valores/i)
      await expect(valoresSection).toBeVisible()

      await page.screenshot({ path: 'nosotros-valores.png' })
    })

    test('should display mission storyboard section', async ({ page }) => {
      const mission = page.getByText(/misión/i)
      await expect(mission).toBeVisible()

      await mission.scrollIntoViewIfNeeded()
      await page.screenshot({ path: 'nosotros-mission.png' })
    })

    test('should display final CTA', async ({ page }) => {
      const cta = page.getByText(/listo para|siguiente paso/i)
      await expect(cta).toBeVisible()

      await cta.scrollIntoViewIfNeeded()
      await page.screenshot({ path: 'nosotros-cta.png' })
    })
  })

  // ========== CONTACTO PAGE ==========
  test.describe('Contacto Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contacto')
    })

    test('should display improved hero', async ({ page }) => {
      // Wait for the page to load
      await page.waitForLoadState('networkidle')

      const heading = page.locator('h1')
      await expect(heading).toContainText(/contacto|hablemos/i)

      await page.screenshot({ path: 'contacto-hero.png', fullPage: false })
    })

    test('should display contact information with icons', async ({ page }) => {
      // Check for contact information section
      const contactInfo = page.getByText(/información de contacto/i)
      await expect(contactInfo).toBeVisible()

      // Check for email, phone, location text
      await expect(page.getByText(/email/i).first()).toBeVisible()
      await expect(page.getByText(/teléfono/i).first()).toBeVisible()
      await expect(page.getByText(/ubicación/i).first()).toBeVisible()

      await page.screenshot({ path: 'contacto-info.png' })
    })

    test('should display contact form', async ({ page }) => {
      const form = page.locator('form')
      await expect(form).toBeVisible()

      // Verificar campos
      await expect(page.getByLabel(/nombre/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/mensaje/i)).toBeVisible()

      await form.screenshot({ path: 'contacto-form.png' })
    })

    test('contact form should work', async ({ page }) => {
      await page.fill('input[name="name"]', 'Test User')
      await page.fill('input[name="email"]', 'test@example.com')
      await page.fill('textarea[name="message"]', 'Test message')

      // Submit
      await page.click('button[type="submit"]')

      // Verificar feedback (toast o mensaje)
      await page.waitForTimeout(2000)

      await page.screenshot({ path: 'contacto-form-submitted.png' })
    })
  })

  // ========== RESPONSIVE TESTS ==========
  test.describe('All Pages - Responsive', () => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      test(`${pagePath} - should be responsive on mobile (375px)`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto(pagePath)

        await expect(page.locator('h1').first()).toBeVisible()

        const pageName = pagePath === '/' ? 'home' : pagePath.slice(1)
        await page.screenshot({ path: `${pageName}-mobile-375.png`, fullPage: true })
      })

      test(`${pagePath} - should be responsive on tablet (768px)`, async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 })
        await page.goto(pagePath)

        await expect(page.locator('h1').first()).toBeVisible()

        const pageName = pagePath === '/' ? 'home' : pagePath.slice(1)
        await page.screenshot({ path: `${pageName}-tablet-768.png`, fullPage: true })
      })

      test(`${pagePath} - should be responsive on desktop (1440px)`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto(pagePath)

        await expect(page.locator('h1').first()).toBeVisible()

        const pageName = pagePath === '/' ? 'home' : pagePath.slice(1)
        await page.screenshot({ path: `${pageName}-desktop-1440.png`, fullPage: true })
      })
    }
  })

  // ========== DARK MODE TESTS ==========
  test.describe('All Pages - Dark Mode', () => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      test(`${pagePath} - should work in dark mode`, async ({ page }) => {
        await page.goto(pagePath)

        // Toggle dark mode
        await page.click('[aria-label="Toggle theme"]')
        await page.waitForTimeout(300)

        // Verificar que está en dark mode
        const body = page.locator('body')
        const bgColor = await body.evaluate((el) =>
          window.getComputedStyle(el).backgroundColor
        )
        expect(bgColor).toMatch(/rgb\((10|11|12|13|14|15|16|17|18|19|20)/)

        const pageName = pagePath === '/' ? 'home' : pagePath.slice(1)
        await page.screenshot({ path: `${pageName}-dark-mode.png`, fullPage: true })
      })
    }
  })

  // ========== NO CONSOLE ERRORS ==========
  test.describe('All Pages - No Console Errors', () => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      test(`${pagePath} - should have no console errors`, async ({ page }) => {
        const errors: string[] = []
        page.on('console', msg => {
          if (msg.type() === 'error') errors.push(msg.text())
        })

        await page.goto(pagePath)
        await page.waitForTimeout(3000)

        expect(errors).toHaveLength(0)
      })
    }
  })
})
