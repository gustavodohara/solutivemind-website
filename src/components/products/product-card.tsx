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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-border/50 rounded-2xl">
      {/* Image with enhanced hover effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="p-8">
        {/* Category Badge - more prominent */}
        <Badge className="mb-3 w-fit text-sm px-3 py-1">
          {product.category}
        </Badge>

        <CardTitle className="text-2xl font-bold line-clamp-2 mb-3">
          {product.name}
        </CardTitle>

        <CardDescription className="text-base text-muted-foreground line-clamp-3 leading-relaxed">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">
            {formatPrice(product.price)}
          </p>

          <Button
            asChild
            className="group/btn"
            size="lg"
          >
            <Link href={`/servicios/${product.slug}`}>
              Ver más
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
