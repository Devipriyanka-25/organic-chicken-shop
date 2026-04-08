# Payment Integration Guide

## Overview

The Organic Meat Shop now supports multiple payment methods through **Razorpay** (Indian market) and **Stripe** (International). This guide explains how to set up and use the payment system.

## Supported Payment Methods

### Razorpay (Recommended for Indian Market)
- **UPI**: Google Pay, PhonePe, Paytm, BHIM
- **Credit/Debit Cards**: Visa, Mastercard, American Express
- **Digital Wallets**: Google Pay, Apple Pay
- **Net Banking**: All major Indian banks
- **Mobile Wallets**: Paytm, MobiKwik, Airtel Money

### Stripe (International Payments)
- **Credit Cards**: Visa, Mastercard, American Express, Discover
- **Debit Cards**
- **Bank Transfers**: ACH (US), SEPA (EU)
- **International Cards**

## Setup Instructions

### 1. Razorpay Setup (Indian Market)

#### Get API Keys
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Create a free account or sign in
3. Navigate to **Settings → API Keys**
4. Copy your **Key ID** and **Key Secret**

#### Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=rzp_test_your_key_secret
```

#### Test Credentials (Sandbox)
```
Razorpay Test Key ID: rzp_test_1234567890123
Razorpay Test Secret: test_secret_1234567890
```

Use test card: `4111111111111111` (any future expiry, any CVV)

### 2. Stripe Setup (International Payments)

#### Get API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a free account or sign in
3. Navigate to **Developers → API Keys**
4. Copy your **Publishable Key** and **Secret Key**

#### Configure Environment Variables
Add to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

#### Test Credentials (Sandbox)
```
Stripe Test Publishable Key: Copy from your Stripe Dashboard
Stripe Test Secret Key: Copy from your Stripe Dashboard
```

⚠️ **Never commit real API keys to repositories. Use environment variables instead.**

Use test card: `4242424242424242` (any future expiry, any CVV)

### 3. PayPal Setup (Optional)

#### Get API Credentials
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create a sandbox business account
3. Navigate to **Apps & Credentials**
4. Copy your **Client ID** and **Secret**

#### Configure Environment Variables
Add to `.env.local`:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## File Structure

```
src/
├── lib/
│   └── payment-config.ts          # Payment configuration and constants
├── app/api/payment/
│   ├── razorpay/route.ts          # Razorpay API endpoints
│   └── stripe/route.ts            # Stripe API endpoints
├── app/
│   ├── checkout/page.tsx          # Checkout page with payment selection
│   ├── order-confirmation/        # Order confirmation page
│   └── cart/page.tsx              # Updated with checkout link
```

## Payment Flow

### User Journey
1. User adds items to cart
2. Clicks "Proceed to Checkout"
3. Enters delivery information
4. Selects payment method (Razorpay or Stripe)
5. Payment is processed
6. Order confirmation page displays
7. Order tracking becomes available

### Backend Flow

#### Razorpay Payment
```
1. Frontend → POST /api/payment/razorpay
   - Creates order on Razorpay
   - Returns order ID
   
2. Frontend → Razorpay SDK
   - Displays payment form
   - User completes payment
   
3. Frontend → POST /api/payment/razorpay
   - Verifies payment signature
   - Confirms transaction
   
4. Backend saves order
```

#### Stripe Payment
```
1. Frontend → POST /api/payment/stripe
   - Creates payment intent
   - Returns client secret
   
2. Frontend → Stripe SDK
   - Displays payment form
   - User completes payment
   
3. Backend receives webhook
   - Confirms payment
   - Saves order
```

## API Endpoints

### Razorpay Endpoints

**Create Order**
```
POST /api/payment/razorpay
Content-Type: application/json

{
  "method": "create",
  "amount": 5000,
  "currency": "INR",
  "receipt": "order_12345",
  "notes": {
    "customerId": "customer_123",
    "orderDetails": "Order from John Doe"
  }
}

Response:
{
  "success": true,
  "orderId": "order_DBJOWzybf0sJbb",
  "amount": 5000,
  "currency": "INR"
}
```

**Verify Payment**
```
POST /api/payment/razorpay
Content-Type: application/json

{
  "method": "verify",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_order_id": "order_DBJOWzybf0sJbb",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}

Response:
{
  "success": true,
  "paymentId": "pay_1234567890",
  "orderId": "order_DBJOWzybf0sJbb",
  "message": "Payment verified successfully"
}
```

### Stripe Endpoints

**Create Payment Intent**
```
POST /api/payment/stripe
Content-Type: application/json

{
  "method": "create-intent",
  "amount": 5000,
  "currency": "inr",
  "customerEmail": "user@example.com",
  "customerName": "John Doe",
  "orderId": "order_12345",
  "description": "Order for John Doe"
}

Response:
{
  "success": true,
  "clientSecret": "pi_1234567890_secret_abcdef123456",
  "paymentIntentId": "pi_1234567890"
}
```

**Get Payment Intent Status**
```
POST /api/payment/stripe
Content-Type: application/json

{
  "method": "get-intent",
  "paymentIntentId": "pi_1234567890"
}

Response:
{
  "success": true,
  "status": "succeeded",
  "amount": 5000,
  "currency": "inr",
  "paymentIntentId": "pi_1234567890"
}
```

## Payment Status Codes

### Razorpay
- `created`: Order created, awaiting payment
- `processed`: Payment received, processing complete
- `authenticated`: Payment authenticated, awaiting verification

### Stripe
- `requires_payment_method`: Payment method required
- `requires_confirmation`: Confirmation required
- `requires_action`: Additional action required (3D Secure, etc.)
- `processing`: Payment being processed
- `succeeded`: Payment successful
- `requires_capture`: Payment authorized, waiting for capture
- `canceled`: Payment canceled

## Testing

### Local Testing
1. Run development server: `npm run dev`
2. Navigate to `/products`
3. Add items to cart
4. Click "Proceed to Checkout"
5. Use test credentials from above

### Test Cards

**Razorpay Test**
- Card: `4111111111111111`
- Expiry: Any future date (MM/YY)
- CVV: Any 3 digits

**Stripe Test**
- Card: `4242424242424242`
- Expiry: Any future date (MM/YY)
- CVV: Any 3 digits

### Transaction Webhooks (Production)

To receive payment notifications:

1. **For Razorpay**: Configure webhooks in [Dashboard](https://dashboard.razorpay.com/app/webhooks)
2. **For Stripe**: Configure webhooks in [Dashboard](https://dashboard.stripe.com/webhooks)

Webhook endpoints to configure:
- `https://yourdomain.com/api/webhook/razorpay`
- `https://yourdomain.com/api/webhook/stripe`

## Error Handling

The system handles various error scenarios:

1. **Network Errors**: User sees retry option
2. **Invalid Signature**: Payment verification fails, user notified
3. **Insufficient Funds**: Payment gateway error message displayed
4. **Timeout**: Retry mechanism with confirmation check

## Security Best Practices

1. ✅ Never expose secret keys in frontend code
2. ✅ Use `NEXT_PUBLIC_*` prefix only for public keys
3. ✅ Verify payment signatures on backend
4. ✅ Store secret keys in `.env.local` (not version controlled)
5. ✅ Use HTTPS for all payment pages
6. ✅ Implement rate limiting on payment endpoints
7. ✅ Log payment events for audit trails

## Troubleshooting

### Razorpay Not Appearing
- Check `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in `.env.local`
- Verify Razorpay script loads: Check browser console
- Clear browser cache and reload

### Stripe Errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Check `STRIPE_SECRET_KEY` on server (should not be empty)
- Review Stripe API version compatibility

### Payment Verification Fails
- Verify signature calculation uses correct secret key
- Check request parameters match order details
- Ensure timestamps are valid

## Next Steps

1. Configure environment variables with real keys
2. Deploy payment endpoints to live server
3. Set up webhook handlers for payment notifications
4. Configure email notifications for orders
5. Implement order tracking with real-time updates
6. Add admin dashboard for payment management

## Support

For issues or questions:
- **Razorpay Support**: https://razorpay.com/support
- **Stripe Support**: https://support.stripe.com
- **Project Support**: hello@organmeat.com / +91 96557 37796
