import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: "About Us — Premium Madinah Accommodation",
  description:
    "Learn about My Stay in Madinah — a direct-booking boutique accommodation service offering guaranteed lowest rates and hotel-grade standards near the Prophet's Mosque.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About My Stay in Madinah",
    description:
      "A direct-booking boutique accommodation service in Madinah. No fees, guaranteed lowest rates, hotel-grade cleanliness near the Prophet's Mosque.",
    url: "/about",
  },
};

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-6 md:px-12 max-w-4xl mx-auto text-ink">
        <h1 className="font-playfair text-4xl md:text-6xl font-medium mb-8 text-center">{t('title')}</h1>
        <p className="font-light leading-relaxed mb-6 text-lg opacity-80">{t('p1')}</p>
        <p className="font-light leading-relaxed mb-6 text-lg opacity-80">{t('p2')}</p>
        <p className="font-light leading-relaxed text-lg opacity-80">{t('p3')}</p>
      </section>
      <Footer />
    </main>
  );
}
