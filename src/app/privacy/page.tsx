"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container-responsive py-12 md:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="max-w-4xl space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This includes your name, email address, phone number, mailing address, and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to process your orders, deliver products, send transactional emails, and improve our services. We may also use your information to send promotional emails, which you can opt out of at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Third-Party Sharing
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, update, or delete your personal information at any time by logging into your account or contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about our privacy policy, please contact us at hello@organmeat.com or call +91 44 2786 9999.
              </p>
            </section>

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
