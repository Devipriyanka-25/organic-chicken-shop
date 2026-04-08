// In-memory OTP storage (in production, use Redis or database)
const otpStorage: Record<string, { otp: string; expiresAt: number; userId?: string }> = {};

export function storeOTP(phone: string, otp: string, userId: string) {
  const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStorage[phone] = {
    otp,
    expiresAt: expiryTime,
    userId,
  };
  return expiryTime;
}

export function getOTP(phone: string) {
  return otpStorage[phone] || null;
}

export function verifyOTP(phone: string, otp: string): boolean {
  const stored = otpStorage[phone];
  if (!stored) return false;
  if (stored.expiresAt < Date.now()) return false;
  if (stored.otp !== otp) return false;
  delete otpStorage[phone]; // Clear OTP after verification
  return true;
}

export function deleteOTP(phone: string) {
  delete otpStorage[phone];
}
