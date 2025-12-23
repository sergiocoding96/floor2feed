import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D4A574",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://floor2feed.com"),
  title: {
    default: "Floor2Feed | AI-Powered Real Estate Marketing for Developers",
    template: "%s | Floor2Feed",
  },
  description:
    "Transform floor plans into 24-36 months of social media content. AI-powered marketing for Spanish real estate developers building €300k-€700k properties.",
  keywords: [
    "real estate marketing",
    "AI social media",
    "property development",
    "Costa del Sol",
    "Spain developers",
    "real estate AI",
    "property marketing",
    "social media management",
    "floor plan marketing",
    "real estate content",
  ],
  authors: [{ name: "Floor2Feed" }],
  creator: "Floor2Feed",
  publisher: "Floor2Feed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://floor2feed.com",
    siteName: "Floor2Feed",
    title: "Floor2Feed | AI-Powered Real Estate Marketing",
    description:
      "From groundbreaking to sold out—automated marketing for serious developers. Transform floor plans into professional social media content.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Floor2Feed - AI-Powered Real Estate Marketing",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floor2Feed | AI-Powered Real Estate Marketing",
    description: "Transform floor plans into sold-out success",
    images: ["/twitter-image.jpg"],
    creator: "@floor2feed",
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  category: "technology",
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://floor2feed.com/#organization",
      name: "Floor2Feed",
      url: "https://floor2feed.com",
      logo: {
        "@type": "ImageObject",
        url: "https://floor2feed.com/logo.png",
        width: 200,
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@floor2feed.com",
        areaServed: ["ES", "PT", "FR", "IT"],
        availableLanguage: ["English", "Spanish"],
      },
      sameAs: [
        "https://instagram.com/floor2feed",
        "https://linkedin.com/company/floor2feed",
        "https://youtube.com/@floor2feed",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://floor2feed.com/#website",
      url: "https://floor2feed.com",
      name: "Floor2Feed",
      description: "AI-Powered Real Estate Marketing for Developers",
      publisher: {
        "@id": "https://floor2feed.com/#organization",
      },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "Service",
      "@id": "https://floor2feed.com/#service",
      name: "AI-Powered Real Estate Marketing",
      provider: {
        "@id": "https://floor2feed.com/#organization",
      },
      description:
        "Transform floor plans into 24-36 months of professional social media content. AI renders, videos, VR tours, and monthly content management for real estate developers.",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 40.4168,
          longitude: -3.7038,
        },
        geoRadius: "2000",
      },
      serviceType: "Real Estate Marketing",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
        priceRange: "€€€",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://floor2feed.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can you create content without visiting our construction site?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our AI technology generates photorealistic renders and visualizations directly from your architectural floor plans. We combine these with Google Earth imagery for location context.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to receive the initial deliverables?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "From receiving your floor plans, we typically deliver your complete initial package within 7 days, including AI renders, property video, VR tour, and the first month's social media content.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-pearl text-midnight">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
