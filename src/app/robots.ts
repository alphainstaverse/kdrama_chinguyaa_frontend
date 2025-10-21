import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const appBaseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL' ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    host: appBaseUrl,

    sitemap: appBaseUrl + '/sitemap.xml',
  }
}
