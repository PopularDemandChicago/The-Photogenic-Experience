import Image from "next/image";
import Link from "next/link";
import LazyAutoplayVideo from "./LazyAutoplayVideo";

const services = [
  {
    id: "weddings",
    title: "Weddings",
    subtitle: "Your Day, Perfectly Captured",
    description:
      "Elegant wedding photo booth backdrop options, custom overlays, and studio-quality captures — so your guests leave with strips they share all night.",
    image: "/images/gallery/wedding-booth.png",
    imageAlt: "Wedding photo booth backdrop at a Chicago reception",
    mediaWidth: 1200,
    mediaHeight: 1500,
    mediaClass: "h-auto w-full",
    features: [
      "Custom wedding overlays & print templates",
      "Instant premium prints for every guest",
      "GIFs, boomerangs & digital sharing",
      "Private online gallery next day",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    subtitle: "Brand Your Experience",
    description:
      "A full corporate event photo booth experience — branded overlays, lead capture, and polished service from galas and holiday parties to product launches.",
    video: "/videos/private-event.mp4",
    poster: "/images/gallery/corporate-holiday.jpg",
    mediaWidth: 360,
    mediaHeight: 640,
    mediaClass: "max-h-[min(70vh,560px)]",
    features: [
      "Branded overlays & custom backdrops",
      "Lead capture & social sharing",
      "Studio-quality lighting & prints",
      "Professional on-site attendant",
    ],
  },
  {
    id: "private",
    title: "Private Events",
    subtitle: "Celebrate in Style",
    description:
      "Birthdays, mitzvahs, and milestone celebrations deserve a party photo booth with instant prints — fun props, glam filters, and keepsakes guests take home.",
    image: "/images/gallery/gala-private-event.png",
    imageAlt: "Party photo booth with instant prints at a Chicago celebration",
    mediaWidth: 1400,
    mediaHeight: 1050,
    mediaClass: "h-auto w-full",
    features: [
      "Themed props & chic backdrops",
      "Unlimited photo sessions",
      "Glam & vintage filter options",
      "Flexible packages for any budget",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding section-light">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="section-eyebrow">Explore Our Experiences</p>
          <h2 className="luxury-heading mb-6">
            Wedding, Business or a Party
            <span className="silver-gradient-text block italic">
              — We&apos;ve Got You Covered
            </span>
          </h2>
          <p className="body-copy mx-auto max-w-2xl">
            No Chicago event is complete without a thoughtful photo booth rental
            setup. See our{" "}
            <Link
              href="/wedding-photo-booth-chicago"
              className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
            >
              wedding photo booth Chicago
            </Link>{" "}
            and{" "}
            <Link
              href="/corporate-photo-booth-chicago"
              className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
            >
              corporate photo booth Chicago
            </Link>{" "}
            pages — or jump to{" "}
            <Link href="/#weddings" className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent">
              weddings
            </Link>
            ,{" "}
            <Link href="/#corporate" className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent">
              corporate
            </Link>
            , or{" "}
            <Link href="/#private" className="text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent">
              private events
            </Link>{" "}
            below.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => {
            const wideMedia =
              service.id === "weddings" || service.id === "private";

            return (
            <article
              key={service.id}
              id={service.id}
              className={`grid items-center gap-12 lg:gap-16 ${
                wideMedia
                  ? "lg:grid-cols-5"
                  : `lg:grid-cols-2 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`
              }`}
            >
              <div
                className={`flex w-full justify-center ${
                  wideMedia
                    ? `lg:col-span-3 ${index % 2 === 1 ? "lg:justify-end" : "lg:justify-start"}`
                    : `${index % 2 === 1 ? "lg:justify-end lg:[direction:ltr]" : "lg:justify-start"}`
                }`}
              >
                <div
                  className={`group image-luxury-frame relative overflow-hidden ${
                    wideMedia
                      ? "w-full max-w-2xl lg:max-w-none"
                      : "inline-block max-w-full"
                  }`}
                >
                  {"video" in service && service.video ? (
                    <LazyAutoplayVideo
                      src={service.video}
                      poster={service.poster}
                      width={service.mediaWidth}
                      height={service.mediaHeight}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`block h-auto w-auto max-w-full transition-transform duration-700 group-hover:scale-[1.02] ${service.mediaClass}`}
                      aria-label={`Corporate event photo booth experience — ${service.title} highlight`}
                    />
                  ) : (
                    <Image
                      src={service.image!}
                      alt={"imageAlt" in service && service.imageAlt ? service.imageAlt : service.title}
                      width={service.mediaWidth}
                      height={service.mediaHeight}
                      className={`block h-auto w-auto max-w-full transition-transform duration-700 group-hover:scale-[1.02] ${service.mediaClass}`}
                      sizes={
                        service.id === "weddings"
                          ? "(max-width: 1024px) 96vw, 1200px"
                          : service.id === "private"
                            ? "(max-width: 1024px) 96vw, 1200px"
                            : "(max-width: 1024px) 90vw, 560px"
                      }
                    />
                  )}
                </div>
              </div>

              <div
                className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""} ${
                  wideMedia ? "lg:col-span-2" : ""
                }`}
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-dark">
                  {service.subtitle}
                </p>
                <h3 className="luxury-subheading mb-5">{service.title}</h3>
                <p className="body-copy mb-8">{service.description}</p>

                <ul className="mb-10 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="feature-bullet">
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="#contact" className="btn-primary">
                    Get a Quote
                  </Link>
                  {service.id === "weddings" && (
                    <Link
                      href="/wedding-photo-booth-chicago"
                      className="text-sm font-light text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
                    >
                      Wedding photo booth Chicago →
                    </Link>
                  )}
                  {service.id === "corporate" && (
                    <Link
                      href="/corporate-photo-booth-chicago"
                      className="text-sm font-light text-accent-dark underline decoration-accent-dark/30 underline-offset-4 hover:text-accent"
                    >
                      Corporate photo booth Chicago →
                    </Link>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
