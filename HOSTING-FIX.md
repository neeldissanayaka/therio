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


## Mobile viewport + social preview hardening (latest)

- Mobile layout uses `100vw` at the section/root boundary to avoid first-paint narrow-canvas behavior seen on some Chromium mobile builds.
- `html`, `body`, and `#root` clip horizontal overflow without relying on a centered transformed wrapper.
- Hero reveal wrapper is explicitly neutralized on mobile.
- Open Graph/Twitter image URLs are absolute HTTPS URLs so social crawlers can resolve the preview image reliably.
- If the production domain changes, update the absolute `og:url` and image host in the HTML files.
