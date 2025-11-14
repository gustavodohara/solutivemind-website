import { test, expect } from '@playwright/test'

test.describe('Home Page Redesign', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero with video background', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible()
  })

  test('should display logo carousel', async ({ page }) => {
    const carousel = page.locator('[class*="embla"]').first()
    await expect(carousel).toBeVisible()
  })

  test('should change tabs in tabbed carousel', async ({ page }) => {
    // Click second tab
    await page.getByRole('button', { name: /integración/i }).click()

    // Verify content changed
    await expect(page.getByText(/integr/i)).toBeVisible()
  })

  test('should display storyboard sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /automatización/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /integración/i })).toBeVisible()
  })

  test('should display integration grid', async ({ page }) => {
    await expect(page.getByText(/integraciones/i)).toBeVisible()
    // Verify at least 8 integration logos visible
    const logos = page.locator('img[alt*=""]')
    await expect(logos).toHaveCount(12, { timeout: 5000 })
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
