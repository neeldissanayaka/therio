# The Rio — Production Architecture

Browser → HTTPS reverse proxy → Express API + Vite static assets → PostgreSQL
                                                ↘ PayHere hosted checkout
PayHere → `POST /api/payments/payhere/notify` → signature verification → PostgreSQL
Admin browser → HttpOnly SameSite cookie → protected admin API → booking management

### Trust boundaries
- Browser values are untrusted.
- Package/add-on prices are resolved only from the server catalog.
- Booking slot uniqueness is enforced by a database unique key.
- Booking creation supports an Idempotency-Key.
- PayHere success is accepted only after server-side checksum verification and amount/currency matching.
- Payment secrets never enter Vite/client code.
