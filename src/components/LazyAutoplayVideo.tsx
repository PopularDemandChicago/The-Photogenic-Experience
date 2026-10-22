"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  /** When true, defer loading src until the video enters the viewport. */
  lazy?: boolean;
};

export default function LazyAutoplayVideo({
  lazy = true,
  src,
  preload,
  className,
  ...rest
}: LazyAutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(!lazy);

  useEffect(() => {
    if (!lazy || active) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, active]);

  return (
    <video
      ref={ref}
      {...rest}
      className={className}
      src={active && src ? src : undefined}
      preload={active ? (preload ?? "metadata") : "none"}
    />
  );
}
