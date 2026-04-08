"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { isValidEmail, isValidPhoneNumber } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill all required fields");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    // Here you would send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 bg-sage-50 border-b border-gray-200">
          <div className="container-responsive">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Have questions? We're here to help! Reach out to our team for any inquiries about our products, services, or anything else.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-responsive py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="bg-sage-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-fresh-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Phone</h3>
              <a href="tel:+919655737796" className="text-fresh-600 hover:text-fresh-700 font-semibold">
                +91 96557 37796
              </a>
              <p className="text-sm text-gray-600 mt-2">Available 9am - 6pm IST</p>
            </div>

            <div className="bg-sage-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-fresh-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Email</h3>
              <a href="mailto:organicfreshmeat26@gmail.com" className="text-fresh-600 hover:text-fresh-700 font-semibold">
                organicfreshmeat26@gmail.com
              </a>
              <p className="text-sm text-gray-600 mt-2">We'll reply within 24 hours</p>
            </div>

            <div className="bg-sage-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-fresh-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Location</h3>
              <p className="text-gray-700 font-semibold">No 2 Vinayagat Kovil Street</p>
              <p className="text-sm text-gray-600">Masakalipalayam, Coimbatore - 641015</p>
              <p className="text-sm text-gray-600 mt-2">Serving across Tamil Nadu with same-day delivery</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-800 font-semibold mb-2">✓ Message Sent Successfully!</p>
                  <p className="text-green-700">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fresh-600"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fresh-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fresh-600"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fresh-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-issue">Order Issue</option>
                      <option value="delivery">Delivery Problems</option>
                      <option value="subscription">Subscription Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="business">Business Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fresh-600 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
