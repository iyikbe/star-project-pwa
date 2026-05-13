# CLAUDE.md — Star Project PWA

## Project Overview
Star Project — project-based career discovery platform for children aged 4-18.
Parent-managed accounts, team-based projects, 9 career categories, 7 progression levels.
Target market: Kassel, Germany. Solo founder: Aldy YK.

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite, uses @theme directive, NOT tailwind.config.js)
- React Router v7
- vite-plugin-pwa
- Supabase (PostgreSQL + Auth + Storage) — Frankfurt/Ireland EU region
- Deployed: Vercel (auto-deploy from GitHub main branch)

## Conventions — MUST FOLLOW
- **Named exports only** — `export function ComponentName()`, NEVER `export default`
- **Relative imports** — `../../components/ui`, NO `@/` alias
- **Tailwind v4** — uses `@theme` directive in index.css, NOT tailwind.config.js
- **Typography** — Fraunces (serif, headings), Inter (sans, body)
- **Heading pattern** — `font-serif font-semibold text-sp-primary tracking-normal`
- **Card pattern** — `bg-white border border-sp-border-soft rounded-xl`
- **CategoryInfo** has property `label` (NOT `name`) — common bug source
- **All emojis** wrapped in `<span aria-hidden="true">`
- **Design token prefix** — `sp-` (e.g., `bg-sp-primary`, `text-sp-coral`)

## Project Structure
```
src/
├── components/
│   ├── ui/          → Pill, StatCard, IconTile, SectionEyebrow
│   ├── cards/       → ProjectCard, LevelBadge
│   └── layout/      → AppLayout, AdminLayout, AuthLayout, PublicLayout
├── features/
│   ├── home/        → HomePage
│   ├── about/       → AboutPage
│   ├── auth/        → LoginPage, RegisterPage
│   ├── account/     → AccountPage
│   ├── start-career/→ ProjectListingPage, StartPreferencePage
│   ├── categories/  → CategoryPage
│   ├── notifications/→ NotificationsPage
│   ├── projects/    → ProjectDetailPage, ProjectWorkspacePage
│   ├── submissions/ → SubmissionUploadPage, SubmissionResultPage
│   ├── subscription/→ SubscriptionPage
│   └── admin/       → AdminUsersPage, AdminProjectNewPage, AdminPaymentsPage, AdminSubmissionReviewPage
├── lib/
│   ├── constants/   → categories.ts, levels.ts (static reference data)
│   ├── supabase.ts  → Supabase client init (Phase 3)
│   ├── auth/        → AuthProvider, useAuth hook (Phase 3)
│   └── db/          → Query functions, types (Phase 3)
├── data/mock/       → Mock data (being replaced by Supabase in Phase 3)
└── app/routes/      → AppRouter.tsx
```

## Commands
```
npm run dev          → Vite dev server (localhost:5173)
npm run build        → tsc -b && vite build
npm test             → Vitest (when configured)
```

## Current Phase
Phase 3 — Supabase Backend Integration
- Phase 1 (shared components) ✅ complete
- Phase 2 (18 UI pages from mockup) ✅ complete (Steps 4-23)
- Phase 3 (backend) 🔄 in progress (Steps 24-40)

## Workflow Rules
1. Read `handoff.md` at session start for current work state
2. DO NOT apply code fixes directly — generate fix prompts for DeepSeek instead
3. Focus on: analysis, testing, security review, issue diagnosis
4. Update `handoff.md` at session end before /clear
5. Keep sessions short (5-10 min) to conserve Pro rate limit

## Testing Strategy
- Vitest for unit/integration tests (RLS, auth, payment, business logic)
- Manual smoke tests for UI pages
- Playwright E2E tests added AFTER Phase 3 complete (Step 41+)

## Design Tokens (in src/index.css @theme)
Primary: #1F3D2E | Coral: #D26B4A | Gold: #C9A063
Page bg: #FAF7F2 | Card muted: #F5EFE4 | Border soft: #EFE7D9
Accent green: #2E6B4A | Text primary: #3A3A36 | Text muted: #8A8275

## Mock Data Being Replaced (Phase 3)
- CURRENT_USER → Supabase auth.users + profiles table
- LISTING_POPULAR/NEW_STARS/etc → Supabase projects table
- NOTIFICATIONS → Supabase notifications table
- BILLING_HISTORY → Supabase payments table
