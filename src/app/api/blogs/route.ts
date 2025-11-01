import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // === 1. PARSE PARAMS WITH DEFAULTS ===
  // These will *always* have a value, so we always send them.
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  // === 2. CHECK FOR OPTIONAL PARAMS ===
  // This one is truly optional and has no default.
  const featuredPost = searchParams.get('featuredPost');

  try {
    const url = new URL(`${BACKEND_URL}/items/post`);

    // === 3. APPEND REQUIRED & DEFAULT PARAMS ===
    // We always want pagination and sorting.
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('sort', '-publishedDate');
    url.searchParams.append('filter[status][_eq]', 'published');

    // === 4. CONDITIONALLY APPEND OPTIONAL PARAMS ===
    // This is the pattern you're asking about.
    // We only add this filter *if* the 'featured' param exists.
    if (featuredPost === 'true') {
      url.searchParams.append('filter[featuredPost][_eq]', 'true');
    }

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