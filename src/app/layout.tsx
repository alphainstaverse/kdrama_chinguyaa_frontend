import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/BlogNavbar'
import Footer from '@/components/footer/Footer'

// 1. Import NextTopLoader
import NextTopLoader from 'nextjs-toploader';

// NEW: Import your new component
import VisitorLogger from '@/components/analytics/VisitorLogger';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = ''
const description = ''
const baseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL' ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const url = baseUrl;

export const metadata: Metadata = {
  applicationName: 'Learn Now',
  title,
  description,
  category: 'education',
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description,
    url,
    siteName: 'Learn Now',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={`${quicksand.className} flex flex-col min-h-screen`}>

    {/* 2. Add the component here */}
    <NextTopLoader
      color="#1e90ff" // You can change this to any color
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false} // Hides the little spinner
      easing="ease"
      speed={200}
    />

    {/* NEW: Add your invisible logger component */}
    <VisitorLogger />

    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    </body>
    </html>
  )
}