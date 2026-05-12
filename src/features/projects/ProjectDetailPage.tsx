import { useParams } from 'react-router-dom'
import { IconTile, SectionEyebrow } from '../../components/ui'

const EXPERT = {
  initials: 'SK',
  name: 'Maestro Sven Krause',
  role: 'Composer · Mentored 200+ young musicians · Berlin',
  bio: 'Award-winning composer with 15 years of mentoring experience. Specialized in helping young musicians develop their authentic sound.',
}

const LEARNING_OUTCOMES = [
  { icon: '🎼', title: 'Composition basics', description: 'Melody, rhythm, harmony fundamentals' },
  { icon: '🎹', title: 'Music theory', description: 'Keys, scales, chord progressions' },
  { icon: '🎤', title: 'Recording techniques', description: 'Mic placement, takes, performance' },
  { icon: '🎚️', title: 'Mixing & mastering', description: 'DAW basics, EQ, compression' },
  { icon: '📋', title: 'Project management', description: 'Recording sessions, deadlines, deliverables' },
  { icon: '📦', title: 'Distribution prep', description: 'Final mastered file ready to share' },
]

const SYLLABUS = [
  {
    week: 1,
    title: 'Inspiration & Concept',
    format: '1-on-1 mentoring call with Sven',
    description:
      'Find your sound. Discover artists you love and analyze why. Sven helps you identify a musical direction that feels authentic.',
  },
  {
    week: 2,
    title: 'Composition & Arrangement',
    format: 'Group workshop + DAW intro',
    description:
      'Write your melody and lyrics. Learn the basics of arranging in a Digital Audio Workstation (DAW). Build a song structure.',
  },
  {
    week: 3,
    title: 'Recording Session',
    format: 'Studio time at Music Workshop Kassel',
    description:
      'Record vocals and any acoustic instruments in a real studio. Sven teaches mic technique and recording best practices.',
  },
  {
    week: 4,
    title: 'Mixing & Mastering',
    format: 'DAW workshop + 1-on-1 mix review',
    description:
      'Mix your song with EQ, compression, and effects. Master to industry-standard loudness. Final mix review with Sven.',
  },
  {
    week: 5,
    title: 'Showcase & Reflection',
    format: 'Optional showcase event',
    description:
      'Share your song with your team and Sven. Reflect on what you learned. Receive your final mastered audio file + certificate.',
  },
]

const SAFETY_ITEMS = [
  { icon: '👨‍👩‍👧', text: 'Adult supervision required for studio session' },
  { icon: '🔒', text: 'Expert never accesses child personal data' },
  { icon: '🎵', text: 'Final audio is yours — Star Project does not publish' },
  { icon: '📹', text: 'All sessions recorded for parent review' },
]

const PRICING_INCLUDED = [
  '5-week mentored program',
  '2 × 1-on-1 calls with Maestro Sven',
  'Studio session at Music Workshop Kassel',
  '3 stars · counts toward Music Mythical level',
  'Final mastered audio file (yours forever)',
  'Premium certificate',
]

export function ProjectDetailPage() {
  useParams<{ projectId: string }>()

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Section 1 — Premium Hero */}
        <section
          className="relative overflow-hidden rounded-2xl p-6 text-white md:p-10"
          style={{
            background: 'linear-gradient(135deg, #F4D9CC 0%, #D26B4A 50%, #1F3D2E 100%)',
          }}
        >
          <div className="absolute right-4 top-4 text-6xl opacity-20" aria-hidden="true">
            ✨
          </div>
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/10" aria-hidden="true" />

          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sp-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-sp-primary">
                ✨ MYTHICAL · EXPERT-LED
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase text-white">
                LIMITED SPOTS
              </span>
            </div>

            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-normal md:text-5xl">
              Compose &amp; Record an{' '}
              <span className="italic text-sp-gold">Original Song</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              A 5-week mentored project where children learn to compose, arrange, record, and master
              an original song with a working musician — using real studio tools at Music Workshop
              Kassel.
            </p>
          </div>
        </section>

        {/* Section 2 — Meta Row */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'DURATION', value: '5 weeks' },
            { label: 'REWARD', value: '⭐⭐⭐ × 3' },
            { label: 'AGE', value: '13+' },
            { label: 'LEVEL', value: 'Mythical' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-sp-border-soft bg-white p-4 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">
                {stat.label}
              </p>
              <p className="font-serif mt-1 text-lg font-semibold text-sp-primary md:text-xl">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Section 3 — Expert Profile */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <SectionEyebrow color="coral">YOUR MENTOR</SectionEyebrow>

          <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sp-coral to-sp-primary font-serif text-2xl font-semibold text-white">
              {EXPERT.initials}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
                {EXPERT.name}
              </h2>
              <p className="mt-1 text-sm text-sp-text-muted">{EXPERT.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-sp-text-primary">{EXPERT.bio}</p>
            </div>
          </div>
        </section>

        {/* Section 4 — What You'll Learn */}
        <section>
          <h2 className="font-serif mb-5 text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
            What you&apos;ll learn
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {LEARNING_OUTCOMES.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-sp-border-soft bg-white p-4"
              >
                <IconTile size="md" tint="coral">
                  <span aria-hidden="true">{item.icon}</span>
                </IconTile>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-sp-primary">✓ {item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-sp-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — 5-Week Syllabus */}
        <section>
          <h2 className="font-serif mb-5 text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
            5-Week Syllabus
          </h2>

          <div className="flex flex-col gap-3">
            {SYLLABUS.map((week) => (
              <article
                key={week.week}
                className="flex gap-4 rounded-xl border border-sp-border-soft bg-white p-4 md:p-5"
              >
                <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-sp-coral-bg-soft to-sp-coral text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider">WEEK</span>
                  <span className="font-serif text-xl font-semibold leading-none">{week.week}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base font-semibold text-sp-primary">
                    {week.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-sp-coral">{week.format}</p>
                  <p className="mt-2 text-sm leading-relaxed text-sp-text-primary">
                    {week.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN — Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Pricing Card — prominent, sticky */}
        <section
          className="relative overflow-hidden rounded-2xl p-6 text-white lg:sticky lg:top-6"
          style={{ background: 'linear-gradient(135deg, #1F3D2E 0%, #2A4F3D 100%)' }}
        >
          <div className="absolute -right-8 -top-8 text-7xl opacity-15" aria-hidden="true">
            ✨
          </div>

          <div className="relative">
            <SectionEyebrow color="coral" className="text-sp-gold">
              PRICING
            </SectionEyebrow>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl" aria-hidden="true">
                ⭐⭐⭐
              </span>
              <span className="ml-2 text-sm text-white/80">× 3 stars</span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-white/70">€50 / star</p>
              <p className="font-serif mt-1 text-5xl font-semibold text-sp-gold">€150</p>
              <p className="mt-1 text-xs text-white/70">One-time payment · 5 weeks access</p>
            </div>

            <div className="my-5 border-t border-white/15" />

            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/70">
              INCLUDED
            </p>
            <ul className="flex flex-col gap-2 text-xs">
              {PRICING_INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0 text-sp-gold" aria-hidden="true">
                    ✓
                  </span>
                  <span className="leading-relaxed text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => console.log('Purchase mythical project')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sp-gold px-5 py-3.5 text-sm font-bold text-sp-primary transition-colors hover:bg-sp-gold/90"
            >
              Purchase &amp; Begin · €150 →
            </button>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-white/60">
              Payment via Flipflop · Manual approval within 24h
              <br />
              Subject to age check (13+)
            </p>
          </div>
        </section>

        {/* Safety & Privacy */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <h3 className="font-serif mb-4 flex items-center gap-2 text-base font-semibold text-sp-primary">
            <span aria-hidden="true">🛡️</span>
            Safety &amp; Privacy
          </h3>

          <ul className="flex flex-col gap-3">
            {SAFETY_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="leading-relaxed text-sp-text-primary">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}