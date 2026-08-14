# Mahakal Darshan Booking — Frontend

React (Vite) booking website for the **Shri Mahakaleshwar Temple WhatsApp Bot**, themed after the official website [shrimahakaleshwar.mp.gov.in](https://www.shrimahakaleshwar.mp.gov.in/) (amber/saffron palette, deep maroon, Playfair Display serif).

Opened from the WhatsApp bot's CTA button with a personalised deep link:

```
https://<frontend-host>/?m=<mobile>&n=<name>&lang=<en|hi>&service=<sheeghra-darshan|bhasma-aarti|pujan>
```

## User flow

1. **Home** — hero with temple photo, online services (Sheeghra Darshan ₹250, Bhasma Aarti ₹200, Pujan/Abhishek from ₹100), aarti timings, About section (with link to the official website)
2. **Booking** — pick a date (next 7 days), an hourly slot with live-looking availability (or a Pujan type from the official price list), number of persons (1–6)
3. **Visitor details** — name, age, gender, ID proof (Aadhaar/Passport) per visitor — same form pattern as the official portal
4. **Pay with UPI** — choose GPay / PhonePe / Paytm / BHIM (demo payment, ~2s simulated latency)
5. **Success** — QR e-ticket (rendered with `qrcode.react`), booking ID `MK-xxxx`, then auto-redirect back to WhatsApp with a prefilled `Ticket MK-xxxx` message (the bot replies with the QR ticket in chat)

Fully bilingual — English / हिंदी toggle in the header; initial language comes from the `lang` query param set by the bot.

## Run

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # production build in dist/
```

Backend API base: `POST /whatsapp/bot/api/v1/temple/booking` and `POST /whatsapp/bot/api/v1/temple/booking/{id}/confirm` (see `.env.local.example`). If the backend is unreachable the app gracefully falls back to a demo booking ID so the flow never breaks.

## Deploy (Vercel)

Set the backend host in `vercel.json` — API calls are proxied server-side (`/whatsapp/bot/*` → backend), so keep `VITE_API_BASE_URL` empty.
