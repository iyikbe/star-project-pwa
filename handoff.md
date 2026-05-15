# handoff.md — Star Project Session State

> Start every Claude Code session with:
> "read handoff.md and pick up from exactly where it left off"
>
> End every Claude Code session with:
> "Update handoff.md with current state, then I will /clear"

---

## Goal
Step 29 — Auth context provider (real sessions)

## Current State
Step 28 COMPLETE & committed. Step 29 (auth-context.tsx) COMPLETE — both MEDIUM
fixes applied, re-reviewed, verified. Build PASS, 119/119 tests PASS.
Ready to commit auth-context.tsx and start Step 30.

## Step 29 Resolution
MEDIUM-1 (signUp isLoading hang) FIXED: signUp destructures { data, error },
resets isLoading:false when !data.session (email-confirm path). Verified L129-140.
MEDIUM-2 (silent authenticated parent) FIXED: loadProfile no-profile branch now
sets user:null, isAuthenticated:false, error message. No hardcoded role. L76-82.
All 7 checklist items pass. No SQL changes were needed (client-side only).

## Completed Steps (Phase 3 — Backend)
| Step | Description | Status |
|------|-------------|--------|
| 24B | Supabase client + auth abstraction | ✅ |
| 24C | Vitest setup + connection tests | ✅ |
| 25A | Categories + levels seed data | ✅ |
| 25B | Profiles + children + RLS (CRITICAL fix: search_child_by_student_id) | ✅ |
| 26 | Projects + weekly_tasks + safety_labels | ✅ |
| 27A | Enrollments + members + invitations | ✅ |
| 27B | Submissions + files (recursion fix: is_submission_team_member) | ✅ |
| 27C | Payments + late_fees (3 CRITICAL fixes: insert restrictions, fee cap lock) | ✅ |
| 28 | Notifications + audit_logs + storage + schema patches | ✅ |
| 29 | Auth context provider (2 MEDIUM fixes: signUp hang, silent parent) | ✅ |

## Completed Steps (Phase 1+2 — UI)
Steps 0-23: Full UI rebuild from mockup (18 pages). All committed and deployed on Vercel.

## Database Tables (15 total, all with RLS)
### Reference Data
- categories (9 rows seeded)
- levels (7 rows seeded)

### User Data
- profiles (extends auth.users, is_admin() helper, prevent_role_escalation trigger)
- children (search_child_by_student_id RPC function)

### Project Data
- projects (20 seeded, public read published, admin CRUD)
- weekly_tasks (8 seeded, RLS checks parent project status)
- project_safety_labels (2 seeded)

### Enrollment Data
- enrollments (is_enrollment_member/owner helpers)
- enrollment_members
- invitations (7-day expiry default)

### Submission Data
- submissions (is_submission_team_member helper for recursion-safe RLS)
- submission_files (immutable — no UPDATE/DELETE)

### Payment Data
- subscriptions (UNIQUE per profile, family plan locked 2900 cents)
- payments (insert restricted to status=pending, review_required CHECK)
- late_fees (50 cents fixed, 200 cap/mo via trigger + advisory lock)

## Helper Functions in Database
- is_admin() — SECURITY DEFINER, checks profiles.role
- search_child_by_student_id() — SECURITY DEFINER RPC, limited columns
- is_enrollment_member(UUID) — SECURITY DEFINER
- is_enrollment_owner(UUID) — SECURITY DEFINER
- is_submission_team_member(UUID) — SECURITY DEFINER, recursion-safe
- check_late_fee_cap() — trigger with advisory lock for TOCTOU prevention
- prevent_role_escalation() — trigger prevents non-admin role change
- update_updated_at() — shared trigger for updated_at columns

## Storage Strategy (decided)
| File Type | Storage | Size Cap | Implementation |
|-----------|---------|----------|----------------|
| Project intro video | YouTube Unlisted URL | Unlimited | TEXT column in projects table |
| Submission video | Supabase Storage | 50MB | submission-videos bucket |
| Submission report | Supabase Storage | 10MB | submission-reports bucket |
| Submission photos | Supabase Storage | 5MB each | submission-photos bucket |

## Schema Changes Needed in Step 28
1. ALTER TABLE projects ADD COLUMN intro_video_url TEXT (YouTube URL)
2. CREATE notifications table with RLS
3. CREATE audit_logs table with RLS
4. CREATE Supabase Storage buckets with file size limits
5. Add external_url column to submission_files (for future video migration flexibility)

## Architecture Decisions
- supabase-js for all DB queries (with custom hooks abstraction layer)
- All amounts in INTEGER CENTS (not decimal euros)
- Named exports only, relative imports (no @/ alias)
- Tailwind v4 (@theme directive, not tailwind.config.js)
- Currency helpers with input validation
- NEVER use `as ReturnType<typeof fn>` in TypeScript (use `as any[]`)

## AI Workflow
- Claude Web: strategic planning, prompt generation, architecture
- Kilo Code + DeepSeek V4 Pro: implementation (70% of work)
- Claude Code in VS Code: testing + security review (30%)
- Tool assignment per step: 🟢 DeepSeek only / 🟡 DeepSeek + Claude Code / 🔴 Claude Code full
- Claude Code optimized for Pro tier (short sessions, Sonnet default, Opus for security/payment only)
- Fix loop: Claude Code audit → fix prompt in handoff.md → DeepSeek applies → verify

## Claude Code Session Rules
- Always start: "read handoff.md and pick up from exactly where it left off"
- Always end: "update handoff.md" then /clear
- Default: /model sonnet, thinking OFF
- Security audit: /model opus, /think ON
- DO NOT apply fixes — generate fix prompts for DeepSeek instead (save rate limit)

## Remaining Phase 3 Steps
| Step | Description | Tag | Kilo Model | Claude Code |
|------|-------------|-----|------------|-------------|
| 28 | Notifications + audit_logs + storage + schema patches | 🟡 | Pro | Sonnet |
| 29 | Auth context provider (real sessions) | 🟡 | Pro | Sonnet |
| 30 | Real register flow | 🟡 | Pro | Sonnet |
| 31 | Real login flow | 🟡 | Pro | Sonnet |
| 32 | Session management + protected routes | 🟡 | Pro | Sonnet |
| 33 | Projects read queries (connect UI) | 🟢 | Flash | — |
| 34 | User profile + account data | 🟢 | Flash | — |
| 35 | Enrollment workflow | 🟡 | Pro | Sonnet |
| 36 | Submission upload real | 🟡 | Pro | Sonnet |
| 37 | Notifications queries | 🟢 | Flash | — |
| 38 | Payment integration research | 🟡 | Pro | Opus+think |
| 39 | Subscription + payment flow | 🟡 | Pro | Opus+think |
| 40 | Late fee calculator | 🟡 | Pro | Sonnet |

## Known Remaining Gaps (LOW priority)
- No authenticated cross-user isolation tests (Playwright phase after Step 40)
- fetchProjectBySlug weekly_tasks ORDER BY (fixed in app code, not SQL)
- invitations UPDATE policies lack field-level status restriction
- submissions UPDATE has no field-level restriction for submitter

## Supabase Budget Projection (Year 1)
- Month 1: Free tier ($0) — up to ~1GB storage
- Month 2-12: Pro plan ($25/mo = $275/year)
- Storage projection: ~100GB by month 12 (within Pro 100GB included)
- Video migration to cheaper storage: only needed year 2+ if >100GB

## Files in Flight
None — all committed.

## Failed Attempts
None.

## Next Step
Commit auth-context.tsx (Step 29 done), then Step 30 — Real register flow.
Tool assignment: 🟡 DEEPSEEK V4 Pro + CLAUDE CODE (Sonnet, thinking OFF)

## Session Log
| # | Date | Step | Duration | Outcome |
|---|------|------|----------|---------|
| 1 | 2026-05-15 | 25B security review | ~10 min | CRITICAL: search_child policy too permissive |
| 2 | 2026-05-15 | 25B fix verification | ~5 min | All PASS, committed |
| 3 | 2026-05-15 | 26 schema review | ~5 min | All PASS, committed |
| 4 | 2026-05-15 | 27A enrollments review | ~5 min | All PASS, LOW items noted |
| 5 | 2026-05-15 | 27B submissions review | ~5 min | CRITICAL: infinite recursion, fixed |
| 6 | 2026-05-15 | 27C payments audit (Opus) | ~10 min | 3 CRITICAL: insert bypasses, fixed |
| 7 | 2026-05-15 | 28 notifications+audit review | ~8 min | 2 MEDIUM: SECURITY DEFINER bypass; LOW: regex anchor |
| 8 | 2026-05-15 | 28 final verification | ~5 min | All 3 fixes confirmed, 113/113 PASS, Step 28 ✅ |
| 9 | 2026-05-15 | 29 auth-context review (Opus) | ~8 min | 2 MEDIUM: signUp isLoading hang; missing-profile silent parent. 119/119 PASS |
| 10 | 2026-05-15 | 29 fix re-review (Opus) | ~5 min | Both MEDIUM fixes verified, build PASS, 119/119 PASS, Step 29 ✅ |
