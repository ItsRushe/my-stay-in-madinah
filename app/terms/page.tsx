import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-6 md:px-12 max-w-4xl mx-auto text-ink">
        <h1 className="font-playfair text-4xl md:text-5xl font-medium mb-8">Terms & Conditions</h1>
        <div className="space-y-6 font-light opacity-80">
          <p>By booking through My Stay In Madinah, you agree to the following terms and conditions.</p>
          <h3 className="font-medium text-lg pt-4">1. Booking and Payments</h3>
          <p>All bookings are processed securely via Stripe. Full payment is required at the time of booking to secure your reservation.</p>
          <h3 className="font-medium text-lg pt-4">2. Cancellations</h3>
          <p>We offer free cancellation up to 24 hours before your scheduled check-in time or tour start time. Cancellations made within 24 hours are non-refundable.</p>
          <h3 className="font-medium text-lg pt-4">3. Check-in & Check-out</h3>
          <p>Standard check-in time is 3:00 PM, and check-out is at 11:00 AM. Early check-in or late check-out is subject to availability and may incur an additional fee.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}