import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCreator?: string;
  canonical?: string;
  noindex?: boolean;
}

export function SEO({
  title = "LikAI - AI-Powered Aquaculture Biosecurity Platform",
  description = "Transform your shrimp farm with LikAI's AI-driven biosecurity platform. Prevent costly disease outbreaks, optimize yields, and save up to 75% on operational costs. BFAR GAqP aligned.",
  keywords = "aquaculture biosecurity, AI shrimp farming, fish farm management, disease prevention aquaculture, water quality monitoring, shrimp farm optimization, BFAR GAqP compliance, aquaculture technology Philippines, farm disease outbreak prevention, AI aquaculture solutions",
  image = "https://likai.ai/og-image.jpg",
  url = "https://likai.ai",
  type = "website",
  siteName = "LikAI",
  locale = "en_US",
  twitterCreator = "@LikAI",
  canonical,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic Meta Tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", "LikAI Team");
    setMetaTag("creator", "LikAI");
    setMetaTag("publisher", "LikAI");
    setMetaTag("generator", "Vite + React");

    // Robots
    setMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    // Open Graph
    setMetaTag("og:type", type, true);
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:site_name", siteName, true);
    setMetaTag("og:locale", locale, true);
    setMetaTag("og:image:width", "1200", true);
    setMetaTag("og:image:height", "630", true);
    setMetaTag(
      "og:image:alt",
      "LikAI Dashboard - AI-Powered Aquaculture Management",
      true
    );

    // Twitter
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:creator", twitterCreator);

    // Additional Meta Tags
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("theme-color", "#FF7F50");
    setMetaTag("apple-mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-status-bar-style", "default");
    setMetaTag(
      "google-site-verification",
      "your-google-site-verification-code"
    );

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    siteName,
    locale,
    twitterCreator,
    canonical,
    noindex,
  ]);

  return null;
}
