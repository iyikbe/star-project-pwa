import { Link, useParams } from 'react-router-dom'

const REVIEW_BREAKDOWN = [
  {
    id: 'r1',
    icon: '✓',
    iconTint: 'green' as const,
    title: 'Report Document — Passed AI Review',
    description:
      'All 4 weekly sections complete · Strong testing evidence (Week 3) · Excellent reflection',
  },
  {
    id: 'r2',
    icon: '✓',
    iconTint: 'green' as const,
    title: 'Video Proof — Approved by Admin',
    description:
      'Reviewed by Maria S. (Star Project Team) · 3:42 video shows full process clearly',
  },
  {
    id: 'r3',
    icon: '✓',
    iconTint: 'green' as const,
    title: 'Team Participation — Both members verified',
    description: 'Lukas Müller and Sophie K. both contributed to weekly tasks',
  },
  {
    id: 'r4',
    icon: '⭐',
    iconTint: 'gold' as const,
    title: 'Achievement Issued — Pasta Master Baby',
    description: 'Added to your Achievements list · Certificate generated',
  },
]

const REVIEWER_NOTE = {
  initials: 'MS',
  name: 'Maria S.',
  role: 'Reviewer',
  quote:
    'Beautifully documented project, Lukas! Your reflection on what went wrong with the first batch and how you improved the salt level was very mature. Sophie\'s photography is fantastic. Keep going!',
}

export function SubmissionResultPage() {
  useParams<{ projectId: string }>()

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Section 1 — Celebration Hero */}
        <section
          className="relative overflow-hidden rounded-2xl p-6 text-white md:p-10"
          style={{ background: 'linear-gradient(135deg, #1F3D2E 0%, #2A4F3D 100%)' }}
        >
          <div className="absolute -right-8 -top-8 text-9xl opacity-10" aria-hidden="true">
            ⭐
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-1 rounded-full bg-sp-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-sp-primary">
              ⭐ PROJECT COMPLETED
            </span>

            <h1 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-normal md:text-5xl">
              Excellent work, <span className="italic text-sp-gold">Lukas!</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Your <strong className="text-white">Pasta from Scratch</strong> project has been
              accepted. You&apos;ve earned <strong className="text-sp-gold">1 star</strong> in Chef
              · Baby Level.
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  YOUR STARS
                </p>
                <p className="font-serif mt-1 flex items-baseline gap-2 text-4xl font-semibold text-white md:text-5xl">
                  <span className="text-sp-gold">⭐</span>
                  <span>7</span>
                  <span className="text-2xl text-white/60 md:text-3xl">→</span>
                  <span className="text-sp-gold">8</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  NEXT MILESTONE
                </p>
                <p className="mt-2 text-base text-white/90 md:text-lg">
                  <strong className="text-white">2 more stars</strong> to unlock Junior →
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Review Breakdown */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
            Review Breakdown
          </h2>
          <p className="mt-1 text-xs text-sp-text-muted">
            Your submission was reviewed automatically by our AI for the report and manually by an
            admin for the video.
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {REVIEW_BREAKDOWN.map((item) => (
              <li
                key={item.id}
                className={`flex gap-4 rounded-lg border p-4 ${
                  item.iconTint === 'gold'
                    ? 'border-sp-gold/30 bg-sp-gold-bg-soft/40'
                    : 'border-sp-accent-green/30 bg-sp-accent-green-bg/30'
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
                    item.iconTint === 'gold' ? 'bg-sp-gold' : 'bg-sp-accent-green'
                  }`}
                >
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base font-semibold text-sp-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-sp-text-primary">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 — Reviewer Note */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sp-primary text-sm font-bold text-white">
              {REVIEWER_NOTE.initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="font-serif text-base font-semibold text-sp-primary">
                  Note from {REVIEWER_NOTE.name}
                </h3>
                <span className="text-xs text-sp-text-muted">· {REVIEWER_NOTE.role}</span>
              </div>

              <blockquote className="font-serif mt-3 border-l-2 border-sp-coral pl-4 italic leading-relaxed text-sp-text-primary">
                &ldquo;{REVIEWER_NOTE.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 4 — Action Buttons */}
        <section className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => console.log('Download certificate')}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sp-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
          >
            ⬇ Download Certificate
          </button>
          <Link
            to="/start"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-sp-border-input bg-white px-5 py-3 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
          >
            🚀 Browse Next Projects →
          </Link>
        </section>
      </div>

      {/* RIGHT COLUMN — Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Certificate Preview */}
        <section className="relative overflow-hidden rounded-xl border-2 border-sp-gold/40 bg-white p-6">
          <div
            className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-sp-gold"
            aria-hidden="true"
          />
          <div
            className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-sp-gold"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-sp-gold"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-sp-gold"
            aria-hidden="true"
          />

          <div className="px-2 py-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp-gold">
              CERTIFICATE OF COMPLETION
            </p>

            <div className="my-4 text-5xl" aria-hidden="true">
              ⭐
            </div>

            <p className="text-xs text-sp-text-muted">This certifies that</p>
            <p className="font-serif mt-2 text-xl font-semibold text-sp-primary">Lukas Müller</p>

            <p className="mt-3 text-xs text-sp-text-muted">
              has successfully completed the project
            </p>
            <p className="font-serif mt-1 text-base italic text-sp-primary">
              &ldquo;Pasta from Scratch&rdquo;
            </p>

            <p className="mt-2 text-xs text-sp-text-muted">
              at <strong className="text-sp-primary">Chef · Baby Level</strong>
            </p>
            <p className="mt-1 text-xs text-sp-text-muted">with team member Sophie K.</p>

            <div className="mt-5 border-t border-sp-border-soft pt-4">
              <p className="text-[10px] text-sp-text-muted">Issued April 4, 2026</p>
              <p className="mt-0.5 text-[10px] text-sp-text-muted">
                Star Project · Kassel, Germany
              </p>
            </div>
          </div>
        </section>

        {/* Progress Note */}
        <section className="rounded-xl border border-sp-coral/30 bg-sp-coral-bg-soft/40 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sp-coral text-white">
              <span aria-hidden="true">🎯</span>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-base font-semibold text-sp-primary">Almost there!</h3>
              <p className="mt-1 text-sm leading-relaxed text-sp-text-primary">
                Only <strong className="text-sp-coral">2 more stars</strong> to unlock Junior Level.
                Keep building, Lukas!
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-sp-gold" style={{ width: '80%' }} />
              </div>
              <p className="mt-1 text-xs text-sp-text-muted">
                8 of 10 stars in Chef · Baby Level
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}