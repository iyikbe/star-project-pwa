import { supabase } from '../../supabase'

export type ProjectRow = {
  id: string
  slug: string
  title: string
  description_short: string
  description_long: string
  emoji: string
  category_slug: string
  level_slug: string
  age_min: number
  duration_weeks: number
  star_reward: number
  is_mythical: boolean
  mythical_price: number | null
  is_featured: boolean
  is_new_stars: boolean
  status: 'draft' | 'published' | 'archived'
  created_by: string | null
  created_at: string
  updated_at: string
}

export type WeeklyTaskRow = {
  id: string
  project_id: string
  week_number: number
  title: string
  description: string
  estimated_hours: string
  is_final: boolean
  sort_order: number
}

export type SafetyLabelRow = {
  project_id: string
  label_id: string
  label_text: string
  label_icon: string
}

export type ProjectWithDetails = ProjectRow & {
  weekly_tasks: WeeklyTaskRow[]
  project_safety_labels: SafetyLabelRow[]
}

export async function fetchPublishedProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch projects:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchProjectsByCategory(categorySlug: string): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('category_slug', categorySlug)
    .order('level_slug', { ascending: true })

  if (error) {
    console.error(`Failed to fetch projects for ${categorySlug}:`, error.message)
    return []
  }

  return data ?? []
}

export async function fetchProjectsByLevel(levelSlug: string): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('level_slug', levelSlug)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Failed to fetch projects for level ${levelSlug}:`, error.message)
    return []
  }

  return data ?? []
}

export async function fetchFeaturedProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch featured projects:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchNewStarsProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('is_new_stars', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch new stars projects:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchMythicalProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('is_mythical', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch mythical projects:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectWithDetails | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      weekly_tasks (*),
      project_safety_labels (*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error(`Failed to fetch project ${slug}:`, error.message)
    return null
  }

  return data as ProjectWithDetails
  const project = data as ProjectWithDetails
  project.weekly_tasks = project.weekly_tasks.sort(
    (a, b) => a.week_number - b.week_number
  )
  return project
}

export async function fetchAllProjectsAdmin(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all projects (admin):', error.message)
    return []
  }

  return data ?? []
}

export async function createProject(project: {
  slug: string
  title: string
  description_short: string
  description_long?: string
  emoji?: string
  category_slug: string
  level_slug: string
  age_min?: number
  duration_weeks?: number
  star_reward?: number
  is_mythical?: boolean
  mythical_price?: number
  is_featured?: boolean
  is_new_stars?: boolean
  status?: 'draft' | 'published'
}): Promise<{ data: ProjectRow | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...project,
      created_by: user?.id ?? null,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}
