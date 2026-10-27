import { NextRequest, NextResponse } from 'next/server';
import { CONCEPTS } from '@/data/concepts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...CONCEPTS];

  if (category && category !== 'All') {
    results = results.filter((c) => c.category === category);
  }

  if (difficulty && difficulty !== 'All') {
    results = results.filter((c) => c.difficulty === difficulty);
  }

  if (search) {
    results = results.filter(
      (c) =>
        c.title.toLowerCase().includes(search) ||
        c.tagline.toLowerCase().includes(search) ||
        c.summary.toLowerCase().includes(search) ||
        c.keyPoints.some((kp) => kp.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results
  });
}
