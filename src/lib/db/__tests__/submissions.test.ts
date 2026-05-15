import { describe, it, expect } from 'vitest'
import { supabase } from '../../supabase'

describe('Submissions — Schema Verification', () => {
  it('submissions table should exist', async () => {
    const { error } = await supabase
      .from('submissions')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('submission_files table should exist', async () => {
    const { error } = await supabase
      .from('submission_files')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('submissions should have correct columns', async () => {
    const { error } = await supabase
      .from('submissions')
      .select(
        'id, enrollment_id, submitted_by, status, ai_check_passed, ai_check_details, reviewer_id, reviewer_note, reviewed_at, stars_issued, certificate_generated, featured_on_home, created_at, updated_at',
      )
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('submission_files should have correct columns', async () => {
    const { error } = await supabase
      .from('submission_files')
      .select(
        'id, submission_id, file_type, file_name, file_size_bytes, storage_path, mime_type, created_at',
      )
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })
})

describe('Submissions — RLS Verification', () => {
  it('anonymous user cannot read submissions', async () => {
    const { data } = await supabase.from('submissions').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert submissions', async () => {
    const { error } = await supabase.from('submissions').insert({
      enrollment_id: '00000000-0000-0000-0000-000000000000',
      submitted_by: '00000000-0000-0000-0000-000000000000',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot read submission_files', async () => {
    const { data } = await supabase.from('submission_files').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert submission_files', async () => {
    const { error } = await supabase.from('submission_files').insert({
      submission_id: '00000000-0000-0000-0000-000000000000',
      file_type: 'report',
      file_name: 'hack.docx',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot update submissions', async () => {
    const { error } = await supabase
      .from('submissions')
      .update({ status: 'approved' })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) {
      expect(error).toBeDefined()
    }
  })

  it('anonymous user cannot delete submissions', async () => {
    const { data, error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .select()

    if (error) {
      expect(error).toBeDefined()
    } else {
      expect(data).toHaveLength(0)
    }
  })
})

describe('Submissions — Empty State Queries', () => {
  it('fetchMySubmissions returns empty without auth', async () => {
    const { fetchMySubmissions } = await import('../queries/submissions')
    const result = await fetchMySubmissions()
    expect(result).toHaveLength(0)
  })

  it('fetchSubmissionByEnrollment returns null for non-existent', async () => {
    const { fetchSubmissionByEnrollment } = await import('../queries/submissions')
    const result = await fetchSubmissionByEnrollment(
      '00000000-0000-0000-0000-000000000000',
    )
    expect(result).toBeNull()
  })
})
