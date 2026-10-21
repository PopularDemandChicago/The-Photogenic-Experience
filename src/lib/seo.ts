import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const SITE_NAME = "The Photogenic Experience";

export const SITE_DESCRIPTION =
  "Luxury digital and pro photo booth rentals in Chicago and Chicagoland. Weddings, corporate events, mitzvahs, and private celebrations with prints, GIFs, and instant sharing.";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/thephotogenicexperience/",
  "https://www.facebook.com/profile.php?id=61594872892350",
  "https://www.tiktok.com/@thephotogenicexperience",
] as const;

const defaultTitle = `${SITE_NAME} | Wedding & Event Photo Booth | Chicago`;

export function buildSiteMetadata(): Metadata {
  const base = siteUrl();
  const ogImage = `${base}/images/gallery/wedding-booth.png`;

  return {
    metadataBase: new URL(base),
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "photo booth rental Chicago",
      "Chicagoland photo booth",
      "wedding photo booth Chicago",
      "corporate photo booth",
      "luxury photo booth",
      "digital photo booth",
      "open air photo booth",
      "event photo booth Illinois",
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
          alt: "Wedding guests enjoying The Photogenic Experience photo booth",
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

export function localBusinessJsonLd(): Record<string, unknown> {
  const base = siteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: base,
    email: "hello@thephotogenicexperience.com",
    image: `${base}/images/gallery/wedding-booth.png`,
    areaServed: [
      { "@type": "City", name: "Chicago", containedInPlace: { "@type": "State", name: "Illinois" } },
      { "@type": "AdministrativeArea", name: "Chicagoland" },
    ],
    priceRange: "$$",
    sameAs: [...SOCIAL_PROFILES],
    knowsAbout: [
      "Photo booth rental",
      "Wedding entertainment",
      "Corporate event activations",
      "Digital photo booth",
      "Pro photo booth with prints",
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
