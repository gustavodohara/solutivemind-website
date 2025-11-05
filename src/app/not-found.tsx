'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6 text-center">
        {/* 404 Large Text */}
        <div className="relative">
          <h1 className="text-muted-foreground/20 text-9xl font-bold">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="text-muted-foreground/40 h-20 w-20" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Página no encontrada</h2>
          <p className="text-muted-foreground text-lg">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver Atrás
          </Button>
        </div>

        {/* Quick Links */}
        <div className="border-t pt-8">
          <p className="text-muted-foreground mb-4 text-sm">O visita:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/servicios" className="text-primary hover:underline">
              Servicios
            </Link>
            <Link href="/nosotros" className="text-primary hover:underline">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="text-primary hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
