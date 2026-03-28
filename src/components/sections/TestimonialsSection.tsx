"use client";

import { TESTIMONIALS } from "@/lib/data";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-sage-50">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Loved by Our Customers</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            See what thousands of happy customers are saying about their organic meat from OrganiMeat
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-sage-600">4.9/5</p>
            <p className="text-sm text-gray-600 mt-1">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage-600">99.2%</p>
            <p className="text-sm text-gray-600 mt-1">Satisfied Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage-600">48hrs</p>
            <p className="text-sm text-gray-600 mt-1">Average Delivery</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage-600">100%</p>
            <p className="text-sm text-gray-600 mt-1">Organic Verified</p>
          </div>
        </div>
      </div>
    </section>
  );
}
