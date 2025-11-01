import Image from "next/image";
import { notFound } from "next/navigation";
import DirectusContentRenderer from "@/components/html-render/DirectusContentRenderer";
import { getBlog } from "@/services/blogs";
import { BACKEND_URL } from '@/utils/constants';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const post = await getBlog(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      {/* The outer article will now be narrower or you can keep it wide if other elements will use it. 
          Let's make the article itself max-w-4xl too to consistently size everything.
          If you *only* want the image and text narrower, but the overall page container wider for some future element,
          you'd apply max-w-4xl mx-auto to the section containing the image.
          For now, let's make the main article container max-w-4xl for consistency.
      */}
      <article className="mx-auto mb-10 max-w-4xl px-4">
        
        {/* HEADER: No change, it's already max-w-4xl mx-auto */}
        <header className="pt-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold leading-[1.2] text-slate-900 md:text-4xl md:leading-[1.2]">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <b>Published on: {post.publishedDate}</b>
          </p>
        </header>

        {/* --- COVER IMAGE MODIFICATION --- */}
        {/* Applied max-w-4xl and mx-auto to the section holding the image */}
        {post.coverImage && (
          <section className="my-5 max-w-4xl mx-auto"> 
            <figure className="relative h-[250px] w-full md:h-[320px] lg:h-[400px] xl:h-[450px]">
              <Image
                src={`${BACKEND_URL}/assets/${post.coverImage}`}
                alt={post.title}
                fill
                sizes="100%"
                className="rounded-md object-cover" 
              />
            </figure>
          </section>
        )}

        {/* BLOG CONTENT: No change, it's already max-w-4xl mx-auto */}
        <section className="my-10 max-w-4xl mx-auto prose lg:prose-lg">
          <DirectusContentRenderer htmlContent={post.bodyContent || ''} />
        </section>
        
      </article>
    </main>
  );
}