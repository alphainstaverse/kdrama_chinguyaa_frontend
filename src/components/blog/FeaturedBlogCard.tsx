// src/components/blog/FeaturedBlogCard.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/constants'
import { BlogData } from '@/dataTypes/BlogData'

interface FeaturedBlogCardProps {
  post: BlogData
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      // --- ADDED hover:scale-105 HERE ---
      className="block bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 w-full group transform transition-transform duration-100 ease-in-out hover:scale-105 active:scale-[.98]"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        {post.coverImage && (
          <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-3 sm:mb-4">
            <Image
              src={`${BACKEND_URL}/assets/${post.coverImage}`}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 mb-1 sm:mb-2 tracking-tight">
          {post.title}
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
          {post.shortDescription}
        </p>

        <div
          className="self-start px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold shadow group-hover:scale-105 transition-transform"
        >
          Read more
        </div>
      </div>
    </Link>
  )
}

export default FeaturedBlogCard