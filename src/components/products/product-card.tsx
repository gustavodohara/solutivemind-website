import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

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
    <Link href={`/servicios/${product.slug}`}>
      <Card className="group overflow-hidden">
        {/* Image */}
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            <Badge variant="outline" className="shrink-0">
              {product.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-3">{product.shortDescription}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
              Ver más →
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
