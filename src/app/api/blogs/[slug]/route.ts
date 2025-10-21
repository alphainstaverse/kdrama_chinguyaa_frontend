import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/constants';

export const dynamic = 'force-dynamic'; // 👈 ensures runtime execution (not static)
export const revalidate = 30;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> } // 👈 params is a Promise
) {
  const { slug } = await context.params; // ✅ Must await params

  try {
    const url = new URL(`${BACKEND_URL}/items/post`);
    url.searchParams.append('filter[slug][_eq]', slug);
    url.searchParams.append('filter[status][_eq]', 'published'); // Ensure only published posts are fetched

    console.log('BACKEND_SERVER:', request.url);
    console.log('DIRECT_US:', url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const posts = data.data;

    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const post = posts[0]; // Get the first matching post

    const { title, shortDescription, coverImage, category, bodyContent, publishedDate } = post;
    const res = NextResponse.json({ title, shortDescription, coverImage, category, bodyContent, publishedDate, isDirectusContent: true });
    return res;
  } catch (error: any) {
    console.error('Error in GET /api/blogs/[slug]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
