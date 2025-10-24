import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/constants'

import { BlogData } from '@/dataTypes/BlogData'
import { formatDate } from '../../utils' // Assuming you have this util

interface TrendingBlogListProps {
  posts: BlogData[]
}

const TrendingBlogList: React.FC<TrendingBlogListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        
        // REVERTED: List item spacing tight for mobile, larger for desktop
        <div key={post.slug} className="mb-2 pb-2 md:mb-4 md:pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0 flex items-center gap-4">
          
          {post.coverImage && (
            // REVERTED: Image size is W-24 (large) on mobile, W-20 (small) on desktop
            <div className="relative w-24 h-24 md:w-20 md:h-20 flex-shrink-0">
              <Image
                src={`${BACKEND_URL}/assets/${post.coverImage}`}
                alt={post.title}
                fill 
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* REVERTED: Removed w-2/3 to let text flow naturally */}
          <div>
            <Link href={`/blogs/${post.slug}`}>
              <h4 className="text-base font-bold hover:text-primary leading-tight mb-1">
                {post.title}
              </h4>
            </Link>
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrendingBlogList