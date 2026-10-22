import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-accent py-2.5 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white md:text-[11px]">
        Spots are filling up quickly —{" "}
        <Link
          href="/#contact"
          className="underline decoration-white/50 underline-offset-4 transition-colors hover:text-accent-light"
        >
          Check availability
        </Link>
      </p>
    </div>
  );
}
