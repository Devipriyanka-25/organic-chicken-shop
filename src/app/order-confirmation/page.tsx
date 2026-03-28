'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore, useOrderStore } from '@/store';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const { currentOrder } = useOrderStore();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate order ID if not already created
    if (!orderId) {
      const newOrderId = `ORG${Date.now().toString().slice(-8)}`;
      setOrderId(newOrderId);
    }

    // Clear cart after order confirmation
    const timer = setTimeout(() => {
      if (items.length > 0) {
        // Cart will be cleared in the success state
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId, items]);

  const subtotal = getTotalPrice();
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + delivery;

  const orderSteps = [
    { icon: Package, label: 'Order Placed', status: 'completed' },
    { icon: Clock, label: 'Processing', status: 'active' },
    { icon: Truck, label: 'Out for Delivery', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your order</p>
        </div>

        {/* Order ID Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-green-200 mb-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Order Number</p>
            <p className="text-3xl font-bold text-green-600 font-mono">{orderId}</p>
            <p className="text-gray-500 text-sm mt-2">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-green-100">
          <h2 className="text-xl font-bold text-green-900 mb-6">Delivery Status</h2>

          <div className="space-y-4">
            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                      step.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : step.status === 'active'
                        ? 'bg-blue-100 text-blue-600 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        step.status === 'completed'
                          ? 'text-green-600'
                          : step.status === 'active'
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.status === 'active' && (
                      <p className="text-sm text-blue-500">In Progress</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">📍 Real-time tracking:</span> Track your delivery in real-time on the{' '}
              <Link href="/track" className="text-blue-600 hover:underline font-semibold">
                Tracking Page
              </Link>
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-green-100">
          <h2 className="text-xl font-bold text-green-900 mb-4">Order Details</h2>

          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'FREE' : formatCurrency(delivery)}</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-2 flex justify-between font-bold text-lg text-green-600">
              <span>Total Amount</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-lg border border-green-200 mb-8">
          <h3 className="text-lg font-bold text-green-900 mb-4">What's Next?</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-3">1.</span>
              <span>We'll prepare your fresh organic meat with utmost care</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-3">2.</span>
              <span>Our delivery team will contact you to confirm the delivery time</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-3">3.</span>
              <span>Track your delivery in real-time on our tracking page</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-3">4.</span>
              <span>Receive your order and enjoy fresh, organic meat at your doorstep</span>
            </li>
          </ol>
        </div>

        {/* Information Block */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-800">
            <span className="font-semibold">💡 Tip:</span> Keep your order number handy for tracking. A confirmation email will be sent to the provided email address shortly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/track"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition text-center"
          >
            Track Your Order
          </Link>
          <Link
            href="/products"
            className="flex-1 px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Customer Support */}
        <div className="mt-8 p-4 bg-blue-100 rounded-lg border border-blue-300">
          <p className="text-blue-900 text-center text-sm">
            <span className="font-semibold">Need Help?</span> Contact our support team at{' '}
            <a href="tel:+919655737796" className="font-bold text-blue-700 hover:underline">
              +91 96557 37796
            </a>
            {' '}or{' '}
            <a href="mailto:hello@organmeat.com" className="font-bold text-blue-700 hover:underline">
              hello@organmeat.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
