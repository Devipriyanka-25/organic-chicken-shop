"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store";

export default function FeaturedProducts() {
  const addItem = useCartStore((state) => state.addItem);
  const featured = PRODUCTS.slice(0, 6); // Show first 6 products

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Featured Organic Meats</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Handpicked premium cuts from our certified organic farms. All meat is fresh, antibiotic-free, and delivered within 24 hours.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 card-hover group"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {/* Product emoji display */}
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-sage-50 to-fresh-50 group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 right-3 badge">
                    {product.badge}
                  </div>
                )}

                {/* Tag */}
                <div className="absolute top-3 left-3 bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Category & Certifications */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-xs bg-fresh-100 text-fresh-700 px-2 py-1 rounded">
                      {cert}
                    </span>
                  ))}
                  {product.certifications.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      +{product.certifications.length - 2}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Farm Origin */}
                <p className="text-xs text-sage-600 mb-4 flex items-center gap-1">
                  📍 {product.farmOrigin}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-gray-500">{product.unit}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-fresh-600 hover:bg-fresh-700 text-white p-3 rounded-lg transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/products">
            <button className="btn-outline">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
