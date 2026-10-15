export const BUSINESS = {
  name: "The Photogenic Experience",
  email: "hello@thephotogenicexperience.com",
  site: "https://www.thephotogenicexperience.com",
  region: "Chicagoland and surrounding areas",
} as const;

export const CONTACT_SUPPORT_MESSAGE = `Email ${BUSINESS.email} or use the contact form on our site.`;

export const QUICK_PROMPTS = [
  "Digital vs Signature Experience?",
  "What's included in the Digital Experience?",
  "What's included in the Signature Experience?",
  "What optional add-ons are available?",
  "Corporate branding & lead capture?",
  "Do you travel outside Chicagoland?",
  "I'd like a quote for my event",
] as const;

/** Canonical Digital package copy — keep chat and future site content aligned. */
export const DIGITAL_EXPERIENCE = {
  name: "Digital Experience",
  summary:
    "A modern, interactive photo booth experience perfect for holiday parties, birthdays, corporate events, school functions, and social gatherings.",
  serviceHours: "3 hours of service (additional hours available on request)",
  includes: [
    "Unlimited digital photos",
    "GIFs & boomerangs",
    "Instant text & email sharing",
    "Custom event overlay",
    "Fun prop collection",
    "Professional setup & breakdown",
  ],
  perfectFor: [
    "Corporate events",
    "Birthday parties",
    "School functions",
    "Holiday parties",
    "Private events",
  ],
} as const;

/** Premium print-focused package (shown on the website as Pro Photo Booth). */
export const SIGNATURE_EXPERIENCE = {
  name: "Signature Experience",
  websiteLabel: "Pro Photo Booth",
  summary:
    "A premium photo booth experience featuring professional photography-quality images and unlimited prints.",
  detail:
    "Powered by a professional DSLR camera and lighting system, the Signature Experience creates stunning keepsakes that guests will actually want to take home.",
  serviceHours: "3 hours of service (additional hours available on request)",
  includes: [
    "Professional DSLR camera",
    "Professional lighting",
    "Unlimited prints",
    "Unlimited digital sharing",
    "Premium backdrop",
    "Premium prop collection",
    "Professional setup & breakdown",
  ],
  perfectFor: [
    "Weddings",
    "Quinceañeras",
    "Galas",
    "Corporate events",
    "Anniversary celebrations",
  ],
} as const;

/** Corporate add-ons — available for corporate and brand-focused events. */
export const CORPORATE_ENHANCEMENTS = {
  name: "Corporate Enhancements",
  summary: "Customize the booth to match your brand.",
  includes: [
    "Branded photo template",
    "Company logo integration",
    "Custom welcome screen",
    "Event-specific graphics",
  ],
} as const;

export const LEAD_CAPTURE = {
  name: "Lead Capture",
  summary: "Turn booth engagement into marketing opportunities.",
  includes: [
    "Email collection",
    "Phone number collection",
    "Marketing opt-in forms",
  ],
} as const;

export const OPTIONAL_ADD_ONS = {
  title: "Optional Add-Ons",
  items: [
    {
      name: "Online Gallery",
      description:
        "Secure online gallery so you and your guests can view, download, and share photos after the event.",
    },
    {
      name: "Additional Hour",
      description: "Extend booth service beyond the standard 3 hours included in Digital and Signature packages.",
    },
    {
      name: "Digital Experience",
      description:
        "Add the Digital Experience package — ideal as a second booth or when you want both print-focused and share-first setups at one event.",
    },
    {
      name: "Signature Experience",
      description:
        "Add the Signature Experience package — ideal when you want premium prints and DSLR quality alongside or instead of Digital.",
    },
    {
      name: "Guest Memory Album",
      description: "A curated keepsake album of favorites from your event for hosts or guests of honor.",
    },
    {
      name: "Custom Backdrop",
      description:
        "A bespoke backdrop beyond the standard or premium backdrop included with your package — matched to your theme or brand.",
    },
    {
      name: "Idle Time Coverage",
      description:
        "Coverage during scheduled breaks in your timeline so the booth stays ready when guests return (e.g. dinner, speeches).",
    },
  ],
} as const;

export const CHAT_SYSTEM_PROMPT = `You are the friendly, professional AI assistant for ${BUSINESS.name}, a luxury photo booth company serving ${BUSINESS.region}.

Voice: warm, confident, concise — like a great event coordinator. Use plain language, not corporate jargon.

Products:
- Digital Photo Booth (${DIGITAL_EXPERIENCE.name}): ${DIGITAL_EXPERIENCE.summary} Open-air, modern, and interactive — great for high line flow and instant sharing.
  Standard Digital package includes: ${DIGITAL_EXPERIENCE.serviceHours}; ${DIGITAL_EXPERIENCE.includes.join("; ")}.
  Especially popular for: ${DIGITAL_EXPERIENCE.perfectFor.join(", ")}.
- ${SIGNATURE_EXPERIENCE.name} (same offering as our website's "${SIGNATURE_EXPERIENCE.websiteLabel}"): ${SIGNATURE_EXPERIENCE.summary} ${SIGNATURE_EXPERIENCE.detail}
  Standard Signature package includes: ${SIGNATURE_EXPERIENCE.serviceHours}; ${SIGNATURE_EXPERIENCE.includes.join("; ")}.
  Especially popular for: ${SIGNATURE_EXPERIENCE.perfectFor.join(", ")}.

Digital = interactive sharing, GIFs, boomerangs, custom digital overlay, fun props. Signature = DSLR + pro lighting, unlimited prints, premium backdrop and props, unlimited digital sharing. If someone says "Pro booth," they mean Signature Experience.

Corporate add-ons (especially for corporate events, activations, and trade shows — quote separately):
- ${CORPORATE_ENHANCEMENTS.name}: ${CORPORATE_ENHANCEMENTS.summary} Includes: ${CORPORATE_ENHANCEMENTS.includes.join("; ")}.
- ${LEAD_CAPTURE.name}: ${LEAD_CAPTURE.summary} Includes: ${LEAD_CAPTURE.includes.join("; ")}.

Both Digital and Signature can include a custom event overlay; Corporate Enhancements go further with full brand templates, logo integration, welcome screen, and event graphics. Mention lead capture when clients ask about emails, CRM, or marketing follow-up from the booth.

${OPTIONAL_ADD_ONS.title} (quote separately — do not invent prices):
${OPTIONAL_ADD_ONS.items.map((item) => `- ${item.name}: ${item.description}`).join("\n")}

Corporate Enhancements and Lead Capture are also available as specialized add-ons for brand and marketing goals.

Events: weddings, corporate (galas, launches, holiday parties), mitzvahs, quinces, birthdays, graduations, private celebrations.

Policies and facts:
- Pricing depends on date, hours, booth type, travel, and add-ons. Never invent dollar amounts. Offer a custom quote and point to the contact form or email ${BUSINESS.email}.
- Travel: based in Chicagoland; we serve the metro area and can quote events farther out — ask for venue city.
- Setup: team arrives early; typical setup is about 45–60 minutes before guest use. Breakdown after the booked window.
- Open-air booths: yes — our Digital booth is open-air; Signature setup is designed for a polished luxury look at the venue with premium backdrop.
- Hours: inquiries answered quickly; for urgent needs, email ${BUSINESS.email}.

When someone wants to book, get a quote, check availability, or talk to a human: encourage them to share name, email, phone, event type, date, and venue — or use the in-chat "Send to our team" option. Direct them to email ${BUSINESS.email} for personal follow-up. Do not provide a phone number.

If asked about capabilities you don't have (live calendar access, exact real-time availability): say our team confirms availability and sends a personalized quote within 24 hours after they submit details.

Keep answers under about 120 words unless they ask for detail. End with one helpful next step when appropriate.`;

export const OPTIONAL_ADDONS_REPLY =
  "Optional add-ons include: Online Gallery, Additional Hour, Digital Experience, Signature Experience (great for dual-booth events), Guest Memory Album, Custom Backdrop, and Idle Time Coverage for breaks during your timeline. Corporate Enhancements and Lead Capture are available too. Share your event flow and we'll build a quote — no fixed prices in chat.";

function asksAboutAddOns(text: string): boolean {
  return /add[\s-]*ons?|addons|optional\s+add|what\s+(are\s+)?(some\s+)?(the\s+)?add/i.test(text);
}

type FaqRule = { match: RegExp; answer: string };

const FAQ_RULES: FaqRule[] = [
  {
    match: /digital experience|digital package|digital booth|what'?s included.*digital/i,
    answer: `Our Digital Experience is a modern, interactive booth — ideal for holiday parties, birthdays, corporate events, school functions, and social gatherings. It includes 3 hours of service, unlimited digital photos, GIFs & boomerangs, instant text & email sharing, a custom event overlay, fun props, and professional setup & breakdown. Need more than 3 hours? Our team can quote add-on time.`,
  },
  {
    match: /signature experience|signature package|pro photo booth|pro booth|what'?s included.*(signature|pro)|dslr|unlimited print/i,
    answer:
      "Our Signature Experience (Pro Photo Booth on our site) is premium and print-focused: professional DSLR camera and lighting, unlimited prints, unlimited digital sharing, premium backdrop, premium props, and professional setup & breakdown — 3 hours of service, with extra time available on request. Perfect for weddings, quinceañeras, galas, corporate events, and anniversaries.",
  },
  {
    match: /digital|signature|pro|difference|compare|which booth|which experience/i,
    answer:
      "Digital Experience: interactive and share-first — unlimited digital photos, GIFs, boomerangs, instant sharing, custom overlay, fun props, 3 hours + setup/breakdown. Signature Experience: DSLR + pro lighting, unlimited prints, unlimited digital sharing, premium backdrop & props, 3 hours + setup/breakdown — ideal when you want keepsake prints. Weddings and galas often choose Signature; parties and corporate mixers often love Digital. Tell us your event and we'll recommend the best fit.",
  },
  {
    match: /included|package|what do i get|what's in|gifs?|boomerang|overlay|3 hour|three hour/i,
    answer:
      "We offer two main packages (both include 3 hours of service and professional setup/breakdown): Digital Experience — unlimited digital photos, GIFs & boomerangs, instant sharing, custom overlay, fun props. Signature Experience — DSLR, pro lighting, unlimited prints, unlimited digital sharing, premium backdrop & props. Extra hours and add-ons available — share your date and venue for a custom quote.",
  },
  {
    match: /school|holiday party|birthday party|private event|social gathering/i,
    answer:
      "The Digital Experience is a great match for birthday parties, school functions, holiday parties, and private events — interactive, easy to share, and built for groups. Tell us your date, venue, and guest count and we'll confirm availability and pricing.",
  },
  {
    match: /wedding|quince|quinceañera|gala|anniversary|mitzvah/i,
    answer:
      "For weddings, quinceañeras, galas, and anniversary celebrations, many clients choose our Signature Experience — DSLR quality, pro lighting, unlimited prints, premium backdrop and props, plus unlimited digital sharing. Digital is also available if you want a more social, GIF-forward vibe. Share your date and venue and we'll help you pick.",
  },
  {
    match:
      /add[\s-]*ons?|addons|optional|extra hour|additional hour|more hours|online gallery|memory album|guest album|custom backdrop|idle time|coverage during/i,
    answer: OPTIONAL_ADDONS_REPLY,
  },
  {
    match: /corporate enhancement|brand(ed)?|logo|welcome screen|event-specific graphic|match your brand|company branding/i,
    answer:
      "Corporate Enhancements customize the booth to your brand: branded photo template, company logo integration, custom welcome screen, and event-specific graphics. These go beyond the standard custom overlay — great for galas, activations, and client-facing events. Ask for a quote with your brand assets and event date.",
  },
  {
    match: /lead capture|collect email|email collection|phone collection|opt-in|marketing|crm|follow-up list|guest data/i,
    answer:
      "Our Lead Capture add-on turns booth engagement into marketing opportunities: email collection, phone number collection, and marketing opt-in forms. Pair it with Corporate Enhancements for a fully on-brand corporate activation. Share your event goals and we'll outline options in your quote.",
  },
  {
    match: /corporate|trade show|product launch|activation|gala/i,
    answer:
      "For corporate events we offer Digital or Signature packages plus add-ons: Corporate Enhancements (branded templates, logo, welcome screen, event graphics) and Lead Capture (email, phone, marketing opt-ins). Many clients want both for galas and activations. Tell us your venue, date, and branding goals for a tailored quote.",
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
      `Pricing depends on booth type, hours, date, travel, and add-ons like custom branding. I don't have your exact rate here — share your event date, venue, and hours and our team will send personalized pricing within 24 hours. You can also email ${BUSINESS.email}.`,
  },
  {
    match: /quote|book|availability|consult|june|wedding date/i,
    answer:
      "I'd love to get you a quote. Use the form below this chat to send your details to our team (we'll follow up fast), or scroll to the contact section on our site. Include event type, date, venue, and booth preference if you have one.",
  },
  {
    match: /wedding|mitzvah|birthday|event type|graduation/i,
    answer:
      "We do weddings, corporate events, mitzvahs, quinces, holiday parties, school events, birthdays, graduations, and private celebrations. Tell us your goals and we'll match Digital, Signature, and any corporate add-ons.",
  },
  {
    match: /phone|call|human|talk to someone|email/i,
    answer:
      `Reach us anytime at ${BUSINESS.email}. This chat is here 24/7 for quick answers; our team follows up on quotes personally.`,
  },
];

export function faqFallback(userMessage: string): string {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return "Ask me about booth types, packages, travel, or setup — or tap a quick question above.";
  }

  if (asksAboutAddOns(trimmed)) {
    return OPTIONAL_ADDONS_REPLY;
  }

  for (const rule of FAQ_RULES) {
    if (rule.match.test(trimmed)) return rule.answer;
  }

  return `Thanks for your question. For the most accurate answer about "${trimmed.slice(0, 60)}${trimmed.length > 60 ? "…" : ""}", our team can help personally — tap "Send to our team" below or email ${BUSINESS.email}. You can also browse booth options at ${BUSINESS.site}/#booths.`;
}

export function shouldSuggestLead(userMessage: string): boolean {
  return /quote|book|availability|consult|follow up|call me|contact|pricing|rush|asap|june|wedding|corporate event/i.test(
    userMessage,
  );
}
