import { NextRequest, NextResponse } from 'next/server';

// Sample promo codes with discount details
const PROMO_CODES = [
  {
    code: 'FRESH20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% off on all orders',
    maxUses: 100,
    maxDiscountAmount: 1000,
  },
  {
    code: 'ORGANIC15',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% off on organic products',
    maxUses: 150,
    maxDiscountAmount: 750,
  },
  {
    code: 'FIRST50',
    discountType: 'fixed',
    discountValue: 50,
    description: '₹50 off on first order',
    maxUses: 50,
    maxDiscountAmount: 50,
  },
  {
    code: 'SAVE100',
    discountType: 'fixed',
    discountValue: 100,
    description: '₹100 off on orders above ₹500',
    maxUses: 200,
    minOrderAmount: 500,
    maxDiscountAmount: 100,
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% welcome discount',
    maxUses: 500,
    maxDiscountAmount: 500,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { promoCode, orderAmount = 0 } = body;

    if (!promoCode) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Find matching promo code (case-insensitive)
    const promo = PROMO_CODES.find(
      (p) => p.code.toUpperCase() === promoCode.toUpperCase()
    );

    if (!promo) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }

    // Check minimum order amount if specified
    if (promo.minOrderAmount && orderAmount < promo.minOrderAmount) {
      return NextResponse.json(
        {
          error: `Minimum order amount of ₹${promo.minOrderAmount} required for this code`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = (orderAmount * promo.discountValue) / 100;
    } else {
      discount = promo.discountValue;
    }

    // Cap discount at maximum allowed
    if (promo.maxDiscountAmount) {
      discount = Math.min(discount, promo.maxDiscountAmount);
    }

    // Ensure discount doesn't exceed order amount
    discount = Math.min(discount, orderAmount);

    return NextResponse.json({
      success: true,
      promoCode: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discount: parseFloat(discount.toFixed(2)),
      description: promo.description,
      message: `Successfully applied! You saved ₹${discount.toFixed(2)}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
