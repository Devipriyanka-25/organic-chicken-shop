"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const discount = appliedPromo ? appliedPromo.discount : 0;
  const subtotal = totalPrice;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = Math.round(subtotalAfterDiscount * 0.05);
  const delivery = subtotalAfterDiscount > 500 ? 0 : 50;
  const finalTotal = subtotalAfterDiscount + tax + delivery;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoLoading(true);
    setPromoError('');

    try {
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promoCode: promoCode.trim(),
          orderAmount: subtotal,
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

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white">
          <div className="container-responsive py-24 text-center">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Start by adding some delicious organic meat to your cart</p>
            <Link href="/products">
              <button className="btn-primary">Continue Shopping</button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-8 md:py-12 bg-sage-50 border-b border-gray-200">
          <div className="container-responsive">
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{items.length} item(s) in cart</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-responsive py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                  >
                    {/* Product Image/Emoji */}
                    <div className="w-24 h-24 bg-sage-50 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.emoji}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.weight}</p>
                      <p className="text-sm text-sage-600 mt-2">
                        {item.certifications.join(", ")}
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex flex-col items-end justify-between">
                      {/* Price */}
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="mt-6 text-red-600 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-sage-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold bg-green-100 px-3 py-2 rounded">
                      <span>Discount ({appliedPromo.promoCode})</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal after discount</span>
                    <span>{formatCurrency(subtotalAfterDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (5%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "text-green-600 font-semibold" : ""}>
                      {delivery === 0 ? "FREE" : formatCurrency(delivery)}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-gray-600">
                      Free delivery on orders above ₹500
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  {appliedPromo ? (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-green-900 font-semibold">✓ {appliedPromo.promoCode}</p>
                          <p className="text-green-700 text-sm">{appliedPromo.description}</p>
                          <p className="text-green-600 font-bold mt-1">You saved ₹{appliedPromo.discount.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {promoError && (
                        <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded-lg text-red-800 text-sm">
                          {promoError}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleApplyPromo();
                            }
                          }}
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoLoading || !promoCode.trim()}
                          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
                        >
                          {promoLoading ? 'Checking...' : 'Apply'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Try: FRESH20, ORGANIC15, FIRST50, SAVE100, WELCOME10</p>
                    </>
                  )}
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="btn-primary w-full mb-3">Proceed to Checkout</button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/products">
                  <button className="btn-outline w-full">Continue Shopping</button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-300 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Secure checkout with Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>100% fresh guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Same-day delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
