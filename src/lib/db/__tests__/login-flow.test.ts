import { describe, it, expect } from 'vitest'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const env = loadEnv('', process.cwd(), '')
const supabase = createClient(env.VITE_SUPABASE_URL!, env.VITE_SUPABASE_ANON_KEY!)

describe('Login Flow — Auth Verification', () => {
  it('signInWithPassword rejects invalid credentials', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent@test.com',
      password: 'wrongpassword123',
    })

    expect(error).not.toBeNull()
    expect(error?.message).toContain('Invalid login credentials')
  })

  it('signInWithPassword rejects empty email', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: '',
      password: 'somepassword',
    })

    expect(error).not.toBeNull()
  })

  it('signInWithPassword rejects empty password', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: '',
    })

    expect(error).not.toBeNull()
  })
})

describe('Login Flow — Profile Loading After Auth', () => {
  it('profiles table is queryable for auth context', async () => {
    const { error } = await supabase
      .from('profiles')
      .select('id, guardian_name, guardian_email, role, avatar_initials')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('children table is queryable for auth context', async () => {
    const { error } = await supabase
      .from('children')
      .select('id, profile_id, child_name, child_initials, date_of_birth, student_id, current_category, current_level, total_stars, projects_completed, about_me')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })
})

describe('Login Flow — Password Reset', () => {
  it('resetPasswordForEmail does not error for any email (security: no enumeration)', async () => {
    // Supabase returns success even for non-existent emails (prevents user enumeration)
    const { error } = await supabase.auth.resetPasswordForEmail('nobody@example.com')

    // Should NOT error — Supabase hides whether email exists
    expect(error).toBeNull()
  })
})
