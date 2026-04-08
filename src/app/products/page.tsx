"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore, useFilterStore } from "@/store";

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const { selectedCategory, priceRange, selectedCertifications, setCategory, setPriceRange, setCertifications } = useFilterStore();
  const [showFilters, setShowFilters] = useState(true);

  // Filter products based on selected criteria
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const certMatch =
        selectedCertifications.length === 0 ||
        selectedCertifications.some((cert) => product.certifications.includes(cert as any));

      return categoryMatch && priceMatch && certMatch;
    });
  }, [selectedCategory, priceRange, selectedCertifications]);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "chicken", label: "🐔 Chicken" },
    { id: "mutton", label: "🐑 Mutton & Lamb" },
    { id: "fish", label: "🐟 Fish" },
    { id: "specialties", label: "✨ Specialties" },
  ];

  const certifications = ["Organic", "Grass-fed", "Free-range", "Sustainable", "Biodynamic"];

  // Only show certifications for meat products, not fish
  const showCertifications = selectedCategory !== "fish" && selectedCategory !== "all";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-8 md:py-12 bg-sage-50 border-b border-gray-200">
          <div className="container-responsive">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Premium Organic Meat</h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-responsive py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            {showFilters && (
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setCategory(cat.id);
                            // Reset certifications when category changes (fish doesn't need meat certifications)
                            if (cat.id === "fish" || cat.id === "all") {
                              setCertifications([]);
                            }
                          }}
                          className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                            selectedCategory === cat.id
                              ? "bg-fresh-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>

                  {/* Certification Filter - Only for meat products */}
                  {showCertifications && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Certifications</h3>
                      <div className="space-y-2">
                        {certifications.map((cert) => (
                          <label key={cert} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCertifications.includes(cert)}
                              className="w-4 h-4 rounded accent-fresh-600"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCertifications([...selectedCertifications, cert]);
                                } else {
                                  setCertifications(selectedCertifications.filter(c => c !== cert));
                                }
                              }}
                            />
                            <span className="text-gray-700">{cert}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden mb-6 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-sage-50 to-fresh-50 flex items-center justify-center text-5xl">
                        {product.emoji}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {product.description}
                        </p>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.certifications.map((cert, idx) => (
                            <span key={idx} className="text-xs bg-fresh-100 text-fresh-700 px-2 py-1 rounded">
                              {cert}
                            </span>
                          ))}
                        </div>

                        {/* Farm & Freshness */}
                        <div className="text-xs text-sage-600 mb-4 space-y-1">
                          <p>📍 {product.farmOrigin}</p>
                          <p>⏱️ {product.freshness}</p>
                        </div>

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
                            className="bg-fresh-600 hover:bg-fresh-700 text-white p-3 rounded-lg transition"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <button
                    onClick={() => {
                      setCategory("all");
                      setPriceRange([0, 1000]);
                    }}
                    className="btn-outline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
