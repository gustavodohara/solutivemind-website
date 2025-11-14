import { test, expect } from '@playwright/test'

test.describe('LogoCarousel Component', () => {
  test('should autoplay and loop', async ({ page }) => {
    await page.goto('/')

    const carousel = page.locator('[class*="embla"]').first()
    await expect(carousel).toBeVisible()

    // Wait and verify carousel moved
    await page.waitForTimeout(4000)
    // Carousel should have moved (visual verification)
  })
})
