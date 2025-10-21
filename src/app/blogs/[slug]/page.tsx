import Image from "next/image";
import { notFound } from "next/navigation";
import DirectusContentRenderer from "@/components/directus-content-renderer/DirectusContentRenderer";
import { getBlog } from "@/services/blogs";
import { BACKEND_URL } from '@/constants';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const post = await getBlog(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="pt-24">
      <article className="mx-auto mb-10 max-w-4xl px-4">
        {/* Header */}
        <header className="pt-10">
          <h1 className="text-4xl font-extrabold leading-[1.2] text-slate-900 md:text-5xl md:leading-[1.2]">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <b>Published on: {post.publishedDate}</b>
          </p>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <section className="my-5">
            <figure className="relative h-[250px] w-full md:h-[320px] lg:h-[400px] xl:h-[450px]">
              <Image
                src={`${BACKEND_URL}/assets/${post.coverImage}`}
                alt={post.title}
                fill
                sizes="100%"
                className="rounded-md"
              />
            </figure>
          </section>
        )}

        {/* Blog Content */}
        <section className="my-10">
          <DirectusContentRenderer htmlContent={post.bodyContent || ''} />
        </section>
      </article>
    </main>
  );
}
