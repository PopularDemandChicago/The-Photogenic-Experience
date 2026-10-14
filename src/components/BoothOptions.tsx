import Link from "next/link";

const boothTypes = [
  {
    id: "digital",
    name: "Digital Photo Booth",
    tagline: "Modern, social & share-ready",
    description:
      "Our open-air digital booth keeps the line moving and the energy high — guests tap, pose, and share in seconds.",
    features: [
      "Photos, GIFs & boomerangs",
      "Instant text, email & social sharing",
      "Custom digital overlays & branding",
      "Sleek touchscreen experience",
    ],
    inquireValue: "Digital Photo Booth",
  },
  {
    id: "pro",
    name: "Pro Photo Booth",
    tagline: "Studio-quality & print-ready",
    description:
      "Our pro booth delivers a polished, luxury experience with premium lighting and keepsake prints your guests will love.",
    features: [
      "DSLR-quality captures & pro lighting",
      "Instant premium prints on-site",
      "Glam, B&W & vintage filter options",
      "Dedicated professional attendant",
    ],
    inquireValue: "Pro Photo Booth",
  },
];

export default function BoothOptions() {
  return (
    <section id="booths" className="section-padding section-dark">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="section-eyebrow">Choose Your Experience</p>
          <h2 className="luxury-heading mb-6">
            Digital or Pro
            <span className="silver-gradient-text block italic">Photo Booth</span>
          </h2>
          <p className="body-copy mx-auto max-w-2xl">
            Pick the booth style that fits your event. Not sure which is right?
            Tell us in your inquiry — we&apos;ll recommend the perfect match.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {boothTypes.map((booth) => (
            <article
              key={booth.id}
              className="luxury-card flex flex-col border-accent/20 bg-luxury-charcoal/30"
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-light">
                {booth.tagline}
              </p>
              <h3 className="luxury-subheading mb-4 text-white">{booth.name}</h3>
              <p className="body-copy mb-8">{booth.description}</p>

              <ul className="mb-10 flex-1 space-y-3">
                {booth.features.map((feature) => (
                  <li key={feature} className="feature-bullet">
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/?booth=${encodeURIComponent(booth.inquireValue)}#contact`}
                className="btn-primary w-full text-center sm:w-auto"
              >
                Inquire — {booth.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
