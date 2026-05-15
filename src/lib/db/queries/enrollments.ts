import { supabase } from '../../supabase'

export type EnrollmentRow = {
  id: string
  project_id: string
  owner_id: string
  status: 'forming' | 'active' | 'completed' | 'cancelled'
  started_at: string | null
  deadline_at: string | null
  completed_at: string | null
  current_week: number
  created_at: string
  updated_at: string
}

export type EnrollmentMemberRow = {
  id: string
  enrollment_id: string
  child_id: string
  role: 'owner' | 'member'
  joined_at: string
  weeks_active: number
}

export type InvitationRow = {
  id: string
  enrollment_id: string
  invited_by: string
  invited_child_id: string
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled'
  created_at: string
  expires_at: string
  responded_at: string | null
}

export type EnrollmentWithDetails = EnrollmentRow & {
  enrollment_members: (EnrollmentMemberRow & {
    children: { child_name: string; child_initials: string; student_id: string }
  })[]
  projects: {
    title: string
    emoji: string
    slug: string
    category_slug: string
    level_slug: string
    duration_weeks: number
    star_reward: number
  }
  invitations: InvitationRow[]
}

export async function fetchMyEnrollments(): Promise<EnrollmentWithDetails[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      projects (title, emoji, slug, category_slug, level_slug, duration_weeks, star_reward),
      enrollment_members (
        *,
        children (child_name, child_initials, student_id)
      ),
      invitations (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch enrollments:', error.message)
    return []
  }

  return (data as EnrollmentWithDetails[]) ?? []
}

export async function fetchEnrollmentById(
  enrollmentId: string,
): Promise<EnrollmentWithDetails | null> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      projects (title, emoji, slug, category_slug, level_slug, duration_weeks, star_reward),
      enrollment_members (
        *,
        children (child_name, child_initials, student_id)
      ),
      invitations (*)
    `)
    .eq('id', enrollmentId)
    .single()

  if (error) {
    console.error(`Failed to fetch enrollment ${enrollmentId}:`, error.message)
    return null
  }

  return data as EnrollmentWithDetails
}

export async function createEnrollment(params: {
  projectId: string
  childId: string
}): Promise<{ data: EnrollmentRow | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data: enrollment, error: enrollError } = await supabase
    .from('enrollments')
    .insert({
      project_id: params.projectId,
      owner_id: user.id,
      status: 'forming',
      current_week: 0,
    })
    .select()
    .single()

  if (enrollError) return { data: null, error: enrollError.message }

  const { error: memberError } = await supabase
    .from('enrollment_members')
    .insert({
      enrollment_id: enrollment.id,
      child_id: params.childId,
      role: 'owner',
    })

  if (memberError) {
    console.error('Failed to add owner as member:', memberError.message)
  }

  return { data: enrollment, error: null }
}

export async function startEnrollment(
  enrollmentId: string,
  durationWeeks: number,
): Promise<{ error: string | null }> {
  const now = new Date()
  const deadline = new Date(now.getTime() + durationWeeks * 7 * 24 * 60 * 60 * 1000)

  const { error } = await supabase
    .from('enrollments')
    .update({
      status: 'active',
      started_at: now.toISOString(),
      deadline_at: deadline.toISOString(),
      current_week: 1,
    })
    .eq('id', enrollmentId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function advanceEnrollmentWeek(
  enrollmentId: string,
  newWeek: number,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('enrollments')
    .update({ current_week: newWeek })
    .eq('id', enrollmentId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function completeEnrollment(
  enrollmentId: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('enrollments')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', enrollmentId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function sendInvitation(params: {
  enrollmentId: string
  invitedChildId: string
}): Promise<{ data: InvitationRow | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('invitations')
    .insert({
      enrollment_id: params.enrollmentId,
      invited_by: user.id,
      invited_child_id: params.invitedChildId,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function respondToInvitation(
  invitationId: string,
  response: 'accepted' | 'declined',
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('invitations')
    .update({
      status: response,
      responded_at: new Date().toISOString(),
    })
    .eq('id', invitationId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function fetchPendingInvitations(): Promise<
  (InvitationRow & {
    enrollments: { id: string; projects: { title: string; emoji: string; slug: string } }
  })[]
> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: children } = await supabase
    .from('children')
    .select('id')
    .eq('profile_id', user.id)

  if (!children || children.length === 0) return []

  const childIds = children.map((c) => c.id)

  const { data, error } = await supabase
    .from('invitations')
    .select(`
      *,
      enrollments!inner (
        id,
        projects (title, emoji, slug)
      )
    `)
    .in('invited_child_id', childIds)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch pending invitations:', error.message)
    return []
  }

  return (data ?? []) as any[]
}

export async function fetchAllEnrollmentsAdmin(): Promise<EnrollmentWithDetails[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      projects (title, emoji, slug, category_slug, level_slug, duration_weeks, star_reward),
      enrollment_members (
        *,
        children (child_name, child_initials, student_id)
      ),
      invitations (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all enrollments (admin):', error.message)
    return []
  }

  return (data as EnrollmentWithDetails[]) ?? []
}
