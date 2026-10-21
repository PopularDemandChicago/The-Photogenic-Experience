/** Canonical production URL for SEO (sitemap, robots, metadata). */
export const DEFAULT_SITE_URL = "https://www.thephotogenicexperience.com";

export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}
