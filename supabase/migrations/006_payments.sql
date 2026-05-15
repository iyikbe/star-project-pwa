-- ============================================================
-- 006_payments.sql
-- Star Project — Subscriptions, Payments, Late Fees
-- MONEY HANDLING — all amounts in INTEGER CENTS (€29.00 = 2900)
-- Run in Supabase SQL Editor AFTER 005_submissions.sql
-- ============================================================

-- ============================================================
-- TABLE: subscriptions
-- Family subscription plan. 1 per profile.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id            UUID NOT NULL UNIQUE REFERENCES public.profiles(id),
  plan_name             TEXT NOT NULL DEFAULT 'family',
  price_cents           INTEGER NOT NULL DEFAULT 2900,
  billing_cycle         TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly')),
  status                TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('active', 'past_due', 'cancelled', 'pending')),
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  payment_provider      TEXT NOT NULL DEFAULT 'flipflop',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_family_price_check
  CHECK (plan_name <> 'family' OR price_cents = 2900);

-- ============================================================
-- TABLE: payments
-- Individual payment transactions (subscription, mythical, late_fee).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id          UUID NOT NULL REFERENCES public.profiles(id),
  subscription_id     UUID REFERENCES public.subscriptions(id),
  type                TEXT NOT NULL CHECK (type IN ('subscription', 'mythical', 'late_fee')),
  amount_cents        INTEGER NOT NULL CHECK (amount_cents > 0),
  currency            TEXT NOT NULL DEFAULT 'EUR',
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'approved', 'rejected', 'needs_review', 'flagged')),
  payment_provider    TEXT NOT NULL DEFAULT 'flipflop',
  provider_reference  TEXT,
  description         TEXT NOT NULL DEFAULT '',
  admin_note          TEXT NOT NULL DEFAULT '',
  reviewed_by         UUID REFERENCES public.profiles(id),
  reviewed_at         TIMESTAMPTZ,
  flag_reason         TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments
  ADD CONSTRAINT payments_review_required
  CHECK (
    status NOT IN ('approved', 'rejected')
    OR (reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL)
  );

-- ============================================================
-- TABLE: late_fees
-- €0.50 per missed deadline, capped at €2.00/month per account.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.late_fees (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id      UUID NOT NULL REFERENCES public.profiles(id),
  enrollment_id   UUID NOT NULL REFERENCES public.enrollments(id),
  amount_cents    INTEGER NOT NULL DEFAULT 50 CHECK (amount_cents = 50),
  reason          TEXT NOT NULL DEFAULT '',
  fee_month       TEXT NOT NULL,
  payment_id      UUID REFERENCES public.payments(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- FUNCTION: Monthly late fee cap check
-- Prevents inserting more than €2.00 (4 × €0.50) per month per account.
-- ============================================================
CREATE OR REPLACE FUNCTION public.check_late_fee_cap()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  monthly_total INTEGER;
BEGIN
  -- Advisory lock prevents TOCTOU race on concurrent inserts
  PERFORM pg_advisory_xact_lock(hashtextextended(NEW.profile_id::text || NEW.fee_month, 0));

  SELECT COALESCE(SUM(amount_cents), 0)
  INTO monthly_total
  FROM public.late_fees
  WHERE profile_id = NEW.profile_id
  AND fee_month = NEW.fee_month;

  IF monthly_total + NEW.amount_cents > 200 THEN
    RAISE EXCEPTION 'Late fee cap exceeded: €2.00/month per account (current: €%.2f)', monthly_total / 100.0;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_late_fee_cap
  BEFORE INSERT ON public.late_fees
  FOR EACH ROW
  EXECUTE FUNCTION check_late_fee_cap();

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.late_fees ENABLE ROW LEVEL SECURITY;

-- SUBSCRIPTIONS: user reads own
CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions
  FOR SELECT
  USING (profile_id = auth.uid());

-- SUBSCRIPTIONS: admin reads all
CREATE POLICY "subscriptions_admin_select"
  ON public.subscriptions
  FOR SELECT
  USING (public.is_admin());

-- SUBSCRIPTIONS: user can create own (during signup)
-- Restricted to prevent price tampering or status manipulation
CREATE POLICY "subscriptions_insert_own"
  ON public.subscriptions
  FOR INSERT
  WITH CHECK (
    profile_id = auth.uid()
    AND status = 'pending'
    AND plan_name = 'family'
    AND price_cents = 2900
    AND current_period_start IS NULL
    AND current_period_end IS NULL
  );

-- SUBSCRIPTIONS: admin can update (activate, cancel, change status)
CREATE POLICY "subscriptions_admin_update"
  ON public.subscriptions
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- PAYMENTS: user reads own
CREATE POLICY "payments_select_own"
  ON public.payments
  FOR SELECT
  USING (profile_id = auth.uid());

-- PAYMENTS: admin reads all
CREATE POLICY "payments_admin_select"
  ON public.payments
  FOR SELECT
  USING (public.is_admin());

-- PAYMENTS: user can create (submit payment for approval)
-- Restricted: must be pending, cannot self-approve or add review fields
CREATE POLICY "payments_insert_own"
  ON public.payments
  FOR INSERT
  WITH CHECK (
    profile_id = auth.uid()
    AND status = 'pending'
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
    AND admin_note = ''
    AND flag_reason IS NULL
  );

-- PAYMENTS: admin can update (approve, reject, flag, add notes)
CREATE POLICY "payments_admin_update"
  ON public.payments
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- LATE_FEES: user reads own
CREATE POLICY "late_fees_select_own"
  ON public.late_fees
  FOR SELECT
  USING (profile_id = auth.uid());

-- LATE_FEES: admin reads all
CREATE POLICY "late_fees_admin_select"
  ON public.late_fees
  FOR SELECT
  USING (public.is_admin());

-- LATE_FEES: only admin/system can insert (automated or manual)
CREATE POLICY "late_fees_admin_insert"
  ON public.late_fees
  FOR INSERT
  WITH CHECK (public.is_admin());

-- ============================================================
-- Triggers + Indexes
-- ============================================================
CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_subscriptions_profile ON public.subscriptions(profile_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_profile ON public.payments(profile_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription ON public.payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_type ON public.payments(type);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_reviewed_by ON public.payments(reviewed_by);
CREATE INDEX IF NOT EXISTS idx_late_fees_profile ON public.late_fees(profile_id);
CREATE INDEX IF NOT EXISTS idx_late_fees_enrollment ON public.late_fees(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_late_fees_month ON public.late_fees(fee_month);
CREATE INDEX IF NOT EXISTS idx_late_fees_payment ON public.late_fees(payment_id);

-- ============================================================
-- VERIFY
-- ============================================================
-- SELECT count(*) FROM subscriptions;  -- 0
-- SELECT count(*) FROM payments;       -- 0
-- SELECT count(*) FROM late_fees;      -- 0
