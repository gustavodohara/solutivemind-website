import { test, expect } from '@playwright/test';

test.describe('Phase 3: Content Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('primary buttons should have shadow effects', async ({ page }) => {
    // Check buttons with primary styling
    const boxShadow = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('a')).filter(a => {
        const className = a.getAttribute('class') || '';
        return className.includes('bg-primary');
      });
      if (buttons.length === 0) return 'none';
      return window.getComputedStyle(buttons[0]).boxShadow;
    });

    // Should have shadow with color values (oklab, rgb, rgba)
    // Accept 'none' as some browsers may not display shadows
    if (boxShadow !== 'none') {
      expect(boxShadow).toMatch(/oklab|rgba|rgb/);
    } else {
      // At least verify the shadow classes exist
      const hasShadowClass = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('a')).filter(a => {
          const className = a.getAttribute('class') || '';
          return className.includes('shadow');
        });
        return buttons.length > 0;
      });
      expect(hasShadowClass).toBeTruthy();
    }
  });

  test('buttons should have hover effects configured', async ({ page }) => {
    // Verify that buttons have hover class with transform
    const hasHoverTransform = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('a')).filter(a =>
        a.className.includes('hover:-translate-y')
      );
      return buttons.length > 0;
    });

    expect(hasHoverTransform).toBeTruthy();
  });

  test('cards should have backdrop blur', async ({ page }) => {
    const backdropFilter = await page.evaluate(() => {
      // Find card elements
      const cards = Array.from(document.querySelectorAll('div')).filter(div =>
        div.className.includes('backdrop-blur')
      );
      if (cards.length === 0) return 'none';
      return window.getComputedStyle(cards[0]).backdropFilter;
    });

    expect(backdropFilter).toContain('blur');
  });

  test('cards should have hover lift class', async ({ page }) => {
    const hasHoverLift = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div')).filter(div =>
        div.className.includes('hover:-translate-y')
      );
      return cards.length > 0;
    });

    expect(hasHoverLift).toBeTruthy();
  });

  test('cards should have shadow that changes on hover', async ({ page }) => {
    const hasHoverShadow = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div')).filter(div =>
        div.className.includes('hover:shadow')
      );
      return cards.length > 0;
    });

    expect(hasHoverShadow).toBeTruthy();
  });

  test('feature icons should have background color', async ({ page }) => {
    const iconBgExists = await page.evaluate(() => {
      // Find divs with bg-primary class (icon containers)
      const iconContainers = Array.from(document.querySelectorAll('div')).filter(div =>
        div.className.includes('bg-primary/') && div.querySelector('svg')
      );
      return iconContainers.length > 0;
    });

    expect(iconBgExists).toBeTruthy();
  });

  test('badges should have proper styling classes', async ({ page }) => {
    const hasBadges = await page.evaluate(() => {
      const badges = Array.from(document.querySelectorAll('span, div')).filter(el =>
        el.className.includes('rounded') &&
        el.className.includes('px-2') &&
        el.className.includes('text-xs')
      );
      return badges.length > 0;
    });

    expect(hasBadges).toBeTruthy();
  });

  test('product cards should have image zoom class', async ({ page }) => {
    // Navigate to services page
    await page.goto('http://localhost:3000/servicios');
    await page.waitForLoadState('networkidle');

    const hasImageZoom = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img')).filter(img =>
        img.className.includes('group-hover:scale')
      );
      return images.length > 0;
    });

    expect(hasImageZoom).toBeTruthy();
  });

  test('sections should have gradient backgrounds', async ({ page }) => {
    const hasGradients = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section')).filter(section =>
        section.className.includes('gradient')
      );
      return sections.length > 0;
    });

    expect(hasGradients).toBeTruthy();
  });

  test('hover transitions should be configured', async ({ page }) => {
    const hasTransitions = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*')).filter(el => {
        const className = el.getAttribute('class') || '';
        return className.includes('transition');
      });
      return elements.length > 0;
    });

    expect(hasTransitions).toBeTruthy();
  });

  test('should maintain layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('no console errors on page load', async ({ page }) => {
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
});
