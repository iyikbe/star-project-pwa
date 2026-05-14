# handoff.md — Star Project Session State

> Start every Claude Code session with:
> "read handoff.md and pick up from exactly where it left off"
>
> End every Claude Code session with:
> "Update handoff.md with current state, then I will /clear"

---

## Goal
Step 26 — projects + enrollments schema (🟢 DeepSeek)

## Current State
Step 25B COMPLETE. All security fixes verified by Claude Code (2026-05-15).
31/31 tests pass. All 4 files ready to commit.

## Files in Flight
None — all changes verified, ready to commit:
- supabase/migrations/002_profiles_children.sql ✅
- src/lib/db/queries/users.ts ✅
- src/lib/db/__tests__/users.test.ts ✅
- src/lib/auth/auth-types.ts ✅

## What Was Fixed (Step 25B)
- CRITICAL: Dropped `children_search_by_student_id` overly-broad RLS policy
- Added `is_admin()` SECURITY DEFINER fn — used by all 4 admin policies (no self-referential recursion)
- Added `search_child_by_student_id` SECURITY DEFINER RPC — column-restricted server-side
- Added `prevent_role_escalation` trigger — non-admins cannot change their own role
- Added partial index `idx_profiles_admin_role` for is_admin() performance
- Updated `searchChildByStudentId` in users.ts to use `supabase.rpc`
- Added 3 missing tests: anon SELECT children, anon DELETE children, RPC callable

## Known Remaining Gaps (LOW priority, address in Step 26+)
- `toUserProfile` does not map `child.id` — needed when update-child fn is added
- No authenticated cross-user isolation tests (needs real auth session — Playwright phase)

## Failed Attempts
None.

## Next Step
1. **Commit** (git add the 4 files above, commit message: "feat(db): profiles + children tables with RLS, security fixes, 31 tests passing")
2. **Step 26** — projects + enrollments schema (🟢 DeepSeek)
   - Tables: projects, enrollments
   - RLS: same pattern as children (own + admin)
   - Query fns: fetchProjects, enrollProject, fetchEnrollments
   - Tests: schema + anon RLS blocks

## Tool Assignment Legend
- 🟢 DEEPSEEK ONLY — mechanical, no Claude Code needed
- 🟡 DEEPSEEK + CLAUDE CODE — complex, Claude Code analyzes after
- 🔴 CLAUDE CODE FULL — stuck/debug, Claude Code handles everything

## Session Log
| # | Date | Step | Duration | Outcome |
|---|------|------|----------|---------|
| 1 | 2026-05-15 | 25B security review | ~10 min | CRITICAL issue found, fix prompt ready |
| 2 | 2026-05-15 | 25B fix verification | ~5 min | All 5 checks PASS, 31/31 tests, ready to commit |
