import { supabase } from '../../supabase'

export type SubscriptionRow = {
  id: string
  profile_id: string
  plan_name: string
  price_cents: number
  billing_cycle: string
  status: 'active' | 'past_due' | 'cancelled' | 'pending'
  current_period_start: string | null
  current_period_end: string | null
  payment_provider: string
  created_at: string
  updated_at: string
}

export type PaymentRow = {
  id: string
  profile_id: string
  subscription_id: string | null
  type: 'subscription' | 'mythical' | 'late_fee'
  amount_cents: number
  currency: string
  status: 'pending' | 'approved' | 'rejected' | 'needs_review' | 'flagged'
  payment_provider: string
  provider_reference: string | null
  description: string
  admin_note: string
  reviewed_by: string | null
  reviewed_at: string | null
  flag_reason: string | null
  created_at: string
  updated_at: string
}

export type LateFeeRow = {
  id: string
  profile_id: string
  enrollment_id: string
  amount_cents: number
  reason: string
  fee_month: string
  payment_id: string | null
  created_at: string
}

export function centsToEuros(cents: number): string {
  if (!Number.isFinite(cents) || !Number.isInteger(cents) || cents < 0) {
    return '0.00'
  }
  return (cents / 100).toFixed(2)
}

export function eurosToCents(euros: number): number {
  if (!Number.isFinite(euros) || euros < 0) {
    return 0
  }
  return Math.round(euros * 100)
}

export async function fetchMySubscription(): Promise<SubscriptionRow | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('profile_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Failed to fetch subscription:', error.message)
    return null
  }

  return data
}

export async function fetchMyPayments(): Promise<PaymentRow[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch payments:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchMyLateFees(feeMonth?: string): Promise<LateFeeRow[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  let query = supabase
    .from('late_fees')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })

  if (feeMonth) {
    query = query.eq('fee_month', feeMonth)
  }

  const { data, error } = await query

  if (error) {
    console.error('Failed to fetch late fees:', error.message)
    return []
  }

  return data ?? []
}

export async function fetchCurrentMonthLateFeeTotal(): Promise<{
  totalCents: number
  capCents: number
  count: number
}> {
  const now = new Date()
  const feeMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const fees = await fetchMyLateFees(feeMonth)

  return {
    totalCents: fees.reduce((sum, f) => sum + f.amount_cents, 0),
    capCents: 200,
    count: fees.length,
  }
}

export async function createSubscription(): Promise<{
  data: SubscriptionRow | null
  error: string | null
}> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      profile_id: user.id,
      plan_name: 'family',
      price_cents: 2900,
      billing_cycle: 'monthly',
      status: 'pending',
      payment_provider: 'flipflop',
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function createPayment(params: {
  subscriptionId?: string
  type: 'subscription' | 'mythical' | 'late_fee'
  amountCents: number
  description: string
  providerReference?: string
}): Promise<{ data: PaymentRow | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('payments')
    .insert({
      profile_id: user.id,
      subscription_id: params.subscriptionId ?? null,
      type: params.type,
      amount_cents: params.amountCents,
      currency: 'EUR',
      status: 'pending',
      payment_provider: 'flipflop',
      provider_reference: params.providerReference ?? null,
      description: params.description,
    })
    .select()
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function fetchAllPaymentsAdmin(): Promise<
  (PaymentRow & {
    profiles: { guardian_name: string; guardian_email: string }
  })[]
> {
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      profiles!payments_profile_id_fkey (guardian_name, guardian_email)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all payments (admin):', error.message)
    return []
  }

  return (data ?? []) as any[]
}

export async function fetchPendingPaymentsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('payments')
    .select('id', { count: 'exact', head: true })
    .in('status', ['pending', 'needs_review', 'flagged'])

  if (error) return 0
  return count ?? 0
}

export async function reviewPayment(params: {
  paymentId: string
  status: 'approved' | 'rejected' | 'needs_review' | 'flagged'
  adminNote: string
  flagReason?: string
}): Promise<{ error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('payments')
    .update({
      status: params.status,
      admin_note: params.adminNote,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      flag_reason: params.flagReason ?? null,
    })
    .eq('id', params.paymentId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function activateSubscription(
  subscriptionId: string,
): Promise<{ error: string | null }> {
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
    })
    .eq('id', subscriptionId)

  if (error) return { error: error.message }
  return { error: null }
}

export async function fetchAllSubscriptionsAdmin(): Promise<
  (SubscriptionRow & {
    profiles: { guardian_name: string; guardian_email: string }
  })[]
> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      profiles!subscriptions_profile_id_fkey (guardian_name, guardian_email)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch all subscriptions (admin):', error.message)
    return []
  }

  return (data ?? []) as any[]
}

export async function fetchLateFeesSummaryAdmin(): Promise<{
  totalCollectedCents: number
  totalInstances: number
}> {
  const { data, error } = await supabase
    .from('late_fees')
    .select('amount_cents')

  if (error) return { totalCollectedCents: 0, totalInstances: 0 }

  return {
    totalCollectedCents: (data ?? []).reduce((sum, f) => sum + f.amount_cents, 0),
    totalInstances: (data ?? []).length,
  }
}
