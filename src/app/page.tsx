"use client";

import Link from "next/link";
import { Leaf, Truck, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FarmStory from "@/components/sections/FarmStory";
import DealsSection from "@/components/sections/DealsSection";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Deals & Offers Section */}
        <DealsSection />

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-sage-50">
          <div className="container-responsive">
            <h2 className="section-heading text-center mb-4">Why Choose OrganiMeat?</h2>
            <p className="section-subheading text-center max-w-2xl mx-auto mb-12">
              We believe in transparency, quality, and sustainability. Every piece of meat is sourced from certified organic farms with complete farm-to-table traceability.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-fresh-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
                <p className="text-gray-600 text-sm">
                  All meat sourced from certified organic farms without antibiotics or growth hormones
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-fresh-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Same-Day Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Fresh meat delivered in cold-chain refrigerated vehicles within 24 hours
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl shadow-shadow hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-fresh-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">QR Traceability</h3>
                <p className="text-gray-600 text-sm">
                  Scan QR code to know the exact farm origin, certifications, and farming practices
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-fresh-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Subscription Savings</h3>
                <p className="text-gray-600 text-sm">
                  Save up to 20% with weekly subscription plans customized to your needs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Farm Story Section */}
        <FarmStory />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-sage-600 to-fresh-600">
          <div className="container-responsive text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Fresh Organic Meat?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of health-conscious families ordering fresh organic meat from OrganiMeat. Subscribe today and get 20% off your first order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="btn-primary bg-white text-sage-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="inline w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link href="/subscription">
                <button className="btn-outline border-white text-white hover:bg-white/10">
                  View Plans
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
