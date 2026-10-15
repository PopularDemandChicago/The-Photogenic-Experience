import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
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

export const metadata: Metadata = {
  title: "The Photogenic Experience | Luxury Photo Booth | Chicagoland",
  description:
    "Modern digital photobooth experience for weddings, corporate events, and private celebrations throughout Chicagoland. Elevate your event with stunning photo booth experiences.",
  keywords: [
    "photo booth",
    "Chicagoland",
    "wedding photo booth",
    "corporate events",
    "luxury photo booth",
    "selfie booth",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
