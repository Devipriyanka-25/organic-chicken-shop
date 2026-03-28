'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { AVAILABLE_PAYMENT_METHODS, PaymentMethod } from '@/lib/payment-config';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

// Type declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryType: 'standard',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  // Redirect to cart if empty
  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push('/cart');
    } else {
      setSubtotal(getTotalPrice());
    }
  }, [items, router, getTotalPrice]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoLoading(true);
    setPromoError('');

    try {
      const currentSubtotal = getTotalPrice();
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promoCode: promoCode.trim(),
          orderAmount: currentSubtotal,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setPromoError(data.error || 'Invalid promo code');
        setAppliedPromo(null);
        return;
      }

      const data = await response.json();
      setAppliedPromo(data);
      setPromoError('');
      setPromoCode('');
    } catch (err) {
      setPromoError('Failed to validate promo code. Please try again.');
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      setError('Razorpay SDK not loaded');
      return;
    }

    setIsProcessing(true);
    try {
      // Create order on backend
      const orderResponse = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'create',
          amount: total,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
          notes: {
            customerId: `${formData.phone}`,
            orderDetails: `Order from ${formData.name}`,
            promoCode: appliedPromo?.promoCode || 'NONE',
            discount: discount,
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(total * 100),
        currency: 'INR',
        order_id: orderData.orderId,
        name: 'Organic Meat Shop',
        description: 'Fresh Organic Meat Products',
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response: any) => {
          // Verify payment signature
          const verifyResponse = await fetch('/api/payment/razorpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              method: 'verify',
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            setSuccess(true);
            setTimeout(() => {
              router.push('/order-confirmation');
            }, 2000);
          } else {
            setError('Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            setError('Payment cancelled');
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'create-intent',
          amount: total,
          currency: 'inr',
          customerEmail: formData.email,
          customerName: formData.name,
          orderId: `order_${Date.now()}`,
          description: `Order for ${formData.name}`,
          promoCode: appliedPromo?.promoCode || 'NONE',
          discount: discount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      // Redirect to Stripe checkout or embedded payment form
      router.push(`/payment/stripe?paymentIntentId=${data.paymentIntentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Stripe payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      return;
    }

    if (selectedPaymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else if (selectedPaymentMethod === 'stripe') {
      handleStripePayment();
    }
  };

  const discount = appliedPromo ? appliedPromo.discount : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = parseFloat((subtotalAfterDiscount * 0.05).toFixed(2));
  const delivery = subtotalAfterDiscount > 500 ? 0 : 50;
  const total = subtotalAfterDiscount + tax + delivery;

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Checkout</h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800">
            ✓ Payment successful! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handlePaymentSubmit} className="space-y-8">
          {/* Delivery Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Delivery Information</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Type</label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="standard">Standard Delivery</option>
                  <option value="sameday">Same Day Delivery (+₹100)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                required
                placeholder="Enter delivery address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Coimbatore"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="641015"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Payment Method</h2>

            <div className="space-y-3">
              {AVAILABLE_PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    disabled={!method.enabled}
                    className="mr-4 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {method.icon} {method.name}
                    </div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {method.methods.join(', ')}
                    </div>
                  </div>
                  {!method.enabled && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      Not Available
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Apply Promo Code</h2>

            {appliedPromo ? (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-900 font-semibold text-lg">✓ {appliedPromo.promoCode}</p>
                    <p className="text-green-700 text-sm">{appliedPromo.description}</p>
                    <p className="text-green-600 font-bold mt-2">You saved ₹{appliedPromo.discount.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <>
                {promoError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-800 text-sm">
                    {promoError}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code (e.g., FRESH20)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleApplyPromo();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoLoading || !promoCode.trim()}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {promoLoading ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">Try: FRESH20, ORGANIC15, FIRST50, SAVE100, WELCOME10</p>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold bg-green-100 px-3 py-2 rounded">
                  <span>Discount ({appliedPromo.promoCode})</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal after discount</span>
                <span>{formatCurrency(subtotalAfterDiscount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'FREE' : formatCurrency(delivery)}</span>
              </div>
              <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between text-xl font-bold text-green-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ 100% Fresh Organic Meat</p>
              <p>✓ Same Day Delivery Available</p>
              <p>✓ Secure Payment Processing</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link href="/cart" className="flex-1 px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition text-center">
              Back to Cart
            </Link>
            <button
              type="submit"
              disabled={isProcessing || !selectedPaymentMethod}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </form>
      </div>

      {/* Razorpay Script */}
      <script
        src="https://checkout.razorpay.com/v1/checkout.js"
        defer
      ></script>
    </div>
  );
}
