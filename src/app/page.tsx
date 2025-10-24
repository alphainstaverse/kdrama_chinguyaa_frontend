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

// ... (imports remain the same)

export default async function Home() {
  const posts: BlogData[] = await getBlogs(); // Revert to using getBlogs
  const featuredPost: BlogData = posts[0];
  const trendingPosts: BlogData[] = posts.slice(0, 6);

  return (
    // REVERTED: Page container back to 90vw, px-2 for mobile, md:px-4 for desktop
    <div className="mx-auto max-w-[90vw] px-2 md:px-4 pt-24">
      
      {/* REVERTED: Grid gap back to md:gap-6, gap-2 for mobile */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-[60%_40%] gap-2 md:gap-6">
        
        {/* === Featured Article === */}
        {/* REVERTED: Card padding to p-3 for mobile, md:p-6 for desktop */}
        <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-xl shadow p-3 md:p-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0">
            <span>Featured </span>
            <span className="text-orange-400">Article</span> 
          </h2>
          <p className="text-gray-700 text-sm mb-3"> 
            Check out our top article
          </p>

          {featuredPost && <FeaturedBlogCard post={featuredPost} />}
        </div>
        
        {/* === Trending Posts === */}
        {/* REVERTED: Card padding to p-3 for mobile, md:p-6 for desktop */}
        <div className="bg-white/80 rounded-xl shadow p-3 md:p-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0">
            <span>Trending </span>
            <span className="text-orange-400">Posts</span>
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Diverse Range of articles related to Artificial Intelligence
          </p>

          <TrendingBlogList posts={trendingPosts} />
        </div>

      </section>

      {/* === All Blogs === */}
      {/* REVERTED: Card padding to p-3 for mobile, md:p-6 for desktop */}
      <section className="mb-10 bg-white/80 rounded-xl shadow p-3 md:p-6">
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0">
          <span>All </span>
          <span className="text-orange-400">Blogs</span>
        </h2>
        <p className="text-gray-700 text-sm mb-3">
          Explore more articles
        </p>

        <BlogList posts={posts} />
      </section>
    </div>
  );
}