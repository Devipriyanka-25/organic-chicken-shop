import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Font configurations
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OrganiMeat - Fresh Organic Meat Delivery | Farm to Table",
  description: "Premium organic, grass-fed, and free-range meat delivered fresh to your doorstep in Tamil Nadu. Order online with same-day delivery, QR code traceability, and subscription plans.",
  keywords: ["organic meat", "grass-fed chicken", "fresh meat delivery", "Tamil Nadu", "farm to table", "subscription service"],
  authors: [{ name: "OrganiMeat" }],
  openGraph: {
    type: "website",
    url: "https://organmeat.com",
    title: "OrganiMeat - Fresh Organic Meat Delivery",
    description: "Premium organic meat from certified farms, delivered fresh to your door",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrganiMeat - Fresh Organic Meat Delivery",
    description: "Premium organic meat from certified farms",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

// Font configurations
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "OrganiMeat - Fresh Organic Meat Delivery | Farm to Table",
  description: "Premium organic, grass-fed, and free-range meat delivered fresh to your doorstep in Tamil Nadu. Order online with same-day delivery, QR code traceability, and subscription plans.",
  keywords: ["organic meat", "grass-fed chicken", "fresh meat delivery", "Tamil Nadu", "farm to table", "subscription service"],
  authors: [{ name: "OrganiMeat" }],
  openGraph: {
    type: "website",
    url: "https://organmeat.com",
    title: "OrganiMeat - Fresh Organic Meat Delivery",
    description: "Premium organic meat from certified farms, delivered fresh to your door",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrganiMeat - Fresh Organic Meat Delivery",
    description: "Premium organic meat from certified farms",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <ChatBotWrapper />
      </body>
    </html>
  );
}
