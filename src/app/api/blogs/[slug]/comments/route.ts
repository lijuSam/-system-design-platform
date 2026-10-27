import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_COMMENTS } from '@/data/blogs';
import { BlogComment } from '@/types';

// In-memory store for dynamic interaction during session
const commentsStore: BlogComment[] = [...INITIAL_COMMENTS];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filtered = commentsStore.filter((c) => c.blogSlug === slug);

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { author, role, content } = body;

    if (!author || !content) {
      return NextResponse.json(
        { success: false, error: 'Author and comment content are required' },
        { status: 400 }
      );
    }

    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      blogSlug: slug,
      author: String(author).trim(),
      role: role ? String(role).trim() : 'Software Engineer',
      content: String(content).trim(),
      createdAt: 'Just now',
      upvotes: 0
    };

    commentsStore.unshift(newComment);

    return NextResponse.json({
      success: true,
      message: 'Comment posted successfully',
      data: newComment
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to process comment' },
      { status: 500 }
    );
  }
}
