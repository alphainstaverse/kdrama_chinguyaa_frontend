// src/components/blog/TrendingBlogList.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/utils/constants'

import { BlogPost } from '@/models/BlogPost'
import { formatDate } from '../../utils/date'
import { getTagClasses } from '@/utils/styles'

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
              // FIX 1: Increased size (and fixed typo md-h-20)
              // You can adjust w-28/h-28 and md:w-24/md:h-24 as needed
              <div className="relative w-28 h-28 md:w-24 md:h-24 flex-shrink-0">
                <Image
                  src={`${BACKEND_URL}/assets/${post.coverImage}`}
                  alt={post.title}
                  fill
                  // FIX 2: Added 'object-top'
                  className="object-cover object-top rounded-lg"
                />
              </div>
            )}

            <div className="flex-1">
              <h4 className="text-base font-bold group-hover:text-primary leading-tight mb-1">
                {post.title}
              </h4>
              <div className="text-right">

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