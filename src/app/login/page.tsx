"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { useUserStore } from "@/store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Login failed" });
        setLoading(false);
        return;
      }

      // Store user in Zustand store
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      });

      setSubmitted(true);
      
      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-fresh-50 py-12">
        <div className="container-responsive flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                <p className="text-gray-600 mt-2">
                  Sign in to your OrganiMeat account
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-800 font-semibold mb-2">✓ Login Successful!</p>
                  <p className="text-green-700 text-sm">
                    Redirecting to your account...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm">{errors.submit}</p>
                    </div>
                  )}
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-fresh-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-fresh-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-fresh-600"
                      />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-fresh-600 hover:text-fresh-700">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Sign In */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                    >
                      Phone
                    </button>
                  </div>
                </form>
              )}

              {/* Footer */}
              <p className="text-center text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link href="/signup" className="text-fresh-600 hover:text-fresh-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700 italic mb-4">
                "OrganiMeat makes it so easy to get fresh, organic meat delivered to my home. Highly recommended!"
              </p>
              <p className="font-semibold text-gray-900">- Devipriyanka</p>
              <p className="text-sm text-gray-600">Coimbatore</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
