"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#booths", label: "Booths" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkClass = scrolled ? "nav-link nav-link-scrolled" : "nav-link nav-link-transparent";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-luxury-black/30 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link href="/" className="group flex flex-col">
          <span
            className={`font-display text-xl font-light tracking-[0.12em] md:text-2xl ${
              scrolled ? "text-luxury-black" : "text-white"
            }`}
          >
            THE PHOTOGENIC
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.35em] transition-colors ${
              scrolled
                ? "text-accent group-hover:text-accent-dark"
                : "text-accent-light group-hover:text-white"
            }`}
          >
            Experience
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className={`hidden rounded-sm px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 md:inline-flex ${
            scrolled
              ? "bg-accent text-white hover:bg-accent-dark"
              : "bg-accent text-white hover:bg-accent-light"
          }`}
        >
          Check Availability
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-0.5 w-6 transition-all duration-300 ${
                scrolled ? "bg-luxury-black" : "bg-white"
              } ${
                isOpen && i === 0
                  ? "translate-y-[7px] rotate-45"
                  : isOpen && i === 1
                    ? "opacity-0"
                    : isOpen && i === 2
                      ? "-translate-y-[7px] -rotate-45"
                      : ""
              }`}
            />
          ))}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-white transition-all duration-500 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-3xl font-light tracking-wide text-luxury-black"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link href="#contact" className="btn-primary" onClick={() => setIsOpen(false)}>
              Check Availability
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
