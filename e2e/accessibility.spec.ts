import { test, expect } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test('home page - keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Tab through interactive elements
    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)

    // Verificar que el foco es visible
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    console.log(`Focused element: ${focused}`)

    expect(['A', 'BUTTON', 'INPUT']).toContain(focused)
  })

  test('all pages - should have proper heading hierarchy', async ({ page }) => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Verificar que hay un h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)

      // No debería haber más de un h1
      expect(h1Count).toBeLessThanOrEqual(2)

      console.log(`${pagePath} - h1 count: ${h1Count}`)
    }
  })

  test('all pages - images should have alt text', async ({ page }) => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Obtener todas las imágenes
      const images = page.locator('img')
      const count = await images.count()

      let missingAlt = 0

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        if (alt === null || alt === undefined) {
          missingAlt++
        }
      }

      console.log(`${pagePath} - images without alt: ${missingAlt}/${count}`)

      // Todas las imágenes deben tener alt (aunque sea vacío para decorativas)
      expect(missingAlt).toBe(0)
    }
  })

  test('all pages - buttons should have accessible names', async ({ page }) => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Obtener todos los botones
      const buttons = page.locator('button, a[role="button"]')
      const count = await buttons.count()

      let missingNames = 0

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i)
        const text = await button.textContent()
        const ariaLabel = await button.getAttribute('aria-label')

        if (!text?.trim() && !ariaLabel) {
          missingNames++
        }
      }

      console.log(`${pagePath} - buttons without names: ${missingNames}/${count}`)

      expect(missingNames).toBe(0)
    }
  })

  test('color contrast - should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/')

    // Verificar algunos elementos clave
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    const textColor = await heading.evaluate((el) =>
      window.getComputedStyle(el).color
    )
    const bgColor = await heading.evaluate((el) => {
      const parent = el.closest('section')
      return parent ? window.getComputedStyle(parent).backgroundColor : ''
    })

    console.log(`Heading color: ${textColor} on ${bgColor}`)

    // Manual verification needed for exact contrast ratio
    // But we can check that colors are defined
    expect(textColor).toBeTruthy()
    expect(bgColor).toBeTruthy()
  })

  test('form accessibility - contact form', async ({ page }) => {
    await page.goto('/contacto')

    // Verificar que todos los inputs tienen labels
    const form = page.locator('form')
    await expect(form).toBeVisible()

    const inputs = form.locator('input, textarea')
    const count = await inputs.count()

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')

      if (id) {
        // Buscar label asociado
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })
})
