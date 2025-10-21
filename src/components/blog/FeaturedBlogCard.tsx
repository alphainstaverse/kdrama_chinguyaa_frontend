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
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-96 relative rounded-xl overflow-hidden mb-4">
          <Image src={`${BACKEND_URL}/assets/${post.coverImage}`} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">{post.title}</h2>
      <p className="text-gray-700 mb-2 text-base leading-relaxed">{post.shortDescription}</p>
      <a href={`/blogs/${post.slug}`} className="self-start px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform">Read more</a>
    </div>
  )
}

export default FeaturedBlogCard
