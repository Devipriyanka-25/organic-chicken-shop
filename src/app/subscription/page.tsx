"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SUBSCRIPTION_PLANS } from "@/lib/data";
import { formatCurrency, getDiscountedPrice } from "@/lib/utils";
import { useSubscriptionStore, useCartStore } from "@/store";

export default function SubscriptionPage() {
  const selectPlan = useSubscriptionStore((state) => state.selectPlan);
  const addItem = useCartStore((state) => state.addItem);

  const handleSelectPlan = (planId: number) => {
    selectPlan(planId);
    // Add plan items to cart
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
    if (plan) {
      // This is a simplified example - in real app, you'd handle subscription differently
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-sage-50 to-fresh-50">
          <div className="container-responsive text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Subscription Plans
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Never run out of fresh organic meat. Our flexible subscription plans save you money and guarantee fresh delivery every week.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-8">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const discountedPrice = getDiscountedPrice(plan.basePrice, plan.discountPercentage);
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl overflow-hidden transition-all ${
                      plan.popularBadge
                        ? "border-2 border-fresh-600 shadow-xl scale-105"
                        : "border border-gray-200"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popularBadge && (
                      <div className="absolute top-0 right-0 bg-fresh-600 text-white px-4 py-1 text-sm font-semibold">
                        Most Popular
                      </div>
                    )}

                    <div className="bg-white p-8">
                      {/* Plan Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gray-900">
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className="text-gray-500 line-through">
                            {formatCurrency(plan.basePrice)}
                          </span>
                        </div>
                        <p className="text-sm text-sage-600 mt-2">
                          per {plan.frequency.replace("_", " ")}
                        </p>
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          Save {plan.discountPercentage}%
                        </p>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8 space-y-3">
                        {plan.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-fresh-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                          plan.popularBadge
                            ? "bg-fresh-600 text-white hover:bg-fresh-700"
                            : "border-2 border-sage-600 text-sage-600 hover:bg-sage-50"
                        }`}
                      >
                        Choose Plan
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Included Items */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 mb-3">
                          Includes:
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                          {plan.items.map((item, idx) => (
                            <p key={idx}>
                              • Product ID: {item.productId} (Qty: {item.quantity})
                              {item.optional && " (optional)"}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-sage-50">
          <div className="container-responsive">
            <h2 className="section-heading text-center mb-12">Subscription FAQs</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Can I customize my plan?
                </h3>
                <p className="text-gray-600">
                  Yes! You can customize which products you want in each delivery and adjust quantities based on your needs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Can I skip or pause deliveries?
                </h3>
                <p className="text-gray-600">
                  Absolutely. You can pause, skip, or cancel anytime without penalties. Manage your subscription from your account dashboard.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Is there a commitment period?
                </h3>
                <p className="text-gray-600">
                  No commitment required. You can cancel your subscription anytime. We offer flexible commitment to suit your lifestyle.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  When do I get charged?
                </h3>
                <p className="text-gray-600">
                  Based on your plan frequency (weekly/biweekly). You'll receive an invoice before each delivery and can modify or cancel before that.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
