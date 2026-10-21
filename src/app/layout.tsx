import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { buildSiteMetadata, localBusinessJsonLd, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = buildSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <JsonLd data={[localBusinessJsonLd(), webSiteJsonLd()]} />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
