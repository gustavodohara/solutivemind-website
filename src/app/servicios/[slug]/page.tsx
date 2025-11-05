import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllProducts, getProductBySlug } from '@/lib/data/products'
import { ProductDetail } from '@/components/products/product-detail'
import { Button } from '@/components/ui/button'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

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

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-10">
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
