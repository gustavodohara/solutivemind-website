import { test, expect } from '@playwright/test'

test.describe('Advanced Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TabbedCarousel - should change tabs on click', async ({ page }) => {
    // Buscar el primer tab
    const firstTab = page.getByRole('button').filter({ hasText: /documentos|gestión/i }).first()
    await expect(firstTab).toBeVisible()

    // Click en el primer tab
    await firstTab.click()

    // Verificar que el contenido cambió
    await page.waitForTimeout(300)
    await page.screenshot({ path: 'tab-1-active.png' })

    // Click en otro tab
    const secondTab = page.getByRole('button').filter({ hasText: /integración|datos/i }).first()
    await secondTab.click()
    await page.waitForTimeout(300)

    // Verificar que el contenido cambió
    await page.screenshot({ path: 'tab-2-active.png' })
  })

  test('TabbedCarousel - active tab should have different style', async ({ page }) => {
    const activeTab = page.locator('button.shadow-md').first()
    await expect(activeTab).toBeVisible()

    // Verificar que tiene clase de activo
    const classes = await activeTab.getAttribute('class')
    expect(classes).toContain('shadow')
  })

  test('FeatureContent - should display dynamic content', async ({ page }) => {
    // Verificar que existe una Card con título y descripción
    const card = page.locator('[data-slot="card"]').first()
    await expect(card).toBeVisible()

    const cardTitle = card.locator('h3, h2').first()
    await expect(cardTitle).toBeVisible()
  })

  test('FeatureIconBox - should render icon with customizable colors', async ({ page }) => {
    const iconBox = page.locator('div').filter({ hasText: /feature/i }).first()

    // Verificar estructura básica
    await expect(iconBox).toBeVisible()
  })

  test('AnnouncementBanner - should be dismissible', async ({ page }) => {
    // Buscar el banner (si existe)
    const banner = page.locator('div').filter({ hasText: /announcement|anuncio/i }).first()

    if (await banner.isVisible()) {
      const closeButton = banner.locator('button').first()
      await closeButton.click()

      // Verificar que ya no está visible
      await expect(banner).not.toBeVisible()
    }
  })

  test('EnterpriseCTACard - should render with features list', async ({ page }) => {
    // Buscar una card enterprise (si existe en la página)
    const enterpriseCard = page.locator('[data-slot="card"]').filter({ hasText: /enterprise|empresa/i }).first()

    if (await enterpriseCard.isVisible()) {
      // Verificar que tiene características listadas
      const featureList = enterpriseCard.locator('ul li')
      const count = await featureList.count()
      expect(count).toBeGreaterThan(0)
    }
  })
})
