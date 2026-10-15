"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { BUSINESS, QUICK_PROMPTS, shouldSuggestLead } from "@/lib/chat-knowledge";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your Photogenic Experience assistant — here 24/7 for booth options, packages, travel, and setup questions. I can also send your details to our team for a custom quote. How can I help?",
};

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWidget() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadDone, setLeadDone] = useState(false);

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages, showLeadForm, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendUserMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: newId(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    if (shouldSuggestLead(trimmed)) {
      setShowLeadForm(true);
    }

    try {
      const payload = nextMessages
        .filter((m) => m.id !== "welcome")
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      const reply =
        data.reply ||
        data.error ||
        "I'm having trouble responding right now. Email hello@thephotogenicexperience.com or use the form below to reach our team.";

      setMessages((prev) => [...prev, { id: newId(), role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content:
            "Connection issue — please try again or email hello@thephotogenicexperience.com. You can also send your details with the form below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendUserMessage(input);
  };

  const onLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadError("");
    setLeadSending(true);

    const form = new FormData(e.currentTarget);
    const transcript = messages
      .slice(-8)
      .map((m) => `${m.role === "user" ? "Guest" : "Assistant"}: ${m.content}`)
      .join("\n");

    try {
      const response = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          eventSummary: form.get("eventSummary"),
          transcript,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setLeadError(data.error || "Could not send. Please call us.");
        return;
      }
      setLeadDone(true);
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content:
            "You're all set — our team has your info and will follow up soon (usually within 24 hours). Check your email for a recap. Anything else I can answer?",
        },
      ]);
    } catch {
      setLeadError("Could not send. Please email hello@thephotogenicexperience.com.");
    } finally {
      setLeadSending(false);
    }
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border border-accent/40 bg-luxury-charcoal px-5 py-3 text-sm font-medium text-white shadow-luxury-lg transition hover:border-accent hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:bottom-8 md:right-8"
          aria-expanded={false}
          aria-controls="photogenic-chat-panel"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </span>
          <span className="hidden sm:inline">Ask our AI assistant</span>
          <span className="sm:hidden">Chat</span>
        </button>
      ) : null}

      {open ? (
        <div
          id="photogenic-chat-panel"
          ref={panelRef}
          role="dialog"
          aria-labelledby={titleId}
          className="fixed bottom-0 right-0 z-[60] flex h-[min(100dvh,680px)] w-full flex-col border-l border-t border-white/10 bg-luxury-black shadow-luxury-lg sm:bottom-6 sm:right-6 sm:h-[min(85dvh,620px)] sm:w-[min(100vw-2rem,400px)] sm:rounded-2xl sm:border"
        >
          <header className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-4">
            <div>
              <p id={titleId} className="font-display text-lg font-light text-white">
                Photogenic Assistant
              </p>
              <p className="text-xs text-luxury-platinum/60">24/7 answers · leads to your team</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-luxury-platinum/70 transition hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "border border-white/10 bg-luxury-charcoal/80 text-luxury-platinum/90"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-luxury-platinum/50" aria-live="polite">
                Typing…
              </p>
            ) : null}

            {messages.length <= 2 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={loading}
                    onClick={() => void sendUserMessage(prompt)}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-left text-xs text-accent-light transition hover:border-accent/60 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-white/10 px-4 py-3">
            {showLeadForm && !leadDone ? (
              <form onSubmit={onLeadSubmit} className="mb-3 space-y-2 rounded-xl border border-accent/25 bg-luxury-charcoal/50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-light">
                  Send to our team
                </p>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-luxury-black px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-lg border border-white/10 bg-luxury-black px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg border border-white/10 bg-luxury-black px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
                <textarea
                  name="eventSummary"
                  rows={2}
                  placeholder="Event date, type, venue, booth interest…"
                  className="w-full resize-none rounded-lg border border-white/10 bg-luxury-black px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
                {leadError ? (
                  <p className="text-xs text-red-400" role="alert">
                    {leadError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={leadSending}
                  className="btn-primary w-full py-2 text-sm disabled:opacity-50"
                >
                  {leadSending ? "Sending…" : "Notify our team"}
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowLeadForm(true);
                  setLeadDone(false);
                }}
                className="mb-2 w-full text-center text-xs text-accent-light underline-offset-2 hover:underline"
              >
                Send my info to the team for a quote
              </button>
            )}

            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-light hover:underline"
                >
                  Book a consultation
                </a>
              ) : null}
              <Link href="/#contact" className="text-luxury-platinum/60 hover:text-white">
                Full inquiry form
              </Link>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-luxury-platinum/60 hover:text-white"
              >
                {BUSINESS.email}
              </a>
            </div>

            <form onSubmit={onSubmit} className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendUserMessage(input);
                  }
                }}
                rows={1}
                placeholder="Ask about booths, packages, travel…"
                className="max-h-24 min-h-[42px] flex-1 resize-none rounded-xl border border-white/10 bg-luxury-charcoal px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
