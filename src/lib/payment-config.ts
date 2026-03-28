// Payment gateway configuration for multiple payment methods

export const PAYMENT_METHODS = {
  STRIPE: "stripe",
  RAZORPAY: "razorpay",
  PAYPAL: "paypal",
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

export interface PaymentConfig {
  method: PaymentMethod;
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "completed" | "failed";
  error?: string;
}

// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  secretKey: process.env.STRIPE_SECRET_KEY || "",
};

// PayPal Configuration (optional)
export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
};

// Available payment options based on environment
export const AVAILABLE_PAYMENT_METHODS = [
  {
    id: PAYMENT_METHODS.RAZORPAY,
    name: "Razorpay",
    description: "UPI, Cards, Wallets, Bank Transfer",
    icon: "💳",
    methods: ["UPI", "Credit Card", "Debit Card", "Google Pay", "Apple Pay", "PhonePe", "Paytm"],
    enabled: !!RAZORPAY_CONFIG.keyId,
  },
  {
    id: PAYMENT_METHODS.STRIPE,
    name: "Stripe",
    description: "International Cards & Bank Transfers",
    icon: "🌍",
    methods: ["Visa", "Mastercard", "American Express", "Bank Transfer"],
    enabled: !!STRIPE_CONFIG.publishableKey,
  },
  {
    id: PAYMENT_METHODS.PAYPAL,
    name: "PayPal",
    description: "PayPal Wallet & Credit Cards",
    icon: "🅿️",
    methods: ["PayPal Wallet", "Credit Cards", "Bank Accounts"],
    enabled: !!PAYPAL_CONFIG.clientId,
  },
];
