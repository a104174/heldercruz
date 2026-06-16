# Hélder Cruz Portfolio

Minimal, premium personal portfolio for Hélder Cruz, built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Resend.

## Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Motion for subtle reveal/modal animations
- Resend for the contact form backend
- Zod validation on `/api/contact`
- Vercel-ready project structure

## Routes

- `/`
- `/projects`
- `/projects/casa-benfica-lenzburg`
- `/projects/xv-studio`
- `/projects/hausb`
- `/about`
- `/experience`
- `/contact`
- `/api/contact`

## Local Setup

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

Validate the project:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Environment Variables

Create a local `.env` from `.env.example`:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

Required for contact email delivery:

- `RESEND_API_KEY`: server-only Resend API key.
- `CONTACT_TO_EMAIL`: inbox that receives portfolio messages.
- `CONTACT_FROM_EMAIL`: verified sender/domain in Resend.
- `NEXT_PUBLIC_SITE_URL`: public site URL used for metadata, sitemap and email origin context.

Do not commit a real `.env` file.

## Resend Notes

The contact form posts to `/api/contact`. The route validates with Zod, rejects short messages, enforces field length limits, includes a hidden honeypot field, applies a basic in-memory IP rate limit and sends via Resend only on the server.

If the Resend environment variables are not configured, the endpoint returns a clear JSON error instead of crashing.

## Project Data

The three selected real projects are centralized in:

```txt
src/data/projects.ts
```

This makes the project grid, detail pages, sitemap and next-project CTA use the same source of truth.

## Next Phase

The repository is ready for page-by-page design refinement: final project mockups, richer case-study storytelling, real social links, a resume PDF link and any production screenshots can be added without changing the core routing or data model.
