import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LandingChrome from "@/components/LandingChrome";
import { buildLandingMetadata, servicePageJsonLd } from "@/lib/seo";

const path = "/corporate-photo-booth-chicago" as const;

const title = "Corporate Photo Booth Chicago";
const description =
  "Corporate event photo booth experiences in Chicago — branded overlays, lead capture, studio lighting, and professional attendants for galas, holiday parties, and activations.";

export const metadata = buildLandingMetadata({
  title,
  description,
  path,
  ogImageAlt: "Corporate event photo booth experience in Chicago",
});

const features = [
  "Full corporate event photo booth experience with on-site attendant",
  "Branded templates, logos, and custom welcome screens",
  "Lead capture and marketing opt-in add-ons",
  "Instant sharing plus optional premium prints",
  "Polished setup for galas, trade shows, and holiday events",
];

export default function CorporatePhotoBoothChicagoPage() {
  return (
    <LandingChrome>
      <JsonLd
        data={servicePageJsonLd({
          name: title,
          description,
          path,
        })}
      />
      <section className="section-padding section-dark">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="image-luxury-frame order-2 overflow-hidden lg:order-1">
            <Image
              src="/images/gallery/corporate-holiday.jpg"
              alt="Corporate holiday photo booth experience in Chicago"
              width={900}
              height={1200}
              className="h-auto w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="section-eyebrow !justify-start">Chicago Corporate</p>
            <h1 className="luxury-heading mb-6">
              Corporate Photo Booth
              <span className="silver-gradient-text block italic">Chicago</span>
            </h1>
            <p className="body-copy mb-8">
              Turn booth traffic into brand moments. We design a corporate event
              photo booth experience that matches your visuals, keeps lines moving,
              and gives marketing teams optional lead capture — across Chicago and
              Chicagoland venues.
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
                Request Corporate Quote
              </Link>
              <Link href="/#services" className="btn-secondary">
                Explore All Services
              </Link>
            </div>
            <p className="body-copy mt-8 text-sm">
              Celebrating a marriage? Explore our{" "}
              <Link
                href="/wedding-photo-booth-chicago"
                className="text-accent-light underline decoration-accent-light/30 underline-offset-4 hover:text-white"
              >
                wedding photo booth Chicago
              </Link>{" "}
              packages.
            </p>
          </div>
        </div>
      </section>
    </LandingChrome>
  );
}
