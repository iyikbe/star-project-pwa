import { useState } from 'react'
import { SectionEyebrow } from '../../components/ui'

type PaymentType = 'subscription' | 'mythical' | 'late_fee'
type PaymentStatus = 'pending' | 'needs_review' | 'flagged'

type AdminPayment = {
  id: string
  date: string
  guardianName: string
  guardianEmail: string
  studentId: string
  description: string
  type: PaymentType
  amount: number
  provider: string
  status: PaymentStatus
  submittedAgo: string
  emailVerified: boolean
  paymentMethodVerified: boolean
  amountMatches: boolean
  flagReason?: string
}

const PAYMENTS: AdminPayment[] = [
  {
    id: 'pay-001',
    date: 'May 12, 2026',
    guardianName: 'Anna Müller',
    guardianEmail: 'anna.mueller@example.de',
    studentId: 'SP-2026-0048',
    description: 'Star Project Family · Monthly renewal',
    type: 'subscription',
    amount: 29.0,
    provider: 'Flipflop',
    status: 'pending',
    submittedAgo: '2h ago',
    emailVerified: true,
    paymentMethodVerified: true,
    amountMatches: true,
  },
  {
    id: 'pay-002',
    date: 'May 12, 2026',
    guardianName: 'Thomas König',
    guardianEmail: 'thomas.koenig@example.de',
    studentId: 'SP-2026-0117',
    description: 'Mythical: Compose & Record Original Song',
    type: 'mythical',
    amount: 150.0,
    provider: 'Flipflop',
    status: 'pending',
    submittedAgo: '4h ago',
    emailVerified: true,
    paymentMethodVerified: true,
    amountMatches: true,
  },
  {
    id: 'pay-003',
    date: 'May 11, 2026',
    guardianName: 'Petra Krause',
    guardianEmail: 'petra.k@example.de',
    studentId: 'SP-2026-0052',
    description: 'Late submission · Cookie Chemist',
    type: 'late_fee',
    amount: 0.5,
    provider: 'Flipflop',
    status: 'pending',
    submittedAgo: 'Yesterday',
    emailVerified: true,
    paymentMethodVerified: true,
    amountMatches: true,
  },
  {
    id: 'pay-004',
    date: 'May 11, 2026',
    guardianName: 'Maria Schmidt',
    guardianEmail: 'm.schmidt@example.de',
    studentId: 'SP-2026-0203',
    description: 'Star Project Family · First payment',
    type: 'subscription',
    amount: 29.0,
    provider: 'Manual transfer',
    status: 'needs_review',
    submittedAgo: 'Yesterday',
    emailVerified: true,
    paymentMethodVerified: false,
    amountMatches: true,
    flagReason: 'Manual transfer · payment proof needs verification',
  },
  {
    id: 'pay-005',
    date: 'May 10, 2026',
    guardianName: 'Klaus Weber',
    guardianEmail: 'klaus.weber@example.de',
    studentId: 'SP-2026-0274',
    description: 'Mythical: Sustainable Fashion Capsule',
    type: 'mythical',
    amount: 100.0,
    provider: 'Flipflop',
    status: 'flagged',
    submittedAgo: '2 days ago',
    emailVerified: true,
    paymentMethodVerified: true,
    amountMatches: false,
    flagReason: 'Amount mismatch · expected €100, received €120',
  },
]

const KPI_STATS = [
  {
    label: 'PENDING APPROVAL',
    value: '5',
    delta: '€308.50',
    deltaLabel: 'in queue',
    positive: false,
    accent: 'coral' as const,
  },
  {
    label: 'RECEIVED TODAY',
    value: '€529.00',
    delta: '+18',
    deltaLabel: 'transactions',
    positive: true,
    accent: 'sage' as const,
  },
  {
    label: 'THIS WEEK',
    value: '€3,247.50',
    delta: '+8.2%',
    deltaLabel: 'vs last week',
    positive: true,
    accent: 'sage' as const,
  },
  {
    label: 'LATE FEES COLLECTED',
    value: '€124.00',
    delta: '47',
    deltaLabel: 'instances',
    positive: false,
    accent: 'gold' as const,
  },
]

function getTypeMeta(type: PaymentType): { label: string; pillClass: string; icon: string } {
  switch (type) {
    case 'subscription':
      return { label: 'SUBSCRIPTION', pillClass: 'bg-sp-bg-card-muted text-sp-text-primary', icon: '💳' }
    case 'mythical':
      return { label: 'MYTHICAL', pillClass: 'bg-sp-gold-bg-soft text-sp-gold', icon: '✨' }
    case 'late_fee':
      return { label: 'LATE FEE', pillClass: 'bg-sp-coral-bg-soft text-sp-coral', icon: '⏰' }
  }
}

function getStatusMeta(status: PaymentStatus): { label: string; pillClass: string } {
  switch (status) {
    case 'pending':
      return { label: '⏳ PENDING', pillClass: 'bg-sp-coral-bg-soft text-sp-coral' }
    case 'needs_review':
      return { label: '👁️ NEEDS REVIEW', pillClass: 'bg-sp-gold-bg-soft text-sp-gold' }
    case 'flagged':
      return { label: '🚩 FLAGGED', pillClass: 'bg-red-100 text-sp-danger' }
  }
}

export function AdminPaymentsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | PaymentType>('all')
  const [selectedId, setSelectedId] = useState<string>('pay-001')
  const [adminNote, setAdminNote] = useState('')

  const filtered = PAYMENTS.filter((p) => {
    const matchType = typeFilter === 'all' || p.type === typeFilter
    const q = search.toLowerCase()
    const matchSearch =
      search === '' ||
      p.guardianName.toLowerCase().includes(q) ||
      p.guardianEmail.toLowerCase().includes(q) ||
      p.studentId.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    return matchType && matchSearch
  })

  const selectedPayment = PAYMENTS.find((p) => p.id === selectedId) ?? PAYMENTS[0]

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION 1 — Header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            Payment Approvals
          </h1>
          <p className="mt-1 text-sm text-sp-text-muted">
            Review and approve incoming payments. Flagged transactions require manual verification.
          </p>
        </div>
        <button
          type="button"
          className="whitespace-nowrap rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
        >
          ⬇ Export CSV
        </button>
      </section>

      {/* SECTION 2 — KPI Strip */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
        {KPI_STATS.map((kpi, i) => (
          <article
            key={i}
            className="relative overflow-hidden rounded-xl border border-sp-border-soft bg-white p-4 md:p-5"
          >
            {kpi.accent === 'coral' && (
              <div className="absolute left-0 right-0 top-0 h-1 bg-sp-coral" aria-hidden="true" />
            )}
            {kpi.accent === 'sage' && (
              <div className="absolute left-0 right-0 top-0 h-1 bg-sp-accent-green" aria-hidden="true" />
            )}
            {kpi.accent === 'gold' && (
              <div className="absolute left-0 right-0 top-0 h-1 bg-sp-gold" aria-hidden="true" />
            )}

            <p className="text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
              {kpi.label}
            </p>
            <p className="font-serif mt-2 text-2xl font-semibold text-sp-primary md:text-3xl">
              {kpi.value}
            </p>
            <p
              className={`mt-1 text-xs font-semibold ${
                kpi.positive ? 'text-sp-accent-green' : 'text-sp-text-muted'
              }`}
            >
              <strong>{kpi.delta}</strong>{' '}
              <span className="font-normal text-sp-text-muted">{kpi.deltaLabel}</span>
            </p>
          </article>
        ))}
      </section>

      {/* SECTION 3 — Filter Bar */}
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
            placeholder="Search by guardian, email, Student ID, or transaction..."
            className="w-full rounded-lg border border-sp-border-input bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-sp-primary"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {([
            { id: 'all', label: 'All Types' },
            { id: 'subscription', label: '💳 Subscription' },
            { id: 'mythical', label: '✨ Mythical' },
            { id: 'late_fee', label: '⏰ Late Fee' },
          ] as const).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTypeFilter(opt.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                typeFilter === opt.id
                  ? 'bg-sp-primary text-white'
                  : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 4 — 2-Column Body */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT — Transactions */}
        <div className="overflow-hidden rounded-xl border border-sp-border-soft bg-white">
          <div className="flex items-center justify-between border-b border-sp-border-soft px-4 py-3 md:px-5">
            <p className="text-sm text-sp-text-muted">
              <strong className="text-sp-primary">{filtered.length}</strong> pending{' '}
              {filtered.length === 1 ? 'transaction' : 'transactions'}
            </p>
            <span className="text-xs text-sp-text-muted">
              Sorted by: <strong className="text-sp-primary">Newest first</strong>
            </span>
          </div>

          {/* Desktop clickable list */}
          <div className="hidden md:block">
            {filtered.map((payment) => {
              const isSelected = payment.id === selectedId
              const typeMeta = getTypeMeta(payment.type)
              const statusMeta = getStatusMeta(payment.status)

              return (
                <button
                  key={payment.id}
                  type="button"
                  onClick={() => setSelectedId(payment.id)}
                  className={`w-full border-b border-sp-border-soft px-4 py-3 text-left transition-colors hover:bg-sp-bg-card-muted/30 md:px-5 ${
                    isSelected
                      ? 'border-l-4 border-l-sp-accent-green bg-sp-accent-green-bg/40'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-sp-primary">
                          {payment.guardianName}
                        </p>
                        <span
                          className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${typeMeta.pillClass}`}
                        >
                          {typeMeta.label}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-sp-text-muted">
                        {payment.description}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-sp-text-muted">
                        {payment.studentId} · {payment.submittedAgo} · {payment.provider}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-serif text-lg font-semibold text-sp-primary">
                        €{payment.amount.toFixed(2)}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${statusMeta.pillClass}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-sp-border-soft md:hidden">
            {filtered.map((payment) => {
              const typeMeta = getTypeMeta(payment.type)
              const statusMeta = getStatusMeta(payment.status)
              return (
                <button
                  key={payment.id}
                  type="button"
                  onClick={() => setSelectedId(payment.id)}
                  className="w-full p-4 text-left active:bg-sp-bg-card-muted"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-sp-primary">
                        {payment.guardianName}
                      </p>
                      <p className="mt-1 text-xs text-sp-text-muted">{payment.description}</p>
                      <p className="mt-1 text-[10px] text-sp-text-muted">
                        {payment.studentId} · {payment.submittedAgo}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-serif text-lg font-semibold text-sp-primary">
                        €{payment.amount.toFixed(2)}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${statusMeta.pillClass}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${typeMeta.pillClass}`}
                    >
                      {typeMeta.label}
                    </span>
                    <span className="text-xs font-semibold text-sp-coral">View detail →</span>
                  </div>
                </button>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-sp-text-muted">
              No payments match the current filters.
            </div>
          )}
        </div>

        {/* RIGHT — Detail Panel */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          {/* Transaction Detail */}
          <div className="rounded-xl border border-sp-border-soft bg-white p-5">
            <SectionEyebrow color="muted">TRANSACTION DETAIL</SectionEyebrow>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <p className="font-serif text-4xl font-semibold text-sp-primary">
              €{selectedPayment.amount.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-sp-text-muted">{selectedPayment.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${getTypeMeta(selectedPayment.type).pillClass}`}
              >
                {getTypeMeta(selectedPayment.type).icon}{' '}
                {getTypeMeta(selectedPayment.type).label}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${getStatusMeta(selectedPayment.status).pillClass}`}
              >
                {getStatusMeta(selectedPayment.status).label}
              </span>
            </div>

            <div className="mt-4 space-y-2 border-t border-sp-border-soft pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Guardian</span>
                <span className="font-semibold text-sp-primary">{selectedPayment.guardianName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Email</span>
                <span className="ml-2 truncate text-sp-primary">{selectedPayment.guardianEmail}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Student ID</span>
                <span className="font-mono text-sp-primary">{selectedPayment.studentId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Provider</span>
                <span className="text-sp-primary">{selectedPayment.provider}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Submitted</span>
                <span className="text-sp-primary">{selectedPayment.submittedAgo}</span>
              </div>
            </div>
          </div>

          {/* Automated Checks */}
          <div className="rounded-xl border border-sp-border-soft bg-white p-5">
            <SectionEyebrow color="muted">AUTOMATED CHECKS</SectionEyebrow>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <ul className="space-y-2">
              {[
                { label: 'Email domain verified', passed: selectedPayment.emailVerified },
                { label: 'Payment method verified', passed: selectedPayment.paymentMethodVerified },
                { label: 'Amount matches order', passed: selectedPayment.amountMatches },
              ].map((check, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <div
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                      check.passed ? 'bg-sp-accent-green text-white' : 'bg-sp-coral text-white'
                    }`}
                  >
                    <span className="text-[10px] font-bold" aria-hidden="true">
                      {check.passed ? '✓' : '!'}
                    </span>
                  </div>
                  <span className={check.passed ? 'text-sp-text-primary' : 'font-medium text-sp-coral'}>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>

            {selectedPayment.flagReason && (
              <div className="mt-3 rounded-lg border border-sp-coral/30 bg-sp-coral-bg-soft/40 p-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sp-coral">
                  ⚠ FLAG REASON
                </p>
                <p className="text-xs leading-relaxed text-sp-text-primary">
                  {selectedPayment.flagReason}
                </p>
              </div>
            )}
          </div>

          {/* Decision */}
          <div className="rounded-xl border border-sp-border-soft bg-white p-5">
            <SectionEyebrow color="muted">DECISION</SectionEyebrow>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <label htmlFor="adminNote" className="mb-1 block text-xs font-semibold text-sp-text-primary">
              Admin note{' '}
              <span className="font-normal text-sp-text-muted">(optional)</span>
            </label>
            <textarea
              id="adminNote"
              rows={3}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Add internal notes for audit log..."
              className="w-full resize-none rounded-lg border border-sp-border-input bg-white px-3 py-2 text-sm outline-none focus:border-sp-primary"
            />

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => console.log('Approve', selectedPayment.id, adminNote)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-sp-accent-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-accent-green/90"
              >
                ✓ Approve Payment
              </button>
              <button
                type="button"
                onClick={() => console.log('Request info', selectedPayment.id, adminNote)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                ⓘ Request More Info
              </button>
              <button
                type="button"
                onClick={() => console.log('Reject', selectedPayment.id, adminNote)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-sp-danger/40 bg-white px-4 py-2.5 text-sm font-semibold text-sp-danger transition-colors hover:bg-red-50"
              >
                ✕ Reject Payment
              </button>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-sp-text-muted">
              All actions are logged in audit trail with admin identity and timestamp.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}