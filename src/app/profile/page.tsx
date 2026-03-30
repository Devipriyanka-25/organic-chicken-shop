"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, User, Mail, Phone, MapPin, Edit2 } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const { user } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user, router, mounted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API endpoint to update user profile
    setIsEditing(false);
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container-responsive py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Header with Edit Button */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-600">Member since</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition border border-sage-200"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              {/* Profile Info */}
              {!isEditing ? (
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-sage-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  </div>
                  {formData.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-sage-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-gray-900 font-medium">
                          {formData.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {formData.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-sage-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="text-gray-900 font-medium">
                          {formData.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sage-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
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
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sage-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sage-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/order-history"
                  className="block px-4 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition"
                >
                  Order History
                </Link>
                <Link
                  href="/cart"
                  className="block px-4 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition"
                >
                  My Cart
                </Link>
                <Link
                  href="/subscription"
                  className="block px-4 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition"
                >
                  My Subscriptions
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="bg-sage-50 rounded-lg border border-sage-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Account Status</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your account is active and in good standing.
              </p>
              <button className="w-full text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition border border-red-200 font-semibold text-sm">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
