-- ============================================================
-- 003_projects.sql
-- Star Project — Projects, Weekly Tasks, Safety Labels
-- Run in Supabase SQL Editor AFTER 002_profiles_children.sql
-- ============================================================

-- ============================================================
-- TABLE: projects
-- Admin-managed project content. Public read for published.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  description_short TEXT NOT NULL DEFAULT '',
  description_long  TEXT NOT NULL DEFAULT '',
  emoji             TEXT NOT NULL DEFAULT '📦',
  category_slug     TEXT NOT NULL REFERENCES public.categories(slug),
  level_slug        TEXT NOT NULL REFERENCES public.levels(slug),
  age_min           INTEGER NOT NULL DEFAULT 4,
  duration_weeks    INTEGER NOT NULL DEFAULT 4,
  star_reward       INTEGER NOT NULL DEFAULT 1,
  is_mythical       BOOLEAN NOT NULL DEFAULT false,
  mythical_price    NUMERIC(10,2),
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  is_new_stars      BOOLEAN NOT NULL DEFAULT false,
  status            TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_by        UUID REFERENCES public.profiles(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects_public_read_published"
  ON public.projects
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "projects_admin_read_all"
  ON public.projects
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "projects_admin_insert"
  ON public.projects
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "projects_admin_update"
  ON public.projects
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "projects_admin_delete"
  ON public.projects
  FOR DELETE
  USING (public.is_admin());

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_slug);
CREATE INDEX IF NOT EXISTS idx_projects_level ON public.projects(level_slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);


-- ============================================================
-- TABLE: weekly_tasks
-- Task breakdown per project (4-5 weeks typically)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.weekly_tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  week_number     INTEGER NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  estimated_hours TEXT NOT NULL DEFAULT '',
  is_final        BOOLEAN NOT NULL DEFAULT false,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  UNIQUE(project_id, week_number)
);

ALTER TABLE public.weekly_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "weekly_tasks_public_read"
  ON public.weekly_tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = weekly_tasks.project_id
      AND p.status = 'published'
    )
  );

CREATE POLICY "weekly_tasks_admin_read_all"
  ON public.weekly_tasks
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "weekly_tasks_admin_insert"
  ON public.weekly_tasks
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "weekly_tasks_admin_update"
  ON public.weekly_tasks
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "weekly_tasks_admin_delete"
  ON public.weekly_tasks
  FOR DELETE
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_weekly_tasks_project ON public.weekly_tasks(project_id);


-- ============================================================
-- TABLE: project_safety_labels
-- Many-to-many: projects <-> safety label identifiers
-- ============================================================
CREATE TABLE IF NOT EXISTS public.project_safety_labels (
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  label_id    TEXT NOT NULL,
  label_text  TEXT NOT NULL DEFAULT '',
  label_icon  TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (project_id, label_id)
);

ALTER TABLE public.project_safety_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "safety_labels_public_read"
  ON public.project_safety_labels
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = project_safety_labels.project_id
      AND p.status = 'published'
    )
  );

CREATE POLICY "safety_labels_admin_read_all"
  ON public.project_safety_labels
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "safety_labels_admin_insert"
  ON public.project_safety_labels
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "safety_labels_admin_delete"
  ON public.project_safety_labels
  FOR DELETE
  USING (public.is_admin());


-- ============================================================
-- SEED: Projects (from mock data)
-- ============================================================

INSERT INTO public.projects (slug, title, description_short, emoji, category_slug, level_slug, age_min, duration_weeks, star_reward, is_featured, is_new_stars, status)
VALUES
  ('the-ice-cream-project', 'The Ice Cream Project', 'Survey, build, test, improve — make your own ice cream from scratch.', '🍦', 'chef', 'tiny', 4, 3, 1, false, false, 'published'),
  ('pasta-from-scratch', 'Pasta from Scratch', 'Make handmade pasta with traditional techniques + your own sauce.', '🍝', 'chef', 'baby', 6, 4, 1, false, false, 'published'),
  ('sunflower-garden', 'Sunflower Garden', 'Plan, plant, and document a small sunflower garden over 4 weeks.', '🌻', 'farm', 'baby', 6, 6, 1, false, false, 'published'),
  ('neighborhood-art-wall', 'Neighborhood Art Wall', 'Plan and create a small neighborhood art wall together.', '🎨', 'community', 'baby', 7, 4, 1, false, false, 'published'),
  ('brezel-workshop', 'Brezel Workshop', 'The classic German pretzel — learn the dough, the boil, and the bake.', '🥨', 'chef', 'baby', 6, 4, 1, false, true, 'published'),
  ('pollinator-garden-map', 'Pollinator Garden Map', 'Survey local bees, plan, plant, and track a pollinator-friendly garden.', '🐝', 'farm', 'junior', 8, 5, 1, false, true, 'published'),
  ('line-following-bot', 'Line-Following Bot', 'Build a small robot that follows a path using sensors and code.', '🤖', 'robotics', 'young', 10, 4, 1, false, true, 'published'),
  ('family-story-podcast', 'Family Story Podcast', 'Interview a family member; record, edit, and publish privately.', '🎤', 'community', 'baby', 7, 3, 1, false, true, 'published'),
  ('apfelkuchen-challenge', 'Apfelkuchen Challenge', 'Bake a classic German apple pie with fresh seasonal apples.', '🥧', 'chef', 'baby', 6, 3, 1, false, false, 'published'),
  ('window-box-tomatoes', 'Window-Box Tomatoes', 'Grow your own tomatoes from seed in a window-box garden.', '🍅', 'farm', 'baby', 6, 8, 1, false, false, 'published'),
  ('donation-drive', 'Donation Drive', 'Plan and run a small donation drive for a local cause.', '📦', 'community', 'baby', 7, 3, 1, false, false, 'published'),
  ('five-color-salad', 'Five-Color Salad', 'Design a balanced salad with five natural colors and explain why.', '🥗', 'chef', 'junior', 8, 2, 1, false, false, 'published'),
  ('family-pizza-night', 'Family Pizza Night', 'Dough from scratch + 3 family-pleasing toppings.', '🍕', 'chef', 'baby', 6, 3, 1, false, false, 'published'),
  ('pancake-breakfast-service', 'Pancake Breakfast Service', 'Run a Saturday breakfast for your family — plan, cook, serve.', '🥞', 'chef', 'baby', 6, 2, 1, false, false, 'published'),
  ('healthy-salad-designer', 'Healthy Salad Designer', 'Design a balanced salad with fresh ingredients.', '🥗', 'chef', 'baby', 6, 3, 1, false, false, 'published'),
  ('mini-greenhouse-build', 'Mini Greenhouse Build', 'Design, build, and monitor a small greenhouse with sensors.', '🌱', 'farm', 'junior', 8, 4, 1, false, false, 'published')
ON CONFLICT (slug) DO NOTHING;

-- Mythical projects (premium)
INSERT INTO public.projects (slug, title, description_short, emoji, category_slug, level_slug, age_min, duration_weeks, star_reward, is_mythical, mythical_price, is_featured, status)
VALUES
  ('compose-record-original-song', 'Compose & Record an Original Song', 'Premium expert-led: compose, arrange, and record a track end-to-end.', '🎵', 'music', 'mythical', 13, 5, 3, true, 150.00, false, 'published'),
  ('ai-powered-plant-caretaker', 'AI-Powered Plant Caretaker', 'Build a smart sensor system with simple ML. Expert mentorship included.', '🪴', 'robotics', 'mythical', 15, 6, 2, true, 100.00, false, 'published'),
  ('short-film-documentary', 'Short-Film Documentary', 'Plan, shoot, edit, and submit a 5-minute documentary with film expert.', '🎬', 'media', 'mythical', 13, 6, 3, true, 150.00, false, 'published'),
  ('sustainable-fashion-capsule', 'Sustainable Fashion Capsule', 'Design, source, and produce a 3-piece sustainable wardrobe capsule.', '👗', 'fashion', 'mythical', 13, 5, 2, true, 100.00, false, 'published')
ON CONFLICT (slug) DO NOTHING;

-- Weekly tasks for Brezel Workshop
INSERT INTO public.weekly_tasks (project_id, week_number, title, description, estimated_hours, is_final, sort_order)
SELECT p.id, t.week_number, t.title, t.description, t.estimated_hours, t.is_final, t.week_number
FROM public.projects p,
(VALUES
  (1, 'Research & Validation', 'Interview 5 people about their favorite pretzel. Research the history of Brezel in Hessen. Compare 3 local bakeries'' prices. Document allergies and dietary restrictions among testers.', '3-4 hours', false),
  (2, 'Build & Create', 'Make your first batch of Brezel based on Week 1 findings. Document each step with photos. Note variations from the standard recipe.', '4-5 hours', false),
  (3, 'Test & Validate', 'Give samples to 5 testers. Collect structured feedback on taste, texture, salt level, and appearance using the provided template.', '2-3 hours', false),
  (4, 'Improve & Finalize', 'Make a second batch with improvements. Prepare your final report and a 3-minute video proof. Submit for review.', '4 hours', true)
) AS t(week_number, title, description, estimated_hours, is_final)
WHERE p.slug = 'brezel-workshop'
ON CONFLICT (project_id, week_number) DO NOTHING;

-- Weekly tasks for Pasta from Scratch
INSERT INTO public.weekly_tasks (project_id, week_number, title, description, estimated_hours, is_final, sort_order)
SELECT p.id, t.week_number, t.title, t.description, t.estimated_hours, t.is_final, t.week_number
FROM public.projects p,
(VALUES
  (1, 'Research & Validation', 'Interview 6 family members about their favorite pasta dishes. Compared sauce prices at 3 supermarkets. Documented allergies of testers.', '3-4 hours', false),
  (2, 'Build & Create', 'You and Sophie made fresh tagliatelle from scratch. Tomato-basil sauce based on Nonna''s recipe research. 8 photos uploaded.', '4-5 hours', false),
  (3, 'Test & Validate', 'Give samples to 5 testers. Collect feedback. Document reactions and improvement notes.', '2-3 hours', false),
  (4, 'Improve & Finalize', 'Make improved version. Submit final report + 3-minute video proof for review.', '4 hours', true)
) AS t(week_number, title, description, estimated_hours, is_final)
WHERE p.slug = 'pasta-from-scratch'
ON CONFLICT (project_id, week_number) DO NOTHING;

-- Safety labels for Brezel Workshop
INSERT INTO public.project_safety_labels (project_id, label_id, label_text, label_icon)
SELECT p.id, t.label_id, t.label_text, t.label_icon
FROM public.projects p,
(VALUES
  ('adult_supervision', 'Adult Supervision Required', '👨‍👩‍👧'),
  ('no_open_fire', 'No Open Fire', '🔥')
) AS t(label_id, label_text, label_icon)
WHERE p.slug = 'brezel-workshop'
ON CONFLICT (project_id, label_id) DO NOTHING;


-- ============================================================
-- VERIFY
-- ============================================================
-- SELECT count(*) FROM projects;           -- should be 20
-- SELECT count(*) FROM weekly_tasks;       -- should be 8
-- SELECT count(*) FROM project_safety_labels; -- should be 2
