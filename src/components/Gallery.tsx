"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  fit?: "contain";
  type?: "video";
  poster?: string;
};

const galleryImages: GalleryItem[] = [
  {
    id: "wedding-1",
    src: "/images/gallery/wedding-booth.png",
    alt: "Wedding guests having fun in the photo booth",
    category: "Weddings",
    fit: "contain",
  },
  {
    id: "corporate-1",
    src: "/videos/private-event.mp4",
    alt: "@properties holiday corporate photo booth",
    category: "Corporate",
    fit: "contain",
    type: "video",
    poster: "/images/gallery/corporate-holiday.jpg",
  },
  {
    id: "private-1",
    src: "/images/gallery/gala-private-event.png",
    alt: "Beat the Streets Chicago Gala group photo",
    category: "Private",
    fit: "contain",
  },
  {
    id: "wedding-2",
    src: "/images/gallery/wedding-booth.png",
    alt: "Wedding guests having fun in the photo booth",
    category: "Weddings",
    fit: "contain",
  },
  {
    id: "corporate-2",
    src: "/videos/private-event.mp4",
    alt: "@properties holiday corporate photo booth",
    category: "Corporate",
    fit: "contain",
    type: "video",
    poster: "/images/gallery/corporate-holiday.jpg",
  },
  {
    id: "private-2",
    src: "/images/gallery/gala-private-event.png",
    alt: "Beat the Streets Chicago Gala group photo",
    category: "Private",
    fit: "contain",
  },
  {
    id: "wedding-3",
    src: "/images/gallery/wedding-booth.png",
    alt: "Wedding guests having fun in the photo booth",
    category: "Weddings",
    fit: "contain",
  },
  {
    id: "private-3",
    src: "/images/gallery/gala-private-event.png",
    alt: "Beat the Streets Chicago Gala group photo",
    category: "Private",
    fit: "contain",
  },
];

const categories = ["All", "Weddings", "Corporate", "Private"];

function GallerySlide({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group image-luxury-frame mx-auto block w-full max-w-3xl cursor-pointer text-left"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-luxury-black/40 sm:aspect-[16/10]">
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={`transition-all duration-700 group-hover:scale-[1.03] ${
              item.fit === "contain" ? "object-contain" : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        )}
        <div className="absolute inset-0 bg-luxury-black/15 transition-all duration-500 group-hover:bg-luxury-black/35" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-sm border border-white/30 bg-luxury-black/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {item.type === "video" ? "View ▶" : "View 📸"}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-luxury-black/90 to-transparent p-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-luxury-silver">
            {item.category}
          </span>
          <p className="mt-1 text-sm text-luxury-platinum/80">{item.alt}</p>
        </div>
      </div>
    </button>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeCategory);

  useEffect(() => {
    setSlideIndex(0);
  }, [activeCategory]);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      if (filtered.length === 0) return;
      setSlideIndex(
        (current) => (current + direction + filtered.length) % filtered.length
      );
    },
    [filtered.length]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, lightbox]);

  const activeItem = filtered[slideIndex];

  return (
    <>
      <section id="gallery" className="section-padding section-dark">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="section-eyebrow">Portfolio</p>
            <h2 className="luxury-heading mb-6">
              See Our Booths
              <span className="silver-gradient-text block italic">In Action</span>
            </h2>
            <p className="body-copy mx-auto max-w-2xl">
              Browse the carousel — tap a slide to enlarge. Every event tells a
              story.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`filter-pill ${
                  activeCategory === category
                    ? "filter-pill-active border border-white"
                    : "filter-pill-inactive border border-white/20 bg-transparent text-luxury-chrome hover:border-white/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filtered.length > 0 && activeItem ? (
            <div className="relative px-4 sm:px-14">
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-luxury-black/70 text-white transition-colors hover:border-accent hover:text-accent-light sm:h-12 sm:w-12"
                aria-label="Previous slide"
              >
                ‹
              </button>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                  {filtered.map((item) => (
                    <div key={item.id} className="w-full shrink-0 px-2">
                      <GallerySlide
                        item={item}
                        onOpen={() => setLightbox(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-luxury-black/70 text-white transition-colors hover:border-accent hover:text-accent-light sm:h-12 sm:w-12"
                aria-label="Next slide"
              >
                ›
              </button>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {filtered.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSlideIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === slideIndex
                        ? "w-8 bg-accent-light"
                        : "w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === slideIndex}
                  />
                ))}
              </div>

              <p className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-luxury-chrome">
                {slideIndex + 1} / {filtered.length}
              </p>
            </div>
          ) : (
            <p className="text-center text-luxury-chrome">No items in this category.</p>
          )}

          <div className="mt-16 text-center">
            <Link href="#contact" className="btn-primary">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-black/95 p-6 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:border-accent hover:text-accent-light"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative mx-auto max-h-[85vh] w-full max-w-sm animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "video" ? (
              <video
                src={lightbox.src}
                poster={lightbox.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="max-h-[85vh] w-full object-contain"
              />
            ) : (
              <div
                className={`relative w-full ${
                  lightbox.fit === "contain"
                    ? "aspect-[1/3] max-h-[85vh]"
                    : "aspect-[4/5] sm:aspect-[3/4]"
                }`}
              >
                <Image
                  src={
                    lightbox.src.includes("unsplash")
                      ? lightbox.src.replace("w=600", "w=1200")
                      : lightbox.src
                  }
                  alt={lightbox.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            <p className="mt-4 text-center text-sm text-luxury-silver">
              {lightbox.alt} · {lightbox.category}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
