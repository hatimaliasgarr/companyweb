# Zeroberg Codex workflow

## Project context

- Stack: React 19, TypeScript, Vinext/Next.js App Router conventions, Vite, Tailwind CSS 4, Cloudflare Workers, Drizzle ORM, and D1.
- Treat `app/data.ts` as content and route data, `app/components/` as the main UI surface, `app/api/` as server boundaries, and `worker/` as the Cloudflare runtime entry point.
- Preserve the existing stack and design direction unless the user explicitly requests a migration or redesign.

## Skill routing

- New pages, redesigns, or substantial visual work: use `frontend-design` first, then apply `vercel-react-best-practices` and `vercel-composition-patterns` during implementation.
- UI reviews and accessibility work: use `web-design-guidelines` and validate important states with `playwright` at desktop and mobile widths.
- Cloudflare Workers, D1, Wrangler, hosting, or deployment work: use `cloudflare-deploy`.
- Explicit security reviews or secure-by-default implementation: use `security-best-practices`.
- Payments, subscriptions, billing, tax, or webhook work: use `stripe-best-practices`.
- Search visibility or indexing work: use `seo-audit`.
- Landing-page, contact-form, signup, or conversion work: use `cro`; pair it with `seo-audit` only when acquisition and conversion are both in scope.
- Bugs, failing tests, regressions, or unclear behavior: use `systematic-debugging` to reproduce the issue and identify the root cause before changing code.
- When implementing a bug fix, use `test-driven-development` where practical and apply `verification-before-completion` before reporting the issue as resolved.
- Slow pages, APIs, or server response-time work: establish a measured baseline, then use `performance` and `core-web-vitals`; add `react-doctor` for React-specific rendering or architecture diagnostics, and use `k6` for repeatable load, stress, spike, soak, or throughput testing.
- Keep latency and throughput distinct: report response time in milliseconds or percentiles, and response rate as requests per second. Compare the same workload before and after a fix.

## Working conventions

- Keep changes focused and preserve unrelated user edits.
- Do not invent testimonials, customers, case-study results, or performance claims. Keep unverifiable commercial content clearly marked for review.
- Prefer server-rendered content for public marketing and SEO routes. Use client components only where interaction requires them.
- Treat contact, authentication, database, payment, and webhook inputs as untrusted. Validate at the server boundary and avoid exposing secrets to client code.
- For material UI changes, check keyboard use, focus states, reduced motion, responsive layout, overflow, console errors, and the primary user flow.

## Validation

Run the checks relevant to the change before handoff:

```powershell
npm run lint
npx tsc --noEmit
npm test
```

For UI work, also perform browser validation at representative desktop and mobile viewports. For deployment changes, run a production build before publishing and confirm the deployed health endpoint or page after publishing.
