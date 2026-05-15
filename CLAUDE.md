# CLAUDE.md — Star Project PWA

## Project Overview
Star Project — project-based career discovery platform for children aged 4-18.
Parent-managed accounts, team-based projects, 9 career categories, 7 progression levels.
Target market: Kassel, Germany. Solo founder: Aldy YK.
Business model: €29/month family subscription + €50/star Mythical premium projects.

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite, uses @theme directive, NOT tailwind.config.js)
- React Router v7
- vite-plugin-pwa
- Supabase (PostgreSQL + Auth + Storage) — Ireland EU region, free tier → Pro
- Vitest for testing
- Deployed: Vercel (auto-deploy from GitHub main branch)

## Conventions — MUST FOLLOW
- **Named exports only** — `export function X()`, NEVER `export default`
- **Relative imports** — `../../components/ui`, NO `@/` alias
- **Tailwind v4** — `@theme` directive in index.css, NOT tailwind.config.js
- **Typography** — Fraunces (serif, headings), Inter (sans, body)
- **Heading pattern** — `font-serif font-semibold text-sp-primary tracking-normal`
- **Card pattern** — `bg-white border border-sp-border-soft rounded-xl`
- **CategoryInfo** has property `label` (NOT `name`) — common bug source
- **All emojis** wrapped in `<span aria-hidden="true">`
- **Design token prefix** — `sp-` (e.g., `bg-sp-primary`, `text-sp-coral`)
- **Money** — ALL amounts as INTEGER CENTS (€29.00 = 2900), NEVER float/decimal
- **TypeScript** — NEVER use `as ReturnType<typeof fn>`, use `as any[]` instead

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
│   └── admin/       → AdminUsersPage, AdminProjectNewPage,
│                      AdminPaymentsPage, AdminSubmissionReviewPage
├── lib/
│   ├── constants/   → categories.ts, levels.ts
│   ├── supabase.ts  → Supabase client singleton
│   ├── auth/        → AuthProvider, useAuth hook, auth-types
│   └── db/
│       ├── queries/  → categories.ts, levels.ts, users.ts, projects.ts,
│       │              enrollments.ts, submissions.ts, payments.ts
│       ├── types.ts
│       └── __tests__/ → reference-data, users, projects, enrollments,
│                       submissions, payments test files
├── data/mock/       → Mock data (being replaced by Supabase)
├── test/            → setup.ts, helpers.ts
└── app/routes/      → AppRouter.tsx

supabase/
└── migrations/
    ├── 001_categories_levels.sql
    ├── 002_profiles_children.sql
    ├── 003_projects.sql
    ├── 004_enrollments.sql
    ├── 005_submissions.sql
    └── 006_payments.sql
```

## Database Schema (15 tables)
- categories, levels (reference, public read)
- profiles, children (user data, own-data RLS)
- projects, weekly_tasks, project_safety_labels (content, public read published)
- enrollments, enrollment_members, invitations (team-based RLS)
- submissions, submission_files (submitter + team + admin access)
- subscriptions, payments, late_fees (money, hardened RLS)

## Database Helper Functions
- is_admin() — check admin role
- search_child_by_student_id(TEXT) — limited-column RPC
- is_enrollment_member(UUID), is_enrollment_owner(UUID)
- is_submission_team_member(UUID) — recursion-safe
- check_late_fee_cap() — trigger with advisory lock
- prevent_role_escalation() — trigger
- update_updated_at() — shared trigger

## Storage Strategy
- Project intro videos: YouTube Unlisted URL (TEXT column, not stored)
- Submission videos: Supabase Storage, 50MB cap
- Submission reports: Supabase Storage, 10MB cap
- Submission photos: Supabase Storage, 5MB each cap

## Commands
```
npm run dev          → Vite dev server (localhost:5173)
npm run build        → tsc -b && vite build
npm test             → vitest run
npm run test:watch   → vitest (watch mode)
```

## Current Phase
Phase 3 — Supabase Backend Integration
- Phase 1 (shared components) ✅
- Phase 2 (18 UI pages) ✅ (Steps 4-23)
- Phase 3 (backend) 🔄 Steps 24-27C done, Step 28 next

## Workflow Rules (for Claude Code sessions)
1. Read `handoff.md` at session start for current work state
2. DO NOT apply code fixes directly — generate fix prompts for DeepSeek
3. Focus on: analysis, testing, security review, issue diagnosis
4. Update `handoff.md` at session end before /clear
5. Keep sessions short (5-10 min) to conserve Pro rate limit
6. Default: /model sonnet. Security/payment: /model opus + /think

## Design Tokens (in src/index.css @theme)
Primary: #1F3D2E | Coral: #D26B4A | Gold: #C9A063
Page bg: #FAF7F2 | Card muted: #F5EFE4 | Border soft: #EFE7D9
Accent green: #2E6B4A | Text primary: #3A3A36 | Text muted: #8A8275
