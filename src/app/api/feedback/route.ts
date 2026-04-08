import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, feedbackType, rating, message } = body;

    // Validation
    if (!name || !email || !feedbackType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Feedback message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Get feedback collection
    const feedbackCollection = await getCollection('feedback');

    // Insert feedback
    const result = await feedbackCollection.insertOne({
      name,
      email,
      feedbackType,
      rating: rating || 0,
      message,
      createdAt: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    console.log('✅ Feedback submitted:', {
      id: result.insertedId,
      name,
      email,
      feedbackType,
      rating,
    });

    return NextResponse.json(
      {
        message: 'Feedback submitted successfully',
        feedbackId: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting feedback' },
      { status: 500 }
    );
  }
}
