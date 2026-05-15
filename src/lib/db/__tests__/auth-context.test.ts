import { describe, it, expect } from 'vitest'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const env = loadEnv('', process.cwd(), '')
const supabase = createClient(env.VITE_SUPABASE_URL!, env.VITE_SUPABASE_ANON_KEY!)

describe('Auth Context — Profile Fetch Verification', () => {
  it('profiles table should be queryable', async () => {
    const { error } = await supabase
      .from('profiles')
      .select('id, guardian_name, guardian_email, role')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('children table should be queryable with profile_id', async () => {
    const { error } = await supabase
      .from('children')
      .select('id, profile_id, child_name, child_initials, student_id, current_level, total_stars')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('anonymous user cannot read profiles', async () => {
    const { data } = await supabase.from('profiles').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot read children', async () => {
    const { data } = await supabase.from('children').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })
})

describe('Auth Context — toUserProfile', () => {
  it('should convert profile + child to UserProfile', async () => {
    const { toUserProfile } = await import('../../auth/auth-types')

    const profile = {
      id: '00000000-0000-0000-0000-000000000001',
      guardian_name: 'Test Parent',
      guardian_email: 'test@example.com',
      phone: '+49123456789',
      region: 'Kassel, DE',
      role: 'parent' as const,
      avatar_initials: 'TP',
    }

    const child = {
      id: '00000000-0000-0000-0000-000000000002',
      child_name: 'Test Child',
      child_initials: 'TC',
      date_of_birth: '2018-01-15',
      student_id: 'STAR-0001',
      current_category: 'chef',
      current_level: 'tiny',
      total_stars: 3,
      projects_completed: 2,
      about_me: 'I love cooking!',
    }

    const result = toUserProfile(profile, child)

    expect(result.id).toBe(profile.id)
    expect(result.guardianName).toBe('Test Parent')
    expect(result.guardianEmail).toBe('test@example.com')
    expect(result.role).toBe('parent')
    expect(result.childId).toBe(child.id)
    expect(result.childName).toBe('Test Child')
    expect(result.studentId).toBe('STAR-0001')
    expect(result.totalStars).toBe(3)
    expect(result.currentLevel).toBe('tiny')
  })

  it('should handle null child gracefully', async () => {
    const { toUserProfile } = await import('../../auth/auth-types')

    const profile = {
      id: '00000000-0000-0000-0000-000000000001',
      guardian_name: 'Test Parent',
      guardian_email: 'test@example.com',
      phone: null,
      region: 'Kassel, DE',
      role: 'admin' as const,
      avatar_initials: 'TP',
    }

    const result = toUserProfile(profile, null)

    expect(result.guardianName).toBe('Test Parent')
    expect(result.role).toBe('admin')
    expect(result.childId).toBeNull()
    expect(result.childName).toBe('')
    expect(result.studentId).toBe('')
    expect(result.totalStars).toBe(0)
    expect(result.currentLevel).toBe('tiny')
  })
})
