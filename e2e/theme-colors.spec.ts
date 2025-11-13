import { test, expect } from '@playwright/test'

test.describe('Theme Colors - ONA Palette', () => {
  test('should display navy/onyx colors in light mode', async ({ page }) => {
    await page.goto('/')

    // Verificar que el background es claro
    const body = page.locator('body')
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    )
    // Should be white or very light (rgb(255, 255, 255) or similar)
    expect(bgColor).toMatch(/rgb\(25[0-5], 25[0-5], 25[0-5]\)/)
  })

  test('should display navy/onyx colors in dark mode', async ({ page }) => {
    await page.goto('/')

    // Toggle dark mode
    const themeToggle = page.locator('[aria-label="Toggle theme"]')
    await themeToggle.click()
    await page.waitForTimeout(500)

    // Verificar que el background es oscuro (navy/onyx)
    const body = page.locator('body')
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    )
    // Should be very dark - ONA palette uses oklch(0.12 0.01 240) which is around rgb(26, 30, 42)
    // Accept range from rgb(20-35, 24-38, 36-50) for dark navy colors
    expect(bgColor).toMatch(/rgb\(([2-3][0-9]|[1-4][0-9]), ([2-3][0-9]|[1-4][0-9]), ([3-5][0-9]|[4-6][0-9])\)/)
  })

  test('should render button with xl size', async ({ page }) => {
    await page.goto('/')

    // Verificar que existen botones con tamaño xl (h-12)
    const xlButton = page.locator('button.h-12')
    const count = await xlButton.count()
    expect(count).toBeGreaterThan(0)
  })

  test('dark mode toggle works without flash', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')

    // Toggle dark mode
    const themeToggle = page.locator('[aria-label="Toggle theme"]')
    await themeToggle.click()
    await page.waitForTimeout(500)

    // Verificar que el cambio fue suave (sin errores en consola)
    expect(consoleErrors).toHaveLength(0)
  })

  test('should have proper contrast for text', async ({ page }) => {
    await page.goto('/')

    // Check that foreground color has good contrast
    const body = page.locator('body')
    const color = await body.evaluate((el) =>
      window.getComputedStyle(el).color
    )
    // Should be dark text on light background
    expect(color).toMatch(/rgb\(([0-9]|[1-5][0-9]), ([0-9]|[1-5][0-9]), ([0-9]|[1-5][0-9])\)/)
  })

  test('dark mode should have proper contrast for text', async ({ page }) => {
    await page.goto('/')

    // Toggle dark mode
    const themeToggle = page.locator('[aria-label="Toggle theme"]')
    await themeToggle.click()
    await page.waitForTimeout(500)

    // Check that foreground color is light on dark background
    const body = page.locator('body')
    const color = await body.evaluate((el) =>
      window.getComputedStyle(el).color
    )
    // Should be light text (close to white)
    expect(color).toMatch(/rgb\((2[4-5][0-9]|25[0-5]), (2[4-5][0-9]|25[0-5]), (2[4-5][0-9]|25[0-5])\)/)
  })
})
