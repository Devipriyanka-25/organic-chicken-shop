import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection, getPasswordResetTokensCollection } from '@/lib/db';
import { generateResetToken } from '@/lib/auth-utils';
import { isValidEmail } from '@/lib/utils';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if user exists
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal whether email exists (security best practice)
      // But for this demo, we'll return success anyway
      return NextResponse.json(
        { message: 'If an account exists with that email, we have sent a password reset link.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store reset token in database
    const tokensCollection = await getPasswordResetTokensCollection();
    await tokensCollection.insertOne({
      userId: user._id.toString(),
      token: resetToken,
      email: email.toLowerCase(),
      createdAt: new Date(),
      expiresAt: expiryTime,
    });

    // In production, send email here
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    try {
      await sendPasswordResetEmail(email.toLowerCase(), resetLink, user.name);
      console.log('Password reset email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // In development, still return success even if email fails
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
          { error: 'Failed to send reset email. Please try again.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        message: 'If an account exists with that email, we have sent a password reset link.',
        // Remove this in production - only for development/testing
        ...(process.env.NODE_ENV === 'development' && { resetLink })
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
