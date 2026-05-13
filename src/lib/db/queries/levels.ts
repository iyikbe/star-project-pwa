import { supabase } from '../../supabase'

export type LevelRow = {
  slug: string
  label: string
  stars_display: string
  stars_required: number
  min_age: number
  is_premium: boolean
  sort_order: number
}

export async function fetchLevels(): Promise<LevelRow[]> {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to fetch levels:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchLevelBySlug(slug: string): Promise<LevelRow | null> {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Failed to fetch level ${slug}:`, error.message)
    return null
  }

  return data
}
