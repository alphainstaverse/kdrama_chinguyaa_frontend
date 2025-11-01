import { FC } from 'react'
import VerticalBlogCard from './VerticalBlogCard'
import HorizontalBlogCard from './HorizontalBlogCard'
import { BlogPost } from '@/models/BlogPost'

interface BlogListProps {
  posts: BlogPost[]
  type?: 'vertical' | 'horizontal' | 'full'
}

const BlogList: FC<BlogListProps> = ({ posts, type = 'vertical' }) => {
  if (type === 'full') {
    return (
      <div className="grid gap-6 grid-cols-1">
        {posts.map((post) => (
          <HorizontalBlogCard key={post.slug} post={post} />
        ))}
      </div>
    )
  }

  const isVertical = type === 'vertical'

  if (isVertical) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <VerticalBlogCard key={post.slug} post={post} />
        ))}
      </div>
    )
  } else {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <HorizontalBlogCard key={post.slug} post={post} />
        ))}
      </div>
    )
  }
}

export default BlogList
