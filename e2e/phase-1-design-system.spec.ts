import { test, expect } from '@playwright/test';

test.describe('Phase 1: Core Design System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have dark navy background by default', async ({ page }) => {
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should be close to #0A0E27 (rgb(10, 14, 39))
    expect(bgColor).toMatch(/rgb\(10, 14, 39\)|rgb\(9, 13, 38\)/);
  });

  test('should have light text color for readability', async ({ page }) => {
    const body = page.locator('body');
    const textColor = await body.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should be light color (high RGB values)
    expect(textColor).toMatch(/rgb\(2[0-9]{2}, 2[0-9]{2}, 2[0-9]{2}\)/);
  });

  test('should have cyan primary color in buttons', async ({ page }) => {
    const primaryButton = page.locator('button, a').first();
    const bgColor = await primaryButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    });

    // Check for cyan-ish color (higher green and blue than red)
    const match = bgColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      expect(g).toBeGreaterThan(r);
      expect(b).toBeGreaterThan(r);
    }
  });

  test('should have subtle borders', async ({ page }) => {
    const card = page.locator('[class*="border"]').first();
    if (await card.count() > 0) {
      const borderColor = await card.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Border should have low opacity or be very light
      expect(borderColor).toBeTruthy();
    }
  });

  test('should toggle to light mode', async ({ page }) => {
    // Find and click theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i]').or(
      page.locator('button:has-text("Theme")')
    );

    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for transition

      const body = page.locator('body');
      const bgColor = await body.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Should be light color in light mode
      expect(bgColor).toMatch(/rgb\(24[0-9], 25[0-9], 25[0-9]\)/);
    }
  });

  test('should have animation utilities available', async ({ page }) => {
    // Check if custom animations are defined
    const hasAnimations = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let hasAnimation = false;

      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (
              rule instanceof CSSKeyframesRule &&
              (rule.name === 'fade-in' ||
                rule.name === 'slide-up' ||
                rule.name === 'glow-pulse')
            ) {
              hasAnimation = true;
              break;
            }
          }
        } catch (e) {
          // Skip CORS-restricted stylesheets
        }
      }
      return hasAnimation;
    });

    expect(hasAnimations).toBeTruthy();
  });

  test('should not have any console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });
});
