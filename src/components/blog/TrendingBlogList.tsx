// src/components/blog/TrendingBlogList.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/utils/constants'

import { BlogPost } from '@/models/BlogPost'
import { formatDate } from '../../utils'
import { getTagClasses } from '@/utils/styleHelpers' // <-- 1. IMPORT THE HELPER

interface TrendingBlogListProps {
  posts: BlogPost[]
}

const TrendingBlogList: React.FC<TrendingBlogListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (

        <Link
          key={post.slug}
          href={`/blogs/${post.slug}`}
          className="block bg-white rounded-lg shadow p-2 mb-3 last:mb-0 group transform transition-transform duration-100 ease-in-out hover:scale-105 active:scale-[.98]"
        >
          <div className="flex items-center gap-4">

            {post.coverImage && (
              <div className="relative w-24 h-24 md:w-20 md-h-20 flex-shrink-0">
                <Image
                  src={`${BACKEND_URL}/assets/${post.coverImage}`}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex-1">
              <h4 className="text-base font-bold group-hover:text-primary leading-tight mb-1">
                {post.title}
              </h4>
              <div className="text-right">

                {/* --- 2. USE THE FUNCTION HERE --- */}
                <span className={getTagClasses(post.category)}>
                  {post.category}
                </span>

              </div>
            </div>
          </div>
        </Link>

      ))}
    </div>
  )
}

export default TrendingBlogList