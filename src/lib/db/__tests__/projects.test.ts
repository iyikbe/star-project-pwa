import { describe, it, expect } from 'vitest'
import { supabase } from '../../supabase'
import {
  fetchPublishedProjects,
  fetchProjectsByCategory,
  fetchMythicalProjects,
  fetchNewStarsProjects,
  fetchProjectBySlug,
} from '../queries/projects'

describe('Projects — Schema Verification', () => {
  it('projects table should exist and be queryable', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })

  it('weekly_tasks table should exist', async () => {
    const { data, error } = await supabase
      .from('weekly_tasks')
      .select('id')
      .limit(1)

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })

  it('project_safety_labels table should exist', async () => {
    const { data, error } = await supabase
      .from('project_safety_labels')
      .select('project_id')
      .limit(1)

    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })
})

describe('Projects — Seed Data Verification', () => {
  it('should have at least 18 published projects', async () => {
    const projects = await fetchPublishedProjects()
    expect(projects.length).toBeGreaterThanOrEqual(18)
  })

  it('should have correct data for brezel-workshop', async () => {
    const brezel = await fetchProjectBySlug('brezel-workshop')
    expect(brezel).not.toBeNull()
    expect(brezel!.title).toBe('Brezel Workshop')
    expect(brezel!.emoji).toBe('🥨')
    expect(brezel!.category_slug).toBe('chef')
    expect(brezel!.level_slug).toBe('baby')
    expect(brezel!.duration_weeks).toBe(4)
    expect(brezel!.star_reward).toBe(1)
    expect(brezel!.is_new_stars).toBe(true)
  })

  it('brezel-workshop should have 4 weekly tasks', async () => {
    const brezel = await fetchProjectBySlug('brezel-workshop')
    expect(brezel).not.toBeNull()
    expect(brezel!.weekly_tasks).toHaveLength(4)
    expect(brezel!.weekly_tasks[0].title).toBe('Research & Validation')
    expect(brezel!.weekly_tasks[3].is_final).toBe(true)
  })

  it('brezel-workshop should have 2 safety labels', async () => {
    const brezel = await fetchProjectBySlug('brezel-workshop')
    expect(brezel).not.toBeNull()
    expect(brezel!.project_safety_labels).toHaveLength(2)
  })

  it('should have 4 mythical projects', async () => {
    const mythical = await fetchMythicalProjects()
    expect(mythical).toHaveLength(4)
    mythical.forEach((p) => {
      expect(p.is_mythical).toBe(true)
      expect(p.mythical_price).not.toBeNull()
    })
  })

  it('should filter by category correctly', async () => {
    const chefProjects = await fetchProjectsByCategory('chef')
    expect(chefProjects.length).toBeGreaterThanOrEqual(7)
    chefProjects.forEach((p) => {
      expect(p.category_slug).toBe('chef')
    })
  })

  it('should return new stars projects', async () => {
    const newStars = await fetchNewStarsProjects()
    expect(newStars.length).toBeGreaterThanOrEqual(4)
    newStars.forEach((p) => {
      expect(p.is_new_stars).toBe(true)
    })
  })

  it('should return null for non-existent project', async () => {
    const result = await fetchProjectBySlug('nonexistent-project')
    expect(result).toBeNull()
  })
})

describe('Projects — RLS Verification', () => {
  it('anonymous user can read published projects', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .limit(5)

    expect(error).toBeNull()
    expect(data).not.toBeNull()
    expect(data!.length).toBeGreaterThan(0)
  })

  it('anonymous user cannot insert projects', async () => {
    const { error } = await supabase
      .from('projects')
      .insert({
        slug: 'hacker-project',
        title: 'Hacker Project',
        category_slug: 'chef',
        level_slug: 'baby',
      })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot update projects', async () => {
    const { error } = await supabase
      .from('projects')
      .update({ title: 'Hacked Title' })
      .eq('slug', 'brezel-workshop')

    if (error) {
      expect(error).toBeDefined()
    }
  })

  it('anonymous user cannot delete projects', async () => {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('slug', 'brezel-workshop')
      .select()

    if (error) {
      expect(error).toBeDefined()
    } else {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert weekly tasks', async () => {
    const { error } = await supabase
      .from('weekly_tasks')
      .insert({
        project_id: '00000000-0000-0000-0000-000000000000',
        week_number: 99,
        title: 'Hacker Task',
      })

    expect(error).not.toBeNull()
  })
})
