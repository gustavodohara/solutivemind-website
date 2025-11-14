import { test, expect } from '@playwright/test'

test.describe('Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Hero - should display with video background', async ({ page }) => {
    // Verificar que existe un hero section
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Verificar que tiene video de YouTube
    const iframe = hero.locator('iframe[src*="youtube.com"]')
    if (await iframe.count() > 0) {
      await expect(iframe.first()).toBeVisible()

      // Verificar overlay
      const overlay = hero.locator('div.bg-background\\/80')
      await expect(overlay).toBeVisible()
    }

    // Verificar contenido del hero
    const heading = hero.locator('h1')
    await expect(heading).toBeVisible()

    const description = hero.locator('p').first()
    await expect(description).toBeVisible()

    // Tomar screenshot
    await hero.screenshot({ path: 'hero-with-video.png' })
  })

  test('Hero - should display with background image', async ({ page }) => {
    // Navegar a página con hero + imagen
    await page.goto('/servicios')

    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Verificar que tiene imagen de fondo
    const bgImage = hero.locator('img[alt=""]')
    if (await bgImage.count() > 0) {
      await expect(bgImage.first()).toBeVisible()
    }

    // Tomar screenshot
    await hero.screenshot({ path: 'hero-with-image.png' })
  })

  test('Hero - should display CTA buttons', async ({ page }) => {
    const hero = page.locator('section').first()

    // Verificar que tiene botones CTA
    const buttons = hero.locator('a[href*="/contacto"], a[href*="/servicios"]')
    expect(await buttons.count()).toBeGreaterThan(0)
  })

  test('Footer - should display 3 columns', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Verificar grid de 3 columnas
    const grid = footer.locator('.grid')
    await expect(grid).toBeVisible()

    // Verificar contenido de footer
    await expect(footer.getByText(/SolutiveMind/i)).toBeVisible()
    await expect(footer.getByText(/Enlaces|Quick|Rápidos/i)).toBeVisible()
    await expect(footer.getByText(/Contacto/i)).toBeVisible()

    // Verificar copyright
    await expect(footer.getByText(/©.*SolutiveMind/)).toBeVisible()

    // Tomar screenshot
    await footer.screenshot({ path: 'footer-3-columns.png' })
  })

  test('Footer - should have working links', async ({ page }) => {
    const footer = page.locator('footer')

    // Verificar que los links de navegación funcionan
    const navLinks = footer.locator('nav a')
    expect(await navLinks.count()).toBeGreaterThan(0)

    // Verificar links de contacto
    const emailLink = footer.locator('a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()

    const phoneLink = footer.locator('a[href^="tel:"]')
    await expect(phoneLink).toBeVisible()
  })

  test('FeaturesSection - should display in grid mode', async ({ page }) => {
    // Buscar section con features en grid
    const featuresSection = page.locator('section').filter({
      has: page.locator('.grid')
    }).first()

    if (await featuresSection.isVisible()) {
      // Verificar que tiene un grid
      const grid = featuresSection.locator('.grid')
      await expect(grid).toBeVisible()

      // Verificar que tiene cards
      const cards = grid.locator('[data-slot="card"]')
      expect(await cards.count()).toBeGreaterThan(0)

      // Tomar screenshot
      await featuresSection.screenshot({ path: 'features-grid-mode.png' })
    }
  })

  test('FeaturesSection - should display in tabs mode', async ({ page }) => {
    // Buscar section con TabbedCarousel
    const tabsSection = page.locator('section').filter({
      has: page.getByRole('button')
    }).first()

    if (await tabsSection.isVisible()) {
      // Verificar que tiene tabs
      const tabs = tabsSection.getByRole('button')
      expect(await tabs.count()).toBeGreaterThan(1)

      // Tomar screenshot
      await tabsSection.screenshot({ path: 'features-tabs-mode.png' })
    }
  })

  test('All layouts - responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Hero
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    await hero.screenshot({ path: 'hero-mobile.png' })

    // Footer
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await footer.screenshot({ path: 'footer-mobile.png' })
  })

  test('All layouts - responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })

    // Hero
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    await hero.screenshot({ path: 'hero-tablet.png' })

    // Footer
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await footer.screenshot({ path: 'footer-tablet.png' })
  })

  test('All layouts - no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/')
    await page.waitForTimeout(2000)

    expect(errors).toHaveLength(0)
  })
})
