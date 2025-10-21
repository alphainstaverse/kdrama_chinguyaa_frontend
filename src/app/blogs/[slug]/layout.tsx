import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/BlogNavbar'
import Newsletter from '@/components/newsletter/Newsletter'
import { getBlog } from '@/services/blogs'
import { Metadata } from 'next'
import { BACKEND_URL } from '@/constants'
import { BlogData } from '@/dataTypes/BlogData'

interface PageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: PageParams): Promise<Metadata | null> {
  const params = await props.params;
  const post: BlogData | undefined = await getBlog(params.slug)

  if (!post) return null

  const { title, shortDescription: description, coverImage, slug } = post

  const appBaseUrl = process.env.DEPLOYMENT_ENVIRONMENT === 'LOCAL' ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  const url = `${appBaseUrl}/blogs/${slug}`

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(appBaseUrl),
    openGraph: {
      title,
      description,
      url,
      images: coverImage
        ? [
            {
              url: `${BACKEND_URL}/assets/${coverImage}`,
              width: 800,
              height: 600,
            },
          ]
        : undefined,
      siteName: 'Taleemify',
      type: 'website',
    },
    // Removed twitter metadata
  }

  return metadata
}

const MdxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MdxLayout
