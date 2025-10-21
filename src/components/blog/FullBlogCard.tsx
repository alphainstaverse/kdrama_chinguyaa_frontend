import { Post } from '@/components/markdown/post'
import { BlogData } from '@/dataTypes/BlogData'
import { formatDate } from '@/utils'
import Image from 'next/image'
import { BACKEND_URL } from '@/constants'

interface FullBlogCardProps {
  post: BlogData
}

export default function FullBlogCard({ post }: FullBlogCardProps) {
  return (
    <article className="mx-auto mb-10 max-w-4xl px-4" key={post.slug + Math.random()}>
      <header className="pt-10">
        <h1 className="text-4xl font-extrabold leading-[1.2] text-slate-900 md:text-5xl md:leading-[1.2]">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Published on: {formatDate(post.publishedDate)}
        </p>
      </header>

      {post.coverImage && (
        <section className="my-5">
          <figure className="relative h-[250px] w-full md:h-[320px] lg:h-[400px] xl:h-[450px]">
            <Image
              src={`${BACKEND_URL}/assets/${post.coverImage}`}
              alt={post.title}
              fill={true}
              sizes="100%"
              className="rounded-md"
            />
          </figure>
        </section>
      )}

      <section className="prose lg:prose-xl">
        <Post>{post.bodyContent as string}</Post>
      </section>
    </article>
  )
}
