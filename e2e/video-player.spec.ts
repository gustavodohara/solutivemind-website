import { test, expect } from '@playwright/test'

test.describe('VideoPlayer Component', () => {
  test('should embed YouTube video correctly', async ({ page }) => {
    await page.goto('/')

    const iframe = page.locator('iframe[src*="youtube.com"]').first()
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveAttribute('src', /autoplay=1/)
    await expect(iframe).toHaveAttribute('src', /mute=1/)
  })
})
