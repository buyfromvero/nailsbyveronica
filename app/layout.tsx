import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nails by Veronica | Premium Nail Art Services in Mumbai',
  description: 'Transform your nails into works of art with Nails by Veronica. Expert nail care, stunning nail art, gel polish, extensions, and more. Serving ladies across Mumbai, Maharashtra.',
  keywords: ['nail art', 'nail salon', 'Mumbai', 'gel polish', 'nail extensions', 'manicure', 'pedicure', 'Veronica Mendonca'],
  authors: [{ name: 'Veronica Mendonca' }],
  openGraph: {
    title: 'Nails by Veronica | Premium Nail Art Services in Mumbai',
    description: 'Transform your nails into works of art with expert nail care and stunning designs.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#c9a08a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
