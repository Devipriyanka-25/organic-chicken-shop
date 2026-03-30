import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection, getPasswordResetTokensCollection } from '@/lib/db';
import { hashPassword, isResetTokenValid } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Find the reset token
    const tokensCollection = await getPasswordResetTokensCollection();
    const resetTokenDoc = await tokensCollection.findOne({ token });

    if (!resetTokenDoc) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (!isResetTokenValid(resetTokenDoc.createdAt, 24)) {
      // Delete expired token
      await tokensCollection.deleteOne({ _id: resetTokenDoc._id });
      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    const usersCollection = await getUsersCollection();
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(resetTokenDoc.userId) },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete the used reset token
    await tokensCollection.deleteOne({ _id: resetTokenDoc._id });

    // Also delete any other valid tokens for this user (optional: keep only latest)
    await tokensCollection.deleteMany({
      userId: resetTokenDoc.userId,
      token: { $ne: token }
    });

    return NextResponse.json(
      { message: 'Password has been reset successfully. You can now login with your new password.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
