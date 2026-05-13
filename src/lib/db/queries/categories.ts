import { supabase } from '../../supabase'

export type CategoryRow = {
  slug: string
  label: string
  short_label: string
  emoji: string
  description: string
  tint_class: string
  accent_class: string
  sort_order: number
}

export async function fetchCategories(): Promise<CategoryRow[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to fetch categories:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Failed to fetch category ${slug}:`, error.message)
    return null
  }

  return data
}
