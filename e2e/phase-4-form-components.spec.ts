import { test, expect } from '@playwright/test';

test.describe('Phase 4: Form & Input Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/contacto');
  });

  test('input fields should have backdrop blur', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /nombre/i });

    const backdropFilter = await input.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );

    expect(backdropFilter).toContain('blur');
  });

  test('input fields should have subtle borders', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /nombre/i });

    const borderStyle = await input.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        borderColor: styles.borderColor,
        borderWidth: styles.borderWidth
      };
    });

    expect(borderStyle.borderColor).toBeTruthy();
    expect(borderStyle.borderWidth).not.toBe('0px');
  });

  test('input focus should show cyan ring', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /nombre/i });

    await input.focus();
    await page.waitForTimeout(200);

    const boxShadow = await input.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );

    // Should have a focus ring
    expect(boxShadow).not.toBe('none');
  });

  test('textarea should match input styling', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: /cuéntanos/i });

    const styles = await textarea.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backdropFilter: computed.backdropFilter,
        backgroundColor: computed.backgroundColor
      };
    });

    expect(styles.backdropFilter).toContain('blur');
    expect(styles.backgroundColor).toBeTruthy();
  });

  test('labels should be readable', async ({ page }) => {
    const labels = page.locator('label');
    const firstLabel = labels.first();

    await expect(firstLabel).toBeVisible();

    const color = await firstLabel.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    expect(color).toBeTruthy();
  });

  test('form should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    const input = page.getByRole('textbox', { name: /nombre/i });
    const width = await input.evaluate((el) =>
      window.getComputedStyle(el).width
    );

    // Should be responsive (take most of available width)
    const widthValue = parseInt(width);
    expect(widthValue).toBeGreaterThan(300);
  });

  test('inputs should have smooth transitions', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /nombre/i });

    const transitionDuration = await input.evaluate((el) =>
      window.getComputedStyle(el).transitionDuration
    );

    expect(transitionDuration).not.toBe('0s');
  });

  test('form components should have backdrop blur class', async ({ page }) => {
    const hasBackdropBlur = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, textarea')).filter(el => {
        const className = el.getAttribute('class') || '';
        return className.includes('backdrop-blur');
      });
      return inputs.length > 0;
    });

    expect(hasBackdropBlur).toBeTruthy();
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000/contacto');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});
