import Image from 'next/image';
import Link from 'next/link';
import { BACKEND_URL } from '@/utils/constants';

import { BlogPost } from '@/models/BlogPost';

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => (
  <div className="w-full bg-white border-b border-gray-200 p-4 flex flex-row gap-4">
    {post.coverImage && (
      <div className="w-[240px] h-[135px] relative rounded overflow-hidden">
        <Image src={`${BACKEND_URL}/assets/${post.coverImage}`} alt={post.title} fill className="object-cover rounded" />
      </div>
    )}
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-lg md:text-xl font-bold text-[#111] mb-1 hover:text-[#1e90ff]">{post.title}</h3>
        </Link>
        <p className="text-sm text-[#444] mb-2">{post.shortDescription}</p>
      </div>
      <div className="text-xs text-[#999]">{post.publishedDate}</div>
    </div>
  </div>
);

export default ArticleCard;
