# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**기룡아 밥먹자!** — A campus dining information service for Kyonggi University. This is a **pnpm monorepo** managed by Turborepo, containing multiple apps and shared config packages.

## Commands

All commands should be run from the repo root unless otherwise noted.

### Development
```bash
pnpm dev           # Start all apps in dev mode (turbo)
pnpm build         # Build all apps
pnpm lint          # Lint all packages
pnpm format        # Prettier format (ts, tsx, md files)
```

### Web App (apps/web)
```bash
cd apps/web
pnpm dev           # next dev
pnpm build         # next build
pnpm lint          # eslint
pnpm lint:fix      # eslint --fix
pnpm test          # jest
pnpm test:watch    # jest --watch
pnpm test:coverage # jest --coverage
pnpm analyze       # Bundle analysis (ANALYZE=true next build)
```

### Running a Single Test
```bash
cd apps/web
pnpm test -- --testPathPattern="ReviewItem"
```

## Monorepo Structure

```
apps/
  web/          # Main Next.js 15 app (App Router) — primary focus
  mobile/       # Expo React Native app
  land/         # SolidJS landing page
  web-legacy/   # Legacy React Router version (reference only)
packages/
  config/       # Shared ESLint and TypeScript configs
```

## Web App Architecture (Feature Sliced Design)

The web app (`apps/web/src/`) strictly follows **FSD (Feature Sliced Design)**. Layers are imported top-down only — never the reverse.

| Layer | Path | Purpose |
|---|---|---|
| `app/` | Next.js App Router | Routes, layouts, providers, API routes |
| `page/` | `src/page/` | Page-level components with business logic |
| `components/` | `src/components/` | Reusable UI components |
| `api/` | `src/api/` | Data fetching functions (no hooks) |
| `model/` | `src/model/` | Hooks, business logic, utilities |
| `constants/` | `src/constants/` | Static data |
| `types/` | `src/types/` | TypeScript type definitions |

### Routing

- **`(withHeader)`** layout group — pages rendered with top header + bottom nav (campus, user, search, review)
- **`(withoutHeader)`** layout group — full-screen pages (auth, entry, maintenance)
- Dynamic segments: `[foodCourtId]`, `[restaurantId]`, `[categoryKey]`, `[day]`
- Campus food court pages use `generateStaticParams()` for pre-rendering

### Data Fetching

- **Server components**: `fetch()` with Next.js cache tags for revalidation
- **Client components**: SWR for client-side data fetching
- **HTTP client**: Custom `Http` class in `src/api/config/api-handlers.ts`
  - Requests go through BFF routes (`/api/bff/*`) or directly to the API
  - 401 responses trigger auto-redirect to login
- **Query keys**: `queryKey` factory in `src/model/common/` — shared between SWR and Next.js cache tags
  - Tag format: array → colon-joined string (e.g., `['reviews', 'campus', '1']` → `'reviews:campus:1'`)
- **Cache invalidation**: `revalidateReviewCache()` invalidates both SWR and Next.js caches simultaneously

### State Management

- **Server state**: SWR (client) / Next.js fetch cache (server)
- **Client state**: Zustand

### Authentication

- OAuth providers: Kakao, Google, Apple
- Flow: social login code → `/api/bff/auth/*` → token cookies set
- Cookie handling is automatic in SSR context
- Key hooks: `useIsAuthenticated`, `useSocialLogin` in `src/model/auth/`

## ESLint Import Order (enforced)

Imports must be ordered in groups with blank lines between each group:

1. Node.js built-ins
2. External packages
3. Internal path aliases in this order:
   - `@/app/**`
   - `@/page/**`
   - `@/components/**`
   - `@/api/**`
   - `@/model/**`
   - `@/constants/**`
   - `@/types/**`
4. Relative imports

Alphabetical ordering is required within each group. Run `pnpm lint:fix` to auto-fix.

## Key Conventions

- **Path alias**: `@/*` maps to `apps/web/src/*`
- **Styling**: Tailwind CSS v4; use `cn()` (tailwind-merge) for conditional classes
- **Component marking**: Client components require `'use client'`; server components are async
- **Animations**: Use `motion` (Framer Motion equivalent)
- **Accessible primitives**: Radix UI for interactive components
- **Commit style**: Conventional commits — `feat:`, `fix:`, `refactor:`, `style:`, `ci:`

## Tech Stack

- **Next.js 15** (App Router), **React 19**
- **TailwindCSS 4**, **Radix UI**, **Motion**
- **SWR**, **Zustand**, **react-hook-form**
- **Jest + React Testing Library** for tests
- **Turborepo + pnpm** for monorepo
