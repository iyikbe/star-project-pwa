import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CURRENT_USER, TEAMMATE_SOPHIE } from '../../data/mock/users'

const BREZEL_WEEKLY_TASKS = [
  {
    number: 1,
    title: 'Research & Validation',
    week: 'Week 1',
    estimatedHours: '3–4 hours',
    description:
      'Interview 5 people about their favorite pretzel. Research the history of Brezel in Hessen. Compare 3 local bakeries\' prices. Document allergies and dietary restrictions among testers.',
  },
  {
    number: 2,
    title: 'Build & Create',
    week: 'Week 2',
    estimatedHours: '4–5 hours',
    description:
      'Make your first batch of Brezel based on Week 1 findings. Document each step with photos. Note variations from the standard recipe.',
  },
  {
    number: 3,
    title: 'Test & Validate',
    week: 'Week 3',
    estimatedHours: '2–3 hours',
    description:
      'Give samples to 5 testers. Collect structured feedback on taste, texture, salt level, and appearance using the provided template.',
  },
  {
    number: 4,
    title: 'Improve & Finalize',
    week: 'Week 4',
    estimatedHours: '4 hours',
    description:
      'Make a second batch with improvements. Prepare your final report and a 3-minute video proof. Submit for review.',
    isFinal: true,
  },
]

export function ProjectWorkspacePage() {
  useParams<{ projectId: string }>()
  const [inviteStudentId, setInviteStudentId] = useState('SP-2026-0052')

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Section 1 — Project Hero Card */}
        <section
          className="relative overflow-hidden rounded-2xl p-6 md:p-8"
          style={{ background: 'linear-gradient(135deg, #F4D9CC 0%, #D26B4A 100%)' }}
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15" aria-hidden="true" />

          <div className="relative flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-4xl">
                🥨
              </div>
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sp-coral">
                    ⏳ WAITING FOR MEMBER
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase text-white">
                    CHEF
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">
                    ⭐⭐ BABY
                  </span>
                </div>
                <h1 className="font-serif text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl">
                  Brezel Workshop
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              The classic German pretzel — knead the dough, master the lye boil, and bake. A
              research-driven 4-week project on tradition, food chemistry, and craft.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/85 md:text-sm">
              <span className="flex items-center gap-1.5">
                ⏱ <strong className="font-semibold text-white">4 weeks</strong>
              </span>
              <span className="flex items-center gap-1.5">
                ⭐ <strong className="font-semibold text-white">1 Star</strong> reward
              </span>
              <span className="flex items-center gap-1.5">
                👥 <strong className="font-semibold text-white">Min 2 members</strong>
              </span>
              <span className="flex items-center gap-1.5">🔥 Adult supervision</span>
              <span className="flex items-center gap-1.5">🚫 No open fire</span>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                disabled
                className="inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-lg bg-white/30 px-6 py-3 text-sm font-semibold text-white/70"
              >
                ▶ Start Project
              </button>
              <p className="text-xs text-white/80 md:text-sm">
                Need <strong className="text-white">1 more member</strong> to start
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — Project Introduction */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
            Project Introduction
          </h2>

          <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-sp-primary to-sp-primary-hover" />

            <div className="relative text-center">
              <button
                type="button"
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                aria-label="Play introduction video"
              >
                ▶
              </button>
              <p className="mt-4 text-sm font-semibold text-white md:text-base">
                How to Make a Real Brezel — 4-week project intro
              </p>
              <p className="mt-1 text-xs text-white/70">
                12:34 · Chef Anna walks you through the project
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Weekly Tasks */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
            Weekly Tasks
          </h2>
          <p className="mt-1 text-xs text-sp-text-muted">4 weeks · Available after project starts</p>

          <div className="mt-5 flex flex-col gap-3">
            {BREZEL_WEEKLY_TASKS.map((task, i) => (
              <article
                key={task.number}
                className="flex gap-4 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-sp-border-input bg-white font-serif font-semibold text-sp-primary">
                  {task.number}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-base font-semibold text-sp-primary">
                      {task.title}
                    </h3>
                    <span className="text-xs text-sp-text-muted">
                      {task.week} · Estimated {task.estimatedHours}
                      {task.isFinal && ' · Final deadline ⏰'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-sp-text-primary">
                    {task.description}
                  </p>
                  {i === 0 && (
                    <span className="mt-2 inline-flex items-center rounded-full bg-sp-coral-bg-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sp-coral">
                      UPCOMING
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4 — Report Template */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
            Report Template
          </h2>
          <p className="mt-1 text-xs text-sp-text-muted">
            Download and complete during the project. Required for final submission.
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-sp-border-soft bg-white text-2xl">
                📄
              </div>
              <div>
                <p className="text-sm font-semibold text-sp-primary">
                  Brezel Project Report Template
                </p>
                <p className="mt-0.5 text-xs text-sp-text-muted">
                  .docx · 245 KB · 4 sections matching weekly tasks
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
            >
              ⬇ Download
            </button>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN — Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Team Members */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-sp-primary">Team Members</h3>
            <span className="text-xs font-semibold text-sp-text-muted">1 / 2 minimum</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sp-coral text-xs font-bold text-white">
              {CURRENT_USER.childInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-sp-primary">
                {CURRENT_USER.childName}{' '}
                <span className="text-xs font-normal text-sp-text-muted">(You)</span>
              </p>
              <p className="mt-0.5 text-xs text-sp-text-muted">
                {CURRENT_USER.studentId} · Owner
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-sp-accent-green-bg px-2 py-0.5 text-[10px] font-bold uppercase text-sp-accent-green">
              JOINED
            </span>
          </div>
        </section>

        {/* Invite a Team Member */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <h3 className="font-serif text-base font-semibold text-sp-primary">
            Invite a Team Member
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-sp-text-muted">
            Only registered users can be invited. Use their Student ID — no email or phone.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="student-id"
              className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted"
            >
              STUDENT ID
            </label>
            <input
              id="student-id"
              type="text"
              value={inviteStudentId}
              onChange={(e) => setInviteStudentId(e.target.value)}
              placeholder="SP-2026-XXXX"
              className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 font-mono text-sm outline-none focus:border-sp-primary"
            />
            <button
              type="button"
              onClick={() => console.log('Send invitation to', inviteStudentId)}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
            >
              📩 Send Invitation
            </button>
          </div>
        </section>

        {/* Pending Invitations */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <h3 className="font-serif text-base font-semibold text-sp-primary">
            Pending Invitations
          </h3>

          <div className="mt-4 flex items-center gap-3 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-category-farm text-xs font-bold text-white">
              {TEAMMATE_SOPHIE.childInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-sp-primary">
                {TEAMMATE_SOPHIE.childName}
              </p>
              <p className="mt-0.5 text-xs text-sp-text-muted">
                {TEAMMATE_SOPHIE.studentId} · Sent 2h ago
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-sp-coral-bg-soft px-2 py-0.5 text-[10px] font-bold uppercase text-sp-coral">
              PENDING
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-sp-text-muted">
            Invitations expire after 7 days. Project cannot start until at least 2 members have
            joined.
          </p>
        </section>
      </div>
    </div>
  )
}