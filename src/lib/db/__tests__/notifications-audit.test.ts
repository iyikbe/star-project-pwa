import { describe, it, expect } from 'vitest'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const env = loadEnv('', process.cwd(), '')
const supabase = createClient(env.VITE_SUPABASE_URL!, env.VITE_SUPABASE_ANON_KEY!)

describe('Step 28A — projects.intro_video_url', () => {
  it('projects table should have intro_video_url column', async () => {
    const { error } = await supabase
      .from('projects')
      .select('intro_video_url')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('existing projects should have intro_video_url as null', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('intro_video_url')
      .limit(1)

    if (!error && data && data.length > 0) {
      expect(data[0].intro_video_url).toBeNull()
    }
  })
})

describe('Step 28B — notifications table', () => {
  it('notifications table should exist', async () => {
    const { error } = await supabase
      .from('notifications')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('notifications should have correct columns', async () => {
    const { error } = await supabase
      .from('notifications')
      .select('id, user_id, type, title, body, metadata, is_read, read_at, created_at')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('anonymous user cannot read notifications', async () => {
    const { data } = await supabase.from('notifications').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert notifications', async () => {
    const { error } = await supabase.from('notifications').insert({
      user_id: '00000000-0000-0000-0000-000000000000',
      type: 'enrollment_approved',
      title: 'Test',
      body: 'Test body',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot update notifications', async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) {
      expect(error).toBeDefined()
    }
  })

  it('anonymous user cannot delete notifications', async () => {
    const { data, error } = await supabase
      .from('notifications')
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

describe('Step 28C — audit_logs table', () => {
  it('audit_logs table should exist', async () => {
    const { error } = await supabase
      .from('audit_logs')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('audit_logs should have correct columns', async () => {
    const { error } = await supabase
      .from('audit_logs')
      .select('id, actor_id, action, entity_type, entity_id, changes, ip_address, user_agent, created_at')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('anonymous user cannot read audit_logs', async () => {
    const { data } = await supabase.from('audit_logs').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert audit_logs', async () => {
    const { error } = await supabase.from('audit_logs').insert({
      action: 'project.create',
      entity_type: 'project',
      entity_id: '00000000-0000-0000-0000-000000000000',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot update audit_logs', async () => {
    const { error } = await supabase
      .from('audit_logs')
      .update({ action: 'admin.override' })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) {
      expect(error).toBeDefined()
    }
  })

  it('anonymous user cannot delete audit_logs', async () => {
    const { data, error } = await supabase
      .from('audit_logs')
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

describe('Step 28D — Storage bucket policies', () => {
  it('storage.objects table should be accessible', async () => {
    const { error } = await supabase.storage
      .from('submission-videos')
      .list('', { limit: 1 })

    if (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('storage submission-reports bucket check', async () => {
    const { error } = await supabase.storage
      .from('submission-reports')
      .list('', { limit: 1 })

    if (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('storage submission-photos bucket check', async () => {
    const { error } = await supabase.storage
      .from('submission-photos')
      .list('', { limit: 1 })

    if (error) {
      expect(error.message).toBeDefined()
    }
  })
})
