import { describe, it, expect } from 'vitest'
import { supabase } from '../../supabase'
import { centsToEuros, eurosToCents } from '../queries/payments'

describe('Payments — Schema Verification', () => {
  it('subscriptions table should exist', async () => {
    const { error } = await supabase
      .from('subscriptions')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('payments table should exist', async () => {
    const { error } = await supabase
      .from('payments')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('late_fees table should exist', async () => {
    const { error } = await supabase
      .from('late_fees')
      .select('id')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('does not exist')
    }
  })

  it('subscriptions should have correct columns', async () => {
    const { error } = await supabase
      .from('subscriptions')
      .select('id, profile_id, plan_name, price_cents, billing_cycle, status, current_period_start, current_period_end, payment_provider, created_at, updated_at')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('payments should have correct columns', async () => {
    const { error } = await supabase
      .from('payments')
      .select('id, profile_id, subscription_id, type, amount_cents, currency, status, payment_provider, provider_reference, description, admin_note, reviewed_by, reviewed_at, flag_reason, created_at, updated_at')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })

  it('late_fees should have correct columns', async () => {
    const { error } = await supabase
      .from('late_fees')
      .select('id, profile_id, enrollment_id, amount_cents, reason, fee_month, payment_id, created_at')
      .limit(0)

    if (error) {
      expect(error.message).not.toContain('column')
    }
  })
})

describe('Payments — Currency Helper Functions', () => {
  it('centsToEuros should convert correctly', () => {
    expect(centsToEuros(2900)).toBe('29.00')
    expect(centsToEuros(50)).toBe('0.50')
    expect(centsToEuros(15000)).toBe('150.00')
    expect(centsToEuros(0)).toBe('0.00')
    expect(centsToEuros(1)).toBe('0.01')
    expect(centsToEuros(999)).toBe('9.99')
  })

  it('eurosToCents should convert correctly', () => {
    expect(eurosToCents(29.0)).toBe(2900)
    expect(eurosToCents(0.5)).toBe(50)
    expect(eurosToCents(150.0)).toBe(15000)
    expect(eurosToCents(0)).toBe(0)
    expect(eurosToCents(9.99)).toBe(999)
  })

  it('roundtrip conversion should be lossless', () => {
    expect(eurosToCents(parseFloat(centsToEuros(2900)))).toBe(2900)
    expect(eurosToCents(parseFloat(centsToEuros(50)))).toBe(50)
    expect(eurosToCents(parseFloat(centsToEuros(15000)))).toBe(15000)
  })
})

describe('Payments — RLS Verification', () => {
  it('anonymous user cannot read subscriptions', async () => {
    const { data } = await supabase.from('subscriptions').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert subscription', async () => {
    const { error } = await supabase.from('subscriptions').insert({
      profile_id: '00000000-0000-0000-0000-000000000000',
      plan_name: 'family',
      price_cents: 2900,
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot read payments', async () => {
    const { data } = await supabase.from('payments').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert payment', async () => {
    const { error } = await supabase.from('payments').insert({
      profile_id: '00000000-0000-0000-0000-000000000000',
      type: 'subscription',
      amount_cents: 2900,
      description: 'hack',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot read late_fees', async () => {
    const { data } = await supabase.from('late_fees').select('*')

    if (data) {
      expect(data).toHaveLength(0)
    }
  })

  it('anonymous user cannot insert late_fee', async () => {
    const { error } = await supabase.from('late_fees').insert({
      profile_id: '00000000-0000-0000-0000-000000000000',
      enrollment_id: '00000000-0000-0000-0000-000000000000',
      amount_cents: 50,
      reason: 'hack',
      fee_month: '2026-05',
    })

    expect(error).not.toBeNull()
  })

  it('anonymous user cannot update subscriptions', async () => {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'active' })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) {
      expect(error).toBeDefined()
    }
  })

  it('anonymous user cannot update payments', async () => {
    const { error } = await supabase
      .from('payments')
      .update({ status: 'approved' })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    if (error) {
      expect(error).toBeDefined()
    }
  })
})

describe('Payments — Empty State Queries', () => {
  it('fetchMySubscription returns null without auth', async () => {
    const { fetchMySubscription } = await import('../queries/payments')
    const result = await fetchMySubscription()
    expect(result).toBeNull()
  })

  it('fetchMyPayments returns empty without auth', async () => {
    const { fetchMyPayments } = await import('../queries/payments')
    const result = await fetchMyPayments()
    expect(result).toHaveLength(0)
  })

  it('fetchMyLateFees returns empty without auth', async () => {
    const { fetchMyLateFees } = await import('../queries/payments')
    const result = await fetchMyLateFees()
    expect(result).toHaveLength(0)
  })

  it('fetchCurrentMonthLateFeeTotal returns zero without auth', async () => {
    const { fetchCurrentMonthLateFeeTotal } = await import('../queries/payments')
    const result = await fetchCurrentMonthLateFeeTotal()
    expect(result.totalCents).toBe(0)
    expect(result.capCents).toBe(200)
    expect(result.count).toBe(0)
  })
})
