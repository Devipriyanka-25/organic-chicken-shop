// Product Types
export type MeatCategory = "chicken" | "mutton" | "fish" | "specialties";
export type Certification = "Organic" | "Grass-fed" | "Free-range" | "Sustainable" | "Biodynamic" | "Wild-caught";

export interface Product {
  id: number;
  name: string;
  category: MeatCategory;
  description: string;
  price: number;
  unit: string;
  weight?: string;
  certifications: Certification[];
  farmOrigin: string;
  freshness: string; // e.g., "Fresh from farm - 24hrs"
  tag: string; // Premium, Regular, Special
  badge?: string; // Best Seller, Popular, New, Seasonal
  emoji: string;
  image: string;
  stock: number;
  qrCode?: string; // QR code for farm traceability
  nutrients?: {
    protein: string;
    fat: string;
    calories: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

// Order Types
export type OrderStatus = "confirmed" | "preparing" | "quality_check" | "out_for_delivery" | "delivered";
export type PaymentMethod = "upi" | "card" | "wallet" | "netbanking";
export type DeliveryType = "standard" | "sameDay" | "subscription";

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  deliveryTime: string;
  notes: string;
  items: CartItem[];
  total: number;
  discount?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  driver?: string;
  eta?: number; // in minutes
  latitude?: number;
  longitude?: number;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "completed" | "failed";
  trackingUrl?: string;
}

export interface TrackingStep {
  key: OrderStatus;
  label: string;
  description: string;
  icon: string;
  timestamp?: string;
}

// Subscription Types
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";
export type SubscriptionStatus = "active" | "paused" | "cancelled";

export interface SubscriptionItem {
  productId: number;
  quantity: number;
  optional?: boolean;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  frequency: SubscriptionFrequency;
  basePrice: number;
  discountPercentage: number;
  description: string;
  benefits: string[];
  items: SubscriptionItem[];
  popularBadge?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: number;
  status: SubscriptionStatus;
  startDate: string;
  nextDeliveryDate: string;
  customizations: SubscriptionItem[];
  totalSpent: number;
  paymentMethodId?: string;
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  name: string;
  address?: string;
  city?: string;
  pincode?: string;
  createdAt?: string;
  updatedAt?: string;
  isSubscribed?: boolean;
  subscriptions?: UserSubscription[];
  addresses?: Address[];
}

export interface Address {
  id: string;
  type: "home" | "office" | "other";
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

// Chat Types
export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface Chatbot {
  id: string;
  title: string;
  description: string;
  messages: ChatMessage[];
  isOpen: boolean;
}

// Feedback Types
export interface Feedback {
  id: string;
  userId: string;
  rating: number; // 1-5
  title: string;
  message: string;
  productId?: number;
  orderId?: string;
  images?: string[];
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

// Business Info
export interface BusinessInfo {
  name: string;
  description: string;
  registrationNumber: string;
  fssaiLicense: string;
  fssaiExpiry: string;
  certifications: {
    title: string;
    issuer: string;
    expiryDate: string;
    certificateUrl: string;
  }[];
  farms: {
    name: string;
    location: string;
    certifications: Certification[];
    description: string;
  }[];
  policies: {
    title: string;
    content: string;
  }[];
}

// Inventory Types
export interface InventoryItem {
  id: number;
  productId: number;
  quantity: number;
  lastRestocked: string;
  expiryDate?: string;
  farmLot?: string;
  qrCode?: string;
}

// Analytics / Demand Forecasting
export interface DemandForecast {
  productId: number;
  date: string;
  predictedDemand: number;
  actualDemand?: number;
  confidence: number; // 0-100%
}
