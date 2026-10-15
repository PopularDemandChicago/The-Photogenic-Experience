export const BUSINESS = {
  name: "The Photogenic Experience",
  phone: "(773) 639-8099",
  phoneTel: "+17736398099",
  email: "hello@thephotogenicexperience.com",
  site: "https://www.thephotogenicexperience.com",
  region: "Chicagoland and surrounding areas",
} as const;

export const QUICK_PROMPTS = [
  "What's the difference between Digital and Pro?",
  "What's included in a package?",
  "Do you travel outside Chicagoland?",
  "How does setup work?",
  "I'd like a quote for my event",
] as const;

export const CHAT_SYSTEM_PROMPT = `You are the friendly, professional AI assistant for ${BUSINESS.name}, a luxury photo booth company serving ${BUSINESS.region}.

Voice: warm, confident, concise — like a great event coordinator. Use plain language, not corporate jargon.

Products:
- Digital Photo Booth: open-air, modern, fast line flow. Photos, GIFs, boomerangs. Instant text, email, and social sharing. Custom digital overlays and branding. Sleek touchscreen.
- Pro Photo Booth: studio-quality DSLR captures, pro lighting, instant premium prints on-site, glam/B&W/vintage filters, dedicated professional attendant.

Every experience typically includes: designer backdrops, custom overlays, fun props, on-site attendant, instant sharing, and a private online gallery the day after the event. Pro packages emphasize prints; Digital emphasizes speed and social sharing.

Events: weddings, corporate (galas, launches, holiday parties), mitzvahs, quinces, birthdays, graduations, private celebrations.

Policies and facts:
- Pricing depends on date, hours, booth type, travel, and add-ons. Never invent dollar amounts. Offer a custom quote and point to the contact form or phone ${BUSINESS.phone}.
- Travel: based in Chicagoland; we serve the metro area and can quote events farther out — ask for venue city.
- Setup: team arrives early; typical setup is about 45–60 minutes before guest use. Breakdown after the booked window.
- Open-air booths: yes — our Digital booth is open-air; Pro setup is designed for a polished luxury look at the venue.
- Hours: inquiries answered quickly; for urgent event-day needs, call ${BUSINESS.phone}.

When someone wants to book, get a quote, check availability, or talk to a human: encourage them to share name, email, phone, event type, date, and venue — or use the in-chat "Send to our team" option. Mention they can also call ${BUSINESS.phone} or email ${BUSINESS.email}.

If asked about capabilities you don't have (live calendar access, exact real-time availability): say our team confirms availability and sends a personalized quote within 24 hours after they submit details.

Keep answers under about 120 words unless they ask for detail. End with one helpful next step when appropriate.`;

type FaqRule = { match: RegExp; answer: string };

const FAQ_RULES: FaqRule[] = [
  {
    match: /digital|pro|difference|compare|which booth/i,
    answer:
      "Digital is our open-air, share-first booth — great for high energy and instant social sharing. Pro is studio-quality with premium lighting and instant print keepsakes plus a dedicated attendant. Not sure? Tell us your event and guest count and we'll recommend the best fit.",
  },
  {
    match: /included|package|what do i get|what's in/i,
    answer:
      "Packages include professional setup, an on-site attendant, designer backdrops, props, custom overlays, and instant sharing. Pro emphasizes premium prints; Digital emphasizes GIFs, boomerangs, and fast sharing. You'll also get a private online gallery the day after your event. Exact packages are tailored to your date and hours — we can send a custom quote.",
  },
  {
    match: /travel|distance|outside|chicagoland|indiana|wisconsin/i,
    answer:
      "We're Chicagoland-based and serve the metro area regularly. We can often travel farther depending on date and location — share your venue city and we'll confirm travel in your quote.",
  },
  {
    match: /setup|breakdown|arrive|early|how long/i,
    answer:
      "Our crew arrives ahead of your guest time to set up — usually about 45–60 minutes before the booth opens. We handle full breakdown after your booked hours so you can focus on your event.",
  },
  {
    match: /open[- ]?air|enclosed|backdrop/i,
    answer:
      "Yes — our Digital booth is open-air, which keeps the line moving and fits most venues beautifully. We bring designer backdrops and a polished setup so it still feels luxury, not cluttered.",
  },
  {
    match: /price|pricing|cost|how much|rate/i,
    answer:
      "Pricing depends on booth type, hours, date, travel, and add-ons like custom branding. I don't have your exact rate here — share your event date, venue, and hours and our team will send personalized pricing within 24 hours. You can also call us at (773) 639-8099.",
  },
  {
    match: /quote|book|availability|consult|june|wedding date/i,
    answer:
      "I'd love to get you a quote. Use the form below this chat to send your details to our team (we'll follow up fast), or scroll to the contact section on our site. Include event type, date, venue, and booth preference if you have one.",
  },
  {
    match: /corporate|wedding|mitzvah|birthday|event type/i,
    answer:
      "We do weddings, corporate events, mitzvahs, quinces, holiday parties, school events, birthdays, graduations, and private celebrations. Corporate clients often use branded overlays and lead capture — tell us your goals and we'll match the booth and package.",
  },
  {
    match: /phone|call|human|talk to someone|email/i,
    answer:
      "Reach us anytime at (773) 639-8099 or hello@thephotogenicexperience.com. This chat is here 24/7 for quick answers; our team follows up on quotes personally.",
  },
];

export function faqFallback(userMessage: string): string {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return "Ask me about booth types, packages, travel, or setup — or tap a quick question above.";
  }

  for (const rule of FAQ_RULES) {
    if (rule.match.test(trimmed)) return rule.answer;
  }

  return `Thanks for your question. For the most accurate answer about "${trimmed.slice(0, 60)}${trimmed.length > 60 ? "…" : ""}", our team can help personally — tap "Send to our team" below or call ${BUSINESS.phone}. You can also browse booth options at ${BUSINESS.site}/#booths.`;
}

export function shouldSuggestLead(userMessage: string): boolean {
  return /quote|book|availability|consult|follow up|call me|contact|pricing|rush|asap|june|wedding|corporate event/i.test(
    userMessage,
  );
}
