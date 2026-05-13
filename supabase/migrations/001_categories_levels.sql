-- ============================================================
-- 001_categories_levels.sql
-- Star Project — Reference Data Tables
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- ============================================================
-- TABLE: categories
-- Static reference data for 9 career categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  slug        TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  short_label TEXT NOT NULL,
  emoji       TEXT NOT NULL,
  description TEXT NOT NULL,
  tint_class  TEXT NOT NULL DEFAULT '',
  accent_class TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read"
  ON public.categories
  FOR SELECT
  USING (true);

-- ============================================================
-- TABLE: levels
-- Static reference data for 7 progression levels
-- ============================================================
CREATE TABLE IF NOT EXISTS public.levels (
  slug           TEXT PRIMARY KEY,
  label          TEXT NOT NULL,
  stars_display  TEXT NOT NULL,
  stars_required INTEGER NOT NULL DEFAULT 0,
  min_age        INTEGER NOT NULL DEFAULT 4,
  is_premium     BOOLEAN NOT NULL DEFAULT false,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "levels_public_read"
  ON public.levels
  FOR SELECT
  USING (true);

-- ============================================================
-- SEED: categories (9 rows)
-- Must match src/lib/constants/categories.ts exactly
-- ============================================================
INSERT INTO public.categories (slug, label, short_label, emoji, description, tint_class, accent_class, sort_order)
VALUES
  ('chef',       'Chef',              'CHEF',       '🍳', 'Cooking, baking, taste tests, hygiene, food science, and nutrition basics.',          'bg-category-chef-bg',  'text-category-chef',       1),
  ('farm',       'Farm',              'FARM',       '🌱', 'Growing food, composting, soil science, and sustainable agriculture.',                'bg-category-farm-bg',  'text-category-farm',       2),
  ('robotics',   'Robotics',          'ROBOTICS',   '🤖', 'Building robots, sensors, programming, and mechanical engineering basics.',          'bg-category-robotics-bg', 'text-category-robotics',  3),
  ('community',  'Community Builder', 'COMMUNITY',  '🤝', 'Social projects, volunteering, fundraising, and neighborhood engagement.',           'bg-category-community-bg', 'text-category-community', 4),
  ('automotive', 'Automotive',        'AUTOMOTIVE', '🚗', 'Vehicle basics, maintenance, electric mobility, and transportation design.',         'bg-category-automotive-bg', 'text-category-automotive', 5),
  ('media',      'Media Creator',     'MEDIA',      '🎬', 'Video production, photography, podcasting, and digital storytelling.',               'bg-category-media-bg', 'text-category-media',      6),
  ('software',   'Software Creator',  'SOFTWARE',   '💻', 'Coding, app design, web development, and computational thinking.',                  'bg-category-software-bg', 'text-category-software',  7),
  ('fashion',    'Fashion',           'FASHION',    '👗', 'Textile arts, sustainable fashion, pattern making, and design thinking.',            'bg-category-fashion-bg', 'text-category-fashion',   8),
  ('music',      'Music',             'MUSIC',      '🎵', 'Composition, recording, mixing, and music theory fundamentals.',                    'bg-category-music-bg', 'text-category-music',      9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: levels (7 rows)
-- Must match src/lib/constants/levels.ts exactly
-- ============================================================
INSERT INTO public.levels (slug, label, stars_display, stars_required, min_age, is_premium, sort_order)
VALUES
  ('tiny',      'Tiny',      '⭐',           0,  4, false, 1),
  ('baby',      'Baby',      '⭐⭐',         5,  6, false, 2),
  ('junior',    'Junior',    '⭐⭐⭐',       10,  8, false, 3),
  ('young',     'Young',     '⭐⭐⭐⭐',     20, 10, false, 4),
  ('senior',    'Senior',    '⭐⭐⭐⭐⭐',   35, 13, false, 5),
  ('legendary', 'Legendary', '⭐⭐⭐⭐⭐⭐', 55, 15, false, 6),
  ('mythical',  'Mythical',  '✨',           0,  13, true,  7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- VERIFY
-- ============================================================
-- After running, check:
-- SELECT count(*) FROM categories;  -- should be 9
-- SELECT count(*) FROM levels;      -- should be 7
