# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start Vite dev server
npm run build         # tsc -b && vite build
npm run lint          # ESLint check
npm run preview       # Preview production build
npm run generate:routes  # Regenerate TanStack Router route tree (run after adding/renaming route files)
```

There is no test suite configured.

## Architecture

This is a React 19 + TypeScript single-page app that acts as a Guild Wars 2 API client. It uses **file-based routing** via TanStack React Router — every file under `src/routes/` becomes a route, and the route tree is auto-generated into `src/routeTree.gen.ts` (do not edit manually; run `generate:routes` after route changes). Vite handles the build with the TanStack Router plugin enabling automatic code splitting.

**Data fetching** uses TanStack React Query. Query hooks live in `*-queries.ts` files alongside their feature module. All GW2 API calls hit `https://api.guildwars2.com/v2` with an `access_token` query param pulled from localStorage via the `useApiKey` hook. Queries are disabled (pass `enabled: false`) when no API key is present.

**Import alias**: `@/` maps to `src/`.

### Directory layout

```
src/
  routes/          # Page-level route components (file = route)
  components/
    ui/            # Shadcn/Radix primitive components (generated, rarely edited)
    sidebar/       # App navigation sidebar
  hooks/           # Cross-cutting hooks: useApiKey, useLocalStorage, use-mobile
  utils/           # API base URL, color helpers, date utilities
  lib/             # cn() utility from shadcn
  # Feature modules (co-located types, queries, components):
  account/
  character/
  equipmentTabs/
  item/
  legendaries/
  profession/
  achievements/
  wvw/
```

### Feature module pattern

Each domain area (e.g., `character/`) groups together:
- `*-types.ts` — TypeScript types for GW2 API response shapes
- `*-queries.ts` — TanStack Query hooks (e.g., `useCharacters()`)
- `components/` — React components scoped to that domain

### UI

Styling is Tailwind CSS 4. UI primitives come from Shadcn (Radix UI wrappers in `src/components/ui/`). Charts use Recharts. Notifications use Sonner. Theming via next-themes.

### Navigation routes

Defined in `src/routes/routes.ts` and rendered in the sidebar:
`/` · `/daily` · `/characters` · `/legendary` · `/legendary-finder` · `/account`
