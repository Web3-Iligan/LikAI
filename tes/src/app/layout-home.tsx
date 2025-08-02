import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "LikAI - AI-Powered Aquaculture Biosecurity | Prevent Disease Outbreaks & Boost Shrimp Farm Profits",
  description:
    "Transform your shrimp farm with LikAI's AI-driven biosecurity platform. Prevent costly disease outbreaks, optimize yields, and save up to 75% on operational costs. BFAR GAqP aligned. Start your free analysis today.",
  keywords:
    "aquaculture biosecurity, AI shrimp farming, fish farm management, disease prevention aquaculture, water quality monitoring, shrimp farm optimization, BFAR GAqP compliance, aquaculture technology Philippines, farm disease outbreak prevention, AI aquaculture solutions",
  authors: [{ name: "LikAI Team" }],
  creator: "LikAI",
  publisher: "LikAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://likai.ai",
    title: "LikAI - AI-Powered Aquaculture Biosecurity Platform",
    description:
      "Prevent disease outbreaks and boost shrimp farm profits with AI-driven biosecurity. Save up to 75% on operational costs. BFAR GAqP aligned.",
    siteName: "LikAI",
    images: [
      {
        url: "https://likai.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LikAI Dashboard - AI-Powered Aquaculture Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LikAI - AI-Powered Aquaculture Biosecurity Platform",
    description:
      "Prevent disease outbreaks and boost shrimp farm profits with AI-driven biosecurity solutions.",
    creator: "@LikAI",
    images: ["https://likai.ai/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://likai.ai",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
