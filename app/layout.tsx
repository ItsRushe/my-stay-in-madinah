import "./globals.css";
import type { Metadata } from "next";

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
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      {/* Added suppressHydrationWarning to fix the browser extension error */}
      <body suppressHydrationWarning className="font-jost bg-ivory text-ink antialiased selection:bg-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}