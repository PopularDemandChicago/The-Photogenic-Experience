import { NextResponse } from "next/server";
import { CHAT_SYSTEM_PROMPT, faqFallback } from "@/lib/chat-knowledge";

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 2000;

function sanitizeMessages(input: unknown): IncomingMessage[] | null {
  if (!Array.isArray(input)) return null;
  const messages: IncomingMessage[] = [];
  for (const item of input.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") continue;
    const role = (item as IncomingMessage).role;
    const content = (item as IncomingMessage).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim().slice(0, MAX_CONTENT_LENGTH);
    if (!trimmed) continue;
    messages.push({ role, content: trimmed });
  }
  return messages.length ? messages : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "Missing user message." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: faqFallback(lastUser.content),
      mode: "faq" as const,
    });
  }

  const model = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 400,
      messages: [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    console.error("Chat API: OpenAI error", response.status, await response.text());
    return NextResponse.json({
      reply: faqFallback(lastUser.content),
      mode: "faq" as const,
    });
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return NextResponse.json({
      reply: faqFallback(lastUser.content),
      mode: "faq" as const,
    });
  }

  return NextResponse.json({ reply, mode: "ai" as const });
}
