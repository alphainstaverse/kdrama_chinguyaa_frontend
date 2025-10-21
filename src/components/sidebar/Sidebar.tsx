import Link from 'next/link';
import Image from 'next/image';

interface TrendingPost {
  title: string;
  image: string;
  url: string;
}

interface SidebarProps {
  trendingPosts: TrendingPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingPosts }) => (
  <aside className="w-[300px] p-2 flex flex-col gap-6 border-l border-[#f0f0f0]">
    {/* Trending Posts */}
    <div>
      <h3 className="text-lg font-bold border-b-2 border-[#1e90ff] mb-3">TRENDING</h3>
      <ul className="flex flex-col gap-4">
        {trendingPosts.map((post, idx) => (
          <li key={idx} className="flex gap-2 items-center">
            <div className="w-[60px] h-[60px] relative rounded overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <Link href={post.url} className="text-sm font-semibold hover:text-[#1e90ff]">{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
    {/* Newsletter Box */}
    <div className="bg-[#f9f9f9] p-4 rounded-md">
      <h4 className="font-bold mb-2">Subscribe to our Newsletter</h4>
      <input type="email" placeholder="Your email" className="w-full h-9 px-2 mb-2 border border-gray-300 rounded" />
      <button className="w-full h-9 bg-[#1e90ff] text-white rounded font-semibold">Subscribe</button>
    </div>
  </aside>
);

export default Sidebar;
