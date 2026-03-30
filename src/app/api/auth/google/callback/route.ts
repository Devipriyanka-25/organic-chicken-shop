import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';
import { generateToken } from '@/lib/auth-utils';
import { getGoogleUserInfo } from '@/lib/google-auth';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent(error)}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent('No authorization code')}`
      );
    }

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(code);

    // Get users collection
    const usersCollection = await getUsersCollection();

    // Check if user exists by email
    let user = await usersCollection.findOne({ email: googleUser.email?.toLowerCase() });

    if (!user) {
      // Create new user from Google profile
      const newUser = {
        name: googleUser.name || 'User',
        email: googleUser.email?.toLowerCase() || '',
        phone: '', // Empty for Google OAuth users
        password: '', // No password for OAuth users
        googleId: googleUser.id,
        avatar: googleUser.picture,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);
      user = {
        _id: result.insertedId,
        ...newUser,
      };
    } else {
      // Update existing user with Google ID if not already set
      if (!user.googleId) {
        await usersCollection.updateOne(
          { _id: user._id },
          {
            $set: {
              googleId: googleUser.id,
              avatar: googleUser.picture,
              updatedAt: new Date(),
            },
          }
        );
        user.googleId = googleUser.id;
      }
    }

    // Generate JWT token
    const token = generateToken(user._id!.toString(), user.email);

    // Create response with redirect
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);

    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    // Store user info in a temporary session
    response.cookies.set(
      'user-session',
      JSON.stringify({
        id: user._id?.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
      }
    );

    return response;
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent('Authentication failed')}`
    );
  }
}
