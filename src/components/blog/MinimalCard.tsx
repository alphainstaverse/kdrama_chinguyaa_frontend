import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '@/utils/constants'
import { FC } from 'react'
import { formatDate } from '../../utils'
import { BlogPost } from '@/models/BlogPost'

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const { title, slug, coverImage, publishedDate, category } = post

  return (
    <Link href={`/blogs/${slug}`} className="no-underline">
      <div className="flex transform flex-col gap-3 transition-transform hover:scale-105">
        {coverImage && (
          <figure className="relative h-48 w-full overflow-hidden">
            <Image
              src={`${BACKEND_URL}/assets/${coverImage}`}
              alt={title}
              fill={true}
              sizes="100%"
              className="rounded-xl object-cover"
              // Optional: Replace with a suitable placeholder
              // placeholder="blur"
              // blurDataURL="/placeholder.png"
            />
          </figure>
        )}

        <div className="mt-1 flex items-center gap-2">
          <span className="w-fit rounded-xl bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
            {category}
          </span>
          <p className="text-sm font-semibold text-gray-500">{formatDate(publishedDate)}</p>
        </div>

        <h3 className="mb-2 text-xl font-bold transition-colors duration-200 hover:text-theme">
          {title}
        </h3>
      </div>
    </Link>
  )
}

export default BlogCard
