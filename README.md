# Zerobugg

Production website for **Zerobugg — Your Digital Growth & Technology Partner**.

The site uses the Next.js App Router through Vinext and is prepared for deployment on OpenAI Sites / Cloudflare Workers. It includes the responsive marketing experience, service and solution pages, sample case studies, editorial routes, careers, legal pages, structured metadata, sitemap, robots rules, and a validated contact API boundary.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npx tsc --noEmit
npm test
```

Contact submissions are validated by `app/api/contact/route.ts`. Connect the marked integration boundary to the chosen email, CRM, or database provider before collecting live enquiries.

Portfolio concepts, testimonials, careers, and any outcome metrics remain explicitly labeled for verification before commercial publication.
