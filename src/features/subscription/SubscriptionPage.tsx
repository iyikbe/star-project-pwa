/* ─── Mock data ─── */

type BillingRow = {
  date: string
  boldLabel: string
  detail: string
  method: string
  amount: string
  status: 'PAID'
}

const BILLING_ROWS: BillingRow[] = [
  { date: 'Mar 5, 2026', boldLabel: 'Family Plan', detail: 'March subscription', method: 'Flipflop · auto', amount: '€29.00', status: 'PAID' },
  { date: 'Mar 12, 2026', boldLabel: 'Late fee', detail: '"Cookie Chemist" missed deadline', method: 'Flipflop · auto', amount: '€0.50', status: 'PAID' },
  { date: 'Mar 22, 2026', boldLabel: 'Late fee', detail: '"Brötchen Baker" Round 2 missed', method: 'Flipflop · auto', amount: '€0.50', status: 'PAID' },
  { date: 'Feb 5, 2026', boldLabel: 'Family Plan', detail: 'February subscription', method: 'Flipflop · auto', amount: '€29.00', status: 'PAID' },
  { date: 'Jan 5, 2026', boldLabel: 'Family Plan', detail: 'January (first month)', method: 'Flipflop · manual', amount: '€29.00', status: 'PAID' },
]

/* ─── Shared UI helpers ─── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8275]">
      {children}
    </p>
  )
}

function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold tracking-tight text-[#1F3D2E]">
      {children}
    </h2>
  )
}

/* ─── Page header ─── */

function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-[28px] font-bold tracking-tight text-[#1F3D2E] md:text-[36px]">
        Subscription &amp; Payment
      </h1>
      <p className="mt-1 text-sm text-[#8A8275]">
        Manage your plan, payment method, and view billing history.
      </p>
    </div>
  )
}

/* ─── Card A — Your Plan ─── */

function YourPlanCard() {
  const benefits = [
    'Unlimited regular projects (Tiny–Senior)',
    '1 child per account · GDPR-compliant',
    '9 career categories',
    'AI report review + admin review',
    'Achievement certificates included',
  ]

  return (
    <div className="relative rounded-xl border bg-white" style={{ borderColor: '#EFE7D9' }}>
      {/* overlapping pill */}
      <span
        className="absolute -top-3 left-6 inline-block rounded-full px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
        style={{ background: '#2E6B4A' }}
      >
        YOUR PLAN
      </span>

      <div className="p-6 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>FAMILY PLAN</Eyebrow>
            <p
              className="mt-2 inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold"
              style={{ background: '#E6F0E8', color: '#2E6B4A' }}
            >
              <span aria-hidden="true">● </span>ACTIVE
            </p>
          </div>
        </div>

        <p className="mt-4 text-[32px] font-bold leading-none tracking-tight text-[#1F3D2E] md:text-[44px]">
          Star Project Family
        </p>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-[40px] font-bold leading-none tracking-tight text-[#1F3D2E] md:text-[44px]">
            €29
          </span>
          <span className="text-sm text-[#8A8275]">/month</span>
        </div>

        <p className="mt-2 text-sm text-[#8A8275]">Renews April 5, 2026 via Flipflop</p>

        <ul className="mt-5 space-y-2.5">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-[#3A3A36]">
              <span className="mt-0.5 shrink-0 text-sm leading-none" style={{ color: '#2E6B4A' }}>
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="rounded-full border px-5 py-2 text-sm font-medium transition-colors hover:bg-[#F4EFE7]"
            style={{ borderColor: '#EFE7D9', color: '#3A3A36' }}
          >
            Change Plan
          </button>
          <button
            type="button"
            className="text-sm font-medium transition-colors hover:text-[#1F3D2E]"
            style={{ color: '#8A8275' }}
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Card B — This Month / Late Fee Status ─── */

function ThisMonthCard() {
  return (
    <div className="rounded-xl border bg-white p-6" style={{ borderColor: '#EFE7D9' }}>
      <Eyebrow>THIS MONTH</Eyebrow>
      <p className="mt-2 text-xl font-bold tracking-tight text-[#1F3D2E]">
        Late Fee Status
      </p>

      <p className="mt-4 text-[40px] font-bold leading-none tracking-tight text-[#1F3D2E] md:text-[44px]">
        €1.00
      </p>
      <p className="mt-1 text-sm text-[#8A8275]">€0.50 × 2 missed deadlines</p>

      {/* progress bar */}
      <div className="mt-5">
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ background: '#F4EFE7' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: '50%',
              background: 'linear-gradient(90deg, #C9A063, #D9B878)',
            }}
            role="progressbar"
            aria-valuenow={50}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs text-[#8A8275]">
          <span>€0</span>
          <span>Cap: €2 / month</span>
        </div>
      </div>

      {/* info box */}
      <div
        className="mt-5 flex items-start gap-2 rounded-lg px-3.5 py-3 text-xs leading-relaxed"
        style={{ background: '#F4EFE7', color: '#8A8275' }}
      >
        <span className="mt-0.5 shrink-0 text-sm">ℹ️</span>
        <span>
          Late fees apply when a project&apos;s final deadline is missed. Capped at €2/month per
          account.
        </span>
      </div>
    </div>
  )
}

/* ─── Card C — Payment Method ─── */

function PaymentMethodCard() {
  return (
    <div className="rounded-xl border bg-white" style={{ borderColor: '#EFE7D9' }}>
      <div className="p-6 pb-0">
        <Eyebrow>PAYMENT METHOD</Eyebrow>
        <p className="mt-2 text-xl font-bold tracking-tight text-[#1F3D2E]">Flipflop</p>
      </div>

      {/* dark inset panel */}
      <div className="mx-6 mt-5 rounded-xl p-5" style={{ background: '#1F3D2E' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Flipflop</span>
          <span className="text-[11px] font-medium tracking-wide text-white/60">VERIFIED</span>
        </div>
        <p className="mt-3 font-mono text-sm text-white/80">flip · anna.mueller</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <span className="text-white/60">Connected · Mar 1</span>
          <span className="text-white/80">Auto-pay ON</span>
        </div>
      </div>

      <div className="p-6 pt-4">
        <button
          type="button"
          className="w-full rounded-full border py-2.5 text-sm font-medium transition-colors hover:bg-[#F4EFE7]"
          style={{ borderColor: '#EFE7D9', color: '#3A3A36' }}
        >
          Manage Payment Method
        </button>
      </div>
    </div>
  )
}

/* ─── Top row (3 cards) ─── */

function TopCardsRow() {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr_1fr] xl:gap-6">
      <YourPlanCard />
      <ThisMonthCard />
      <PaymentMethodCard />
    </div>
  )
}

/* ─── Billing History ─── */

function BillingHistoryTable() {
  return (
    <div className="hidden md:block">
      <table className="w-full" style={{ color: '#3A3A36' }}>
        <thead>
          <tr
            className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8275]"
            style={{ borderBottom: '1px solid #EFE7D9' }}
          >
            <th scope="col" className="pb-3 pr-4 text-left font-medium">DATE</th>
            <th scope="col" className="pb-3 pr-4 text-left font-medium">DESCRIPTION</th>
            <th scope="col" className="pb-3 pr-4 text-left font-medium">METHOD</th>
            <th scope="col" className="pb-3 pr-4 text-right font-medium">AMOUNT</th>
            <th scope="col" className="pb-3 pr-4 text-center font-medium">STATUS</th>
            <th scope="col" className="pb-3 text-left font-medium" />
          </tr>
        </thead>
        <tbody>
          {BILLING_ROWS.map((row, i) => (
            <tr
              key={`${row.date}-${i}`}
              style={{ borderBottom: '1px solid #EFE7D9' }}
            >
              <td className="py-[18px] pr-4 text-sm text-[#8A8275] align-top">{row.date}</td>
              <td className="py-[18px] pr-4 text-sm align-top">
                <span className="font-semibold text-[#3A3A36]">{row.boldLabel}</span>
                <span className="text-[#8A8275]"> · {row.detail}</span>
              </td>
              <td className="py-[18px] pr-4 text-sm text-[#8A8275] align-top">{row.method}</td>
              <td className="py-[18px] pr-4 text-sm text-right font-medium text-[#3A3A36] align-top">
                {row.amount}
              </td>
              <td className="py-[18px] pr-4 text-center align-top">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ background: '#E6F0E8', color: '#2E6B4A' }}
                >
                  ✓ PAID
                </span>
              </td>
              <td className="py-[18px] text-sm align-top">
                <button
                  type="button"
                  className="text-sm underline underline-offset-2 transition-colors hover:text-[#1F3D2E]"
                  style={{ color: '#2E6B4A' }}
                >
                  Receipt →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BillingHistoryCards() {
  return (
    <div className="space-y-3 md:hidden">
      {BILLING_ROWS.map((row, i) => (
        <div
          key={`${row.date}-${i}`}
          className="rounded-xl border bg-white p-4"
          style={{ borderColor: '#EFE7D9' }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-[#3A3A36]">{row.boldLabel}</p>
              <p className="text-xs text-[#8A8275]">{row.detail}</p>
            </div>
            <span className="shrink-0 text-xs text-[#8A8275]">{row.date}</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[#8A8275]">
              <span>{row.method}</span>
              <span className="font-medium text-[#3A3A36]">{row.amount}</span>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
              style={{ background: '#E6F0E8', color: '#2E6B4A' }}
            >
              ✓ PAID
            </span>
          </div>
          <div className="mt-2.5 pt-2.5" style={{ borderTop: '1px solid #EFE7D9' }}>
            <button
              type="button"
              className="text-xs font-medium underline underline-offset-2"
              style={{ color: '#2E6B4A' }}
            >
              Receipt →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function BillingHistorySection() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <SectionH2>Billing History</SectionH2>
        <button
          type="button"
          className="text-sm font-medium transition-colors hover:text-[#1F3D2E]"
          style={{ color: '#8A8275' }}
        >
          ↓ Download All
        </button>
      </div>

      <BillingHistoryTable />
      <BillingHistoryCards />
    </section>
  )
}

/* ─── Mythical Projects · One-Time Purchases ─── */

function MythicalSection() {
  return (
    <section className="mt-8">
      <SectionH2>Mythical Projects · One-Time Purchases</SectionH2>

      <div
        className="mt-4 flex flex-col items-start gap-4 rounded-xl border bg-white p-6 sm:flex-row sm:items-center sm:gap-5"
        style={{ borderColor: '#EFE7D9' }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl"
          style={{ background: '#F4EFE7' }}
        >
          ✨
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#3A3A36]">No Mythical projects yet</p>
          <p className="mt-0.5 text-sm text-[#8A8275]">
            Browse expert-led premium content from €100 / project.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#D26B4A' }}
        >
          Browse Mythical →
        </button>
      </div>
    </section>
  )
}

/* ─── Main export ─── */

export function SubscriptionPage() {
  return (
    <div>
      <PageHeader />
      <TopCardsRow />
      <div className="mt-8">
        <BillingHistorySection />
      </div>
      <MythicalSection />
    </div>
  )
}