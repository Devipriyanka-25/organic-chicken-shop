"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEMO_ORDERS, TRACKING_STEPS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function TrackingPage() {
  const [selectedOrderId, setSelectedOrderId] = useState(DEMO_ORDERS[0].id);
  const order = DEMO_ORDERS.find((o) => o.id === selectedOrderId) || DEMO_ORDERS[0];

  const currentStatusIndex = TRACKING_STEPS.findIndex((s) => s.key === order.status);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-8 md:py-12 bg-sage-50 border-b border-gray-200">
          <div className="container-responsive">
            <h1 className="text-4xl font-bold text-gray-900">Track Your Order</h1>
            <p className="text-gray-600 mt-2">
              Follow the journey of your fresh organic meat from farm to your doorstep
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-responsive py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Orders</h2>
              <div className="space-y-3">
                {DEMO_ORDERS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOrderId(o.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      selectedOrderId === o.id
                        ? "border-fresh-600 bg-fresh-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{o.id}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(o.createdAt)}
                    </p>
                    <p className="text-sm font-semibold text-sage-600 mt-1">
                      {o.status.replace("_", " ").toUpperCase()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Tracking */}
            <div className="lg:col-span-2">
              {/* Order Details */}
              <div className="bg-sage-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Order {order.id}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold text-gray-900">{order.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time</p>
                    <p className="font-semibold text-gray-900">{order.deliveryTime}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Steps */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Delivery Status
                </h3>

                <div className="space-y-6">
                  {TRACKING_STEPS.map((step, idx) => (
                    <div key={step.key} className="flex gap-4">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            idx <= currentStatusIndex
                              ? "bg-fresh-600"
                              : "bg-gray-300"
                          }`}
                        >
                          {idx <= currentStatusIndex ? "✓" : idx + 1}
                        </div>
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div
                            className={`w-1 h-12 my-2 ${
                              idx < currentStatusIndex ? "bg-fresh-600" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-semibold ${
                            idx <= currentStatusIndex
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {step.description}
                        </p>
                        {idx === currentStatusIndex && (
                          <p className="text-sm text-fresh-600 font-semibold mt-2">
                            Current Status
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.unit} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
