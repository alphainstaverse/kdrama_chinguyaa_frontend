import ArticleCard from './ArticleCard';

import { BlogPost } from '@/models/BlogPost';

interface MainFeedProps {
  posts: BlogPost[];
}

const MainFeed: React.FC<MainFeedProps> = ({ posts }) => (
  <section className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-4">
    <div className="flex flex-col gap-6">
      {posts.map((post, idx) => (
        <ArticleCard key={idx} post={post} />
      ))}
    </div>
    {/* Sidebar will be added here */}
    <aside className="hidden md:block w-full h-full">{/* Sidebar placeholder */}</aside>
  </section>
);

export default MainFeed;
