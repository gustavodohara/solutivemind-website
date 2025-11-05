# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for SolutiveMind, a business automation services company. The site is built with TypeScript, Tailwind CSS v4, and shadcn/ui components. It includes a product catalog, contact form, theme system (light/dark mode), and is fully tested with both unit tests (Vitest) and E2E tests (Playwright).

**Tech Stack:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (New York style)
- React Hook Form + Zod validation
- next-themes for dark mode
- Framer Motion for animations
- Vitest for unit tests
- Playwright for E2E tests

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Opens at http://localhost:3000 with hot reload enabled.

### Building for Production
```bash
npm run build
npm run start  # Run production build locally
```

### Code Quality
```bash
npm run lint                    # Run ESLint
npx prettier --write .          # Format code with Prettier
```

### Testing
```bash
# Unit tests (Vitest)
npm run test                    # Run tests in watch mode
npm run test:ui                 # Run tests with UI
npm run test:coverage           # Generate coverage report

# E2E tests (Playwright)
npm run test:e2e                # Run E2E tests
npm run test:e2e:ui             # Run with Playwright UI
npm run test:e2e:headed         # Run with browser visible
npx playwright install          # Install browsers (if needed)
```

## Code Architecture

### Directory Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page
│   ├── servicios/             # Services catalog
│   │   ├── page.tsx           # Services list
│   │   └── [slug]/page.tsx    # Individual service detail
│   ├── contacto/              # Contact page
│   ├── nosotros/              # About page
│   └── theme-demo/            # Theme demo page for testing
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer, WhatsApp button, Hero, Features
│   ├── products/              # Product-related components (ProductCard, ProductGrid, ProductDetail)
│   ├── forms/                 # ContactForm component
│   └── providers/             # ThemeProvider, ToastProvider
└── lib/
    ├── data/                  # Mock data (products.ts)
    ├── types/                 # TypeScript interfaces (Product, ContactFormData, NavItem)
    ├── schemas/               # Zod validation schemas (contact-schema.ts)
    ├── constants/             # Config constants (navigation.ts, theme-config.ts)
    └── utils.ts               # Utility functions (cn helper)
```

### Key Architectural Patterns

**Component Organization:**
- UI components from shadcn/ui live in `components/ui/`
- Layout components (Header, Footer) are in `components/layout/`
- Feature components (products, forms) are grouped by feature
- All components use the `@/` alias for imports

**Data Flow:**
- Products data is centralized in `lib/data/products.ts`
- Helper functions (`getAllProducts`, `getProductBySlug`) provide data access
- Contact form validation uses Zod schemas in `lib/schemas/`
- Navigation items are constants in `lib/constants/navigation.ts`

**Styling Approach:**
- Uses Tailwind CSS v4 with CSS variables for theming
- Theme colors defined in `app/globals.css` with OKLCH color format
- Custom theme configuration in `lib/constants/theme-config.ts`
- Supports light/dark mode via next-themes
- See `THEME_CUSTOMIZATION.md` for theme customization guide

**Form Handling:**
- React Hook Form for form state management
- Zod for validation schemas
- Sonner (toast library) for user feedback
- Form components use shadcn/ui form primitives

### Type System

Primary types are defined in `src/lib/types/index.ts`:

- **Product**: Service/product data structure with slug-based routing
- **ContactFormData**: Contact form submission structure
- **NavItem**: Navigation menu items

### Testing Strategy

**Unit Tests (Vitest):**
- Test utilities, schemas, and pure functions
- Located next to source files with `.test.ts` suffix
- Uses `@testing-library/react` for component tests
- Setup file: `vitest.setup.ts`

**E2E Tests (Playwright):**
- Tests in `e2e/` directory
- Covers user flows: home page, theme toggle, navigation
- Runs against all major browsers (Chromium, Firefox, WebKit, Mobile Chrome)
- Auto-starts dev server via `webServer` config

## Customizing Themes

The site uses a sophisticated theming system with OKLCH colors. To modify colors:

1. Edit CSS variables in `src/app/globals.css`
2. Look for variables marked with `CUSTOMIZABLE` comment
3. Use OKLCH format: `oklch(lightness chroma hue)`
4. Test changes on `/theme-demo` page
5. Consult `THEME_CUSTOMIZATION.md` for detailed guide

Example theme palettes are available in `src/lib/constants/theme-config.ts`.

## Adding New Pages

Next.js App Router conventions:
1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` for the page component
3. Optionally add `layout.tsx` for page-specific layout
4. Update navigation in `lib/constants/navigation.ts`

## Adding New Services/Products

1. Add product data to `PRODUCTS` array in `src/lib/data/products.ts`
2. Ensure slug is unique and URL-friendly
3. Product will automatically appear in catalog
4. Detail page route: `/servicios/[slug]`

## Important Conventions

**Component Patterns:**
- Use `'use client'` directive only when needed (interactivity, hooks, context)
- Server components by default
- Extract reusable logic into hooks in `lib/hooks/`

**Import Alias:**
- Always use `@/` prefix for internal imports
- Example: `import { Product } from '@/lib/types'`

**Styling:**
- Use Tailwind utility classes
- For complex reusable styles, use CSS variables
- Responsive design: mobile-first approach
- Dark mode: use `dark:` variant for theme-specific styles

**SEO:**
- Metadata is configured in `layout.tsx` (root) and individual pages
- Includes OpenGraph and Twitter card meta tags
- Site includes `robots.ts` and `sitemap.ts` for search engines

## Contact Information

WhatsApp integration configured in `lib/constants/navigation.ts`:
- Phone number without formatting for WhatsApp links
- Pre-filled message template available

## Notes

- The site is Spanish-language (Argentina)
- Currency is ARS (Argentine Pesos)
- Uses Geist font family (sans and mono variants)
- All external links should open in new tabs
- Contact form includes optional product reference for inquiry context
