import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - LikAI | AI-Powered Aquaculture Biosecurity Platform",
  description:
    "Create your free LikAI account. Access AI-powered biosecurity solutions for aquaculture farms. 100% free, no credit card required. Reduce disease risks and optimize farm health.",
  keywords:
    "aquaculture, biosecurity, AI, fish farming, disease prevention, farm management, water quality, risk assessment, aquaculture technology",
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
    url: "https://likai.ai/auth",
    title: "Sign Up - LikAI | AI-Powered Aquaculture Biosecurity",
    description:
      "Create your free LikAI account and access AI-powered biosecurity solutions for aquaculture farms. Start protecting your farm today.",
    siteName: "LikAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - LikAI | AI-Powered Aquaculture Biosecurity",
    description:
      "Create your free LikAI account and access AI-powered biosecurity solutions for aquaculture farms.",
    creator: "@LikAI",
  },
  alternates: {
    canonical: "https://likai.ai/auth",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
