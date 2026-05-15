-- ============================================================
-- 005_submissions.sql
-- Star Project — Submissions + Submission Files
-- Run in Supabase SQL Editor AFTER 004_enrollments.sql
-- ============================================================

-- ============================================================
-- TABLE: submissions
-- Final project submission for admin review.
-- 1 submission per enrollment (UNIQUE constraint).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submissions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id           UUID NOT NULL UNIQUE REFERENCES public.enrollments(id),
  submitted_by            UUID NOT NULL REFERENCES public.profiles(id),
  status                  TEXT NOT NULL DEFAULT 'pending_review'
                          CHECK (status IN ('pending_review', 'approved', 'rejected', 'resubmission_requested')),
  ai_check_passed         BOOLEAN NOT NULL DEFAULT false,
  ai_check_details        JSONB DEFAULT '[]'::jsonb,
  reviewer_id             UUID REFERENCES public.profiles(id),
  reviewer_note           TEXT NOT NULL DEFAULT '',
  reviewed_at             TIMESTAMPTZ,
  stars_issued            BOOLEAN NOT NULL DEFAULT false,
  certificate_generated   BOOLEAN NOT NULL DEFAULT false,
  featured_on_home        BOOLEAN NOT NULL DEFAULT false,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: submission_files
-- Files attached to a submission (report, video, photos).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submission_files (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id   UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  file_type       TEXT NOT NULL CHECK (file_type IN ('report', 'video', 'photo')),
  file_name       TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL DEFAULT 0,
  storage_path    TEXT NOT NULL DEFAULT '',
  mime_type       TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- FUNCTION: is_submission_team_member
-- Checks if current user's child is a member of the enrollment
-- that this submission belongs to.
-- SECURITY DEFINER bypasses enrollment_members RLS to prevent recursion.
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_submission_team_member(p_submission_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.submissions s
    JOIN public.enrollment_members em ON em.enrollment_id = s.enrollment_id
    JOIN public.children c ON c.id = em.child_id
    WHERE s.id = p_submission_id
    AND c.profile_id = (SELECT auth.uid())
  );
$$;

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;

-- SUBMISSIONS: submitter can read their own
CREATE POLICY "submissions_select_own"
  ON public.submissions
  FOR SELECT
  USING (submitted_by = auth.uid());

-- SUBMISSIONS: team members can read (via enrollment membership)
-- Uses SECURITY DEFINER function to avoid RLS recursion on enrollment_members
CREATE POLICY "submissions_select_as_member"
  ON public.submissions
  FOR SELECT
  USING (public.is_submission_team_member(id));

-- SUBMISSIONS: admin reads all
CREATE POLICY "submissions_admin_select"
  ON public.submissions
  FOR SELECT
  USING (public.is_admin());

-- SUBMISSIONS: authenticated user can create (submit their project)
CREATE POLICY "submissions_insert_own"
  ON public.submissions
  FOR INSERT
  WITH CHECK (submitted_by = auth.uid());

-- SUBMISSIONS: admin can update (approve, reject, request resubmission)
CREATE POLICY "submissions_admin_update"
  ON public.submissions
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- SUBMISSIONS: submitter can update (resubmit after resubmission_requested)
CREATE POLICY "submissions_update_own"
  ON public.submissions
  FOR UPDATE
  USING (submitted_by = auth.uid())
  WITH CHECK (submitted_by = auth.uid());

-- NO DELETE policy

-- SUBMISSION_FILES: same access as parent submission
CREATE POLICY "files_select_own"
  ON public.submission_files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.submissions s
      WHERE s.id = submission_files.submission_id
      AND (s.submitted_by = auth.uid() OR public.is_admin())
    )
  );

-- FILES: team members can also view
-- Uses SECURITY DEFINER function to avoid RLS recursion on enrollment_members
CREATE POLICY "files_select_as_member"
  ON public.submission_files
  FOR SELECT
  USING (public.is_submission_team_member(submission_id));

-- FILES: submitter can insert files to their own submission
CREATE POLICY "files_insert_own"
  ON public.submission_files
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.submissions s
      WHERE s.id = submission_files.submission_id
      AND s.submitted_by = auth.uid()
    )
  );

-- FILES: admin can insert (if uploading on behalf)
CREATE POLICY "files_admin_insert"
  ON public.submission_files
  FOR INSERT
  WITH CHECK (public.is_admin());

-- NO UPDATE or DELETE policy on files (immutable once uploaded)

-- ============================================================
-- Triggers + Indexes
-- ============================================================
CREATE TRIGGER submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_submissions_enrollment ON public.submissions(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_by ON public.submissions(submitted_by);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_reviewer ON public.submissions(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_files_submission ON public.submission_files(submission_id);
CREATE INDEX IF NOT EXISTS idx_files_type ON public.submission_files(file_type);

-- ============================================================
-- VERIFY
-- ============================================================
-- SELECT count(*) FROM submissions;       -- 0
-- SELECT count(*) FROM submission_files;  -- 0
