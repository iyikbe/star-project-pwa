import { describe, it, expect } from 'vitest'
import { fetchCategories, fetchCategoryBySlug } from '../queries/categories'
import { fetchLevels, fetchLevelBySlug } from '../queries/levels'

describe('Reference Data — Categories', () => {
  it('should fetch all 9 categories', async () => {
    const categories = await fetchCategories()
    expect(categories).toHaveLength(9)
  })

  it('should return categories ordered by sort_order', async () => {
    const categories = await fetchCategories()
    expect(categories[0].slug).toBe('chef')
    expect(categories[8].slug).toBe('music')
  })

  it('should have correct shape for each category', async () => {
    const categories = await fetchCategories()
    const chef = categories[0]

    expect(chef.slug).toBe('chef')
    expect(chef.label).toBe('Chef')
    expect(chef.short_label).toBe('CHEF')
    expect(chef.emoji).toBe('🍳')
    expect(chef.description).toBeTruthy()
    expect(chef.sort_order).toBe(1)
  })

  it('should fetch single category by slug', async () => {
    const farm = await fetchCategoryBySlug('farm')
    expect(farm).not.toBeNull()
    expect(farm!.label).toBe('Farm')
    expect(farm!.emoji).toBe('🌱')
  })

  it('should return null for non-existent category', async () => {
    const result = await fetchCategoryBySlug('nonexistent')
    expect(result).toBeNull()
  })
})

describe('Reference Data — Levels', () => {
  it('should fetch all 7 levels', async () => {
    const levels = await fetchLevels()
    expect(levels).toHaveLength(7)
  })

  it('should return levels ordered by sort_order', async () => {
    const levels = await fetchLevels()
    expect(levels[0].slug).toBe('tiny')
    expect(levels[6].slug).toBe('mythical')
  })

  it('should have correct shape for each level', async () => {
    const levels = await fetchLevels()
    const baby = levels[1]

    expect(baby.slug).toBe('baby')
    expect(baby.label).toBe('Baby')
    expect(baby.stars_required).toBe(5)
    expect(baby.min_age).toBe(6)
    expect(baby.is_premium).toBe(false)
    expect(baby.sort_order).toBe(2)
  })

  it('should identify mythical as premium', async () => {
    const mythical = await fetchLevelBySlug('mythical')
    expect(mythical).not.toBeNull()
    expect(mythical!.is_premium).toBe(true)
  })

  it('should return null for non-existent level', async () => {
    const result = await fetchLevelBySlug('nonexistent')
    expect(result).toBeNull()
  })
})
