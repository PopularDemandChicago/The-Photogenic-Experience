import Link from "next/link";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <section className="section-dark min-h-[90vh] lg:min-h-screen">
        <div className="grid min-h-[90vh] lg:min-h-screen lg:grid-cols-2">
          {/* Words — left */}
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 xl:px-24">
            <p className="accent-tagline mb-6 animate-fade-in text-left text-sm md:text-base">
              Snap. Strike a Pose. Shine.
            </p>

            <h1 className="luxury-heading mb-6 animate-slide-up text-left opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] lg:text-5xl xl:text-6xl">
              <span className="block">Modern &amp; Fun</span>
              <span className="silver-gradient-text block italic">
                Photo Booth Experiences
              </span>
              <span className="mt-2 block text-xl font-light text-luxury-platinum/80 md:text-2xl lg:text-3xl">
                in Chicagoland
              </span>
            </h1>

            <p className="body-copy mb-10 max-w-lg animate-slide-up text-left text-base opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] md:text-lg">
              Make your next event unforgettable with our premium digital selfie
              booth rentals — perfect for weddings, corporate events, and private
              celebrations.
            </p>

            <div className="flex animate-slide-up flex-col gap-4 opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] sm:flex-row">
              <Link href="#contact" className="btn-primary w-full sm:w-auto">
                Check Availability
              </Link>
              <Link href="#gallery" className="btn-secondary w-full sm:w-auto">
                View Gallery
              </Link>
            </div>
          </div>

          {/* Video — right (full-bleed, blends into hero) */}
          <div className="relative min-h-[55vh] overflow-hidden bg-luxury-black lg:min-h-full">
            <video
              src="/videos/hero-video.mp4?v=4"
              poster="/images/hero/gala-hero.png?v=4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
              aria-label="Photo booth experience highlight reel"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/50 to-transparent lg:from-luxury-black lg:via-luxury-black/35 lg:to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/15"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(124,58,237,0.12)_0%,transparent_55%)]"
              aria-hidden
            />
          </div>
        </div>
      </section>
    </>
  );
}
