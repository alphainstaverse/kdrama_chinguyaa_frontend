import type { Metadata, Viewport } from 'next' // 1. Import Viewport
import { Quicksand } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/BlogNavbar'
import Footer from '@/components/footer/Footer'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = ''

const description =
  ''

const baseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL' ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const url = baseUrl; // Use the defined baseUrl

export const metadata: Metadata = {
  applicationName: 'Learn Now',
  title,
  description,
  category: 'education',
  
  // --- 2. The viewport line is REMOVED from here ---

  alternates: {
    canonical: url,
  },
  metadataBase: new URL(baseUrl), // Use baseUrl here
  openGraph: {
    title,
    description,
    url,
    siteName: 'Learn Now',
    type: 'website',
  },
  // Removed twitter metadata
}

// --- 3. ADD this new export for the viewport settings ---
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}
// ----------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}