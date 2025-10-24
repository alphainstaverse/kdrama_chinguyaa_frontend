import { categories, description, faqs, title } from '@/appData'
import Banner from '@/components/banner/SimpleBanner'
import BlogList from '@/components/blog/BlogList'
import BlogCard from '@/components/blog/MinimalCard'
import CategoryList from '@/components/category/CategoryList'
import Faq from '@/components/faq/Faq'
import Newsletter from '@/components/newsletter/Newsletter'
import { getBlogs } from '@/services/blogs' 
import FeaturedBlogCard from '@/components/blog/FeaturedBlogCard'
import TrendingBlogList from '@/components/blog/TrendingBlogList'
import { BlogData } from '@/dataTypes/BlogData'
import { HiStar, HiOutlineLightningBolt, HiOutlineDocumentText } from 'react-icons/hi' 

export default async function Home() {
  const posts: BlogData[] = await getBlogs(); 
  const featuredPost: BlogData = posts[0];
  const trendingPosts: BlogData[] = posts.slice(0, 6);

  return (
    <div className="mx-auto max-w-[90vw] px-2 md:px-4 pt-24">
      <section className="mb-10 grid grid-cols-1 md:grid-cols-[60%_40%] gap-2 md:gap-6">
        
        {/* === Featured Article === */}
        <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-xl shadow p-3 md:p-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0 flex items-center gap-2">
            <HiStar className="text-yellow-500" size={28} />
            <span>Featured </span>
            <span className="text-orange-400">Article</span> 
          </h2>
          {/* *** UPDATED SUBTITLE *** */}
          <p className="text-gray-700 text-sm mb-3"> 
            Our top pick for you right now.
          </p>

          {featuredPost && <FeaturedBlogCard post={featuredPost} />}
        </div>
        
        {/* === Trending Posts === */}
        <div className="bg-white/80 rounded-xl shadow p-3 md:p-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0 flex items-center gap-2">
            <HiOutlineLightningBolt className="text-yellow-600" size={28} /> 
            <span>Trending </span>
            <span className="text-orange-400">Posts</span>
          </h2>

          {/* *** UPDATED SUBTITLE *** */}
          <p className="text-gray-700 text-sm mb-3">
            Don't miss these hot posts!
          </p>

          <TrendingBlogList posts={trendingPosts} />
        </div>

      </section>

      {/* === All Blogs === */}
      <section className="mb-10 bg-white/80 rounded-xl shadow p-3 md:p-6">
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0 flex items-center gap-2">
            <HiOutlineDocumentText className="text-blue-500" size={28} />
          <span>All </span>
          <span className="text-orange-400">Blogs</span>
        </h2>
        {/* *** UPDATED SUBTITLE *** */}
        <p className="text-gray-700 text-sm mb-3">
          Dive into our complete K-drama library.
        </p>

        <BlogList posts={posts} />
      </section>
    </div>
  );
}