"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BUSINESS_INFO } from "@/lib/data";
import { CheckCircle2, Award } from "lucide-react";

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-12 md:py-24 bg-sage-50 border-b border-gray-200">
          <div className="container-responsive">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Business Information
            </h1>
            <p className="text-xl text-gray-600">
              Transparency, compliance, and trust - at the heart of OrganiMeat
            </p>
          </div>
        </section>

        {/* Business Details */}
        <div className="container-responsive py-12 md:py-24">
          {/* Registration Info */}
          <div className="bg-gradient-to-r from-sage-50 to-fresh-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Business Registration
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-2">Business Name</p>
                <p className="text-xl font-semibold text-gray-900">
                  {BUSINESS_INFO.name}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Registration Number</p>
                <p className="text-xl font-semibold text-gray-900">
                  {BUSINESS_INFO.registrationNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Food Safety License */}
          <div className="border-2 border-fresh-200 rounded-xl p-8 mb-12 bg-fresh-50">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-fresh-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Food Safety License (FSSAI)
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-2">License Number</p>
                <p className="text-xl font-semibold text-gray-900">
                  {BUSINESS_INFO.fssaiLicense}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Expiry Date</p>
                <p className="text-xl font-semibold text-gray-900">
                  {BUSINESS_INFO.fssaiExpiry}
                </p>
              </div>
            </div>
            <p className="text-sm text-green-700 mt-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              License is valid and in good standing
            </p>
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Certifications & Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {BUSINESS_INFO.certifications.map((cert, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {cert.title}
                    </h3>
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 mb-3">Issued by: {cert.issuer}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Expiry: {cert.expiryDate}
                  </p>
                  <a
                    href={cert.certificateUrl}
                    className="text-fresh-600 hover:text-fresh-700 font-semibold text-sm"
                  >
                    View Certificate →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Farms */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Farm Partners
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {BUSINESS_INFO.farms.map((farm, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {farm.name}
                  </h3>
                  <p className="text-gray-600 mb-3">📍 {farm.location}</p>
                  <p className="text-gray-700 mb-4">{farm.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {farm.certifications.map((cert, cidx) => (
                      <span
                        key={cidx}
                        className="text-xs bg-fresh-100 text-fresh-700 px-3 py-1 rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Policies
            </h2>
            <div className="space-y-4">
              {BUSINESS_INFO.policies.map((policy, idx) => (
                <div key={idx} className="bg-sage-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-700">{policy.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <section className="py-12 md:py-24 bg-gray-50">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-600 mb-2">Established</p>
                <p className="text-2xl font-bold text-gray-900">2023</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Farms Partnered</p>
                <p className="text-2xl font-bold text-gray-900">50+</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Customers Served</p>
                <p className="text-2xl font-bold text-gray-900">12,000+</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
