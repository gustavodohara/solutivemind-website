import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllProducts, getProductBySlug } from '@/lib/data/products'
import { ProductDetail } from '@/components/products/product-detail'
import { Button } from '@/components/ui/button'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  return {
    title: `${product.name} - SolutiveMind`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/servicios">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a servicios
        </Link>
      </Button>

      {/* Product Detail */}
      <ProductDetail product={product} />
    </div>
  )
}
