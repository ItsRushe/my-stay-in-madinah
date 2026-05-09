import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArrivalForm from './ArrivalForm';

export default function ArrivalPage() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="bg-ink text-ivory pt-36 pb-24 px-6 md:px-12 text-center">
        <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-4">Pre-Arrival</p>
        <h1 className="font-playfair text-5xl md:text-6xl font-medium leading-tight max-w-2xl mx-auto">
          Guest Check-in
        </h1>
        <p className="mt-6 text-ivory/60 font-light text-lg max-w-xl mx-auto leading-relaxed">
          Please provide the following details before your scheduled arrival to ensure a smooth and seamless check-in.
        </p>
      </section>

      {/* GOLD DIVIDER */}
      <div className="h-px bg-gold/30 w-full" />

      {/* FORM SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">

          <ArrivalForm />

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink/40 font-light">
            <span>Need help?</span>
            <a
              href="https://wa.me/966508151408"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-gold hover:text-ink transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/>
              </svg>
              +966 50 815 1408
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
