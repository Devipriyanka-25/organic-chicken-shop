"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Send, ChevronLeft } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "menu";
  timestamp: Date;
}

interface MenuOption {
  label: string;
  value: string;
  icon?: string;
}

const MAIN_MENU_OPTIONS: MenuOption[] = [
  { label: "🛍️ Products", value: "products", icon: "🛍️" },
  { label: "🚚 Delivery & Shipping", value: "delivery", icon: "🚚" },
  { label: "🎟️ Promo Codes", value: "promo", icon: "🎟️" },
  { label: "📦 Subscription Plans", value: "subscription", icon: "📦" },
  { label: "💳 Payment Methods", value: "payment", icon: "💳" },
  { label: "📞 Contact Us", value: "contact", icon: "📞" },
  { label: "⭐ Share Feedback", value: "feedback", icon: "⭐" },
];

const SUBMENU_OPTIONS: Record<string, MenuOption[]> = {
  products: [
    { label: "Organic Chicken", value: "chicken" },
    { label: "Organic Mutton", value: "mutton" },
    { label: "Fresh Fish", value: "fish" },
    { label: "View All Products", value: "all_products" },
  ],
  delivery: [
    { label: "Delivery Coverage", value: "coverage" },
    { label: "Shipping Costs", value: "shipping_cost" },
    { label: "Delivery Timeline", value: "timeline" },
    { label: "Track Order", value: "track" },
  ],
  promo: [
    { label: "Current Offers", value: "current_offers" },
    { label: "How to Apply Code", value: "apply_code" },
    { label: "Subscription Discount", value: "sub_discount" },
  ],
  subscription: [
    { label: "Subscribe & Save 20%", value: "save_20" },
    { label: "Subscription Plans", value: "plans" },
    { label: "How It Works", value: "how_it_works" },
  ],
  payment: [
    { label: "Payment Options", value: "payment_options" },
    { label: "Is it Secure?", value: "secure" },
    { label: "Refund Policy", value: "refund" },
  ],
  contact: [
    { label: "Call Us", value: "phone" },
    { label: "Email Us", value: "email" },
    { label: "Address", value: "address" },
  ],
};

const DETAILED_RESPONSES: Record<string, string> = {
  chicken: "Our premium grass-fed chicken is free from antibiotics and hormones. Available in different cuts - whole, pieces, and ground. ₹350-450 per kg. Order now for same-day delivery! 🐔",
  mutton: "High-quality organic mutton from certified farms. Rich in nutrients and perfect for traditional recipes. ₹450-550 per kg. Fresh stock available! 🐑",
  fish: "Fresh seasonal fish with guaranteed quality. Perfect for healthy meals. Prices vary by type. Check our products page for current availability! 🐟",
  all_products: "Browse our full range at the Products page. We have Chicken, Mutton, Fish, and specialty cuts. All certified organic! 🥩",
  
  coverage: "We deliver across Coimbatore city and nearby areas. Same-day delivery available for orders placed before 11 AM. 📍",
  shipping_cost: "FREE Delivery on orders above ₹500 (after discount). Orders below ₹500 have a ₹60 delivery charge. 🚚",
  timeline: "Most orders arrive within 24 hours of placement. Premium orders can be delivered same-day if ordered before 11 AM. ⏰",
  track: "You can track your order status from your account dashboard or via email updates. Real-time tracking for premium orders! 📲",
  
  current_offers: "🎉 WELCOME10 (10% off) • FRESH20 (20% off) • ORGANIC15 (15% off) • FIRST50 (₹50 off first order) • SAVE100 (₹100 off on ₹1000+)",
  apply_code: "Enter the promo code at checkout before making payment. Discount will be applied instantly! Some codes have minimum order requirements. 💰",
  sub_discount: "Subscribe to any plan and get an additional 20% off on all orders! Perfect for regular customers. Cancel anytime! 📦",
  
  save_20: "Subscribe and save 20% on every order! Get consistent supply of fresh organic meat without the hassle. 📦✨",
  plans: "We offer weekly, bi-weekly, and monthly subscription plans. Customize your order frequency and product preferences. Flexible and convenient! 📅",
  how_it_works: "1. Choose products 2. Select delivery frequency 3. Place order 4. Get automatic deliveries on schedule 5. Cancel anytime! 🔄",
  
  payment_options: "We accept: 💳 Credit/Debit Cards • 📱 UPI • 🏦 Bank Transfer. All payments processed via Razorpay & Stripe (PCI Compliant)",
  secure: "Yes! All transactions are 100% secure and encrypted. We use industry-standard payment gateways. Your data is safe with us. 🔒",
  refund: "Full refund within 7 days if you're not satisfied. No questions asked! Contact our support team for instant processing. ✅",
  
  phone: "📞 Call us at +91-XXX-XXXX-XXXX (Mon-Sat, 9 AM - 6 PM)",
  email: "📧 Email: organicfreshmeat26@gmail.com (Response within 24 hours)",
  address: "📍 OrganicFreshMeat Store, Coimbatore, Tamil Nadu. Visit us for bulk orders or queries!",
};

const BOT_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hello! 👋 Welcome to Organic Meat Shop. How can I help you today?",
    "Hi there! 🥩 Looking for fresh organic meat? I'm here to help!",
  ],
};

const KEYWORDS: Record<string, string> = {
  hello: "greeting",
  hi: "greeting",
  hey: "greeting",
};

export default function ChatBot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm OrganicFreshMeat Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Choose a category below or type your question:",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMenuClick = (menuValue: string) => {
    const selectedOption = MAIN_MENU_OPTIONS.find((opt) => opt.value === menuValue);
    if (selectedOption) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: selectedOption.label,
          sender: "user",
          timestamp: new Date(),
        },
      ]);

      // Handle feedback - navigate to feedback page
      if (menuValue === "feedback") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "📝 Redirecting you to our feedback form... Thank you for helping us improve!",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        
        // Navigate to feedback page after a short delay
        setTimeout(() => {
          router.push("/feedback");
        }, 800);
        return;
      }

      const submenu = SUBMENU_OPTIONS[menuValue];
      if (submenu) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: `Select what you'd like to know about ${selectedOption.label}:`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setCurrentMenu(menuValue);
      }
    }
  };

  const handleSubmenuClick = (submenuValue: string) => {
    const currentSubmenu = SUBMENU_OPTIONS[currentMenu || ""];
    const selectedOption = currentSubmenu?.find((opt) => opt.value === submenuValue);

    if (selectedOption) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: selectedOption.label,
          sender: "user",
          timestamp: new Date(),
        },
      ]);

      // Handle "View All Products" - navigate to products page
      if (submenuValue === "all_products") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "🛍️ Redirecting you to our Products page... Browse all our organic meat selections!",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        
        // Navigate to products page after a short delay
        setTimeout(() => {
          router.push("/products");
        }, 800);
        return;
      }

      const response = DETAILED_RESPONSES[submenuValue];
      
      // Show response immediately with loading state first
      setIsLoading(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: response || "Information not available. Please contact our support team.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 400);
    }
  };

  const handleBackToMain = () => {
    setCurrentMenu(null);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "Back to main menu",
        sender: "user",
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        text: "Choose a category below or type your question:",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const response =
        "Thanks for your message! 😊 Please use the menu options above for faster responses, or contact our support team at organicfreshmeat26@gmail.com for detailed inquiries.";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const displayOptions = currentMenu
    ? SUBMENU_OPTIONS[currentMenu]
    : MAIN_MENU_OPTIONS;

  return (
    <>
      {/* Chat Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-fresh-600 hover:bg-fresh-700 text-white rounded-full p-4 shadow-lg transition hover:shadow-xl"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col h-[600px] border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-sage-600 to-fresh-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">OrganiMeat Assistant</h3>
            <p className="text-sm text-sage-100">Click options or type for help</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-fresh-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Menu Options */}
            {displayOptions && displayOptions.length > 0 && !isLoading && (
              <div className="flex flex-col gap-2 mt-4">
                {displayOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      if (currentMenu) {
                        handleSubmenuClick(option.value);
                      } else {
                        handleMenuClick(option.value);
                      }
                    }}
                    className="w-full text-left px-3 py-2 bg-sage-50 hover:bg-sage-100 text-sage-900 rounded-lg transition border border-sage-200 text-sm font-medium"
                  >
                    {option.label}
                  </button>
                ))}

                {/* Back Button */}
                {currentMenu && (
                  <button
                    onClick={handleBackToMain}
                    className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition border border-gray-300 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Main Menu
                  </button>
                )}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-3 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500 disabled:bg-gray-100 text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-fresh-600 hover:bg-fresh-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
