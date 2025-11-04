import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Bienvenido a <span className="text-primary">SolutiveMind</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Servicios automatizados que impulsan tu negocio con tecnología de vanguardia.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/servicios">Ver Servicios</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
