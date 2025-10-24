import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { formatDate } from '../../utils'
import { BlogData } from '@/dataTypes/BlogData'
import { BACKEND_URL } from '@/constants' // 1. Import BACKEND_URL

interface BlogCardProps {
  post: BlogData
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
        <figure className="relative h-40 w-full overflow-hidden bg-gray-200">
          <Image
            className="rounded-md object-cover"
            // 2. Use BACKEND_URL here
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