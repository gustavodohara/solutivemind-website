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
