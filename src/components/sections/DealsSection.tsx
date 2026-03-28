"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function DealsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-sage-600 to-fresh-600">
      <div className="container-responsive">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Deal 1: First Order */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 text-white hover:bg-white/15 transition">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <span className="font-semibold">Limited Time</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">20% Off First Order</h3>
            <p className="text-white/80 mb-6">
              Use code <span className="font-bold text-lg">FRESH20</span> on your first purchase
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-sage-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Deal 2: Subscription */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 text-white hover:bg-white/15 transition">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <span className="font-semibold">Weekly Savings</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Subscribe & Save</h3>
            <p className="text-white/80 mb-6">
              Get up to 20% off with our weekly subscription plans. Cancel anytime.
            </p>
            <Link href="/subscription" className="inline-flex items-center gap-2 bg-white text-sage-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Deal 3: Bundle */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 text-white hover:bg-white/15 transition">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <span className="font-semibold">Family Bundle</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Mix & Save Bundle</h3>
            <p className="text-white/80 mb-6">
              Mix 5 items and get 15% off. Perfect for families ordering together.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-sage-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Create Bundle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
