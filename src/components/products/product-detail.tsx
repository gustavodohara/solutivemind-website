'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check, MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/navigation'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const formatPrice = (price: number) => {
    if (price === 0) return 'Precio a consultar'
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
    }).format(price)
  }

  const handleContactWhatsApp = () => {
    const message = `Hola! Me interesa obtener más información sobre: ${product.name}`
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[selectedImage]}
            alt={`${product.name} - imagen ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video overflow-hidden rounded-md border-2 transition-all ${
                  selectedImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-muted-foreground'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 16vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Badge>{product.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-slate dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Características incluidas:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleContactWhatsApp}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Consultar por WhatsApp
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Contáctanos para recibir una cotización personalizada
          </p>
        </div>

        {/* Stock Status */}
        {product.inStock ? (
          <Badge variant="outline" className="w-fit">
            Disponible
          </Badge>
        ) : (
          <Badge variant="destructive" className="w-fit">
            No disponible
          </Badge>
        )}
      </div>
    </div>
  )
}
