import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "weddings",
    title: "Weddings",
    subtitle: "Your Day, Perfectly Captured",
    description:
      "Our sleek photo booth adds elegance to any venue — a surefire way to capture memorable moments and give your guests something they'll share all night long.",
    image: "/images/gallery/wedding-booth.png",
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
      "From galas to product launches, our booths engage guests, amplify your brand, and create share-worthy moments your team will talk about long after the event.",
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
      "Birthdays, mitzvahs, holiday parties, and milestone celebrations deserve something special. We bring the fun, the props, and the polished experience.",
    image: "/images/gallery/gala-private-event.png",
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
            No event around Chicago is complete without a premium photo booth
            experience. We tailor every detail to match your vision.
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
                    <video
                      src={service.video}
                      poster={service.poster}
                      width={service.mediaWidth}
                      height={service.mediaHeight}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className={`block h-auto w-auto max-w-full transition-transform duration-700 group-hover:scale-[1.02] ${service.mediaClass}`}
                      aria-label={`${service.title} photo booth highlight`}
                    />
                  ) : (
                    <Image
                      src={service.image!}
                      alt={service.title}
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

                <Link href="#contact" className="btn-primary">
                  Get a Quote
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
