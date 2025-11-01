import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { formatDate } from '../../utils/date'
import { BlogPost } from '@/models/BlogPost'
import { BACKEND_URL } from '@/utils/constants'

interface BlogCardProps {
  post: BlogPost
}

const VerticalBlogCard: FC<BlogCardProps> = ({ post }) => {
  const {
    title,
    shortDescription,
    coverImage,
    slug,
    publishedDate,
    estimatedTimeToRead = '3 min',
  } = post

  return (
    <Link
      href={`/blogs/${slug}`}
      key={slug}
      className="flex transform flex-col gap-3 rounded-lg border bg-light p-3 transition-transform hover:scale-105 group active:scale-[.98]">

      {coverImage && (
        // FIX 1: Increased height from h-40 to h-56 (you can adjust this value)
        <figure className="relative h-64 w-full overflow-hidden bg-gray-200">
          <Image
            // FIX 2: Added 'object-top' to ensure cropping happens from the bottom
            className="rounded-md object-cover object-top"
            src={`${BACKEND_URL}/assets/${coverImage}`}
            alt={title}
            fill={true}
            sizes="100%"
          />
        </figure>
      )}

      <h3 className="mb-2 text-xl font-bold text-primary transition-colors duration-200 group-hover:text-theme">
        {title}
      </h3>
      <p className="text-gray-700">{shortDescription}</p>
      <p className="mt-4 text-sm font-semibold text-primary">
        {formatDate(publishedDate)} | {estimatedTimeToRead}
      </p>
    </Link>
  )
}

export default VerticalBlogCard