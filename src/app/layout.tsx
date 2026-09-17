import type { Metadata, Viewport } from "next";
import { Amiri, Cairo, Taviraj, Urbanist } from "next/font/google";
import { SiteProvider } from "@/providers";
import InteractionGuard from "@/components/InteractionGuard";
import { BRAND_LOGO_URL, FAVICON_URL, HERO_IMAGE_URL, SITE_URL } from "@/config/project";
import "./globals.css";

const taviraj = Taviraj({
  subsets: ["latin"],
  variable: "--font-serif-latin",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans-latin",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-serif-arabic",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-sans-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Wadeem Gardens",
  description:
    "Discover Wadeem Gardens, a new standard of luxury living in Abu Dhabi. Premium 3 to 6 bedroom residences with world-class amenities, flexible payment plans and stunning waterfront views.",
  icons: {
    icon: FAVICON_URL,
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
  },
  keywords: [
    "Wadeem Gardens",
    "Abu Dhabi luxury real estate",
    "premium residences Abu Dhabi",
    "luxury apartments Abu Dhabi",
    "waterfront living Abu Dhabi",
    "new launch Abu Dhabi",
    "off-plan property Abu Dhabi",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/?lang=ar",
    },
  },
  openGraph: {
    title: "Wadeem Gardens — Luxury Residences in Abu Dhabi",
    description:
      "A new standard of luxury living in Abu Dhabi. Premium 3 to 6 bedroom residences with world-class amenities.",
    type: "website",
    locale: "en_AE",
    alternateLocale: "ar_AE",
    siteName: "Wadeem Gardens",
    url: SITE_URL,
    images: [
      {
        url: HERO_IMAGE_URL,
        width: 1200,
        height: 675,
        alt: "Wadeem Gardens — A New Standard of Luxury Living in Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wadeem Gardens — Luxury Residences in Abu Dhabi",
    description:
      "A new standard of luxury living in Abu Dhabi. Premium 3 to 6 bedroom residences with world-class amenities.",
    images: [HERO_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${taviraj.variable} ${urbanist.variable} ${amiri.variable} ${cairo.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.mcpuae.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.mcpuae.com" />
        <link rel="preload" as="image" href={HERO_IMAGE_URL} fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              name: "Wadeem Gardens",
              description:
                "A new standard of luxury living in Abu Dhabi. Premium 3 to 6 bedroom residences.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Abu Dhabi",
                addressCountry: "AE",
              },
              offers: {
                "@type": "Offer",
                price: "5000000",
                priceCurrency: "AED",
                availability: "https://schema.org/PreOrder",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteProvider>
          <InteractionGuard />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}