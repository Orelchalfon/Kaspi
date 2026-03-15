---
name: nextjs-seo
description: Integrates the nextjs-seo skill from laguagu/claude-code-nextjs-skills into this project and explains when to use it for search-engine-optimized Next.js pages, metadata, Open Graph, and structured data.
---

# Next.js SEO Skill (Project Wrapper)

## Purpose

This Skill tells the agent **how and when to use the external `nextjs-seo` Skill** from:

```bash
pnpm dlx skills add https://github.com/laguagu/claude-code-nextjs-skills --skill nextjs-seo
```

Use this Skill whenever:

- The user asks for **SEO** improvements in a **Next.js** app.
- You are working on:
  - Page `metadata` / `<head>` tags in the App Router
  - Open Graph (OG) and Twitter card tags
  - Canonical URLs, sitemaps, robots.txt
  - Structured data (JSON-LD) for products, articles, or organizations.

This wrapper does **not** re-implement the external logic; it documents **triggers and integration points** for this repository so the agent knows when to lean on SEO best practices.

---

## Installation Command (for this project)

To install or refresh the underlying Skill in this project, run from the repo root:

```bash
pnpm dlx skills add https://github.com/laguagu/claude-code-nextjs-skills --skill nextjs-seo
```

This:

- Executes the `skills` CLI via `pnpm dlx`.
- Adds the `nextjs-seo` Skill provided by `laguagu/claude-code-nextjs-skills`.
- Makes SEO‑specific helpers and patterns available to your agent environment.

> As the agent, **do not run this command automatically**. Instead, suggest it when the user asks to install or enable the Next.js SEO Skill.

---

## When to Apply This Skill in This Repo

Apply `nextjs-seo` guidance whenever:

- You modify or create pages under `apps/web/app/**` that should rank in search engines.
- You touch:
  - `generateMetadata` functions or `metadata` exports.
  - Layout files that define default SEO (title template, description, icons).
  - API routes for sitemaps or robots (e.g., `app/sitemap.ts`, `app/robots.txt`).
- The user explicitly mentions:
  - “SEO for Next.js”
  - “Open Graph / OG tags”, “Twitter cards”
  - “structured data”, “JSON-LD”
  - “sitemap” or “robots.txt”.

---

## Agent Workflow

When this Skill is relevant, follow this workflow:

1. **Identify the page or route**
   - Is it a marketing/landing page (`/`, `/pricing`, `/blog/[slug]`)?
   - Is it a layout that defines shared SEO defaults?

2. **Apply Next.js SEO conventions**
   - Prefer the **App Router** `metadata` API (e.g., `export const metadata` or `export async function generateMetadata()`).
   - Ensure all user-facing routes have:
     - Title and description.
     - Canonical URL if appropriate.
     - OG/Twitter preview configuration for key pages.

3. **Map content to SEO fields**
   - Derive `title`, `description`, and OG copy from the page’s hero + primary content.
   - Use consistent brand naming (“Kaspi”) and avoid keyword stuffing.

4. **Consider structured data when high value**
   - For rich pages (pricing, product, article), consider JSON-LD structures:
     - `Organization`, `WebSite`, `BreadcrumbList`, `Product`, or `Article`.
   - Ensure the data matches the visible content (no misleading markup).

5. **Verify technical SEO basics**
   - No duplicate titles or conflicting canonical tags.
   - Meta tags are unique per significant route.
   - Links use semantic elements and descriptive text.

> For low-level patterns (exact fields, recommended tag sets, etc.), rely on the guidance from the upstream `nextjs-seo` Skill and Next.js docs.

---

## Example Usage

### Example 1 – Add SEO to the landing page (`/`)

User: “Make the Kaspi landing page SEO-friendly for Hebrew + English.”

Agent should:

1. Recognize this as a **Next.js SEO** case and apply this Skill.
2. Ensure:
   - The root layout/page exports `metadata` with localized title/description.
   - OG/Twitter tags match the main hero promise (clarity, control, automation).
   - Canonical URL points to the production domain when known.

### Example 2 – Structured data for pricing

User: “Add structured data to the pricing page.”

Agent should:

1. Apply this Skill and reference `nextjs-seo` patterns.
2. Introduce a `Product` or `Offer` JSON-LD block that matches the visible pricing tiers.

---

## Notes & Best Practices

- Always keep SEO content **truthful** and consistent with what users see.
- Avoid over-optimizing; prioritize clarity and accessibility over keyword stuffing.
- When in doubt about specific JSON-LD shapes or tag sets, defer to:
  - The upstream `nextjs-seo` Skill.
  - Official Next.js and search engine documentation.

