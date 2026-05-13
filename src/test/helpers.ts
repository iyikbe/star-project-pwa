import { supabase } from '../lib/supabase'

export function hasSupabaseCredentials(): boolean {
  return !!(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
}

export function skipWithoutSupabase() {
  if (!hasSupabaseCredentials()) {
    console.warn('Skipping test: Supabase credentials not configured')
    return true
  }
  return false
}

export function getTestSupabase() {
  return supabase
}

export function generateTestEmail(prefix = 'test'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}@test.starproject.de`
}

export async function cleanupTestUser(userId: string) {
  console.log(`[Test cleanup] Would delete user ${userId}`)
}
