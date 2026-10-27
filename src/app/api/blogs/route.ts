import { NextRequest, NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/data/blogs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...BLOG_POSTS];

  if (category && category !== 'All') {
    results = results.filter((b) => b.category === category);
  }

  if (tag) {
    results = results.filter((b) => b.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.tagline.toLowerCase().includes(search) ||
        b.content.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results
  });
}
