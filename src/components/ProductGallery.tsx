"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductGalleryProps {
  productName: string;
  mainImage: string;
  gallery?: string[];
  farmImages?: string[];
}

export default function ProductGallery({
  productName,
  mainImage,
  gallery = [],
  farmImages = [],
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Combine all images
  const allImages = [mainImage, ...gallery, ...(farmImages || [])];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    setSelectedImage(allImages[(currentIndex + 1) % allImages.length]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setSelectedImage(allImages[(currentIndex - 1 + allImages.length) % allImages.length]);
  };

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src={selectedImage}
              alt={productName}
              className="w-full h-full object-cover"
            />

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6v12h12v-4m3-9h4v4m0 0V6m0 0l-8 8"
                />
              </svg>
            </button>

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image, index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === image
                    ? "border-fresh-600"
                    : "border-gray-200 hover:border-fresh-400"
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Labels */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
          <div>🥩 Product</div>
          {gallery.length > 0 && <div>📦 Packaging</div>}
          {farmImages && farmImages.length > 0 && <div>🌾 From Farm</div>}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt={productName}
              className="max-w-full max-h-full object-contain"
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
