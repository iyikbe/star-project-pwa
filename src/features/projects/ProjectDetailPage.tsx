type SyllabusWeek = {
  number: number
  title: string
  meta: string
  description: string
}

const SYLLABUS: SyllabusWeek[] = [
  {
    number: 1,
    title: 'Inspiration & Concept',
    meta: 'Week 1 · 1-on-1 mentoring call with Sven',
    description:
      'Find your sound. Discover artists you love and analyze why. Sven helps you identify a musical direction that feels authentic.',
  },
  {
    number: 2,
    title: 'Composition & Arrangement',
    meta: 'Week 2 · Group workshop + DAW intro',
    description:
      'Write your melody and lyrics. Learn the basics of arranging in a Digital Audio Workstation (DAW). Build a song structure.',
  },
  {
    number: 3,
    title: 'Recording Session',
    meta: 'Week 3 · Studio time at Music Workshop Kassel',
    description:
      'Record vocals and any acoustic instruments in a real studio. Sven teaches mic technique and recording best practices.',
  },
  {
    number: 4,
    title: 'Mixing & Mastering',
    meta: 'Week 4 · DAW workshop + 1-on-1 mix review',
    description:
      'Mix your song with EQ, compression, and effects. Master to industry-standard loudness. Final mix review with Sven.',
  },
  {
    number: 5,
    title: 'Showcase & Reflection',
    meta: 'Week 5 · Optional showcase event',
    description:
      'Share your song with your team and Sven. Reflect on what you learned. Receive your final mastered audio file + certificate.',
  },
]

const LEARNING_ITEMS = [
  'Composition basics — melody, rhythm, harmony',
  'Music theory — keys, scales, chord progressions',
  'Recording techniques — mic placement, takes',
  'Mixing & mastering — DAW basics, EQ, compression',
  'Project management — recording sessions, deadlines',
  'Distribution prep — final mastered file ready to share',
]

const INCLUDED_ITEMS = [
  '5-week mentored program',
  '2 × 1-on-1 calls with Maestro Sven',
  'Studio session at Music Workshop Kassel',
  '3 stars · counts toward Music Mythical level',
  'Final mastered audio file (yours forever)',
  'Premium certificate',
]

const SAFETY_ITEMS = [
  'Adult supervision required for studio session',
  'Expert never accesses child personal data',
  'Final audio is yours — Star Project does not publish',
  'All sessions recorded for parent review',
]

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">
        Star Project › Start Your Career › Music · Mythical › Compose & Record an Original Song
      </p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Baby · ⭐ 7</p>
        </div>
        <button
          type="button"
          className="relative rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          🔔
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C96B5A] text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          ✉️
        </button>
      </div>
    </div>
  )
}

function PremiumHero() {
  return (
    <div
      className="overflow-hidden rounded-2xl text-[#FFFDF8] shadow-sm"
      style={{ background: 'linear-gradient(135deg, #26483E, #1F3D35, #C9785A)' }}
    >
      <div className="p-7 md:p-9">
        <span className="inline-block rounded-full border border-[#F4C542]/40 bg-white/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#F4C542]">
          ✨ Mythical · Expert-led · Limited Spots
        </span>

        <h1 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
          Compose & Record an Original Song
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#D8D3CA]">
          A 5-week mentored project where children learn to compose, arrange, record, and master an
          original song with a working musician — using real studio tools at Music Workshop Kassel.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C542]">
              Premium
            </p>
            <p className="mt-0.5 text-sm font-bold">⭐⭐⭐ × 3</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C542]">
              Duration
            </p>
            <p className="mt-0.5 text-sm font-bold">5 weeks</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C542]">
              Age
            </p>
            <p className="mt-0.5 text-sm font-bold">13+</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C542]">
              Level
            </p>
            <p className="mt-0.5 text-sm font-bold">Mythical</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectMeta() {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#5B6472]">
      <span>
        <span className="font-semibold text-[#172033]">DURATION:</span> 5 weeks
      </span>
      <span>
        <span className="font-semibold text-[#172033]">REWARD:</span> ⭐⭐⭐ × 3
      </span>
      <span>
        <span className="font-semibold text-[#172033]">AGE:</span> 13+
      </span>
      <span>
        <span className="font-semibold text-[#172033]">RECOMMENDED LEVEL:</span> Mythical
      </span>
    </div>
  )
}

function ExpertProfile() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Your Expert Mentor</p>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#26483E] to-[#C9785A] text-sm font-bold text-white">
          SK
        </div>
        <div>
          <p className="text-sm font-bold text-[#172033]">Maestro Sven Krause</p>
          <p className="mt-0.5 text-xs text-[#5B6472]">
            Composer · Mentored 200+ young musicians · Berlin
          </p>
        </div>
      </div>
    </div>
  )
}

function LearningSection() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">What you&apos;ll learn</p>
      <ul className="space-y-2.5">
        {LEARNING_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-[#5B6472]">
            <span className="mt-0.5 text-[#26483E]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SyllabusSection() {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-[#172033]">5-Week Syllabus</p>
      <div className="space-y-3">
        {SYLLABUS.map((week) => (
          <div
            key={week.number}
            className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#26483E] to-[#C9785A] text-xs font-bold text-white">
                {week.number}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#172033]">{week.title}</h3>
                  <span className="rounded-full bg-[#F4EFE7] px-2.5 py-0.5 text-[10px] font-medium text-[#5B6472]">
                    {week.meta}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B6472]">{week.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SafetyPrivacy() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Safety &amp; Privacy</p>
      <ul className="space-y-2.5">
        {SAFETY_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-xs text-[#5B6472]">
            <span className="mt-0.5 text-[#26483E]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingCard() {
  return (
    <div className="rounded-2xl border-2 border-[#F4C542]/40 bg-[#FFFDF8] p-6 shadow-md">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Pricing</p>

      <div className="text-center">
        <p className="text-3xl font-bold text-[#172033]">€150</p>
        <p className="text-xs text-[#5B6472]">One-time payment · 5 weeks access</p>
      </div>

      <div className="my-5 flex items-center justify-center gap-6 text-sm">
        <span className="flex items-center gap-1">
          <span className="text-[#F4C542]">⭐</span> × <span className="font-bold">3</span>
        </span>
        <span className="text-[#8A8F98]">€50 / star</span>
      </div>

      <ul className="space-y-2.5 border-t border-[#E8E1D8] pt-4">
        {INCLUDED_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-[#5B6472]">
            <span className="mt-0.5 text-[#26483E]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-gradient-to-r from-[#26483E] to-[#1F3D35] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md"
      >
        Purchase &amp; Begin · €150
      </button>

      <p className="mt-3 text-center text-xs text-[#8A8F98]">
        Payment via Flipflop · Manual approval within 24h
        <br />
        Subject to age check (13+)
      </p>
    </div>
  )
}

export function ProjectDetailPage() {
  return (
    <div>
      <TopBar />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <PremiumHero />
          <ProjectMeta />
          <LearningSection />
          <SyllabusSection />
        </div>

        <div className="space-y-5">
          <ExpertProfile />
          <SafetyPrivacy />
          <div className="sticky top-8">
            <PricingCard />
          </div>
        </div>
      </div>
    </div>
  )
}