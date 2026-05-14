import { supabase } from '../../supabase'

export type ProfileRow = {
  id: string
  guardian_name: string
  guardian_email: string
  phone: string | null
  region: string
  role: 'parent' | 'admin'
  avatar_initials: string
  created_at: string
  updated_at: string
}

export type ChildRow = {
  id: string
  profile_id: string
  child_name: string
  child_initials: string
  date_of_birth: string
  student_id: string
  current_category: string | null
  current_level: string
  total_stars: number
  projects_completed: number
  about_me: string
  created_at: string
  updated_at: string
}

export type ProfileWithChild = ProfileRow & {
  children: ChildRow[]
}

export async function fetchCurrentProfile(): Promise<ProfileRow | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Failed to fetch profile:', error.message)
    return null
  }

  return data
}

export async function fetchCurrentProfileWithChild(): Promise<ProfileWithChild | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      children (*)
    `)
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Failed to fetch profile with child:', error.message)
    return null
  }

  return data as ProfileWithChild
}

export async function createProfile(profile: {
  id: string
  guardian_name: string
  guardian_email: string
  phone?: string
  region?: string
  avatar_initials: string
}): Promise<{ data: ProfileRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: profile.id,
      guardian_name: profile.guardian_name,
      guardian_email: profile.guardian_email,
      phone: profile.phone ?? null,
      region: profile.region ?? 'Kassel, DE',
      avatar_initials: profile.avatar_initials,
      role: 'parent',
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function updateProfile(
  updates: Partial<
    Pick<ProfileRow, 'guardian_name' | 'phone' | 'region' | 'avatar_initials'>
  >,
): Promise<{ error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) return { error: error.message }
  return { error: null }
}

export async function fetchCurrentChild(): Promise<ChildRow | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  if (error) {
    console.error('Failed to fetch child:', error.message)
    return null
  }

  return data
}

export async function createChild(child: {
  profile_id: string
  child_name: string
  child_initials: string
  date_of_birth: string
  student_id: string
  current_category?: string
}): Promise<{ data: ChildRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from('children')
    .insert({
      profile_id: child.profile_id,
      child_name: child.child_name,
      child_initials: child.child_initials,
      date_of_birth: child.date_of_birth,
      student_id: child.student_id,
      current_category: child.current_category ?? null,
      current_level: 'tiny',
      total_stars: 0,
      projects_completed: 0,
      about_me: '',
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function searchChildByStudentId(
  studentId: string,
): Promise<{ child_name: string; child_initials: string; student_id: string } | null> {
  const { data, error } = await supabase.rpc('search_child_by_student_id', {
    p_student_id: studentId,
  })

  if (error || !data || data.length === 0) return null
  return data[0]
}

export async function fetchAllProfilesAdmin(): Promise<ProfileWithChild[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      children (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all profiles:', error.message)
    return []
  }

  return (data as ProfileWithChild[]) ?? []
}
