import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LandingChrome from "@/components/LandingChrome";
import { buildLandingMetadata, servicePageJsonLd } from "@/lib/seo";

const path = "/wedding-photo-booth-chicago" as const;

const title = "Wedding Photo Booth Chicago";
const description =
  "Luxury wedding photo booth rentals in Chicago and Chicagoland. Custom backdrops, overlays, instant prints, GIFs, and a polished open-air setup your guests will love.";

export const metadata = buildLandingMetadata({
  title,
  description,
  path,
  ogImageAlt: "Wedding photo booth backdrop at a Chicago reception",
});

const features = [
  "Designer wedding photo booth backdrop options",
  "Custom monograms, overlays, and print templates",
  "Instant premium prints plus GIFs and digital sharing",
  "Professional attendant and seamless load-in",
  "Private online gallery the day after your wedding",
];

export default function WeddingPhotoBoothChicagoPage() {
  return (
    <LandingChrome>
      <JsonLd
        data={servicePageJsonLd({
          name: title,
          description,
          path,
        })}
      />
      <section className="section-padding section-light">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-eyebrow !justify-start">Chicago Weddings</p>
            <h1 className="luxury-heading mb-6 text-luxury-black">
              Wedding Photo Booth
              <span className="silver-gradient-text block italic">Chicago</span>
            </h1>
            <p className="body-copy mb-8">
              Your wedding deserves more than a basic booth. We deliver a luxury
              Chicago photo booth rental setup with elegant backdrops, studio-quality
              lighting, and keepsake prints — so every guest leaves with a moment
              from your day.
            </p>
            <ul className="mb-10 space-y-3">
              {features.map((item) => (
                <li key={item} className="feature-bullet">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/#contact" className="btn-primary">
                Get a Wedding Quote
              </Link>
              <Link href="/#gallery" className="btn-secondary !text-luxury-black">
                View Wedding Gallery
              </Link>
            </div>
            <p className="body-copy mt-8 text-sm">
              Planning a brand activation too? See our{" "}
              <Link
                href="/corporate-photo-booth-chicago"
                className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
              >
                corporate photo booth Chicago
              </Link>{" "}
              page.
            </p>
          </div>
          <div className="image-luxury-frame overflow-hidden">
            <Image
              src="/images/gallery/wedding-booth.png"
              alt="Wedding photo booth backdrop — Chicago reception"
              width={1200}
              height={1500}
              className="h-auto w-full"
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>
    </LandingChrome>
  );
}
