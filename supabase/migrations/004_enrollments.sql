-- ============================================================
-- 004_enrollments.sql
-- Star Project — Enrollments, Team Members, Invitations
-- Run in Supabase SQL Editor AFTER 003_projects.sql
-- ============================================================

-- ============================================================
-- TABLE: enrollments
-- A team starting a project. Owner initiates, members join.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id),
  owner_id      UUID NOT NULL REFERENCES public.profiles(id),
  status        TEXT NOT NULL DEFAULT 'forming'
                CHECK (status IN ('forming', 'active', 'completed', 'cancelled')),
  started_at    TIMESTAMPTZ,
  deadline_at   TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  current_week  INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is a member of an enrollment
CREATE OR REPLACE FUNCTION public.is_enrollment_member(p_enrollment_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollment_members em
    JOIN public.children c ON c.id = em.child_id
    WHERE em.enrollment_id = p_enrollment_id
    AND c.profile_id = (SELECT auth.uid())
  );
$$;

-- Helper: check if user owns an enrollment
CREATE OR REPLACE FUNCTION public.is_enrollment_owner(p_enrollment_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.id = p_enrollment_id
    AND e.owner_id = (SELECT auth.uid())
  );
$$;

-- SELECT: user can see enrollments they own
CREATE POLICY "enrollments_select_own"
  ON public.enrollments
  FOR SELECT
  USING (owner_id = auth.uid());

-- SELECT: user can see enrollments where their child is a member
CREATE POLICY "enrollments_select_as_member"
  ON public.enrollments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollment_members em
      JOIN public.children c ON c.id = em.child_id
      WHERE em.enrollment_id = enrollments.id
      AND c.profile_id = auth.uid()
    )
  );

-- SELECT: admin sees all
CREATE POLICY "enrollments_admin_select"
  ON public.enrollments
  FOR SELECT
  USING (public.is_admin());

-- INSERT: any authenticated user can start an enrollment
CREATE POLICY "enrollments_insert_own"
  ON public.enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- UPDATE: owner can update their enrollment (start project, advance week)
CREATE POLICY "enrollments_update_own"
  ON public.enrollments
  FOR UPDATE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- UPDATE: admin can update any enrollment
CREATE POLICY "enrollments_admin_update"
  ON public.enrollments
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- NO DELETE policy

CREATE TRIGGER enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_enrollments_project ON public.enrollments(project_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_owner ON public.enrollments(owner_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);


-- ============================================================
-- TABLE: enrollment_members
-- Children participating in an enrollment/team.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.enrollment_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id   UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  child_id        UUID NOT NULL REFERENCES public.children(id),
  role            TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member')),
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  weeks_active    INTEGER NOT NULL DEFAULT 0,
  UNIQUE(enrollment_id, child_id)
);

ALTER TABLE public.enrollment_members ENABLE ROW LEVEL SECURITY;

-- SELECT: members of same enrollment can see each other
CREATE POLICY "members_select_same_enrollment"
  ON public.enrollment_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollment_members em2
      JOIN public.children c ON c.id = em2.child_id
      WHERE em2.enrollment_id = enrollment_members.enrollment_id
      AND c.profile_id = auth.uid()
    )
  );

-- SELECT: admin sees all
CREATE POLICY "members_admin_select"
  ON public.enrollment_members
  FOR SELECT
  USING (public.is_admin());

-- INSERT: enrollment owner can add members (after invitation accepted)
CREATE POLICY "members_insert_by_owner"
  ON public.enrollment_members
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = enrollment_members.enrollment_id
      AND e.owner_id = auth.uid()
    )
  );

-- UPDATE: enrollment owner or admin
CREATE POLICY "members_update_by_owner"
  ON public.enrollment_members
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = enrollment_members.enrollment_id
      AND e.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = enrollment_members.enrollment_id
      AND e.owner_id = auth.uid()
    )
  );

CREATE POLICY "members_admin_update"
  ON public.enrollment_members
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- NO DELETE policy

CREATE INDEX IF NOT EXISTS idx_members_enrollment ON public.enrollment_members(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_members_child ON public.enrollment_members(child_id);


-- ============================================================
-- TABLE: invitations
-- Pending team invites. 7-day expiry per PRD.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.invitations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id     UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  invited_by        UUID NOT NULL REFERENCES public.profiles(id),
  invited_child_id  UUID NOT NULL REFERENCES public.children(id),
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at        TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  responded_at      TIMESTAMPTZ,
  UNIQUE(enrollment_id, invited_child_id)
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- SELECT: inviter can see invitations they sent
CREATE POLICY "invitations_select_by_inviter"
  ON public.invitations
  FOR SELECT
  USING (invited_by = auth.uid());

-- SELECT: invitee (parent of invited child) can see their invitations
CREATE POLICY "invitations_select_by_invitee"
  ON public.invitations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children c
      WHERE c.id = invitations.invited_child_id
      AND c.profile_id = auth.uid()
    )
  );

-- SELECT: admin sees all
CREATE POLICY "invitations_admin_select"
  ON public.invitations
  FOR SELECT
  USING (public.is_admin());

-- INSERT: enrollment owner can send invitations
CREATE POLICY "invitations_insert_by_owner"
  ON public.invitations
  FOR INSERT
  WITH CHECK (
    invited_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = invitations.enrollment_id
      AND e.owner_id = auth.uid()
    )
  );

-- UPDATE: invitee can accept/decline (parent of invited child)
CREATE POLICY "invitations_update_by_invitee"
  ON public.invitations
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.children c
      WHERE c.id = invitations.invited_child_id
      AND c.profile_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.children c
      WHERE c.id = invitations.invited_child_id
      AND c.profile_id = auth.uid()
    )
  );

-- UPDATE: inviter can cancel
CREATE POLICY "invitations_update_by_inviter"
  ON public.invitations
  FOR UPDATE
  USING (invited_by = auth.uid())
  WITH CHECK (invited_by = auth.uid());

-- UPDATE: admin
CREATE POLICY "invitations_admin_update"
  ON public.invitations
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- NO DELETE policy

CREATE INDEX IF NOT EXISTS idx_invitations_enrollment ON public.invitations(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_invitations_invited_child ON public.invitations(invited_child_id);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_invited_by ON public.invitations(invited_by);


-- ============================================================
-- VERIFY
-- ============================================================
-- SELECT count(*) FROM enrollments;          -- 0
-- SELECT count(*) FROM enrollment_members;   -- 0
-- SELECT count(*) FROM invitations;          -- 0
