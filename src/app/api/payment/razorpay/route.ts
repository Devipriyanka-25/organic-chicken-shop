import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

interface RazorpayOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: {
    customerId?: string;
    orderDetails?: string;
  };
}

interface VerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Create Razorpay Order
export async function POST(request: NextRequest) {
  const { method } = await request.json();

  if (method === 'create') {
    try {
      const body: RazorpayOrderRequest = await request.json();

      // Razorpay API endpoint for creating orders
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
          ).toString('base64')}`,
        },
        body: JSON.stringify({
          amount: body.amount * 100, // Converting to paise
          currency: body.currency || 'INR',
          receipt: body.receipt,
          notes: body.notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(
          { error: 'Failed to create order', details: error },
          { status: 400 }
        );
      }

      const order = await response.json();
      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error('Razorpay order creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create payment order' },
        { status: 500 }
      );
    }
  }

  // Verify payment signature
  if (method === 'verify') {
    try {
      const body: VerifyPaymentRequest = await request.json();
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

      // Create signature for verification
      const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest('hex');

      if (digest === razorpay_signature) {
        return NextResponse.json({
          success: true,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          message: 'Payment verified successfully',
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Invalid payment signature' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      return NextResponse.json(
        { error: 'Failed to verify payment' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Invalid method' }, { status: 400 });
}
