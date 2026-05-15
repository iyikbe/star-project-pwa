-- ============================================================
-- 007_notifications_audit_storage.sql
-- Star Project — Notifications, Audit Logs, Storage Policies, Schema Patches
-- Run in Supabase SQL Editor AFTER 006_payments.sql
-- ============================================================

-- ============================================================
-- STEP 28A: Schema patch — projects.intro_video_url
-- YouTube Unlisted URLs for project introduction videos.
-- ============================================================
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS intro_video_url TEXT;

ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_intro_video_url_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_intro_video_url_check
  CHECK (
    intro_video_url IS NULL
    OR intro_video_url ~ '^https://(www\.)?youtube\.com/watch\?v=[\w-]{11}$'
  );

-- ============================================================
-- STEP 28B: TABLE — notifications
-- User-facing notifications (enrollment approved, payment confirmed, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN (
    'enrollment_approved',
    'enrollment_rejected',
    'submission_graded',
    'submission_reminder',
    'payment_confirmed',
    'team_invitation',
    'project_announcement',
    'late_fee_warning'
  )),
  title       TEXT NOT NULL CHECK (char_length(title) <= 200),
  body        TEXT NOT NULL CHECK (char_length(body) <= 2000),
  metadata    JSONB NOT NULL DEFAULT '{}',
  is_read     BOOLEAN NOT NULL DEFAULT false,
  read_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- STEP 28C: TABLE — audit_logs
-- Immutable record of all important actions. No update/delete allowed.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL CHECK (action IN (
    'enrollment.create',
    'enrollment.approve',
    'enrollment.reject',
    'submission.create',
    'submission.grade',
    'payment.create',
    'payment.confirm',
    'payment.reject',
    'project.create',
    'project.update',
    'project.archive',
    'user.role_change',
    'admin.override'
  )),
  entity_type TEXT NOT NULL CHECK (entity_type IN (
    'enrollment', 'submission', 'payment', 'project', 'user', 'team'
  )),
  entity_id   UUID NOT NULL,
  changes     JSONB NOT NULL DEFAULT '{}',
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS — notifications
-- ============================================================
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "notifications_insert_admin"
  ON public.notifications FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "notifications_delete_own"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- RLS — audit_logs
-- ============================================================
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_logs_select_admin"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "audit_logs_insert_admin"
  ON public.audit_logs FOR INSERT
  WITH CHECK (public.is_admin());

-- NO update or delete policies — audit logs are IMMUTABLE (default-deny)

-- ============================================================
-- STEP 28D: Storage bucket RLS policies
-- Buckets must be created MANUALLY in Supabase Dashboard first:
--   submission-videos (50MB, private)
--   submission-reports (10MB, private)
--   submission-photos (5MB, private)
-- Path convention: {submission_id}/{filename}
-- ============================================================

CREATE POLICY "storage_submission_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('submission-videos', 'submission-reports', 'submission-photos')
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "storage_submission_select"
  ON storage.objects FOR SELECT
  USING (
    bucket_id IN ('submission-videos', 'submission-reports', 'submission-photos')
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "storage_submission_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('submission-videos', 'submission-reports', 'submission-photos')
    AND auth.uid() = owner
  )
  WITH CHECK (
    bucket_id IN ('submission-videos', 'submission-reports', 'submission-photos')
    AND auth.uid() = owner
  );

CREATE POLICY "storage_submission_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('submission-videos', 'submission-reports', 'submission-photos')
    AND auth.uid() = owner
  );

-- ============================================================
-- STEP 28E: FUNCTION — notify_user()
-- SECURITY DEFINER allows edge functions/triggers to insert
-- notifications without needing admin role on client.
-- ============================================================
CREATE OR REPLACE FUNCTION public.notify_user(
  p_user_id UUID,
  p_type TEXT,
  p_title TEXT,
  p_body TEXT,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'permission denied: admin only';
  END IF;

  INSERT INTO public.notifications (user_id, type, title, body, metadata)
  VALUES (p_user_id, p_type, p_title, p_body, p_metadata)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- ============================================================
-- STEP 28F: FUNCTION — log_audit()
-- SECURITY DEFINER allows edge functions/triggers to insert
-- audit logs without needing admin role on client.
-- ============================================================
CREATE OR REPLACE FUNCTION public.log_audit(
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_changes JSONB DEFAULT '{}',
  p_actor_id UUID DEFAULT auth.uid()
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'permission denied: admin only';
  END IF;

  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, changes)
  VALUES (p_actor_id, p_action, p_entity_type, p_entity_id, p_changes)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON public.notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_user_created
  ON public.notifications(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity
  ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor
  ON public.audit_logs(actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action
  ON public.audit_logs(action, created_at DESC);

-- ============================================================
-- VERIFY
-- ============================================================
-- SELECT count(*) FROM notifications;  -- 0
-- SELECT count(*) FROM audit_logs;     -- 0
-- SELECT intro_video_url FROM projects LIMIT 1;  -- NULL
