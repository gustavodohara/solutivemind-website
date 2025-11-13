import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solutivemind.com'),
  title: {
    default: 'SolutiveMind - Servicios de Automatización Empresarial',
    template: '%s | SolutiveMind',
  },
  description:
    'Transformamos tu negocio con soluciones de automatización inteligente. Optimiza procesos, reduce costos y aumenta la productividad.',
  keywords: [
    'automatización empresarial',
    'transformación digital',
    'optimización de procesos',
    'servicios automatizados',
    'consultoría tecnológica',
  ],
  authors: [{ name: 'SolutiveMind' }],
  creator: 'SolutiveMind',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://solutivemind.com',
    siteName: 'SolutiveMind',
    title: 'SolutiveMind - Servicios de Automatización Empresarial',
    description: 'Transformamos tu negocio con soluciones de automatización inteligente.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolutiveMind - Servicios de Automatización Empresarial',
    description: 'Transformamos tu negocio con soluciones de automatización inteligente.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
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
