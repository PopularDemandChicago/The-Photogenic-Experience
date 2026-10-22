import Link from "next/link";

const features = [
  {
    title: "Studio-Quality Photos",
    description:
      "State-of-the-art technology guarantees the highest image quality — photos your guests will absolutely love.",
    bullets: [
      "High-resolution digital captures",
      "B&W, glam & vintage filters",
      "Photos, GIFs, boomerangs & videos",
    ],
  },
  {
    title: "Chic Backdrops",
    description:
      "Designer wedding photo booth backdrop options in every package — elegant styles that stand out or blend seamlessly with your décor.",
    bullets: [
      "Modern & classic styles",
      "Custom branding available",
      "Premium setup included",
    ],
  },
  {
    title: "Digital Overlays",
    description:
      "Custom photo templates and branding to match your event theme. Our team crafts designs that fit your style perfectly.",
    bullets: [
      "Wedding monograms & logos",
      "Custom framed print designs",
      "Branded social sharing",
    ],
  },
  {
    title: "Fun Props",
    description:
      "Physical and digital props that bring personality to every shot — because the right prop makes every photo unforgettable.",
    bullets: [
      "Curated themed prop sets",
      "On-site attendant assistance",
      "Pose recommendations included",
    ],
  },
  {
    title: "Instant Prints",
    description:
      "A true party photo booth with instant prints — unlimited keepsakes for you and your guests, with no waiting and no limits.",
    bullets: [
      "2×6 strips or 4×6 portraits",
      "Custom overlay on every print",
      "Text & email sharing on-site",
    ],
  },
  {
    title: "Private Gallery",
    description:
      "The day after your event, receive a secure online gallery with every photo — view, download, and share anytime.",
    bullets: [
      "Full-resolution downloads",
      "Secure private access",
      "Share with guests easily",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding section-light">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="luxury-heading mb-6">
            Been There.
            <span className="silver-gradient-text block italic">Done That.</span>
          </h2>
          <p className="body-copy mx-auto max-w-2xl">
            Every Chicago photo booth rental setup is built for quality and guest
            delight. Compare our{" "}
            <Link
              href="/#booths"
              className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
            >
              Digital and Pro booths
            </Link>{" "}
            — here&apos;s what comes standard with every Photogenic Experience booking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group luxury-card">
              <h3 className="mb-3 font-display text-xl font-light tracking-wide text-luxury-black transition-colors group-hover:text-accent-dark">
                {feature.title}
              </h3>
              <p className="body-copy mb-6 text-sm">{feature.description}</p>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="feature-bullet text-sm">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
