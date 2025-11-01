import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NextTopLoader from 'nextjs-toploader';

// 1. Import the Google Analytics component
import { GoogleAnalytics } from '@next/third-parties/google'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = 'Kdrama Chinguyaa';
const description = 'Get the latest trending news, casting updates, reviews, and hot topics from the world of Korean dramas. Your daily K-Drama companion.';
const baseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL'
  ? 'http://localhost:3000'
  : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const url = baseUrl;

export const metadata: Metadata = {
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  category: 'entertainment',
  keywords: ['K-Drama', 'Korean Drama', 'K-Drama News', 'Trending', 'Reviews', 'Casting'],
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// 2. Get your Measurement ID from the environment variable
const gaId = "G-RKD223GDZS"

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={`${quicksand.className} flex flex-col min-h-screen`}>

    <NextTopLoader
      color="#1e90ff"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />

    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />

    {/* 3. Add the GoogleAnalytics component here */}
    {/* This component handles everything, including page-by-page tracking */}
    <GoogleAnalytics gaId={gaId} />
    </body>
    </html>
  )
}