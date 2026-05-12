import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { LocalBusinessSchema } from '@/components/structured-data'
import { WhatsAppButton } from '@/components/whatsapp-button'
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
  title: {
    default: 'Nails by Veronica | Premium Nail Art Services in Mumbai',
    template: '%s | Nails by Veronica',
  },
  description: 'Transform your nails into works of art with Nails by Veronica. Expert nail care, stunning nail art, gel polish, extensions, and more. Serving ladies across Mumbai, Maharashtra.',
  keywords: ['nail art', 'nail salon', 'Mumbai', 'gel polish', 'nail extensions', 'manicure', 'pedicure', 'Veronica Mendonca', 'nail art Mumbai', 'best nail salon Mumbai', 'acrylic nails', 'gel nails'],
  authors: [{ name: 'Veronica Mendonca' }],
  creator: 'Veronica Mendonca',
  publisher: 'Nails by Veronica',
  metadataBase: new URL('https://nailsbyveronica.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nails by Veronica | Premium Nail Art Services in Mumbai',
    description: 'Transform your nails into works of art with expert nail care and stunning designs.',
    url: 'https://nailsbyveronica.com',
    siteName: 'Nails by Veronica',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nails by Veronica - Premium Nail Art Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nails by Veronica | Premium Nail Art Services',
    description: 'Transform your nails into works of art with expert nail care and stunning designs.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nails by Veronica" />
      </head>
      <body className="font-sans antialiased">
        <LocalBusinessSchema />
        {children}
        <WhatsAppButton />
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
