# Fase 5: Formulario de Contacto

## Overview

Implementar un formulario de contacto completo con validación en español usando React Hook Form y Zod. El formulario será funcional en frontend (preparado para integración backend futura) y usará componentes de shadcn/ui para una UI profesional.

## Current State

- React Hook Form y Zod instalados
- shadcn/ui form components disponibles
- Tipos TypeScript definidos para ContactFormData
- No existe página de contacto
- No hay componentes de formulario

## Desired End State

Un sistema de contacto funcional con:
- Página `/contacto` con formulario completo
- Validación en tiempo real con mensajes en español
- Campos: nombre, email, teléfono (opcional), mensaje, producto (opcional)
- UI profesional y accesible con shadcn/ui
- Manejo de estados: vacío, llenando, validando, enviando, éxito, error
- Responsive y accesible
- Preparado para integración con backend (API endpoint o servicio de email)

### Verification:
- Navegar a `/contacto` muestra el formulario
- Validación funciona en español
- Campos requeridos muestran errores apropiados
- Submit muestra estado de carga (simulado)
- Mensaje de éxito se muestra después de submit
- Formulario se resetea después de envío exitoso
- Todo funciona en mobile y desktop

## What We're NOT Doing

- No integramos con servicio de email real (Resend, SendGrid, etc.) - eso viene después
- No guardamos datos en base de datos
- No implementamos CAPTCHA/reCAPTCHA (puede agregarse después)
- No agregamos verificación de email
- No creamos dashboard para ver mensajes

## Implementation Approach

Usaremos React Hook Form con Zod para validación type-safe, shadcn/ui Form components para UI consistente, y simularemos el envío por ahora. El código estará preparado para reemplazar fácilmente el submit simulado con una llamada a API real.

---

## Step 1: Instalar Form Component de shadcn/ui

### Comando:

```bash
npx shadcn@latest add form
```

Esto instala el component wrapper que integra React Hook Form con shadcn/ui.

### Success Criteria:

#### Automated Verification:
- [x] Component `form` existe en `src/components/ui/`

---

## Step 2: Crear Schema de Validación

### Archivo: `src/lib/schemas/contact-schema.ts`

```typescript
import * as z from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),

  email: z
    .string()
    .min(1, { message: 'El email es requerido' })
    .email({ message: 'Por favor ingresa un email válido' }),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true // Optional field
        // Validar formato argentino: +54 9 11 1234-5678 o variaciones
        const phoneRegex = /^(\+54|0)?[\s-]?9?[\s-]?(\d{2,4})[\s-]?(\d{6,8})$/
        return phoneRegex.test(val)
      },
      { message: 'Por favor ingresa un número de teléfono válido' }
    ),

  message: z
    .string()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
    .max(1000, { message: 'El mensaje no puede exceder 1000 caracteres' }),

  productId: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
```

### Success Criteria:

#### Automated Verification:
- [x] Schema compila sin errores
- [x] Type `ContactFormValues` se puede usar

---

## Step 3: Crear Componente de Formulario de Contacto

### Archivo: `src/components/forms/contact-form.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { contactFormSchema, ContactFormValues } from '@/lib/schemas/contact-schema'
import { getAllProducts } from '@/lib/data/products'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const products = getAllProducts()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      productId: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // TODO: Reemplazar con llamada real a API
      // Ejemplo: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })

      console.log('Form data:', data)

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular éxito
      setSubmitSuccess(true)
      form.reset()

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Mostrar error al usuario
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {submitSuccess && (
        <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4 flex items-center gap-3 border border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-200">
            ¡Mensaje enviado exitosamente! Te contactaremos pronto.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="juan@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Incluye código de área para que podamos contactarte
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Selection */}
          {products.length > 0 && (
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio de interés (opcional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/1000 caracteres
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar mensaje
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Componente compila sin errores TypeScript

#### Manual Verification:
- [x] Form fields se renderizan correctamente
- [x] Validación muestra errores en español

---

## Step 4: Crear Página de Contacto

### Archivo: `src/app/contacto/page.tsx`

```typescript
import { Metadata } from 'next'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { CONTACT_INFO } from '@/lib/constants/navigation'

export const metadata: Metadata = {
  title: 'Contacto - SolutiveMind',
  description: 'Contáctanos para más información sobre nuestros servicios de automatización',
}

export default function ContactoPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Contáctanos</h1>
          <p className="text-lg text-muted-foreground">
            ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te
            responderemos lo antes posible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Email */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Email</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Teléfono</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">WhatsApp</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Enviar mensaje
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Ubicación</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {CONTACT_INFO.address}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Success Criteria:

#### Automated Verification:
- [x] Página compila sin errores
- [x] `npm run build` exitoso

#### Manual Verification:
- [x] Navegar a `/contacto` muestra la página
- [x] Layout 2/3 formulario + 1/3 info en desktop
- [x] Responsive: columnas se apilan en mobile

---

## Step 5: Crear API Route Placeholder (Para Futura Integración)

### Archivo: `src/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/schemas/contact-schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body)

    // TODO: Implement actual email sending logic
    // Example integrations:
    // - Resend: https://resend.com/docs/send-with-nextjs
    // - SendGrid: https://www.npmjs.com/package/@sendgrid/mail
    // - Nodemailer: https://nodemailer.com/

    console.log('Contact form submission:', validatedData)

    // TODO: Save to database if needed

    // Return success
    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al procesar el formulario', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

### Actualizar ContactForm para usar el API endpoint:

Cambiar la función `onSubmit` en `src/components/forms/contact-form.tsx`:

```typescript
const onSubmit = async (data: ContactFormValues) => {
  setIsSubmitting(true)
  setSubmitSuccess(false)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Error al enviar el formulario')
    }

    setSubmitSuccess(true)
    form.reset()

    setTimeout(() => {
      setSubmitSuccess(false)
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    // TODO: Mostrar error al usuario con toast o alert
  } finally {
    setIsSubmitting(false)
  }
}
```

### Success Criteria:

#### Automated Verification:
- [x] API route compila sin errores
- [x] POST request retorna 200 OK

#### Manual Verification:
- [x] Form submission llama al API endpoint
- [x] Datos se validan correctamente en el servidor

---

## Step 6: Agregar Toast Notifications (Opcional pero Recomendado)

Para mejor UX al mostrar errores/éxitos:

### Instalar Sonner (toast library):

```bash
npm install sonner
```

### Crear Toast Provider:

**Archivo**: `src/components/providers/toast-provider.tsx`

```typescript
'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return <Toaster position="top-right" richColors />
}
```

### Actualizar Root Layout:

**Archivo**: `src/app/layout.tsx` (añadir ToastProvider)

```typescript
import { ToastProvider } from '@/components/providers/toast-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider {...}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Actualizar ContactForm para usar toasts:

```typescript
import { toast } from 'sonner'

const onSubmit = async (data: ContactFormValues) => {
  setIsSubmitting(true)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Error al enviar')

    toast.success('¡Mensaje enviado exitosamente!', {
      description: 'Te contactaremos pronto.',
    })

    form.reset()
  } catch (error) {
    toast.error('Error al enviar el mensaje', {
      description: 'Por favor intenta nuevamente más tarde.',
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

### Success Criteria:

#### Manual Verification:
- [x] Toast de éxito aparece al enviar formulario
- [x] Toast de error aparece si falla el envío

---

## Testing Strategy

### Manual Testing Checklist:

#### Validación:
- [x] Campo nombre vacío muestra error
- [x] Campo nombre <2 chars muestra error
- [x] Email inválido muestra error
- [x] Email vacío muestra error
- [x] Teléfono en formato incorrecto muestra error
- [x] Teléfono opcional funciona (puede dejarse vacío)
- [x] Mensaje <10 chars muestra error
- [x] Mensaje >1000 chars muestra error
- [x] Todos los mensajes de error están en español

#### Funcionalidad:
- [x] Submit deshabilitado mientras carga
- [x] Loading state muestra spinner
- [x] Success message aparece después de envío
- [x] Form se resetea después de envío exitoso
- [x] Product selector muestra todos los productos
- [x] Character counter funciona en mensaje

#### UI/UX:
- [x] Labels claros y descriptivos
- [x] Placeholders útiles
- [x] Focus states visibles
- [x] Error messages visibles y claros
- [x] Responsive en mobile

#### Accessibility:
- [x] Todos los campos tienen labels
- [x] Errores asociados a campos (aria-describedby)
- [x] Form navegable con teclado
- [x] Screen readers funcionan correctamente

### Automated Testing:
```bash
npm run build    # Verificar compilación
npm run lint     # Code quality
```

---

## Performance Considerations

- React Hook Form minimiza re-renders
- Zod validation es rápido
- Form submission asíncrono no bloquea UI
- Toast notifications son lightweight

---

## Accessibility Considerations

- Todos los campos tienen labels asociados
- Error messages vinculados con aria-describedby
- Form es completamente keyboard-navigable
- Color contrast adecuado
- Focus indicators visibles

---

## Future Enhancements

Cuando se integre backend:
- Envío de email con Resend/SendGrid
- Auto-respuesta al usuario
- Guardado en base de datos
- Panel admin para ver mensajes
- CAPTCHA para prevenir spam
- Verificación de email
- Rate limiting

---

## Integration Guide (Para Backend Futuro)

### Opción 1: Resend (Recomendado)

```bash
npm install resend
```

```typescript
// src/app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const data = contactFormSchema.parse(await request.json())

  await resend.emails.send({
    from: 'contacto@solutivemind.com',
    to: 'admin@solutivemind.com',
    subject: `Nuevo mensaje de ${data.name}`,
    html: `<p><strong>Nombre:</strong> ${data.name}</p>...`,
  })

  return NextResponse.json({ success: true })
}
```

### Opción 2: SendGrid

```bash
npm install @sendgrid/mail
```

### Opción 3: Nodemailer (Self-hosted SMTP)

```bash
npm install nodemailer
```

---

## References

- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- shadcn/ui Form: https://ui.shadcn.com/docs/components/form
- Sonner (Toasts): https://sonner.emilkowal.ski/
- Resend: https://resend.com/docs/send-with-nextjs

---

## Next Steps

Una vez completada esta fase, proceder a:
→ **Fase 6: Páginas Adicionales** (`phase-6-paginas-adicionales.md`)
