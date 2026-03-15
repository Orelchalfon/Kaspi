# Kaspi – shadcn/ui monorepo

This is a Next.js monorepo using shadcn/ui, Tailwind CSS, and a shared `ui` package.

## Getting started

Install dependencies with pnpm:

```bash
pnpm install
```

Start the dev server (via Turbo, which runs the `web` app):

```bash
pnpm dev
```

This will boot the Next.js app in `apps/web`.

## Foundation (Phase 01)

Phase 01 focuses only on project foundation and app bootstrapping:

- Tailwind CSS and shadcn/ui are configured in the shared `packages/ui` package and consumed by `apps/web` via `@workspace/ui/globals.css`.
- `next-themes` is wired through `apps/web/components/theme-provider.tsx` with dark mode as the default and a `d` hotkey to toggle themes.
- The Heebo font is configured via `next/font/google` as the primary sans font in `apps/web/app/layout.tsx`.
- The root layout is RTL-ready while remaining LTR by default (`dir="ltr"` on the `<html>` element).

For more details about the foundation phase and its scope, see `.cursor/rules/01-foundation.mdc`.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package:

```tsx
import { Button } from "@workspace/ui/components/button";
```
