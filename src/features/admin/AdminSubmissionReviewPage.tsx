import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionEyebrow } from '../../components/ui'

const SUBMISSION = {
  id: 'sub-001',
  submittedAt: 'May 8, 2026 · 14:32',
  status: 'pending_review' as const,
  projectTitle: 'Pasta from Scratch',
  projectEmoji: '🍝',
  category: 'CHEF',
  level: 'baby' as const,
  duration: '4 weeks',
  starReward: 1,
  team: [
    { initials: 'LM', name: 'Lukas Müller', studentId: 'SP-2026-0048', role: 'Owner', activeWeeks: 4, color: 'coral' as const },
    { initials: 'SK', name: 'Sophie K.', studentId: 'SP-2026-0052', role: 'Member', activeWeeks: 4, color: 'farm' as const },
  ],
  reportFile: {
    name: 'Pasta_Project_Final_Report.docx',
    size: '2.4 MB',
    pages: 8,
  },
  videoFile: {
    name: 'pasta_final_video.mp4',
    duration: '3:42',
    size: '184 MB',
  },
  photos: [
    { id: 'ph1', emoji: '🥚', label: 'Eggs cracking · Week 1' },
    { id: 'ph2', emoji: '🍝', label: 'Final pasta · Week 4' },
    { id: 'ph3', emoji: '🍅', label: 'Sauce prep · Week 3' },
  ],
}

const AI_CHECKS = [
  { icon: '📋', label: 'Required sections complete', passed: true, detail: 'All 4 weekly sections present' },
  { icon: '🔍', label: 'Week 1 research present', passed: true, detail: '6 interviews documented · 3 supermarkets compared' },
  { icon: '🛠', label: 'Week 2 build documented', passed: true, detail: '8 photos uploaded · process described' },
  { icon: '👥', label: 'Week 3 testing evidence', passed: true, detail: '5 testers feedback collected · taste/texture/salt rated' },
  { icon: '⭐', label: 'Week 4 reflection present', passed: true, detail: 'Improvement plan documented · second batch results compared' },
  { icon: '🛡️', label: 'No safety concerns detected', passed: true, detail: 'Content scan passed · no flagged keywords' },
]

export function AdminSubmissionReviewPage() {
  const [reviewerNote, setReviewerNote] = useState('')
  const [issueStars, setIssueStars] = useState(true)
  const [generateCertificate, setGenerateCertificate] = useState(true)
  const [featureOnHome, setFeatureOnHome] = useState(false)
  const [showOverride, setShowOverride] = useState(false)
  const [overrideReason, setOverrideReason] = useState('')

  const handleApprove = () => {
    console.log('Approve submission', {
      id: SUBMISSION.id,
      actions: { issueStars, generateCertificate, featureOnHome },
      note: reviewerNote,
    })
  }

  const handleResubmission = () => {
    console.log('Request resubmission', { id: SUBMISSION.id, note: reviewerNote })
  }

  const handleReject = () => {
    console.log('Reject submission', { id: SUBMISSION.id, note: reviewerNote })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION 1 — Header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Link
              to="/admin/submissions"
              className="text-sm font-semibold text-sp-text-muted hover:text-sp-primary"
            >
              ← Back to Submissions
            </Link>
            <span className="text-sp-text-muted" aria-hidden="true">·</span>
            <span className="font-mono text-sm text-sp-text-muted">{SUBMISSION.id}</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            Submission Review
          </h1>
          <p className="mt-1 text-sm text-sp-text-muted">Submitted {SUBMISSION.submittedAt}</p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-sp-coral-bg-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-sp-coral">
            ⏳ PENDING REVIEW
          </span>
        </div>
      </section>

      {/* SECTION 2 — 2-Column Body */}
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT MAIN */}
        <div className="flex flex-col gap-6">
          {/* AI Pre-Check */}
          <article className="rounded-xl border border-sp-accent-green/30 bg-sp-accent-green-bg/40 p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">🤖</span>
                <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
                  AI Report Pre-Check
                </h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-sp-accent-green px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                ✓ PASSED
              </span>
            </div>

            <p className="mb-5 text-xs leading-relaxed text-sp-text-muted">
              Automated review completed before manual verification. Override AI result only with
              super-admin justification.
            </p>

            <ul className="grid gap-3 md:grid-cols-2">
              {AI_CHECKS.map((check, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-sp-border-soft bg-white p-2.5"
                >
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sp-accent-green">
                    <span className="text-[10px] font-bold text-white" aria-hidden="true">✓</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-sp-primary">
                      <span aria-hidden="true">{check.icon}</span> {check.label}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-sp-text-muted">
                      {check.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Report preview */}
          <article className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
                📄 Report Document
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-sp-coral hover:underline"
              >
                ⬇ Download
              </button>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-sp-border-soft bg-white text-3xl">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sp-primary">
                  {SUBMISSION.reportFile.name}
                </p>
                <p className="mt-0.5 text-xs text-sp-text-muted">
                  {SUBMISSION.reportFile.size} · {SUBMISSION.reportFile.pages} pages · .docx
                </p>
              </div>
              <button
                type="button"
                className="whitespace-nowrap rounded-lg border border-sp-border-input bg-white px-4 py-2 text-xs font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                Preview inline
              </button>
            </div>
          </article>

          {/* Video player */}
          <article className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
                🎥 Video Proof
              </h2>
              <span className="text-xs text-sp-text-muted">
                {SUBMISSION.videoFile.duration} · {SUBMISSION.videoFile.size}
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl bg-sp-primary">
              <div className="absolute inset-0 bg-gradient-to-br from-sp-primary to-sp-primary-hover" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                  aria-label="Play video proof"
                >
                  ▶
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <button type="button" className="text-lg text-white" aria-label="Play">▶</button>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-white/80" style={{ width: '0%' }} />
                  </div>
                  <span className="font-mono text-xs text-white">
                    0:00 / {SUBMISSION.videoFile.duration}
                  </span>
                  <button type="button" className="text-sm text-white" aria-label="Fullscreen">⛶</button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-sp-text-muted">
              Verify both team members visible · project completed end-to-end · audio quality
              acceptable · no safety concerns
            </p>
          </article>

          {/* Photos thumbnails */}
          <article className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
            <h2 className="font-serif mb-4 text-lg font-semibold text-sp-primary md:text-xl">
              📷 Supporting Photos
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {SUBMISSION.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex flex-col items-center justify-center rounded-xl border border-sp-border-soft bg-sp-bg-card-muted p-4 text-center"
                >
                  <span className="text-5xl" aria-hidden="true">{photo.emoji}</span>
                  <p className="mt-2 text-[10px] leading-tight text-sp-text-muted">
                    {photo.label}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          {/* Project context */}
          <div className="rounded-xl border border-sp-border-soft bg-white p-5">
            <SectionEyebrow color="muted">PROJECT</SectionEyebrow>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-category-chef-bg text-3xl">
                {SUBMISSION.projectEmoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-base font-semibold text-sp-primary">
                  {SUBMISSION.projectTitle}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-category-chef-bg px-1.5 py-0.5 text-[9px] font-bold uppercase text-category-chef">
                    {SUBMISSION.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sp-gold-bg-soft px-1.5 py-0.5 text-[9px] font-bold uppercase text-sp-gold">
                    ⭐⭐ BABY
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 border-t border-sp-border-soft pt-3">
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Duration</span>
                <span className="font-semibold text-sp-primary">{SUBMISSION.duration}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sp-text-muted">Reward</span>
                <span className="font-semibold text-sp-gold">⭐ {SUBMISSION.starReward} star</span>
              </div>
            </div>
          </div>

          {/* Team members */}
          <div className="rounded-xl border border-sp-border-soft bg-white p-5">
            <SectionEyebrow color="muted">TEAM MEMBERS</SectionEyebrow>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <div className="space-y-2">
              {SUBMISSION.team.map((member) => (
                <div
                  key={member.studentId}
                  className="flex items-center gap-3 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-2.5"
                >
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      member.color === 'coral' ? 'bg-sp-coral' : 'bg-category-farm'
                    }`}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-sp-primary">{member.name}</p>
                    <p className="font-mono text-[10px] text-sp-text-muted">
                      {member.studentId} · {member.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-sp-accent-green-bg px-1.5 py-0.5 text-[9px] font-bold uppercase text-sp-accent-green">
                    {member.activeWeeks}/4 WEEKS
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DECISION PANEL */}
          <div className="rounded-xl border-2 border-sp-primary/20 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <SectionEyebrow color="muted">DECISION</SectionEyebrow>
              <span className="inline-flex items-center rounded-full bg-sp-coral-bg-soft px-1.5 py-0.5 text-[9px] font-bold uppercase text-sp-coral">
                ACTION REQUIRED
              </span>
            </div>
            <hr className="mb-4 mt-2 border-sp-border-soft" />

            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-sp-text-muted">
              ACTIONS ON APPROVE
            </p>
            <div className="mb-4 space-y-2.5">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={issueStars}
                  onChange={(e) => setIssueStars(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-sp-accent-green"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sp-primary">
                    ⭐ Issue 1 star to Lukas Müller
                  </p>
                  <p className="mt-0.5 text-[10px] text-sp-text-muted">
                    Will update profile: Chef · Baby Level · 7 → 8 stars
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={generateCertificate}
                  onChange={(e) => setGenerateCertificate(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-sp-accent-green"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sp-primary">
                    📜 Generate certificate PDF
                  </p>
                  <p className="mt-0.5 text-[10px] text-sp-text-muted">
                    Auto-emailed to guardian. Includes both team member names.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={featureOnHome}
                  onChange={(e) => setFeatureOnHome(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-sp-coral"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sp-primary">🔥 Feature on homepage</p>
                  <p className="mt-0.5 text-[10px] text-sp-text-muted">
                    Requires explicit parent media consent (check before enabling).
                  </p>
                </div>
              </label>
            </div>

            <label
              htmlFor="reviewerNote"
              className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-sp-text-muted"
            >
              REVIEWER NOTE
            </label>
            <textarea
              id="reviewerNote"
              rows={3}
              value={reviewerNote}
              onChange={(e) => setReviewerNote(e.target.value)}
              placeholder="Note to guardian (visible) or internal admin note (private prefix)..."
              className="w-full resize-none rounded-lg border border-sp-border-input bg-white px-3 py-2 text-sm outline-none focus:border-sp-primary"
            />
            <p className="mt-1 text-[10px] text-sp-text-muted">
              Use [INTERNAL] prefix for admin-only notes.
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={handleApprove}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sp-primary-hover"
              >
                ✓ Approve &amp; Complete
              </button>
              <button
                type="button"
                onClick={handleResubmission}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                ↻ Request Resubmission
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-sp-danger/40 bg-white px-4 py-2.5 text-sm font-semibold text-sp-danger transition-colors hover:bg-red-50"
              >
                ✕ Reject Submission
              </button>
            </div>

            {/* Super-admin override toggle */}
            <div className="mt-4 border-t border-sp-border-soft pt-4">
              <button
                type="button"
                onClick={() => setShowOverride(!showOverride)}
                className="flex w-full items-center justify-between text-xs font-semibold text-sp-text-muted hover:text-sp-primary"
              >
                <span>⚡ Override AI result (super-admin)</span>
                <span>{showOverride ? '▲' : '▼'}</span>
              </button>

              {showOverride && (
                <div className="mt-3 rounded-lg border border-sp-danger/30 bg-red-50 p-3">
                  <div className="mb-3 flex items-start gap-2">
                    <span className="flex-shrink-0 text-sp-danger" aria-hidden="true">⚠️</span>
                    <p className="text-[11px] leading-relaxed text-sp-danger">
                      Overriding AI result requires explicit justification. This action is logged in
                      audit trail and visible to all super-admins.
                    </p>
                  </div>
                  <textarea
                    rows={2}
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="Justify override (required)..."
                    className="w-full resize-none rounded-lg border border-sp-danger/40 bg-white px-3 py-2 text-xs outline-none focus:border-sp-danger"
                  />
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-[10px] leading-relaxed text-sp-text-muted">
              All decisions logged with admin identity, timestamp, and full action context.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}