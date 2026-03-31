"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
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
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

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

  const handlePhoneLogin = async () => {
    if (!phoneNumber) {
      setErrors({ phone: "Phone number is required" });
      return;
    }
    
    if (phoneNumber.length !== 10) {
      setErrors({ phone: "Please enter a valid 10-digit phone number" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/phone-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ phone: data.error || "Failed to send OTP" });
        setLoading(false);
        return;
      }

      setShowOtpInput(true);
      setErrors({});
    } catch (error) {
      setErrors({ phone: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ otp: data.error || "Invalid OTP" });
        setLoading(false);
        return;
      }

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      });

      setSubmitted(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setErrors({ otp: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
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
                <>
                  {/* Login Method Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setLoginMethod("email");
                        setShowOtpInput(false);
                        setOtp("");
                        setPhoneNumber("");
                        setErrors({});
                      }}
                      className={`pb-2 px-4 font-semibold transition ${
                        loginMethod === "email"
                          ? "text-fresh-600 border-b-2 border-fresh-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Email
                    </button>
                    <button
                      onClick={() => {
                        setLoginMethod("phone");
                        setFormData({ email: "", password: "" });
                        setErrors({});
                      }}
                      className={`pb-2 px-4 font-semibold transition ${
                        loginMethod === "phone"
                          ? "text-fresh-600 border-b-2 border-fresh-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Phone
                    </button>
                  </div>

                  {loginMethod === "email" ? (
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
                    <Link href="/forgot-password" className="text-sm text-fresh-600 hover:text-fresh-700">
                      Forgot password?
                    </Link>
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
                      onClick={handleGoogleLogin}
                      className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                    >
                      Phone OTP
                    </button>
                  </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* Error Message */}
                      {errors.phone && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-800 text-sm">{errors.phone}</p>
                        </div>
                      )}
                      {errors.otp && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-800 text-sm">{errors.otp}</p>
                        </div>
                      )}

                      {!showOtpInput ? (
                        <>
                          {/* Phone Number Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Phone Number
                            </label>
                            <div className="flex gap-2">
                              <div className="flex items-center bg-gray-100 px-3 rounded-lg border border-gray-300">
                                <span className="text-gray-700 font-semibold">🇮🇳 +91</span>
                              </div>
                              <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
                                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                                }}
                                placeholder="9876543210"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500"
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handlePhoneLogin}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? "Sending OTP..." : "Send OTP"}
                          </button>
                        </>
                      ) : (
                        <>
                          {/* OTP Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Enter OTP
                            </label>
                            <p className="text-xs text-gray-600 mb-3">
                              We've sent a 6-digit OTP to +91{phoneNumber}
                            </p>
                            <input
                              type="text"
                              value={otp}
                              onChange={(e) => {
                                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                                if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
                              }}
                              placeholder="000000"
                              maxLength={6}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500 text-center text-2xl tracking-widest"
                            />
                            {errors.otp && (
                              <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handleOtpSubmit}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? "Verifying..." : "Verify OTP"}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setShowOtpInput(false);
                              setOtp("");
                              setPhoneNumber("");
                              setErrors({});
                            }}
                            className="w-full py-2 text-gray-600 hover:text-gray-900 transition"
                          >
                            Change Phone Number
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </>
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
      <ChatBot />
    </>
  );
}
