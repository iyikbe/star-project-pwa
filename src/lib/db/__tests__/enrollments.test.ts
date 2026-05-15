import { describe, it, expect } from 'vitest'
import { supabase } from '../../supabase'

describe('Enrollments — Schema Verification', () => {
  it('enrollments table should exist', async () => {
    const { error } = await supabase
      .from('enrollments')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('enrollment_members table should exist', async () => {
    const { error } = await supabase
      .from('enrollment_members')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('invitations table should exist', async () => {
    const { error } = await supabase
      .from('invitations')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('enrollments should have correct columns', async () => {
    const { error } = await supabase
      .from('enrollments')
      .select(
        'id, project_id, owner_id, status, started_at, deadline_at, completed_at, current_week, created_at, updated_at',
      )
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('enrollment_members should have correct columns', async () => {
    const { error } = await supabase
      .from('enrollment_members')
      .select('id, enrollment_id, child_id, role, joined_at, weeks_active')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('invitations should have correct columns', async () => {
    const { error } = await supabase
      .from('invitations')
      .select(
        'id, enrollment_id, invited_by, invited_child_id, status, created_at, expires_at, responded_at',
      )
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })
})

describe('Enrollments — RLS Verification', () => {
  it('anonymous user cannot read enrollments', async () => {
    const { data } = await supabase.from('enrollments').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert enrollment', async () => {
    const { error } = await supabase.from('enrollments').insert({
      project_id: '00000000-0000-0000-0000-000000000000',
      owner_id: '00000000-0000-0000-0000-000000000000',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot read enrollment_members', async () => {
    const { data } = await supabase.from('enrollment_members').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert enrollment_members', async () => {
    const { error } = await supabase.from('enrollment_members').insert({
      enrollment_id: '00000000-0000-0000-0000-000000000000',
      child_id: '00000000-0000-0000-0000-000000000000',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot read invitations', async () => {
    const { data } = await supabase.from('invitations').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert invitations', async () => {
    const { error } = await supabase.from('invitations').insert({
      enrollment_id: '00000000-0000-0000-0000-000000000000',
      invited_by: '00000000-0000-0000-0000-000000000000',
      invited_child_id: '00000000-0000-0000-0000-000000000000',
    })

    expect(error).not.toBeNull()
  })

  it('helper function is_enrollment_member should exist', async () => {
    const { error } = await supabase.rpc('is_enrollment_member', {
      p_enrollment_id: '00000000-0000-0000-0000-000000000000',
    })

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('helper function is_enrollment_owner should exist', async () => {
    const { error } = await supabase.rpc('is_enrollment_owner', {
      p_enrollment_id: '00000000-0000-0000-0000-000000000000',
    })

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })
})

describe('Enrollments — Empty State Queries', () => {
  it('fetchMyEnrollments returns empty without auth', async () => {
    const { fetchMyEnrollments } = await import('../queries/enrollments')
    const result = await fetchMyEnrollments()
    expect(result).toHaveLength(0)
  })

  it('fetchPendingInvitations returns empty without auth', async () => {
    const { fetchPendingInvitations } = await import('../queries/enrollments')
    const result = await fetchPendingInvitations()
    expect(result).toHaveLength(0)
  })
})
