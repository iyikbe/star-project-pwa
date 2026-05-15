# handoff.md — Star Project Session State

> Start every Claude Code session with:
> "read handoff.md and pick up from exactly where it left off"
>
> End every Claude Code session with:
> "Update handoff.md with current state, then I will /clear"

---

## Goal
Step 27C — Payments schema (DeepSeek implements, Claude Code reviews)

## Current State
Step 27B reviewed. 75/75 tests PASS.
CRITICAL recursion bug found in submissions RLS — fix prompt ready (see below).
004_enrollments.sql and 005_submissions.sql NOT yet committed (waiting on recursion fix).

## Files in Flight
- supabase/migrations/004_enrollments.sql (MODIFIED — reordered, approved)
- supabase/migrations/005_submissions.sql (NEW — needs recursion fix before commit)
- src/lib/db/queries/submissions.ts (NEW)
- src/lib/db/__tests__/submissions.test.ts (NEW)

## Step 27B Review Findings (2026-05-15) — 75/75 tests PASS
- UNIQUE on enrollment_id: PASS (enforced at DB level, line 14)
- Anonymous blocked: PASS (all 6 anon RLS tests pass)
- Submitter update own: PASS (USING + WITH CHECK on submitted_by = auth.uid())
- Admin update any: PASS (both USING + WITH CHECK on is_admin())
- submission_files immutable: PASS (no UPDATE/DELETE policy exists)
- ai_check_details JSONB: PASS (correctly typed, default '[]'::jsonb)
- 004_enrollments.sql reordering: PASS (approved in 27A)

## CRITICAL: Infinite Recursion in submissions RLS
**Symptom:** `infinite recursion detected in policy for relation "enrollment_members"`
**Fires on:** `fetchSubmissionByEnrollment` — the `submissions_select_as_member` and `files_select_as_member` policies both query `enrollment_members`, which has RLS that recurses.
**Impact:** Team members silently cannot view their submission (query fails, returns null)
**Fix prompt for DeepSeek:**
> In `005_submissions.sql`, the `submissions_select_as_member` policy and `files_select_as_member` policy both query `enrollment_members`. The enrollment_members RLS policies are causing infinite recursion. Fix by creating a SECURITY DEFINER function `is_submission_visible_to_member(submission_uuid UUID)` that queries enrollment_members WITHOUT triggering RLS (same pattern as `is_enrollment_member()` in 004), then replace the EXISTS subqueries in both policies with calls to that function.

## Step 27A Review Findings (2026-05-15) — 63/63 tests PASS
- Enrollment RLS: PASS — owner_id direct match, member via children→profile_id, admin via is_admin()
- Invitation RLS: PASS — inviter/invitee correctly scoped, non-owner INSERT blocked by double-check
- Helper functions: PASS — SECURITY DEFINER + SET search_path = public + (SELECT auth.uid()) pattern correct
- `fetchEnrollmentById` has no pre-auth guard — returns null for unauthorized (RLS handles it, LOW risk)
- LOW: invitee UPDATE policy has no field-level restriction — invitee could technically set status='expired'. CHECK constraint blocks invalid enums, but semantic integrity slightly loose. Same applies to inviter cancel policy.
- LOW: no updated_at trigger on enrollment_members or invitations (inconsistent with enrollments table, no functional risk)
- 004_enrollments.sql APPROVED for deployment

## Known Remaining Gaps (LOW priority)
- `toUserProfile` does not map `child.id` — needed when update-child fn is added
- No authenticated cross-user isolation tests (Playwright phase)
- `fetchProjectBySlug` weekly_tasks should ORDER BY week_number (fix in Step 27+)
- invitations UPDATE policies lack field-level status restriction (LOW, enum CHECK constraint mitigates)
- submissions UPDATE has no field-level restriction (submitter can alter status/ai_check_passed, LOW)

## Failed Attempts
None.

## Next Step
1. Apply recursion fix to 005_submissions.sql (DeepSeek with fix prompt above)
2. Re-run SQL in Supabase + npm test (verify 75+ tests still pass)
3. Commit 004 + 005 together
4. Step 27C: Payments schema (DeepSeek implements, Claude Code reviews)

## Tool Assignment Legend
- 🟢 DEEPSEEK ONLY — mechanical, no Claude Code needed
- 🟡 DEEPSEEK + CLAUDE CODE — complex, Claude Code analyzes after
- 🔴 CLAUDE CODE FULL — stuck/debug, Claude Code handles everything

## Session Log
| # | Date | Step | Duration | Outcome |
|---|------|------|----------|---------|
| 1 | 2026-05-15 | 25B security review | ~10 min | CRITICAL issue found, fix prompt ready |
| 2 | 2026-05-15 | 25B fix verification | ~5 min | All 5 checks PASS, 31/31 tests, ready to commit |
| 3 | 2026-05-15 | 26 schema review | ~5 min | All checks PASS, 47/47 tests, ready to commit |
| 4 | 2026-05-15 | 27A enrollments review | ~5 min | All checks PASS, 63/63 tests, LOW items noted, APPROVED |
