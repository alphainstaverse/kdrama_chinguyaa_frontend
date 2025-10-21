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
    const response = await fetch(`${BACKEND_URL}/items/post/${slug}`);
    if (!response.ok) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    const data = await response.json();
    const post = data.data;

    const { title, shortDescription, coverImage, category, bodyContent, publishedDate } = post;
    const res = NextResponse.json({ title, shortDescription, coverImage, category, bodyContent, publishedDate, isDirectusContent: true });
    return res;
  } catch (error: any) {
    console.error('Error in GET /api/blogs/[slug]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
