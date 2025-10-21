import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/constants'

import { BlogData } from '@/dataTypes/BlogData'
import { formatDate } from '../../utils'

interface TrendingBlogListProps {
  posts: BlogData[]
}

const TrendingBlogList: React.FC<TrendingBlogListProps> = ({ posts }) => {
  return (
    <div className="p-4">
      {posts.map((post) => (
        <div key={post.slug} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0 flex items-center">
          {post.coverImage && (
            <Image
              src={`${BACKEND_URL}/assets/${post.coverImage}`}
              alt={post.title}
              width={80}
              height={80}
              className="object-cover rounded-lg mr-4"
            />
          )}
          <div>
            <span className="text-xs text-gray-500 uppercase">{post.category}</span>
            <Link href={`/blogs/${post.slug}`}>
              <h4 className="text-md font-semibold hover:text-primary">{post.title}</h4>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrendingBlogList
