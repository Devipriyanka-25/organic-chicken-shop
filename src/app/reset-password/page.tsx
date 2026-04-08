"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff, Lock } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!token) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-sage-50 to-fresh-50 py-12">
          <div className="container-responsive flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <p className="text-red-600 font-semibold mb-4">Invalid or Missing Token</p>
                <p className="text-gray-600 mb-6">
                  The password reset link is invalid or has expired. Please try again.
                </p>
                <Link href="/forgot-password" className="text-fresh-600 hover:text-fresh-700 font-semibold">
                  Request New Link
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Failed to reset password" });
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-fresh-100 rounded-full mb-4">
                  <Lock className="w-6 h-6 text-fresh-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Password</h1>
                <p className="text-gray-600 mt-2">
                  Enter your new password below.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-800 font-semibold mb-2">✓ Password Reset Successful!</p>
                  <p className="text-green-700 text-sm">
                    Your password has been updated. You can now log in with your new password.
                  </p>
                  <p className="text-green-700 text-xs mt-2">
                    Redirecting to login...
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

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) {
                            setErrors((prev) => ({ ...prev, password: "" }));
                          }
                        }}
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) {
                            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                          }
                        }}
                        placeholder="••••••"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                          errors.confirmPassword
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-fresh-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ResetPasswordLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-fresh-50 py-12">
        <div className="container-responsive flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
