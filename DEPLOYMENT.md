# Production deployment

## Architecture
- Vite/React frontend
- Express API server
- PostgreSQL + Prisma
- PayHere Checkout API
- HttpOnly, SameSite=Strict admin session cookie
- Server-side price calculation and booking creation

## Run
1. Copy `.env.example` to `.env` and set secrets.
2. `npm install` in the web root and `npm install` in `server/`.
3. From `server/`, run `npx prisma generate` and `npx prisma migrate deploy`.
4. Seed the admin once from `server/` with `npm run seed`.
5. Build frontend: `npm run build`.
6. Build API from `server/`: `npm run build`.
7. Start API from `server/`: `npm run start`.

## PayHere
Register the exact production domain in PayHere Integrations and obtain its Merchant Secret. PayHere requires the checkout hash to be generated server-side and the notification signature to be verified server-side. The notification URL must be publicly reachable; localhost cannot receive PayHere callbacks.

Set `PAYHERE_SANDBOX=false` for live payments only after sandbox testing.

## Reverse proxy
Put HTTPS Nginx/Cloudflare/a managed load balancer in front of the Express app. Serve the Vite build from the same origin so `/api/*` and the UI share the same cookie/origin boundary.

## Security checklist
- Keep `.env` out of git.
- Rotate `ADMIN_JWT_SECRET` and PayHere secrets if exposed.
- Use a managed PostgreSQL database with TLS and backups.
- Add monitoring/error alerting.
- Run dependency audits and patch regularly.
- Back up PostgreSQL and test restore procedures.
