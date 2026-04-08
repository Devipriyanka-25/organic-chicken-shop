"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "general",
    rating: 0,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          feedbackType: "general",
          rating: 0,
          message: "",
        });
        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-sage-50 to-fresh-50">
          <div className="container-responsive">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Share Your Feedback
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              We value your opinions and suggestions! Your feedback helps us improve our products and services.
            </p>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-12 md:py-20">
          <div className="container-responsive">
            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-900 mb-2">
                    Thank You for Your Feedback!
                  </h2>
                  <p className="text-green-700 mb-4">
                    We appreciate your input and will use it to improve our service.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                  {/* Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500"
                    />
                  </div>

                  {/* Feedback Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Feedback Type *
                    </label>
                    <select
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500"
                    >
                      <option value="general">General Feedback</option>
                      <option value="product">Product Quality</option>
                      <option value="delivery">Delivery & Packaging</option>
                      <option value="service">Customer Service</option>
                      <option value="website">Website Experience</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Rating (Optional)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="transition transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {formData.rating > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Your rating: {formData.rating} out of 5 stars
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Feedback / Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please share your thoughts, suggestions, or concerns..."
                      rows={6}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500 resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-fresh-600 hover:bg-fresh-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-sage-50">
          <div className="container-responsive">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  What will you do with my feedback?
                </h3>
                <p className="text-gray-600">
                  We carefully review all feedback and use it to improve our products, services, and customer experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Will I receive a response?
                </h3>
                <p className="text-gray-600">
                  For complaints or issues, our team will reach out to you via email within 24-48 hours.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Is my information confidential?
                </h3>
                <p className="text-gray-600">
                  Yes, your personal information is kept confidential and used only to address your feedback.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Can I give feedback anonymously?
                </h3>
                <p className="text-gray-600">
                  We prefer to have your contact information to follow up, but you can use a generic email if needed.
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
