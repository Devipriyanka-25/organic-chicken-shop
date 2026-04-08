"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How fresh is the meat?",
    a: "All our meat is processed within 24 hours and delivered within 24 hours of your order. We guarantee 7-day freshness from delivery date."
  },
  {
    q: "How do I know the meat is truly organic?",
    a: "All our products are certified by recognized organic certification bodies. You can scan the QR code on each package to verify farm origin and certifications."
  },
  {
    q: "What are your delivery areas?",
    a: "We currently serve across Tamil Nadu including Chennai, Coimbatore, Salem, Madurai, and surrounding areas. We're expanding to other states soon."
  },
  {
    q: "Do you offer same-day delivery?",
    a: "Yes! Same-day delivery is available for orders placed before 10am for evening delivery (5pm-8pm) and before 2pm for next-day delivery."
  },
  {
    q: "What if I'm not satisfied with the meat?",
    a: "We offer 100% satisfaction guarantee. If you're not happy with your order, we'll provide a full refund or replacement."
  },
  {
    q: "How do subscriptions work?",
    a: "Choose a plan (weekly, biweekly, or monthly), customize your items, and we deliver automatically. You can pause, skip, or modify anytime."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards, digital wallets (PhonePe, Google Pay, Paytm), and net banking."
  },
  {
    q: "Is the packaging eco-friendly?",
    a: "Yes, we use recyclable and eco-friendly packaging materials. Our cold-pack gel is non-toxic."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, no questions asked. You can cancel anytime from your account dashboard. There's no cancellation fee or penalty."
  },
  {
    q: "Do you offer bulk orders for events?",
    a: "Absolutely! We offer special bulk discounts. Contact us at organicfreshmeat26@gmail.com for event catering inquiries."
  }
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="py-12 md:py-24 bg-sage-50">
          <div className="container-responsive">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Find answers to common questions about our organic meat products and services
            </p>
          </div>
        </section>

        <div className="container-responsive py-12 md:py-24">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <button
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedId === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 bg-fresh-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help. Reach out anytime!
            </p>
            <a
              href="mailto:organicfreshmeat26@gmail.com"
              className="btn-primary inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
