"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const BOT_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hello! 👋 Welcome to Organic Meat Shop. How can I help you today?",
    "Hi there! 🥩 Looking for fresh organic meat? I'm here to help!",
  ],
  products: [
    "We offer premium grass-fed chicken, mutton, and fish. All from certified organic farms with same-day delivery! Would you like to know more about any specific product?",
    "Our products include: Organic Chicken, Organic Mutton, and Fresh Fish. All antibiotic-free and hormone-free. Want to browse our products?",
  ],
  delivery: [
    "We offer same-day delivery in Coimbatore! Free delivery on orders above ₹500 after discount. 🚚",
    "Delivery is FREE on orders above ₹500 (after applying promo code). Orders typically arrive within 24 hours.",
  ],
  promo: [
    "We have amazing promo codes! Try: WELCOME10 (10% off), FRESH20 (20% off), or ORGANIC15 (15% off) 🎉",
    "Use promo codes to get discounts! Popular ones: WELCOME10, FRESH20, ORGANIC15, FIRST50, SAVE100",
  ],
  subscription: [
    "Subscribe & Save 20%! Get regular deliveries of your favorite organic meat. Perfect for families. 📦",
    "Our subscription service saves you 20% on every order. Never run out of fresh organic meat!",
  ],
  payment: [
    "We accept Razorpay and Stripe for secure payments. All transactions are encrypted. 🔒",
    "Payment methods: Credit/Debit Card (via Razorpay or Stripe), secure and instant processing.",
  ],
  contact: [
    "You can reach us through the Contact page or call our support team. We're here to help! 📞",
    "Have questions? Visit our Contact page or reach out via email. We respond within 24 hours.",
  ],
  help: [
    "I can help with: Products, Delivery, Promo Codes, Subscription, Payments, or Contact info. What would you like to know?",
    "Need help with: 🛍️ Products • 🚚 Delivery • 🎟️ Promos • 📦 Subscription • 💳 Payment • 📞 Contact?",
  ],
};

const KEYWORDS: Record<string, keyof typeof BOT_RESPONSES> = {
  hello: "greeting",
  hi: "greeting",
  hey: "greeting",
  product: "products",
  meat: "products",
  chicken: "products",
  fish: "products",
  mutton: "products",
  delivery: "delivery",
  shipping: "delivery",
  ship: "delivery",
  promo: "promo",
  discount: "promo",
  code: "promo",
  subscribe: "subscription",
  subscription: "subscription",
  payment: "payment",
  pay: "payment",
  card: "payment",
  contact: "contact",
  call: "contact",
  email: "contact",
  help: "help",
  support: "help",
};

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Find matching keyword
  for (const [keyword, category] of Object.entries(KEYWORDS)) {
    if (lowerMessage.includes(keyword)) {
      const responses = BOT_RESPONSES[category];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default response
  return "That's a great question! 🤔 I can help you with: Products • Delivery • Promos • Subscription • Payment • Contact info. What would you like to know more about?";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm OrganiMeat Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

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
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col h-[500px] border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-sage-600 to-fresh-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">OrganiMeat Assistant</h3>
            <p className="text-sm text-sage-100">We typically reply instantly</p>
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

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-4 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-fresh-600 hover:bg-fresh-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
