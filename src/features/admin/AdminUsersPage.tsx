import { useState } from 'react'

type UserStatus = 'active' | 'pending' | 'suspended'

type AdminUser = {
  id: string
  guardianName: string
  guardianEmail: string
  childName: string
  studentId: string
  region: string
  plan: 'family' | 'pending'
  lastActive: string
  status: UserStatus
  signupDate: string
}

const USERS: AdminUser[] = [
  {
    id: 'u1',
    guardianName: 'Anna Müller',
    guardianEmail: 'anna.mueller@example.de',
    childName: 'Lukas Müller',
    studentId: 'SP-2026-0048',
    region: 'Kassel, DE',
    plan: 'family',
    lastActive: '2h ago',
    status: 'active',
    signupDate: 'Feb 12, 2026',
  },
  {
    id: 'u2',
    guardianName: 'Petra Krause',
    guardianEmail: 'petra.k@example.de',
    childName: 'Sophie Krause',
    studentId: 'SP-2026-0052',
    region: 'Kassel, DE',
    plan: 'family',
    lastActive: '5h ago',
    status: 'active',
    signupDate: 'Feb 14, 2026',
  },
  {
    id: 'u3',
    guardianName: 'Thomas König',
    guardianEmail: 'thomas.koenig@example.de',
    childName: 'Emma König',
    studentId: 'SP-2026-0117',
    region: 'Frankfurt, DE',
    plan: 'family',
    lastActive: 'Yesterday',
    status: 'active',
    signupDate: 'Mar 02, 2026',
  },
  {
    id: 'u4',
    guardianName: 'Maria Schmidt',
    guardianEmail: 'm.schmidt@example.de',
    childName: 'Max Schmidt',
    studentId: 'SP-2026-0203',
    region: 'Berlin, DE',
    plan: 'pending',
    lastActive: '—',
    status: 'pending',
    signupDate: 'Apr 28, 2026',
  },
  {
    id: 'u5',
    guardianName: 'Klaus Weber',
    guardianEmail: 'klaus.weber@example.de',
    childName: 'Hannah Weber',
    studentId: 'SP-2026-0274',
    region: 'Munich, DE',
    plan: 'family',
    lastActive: '3 days ago',
    status: 'active',
    signupDate: 'Apr 15, 2026',
  },
  {
    id: 'u6',
    guardianName: 'Julia Hoffmann',
    guardianEmail: 'julia.h@example.de',
    childName: 'Felix Hoffmann',
    studentId: 'SP-2026-0289',
    region: 'Hamburg, DE',
    plan: 'family',
    lastActive: '1 week ago',
    status: 'suspended',
    signupDate: 'Mar 20, 2026',
  },
]

const KPI_STATS = [
  { label: 'TOTAL ACCOUNTS', value: '412', delta: '+18', deltaLabel: 'this month', positive: true },
  { label: 'ACTIVE SUBSCRIPTIONS', value: '388', delta: '94.2%', deltaLabel: 'of total', positive: true },
  { label: 'PENDING ACTIVATION', value: '12', delta: '+3', deltaLabel: 'this week', positive: false },
  { label: 'MRR', value: '€11,252', delta: '+€522', deltaLabel: 'vs last month', positive: true },
]

export function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all')

  const filtered = USERS.filter((u) => {
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch =
      search === '' ||
      u.guardianName.toLowerCase().includes(q) ||
      u.guardianEmail.toLowerCase().includes(q) ||
      u.childName.toLowerCase().includes(q) ||
      u.studentId.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-sp-text-muted">
            Manage registered family accounts, subscriptions, and verification status.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="whitespace-nowrap rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
          >
            ⬇ Export CSV
          </button>
          <button
            type="button"
            className="whitespace-nowrap rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
          >
            + Add Admin
          </button>
        </div>
      </section>

      {/* KPI STRIP */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
        {KPI_STATS.map((kpi, i) => (
          <article
            key={i}
            className="rounded-xl border border-sp-border-soft bg-white p-4 md:p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
              {kpi.label}
            </p>
            <p className="font-serif mt-2 text-2xl font-semibold text-sp-primary md:text-3xl">
              {kpi.value}
            </p>
            <p
              className={`mt-1 text-xs font-semibold ${
                kpi.positive ? 'text-sp-accent-green' : 'text-sp-coral'
              }`}
            >
              {kpi.delta}{' '}
              <span className="font-normal text-sp-text-muted">{kpi.deltaLabel}</span>
            </p>
          </article>
        ))}
      </section>

      {/* FILTER BAR */}
      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-sp-border-soft bg-white p-3 md:p-4">
        <div className="relative min-w-[240px] flex-1">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-sp-text-muted"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or Student ID..."
            className="w-full rounded-lg border border-sp-border-input bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-sp-primary"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {([
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'pending', label: 'Pending' },
            { id: 'suspended', label: 'Suspended' },
          ] as const).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setStatusFilter(opt.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === opt.id
                  ? 'bg-sp-primary text-white'
                  : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* USERS TABLE */}
      <section className="overflow-hidden rounded-xl border border-sp-border-soft bg-white">
        <div className="flex items-center justify-between border-b border-sp-border-soft px-4 py-3 md:px-6">
          <p className="text-sm text-sp-text-muted">
            Showing <strong className="text-sp-primary">{filtered.length}</strong> of{' '}
            {USERS.length} accounts
          </p>
          <button
            type="button"
            className="text-xs font-semibold text-sp-coral hover:underline"
          >
            ⚙️ Customize columns
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="bg-sp-bg-card-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  GUARDIAN
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  CHILD · STUDENT ID
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  REGION
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  PLAN
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  LAST ACTIVE
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  STATUS
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sp-border-soft">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-sp-bg-card-muted/30"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sp-primary">{user.guardianName}</p>
                    <p className="text-xs text-sp-text-muted">{user.guardianEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-sp-primary">{user.childName}</p>
                    <p className="font-mono text-xs text-sp-text-muted">{user.studentId}</p>
                  </td>
                  <td className="px-4 py-3 text-sp-text-primary">{user.region}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        user.plan === 'family'
                          ? 'bg-sp-bg-card-muted text-sp-text-primary'
                          : 'bg-sp-coral-bg-soft text-sp-coral'
                      }`}
                    >
                      {user.plan === 'family' ? 'FAMILY €29' : 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-sp-text-muted">{user.lastActive}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        user.status === 'active'
                          ? 'bg-sp-accent-green-bg text-sp-accent-green'
                          : user.status === 'pending'
                            ? 'bg-sp-coral-bg-soft text-sp-coral'
                            : 'bg-red-100 text-sp-danger'
                      }`}
                    >
                      {user.status === 'active'
                        ? '✓ ACTIVE'
                        : user.status === 'pending'
                          ? '⏳ PENDING'
                          : '✕ SUSPENDED'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-sp-coral hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-sp-border-soft md:hidden">
          {filtered.map((user) => (
            <div key={user.id} className="p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sp-primary">{user.guardianName}</p>
                  <p className="text-xs text-sp-text-muted">{user.guardianEmail}</p>
                </div>
                <span
                  className={`inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    user.status === 'active'
                      ? 'bg-sp-accent-green-bg text-sp-accent-green'
                      : user.status === 'pending'
                        ? 'bg-sp-coral-bg-soft text-sp-coral'
                        : 'bg-red-100 text-sp-danger'
                  }`}
                >
                  {user.status === 'active'
                    ? '✓ ACTIVE'
                    : user.status === 'pending'
                      ? '⏳ PENDING'
                      : '✕ SUSPENDED'}
                </span>
              </div>
              <p className="mt-1 text-xs text-sp-text-primary">
                <strong>{user.childName}</strong>{' '}
                <span className="font-mono text-sp-text-muted">· {user.studentId}</span>
              </p>
              <p className="mt-1 text-xs text-sp-text-muted">
                {user.region} · Last active {user.lastActive}
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-sp-border-soft pt-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    user.plan === 'family'
                      ? 'bg-sp-bg-card-muted text-sp-text-primary'
                      : 'bg-sp-coral-bg-soft text-sp-coral'
                  }`}
                >
                  {user.plan === 'family' ? 'FAMILY €29' : 'PENDING'}
                </span>
                <button
                  type="button"
                  className="text-xs font-semibold text-sp-coral hover:underline"
                >
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-sp-text-muted">
            No users match the current filters.
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-sp-border-soft px-4 py-3 text-xs md:px-6">
          <span className="text-sp-text-muted">Page 1 of 14</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md border border-sp-border-input bg-white px-3 py-1.5 font-semibold text-sp-text-muted opacity-50"
            >
              ← Previous
            </button>
            <button
              type="button"
              className="rounded-md border border-sp-border-input bg-white px-3 py-1.5 font-semibold text-sp-primary hover:bg-sp-bg-card-muted"
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}