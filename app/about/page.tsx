import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-6 md:px-12 max-w-4xl mx-auto text-ink">
        <h1 className="font-playfair text-4xl md:text-6xl font-medium mb-8 text-center">About Us</h1>
        <p className="font-light leading-relaxed mb-6 text-lg opacity-80">
          At My Stay In Madinah, our mission is to elevate your spiritual journey by providing premium, frictionless accommodation in the heart of the Prophet's city.
        </p>
        <p className="font-light leading-relaxed mb-6 text-lg opacity-80">
          We noticed a growing frustration with traditional booking platforms—hidden service fees, unpredictable hosts, and inflated pricing. We created this platform as a direct alternative, allowing you to bypass the middleman and secure luxury rooms at the absolute best guaranteed rate.
        </p>
        <p className="font-light leading-relaxed text-lg opacity-80">
          From impeccably designed rooms to curated Ziyarah tours led by knowledgeable local guides, we handle the details so you can focus entirely on your worship and peace of mind.
        </p>
      </section>
      <Footer />
    </main>
  );
}