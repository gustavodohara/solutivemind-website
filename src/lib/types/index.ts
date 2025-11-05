// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  currency: string
  images: string[]
  category: string
  features: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  productId?: string
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
}
