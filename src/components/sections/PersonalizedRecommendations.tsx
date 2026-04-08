"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCartStore } from "@/store";
import { formatCurrency } from "@/lib/utils";

export default function PersonalizedRecommendations() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  // Get personalized recommendations based on cart history
  const recommendations = useMemo(() => {
    if (items.length === 0) {
      // If no cart history, recommend top products
      return PRODUCTS.slice(0, 4);
    }

    // Get categories the user has added to cart
    const userCategories = new Set(items.map((item) => item.category));
    const viewedProductIds = new Set(items.map((item) => item.id));

    // Score products based on category match and certifications
    const scoredProducts = PRODUCTS.filter(
      (product) => !viewedProductIds.has(product.id)
    ).map((product) => {
      let score = 0;

      // Boost score for products in categories user has purchased from
      if (userCategories.has(product.category)) {
        score += 10;
      }

      // Boost score for premium/popular items
      if (product.badge === "Best Seller" || product.badge === "Popular") {
        score += 5;
      }

      // Boost score for organic/grass-fed certified items
      if (product.certifications.includes("Organic")) {
        score += 3;
      }
      if (product.certifications.includes("Grass-fed")) {
        score += 2;
      }

      // Boost score for items in stock
      if (product.stock > 0) {
        score += 2;
      }

      return { product, score };
    });

    // Sort by score and return top 4
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.product);
  }, [items]);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  const title =
    items.length === 0
      ? "🌟 Recommended For You"
      : "🎯 Recommended Based on Your Purchases";

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-sage-50 to-fresh-50">
      <div className="container-responsive">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            {items.length === 0
              ? "Start shopping to get personalized recommendations!"
              : "Products similar to your recent purchases"}
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-sage-50 to-fresh-50 flex items-center justify-center text-4xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-2 right-2 bg-fresh-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm flex-1">
                    {product.emoji} {product.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Certifications */}
                {product.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.certifications.slice(0, 2).map((cert) => (
                      <span
                        key={cert}
                        className="text-xs bg-sage-100 text-sage-900 px-2 py-1 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-fresh-600">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-gray-500">{product.unit}</p>
                  </div>
                  {product.stock > 0 ? (
                    <span className="text-xs text-green-600 font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-fresh-600 hover:bg-fresh-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>

                {/* View Details Link */}
                <Link
                  href={`/products?category=${product.category}`}
                  className="block text-center text-sm text-fresh-600 hover:text-fresh-700 mt-2"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No recommendations available yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-fresh-600 hover:bg-fresh-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
