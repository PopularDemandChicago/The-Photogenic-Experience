"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Events Captured" },
  { value: 100, suffix: "%", label: "Guest Smiles" },
  { value: 4, suffix: "", label: "Booth Features", sub: "Photos · GIFs · Boomerangs · Prints" },
  { value: 24, suffix: "hr", label: "Quote Response" },
];

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, active, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  sub,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  sub?: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);

  return (
    <div className="group text-center">
      <p className="font-display text-5xl font-light text-luxury-black transition-transform duration-300 group-hover:scale-110 md:text-6xl">
        {count}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
    </div>
  );
}

export default function FunStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-black/[0.06] bg-neutral-50 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-12">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} active={active} />
        ))}
      </div>
    </section>
  );
}
