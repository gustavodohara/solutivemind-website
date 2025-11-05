'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
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

      toast.success('¡Mensaje enviado exitosamente!', {
        description: 'Te contactaremos pronto.',
      })

      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Error al enviar el mensaje', {
        description: 'Por favor intenta nuevamente más tarde.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
  )
}
