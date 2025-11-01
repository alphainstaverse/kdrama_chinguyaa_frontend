import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { formatDate } from '../../utils/date'
import { BlogPost } from '@/models/BlogPost'
import { BACKEND_URL } from '@/utils/constants' // 1. Import BACKEND_URL

interface BlogCardProps {
  post: BlogPost
}

const HorizontalBlogCard: FC<BlogCardProps> = ({ post }) => {
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
      className="flex flex-col gap-3 rounded-lg border p-3 lg:flex-row group transition-transform active:scale-[.98]"
    >
      {coverImage && (
        // FIX 1: Updated sizes for mobile (h-48) and large screens (lg:h-40 lg:w-64)
        <figure className="relative mt-1 w-full h-48 lg:h-40 lg:w-64 lg:min-w-64 overflow-hidden bg-gray-200">
          <Image
            // FIX 2: Added object-top to fix the cropping
            className="rounded-md object-cover object-top transition-transform duration-300 group-hover:scale-125"
            src={`${BACKEND_URL}/assets/${coverImage}`}
            alt={title}
            fill={true}
            sizes="100%"
          />
        </figure>
      )}

      <div>
        <h3 className="mb-2 text-xl font-bold text-primary transition-colors duration-200 group-hover:text-theme">
          {title}
        </h3>
        <p className="text-gray-700">{shortDescription}</p>
        <p className="mt-4 text-sm font-semibold text-gray-500">
          {formatDate(publishedDate)} | {estimatedTimeToRead}
        </p>
      </div>
    </Link>
  )
}

export default HorizontalBlogCard