import { test, expect } from '@playwright/test';

test.describe('Phase 2: Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('header should have glass morphism effect', async ({ page }) => {
    const header = page.locator('header');

    const backdropFilter = await header.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    // Should have blur effect
    expect(backdropFilter).toContain('blur');
  });

  test('header should have sticky positioning', async ({ page }) => {
    const header = page.locator('header');

    const position = await header.evaluate((el) =>
      window.getComputedStyle(el).position
    );

    expect(position).toBe('sticky');
  });

  test('logo should have gradient text', async ({ page }) => {
    const logo = page.locator('header a[href="/"] span').first();

    const backgroundImage = await logo.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage
    );

    // Should have gradient
    expect(backgroundImage).toContain('gradient');
  });

  test('navigation links should have hover underline animation', async ({
    page,
  }) => {
    const navLink = page.locator('header nav a').first();

    // Check for after pseudo-element styles
    const hasAfterElement = await navLink.evaluate((el) => {
      const after = window.getComputedStyle(el, '::after');
      return after.content !== 'none' && after.height !== '0px';
    });

    expect(hasAfterElement).toBeTruthy();
  });

  test('hero title should have gradient text effect', async ({ page }) => {
    const heroTitle = page.locator('h1').first();

    const backgroundImage = await heroTitle.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage
    );
    const backgroundClip = await heroTitle.evaluate(
      (el) => window.getComputedStyle(el).webkitBackgroundClip
    );

    expect(backgroundImage).toContain('gradient');
    expect(backgroundClip).toBe('text');
  });

  test('hero section should have increased spacing on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const heroSection = page
      .locator('section')
      .filter({ hasText: /automatización|soluciones/i })
      .first();
    const paddingTop = await heroSection.evaluate(
      (el) => window.getComputedStyle(el).paddingTop
    );

    // Should be py-32 (128px) on desktop
    const padding = parseInt(paddingTop);
    expect(padding).toBeGreaterThanOrEqual(120); // Allow some variation
  });

  test('footer should have glass morphism', async ({ page }) => {
    const footer = page.locator('footer');

    const backdropFilter = await footer.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    expect(backdropFilter).toContain('blur');
  });

  test('footer should have subtle border', async ({ page }) => {
    const footer = page.locator('footer');

    const borderTopColor = await footer.evaluate((el) =>
      window.getComputedStyle(el).borderTopColor
    );

    expect(borderTopColor).toBeTruthy();
  });

  test('features section should use wider container', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const featuresContainer = page
      .locator('section')
      .filter({ hasText: /características|por qué elegir/i })
      .locator('div')
      .first();

    const maxWidth = await featuresContainer.evaluate(
      (el) => window.getComputedStyle(el).maxWidth
    );

    // Should be max-w-7xl (1280px)
    const width = parseInt(maxWidth);
    expect(width).toBeGreaterThanOrEqual(1200);
  });

  test('should maintain responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have smooth transitions', async ({ page }) => {
    const navLink = page.locator('header nav a').first();

    const transition = await navLink.evaluate((el) =>
      window.getComputedStyle(el).transition
    );

    expect(transition).toContain('all');
  });
});
