import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid engineering email address.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully! You will receive weekly deep dives into high-scale production systems.'
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
