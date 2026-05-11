import { Link } from 'react-router-dom'
import { Pill } from '../../components/ui'
import { StatCard } from '../../components/ui'
import { IconTile } from '../../components/ui'
import { SectionEyebrow } from '../../components/ui'
import { ProjectCard } from '../../components/cards'
import { HOME_NEWLY_RELEASED } from '../../data/mock/projects'

const WATCH_HOW_IT_WORKS = '#'

/* ─── Section 1 – Hero ─── */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto" aria-hidden="true">
      {/* background warm circles */}
      <circle cx="340" cy="60" r="80" fill="#F4D9CC" opacity="0.35" />
      <circle cx="60" cy="340" r="60" fill="#E0E8D4" opacity="0.35" />
      <circle cx="200" cy="200" r="130" fill="#F2E6CC" opacity="0.25" />

      {/* stars */}
      <text x="300" y="70" fontSize="32" textAnchor="middle" fill="#C9A063">★</text>
      <text x="80" y="100" fontSize="24" textAnchor="middle" fill="#D26B4A">★</text>

      {/* character 1 (left) */}
      <circle cx="150" cy="170" r="22" fill="#1F3D2E" />
      <rect x="128" y="192" rx="14" ry="14" width="44" height="60" fill="#1F3D2E" />
      {/* apron */}
      <rect x="133" y="198" rx="10" ry="10" width="34" height="48" fill="#F4D9CC" />

      {/* character 2 (right) */}
      <circle cx="250" cy="165" r="20" fill="#D26B4A" />
      <rect x="230" y="185" rx="12" ry="12" width="40" height="55" fill="#D26B4A" />

      {/* project block in front */}
      <rect x="155" y="230" rx="14" ry="14" width="90" height="55" fill="white" stroke="#EFE7D9" strokeWidth="1.5" />
      <text x="200" y="260" fontSize="28" textAnchor="middle" fill="#1F3D2E">🍝</text>

      {/* small decorative dots */}
      <circle cx="320" cy="300" r="6" fill="#D26B4A" opacity="0.4" />
      <circle cx="80" cy="220" r="5" fill="#C9A063" opacity="0.5" />
      <circle cx="270" cy="310" r="4" fill="#1F3D2E" opacity="0.2" />
    </svg>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 md:flex-row md:px-6 md:py-16 lg:py-20">
        {/* Left column – text */}
        <div className="flex-1">
          <Pill variant="pending" size="sm" className="mb-6">
            ⭐ NOW LIVE IN KASSEL
          </Pill>

          <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-[1.05] text-sp-primary tracking-normal">
            Let&apos;s Create
            <br />
            Something
            <br />
            <span className="italic text-sp-accent-green">Real.</span>
          </h1>

          <p className="mt-5 max-w-md text-sp-text-muted">
            A project-based career discovery platform helping children aged 4–18 explore their
            future through real-world challenges, teamwork, and guided reflection. Not another video
            course — real projects.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-sp-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-sp-primary-hover"
            >
              Start Your Career →
            </Link>
            <Link
              to={WATCH_HOW_IT_WORKS}
              className="rounded-lg border border-sp-border-input bg-white px-5 py-3 font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
            >
              ▶ Watch How It Works
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-8 flex gap-8">
            <div className="flex items-center gap-8">
              <StatCard variant="inline" value="9" label="CAREER PATHS" />
              <span className="hidden h-8 w-px bg-sp-border-soft md:block" />
            </div>
            <StatCard variant="inline" value="4–5" label="WEEK PROJECTS" />
            <span className="hidden h-8 w-px bg-sp-border-soft md:block" />
            <StatCard variant="inline" value="€29" label="/ MONTH · FAMILY" />
          </div>
        </div>

        {/* Right column – illustration */}
        <div className="flex shrink-0 items-center justify-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}

/* ─── Section 2 – The Reality ─── */

const REALITY_STATS = [
  {
    value: '39%',
    label:
      'of 15-year-olds across OECD countries are unclear about their career expectations.',
    source: 'OECD · PISA 2022',
  },
  {
    value: '70K',
    label:
      'apprenticeship positions remained vacant in Germany by end of 2023.',
    source: 'BERTELSMANN STIFTUNG · 2024',
  },
  {
    value: '39%',
    label:
      'of key job skills are expected to change by 2030 — kids need adaptability.',
    source: 'WORLD ECONOMIC FORUM · 2025',
  },
  {
    value: '66',
    label:
      'studies meta-analyzed: project-based learning significantly improves outcomes.',
    source: 'FRONTIERS IN PSYCHOLOGY · 2023',
  },
]

function RealitySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="text-center">
        <SectionEyebrow color="coral">THE REALITY</SectionEyebrow>
        <h2 className="font-serif mt-2 text-3xl md:text-4xl font-semibold text-sp-primary">
          Why early career discovery matters now.
        </h2>
        <p className="mt-2 text-sp-text-muted">
          The job market is shifting faster than schools can adapt. Here&apos;s what the data tells
          us.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {REALITY_STATS.map((stat) => (
          <StatCard key={stat.value + stat.label} variant="large" {...stat} />
        ))}
      </div>
    </section>
  )
}

/* ─── Section 3 – Why Choose Us ─── */

const FEATURES = [
  {
    icon: '🎯',
    tint: 'coral' as const,
    title: 'Real-World Projects',
    body: 'Children create something tangible — a recipe, a robot, a song, a community plan. Not passive video lessons.',
  },
  {
    icon: '🤝',
    tint: 'farm' as const,
    title: 'Teamwork by Design',
    body: 'Minimum 2 registered users to start. Accountability and collaboration are built into every project.',
  },
  {
    icon: '⭐',
    tint: 'gold' as const,
    title: 'Career Path Orientation',
    body: '9 future-oriented categories from Robotics to Music to Community Building — real fields, real futures.',
  },
]

function WhyChooseUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="text-center">
        <SectionEyebrow color="coral">WHY CHOOSE US</SectionEyebrow>
        <h2 className="font-serif mt-2 text-3xl md:text-4xl font-semibold text-sp-primary">
          Real projects. Real teamwork. Real progress.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-sp-border-soft bg-white p-6"
          >
            <IconTile size="md" tint={f.tint}>
              {f.icon}
            </IconTile>
            <h3 className="mt-4 text-base font-semibold text-sp-primary">{f.title}</h3>
            <p className="mt-2 text-sm text-sp-text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Section 4 – Newly Released ─── */

function NewlyReleasedSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex items-end justify-between">
        <div>
          <SectionEyebrow color="coral">NEWLY RELEASED</SectionEyebrow>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl font-semibold text-sp-primary">
            Fresh projects, ready to start.
          </h2>
        </div>
        <Link
          to="/start"
          className="hidden shrink-0 font-semibold text-sp-coral transition-colors hover:underline md:inline-block"
        >
          View All Projects →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {HOME_NEWLY_RELEASED.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <Link
        to="/start"
        className="mt-4 inline-block font-semibold text-sp-coral transition-colors hover:underline md:hidden"
      >
        View All Projects →
      </Link>
    </section>
  )
}

/* ─── Section 5 – From Our Families ─── */

const TESTIMONIALS = [
  {
    quote:
      'My daughter went from watching videos all day to actually building a small herb garden. She\'s proud of it. That\'s worth €29 a month.',
    initials: 'AM',
    avatarBg: 'bg-sp-coral',
    name: 'Anna M.',
    role: 'Parent · Kassel',
  },
  {
    quote:
      'I learned how to interview real people for my chef project. Now I want to open my own ice cream shop someday.',
    initials: 'LS',
    avatarBg: 'bg-category-farm-bg text-sp-accent-green',
    name: 'Lukas S., age 9',
    role: 'Chef · Tiny Level',
  },
  {
    quote:
      'The team requirement felt strange at first, but it\'s the best part. My son and his cousin actually plan things together now.',
    initials: 'TK',
    avatarBg: 'bg-sp-coral',
    name: 'Thomas K.',
    role: 'Parent · Hessen',
  },
]

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="text-center">
        <SectionEyebrow color="coral">FROM OUR FAMILIES</SectionEyebrow>
        <h2 className="font-serif mt-2 text-3xl md:text-4xl font-semibold text-sp-primary">
          What parents and children say.
        </h2>
        <p className="mt-2 text-sm text-sp-text-muted">
          Public testimonials shared with explicit parent consent.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="rounded-xl border border-sp-border-soft bg-white p-6"
          >
            <p className="font-serif italic text-sp-text-primary leading-relaxed text-base">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.avatarBg}`}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-sp-primary">{t.name}</p>
                <p className="text-xs text-sp-text-muted">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Section 6 – Bottom CTA Banner ─── */

function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-sp-primary p-8 md:p-12">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10"
          style={{ background: '#FAF7F2' }}
        />
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold leading-tight text-white">
              Ready to start your child&apos;s real-world journey?
            </h2>
            <p className="mt-2 text-white/80">
              Join families across Kassel building real projects, one star at a time.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-sp-coral px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-sp-coral-hover"
          >
            Create Account →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Page export ─── */

export function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16 md:gap-24">
      <HeroSection />
      <RealitySection />
      <WhyChooseUsSection />
      <NewlyReleasedSection />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  )
}