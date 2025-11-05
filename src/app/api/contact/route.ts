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
    return NextResponse.json({ message: 'Mensaje enviado exitosamente' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al procesar el formulario', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
