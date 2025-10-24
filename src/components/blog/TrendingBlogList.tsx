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
        
        // --- MODIFICATION START ---
        // Removed border-b classes and mb/pb.
        // Added a new wrapper div with card styling (bg-white, shadow, rounded, padding, and margin-bottom).
        <div key={post.slug} className="bg-white rounded-lg shadow p-2 mb-3 last:mb-0">
          <div className="flex items-center gap-4">
          
            {post.coverImage && (
              <div className="relative w-24 h-24 md:w-20 md:h-20 flex-shrink-0">
                <Image
                  src={`${BACKEND_URL}/assets/${post.coverImage}`}
                  alt={post.title}
                  fill 
                  className="object-cover rounded-lg"
                />
              </div>
            )}

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
        </div>
        // --- MODIFICATION END ---

      ))}
    </div>
  )
}

export default TrendingBlogList