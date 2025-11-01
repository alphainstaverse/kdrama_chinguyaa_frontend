import { getBlogs } from '@/services/blogs' // Revert to using getBlogs
import { MetadataRoute } from 'next'
import { BlogPost } from '@/models/BlogPost' // Import BlogData

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appBaseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL' ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  const blogsPageUrl = `${appBaseUrl}/blogs`

  const blogs = await getBlogs() // Revert to using getBlogs

  return [
    // home page
    {
      url: appBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    },
    // main blog page url
    {
      url: blogsPageUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    },
    // blog page
    ...(blogs.map((blog: BlogPost) => ({ // Explicitly type blog as BlogData
      url: `${appBaseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    })) as MetadataRoute.Sitemap),
  ]
}
