import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Demostración de Tema</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* Colores de fondo */}
        <Card>
          <CardHeader>
            <CardTitle>Colores de Fondo</CardTitle>
            <CardDescription>Background, Card, Popover</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Background</p>
                <div className="bg-background h-20 rounded-md border" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Card</p>
                <div className="bg-card h-20 rounded-md border" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Popover</p>
                <div className="bg-popover h-20 rounded-md border" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colores de marca */}
        <Card>
          <CardHeader>
            <CardTitle>Colores de Marca</CardTitle>
            <CardDescription>Primary, Secondary, Accent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Primary</p>
                <div className="bg-primary h-20 rounded-md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Secondary</p>
                <div className="bg-secondary h-20 rounded-md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Accent</p>
                <div className="bg-accent h-20 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <Card>
          <CardHeader>
            <CardTitle>Botones</CardTitle>
            <CardDescription>Diferentes variantes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>

        {/* Texto */}
        <Card>
          <CardHeader>
            <CardTitle>Tipografía</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <p className="text-lg">Párrafo grande con texto foreground</p>
            <p className="text-base">Párrafo normal con texto foreground</p>
            <p className="text-muted-foreground text-sm">Texto muted (secundario)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
