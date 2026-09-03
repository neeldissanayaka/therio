# The Rio — Dedicated Payment Page Flow

1. Every Book / Reserve CTA opens the existing booking form.
2. The booking form creates a pending booking through `POST /api/bookings`.
3. On success, the browser immediately navigates to `/payment.html?booking=<publicRef>`. There is no payment popup and no in-modal payment confirmation step.
4. The dedicated payment page fetches a safe booking summary from `GET /api/bookings/:ref`.
5. The customer clicks **Continue to secure payment**.
6. The browser asks `POST /api/bookings/:ref/checkout` for a server-generated PayHere checkout payload.
7. The server calculates/signs the PayHere hash and returns only the checkout fields required by PayHere.
8. The browser posts those fields to PayHere's hosted checkout.
9. PayHere calls `/api/payments/payhere/notify`; the server verifies the signature and amount/currency before marking the booking paid.
10. The PayHere return page polls the safe booking endpoint briefly so the customer sees the server-confirmed status.

The frontend never receives the PayHere merchant secret and never handles raw card/CVV data.
