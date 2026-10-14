import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.12)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-accent-light">
          Spots Are Filling Up Quickly
        </p>
        <h2 className="luxury-heading mb-6">
          Ready to Make Your Event
          <span className="silver-gradient-text block italic">Unforgettable?</span>
        </h2>
        <p className="body-copy mx-auto mb-10 max-w-xl">
          We secure bookings for the busiest dates months in advance. Check
          availability for your event date today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="#contact" className="btn-primary">
            Check Availability →
          </Link>
          <Link href="#gallery" className="btn-secondary">
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
