import { supabase } from '../../supabase'

export type SubmissionRow = {
  id: string
  enrollment_id: string
  submitted_by: string
  status: 'pending_review' | 'approved' | 'rejected' | 'resubmission_requested'
  ai_check_passed: boolean
  ai_check_details: AiCheckItem[]
  reviewer_id: string | null
  reviewer_note: string
  reviewed_at: string | null
  stars_issued: boolean
  certificate_generated: boolean
  featured_on_home: boolean
  created_at: string
  updated_at: string
}

export type AiCheckItem = {
  icon: string
  label: string
  detail: string
  passed: boolean
}

export type SubmissionFileRow = {
  id: string
  submission_id: string
  file_type: 'report' | 'video' | 'photo'
  file_name: string
  file_size_bytes: number
  storage_path: string
  mime_type: string
  created_at: string
}

export type SubmissionWithFiles = SubmissionRow & {
  submission_files: SubmissionFileRow[]
}

export async function fetchSubmissionByEnrollment(
  enrollmentId: string,
): Promise<SubmissionWithFiles | null> {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      submission_files (*)
    `)
    .eq('enrollment_id', enrollmentId)
    .maybeSingle()

  if (error) {
    console.error('Failed to fetch submission:', error.message)
    return null
  }

  return data as SubmissionWithFiles | null
}

export async function fetchMySubmissions(): Promise<SubmissionWithFiles[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      submission_files (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch my submissions:', error.message)
    return []
  }

  return (data ?? []) as SubmissionWithFiles[]
}

export async function createSubmission(params: {
  enrollmentId: string
  aiCheckPassed: boolean
  aiCheckDetails: AiCheckItem[]
}): Promise<{ data: SubmissionRow | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('submissions')
    .insert({
      enrollment_id: params.enrollmentId,
      submitted_by: user.id,
      ai_check_passed: params.aiCheckPassed,
      ai_check_details: params.aiCheckDetails,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function addSubmissionFile(params: {
  submissionId: string
  fileType: 'report' | 'video' | 'photo'
  fileName: string
  fileSizeBytes: number
  storagePath: string
  mimeType: string
}): Promise<{ data: SubmissionFileRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from('submission_files')
    .insert({
      submission_id: params.submissionId,
      file_type: params.fileType,
      file_name: params.fileName,
      file_size_bytes: params.fileSizeBytes,
      storage_path: params.storagePath,
      mime_type: params.mimeType,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function fetchAllSubmissionsAdmin(): Promise<
  (SubmissionWithFiles & {
    enrollments: {
      projects: {
        title: string
        emoji: string
        slug: string
        category_slug: string
        level_slug: string
      }
      enrollment_members: {
        children: { child_name: string; child_initials: string; student_id: string }
      }[]
    }
  })[]
> {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      submission_files (*),
      enrollments (
        projects (title, emoji, slug, category_slug, level_slug),
        enrollment_members (
          children (child_name, child_initials, student_id)
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all submissions (admin):', error.message)
    return []
  }

  return (data ?? []) as any[]
}

export async function reviewSubmission(params: {
  submissionId: string
  status: 'approved' | 'rejected' | 'resubmission_requested'
  reviewerNote: string
  starsIssued?: boolean
  certificateGenerated?: boolean
  featuredOnHome?: boolean
}): Promise<{ error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('submissions')
    .update({
      status: params.status,
      reviewer_id: user.id,
      reviewer_note: params.reviewerNote,
      reviewed_at: new Date().toISOString(),
      stars_issued: params.starsIssued ?? false,
      certificate_generated: params.certificateGenerated ?? false,
      featured_on_home: params.featuredOnHome ?? false,
    })
    .eq('id', params.submissionId)

  if (error) return { error: error.message }
  return { error: null }
}
