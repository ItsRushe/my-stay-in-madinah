import "./globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { CurrencyProvider } from "../components/CurrencyProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mystayinmadinah.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "My Stay in Madinah | Premium Direct Booking — No Fees",
    template: "%s | My Stay in Madinah",
  },
  description:
    "Book premium boutique accommodation in Madinah directly with no platform fees. Guaranteed lowest rates, hotel-grade cleanliness, and a central location near the Prophet's Mosque.",
  keywords: [
    "Madinah accommodation",
    "stay in Madinah",
    "Madinah hotel",
    "direct booking Madinah",
    "visit Madinah accommodation",
    "Prophet's Mosque hotel",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "My Stay in Madinah",
    title: "My Stay in Madinah | Premium Direct Booking — No Fees",
    description:
      "Book premium boutique accommodation in Madinah directly with no platform fees. Guaranteed lowest rates near the Prophet's Mosque.",
    url: BASE_URL,
    images: [
      {
        url: "/room-1.jpg",
        width: 1600,
        height: 1076,
        alt: "Premium boutique room at My Stay in Madinah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Stay in Madinah | Premium Direct Booking — No Fees",
    description:
      "Book premium boutique accommodation in Madinah directly with no platform fees. Guaranteed lowest rates near the Prophet's Mosque.",
    images: ["/room-1.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "My Stay in Madinah",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon-logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "Arabic"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madinah",
        addressCountry: "SA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "My Stay in Madinah",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/rooms` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isArabic = locale === 'ar';

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>

      <body suppressHydrationWarning className="font-jost bg-ivory text-ink antialiased selection:bg-gold selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
