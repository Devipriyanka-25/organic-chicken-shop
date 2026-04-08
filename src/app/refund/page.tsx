'use client';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Refund Eligibility</h2>
            <p>
              Organic Meat Shop ("we", "us", "our") offers refunds for orders under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Order was not delivered</li>
              <li>Order was damaged during delivery</li>
              <li>Order quality did not meet our standards</li>
              <li>Wrong items were delivered</li>
              <li>Payment was processed twice by mistake</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Refund Timeline</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Request Period:</strong> Refunds must be requested within 48 hours of delivery</li>
              <li><strong>Processing Time:</strong> Refunds are processed within 5-7 business days</li>
              <li><strong>Bank Credit:</strong> Amount will appear in your bank account within 2-3 business days after processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Non-Refundable Items</h2>
            <p>The following are NOT eligible for refunds:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Promo code discounts already applied</li>
              <li>Delivery charges (unless order was not delivered)</li>
              <li>Orders cancelled after preparation has begun (within 30 minutes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How to Request a Refund</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email us at <strong>organicfreshmeat26@gmail.com</strong> within 48 hours of delivery</li>
              <li>Provide your order number and reason for refund</li>
              <li>Include photos if the product was damaged</li>
              <li>Our team will review and respond within 24 hours</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Partial Refunds</h2>
            <p>
              If only part of your order is damaged or incorrect, we will issue a partial refund for that specific item only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Refund Method</h2>
            <p>Refunds will be credited to your original payment method:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Razorpay/Credit Card:</strong> Refunded to your card (2-3 business days)</li>
              <li><strong>UPI/Bank Transfer:</strong> Refunded to your bank account (2-3 business days)</li>
              <li><strong>Razorpay Wallet:</strong> Instant credit to wallet</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
            <p>For any refund-related queries, please contact:</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> organicfreshmeat26@gmail.com</li>
              <li><strong>Phone:</strong> +91 XXXXXXXXXX</li>
              <li><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM IST</li>
            </ul>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> March 28, 2026. We reserve the right to update this policy at any time. Changes will be published on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
