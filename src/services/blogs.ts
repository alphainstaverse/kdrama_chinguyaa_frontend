import { BlogData } from '@/dataTypes/BlogData';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin; // Client-side: use current window origin
  }
  // Server-side: construct absolute URL
  return process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
};

const baseUrl = getBaseUrl();

export async function getBlogs(page = 1, limit = 10) {
  const response = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=${limit}`, {
    cache: 'no-store', // 👈 ensures fresh API call
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blogs = await response.json();
  return blogs;
}

export async function getBlog(slug: string) {
  const fetchUrl = `${baseUrl}/api/blogs/${slug}`;
  console.log('Fetching blog from:', fetchUrl); // Add this log
  const response = await fetch(fetchUrl, {
    cache: 'no-store', // 👈 ensures fresh API call
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blog = await response.json();
  return blog ? new BlogData(blog) : undefined;
}
