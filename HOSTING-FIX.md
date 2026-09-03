# Hosting fix — Vercel 404 for booking/payment/admin

The 404 happened because Vite was configured as a single-page build. `booking.html`, `payment.html`, and `admin.html` existed in the source project but were not registered as Rollup HTML entry points, so they could be missing from `dist/` after `vite build`.

## Correct Vercel deployment

1. Deploy the **project root** (the folder containing `package.json` and `vite.config.ts`), not the old `dist` folder.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Install command: `npm install`

After build, `dist/` must contain:

- `index.html`
- `booking.html`
- `payment.html`
- `admin.html`
- bundled assets

## Important

If you are using Vercel and your Git repository has this project in a subfolder, set that subfolder as **Root Directory** in the Vercel project settings.

Do not manually upload only `index.html` or an old `dist` directory.

## Backend

The Express/Prisma API under `server/` is separate from the Vite static frontend. For production PayHere + database functionality, deploy the API/server to a Node-capable service and set the frontend environment variables to the production API URL.
