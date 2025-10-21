import { categories, description, faqs, title } from '@/appData'
import Banner from '@/components/banner/SimpleBanner'
import BlogList from '@/components/blog/BlogList'
import BlogCard from '@/components/blog/MinimalCard'
import CategoryList from '@/components/category/CategoryList'
import Faq from '@/components/faq/Faq'
import Newsletter from '@/components/newsletter/Newsletter'
import SectionHeading from '@/components/sectionHeading/ColoredSectionHeading'
import { getBlogs } from '@/services/blogs' // Revert to using getBlogs
import FeaturedBlogCard from '@/components/blog/FeaturedBlogCard'
import TrendingBlogList from '@/components/blog/TrendingBlogList'
import { BlogData } from '@/dataTypes/BlogData'

export default async function Home() {
  const posts: BlogData[] = await getBlogs(); // Revert to using getBlogs
  const featuredPost: BlogData = posts[0];
  const trendingPosts: BlogData[] = posts.slice(0, 6);

  return (
    <div className="mx-auto max-w-[90vw] px-4 pt-24">
      {/* Featured + Trending Row */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
        <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-xl shadow p-6">
          <SectionHeading title={["Featured", "Article"]} subtitle="Check out our top article" />
          {featuredPost && <FeaturedBlogCard post={featuredPost} />}
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6">
          <SectionHeading title={["Trending", "Posts"]} subtitle="Diverse Range of articles related to Artificial Intelligence" />
          <TrendingBlogList posts={trendingPosts} />
        </div>
      </section>

      {/* Blog List Section */}
      <section className="mb-10 bg-white/80 rounded-xl shadow p-6">
        <SectionHeading title={["All", "Blogs"]} subtitle="Explore more articles" />
        <BlogList posts={posts} />
      </section>
    </div>
  );
}
