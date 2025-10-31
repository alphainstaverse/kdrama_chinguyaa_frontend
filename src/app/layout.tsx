import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/BlogNavbar'
import Footer from '@/components/footer/Footer'
import NextTopLoader from 'nextjs-toploader';

// 1. Import the Google Analytics component
import { GoogleAnalytics } from '@next/third-parties/google'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

// --- Configuration ---

// Your website's brand name. This is perfect.
const title = 'KDrama Chinguyaa';

// A compelling, keyword-rich description for SEO and sharing.
const description = 'Get the latest trending news, casting updates, reviews, and hot topics from the world of Korean dramas. Your daily K-Drama companion.';

// This logic correctly sets the base URL for local dev and Vercel deployment
const baseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL'
  ? 'http://localhost:3000'
  : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const url = baseUrl;

// --- Metadata (for SEO and Sharing) ---

export const metadata: Metadata = {
  // The name of your web app (for PWA, etc.)
  applicationName: title,

  // The default title for browser tabs and search results
  title: {
    default: title,
    template: `%s | ${title}`, // Creates titles like "Article Name | KDrama Chinguyaa"
  },
  description,

  // The primary category of your website
  category: 'entertainment',

  // Keywords for search engines
  // ADDED: Relevant keywords for your content
  keywords: ['K-Drama', 'Korean Drama', 'K-Drama News', 'Trending', 'Reviews', 'Casting'],

  // Helps search engines find the 'official' version of this page
  alternates: {
    canonical: url,
  },

  // Sets the base for all relative URLs in the metadata
  metadataBase: new URL(baseUrl),

  // Open Graph (OG) metadata for social media (Facebook, Discord, etc.)
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: 'website',
    // RECOMMENDED: Add a default sharing image (e.g., 1200x630px)
    // Place this image in your /public folder
    // images: [`${baseUrl}/og-image.png`],
  },

  // ADDED: Twitter-specific card (good practice)
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    // RECOMMENDED: Add a Twitter-specific image (e.g., 1200x630px)
    // images: [`${baseUrl}/twitter-image.png`],
  },
};

// --- Viewport (for Mobile Responsiveness) ---

// Your existing viewport settings are perfect for a modern, responsive site.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Optional: You can add a brand color for the browser UI (e.g., on mobile)
  // themeColor: '#FFFFFF',
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