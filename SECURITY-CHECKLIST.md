# The Rio Security Checklist

## Implemented in this build
- Separate component files for major sections.
- Separate `payment.html` page.
- CSP + HSTS + anti-clickjacking + MIME sniffing + referrer + permissions headers.
- Payment page avoids handling raw card/CVV/bank credentials.
- Client booking reference uses Web Crypto rather than `Math.random()`.
- Booking note has a 500-character client-side limit.
- Payment checkout URL must be HTTPS.

## Still required before a real launch
1. Create bookings on a trusted server.
2. Recalculate prices server-side from package/add-on IDs.
3. Validate date/time availability server-side.
4. Use a provider-hosted checkout or server-created payment session.
5. Verify provider webhooks/signatures server-side before marking a booking paid.
6. Store secrets only in server/hosting secret storage.
7. Add rate limiting, CSRF protection where cookie/session auth is used, structured logging, and alerting.
8. Restrict CORS to your production origin if an API is added.
9. Run `npm audit` and update dependencies regularly.
10. Test CSP/header behavior on the actual production domain.

> No static front-end can honestly be described as “fully secure” by itself. The final security boundary must be the server/payment provider.
