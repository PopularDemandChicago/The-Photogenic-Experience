import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const SITE_NAME = "The Photogenic Experience";

export const SITE_DESCRIPTION =
  "Premium Chicago photo booth rentals for weddings, parties, and corporate events. Studio-quality lighting, instant prints, custom overlays, and a seamless guest experience.";

/** Use in footer / CTAs so clients can find the GBP listing and leave reviews. */
export const GOOGLE_MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Photogenic+Experience+Chicago+photo+booth";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/thephotogenicexperience/",
  "https://www.facebook.com/profile.php?id=61594872892350",
  "https://www.tiktok.com/@thephotogenicexperience",
] as const;

const defaultTitle = "Chicago Photo Booth Rental | Luxury Weddings & Events";

const defaultOgImagePath = "/images/gallery/wedding-booth.png";

function ogImageUrl(base: string) {
  return `${base}${defaultOgImagePath}`;
}

export function buildSiteMetadata(): Metadata {
  const base = siteUrl();
  const ogImage = ogImageUrl(base);

  return {
    metadataBase: new URL(base),
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "photo booths Chicago",
      "wedding photo booth Chicago",
      "luxury photo booth Chicago",
      "photo booth rental Chicago",
      "Chicago wedding photo booth",
      "luxury photo booth rental",
      "Chicagoland photo booth",
      "corporate photo booth Chicago",
      "digital photo booth Chicago",
      "Chicago photo booth rental setup",
      "wedding photo booth backdrop",
      "corporate event photo booth experience",
      "party photo booth with instant prints",
    ],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: base,
      siteName: SITE_NAME,
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1500,
          alt: "Wedding photo booth Chicago — guests at The Photogenic Experience luxury photo booth",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      images: [ogImage],
    },
    category: "Event Services",
  };
}

type LandingMetaInput = {
  title: string;
  description: string;
  path: `/${string}`;
  ogImageAlt: string;
};

export function buildLandingMetadata({
  title,
  description,
  path,
  ogImageAlt,
}: LandingMetaInput): Metadata {
  const base = siteUrl();
  const url = `${base}${path}`;
  const ogImage = ogImageUrl(base);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 1500, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function localBusinessJsonLd(): Record<string, unknown> {
  const base = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${base}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: base,
    email: "hello@thephotogenicexperience.com",
    image: ogImageUrl(base),
    areaServed: [
      {
        "@type": "City",
        name: "Chicago",
        containedInPlace: { "@type": "State", name: "Illinois" },
      },
      { "@type": "AdministrativeArea", name: "Chicagoland" },
    ],
    priceRange: "$$",
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@thephotogenicexperience.com",
      areaServed: ["Chicago, IL", "Chicagoland"],
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photo booth packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Photo Booth",
            areaServed: "Chicago, IL",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pro Photo Booth",
            areaServed: "Chicago, IL",
          },
        },
      ],
    },
    knowsAbout: [
      "Photo booths Chicago",
      "Wedding photo booth Chicago",
      "Luxury photo booth Chicago",
      "Chicago photo booth rental setup",
      "Wedding photo booth backdrop",
      "Corporate event photo booth experience",
      "Party photo booth with instant prints",
      "Digital photo booth",
    ],
  };
}

export function webSiteJsonLd(): Record<string, unknown> {
  const base = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${base}/#business` },
    inLanguage: "en-US",
  };
}

export function servicePageJsonLd(input: {
  name: string;
  description: string;
  path: `/${string}`;
}): Record<string, unknown> {
  const base = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}${input.path}#service`,
    name: input.name,
    description: input.description,
    url: `${base}${input.path}`,
    provider: { "@id": `${base}/#business` },
    areaServed: {
      "@type": "City",
      name: "Chicago",
      containedInPlace: { "@type": "State", name: "Illinois" },
    },
    serviceType: "Photo booth rental",
  };
}
