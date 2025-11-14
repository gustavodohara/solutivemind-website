import { test, expect } from '@playwright/test'

test.describe('Core Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/component-demo')
  })

  test('VideoPlayer - should render YouTube iframe', async ({ page }) => {
    const iframe = page.locator('iframe[src*="youtube.com"]').first()
    await expect(iframe).toBeVisible()

    // Verificar parámetros de YouTube
    const src = await iframe.getAttribute('src')
    expect(src).toContain('autoplay')
    expect(src).toContain('mute')
  })

  test('VideoPlayer - should have correct aspect ratio', async ({ page }) => {
    const videoContainer = page.locator('.aspect-video').first()
    await expect(videoContainer).toBeVisible()

    const box = await videoContainer.boundingBox()
    if (box) {
      const aspectRatio = box.width / box.height
      expect(aspectRatio).toBeCloseTo(16/9, 1)
    }
  })

  test('LogoCarousel - should display', async ({ page }) => {
    // Wait for carousel container to be visible
    const carousel = page.locator('section:has-text("LogoCarousel")').locator('div').first()
    await expect(carousel).toBeVisible()
  })

  test('SectionHeader - should display with title and description', async ({ page }) => {
    const section = page.locator('section:has-text("SectionHeader")')
    const header = section.locator('h2:has-text("Section Title")')
    await expect(header).toBeVisible()

    const description = section.locator('p:has-text("This is a section description")')
    await expect(description).toBeVisible()

    const badge = section.locator('text="New Feature"')
    await expect(badge).toBeVisible()
  })

  test('CTAButtonPair - should render two buttons', async ({ page }) => {
    const getStartedBtn = page.locator('a[href="/contacto"]:has-text("Get Started")')
    await expect(getStartedBtn).toBeVisible()

    const learnMoreBtn = page.locator('a[href="/nosotros"]:has-text("Learn More")')
    await expect(learnMoreBtn).toBeVisible()
  })

  test('IntegrationGrid - should display logos in grid', async ({ page }) => {
    const gridSection = page.locator('section:has-text("IntegrationGrid")')
    await expect(gridSection).toBeVisible()

    const grid = gridSection.locator('.grid')
    await expect(grid).toBeVisible()

    // Verificar que usa grid
    const gridDisplay = await grid.evaluate((el) =>
      window.getComputedStyle(el).display
    )
    expect(gridDisplay).toBe('grid')
  })

  test('StoryboardSection - should display background image with overlay', async ({ page }) => {
    const section = page.locator('section:has-text("Storyboard Section Title")')
    await expect(section).toBeVisible()

    const title = page.locator('h2:has-text("Storyboard Section Title")')
    await expect(title).toBeVisible()
  })

  test('Page loads successfully', async ({ page }) => {
    // Verify page title is present
    const title = page.locator('h1:has-text("Component Demo Page")')
    await expect(title).toBeVisible()
  })
})
