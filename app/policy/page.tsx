import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PolicyPage() {
  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-6 md:px-12 max-w-4xl mx-auto text-ink">
        <h1 className="font-playfair text-4xl md:text-5xl font-medium mb-8">Privacy Policy</h1>
        <div className="space-y-6 font-light opacity-80">
          <p>Your privacy is of the utmost importance to us. This policy outlines how we collect, use, and protect your information.</p>
          <h3 className="font-medium text-lg pt-4">Data Collection</h3>
          <p>We only collect information necessary to process your bookings, including your name, email address, and booking dates. Payment information is processed entirely by Stripe and is never stored on our servers.</p>
          <h3 className="font-medium text-lg pt-4">Data Usage</h3>
          <p>Your data is strictly used to communicate with you regarding your reservation and to ensure a seamless check-in experience.</p>
          <h3 className="font-medium text-lg pt-4">Security</h3>
          <p>Our platform uses secure, encrypted connections (SSL) and enterprise-grade database protection via Supabase to ensure your personal data is never compromised.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}