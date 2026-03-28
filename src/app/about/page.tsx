"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Leaf, Users, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-sage-50 to-fresh-50">
          <div className="container-responsive">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About OrganiMeat
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              We believe fresh organic meat should be accessible to every health-conscious family in India.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-heading mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  To make premium organic, grass-fed meat from certified farms accessible to every family in Tamil Nadu and beyond. We eliminate middlemen, ensuring farmers get fair prices and customers get fresh, traceable meat.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every purchase supports organic farming practices, sustainable agriculture, and transparent food systems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sage-50 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-sage-600 mb-2">12,000+</p>
                  <p className="text-gray-600">Happy Families</p>
                </div>
                <div className="bg-fresh-50 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-fresh-600 mb-2">50+</p>
                  <p className="text-gray-600">Organic Farms</p>
                </div>
                <div className="bg-sage-50 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-sage-600 mb-2">4.9/5</p>
                  <p className="text-gray-600">Customer Rating</p>
                </div>
                <div className="bg-fresh-50 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-fresh-600 mb-2">0</p>
                  <p className="text-gray-600">Antibiotics Used</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-sage-50">
          <div className="container-responsive">
            <h2 className="section-heading text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg text-center">
                <Leaf className="w-12 h-12 text-fresh-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
                <p className="text-gray-600 text-sm">No antibiotics, hormones, or artificial feeds</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <Users className="w-12 h-12 text-fresh-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fair Trade</h3>
                <p className="text-gray-600 text-sm">Direct partnerships with farmers for fair prices</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <Award className="w-12 h-12 text-fresh-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                <p className="text-gray-600 text-sm">Strict quality checks and cold-chain management</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <Heart className="w-12 h-12 text-fresh-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Health Focused</h3>
                <p className="text-gray-600 text-sm">Better nutrition for healthier families</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center">
            <h2 className="section-heading mb-6">Want to Join Our Community?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Start your organic journey today and experience the difference fresh, traceable meat makes
            </p>
            <Link href="/products">
              <button className="btn-primary">Shop Now</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
