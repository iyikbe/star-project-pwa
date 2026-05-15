# handoff.md — Star Project Session State

> Start every Claude Code session with:
> "read handoff.md and pick up from exactly where it left off"
>
> End every Claude Code session with:
> "Update handoff.md with current state, then I will /clear"

---

## Goal
Claude Code: OPUS security audit of payment schema — **DONE, BLOCKED on CRITICAL fixes**

## Current State
Step 27C implementation done, SQL run, but security audit found **3 CRITICAL bypasses**.
DO NOT COMMIT until fix prompt below is applied via DeepSeek and re-run.

## Files in Flight
- supabase/migrations/006_payments.sql (NEW — needs CRITICAL patches)
- src/lib/db/queries/payments.ts (NEW — needs MEDIUM/LOW patches)
- src/lib/db/__tests__/payments.test.ts (NEW — does not execute, see Test Infra below)

## Audit Results — Step 27C (2026-05-15, session 5)

### CRITICAL (block commit)
- **C-1 Self-grant active subscription**: `subscriptions_insert_own` only checks `profile_id = auth.uid()`. User can insert row with `status='active'`, `current_period_end='2030-01-01'`, `price_cents=1` directly via anon key + their JWT, bypassing payment entirely. (006_payments.sql:116-119)
- **C-2 Self-approve payment**: `payments_insert_own` only checks `profile_id = auth.uid()`. User can insert with `status='approved'`, `amount_cents=1`, fake `reviewed_by`/`reviewed_at`, forging admin approval. (006_payments.sql:141-144)
- **C-3 Arbitrary `price_cents` on subscriptions**: no CHECK constraint on `subscriptions.price_cents`. (006_payments.sql:16)

### MEDIUM
- **M-1 Late-fee cap TOCTOU race**: `check_late_fee_cap()` reads SUM then inserts without a lock; concurrent inserts can bypass €2/mo cap.
- **M-2 `fetchMyPayments` / `fetchMyLateFees` lack explicit `.eq('profile_id', user.id)`**: when called by an admin they return ALL users' rows because of the admin SELECT policy.

### LOW
- **L-1** `reviewPayment` writes `reviewed_by = auth.uid()` only in app code; DB does not enforce.
- **L-2** No CHECK that `reviewed_by IS NOT NULL` when `status IN ('approved','rejected')`.
- **L-3** Currency helpers accept `NaN`, `Infinity`, negatives (DB catches most at write, but UI can break).
- **L-4** No DELETE policy anywhere — confirm this is intentional (audit immutability).
- **L-5 Test infra broken**: every `__tests__/*.test.ts` fails at module load with `Cannot read properties of undefined (reading 'config')` because `import.meta.env` is undefined under vitest. Previous handoff line "Tests passing" was inaccurate. Needs a vitest env-loading fix (e.g., `loadEnv` in vitest.config or `import.meta.env` shim in src/test/setup.ts) — separate task.

### PASS
- User UPDATE on payments blocked (admin-only update policy, no user policy).
- User UPDATE on subscriptions blocked (same).
- User INSERT/UPDATE/DELETE on late_fees blocked (admin INSERT only, no UPDATE/DELETE).
- All amounts integer cents (no float anywhere).
- Status/type CHECK enums correct.
- `late_fees.amount_cents = 50` locked at DB level.
- Late-fee monthly cap enforced via trigger (race aside).

## Fix Prompt for DeepSeek (apply BEFORE commit)
See the assistant transcript of session 5 — full prompt patches:
1. `subscriptions_insert_own` WITH CHECK → restrict status='pending', plan_name='family', price_cents=2900, period nulls.
2. `payments_insert_own` WITH CHECK → restrict status='pending', reviewed_by/reviewed_at/admin_note/flag_reason empty, amount must match type (subscription=2900, late_fee=50, mythical>0).
3. Add CHECK constraint `subscriptions_family_price_check` → `plan_name <> 'family' OR price_cents = 2900`.
4. Add CHECK `payments_review_required` → approved/rejected requires `reviewed_by` and `reviewed_at` NOT NULL.
5. In `check_late_fee_cap`, add `pg_advisory_xact_lock(hashtextextended(profile_id::text || fee_month, 0))` before SELECT.
6. In `payments.ts`: `fetchMyPayments` and `fetchMyLateFees` add `.eq('profile_id', user.id)`. Validate `centsToEuros`/`eurosToCents` inputs (`Number.isFinite`, `Number.isInteger`, non-negative).

### Verify after patch (run as a regular user's JWT, not service role)
- `INSERT INTO subscriptions (profile_id, status) VALUES (<self>, 'active');` → must fail
- `INSERT INTO payments (profile_id, type, amount_cents, status, description) VALUES (<self>, 'subscription', 1, 'approved', 'x');` → must fail
- `INSERT INTO subscriptions (profile_id, price_cents) VALUES (<self>, 1);` → must fail


## Failed Attempts
None.

## Next Step
1. Run fix prompt above through DeepSeek.
2. Apply patched 006_payments.sql in Supabase SQL Editor.
3. Re-run the three verify queries listed above with a real user JWT — all must fail.
4. Fix vitest env loading (separate, blocks all DB test suites).
5. Re-audit (quick re-read of the three policies + verify queries), then commit.
6. THEN Step 28 (notifications + audit_logs + storage buckets).


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
| 5 | 2026-05-15 | 27C payments audit | ~10 min | **3 CRITICAL, 2 MEDIUM, 5 LOW**. BLOCK commit. Fix prompt ready. Test infra broken (pre-existing). |
