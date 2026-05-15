import { describe, it, expect } from 'vitest'

describe('Route Guards — Component Exports', () => {
  it('ProtectedRoute should be importable', async () => {
    const mod = await import('../../../components/layout/ProtectedRoute')
    expect(mod.ProtectedRoute).toBeDefined()
    expect(typeof mod.ProtectedRoute).toBe('function')
  })

  it('AdminRoute should be importable', async () => {
    const mod = await import('../../../components/layout/AdminRoute')
    expect(mod.AdminRoute).toBeDefined()
    expect(typeof mod.AdminRoute).toBe('function')
  })

  it('GuestRoute should be importable', async () => {
    const mod = await import('../../../components/layout/GuestRoute')
    expect(mod.GuestRoute).toBeDefined()
    expect(typeof mod.GuestRoute).toBe('function')
  })
})

describe('Route Guards — Auth Hook Availability', () => {
  it('useAuth hook should be importable', async () => {
    const mod = await import('../../auth/use-auth')
    expect(mod.useAuth).toBeDefined()
    expect(typeof mod.useAuth).toBe('function')
  })
})

describe('Route Guards — Route Structure', () => {
  it('AppRouter should be importable', async () => {
    const mod = await import('../../../app/routes/AppRouter')
    expect(mod.AppRouter).toBeDefined()
    expect(typeof mod.AppRouter).toBe('function')
  })
})
