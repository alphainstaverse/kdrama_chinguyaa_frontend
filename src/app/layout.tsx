import { Metadata, Viewport } from 'next';

const title = 'KDrama Chinguyaa';
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

  // --- ADD YOUR ICONS HERE ---
  // Next.js will automatically look for these files
  // in your /app directory (e.g., /app/icon.png)
  icons: {
    icon: '/icon.png', // Main favicon
    shortcut: '/favicon.ico', // Fallback .ico
    apple: '/apple-icon.png', // For Apple devices
  },
  // --- END OF ICON CONFIG ---

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