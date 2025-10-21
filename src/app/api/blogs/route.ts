import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/constants';

export const dynamic = 'force-dynamic'; // 👈 run at request-time, not build
export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  try {
    const url = new URL(`${BACKEND_URL}/items/post`);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('sort', '-publishedDate');
    url.searchParams.append('filter[status][_eq]', 'published');

    console.log('BACKEND_SERVER:', request.url);
    console.log('DIRECT_US:', url.toString());

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error: any) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
