-- ============================================================
-- 002_profiles_children.sql
-- Star Project — User Profile + Child Tables
-- Run this in Supabase SQL Editor AFTER 001_categories_levels.sql
-- ============================================================

-- ============================================================
-- TABLE: profiles
-- Extends Supabase auth.users with guardian (parent) data.
-- 1:1 relationship with auth.users (same UUID as PK).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  guardian_name   TEXT NOT NULL,
  guardian_email  TEXT NOT NULL,
  phone           TEXT,
  region          TEXT NOT NULL DEFAULT 'Kassel, DE',
  role            TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'admin')),
  avatar_initials TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- FUNCTION: is_admin()
-- Helper to check if current user has admin role.
-- Used in RLS policies instead of self-referential EXISTS subquery.
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid())
    AND role = 'admin'
  );
$$;

CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_select_all"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "profiles_admin_update_all"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- TABLE: children
-- Child data linked to a parent profile.
-- MVP: 1 child per profile. Future: multiple children per profile.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.children (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  child_name          TEXT NOT NULL,
  child_initials      TEXT NOT NULL DEFAULT '',
  date_of_birth       DATE NOT NULL,
  student_id          TEXT NOT NULL UNIQUE,
  current_category    TEXT REFERENCES public.categories(slug),
  current_level       TEXT NOT NULL DEFAULT 'tiny' REFERENCES public.levels(slug),
  total_stars         INTEGER NOT NULL DEFAULT 0,
  projects_completed  INTEGER NOT NULL DEFAULT 0,
  about_me            TEXT NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "children_select_own"
  ON public.children
  FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "children_insert_own"
  ON public.children
  FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "children_update_own"
  ON public.children
  FOR UPDATE
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());


CREATE POLICY "children_admin_select_all"
  ON public.children
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "children_admin_update_all"
  ON public.children
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER children_updated_at
  BEFORE UPDATE ON public.children
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_children_student_id ON public.children(student_id);
CREATE INDEX IF NOT EXISTS idx_children_profile_id ON public.children(profile_id);

-- ============================================================
-- FUNCTION: search_child_by_student_id (SECURITY DEFINER)
-- Safe student ID lookup for team invitations.
-- Returns ONLY name + initials + student_id — no other child data.
-- Bypasses RLS intentionally (SECURITY DEFINER) but restricts columns.
-- ============================================================
CREATE OR REPLACE FUNCTION public.search_child_by_student_id(p_student_id TEXT)
RETURNS TABLE(child_name TEXT, child_initials TEXT, student_id TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.child_name, c.child_initials, c.student_id
  FROM public.children c
  WHERE c.student_id = p_student_id
    AND (SELECT auth.uid()) IS NOT NULL;
$$;

-- ============================================================
-- TRIGGER: prevent_role_escalation
-- Prevents non-admin users from changing their own role.
-- Admin users can change roles (including their own — they are already admin).
-- ============================================================
CREATE OR REPLACE FUNCTION prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role <> OLD.role AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Cannot change own role';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER prevent_role_escalation_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION prevent_role_escalation();

-- ============================================================
-- INDEX: admin role partial index
-- Optimizes is_admin() lookups.
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_admin_role
  ON public.profiles(id)
  WHERE role = 'admin';


-- ============================================================
-- VERIFY
-- ============================================================
-- After running:
-- SELECT count(*) FROM profiles;   -- should be 0 (no users yet)
-- SELECT count(*) FROM children;   -- should be 0
-- \d profiles                      -- verify columns
-- \d children                      -- verify columns + FKs
