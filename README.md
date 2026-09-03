# The Rio — V18 UI/UX Experience

A premium, UI/UX-first redesign for The Rio private cinema + PS5 experience.

## V18 focus
- Experience-led visual hierarchy instead of contact/location-heavy content
- Cleaner navigation and persistent section rail on desktop
- Stronger editorial typography and interaction states
- Progressive booking flow with no phone/location fields
- Conversion-focused final section built around choosing the experience
- Premium final-frame footer instead of a contact-information dump
- Responsive mobile behavior and reduced-motion support

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```


## Security / production notes

- Each major UI section is already isolated in `src/components/` and `App.tsx` composes them.
- `payment.html` is a separate checkout surface and intentionally does not collect card data.
- Security headers are included for Netlify-style `_headers` hosting and Vercel.
- Do not place payment secrets, Gemini secrets, or database credentials in `VITE_*` variables.
- For real bookings, move booking creation, availability checks, prices, and payment-session creation to a server/API. Never trust client-supplied totals.
- Configure HTTPS at the hosting layer and keep dependencies updated with `npm audit`.
- The current booking confirmation is a front-end demo; it is not a tamper-proof reservation system until backed by a server/database.
