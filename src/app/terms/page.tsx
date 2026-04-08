"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container-responsive py-12 md:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="max-w-4xl space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the OrganicFreshMeat website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on OrganicFreshMeat's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Disclaimer
              </h2>
              <p>
                The materials on OrganicFreshMeat's website are provided for informational purposes. OrganicFreshMeat does not warrant or make any representations concerning the accuracy, likely results, or reliability of the information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Order Policy
              </h2>
              <p>
                All orders are subject to acceptance and confirmation. We reserve the right to refuse or cancel any order. We guarantee freshness within 24 hours and offer a full refund if you're not satisfied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Limitation of Liability
              </h2>
              <p>
                In no event shall OrganicFreshMeat or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on OrganicFreshMeat's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Modifications
              </h2>
              <p>
                OrganicFreshMeat may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Chennai.
              </p>
            </section>

            <div className="bg-sage-50 p-6 rounded-lg mt-8">
              <p className="text-gray-600 text-sm">
                For questions about these Terms of Service, please contact organicfreshmeat26@gmail.com
              </p>
            </div>

            <p className="text-gray-600 text-sm mt-12">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
