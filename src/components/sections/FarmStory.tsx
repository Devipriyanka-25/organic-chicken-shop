"use client";

import { Leaf, Zap, Truck, QrCode } from "lucide-react";

export default function FarmStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="section-heading">Our Farm-to-Table Story</h2>
            <p className="text-lg text-gray-600">
              We partner directly with certified organic farms across Tamil Nadu to bring you the freshest, highest-quality meat available. Every step of the process is transparent and traceable.
            </p>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-fresh-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Organic Farming</h3>
                  <p className="text-gray-600">
                    All animals are raised in pasture farms without antibiotics, hormones, or artificial feeds
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-fresh-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">QR Code Traceability</h3>
                  <p className="text-gray-600">
                    Scan the QR code on your meat to see exact farm origin, certifications, and farming practices
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-fresh-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Expert Processing</h3>
                  <p className="text-gray-600">
                    Hygienic processing facility with temperature-controlled environment ensuring peak freshness
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-fresh-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-fresh-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Cold-Chain Delivery</h3>
                  <p className="text-gray-600">
                    Refrigerated vehicles ensure meat arrives at your door within 24 hours at optimal temperature
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-sage-100 to-fresh-100 rounded-2xl p-8 h-96 flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl">🪴</div>
              <p className="text-lg font-semibold text-sage-700 text-center">
                Organic Farms
              </p>
              <div className="w-1 h-8 bg-sage-300"></div>
              <div className="text-6xl">✂️</div>
              <p className="text-lg font-semibold text-sage-700 text-center">
                Processing
              </p>
              <div className="w-1 h-8 bg-sage-300"></div>
              <div className="text-6xl">❄️</div>
              <p className="text-lg font-semibold text-sage-700 text-center">
                Cold-Chain
              </p>
              <div className="w-1 h-8 bg-sage-300"></div>
              <div className="text-6xl">🏠</div>
              <p className="text-lg font-semibold text-sage-700 text-center">
                Your Dinner Table
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
