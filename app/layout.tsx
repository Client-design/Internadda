import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap', // Optimization: Ensures text remains visible during font load
});

export const metadata: Metadata = {
  title: 'InternAdda - India\'s Premier Internship Ecosystem | Learn • Intern • Earn',
  description: 'InternAdda is India\'s largest MSME-certified internship platform. Over 7,200 students placed in verified roles across Web Development, Data Science, and Python. Direct HR interviews with ₹2K-₹8K monthly stipends.',
  keywords: [
    'internship', 'internships in India', 'paid internships', 'web development internship',
    'data science internship', 'python internship', 'UI UX internship', 'remote internship',
    'work from home internship', 'MSME certified internship', 'student placement',
  ],
  authors: [{ name: 'InternAdda', url: 'https://internadda.com' }],
  creator: 'InternAdda',
  publisher: 'InternAdda',
  metadataBase: new URL('https://internadda.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-in',
    },
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://internadda.com',
    siteName: 'InternAdda',
    title: 'InternAdda - India\'s Adda for Internships',
    description: 'Access verified internships, learn from industry experts, and earn while gaining real-world experience.',
    images: [
      {
        url: '/og-image.jpg', // Ensure this exists in your public folder
        width: 1200,
        height: 630,
        alt: 'InternAdda - Learn Intern Earn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternAdda - Learn • Intern • Earn',
    description: 'India\'s leading internship platform. Connect with verified industry opportunities.',
    images: ['/twitter-image.jpg'],
    creator: '@internadda',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    // REPLACE WITH YOUR ACTUAL GOOGLE SEARCH CONSOLE CODE
    google: 'google-site-verification-code-here',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A2647' },
  ],
}

// SEO: Global Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "InternAdda",
  "url": "https://internadda.com",
  "logo": "https://internadda.com/logo.jpg",
  "sameAs": [
    "https://instagram.com/sumit_pandey05", // Updated based on your profile
    "https://linkedin.com/company/internadda"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "student support",
    "areaServed": "IN",
    "availableLanguage": "en"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Performance: DNS Prefetch for critical external connections */}
        <link rel="dns-prefetch" href="https://hghpivmqvunfzhqomlud.supabase.co" />
        {/* SEO: Inject Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${poppins.className} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
