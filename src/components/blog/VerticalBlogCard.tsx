import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/constants'
import { FC } from 'react'
import { formatDate } from '../../utils'
import { BlogData } from '@/dataTypes/BlogData'

interface BlogCardProps {
  post: BlogData
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const {
    title,
    shortDescription,
    coverImage,
    slug,
    publishedDate,
    estimatedTimeToRead = '3 min',
  } = post

  return (
    <div
      key={slug}
      className="flex transform flex-col gap-3 rounded-lg border bg-light p-3 transition-transform hover:scale-105">
      {coverImage && (
        <figure className="relative h-40 w-full overflow-hidden bg-gray-200">
          <Image
            className="rounded-md object-cover"
            src={`${BACKEND_URL}/assets/${coverImage}`}
            alt={title}
            fill={true}
            sizes="100%"
            // Optional: Replace with a suitable placeholder
            // placeholder="blur"
            // blurDataURL="/placeholder.png"
          />
        </figure>
      )}

      <Link href={`/blogs/${slug}`}>
        <h3 className="mb-2 text-xl font-bold text-primary transition-colors duration-200 hover:text-theme">
          {title}
        </h3>
        <p className="text-gray-700">{shortDescription}</p>
        <p className="mt-4 text-sm font-semibold text-primary">
          {formatDate(publishedDate)} | {estimatedTimeToRead}
        </p>
      </Link>
    </div>
  )
}

export default BlogCard
