import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';
import { storeOTP } from '@/lib/otp-utils';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate phone
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Check if user exists with this phone
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ phone });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this phone number. Please sign up first.' },
        { status: 404 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = storeOTP(phone, otp, user._id.toString());

    // In production, send SMS here using Twilio or similar
    console.log(`OTP for +91${phone}: ${otp}`);
    console.log(`Expires at: ${new Date(expiryTime).toISOString()}`);

    return NextResponse.json(
      {
        message: 'OTP sent successfully',
        // For development only - remove in production
        ...(process.env.NODE_ENV === 'development' && { otp }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Phone login error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
