import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Precio a consultar'
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
    }).format(price)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader>
        {/* Category Badge */}
        <Badge className="mb-2 w-fit">{product.category}</Badge>

        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-3">{product.shortDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
          <Button asChild>
            <Link href={`/servicios/${product.slug}`}>
              Ver más
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
