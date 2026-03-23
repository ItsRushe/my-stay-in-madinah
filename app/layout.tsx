import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "My Stay in Madinah | Premium Direct Booking",
  description: "Premium direct-booking accommodation in Madinah.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* ADDED 'Cairo' FONT FOR PREMIUM ARABIC TYPOGRAPHY */}
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      
      <body suppressHydrationWarning className="font-jost bg-ivory text-ink antialiased selection:bg-gold selection:text-white">
        
        {/* Hidden Translation Engine Element */}
        <div id="google_translate_element"></div>
        
        {/* Load Google Translate Engine */}
        <Script id="google-translate-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ar,ru',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />

        {children}
      </body>
    </html>
  );
}