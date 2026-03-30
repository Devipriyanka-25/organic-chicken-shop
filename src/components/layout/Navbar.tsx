"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useCartStore, useUserStore } from "@/store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      clearUser();
      router.push("/");
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-responsive flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥩</span>
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-sage-600 to-fresh-600 bg-clip-text text-transparent">
            OrganiMeat
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-gray-700 hover:text-sage-600 transition">
            Shop
          </Link>
          <Link href="/subscription" className="text-gray-700 hover:text-sage-600 transition">
            Subscribe
          </Link>
          <Link href="/tracking" className="text-gray-700 hover:text-sage-600 transition">
            Track Order
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-sage-600 transition">
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-fresh-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Auth Buttons / User Profile */}
          {user ? (
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition"
              >
                <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-semibold">{user.name}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      My Profile
                    </Link>
                    <Link href="/order-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-gray-700 font-semibold hover:text-sage-600 transition rounded-lg">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-responsive py-4 space-y-3">
            <Link href="/products" className="block py-2 text-gray-700 hover:text-sage-600">
              Shop
            </Link>
            <Link href="/subscription" className="block py-2 text-gray-700 hover:text-sage-600">
              Subscribe
            </Link>
            <Link href="/tracking" className="block py-2 text-gray-700 hover:text-sage-600">
              Track Order
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-sage-600">
              Contact
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-sage-600">
              About Us
            </Link>
            <Link href="/faq" className="block py-2 text-gray-700 hover:text-sage-600">
              FAQ
            </Link>
            <div className="pt-2 border-t border-gray-200 space-y-2">
              {user ? (
                <>
                  <div className="px-2 py-2 bg-sage-50 rounded">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block py-2 text-gray-700 hover:text-sage-600">
                    My Profile
                  </Link>
                  <Link href="/order-history" className="block py-2 text-gray-700 hover:text-sage-600">
                    Order History
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-2 text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 text-center text-gray-700 hover:text-sage-600 font-semibold">
                    Login
                  </Link>
                  <Link href="/signup" className="block btn-primary text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
