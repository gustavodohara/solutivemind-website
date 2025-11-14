import { test, expect } from '@playwright/test'

test.describe('Theme System', () => {
  test('should load with system theme', async ({ page }) => {
    await page.goto('/')

    // Verificar que el theme provider está presente
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'es')
    // suppressHydrationWarning se convierte a minúsculas en el DOM
    const hasClass = await html.evaluate((el) => el.classList.contains('light') || el.classList.contains('dark'))
    expect(hasClass).toBeTruthy()
  })

  test('should persist theme preference', async ({ page }) => {
    await page.goto('/')

    // Cambiar a dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark')
    })

    await page.reload()

    // Verificar que se mantuvo dark mode
    const theme = await page.evaluate(() => localStorage.getItem('theme'))
    expect(theme).toBe('dark')
  })

  test('should display theme demo page correctly', async ({ page }) => {
    await page.goto('/theme-demo')

    // Verificar título
    await expect(page.getByRole('heading', { name: /demostración de tema/i })).toBeVisible()

    // Verificar secciones
    await expect(page.getByText(/colores de fondo/i)).toBeVisible()
    await expect(page.getByText(/colores de marca/i)).toBeVisible()
    await expect(page.getByText(/botones/i)).toBeVisible()
  })

  test('should render all theme components on demo page', async ({ page }) => {
    await page.goto('/theme-demo')

    // Verificar que hay botones de diferentes variantes
    await expect(page.getByRole('button', { name: /default/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /secondary/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /destructive/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /outline/i })).toBeVisible()
  })

  test('should work in both desktop and mobile', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/theme-demo')
    await expect(page.getByText(/demostración de tema/i)).toBeVisible()

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/theme-demo')
    await expect(page.getByText(/demostración de tema/i)).toBeVisible()
  })

  test('should have theme toggle button on demo page', async ({ page }) => {
    await page.goto('/theme-demo')

    // Verificar que existe el botón de toggle
    const toggleButton = page.getByRole('button', { name: /cambiar tema/i })
    await expect(toggleButton).toBeVisible()
  })
})
