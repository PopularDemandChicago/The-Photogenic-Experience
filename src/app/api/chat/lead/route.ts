import { NextResponse } from "next/server";
import { BUSINESS } from "@/lib/chat-knowledge";

const FALLBACK_ERROR =
  "We couldn't send that right now. Please call (773) 639-8099 or email hello@thephotogenicexperience.com.";

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const name = field(record, "name");
  const email = field(record, "email");
  const phone = field(record, "phone");
  const eventSummary = field(record, "eventSummary");
  const transcript = field(record, "transcript");

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const phoneDigits = phone.replace(/\D/g, "").length;
  if (phone && (phoneDigits < 7 || phone.length > 40)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || BUSINESS.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    `The Photogenic Experience <${BUSINESS.email}>`;
  const bookingUrl = process.env.BOOKING_URL?.trim();

  if (!apiKey) {
    console.error("Chat lead: RESEND_API_KEY is not set.");
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 500 });
  }

  const teamLines = [
    "New lead from the website AI chat",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "Phone: (not provided)",
    "",
    eventSummary ? `Event / interest:\n${eventSummary}` : "Event / interest: (not provided)",
  ];
  if (transcript) {
    teamLines.push("", "Recent chat:", transcript.slice(0, 6000));
  }
  teamLines.push("", `Site: ${BUSINESS.site}/#contact`);

  const teamResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Hot lead — ${name} (website chat)`,
      text: teamLines.join("\n"),
    }),
  });

  if (!teamResponse.ok) {
    console.error("Chat lead: team email failed", teamResponse.status, await teamResponse.text());
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 502 });
  }

  const guestLines = [
    `Hi ${name.split(" ")[0] || name},`,
    "",
    "Thanks for chatting with The Photogenic Experience. Here's a quick recap:",
    "",
    eventSummary || "We received your request and will follow up with pricing, availability, and recommendations.",
    "",
    `Browse our booths: ${BUSINESS.site}/#booths`,
    `Full inquiry form: ${BUSINESS.site}/#contact`,
  ];
  if (bookingUrl) {
    guestLines.push(`Schedule a consultation: ${bookingUrl}`);
  }
  guestLines.push("", `Questions? Call us at ${BUSINESS.phone} or reply to this email.`);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: BUSINESS.email,
      subject: "Your photo booth inquiry — The Photogenic Experience",
      text: guestLines.join("\n"),
    }),
  });

  return NextResponse.json({ ok: true });
}
