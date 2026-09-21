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
- `app/lib/send-inquiry.ts` — delivery via the Resend HTTP API. Runtime-agnostic: one `fetch`, no Node-only imports.
- `app/api/contact/route.ts` — the endpoint for the Cloudflare Worker (production), the dev server and the Node/Docker server.
- `api/contact.ts` — the same contract as a Vercel serverless function.

Delivery is an HTTPS call, not SMTP, because Cloudflare Workers cannot open TCP sockets. Set `RESEND_API_KEY` (and optionally `CONTACT_FROM`, whose domain must be verified in Resend). Without the key the endpoint returns 503 and no secret ever reaches the browser. `Reply-To` is the visitor, so replying from the inbox answers them directly.

Portfolio concepts, testimonials, careers, and any outcome metrics remain explicitly labeled for verification before commercial publication.
