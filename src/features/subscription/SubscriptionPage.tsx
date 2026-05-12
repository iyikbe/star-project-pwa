import { Link } from 'react-router-dom'

const LATE_FEE = {
  currentMonthAmount: 1.0,
  monthCap: 2.0,
  feePerMissed: 0.5,
  missedDeadlinesThisMonth: 2,
}

const BILLING_HISTORY = [
  {
    id: 'b1',
    date: 'May 12, 2026',
    description: 'Star Project Family · Monthly',
    type: 'subscription' as const,
    amount: 29.0,
    status: 'paid' as const,
  },
  {
    id: 'b2',
    date: 'Apr 28, 2026',
    description: 'Late submission · Cookie Chemist',
    type: 'late_fee' as const,
    amount: 0.5,
    status: 'paid' as const,
  },
  {
    id: 'b3',
    date: 'Apr 12, 2026',
    description: 'Late submission · Brötchen Baker',
    type: 'late_fee' as const,
    amount: 0.5,
    status: 'paid' as const,
  },
  {
    id: 'b4',
    date: 'Apr 12, 2026',
    description: 'Star Project Family · Monthly',
    type: 'subscription' as const,
    amount: 29.0,
    status: 'paid' as const,
  },
  {
    id: 'b5',
    date: 'Mar 12, 2026',
    description: 'Star Project Family · Monthly',
    type: 'subscription' as const,
    amount: 29.0,
    status: 'paid' as const,
  },
]

export function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section 1 — Page Header */}
      <section>
        <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
          Subscription &amp; Payment
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-sp-text-muted">
          Manage your family plan, view billing history, and track any late submission fees.
        </p>
      </section>

      {/* Section 2 — Top Metric Strip (3 cards) */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* CARD 1: Your Plan */}
        <article className="relative overflow-hidden rounded-xl border border-sp-accent-green/30 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-1 bg-sp-accent-green" aria-hidden="true" />

          <div className="mb-3 flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
              YOUR PLAN
            </p>
            <span className="inline-flex items-center rounded-full bg-sp-accent-green-bg px-2 py-0.5 text-[10px] font-bold uppercase text-sp-accent-green">
              ✓ ACTIVE
            </span>
          </div>

          <h2 className="font-serif text-xl font-semibold text-sp-primary">
            Star Project Family
          </h2>

          <p className="font-serif mt-3 text-3xl font-semibold text-sp-primary">
            €29 <span className="text-sm font-normal text-sp-text-muted">/ month</span>
          </p>

          <div className="mt-4 space-y-1.5 border-t border-sp-border-soft pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-sp-text-muted">Next billing</span>
              <span className="font-semibold text-sp-text-primary">May 12, 2026</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-sp-text-muted">Started</span>
              <span className="font-semibold text-sp-text-primary">February 12, 2026</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-sp-border-input bg-white px-3 py-2 text-xs font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
          >
            Manage Plan
          </button>
        </article>

        {/* CARD 2: Late Fee Status */}
        <article className="relative overflow-hidden rounded-xl border border-sp-coral/30 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-1 bg-sp-coral" aria-hidden="true" />

          <div className="mb-3 flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
              LATE FEE THIS MONTH
            </p>
            <span className="inline-flex items-center rounded-full bg-sp-coral-bg-soft px-2 py-0.5 text-[10px] font-bold uppercase text-sp-coral">
              ⚠ ACTIVE
            </span>
          </div>

          <p className="font-serif text-3xl font-semibold text-sp-coral">
            €{LATE_FEE.currentMonthAmount.toFixed(2)}
            <span className="ml-1 text-sm font-normal text-sp-text-muted">
              of €{LATE_FEE.monthCap.toFixed(2)} cap
            </span>
          </p>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sp-border-soft">
            <div
              className="h-full rounded-full bg-sp-coral"
              style={{
                width: `${(LATE_FEE.currentMonthAmount / LATE_FEE.monthCap) * 100}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-sp-text-muted">
            {LATE_FEE.missedDeadlinesThisMonth} missed deadlines · €
            {LATE_FEE.feePerMissed.toFixed(2)} each
          </p>

          <div className="mt-4 border-t border-sp-border-soft pt-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">
              ABOUT LATE FEES
            </p>
            <p className="text-[11px] leading-relaxed text-sp-text-muted">
              €0.50 per missed deadline. Cap of €2/month per account.
            </p>
          </div>
        </article>

        {/* CARD 3: Payment Method */}
        <article className="relative overflow-hidden rounded-xl border border-sp-primary bg-sp-primary p-5 text-white">
          <div className="absolute -right-8 -top-8 text-6xl opacity-10" aria-hidden="true">
            💳
          </div>

          <div className="relative">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                PAYMENT METHOD
              </p>
              <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                ✓ VERIFIED
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 text-xl">
                💳
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl font-semibold">Flipflop</p>
                <p className="mt-0.5 text-xs text-white/70">Verified payment provider</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 border-t border-white/15 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Account holder</span>
                <span className="font-semibold">Anna M.</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Region</span>
                <span className="font-semibold">Kassel, DE</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              Update Payment Method
            </button>
          </div>
        </article>
      </section>

      {/* Section 3 — Billing History */}
      <section className="overflow-hidden rounded-xl border border-sp-border-soft bg-white">
        <div className="flex items-center justify-between border-b border-sp-border-soft px-5 py-4 md:px-6">
          <div>
            <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
              Billing History
            </h2>
            <p className="mt-0.5 text-xs text-sp-text-muted">
              Last 90 days · Showing {BILLING_HISTORY.length} entries
            </p>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-sp-coral hover:underline"
          >
            Download CSV
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="bg-sp-bg-card-muted/50">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  DATE
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  DESCRIPTION
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  TYPE
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  AMOUNT
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  STATUS
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
                  RECEIPT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sp-border-soft">
              {BILLING_HISTORY.map((entry) => (
                <tr
                  key={entry.id}
                  className="transition-colors hover:bg-sp-bg-card-muted/30"
                >
                  <td className="px-5 py-4 text-sp-text-primary">{entry.date}</td>
                  <td className="px-5 py-4 font-medium text-sp-primary">
                    {entry.description}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        entry.type === 'late_fee'
                          ? 'bg-sp-coral-bg-soft text-sp-coral'
                          : 'bg-sp-bg-card-muted text-sp-text-muted'
                      }`}
                    >
                      {entry.type === 'late_fee' ? 'LATE FEE' : 'SUBSCRIPTION'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-sp-primary">
                    €{entry.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center rounded-full bg-sp-accent-green-bg px-2 py-0.5 text-[10px] font-bold uppercase text-sp-accent-green">
                      ✓ PAID
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="text-xs font-semibold text-sp-coral hover:underline"
                    >
                      ⬇ PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-sp-border-soft md:hidden">
          {BILLING_HISTORY.map((entry) => (
            <div key={entry.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sp-primary">
                    {entry.description}
                  </p>
                  <p className="mt-1 text-xs text-sp-text-muted">{entry.date}</p>
                  <span
                    className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      entry.type === 'late_fee'
                        ? 'bg-sp-coral-bg-soft text-sp-coral'
                        : 'bg-sp-bg-card-muted text-sp-text-muted'
                    }`}
                  >
                    {entry.type === 'late_fee' ? 'LATE FEE' : 'SUBSCRIPTION'}
                  </span>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-serif text-lg font-semibold text-sp-primary">
                    €{entry.amount.toFixed(2)}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-sp-accent-green">
                    ✓ PAID
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-sp-coral hover:underline"
              >
                ⬇ Download receipt
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Mythical Purchases (empty state) */}
      <section className="rounded-xl border border-sp-border-soft bg-white p-6 md:p-8">
        <div className="flex flex-col items-start gap-5 md:flex-row">
          <div className="flex flex-1 items-start gap-4">
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{
                background:
                  'linear-gradient(135deg, #F4D9CC 0%, #D26B4A 50%, #1F3D2E 100%)',
              }}
            >
              <span aria-hidden="true">✨</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
                Mythical Purchases
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-sp-text-muted">
                No premium Mythical projects purchased yet. Mythical projects are expert-led,
                one-time purchases (€50 per star) on top of your monthly plan.
              </p>
            </div>
          </div>

          <Link
            to="/start"
            className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
          >
            ✨ Browse Mythical →
          </Link>
        </div>
      </section>
    </div>
  )
}