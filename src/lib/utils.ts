import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine classnames using clsx and tailwind-merge
 * Useful for merging tailwind CSS classes while avoiding conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `OMO-${timestamp}${randomStr}`;
}

/**
 * Format currency for Indian rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to readable format
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(originalPrice: number, discountPercentage: number): number {
  return Math.round(originalPrice * (discountPercentage / 100));
}

/**
 * Get discount price
 */
export function getDiscountedPrice(originalPrice: number, discountPercentage: number): number {
  return originalPrice - calculateDiscount(originalPrice, discountPercentage);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
}

/**
 * Validate Indian postal code
 */
export function isValidPincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
}

/**
 * Generate cart total with tax calculation
 */
export function calculateTotal(items: Array<{ price: number; quantity: number }>, taxPercentage = 5): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * (taxPercentage / 100));
  return subtotal + tax;
}

/**
 * Format product name for URL slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get delivery time estimate based on current time
 */
export function getDeliveryTimeSlots(): string[] {
  const slots = [];
  const now = new Date();
  const hours = now.getHours();

  if (hours < 10) {
    slots.push("Morning (6am–9am)");
    slots.push("Afternoon (11am–2pm)");
    slots.push("Evening (5pm–8pm)");
  } else if (hours < 14) {
    slots.push("Afternoon (11am–2pm)");
    slots.push("Evening (5pm–8pm)");
    slots.push("Tomorrow Morning (6am–9am)");
  } else {
    slots.push("Evening (5pm–8pm)");
    slots.push("Tomorrow Morning (6am–9am)");
    slots.push("Tomorrow Afternoon (11am–2pm)");
  }

  return slots;
}

/**
 * Truncate text to specific length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Get rating stars display
 */
export function getStarEmoji(rating: number): string {
  const stars = "⭐".repeat(Math.floor(rating));
  return stars;
}

/**
 * Format time ago from timestamp
 */
export function timeAgo(timestamp: string | Date): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

// Development/Debug utility
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
