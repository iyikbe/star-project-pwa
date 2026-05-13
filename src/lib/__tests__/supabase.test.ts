import { describe, it, expect } from 'vitest'
import { supabase } from '../supabase'
import { hasSupabaseCredentials } from '../../test/helpers'

describe('Supabase Client', () => {
  it('should be defined and not null', () => {
    expect(supabase).toBeDefined()
    expect(supabase).not.toBeNull()
  })

  it('should have auth module', () => {
    expect(supabase.auth).toBeDefined()
    expect(typeof supabase.auth.getSession).toBe('function')
    expect(typeof supabase.auth.signInWithPassword).toBe('function')
    expect(typeof supabase.auth.signUp).toBe('function')
    expect(typeof supabase.auth.signOut).toBe('function')
  })

  it('should have storage module', () => {
    expect(supabase.storage).toBeDefined()
    expect(typeof supabase.storage.from).toBe('function')
  })

  it('should have database query capability', () => {
    expect(typeof supabase.from).toBe('function')
  })

  it('should have environment variables configured', () => {
    const hasCredentials = hasSupabaseCredentials()
    expect(hasCredentials).toBe(true)
  })

  it('should connect to Supabase successfully', async () => {
    const { error } = await supabase
      .from('_health_check_nonexistent')
      .select('*')
      .limit(1)

    expect(error).not.toBeNull()

    if (error) {
      const isConnectionError =
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS')

      expect(isConnectionError).toBe(false)
    }
  })

  it('should be able to check auth session without error', async () => {
    const { data, error } = await supabase.auth.getSession()

    expect(error).toBeNull()
    expect(data.session).toBeNull()
  })
})
