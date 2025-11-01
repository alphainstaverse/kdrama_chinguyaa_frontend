'use client'

import { useEffect, useState, useCallback } from 'react'
import { getBlogs } from '@/services/blogs'
import { BlogPost } from '@/models/BlogPost'
import BlogList from '@/components/blog/BlogList'

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)

    try {
      const newPosts: BlogPost[] = await getBlogs(page, 6)

      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prev: BlogPost[]) => {
          const unique: BlogPost[] = newPosts.filter(
            (np: BlogPost) => !prev.some((pp: BlogPost) => pp.slug === np.slug)
          )
          return [...prev, ...unique]
        })
        setPage((prev) => prev + 1)
      }
    } catch (err: any) {
      console.error('Failed to fetch blogs:', err)
      setError('Failed to load blogs. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  // Load initial posts
  useEffect(() => {
    loadMorePosts()
  }, [loadMorePosts])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, loadMorePosts])

  return (
    <div className="mx-auto max-w-[90vw] px-4 pt-[80px]">
      <section className="mb-10 bg-white/80 rounded-xl shadow p-6">
        <div className="my-7">
          <h2 className="text-2xl font-bold text-primary">
            All <span className="text-theme"> Blogs </span>
          </h2>
          <p className="text-secondary">Explore more articles</p>
        </div>
        {error && <p className="text-center text-red-500 my-4">{error}</p>}
        {posts.length === 0 && loading && (
          <p className="text-center text-gray-500 my-4">Loading blogs...</p>
        )}

        <BlogList posts={posts} type="full" />

        {loading && posts.length > 0 && (
          <p className="text-center text-gray-400 mt-6">Loading more...</p>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-gray-400 mt-6">
            You’ve reached the end.
          </p>
        )}
      </section>
    </div>
  )
}
