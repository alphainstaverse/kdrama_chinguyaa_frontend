import type { Metadata } from 'next'
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
