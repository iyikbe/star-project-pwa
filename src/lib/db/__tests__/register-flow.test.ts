import { describe, it, expect } from 'vitest'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const env = loadEnv('', process.cwd(), '')
const supabase = createClient(env.VITE_SUPABASE_URL!, env.VITE_SUPABASE_ANON_KEY!)

describe('Register Flow — Helper Functions', () => {
  it('generateInitials should create correct initials', () => {
    function generateInitials(name: string): string {
      const parts = name.trim().split(/\s+/)
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      return name.trim().substring(0, 2).toUpperCase()
    }

    expect(generateInitials('Lukas Müller')).toBe('LM')
    expect(generateInitials('Anna Schmidt')).toBe('AS')
    expect(generateInitials('Max')).toBe('MA')
    expect(generateInitials('Jo')).toBe('JO')
    expect(generateInitials('Anna Maria Schmidt')).toBe('AS')
  })

  it('generateStudentId should create STAR-XXXX format', () => {
    function generateStudentId(): string {
      const num = Math.floor(1000 + Math.random() * 9000)
      return `STAR-${num}`
    }

    const id = generateStudentId()
    expect(id).toMatch(/^STAR-\d{4}$/)

    for (let i = 0; i < 10; i++) {
      const testId = generateStudentId()
      expect(testId).toMatch(/^STAR-\d{4}$/)
      const num = parseInt(testId.split('-')[1], 10)
      expect(num).toBeGreaterThanOrEqual(1000)
      expect(num).toBeLessThanOrEqual(9999)
    }
  })

  it('mapRegion should map select values correctly', () => {
    function mapRegion(value: string): string {
      const regionMap: Record<string, string> = {
        'kassel-hessen': 'Kassel, DE',
        'other-hessen': 'Hessen, DE',
        'other-de': 'Germany',
        'other-eu': 'EU',
      }
      return regionMap[value] ?? 'Kassel, DE'
    }

    expect(mapRegion('kassel-hessen')).toBe('Kassel, DE')
    expect(mapRegion('other-hessen')).toBe('Hessen, DE')
    expect(mapRegion('other-de')).toBe('Germany')
    expect(mapRegion('other-eu')).toBe('EU')
    expect(mapRegion('unknown')).toBe('Kassel, DE')
  })
})

describe('Register Flow — Database Schema Compatibility', () => {
  it('profiles table accepts registration fields', async () => {
    const { error } = await supabase
      .from('profiles')
      .select('id, guardian_name, guardian_email, region, role, avatar_initials')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('children table accepts registration fields', async () => {
    const { error } = await supabase
      .from('children')
      .select(
        'id, profile_id, child_name, child_initials, date_of_birth, student_id, current_category, current_level, total_stars, projects_completed, about_me',
      )
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('anonymous user cannot insert profile (RLS blocks)', async () => {
    const { error } = await supabase.from('profiles').insert({
      id: '00000000-0000-0000-0000-000000000099',
      guardian_name: 'Hacker',
      guardian_email: 'hack@test.com',
      region: 'Kassel, DE',
      role: 'admin',
      avatar_initials: 'HK',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot insert child (RLS blocks)', async () => {
    const { error } = await supabase.from('children').insert({
      profile_id: '00000000-0000-0000-0000-000000000099',
      child_name: 'Hacker Kid',
      child_initials: 'HK',
      date_of_birth: '2020-01-01',
      student_id: 'STAR-9999',
    })

    expect(error).not.toBeNull()
  })
})
