import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'HealthWise - AI-Powered Health Platform',
  description: 'Revolutionary healthcare platform combining AI diagnostics, telemedicine, mental health support, and community wellness. Get instant health insights, connect with medical experts, and take control of your wellness journey.',
  keywords: 'AI health assistant, telemedicine, symptom checker, mental health, medical consultation, health platform, wellness, healthcare technology',
  authors: [{ name: 'HealthWise Team' }],
  creator: 'HealthWise',
  publisher: 'HealthWise',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://healthwise.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HealthWise - AI-Powered Health Platform',
    description: 'Revolutionary healthcare platform combining AI diagnostics, telemedicine, and wellness solutions.',
    url: 'https://healthwise.com',
    siteName: 'HealthWise',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthWise - AI-Powered Health Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthWise - AI-Powered Health Platform',
    description: 'Revolutionary healthcare platform combining AI diagnostics, telemedicine, and wellness solutions.',
    images: ['/twitter-image.jpg'],
    creator: '@healthwise',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}