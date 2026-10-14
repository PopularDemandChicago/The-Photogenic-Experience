# Contact form email (Resend)

The live form sends mail through [Resend](https://resend.com) via `/api/contact`.

## 1. Resend

1. Create a free account at [resend.com](https://resend.com).
2. **Domains → Add domain** → `thephotogenicexperience.com`.
3. Add the DNS records Resend shows (in GoDaddy → DNS, same place as Vercel).
4. Wait until the domain shows **Verified**.
5. **API Keys → Create** and copy the key (starts with `re_`).

## 2. Vercel environment variables

Project → **Settings → Environment Variables** (Production):

| Name | Value |
|------|--------|
| `RESEND_API_KEY` | your `re_…` key |
| `CONTACT_TO_EMAIL` | inbox for inquiries (default: `hello@thephotogenicexperience.com`) |
| `CONTACT_FROM_EMAIL` | `The Photogenic Experience <hello@thephotogenicexperience.com>` |

Use a **from** address on the domain you verified in Resend.

## 3. Redeploy

After saving env vars, **Deployments → … → Redeploy** (or push a commit).

## 4. Test

Submit the form on the site. You should receive email at `CONTACT_TO_EMAIL`. Check spam once. In Resend **Emails**, you can see delivery logs.

If the API key is missing, the form shows an error instead of “Thank you.”
