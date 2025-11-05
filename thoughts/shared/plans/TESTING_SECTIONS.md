# Secciones de Testing para Fases 3-7

Este documento contiene las secciones de testing que deben agregarse al final de cada fase (antes de "Performance Considerations").

---

## FASE 3: Layout y Navegación

### Testing Strategy (agregar antes de "## Performance Considerations")

```markdown
## Testing Strategy

### Unit Tests (Vitest):

**Archivo**: `src/components/layout/header.test.tsx`

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Header } from './header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('should render logo', () => {
    render(<Header />)
    expect(screen.getByText('SolutiveMind')).toBeInTheDocument()
  })

  it('should render all navigation items', () => {
    render(<Header />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('should open mobile menu on click', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByLabelText(/abrir menú/i)
    await user.click(menuButton)

    // Verificar que el mobile nav se abre
    expect(screen.getByText('Menú')).toBeInTheDocument()
  })
})
\`\`\`

**Archivo**: `src/components/layout/footer.test.tsx`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './footer'

describe('Footer', () => {
  it('should render company name', () => {
    render(<Footer />)
    expect(screen.getByText('SolutiveMind')).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<Footer />)
    expect(screen.getByText(/contacto@solutivemind.com/i)).toBeInTheDocument()
  })

  it('should render current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('should render all quick links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})
\`\`\`

**Archivo**: `src/components/layout/whatsapp-button.test.tsx`

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { WhatsAppButton } from './whatsapp-button'

describe('WhatsAppButton', () => {
  it('should render button', () => {
    render(<WhatsAppButton />)
    const button = screen.getByRole('button', { name: /contactar por whatsapp/i })
    expect(button).toBeInTheDocument()
  })

  it('should open WhatsApp on click', async () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const user = userEvent.setup()

    render(<WhatsAppButton />)
    const button = screen.getByRole('button')
    await user.click(button)

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'noopener,noreferrer'
    )
  })
})
\`\`\`

**Archivo**: `src/lib/hooks/use-active-path.test.ts`

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActivePath } from './use-active-path'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

describe('useActivePath', () => {
  it('should return true for exact match on home', () => {
    vi.mocked(require('next/navigation').usePathname).mockReturnValue('/')
    const { result } = renderHook(() => useActivePath())
    expect(result.current.isActive('/')).toBe(true)
  })

  it('should return true for path prefix match', () => {
    vi.mocked(require('next/navigation').usePathname).mockReturnValue('/servicios/item')
    const { result } = renderHook(() => useActivePath())
    expect(result.current.isActive('/servicios')).toBe(true)
  })

  it('should return false for non-matching path', () => {
    vi.mocked(require('next/navigation').usePathname).mockReturnValue('/servicios')
    const { result } = renderHook(() => useActivePath())
    expect(result.current.isActive('/contacto')).toBe(false)
  })
})
\`\`\`

### E2E Tests (Playwright):

**Archivo**: `e2e/navigation.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')

    // Click on Servicios
    await page.click('text=Servicios')
    await expect(page).toHaveURL('/servicios')

    // Click on Sobre Nosotros (cuando esté implementado en Fase 6)
    // await page.click('text=Sobre Nosotros')
    // await expect(page).toHaveURL('/nosotros')

    // Click on Contacto (cuando esté implementado en Fase 5)
    // await page.click('text=Contacto')
    // await expect(page).toHaveURL('/contacto')

    // Click on logo to go back home
    await page.click('text=SolutiveMind')
    await expect(page).toHaveURL('/')
  })

  test('should highlight active navigation link', async ({ page }) => {
    await page.goto('/servicios')

    const serviciosLink = page.locator('nav >> text=Servicios')
    await expect(serviciosLink).toHaveClass(/text-primary/)
  })

  test('should show mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Click hamburger menu
    await page.click('[aria-label="Abrir menú"]')

    // Verify mobile menu is visible
    await expect(page.getByText('Menú')).toBeVisible()
  })

  test('should close mobile menu after clicking link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    await page.click('[aria-label="Abrir menú"]')
    await expect(page.getByText('Menú')).toBeVisible()

    // Click a link
    await page.click('text=Servicios')

    // Menu should close
    await expect(page.getByText('Menú')).not.toBeVisible()
  })

  test('should have sticky header', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toHaveCSS('position', 'sticky')
  })
})

test.describe('WhatsApp Button', () => {
  test('should be visible and clickable', async ({ page }) => {
    await page.goto('/')

    const whatsappButton = page.locator('[aria-label="Contactar por WhatsApp"]')
    await expect(whatsappButton).toBeVisible()
  })

  test('should open WhatsApp on click', async ({ page, context }) => {
    await page.goto('/')

    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.click('[aria-label="Contactar por WhatsApp"]'),
    ])

    expect(popup.url()).toContain('wa.me')
  })

  test('should be fixed at bottom right', async ({ page }) => {
    await page.goto('/')

    const button = page.locator('[aria-label="Contactar por WhatsApp"]')
    await expect(button).toHaveCSS('position', 'fixed')
  })
})

test.describe('Footer', () => {
  test('should render footer on all pages', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()

    await page.goto('/servicios')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have working contact links', async ({ page }) => {
    await page.goto('/')

    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toHaveAttribute('href', /contacto@solutivemind/)

    const phoneLink = page.locator('a[href^="tel:"]')
    await expect(phoneLink).toHaveAttribute('href', /\+54/)
  })
})
\`\`\`

### Manual Testing Checklist:

#### Desktop (>768px):
- [ ] Header sticky funciona al hacer scroll
- [ ] Navegación horizontal visible
- [ ] Links de navegación funcionan
- [ ] Link activo se resalta
- [ ] Theme toggle funciona
- [ ] Footer se muestra al final
- [ ] WhatsApp button visible y funcional

#### Mobile (<768px):
- [ ] Header responsive
- [ ] Menú hamburguesa visible
- [ ] Menú hamburguesa abre sheet
- [ ] Links en mobile nav funcionan
- [ ] Sheet se cierra al clickear link
- [ ] Footer responsive

### Coverage Goals:
- Unit tests: >80% coverage en layout components
- E2E tests: Todos los flujos de navegación cubiertos
```

---

## FASE 4: Catálogo de Productos

### Testing Strategy (agregar antes de "## Performance Considerations")

```markdown
## Testing Strategy

### Unit Tests (Vitest):

**Archivo**: `src/lib/data/products.test.ts`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { getAllProducts, getProductBySlug, getProductById, getProductsByCategory } from './products'

describe('Product Data Functions', () => {
  it('should return all products', () => {
    const products = getAllProducts()
    expect(products).toHaveLength(1)
    expect(products[0]).toHaveProperty('id')
    expect(products[0]).toHaveProperty('name')
  })

  it('should find product by slug', () => {
    const product = getProductBySlug('servicios-automatizacion-empresarial')
    expect(product).toBeDefined()
    expect(product?.name).toBe('Servicios de Automatización Empresarial')
  })

  it('should return undefined for non-existent slug', () => {
    const product = getProductBySlug('non-existent')
    expect(product).toBeUndefined()
  })

  it('should find product by id', () => {
    const product = getProductById('1')
    expect(product).toBeDefined()
  })

  it('should filter products by category', () => {
    const products = getProductsByCategory('Automatización')
    expect(products).toHaveLength(1)
  })
})
\`\`\`

**Archivo**: `src/components/products/product-card.test.tsx`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from './product-card'
import { Product } from '@/lib/types'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  shortDescription: 'Short desc',
  price: 1000,
  currency: 'ARS',
  images: ['/test.jpg'],
  category: 'Test',
  features: ['Feature 1'],
  inStock: true,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
}

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Short desc')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should show "Precio a consultar" for price 0', () => {
    const freeProduct = { ...mockProduct, price: 0 }
    render(<ProductCard product={freeProduct} />)

    expect(screen.getByText('Precio a consultar')).toBeInTheDocument()
  })

  it('should format price correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText(/\$1/)).toBeInTheDocument()
  })

  it('should have link to product detail', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link', { name: /ver más/i })
    expect(link).toHaveAttribute('href', '/servicios/test-product')
  })
})
\`\`\`

**Archivo**: `src/components/products/product-grid.test.tsx`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductGrid } from './product-grid'

describe('ProductGrid', () => {
  it('should render empty state when no products', () => {
    render(<ProductGrid products={[]} />)

    expect(screen.getByText(/no se encontraron servicios/i)).toBeInTheDocument()
  })

  it('should render products in grid', () => {
    const products = [
      {
        id: '1',
        name: 'Product 1',
        slug: 'product-1',
        shortDescription: 'Desc 1',
        price: 100,
        currency: 'ARS',
        images: ['/test.jpg'],
        category: 'Test',
        description: '',
        features: [],
        inStock: true,
        createdAt: '',
        updatedAt: '',
      },
    ]

    render(<ProductGrid products={products} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
  })
})
\`\`\`

### E2E Tests (Playwright):

**Archivo**: `e2e/products.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Products Catalog', () => {
  test('should display products list page', async ({ page }) => {
    await page.goto('/servicios')

    await expect(page.getByRole('heading', { name: /nuestros servicios/i })).toBeVisible()
    await expect(page.getByText(/servicios de automatización/i)).toBeVisible()
  })

  test('should navigate to product detail', async ({ page }) => {
    await page.goto('/servicios')

    await page.click('text=Ver más')

    await expect(page).toHaveURL(/\/servicios\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('should display product detail correctly', async ({ page }) => {
    await page.goto('/servicios/servicios-automatizacion-empresarial')

    // Title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Automatización')

    // Category badge
    await expect(page.getByText('Automatización')).toBeVisible()

    // Price
    await expect(page.getByText(/precio a consultar/i)).toBeVisible()

    // Features
    await expect(page.getByText(/características incluidas/i)).toBeVisible()

    // CTA Button
    await expect(page.getByRole('button', { name: /consultar por whatsapp/i })).toBeVisible()
  })

  test('should open WhatsApp from product detail', async ({ page, context }) => {
    await page.goto('/servicios/servicios-automatizacion-empresarial')

    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.click('button:has-text("Consultar por WhatsApp")'),
    ])

    expect(popup.url()).toContain('wa.me')
    expect(popup.url()).toContain('Automatización')
  })

  test('should show back button on product detail', async ({ page }) => {
    await page.goto('/servicios/servicios-automatizacion-empresarial')

    const backButton = page.getByRole('link', { name: /volver a servicios/i })
    await expect(backButton).toBeVisible()

    await backButton.click()
    await expect(page).toHaveURL('/servicios')
  })

  test('should change product images on thumbnail click', async ({ page }) => {
    await page.goto('/servicios/servicios-automatizacion-empresarial')

    // If there are multiple images
    const thumbnails = page.locator('button[class*="aspect-video"]')
    const count = await thumbnails.count()

    if (count > 1) {
      await thumbnails.nth(1).click()
      // Verify image changed (implementation depends on actual structure)
    }
  })

  test('should display 404 for non-existent product', async ({ page }) => {
    await page.goto('/servicios/non-existent-product')

    await expect(page.getByText(/servicio no encontrado/i)).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/servicios')
    // Verify grid has 3 columns
    const grid = page.locator('[class*="grid-cols-3"]')
    await expect(grid).toBeVisible()

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 })
    // Grid should be 1 column
    const products = page.locator('[class*="grid"]')
    await expect(products).toBeVisible()
  })
})
\`\`\`

### Manual Testing Checklist:

- [ ] Página `/servicios` carga correctamente
- [ ] Grid responsive (1 col → 2 cols → 3 cols)
- [ ] ProductCard muestra imagen, título, descripción, precio
- [ ] Click en "Ver más" navega a detalle
- [ ] Página de detalle muestra toda la información
- [ ] Thumbnails permiten cambiar imagen
- [ ] Botón WhatsApp funciona con mensaje personalizado
- [ ] Botón "Volver" funciona
- [ ] 404 page para productos inexistentes
- [ ] SEO metadata correcta

### Coverage Goals:
- Unit tests: >80% coverage en product components
- E2E tests: Todos los flujos de usuario cubiertos
```

---

## FASE 5: Formulario de Contacto

### Testing Strategy (agregar antes de "## Performance Considerations")

```markdown
## Testing Strategy

### Unit Tests (Vitest):

**Archivo**: `src/lib/schemas/contact-schema.test.ts`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { contactFormSchema } from './contact-schema'

describe('Contact Form Schema', () => {
  it('should validate correct data', () => {
    const validData = {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      phone: '+54 9 11 1234-5678',
      message: 'Este es un mensaje de prueba',
    }

    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject short name', () => {
    const invalidData = {
      name: 'J',
      email: 'juan@ejemplo.com',
      message: 'Mensaje de prueba',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'invalid-email',
      message: 'Mensaje de prueba',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject short message', () => {
    const invalidData = {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      message: 'Corto',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should accept empty phone (optional field)', () => {
    const validData = {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      message: 'Mensaje de prueba válido',
      phone: '',
    }

    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
})
\`\`\`

**Archivo**: `src/components/forms/contact-form.test.tsx`

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ContactForm } from './contact-form'

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
  })

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener/i)).toBeInTheDocument()
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
      expect(screen.getByText(/el mensaje debe tener/i)).toBeInTheDocument()
    })
  })

  it('should submit form with valid data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Success' }),
    })

    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@ejemplo.com')
    await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba')

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object))
    })
  })

  it('should show character count for message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const messageField = screen.getByLabelText(/mensaje/i)
    await user.type(messageField, 'Test message')

    expect(screen.getByText(/12\/1000/)).toBeInTheDocument()
  })
})
\`\`\`

### E2E Tests (Playwright):

**Archivo**: `e2e/contact.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should display contact page', async ({ page }) => {
    await page.goto('/contacto')

    await expect(page.getByRole('heading', { name: /contáctanos/i })).toBeVisible()
    await expect(page.getByText(/envíanos un mensaje/i)).toBeVisible()
  })

  test('should display all form fields', async ({ page }) => {
    await page.goto('/contacto')

    await expect(page.getByLabel(/nombre completo/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/teléfono/i)).toBeVisible()
    await expect(page.getByLabel(/mensaje/i)).toBeVisible()
  })

  test('should show validation errors on submit empty form', async ({ page }) => {
    await page.goto('/contacto')

    await page.click('button:has-text("Enviar mensaje")')

    await expect(page.getByText(/el nombre debe tener/i)).toBeVisible()
    await expect(page.getByText(/el email es requerido/i)).toBeVisible()
    await expect(page.getByText(/el mensaje debe tener/i)).toBeVisible()
  })

  test('should submit form successfully', async ({ page }) => {
    await page.goto('/contacto')

    // Fill form
    await page.fill('input[name="name"]', 'Juan Pérez')
    await page.fill('input[name="email"]', 'juan@ejemplo.com')
    await page.fill('input[name="phone"]', '+54 9 11 1234-5678')
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba para testing E2E')

    // Submit
    await page.click('button:has-text("Enviar mensaje")')

    // Wait for success message
    await expect(page.getByText(/mensaje enviado exitosamente/i)).toBeVisible({
      timeout: 5000,
    })
  })

  test('should reset form after successful submission', async ({ page }) => {
    await page.goto('/contacto')

    // Fill and submit
    await page.fill('input[name="name"]', 'Juan Pérez')
    await page.fill('input[name="email"]', 'juan@ejemplo.com')
    await page.fill('textarea[name="message"]', 'Mensaje de prueba')
    await page.click('button:has-text("Enviar mensaje")')

    // Wait for success
    await expect(page.getByText(/mensaje enviado exitosamente/i)).toBeVisible({
      timeout: 5000,
    })

    // Verify form is reset
    await expect(page.locator('input[name="name"]')).toHaveValue('')
    await expect(page.locator('input[name="email"]')).toHaveValue('')
    await expect(page.locator('textarea[name="message"]')).toHaveValue('')
  })

  test('should display contact information sidebar', async ({ page }) => {
    await page.goto('/contacto')

    await expect(page.getByText(/contacto@solutivemind.com/i)).toBeVisible()
    await expect(page.getByText(/\+54/)).toBeVisible()
    await expect(page.getByText(/buenos aires/i)).toBeVisible()
  })

  test('should have working email link', async ({ page }) => {
    await page.goto('/contacto')

    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toHaveAttribute('href', /contacto@solutivemind/)
  })

  test('should be responsive', async ({ page }) => {
    // Desktop: 2/3 form + 1/3 sidebar
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/contacto')
    await expect(page.getByText(/envíanos un mensaje/i)).toBeVisible()

    // Mobile: stacked layout
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/contacto')
    await expect(page.getByText(/envíanos un mensaje/i)).toBeVisible()
  })

  test('should update character count', async ({ page }) => {
    await page.goto('/contacto')

    const messageField = page.locator('textarea[name="message"]')
    await messageField.fill('Test message')

    await expect(page.getByText(/12\/1000/)).toBeVisible()
  })
})
\`\`\`

### Manual Testing Checklist:

#### Validation:
- [ ] Nombre vacío muestra error
- [ ] Email inválido muestra error
- [ ] Mensaje <10 chars muestra error
- [ ] Teléfono opcional funciona
- [ ] Mensajes de error en español

#### Functionality:
- [ ] Submit deshabilitado mientras carga
- [ ] Loading spinner visible
- [ ] Success message aparece
- [ ] Form se resetea después de envío
- [ ] Toast notifications funcionan

#### UI/UX:
- [ ] Responsive en mobile
- [ ] Focus states visibles
- [ ] Character counter funciona

### Coverage Goals:
- Unit tests: >90% coverage en form y schema
- E2E tests: Todos los flujos de formulario cubiertos
```

---

## FASE 6: Páginas Adicionales

### Testing Strategy (agregar antes de "## Performance Considerations")

```markdown
## Testing Strategy

### Unit Tests (Vitest):

**Archivo**: `src/components/layout/hero.test.tsx`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './hero'

describe('Hero', () => {
  it('should render title and description', () => {
    render(<Hero title="Test Title" description="Test Description" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should render actions if provided', () => {
    render(
      <Hero
        title="Title"
        description="Desc"
        actions={<button>Action Button</button>}
      />
    )

    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
  })
})
\`\`\`

**Archivo**: `src/components/layout/features-section.test.tsx`

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturesSection } from './features-section'
import { Zap } from 'lucide-react'

describe('FeaturesSection', () => {
  const mockFeatures = [
    {
      icon: Zap,
      title: 'Feature 1',
      description: 'Description 1',
    },
    {
      icon: Zap,
      title: 'Feature 2',
      description: 'Description 2',
    },
  ]

  it('should render all features', () => {
    render(<FeaturesSection features={mockFeatures} />)

    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Feature 2')).toBeInTheDocument()
  })

  it('should render title if provided', () => {
    render(<FeaturesSection title="Features" features={mockFeatures} />)

    expect(screen.getByRole('heading', { name: 'Features' })).toBeInTheDocument()
  })
})
\`\`\`

### E2E Tests (Playwright):

**Archivo**: `e2e/pages.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('automatización')
    await expect(page.getByRole('link', { name: /ver servicios/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contactar/i })).toBeVisible()
  })

  test('should display features section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText(/¿por qué elegirnos?/i)).toBeVisible()
    await expect(page.getByText(/automatización inteligente/i)).toBeVisible()
  })

  test('should display CTA section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText(/¿listo para optimizar/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /solicitar consulta/i })).toBeVisible()
  })

  test('should navigate from hero CTAs', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Ver Servicios')
    await expect(page).toHaveURL('/servicios')

    await page.goto('/')
    await page.click('text=Contactar')
    await expect(page).toHaveURL('/contacto')
  })
})

test.describe('About Page', () => {
  test('should display about page', async ({ page }) => {
    await page.goto('/nosotros')

    await expect(page.getByRole('heading', { name: /sobre solutivemind/i })).toBeVisible()
    await expect(page.getByText(/¿quiénes somos?/i)).toBeVisible()
  })

  test('should display mission, vision, values', async ({ page }) => {
    await page.goto('/nosotros')

    await expect(page.getByText(/misión/i)).toBeVisible()
    await expect(page.getByText(/visión/i)).toBeVisible()
    await expect(page.getByText(/valores/i)).toBeVisible()
  })

  test('should have CTAs', async ({ page }) => {
    await page.goto('/nosotros')

    await expect(page.getByRole('link', { name: /ver servicios/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contactar/i })).toBeVisible()
  })
})

test.describe('404 Page', () => {
  test('should display custom 404 page', async ({ page }) => {
    await page.goto('/non-existent-page')

    await expect(page.getByText(/404/)).toBeVisible()
    await expect(page.getByText(/página no encontrada/i)).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/non-existent-page')

    await page.click('text=Ir al Inicio')
    await expect(page).toHaveURL('/')
  })

  test('should have quick links', async ({ page }) => {
    await page.goto('/non-existent-page')

    await expect(page.getByRole('link', { name: /servicios/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /sobre nosotros/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contacto/i })).toBeVisible()
  })
})

test.describe('SEO', () => {
  test('should have correct metadata on home', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/solutivemind/i)

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toContain('automatización')
  })

  test('should have sitemap', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toContain('<?xml')
    expect(content).toContain('urlset')
  })

  test('should have robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)

    const content = await page.textContent('body')
    expect(content).toContain('User-agent')
    expect(content).toContain('Sitemap')
  })
})
\`\`\`

### Manual Testing Checklist:

- [ ] Home page atractiva y profesional
- [ ] Features section con 6 items (3 cols desktop)
- [ ] CTA section visible
- [ ] Sobre Nosotros con contenido completo
- [ ] 404 page personalizada
- [ ] Sitemap.xml accesible
- [ ] Robots.txt accesible
- [ ] Metadata correcta en todas las páginas
- [ ] Responsive en mobile

### Coverage Goals:
- Unit tests: >75% coverage en page components
- E2E tests: Todas las páginas navegables
```

---

## FASE 7: Optimizaciones y Deploy

### Testing Strategy (agregar antes de "## Performance Budget")

```markdown
## Testing Strategy

### Performance Tests:

**Archivo**: `e2e/performance.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/')

    // Get Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          resolve(entries)
        })
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })

        // Timeout after 10s
        setTimeout(() => resolve([]), 10000)
      })
    })

    console.log('Performance metrics:', metrics)
  })

  test('should load fast on 3G', async ({ page, context }) => {
    // Emulate slow 3G
    await context.route('**/*', (route) => {
      route.continue({
        headers: {
          ...route.request().headers(),
        },
      })
    })

    const start = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - start

    // Should load in less than 5 seconds on 3G
    expect(loadTime).toBeLessThan(5000)
  })

  test('should have optimized images', async ({ page }) => {
    await page.goto('/')

    // Check that images use next/image optimization
    const images = await page.locator('img').all()

    for (const img of images) {
      const loading = await img.getAttribute('loading')
      // Images should be lazy-loaded except those above the fold
      if (loading) {
        expect(loading).toBe('lazy')
      }
    }
  })
})
\`\`\`

### Lighthouse CI Tests:

**Archivo**: `.github/workflows/lighthouse-ci.yml` (opcional)

\`\`\`yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/servicios
            http://localhost:3000/contacto
          uploadArtifacts: true
\`\`\`

### Bundle Size Tests:

**Archivo**: `scripts/check-bundle-size.js`

\`\`\`javascript
const fs = require('fs')
const path = require('path')

const MAX_SIZE = 500 * 1024 // 500KB

const statsFile = path.join(__dirname, '../.next/static/chunks/pages/_app.js')

if (fs.existsSync(statsFile)) {
  const stats = fs.statSync(statsFile)
  console.log(`Bundle size: ${(stats.size / 1024).toFixed(2)}KB`)

  if (stats.size > MAX_SIZE) {
    console.error(`❌ Bundle size exceeds ${MAX_SIZE / 1024}KB!`)
    process.exit(1)
  } else {
    console.log(`✅ Bundle size is within limits`)
  }
}
\`\`\`

### Automated Verification Tests:

**Archivo**: `e2e/deployment-verification.spec.ts`

\`\`\`typescript
import { test, expect } from '@playwright/test'

test.describe('Deployment Verification', () => {
  test('should have HTTPS enabled', async ({ page }) => {
    // Only run on production URL
    if (process.env.PROD_URL) {
      await page.goto(process.env.PROD_URL)
      expect(page.url()).toMatch(/^https:\/\//)
    }
  })

  test('should have security headers', async ({ page }) => {
    const response = await page.goto('/')
    const headers = response?.headers()

    expect(headers?.['x-content-type-options']).toBe('nosniff')
    expect(headers?.['x-frame-options']).toBe('SAMEORIGIN')
    expect(headers?.['strict-transport-security']).toBeTruthy()
  })

  test('should not expose sensitive information', async ({ page }) => {
    await page.goto('/')

    // Check that no API keys are in the HTML
    const content = await page.content()
    expect(content).not.toContain('sk_')
    expect(content).not.toContain('API_KEY')
  })

  test('should have working error pages', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345')

    expect(response?.status()).toBe(404)
    await expect(page.getByText(/404/)).toBeVisible()
  })

  test('all critical pages should load', async ({ page }) => {
    const pages = ['/', '/servicios', '/nosotros', '/contacto']

    for (const url of pages) {
      const response = await page.goto(url)
      expect(response?.status()).toBe(200)
    }
  })

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await expect(page.getByText(/solutivemind/i)).toBeVisible()
  })
})
\`\`\`

### Manual Testing Checklist (Pre-Deploy):

#### Build & Code Quality:
- [ ] `npm run build` exitoso sin warnings
- [ ] `npm run lint` sin errores
- [ ] `npm run test` todos los tests pasan
- [ ] `npm run test:e2e` todos los tests E2E pasan
- [ ] No console.logs en producción

#### Lighthouse Scores:
- [ ] Performance >90
- [ ] Accessibility >90
- [ ] Best Practices >90
- [ ] SEO >90

#### Security:
- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] No API keys expuestas

#### Functionality:
- [ ] Todas las páginas accesibles
- [ ] Navegación funciona
- [ ] Formularios funcionan
- [ ] WhatsApp button funciona
- [ ] Dark mode funciona

### Post-Deploy Testing Checklist:

- [ ] Sitio accesible en producción
- [ ] SSL certificate válido
- [ ] Todas las páginas cargan <3s
- [ ] No errores en Vercel logs
- [ ] Analytics tracking funciona
- [ ] Formulario de contacto envía mensajes
- [ ] Responsive en diferentes dispositivos
- [ ] Compatible con diferentes navegadores

### Automated Tests in CI/CD:

\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm run test:e2e
\`\`\`

### Coverage Goals:
- Overall test coverage: >80%
- All critical user paths covered by E2E tests
- Performance budgets enforced
- Security checks automated
```

---

## Notas de Implementación

Para agregar estas secciones a cada fase:

1. Abrir cada archivo de fase
2. Buscar la sección "## Performance Considerations"
3. Insertar la sección de testing correspondiente **antes** de esa línea
4. Guardar el archivo

O puedo hacerlo yo automáticamente si prefieres.
