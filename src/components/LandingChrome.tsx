import Link from "next/link";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LandingChromeProps = {
  children: React.ReactNode;
};

export default function LandingChrome({ children }: LandingChromeProps) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <section className="section-dark border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="body-copy mb-8">
            Ready to check dates and get a tailored quote for your Chicago event?
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              Check Availability
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
