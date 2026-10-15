import { NextResponse } from "next/server";
import { inquirySubject, inquiryText, isSpamTrap, parseInquiry } from "@/lib/inquiry";

const FALLBACK_ERROR =
  "We couldn't send your inquiry. Email hello@thephotogenicexperience.com or try again shortly.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (isSpamTrap(body)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@thephotogenicexperience.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "The Photogenic Experience <hello@thephotogenicexperience.com>";

  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 500 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: parsed.inquiry.email,
      subject: inquirySubject(parsed.inquiry),
      text: inquiryText(parsed.inquiry),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Contact form: Resend rejected the email.", response.status, detail);
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
