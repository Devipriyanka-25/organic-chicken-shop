"use client";

import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-fresh-50 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fresh-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-sage-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container-responsive relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-fresh-100 px-4 py-2 rounded-full w-fit">
              <Leaf className="w-4 h-4 text-fresh-600" />
              <span className="text-fresh-700 font-semibold text-sm">
                Farm-to-Table Transparency
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Fresh Organic Meat,{" "}
              <span className="bg-gradient-to-r from-sage-600 to-fresh-600 bg-clip-text text-transparent">
                Delivered Fresh
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Premium grass-fed chicken, mutton, and fish from certified organic farms. Get same-day delivery with
              complete farm-to-table traceability. No antibiotics. No hormones. Just pure, organic goodness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products" className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/subscription" className="btn-outline w-full sm:w-auto flex items-center justify-center">
                Subscribe & Save 20%
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-sage-600">12000+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sage-600">100%</p>
                <p className="text-sm text-gray-600">Organic Certified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sage-600">24hrs</p>
                <p className="text-sm text-gray-600">Delivery Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Image placeholder - 3x emoji for visual appeal */}
              <div className="text-center">
                <div className="text-9xl mb-4 animate-pulse">🥩</div>
                <div className="flex justify-center gap-8 mb-4">
                  <span className="text-6xl">🐔</span>
                  <span className="text-6xl">🐑</span>
                  <span className="text-6xl">🐟</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  Premium Quality Organic Meat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
