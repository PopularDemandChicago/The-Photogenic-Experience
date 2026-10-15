# Website AI chat assistant

Floating **Photogenic Assistant** on every page:

- Answers FAQs (booths, packages, travel, setup) 24/7
- Uses **OpenAI** when `OPENAI_API_KEY` is set on Vercel; otherwise built-in FAQ answers
- **Hot leads**: “Send to our team” emails your inbox (and a recap to the guest) via **Resend** (`RESEND_API_KEY`)

## Vercel environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | For lead alerts | Same as contact form |
| `CONTACT_TO_EMAIL` | Recommended | Team inbox for chat leads |
| `OPENAI_API_KEY` | Optional | Smarter, conversational replies |
| `OPENAI_CHAT_MODEL` | Optional | Default `gpt-4o-mini` |
| `BOOKING_URL` | Optional | Used in guest follow-up email |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | “Book a consultation” link in chat |

Redeploy after changing env vars.

## Voice AI / phone (future)

This widget is **text chat on the website**. The same business knowledge in `src/lib/chat-knowledge.ts` can power a phone agent (Vapi, Retell, etc.) and real calendar booking when you connect those services.

## Customize answers

Edit `src/lib/chat-knowledge.ts` (`CHAT_SYSTEM_PROMPT`, `FAQ_RULES`, `QUICK_PROMPTS`).
