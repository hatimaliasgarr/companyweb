# Zerobugg

Production website for **Zerobugg — Your Digital Growth & Technology Partner**.

The site uses the Next.js App Router through Vinext and is prepared for deployment on OpenAI Sites / Cloudflare Workers. It includes the responsive marketing experience, service and solution pages, sample case studies, editorial routes, careers, legal pages, structured metadata, sitemap, robots rules, and a validated contact API boundary.

## Local development

```bash
npm install
npm run dev
```

## Docker

The site runs in Docker without Cloudflare-specific bindings — the container builds with Vinext and serves via the Node production server (`server.mjs`), the same flow as `npm run build && npm start`. D1/R2 are not used by any route, so no database service is required.

```bash
npm run docker:build   # build the zerobugg-web image
npm run docker:run     # run on http://localhost:3000
# or via Compose:
npm run docker:up
npm run docker:down
```

The image is multi-stage (build → runtime), runs as the non-root `node` user, serves on `0.0.0.0:3000` (override with `PORT`/`HOST`), and includes a built-in healthcheck. Deployment to Cloudflare Workers is unaffected.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm test
```

## Contact form

The form posts JSON to `POST /api/contact` and the inquiry is emailed server-side to `office@zerobugg.in`; visitors never open a mail client.

- `app/lib/contact-inquiry.ts` — validation, sanitisation, email templates and rate limiting, shared by both boundaries.
- `api/contact.ts` — Vercel serverless function (Node runtime). This is the endpoint in production on Vercel.
- `app/api/contact/route.ts` — the same contract for the Node/Docker server. Cloudflare Workers cannot open SMTP sockets, so that target returns 503 and logs the reason.

Delivery uses Nodemailer over Gmail SMTP and needs `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Google App Password, never the account password). Without them the endpoint returns 503 and no secret ever reaches the browser. `npm run dev` runs routes in workerd, so use `vercel dev` or `npm run build && npm start` to exercise real delivery locally.

Portfolio concepts, testimonials, careers, and any outcome metrics remain explicitly labeled for verification before commercial publication.
