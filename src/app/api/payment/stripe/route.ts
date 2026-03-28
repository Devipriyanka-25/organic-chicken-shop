import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  orderId: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  const { method } = await request.json();

  if (method === 'create-intent') {
    try {
      const body: CreatePaymentIntentRequest = await request.json();

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(body.amount * 100), // Converting to cents
        currency: body.currency || 'inr',
        description: body.description || `Order ${body.orderId}`,
        metadata: {
          orderId: body.orderId,
          customerEmail: body.customerEmail,
          customerName: body.customerName,
        },
      });

      return NextResponse.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error('Stripe error:', error);
      return NextResponse.json(
        { error: 'Failed to create payment intent' },
        { status: 500 }
      );
    }
  }

  // Retrieve payment intent status
  if (method === 'get-intent') {
    try {
      const { paymentIntentId } = await request.json();

      if (!paymentIntentId) {
        return NextResponse.json(
          { error: 'Payment intent ID required' },
          { status: 400 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      return NextResponse.json({
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error('Stripe retrieval error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve payment intent' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Invalid method' }, { status: 400 });
}
