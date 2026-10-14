const items = [
  "Weddings 💍",
  "Corporate Galas ✨",
  "Brand Activations 📸",
  "Private Parties 🎉",
  "Trade Shows 🚀",
  "Holiday Events 🥂",
  "Birthdays 🎂",
  "Mitzvahs ⭐",
];

export default function SocialProof() {
  const marqueeItems = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-black/[0.06] bg-white py-6">
      <div className="mb-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-dark">
          Trusted Across Chicagoland
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-12 whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400 transition-colors hover:text-accent-dark"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
