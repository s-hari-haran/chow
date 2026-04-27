# GuardCheck — TanStack Start App

QR-based attendance app for security guards built on TanStack Start (React 19 + TanStack Router + Vite 7), Tailwind v4, shadcn/ui, and Supabase.

## Stack

- **Frontend / SSR**: TanStack Start (`@tanstack/react-start`) + React 19
- **Build tool**: Vite 7 (wrapped by `@lovable.dev/vite-tanstack-config`)
- **UI**: Tailwind CSS v4, Radix UI, shadcn/ui components
- **Data**: `@tanstack/react-query`, Supabase (`@supabase/supabase-js`)
- **Forms / Validation**: react-hook-form + zod
- **Languages**: TypeScript

## Project Layout

- `src/routes/` — TanStack Router file-based routes (`__root.tsx`, `_app.*.tsx`, `login.tsx`, `signup.tsx`)
- `src/components/` — UI components (incl. shadcn/ui)
- `src/lib/` — utilities, auth context, Supabase client
- `src/integrations/` — third-party integrations
- `src/hooks/` — React hooks
- `supabase/` — Supabase migrations / config
- `vite.config.ts` — Vite config (wraps `@lovable.dev/vite-tanstack-config`)
- `wrangler.jsonc` / `netlify.toml` — original Cloudflare/Netlify deploy presets (not used on Replit)

## Replit Setup

- **Workflow**: `Start application` runs `npm run dev` on port `5000` (webview).
- **Vite dev server**: bound to `0.0.0.0:5000`, `allowedHosts: true` so the Replit iframe proxy can reach it.
- **Env vars**: stored in `.env` (Supabase URL + keys, Resend, etc.).
- **Head rendering**: `<HeadContent />` is rendered inside `<body>` (not `<head>`) in `src/routes/__root.tsx`. React 19 auto-hoists the `<title>`, `<meta>`, and `<link>` elements to the document head, while `<head>` is left empty in the React tree. This avoids React 19 hydration mismatches caused by the Replit dev preview iframe injecting a devtools `<script>` into the document head between SSR and hydration. `defaultSsr: false` is also set on the router for safety.

## Scripts

- `npm run dev` — start Vite SSR dev server
- `npm run build` — production build (outputs `dist/client/` + `dist/server/server.js`)
- `npm run preview` — preview built client
- `npm run lint` / `npm run format`

## Deployment

Configured as **autoscale**:

- **Build**: `npm run build` — produces `dist/client/` (static assets) and `dist/server/server.js` (Node-compatible fetch handler).
- **Run**: `node server.mjs` — small `srvx`-based Node HTTP server that serves the static assets from `dist/client` and forwards all other requests to the SSR fetch handler. Listens on `process.env.PORT` (Replit autoscale sets this) and falls back to `5000`.

`vite.config.ts` passes `cloudflare: false` to `@lovable.dev/vite-tanstack-config` so the build targets a generic Node/web fetch runtime instead of Cloudflare Workers. The original `wrangler.jsonc` and `netlify.toml` are kept for reference but unused on Replit.
