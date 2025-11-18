import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="text-muted-foreground mb-4 h-16 w-16" />
      <h2 className="mb-2 text-3xl font-bold">Servicio no encontrado</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, el servicio que buscas no existe o ha sido removido.
      </p>
      <Button asChild>
        <Link href="/servicios">Ver todos los servicios</Link>
      </Button>
    </div>
  )
}
