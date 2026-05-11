import { Link } from 'react-router-dom'
import { SectionEyebrow, IconTile, Pill } from '../../components/ui'
import { LevelBadge } from '../../components/cards'
import { CURRENT_USER } from '../../data/mock/users'
import { RECENT_ACHIEVEMENTS } from '../../data/mock/achievements'
import { LEVELS } from '../../lib/constants/levels'
import { CATEGORIES } from '../../lib/constants/categories'

/* ─── Page header ─── */

function PageHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
          My Account
        </h1>
        <p className="mt-1 text-sm text-sp-text-muted">
          Your profile, progress, invitations, and achievements — all in one place.
        </p>
      </div>
      <Link
        to="/start"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-sp-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
      >
        🚀 Start a New Journey
      </Link>
    </div>
  )
}

/* ─── Card A — Profile ─── */

function ProfileCard() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-6">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sp-coral text-3xl font-bold text-white">
        {CURRENT_USER.childInitials}
      </div>

      <p className="font-serif mt-4 text-center text-xl font-semibold text-sp-primary">
        {CURRENT_USER.childName}
      </p>
      <p className="mt-2 text-center font-mono text-xs text-sp-text-muted">
        ID: {CURRENT_USER.studentId}
      </p>

      <div className="mt-3 flex justify-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-category-chef-bg px-2.5 py-1 text-xs font-semibold uppercase text-category-chef">
          {CATEGORIES[CURRENT_USER.currentCategory].shortLabel}
        </span>
        <LevelBadge level={CURRENT_USER.currentLevel} />
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-sp-border-soft">
        <div className="flex flex-col items-center py-2">
          <p className="font-serif text-xl text-sp-primary">⭐ {CURRENT_USER.totalStars}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">STARS</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <p className="font-serif text-xl text-sp-primary">{CURRENT_USER.projectsCompleted}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">PROJECTS</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <p className="font-serif text-xl text-sp-primary">{CURRENT_USER.age}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">YEARS</p>
        </div>
      </div>

      <div className="mt-5">
        <SectionEyebrow color="muted">ABOUT ME</SectionEyebrow>
        <p className="mt-2 text-sm leading-relaxed text-sp-text-primary">{CURRENT_USER.aboutMe}</p>
      </div>
    </div>
  )
}

/* ─── Card B — Level progress ─── */

function LevelProgressCard() {
  const level = LEVELS[CURRENT_USER.currentLevel]

  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif flex items-center gap-2 text-base font-semibold text-sp-primary">
          {level.starsDisplay} {level.label} Level
        </h3>
        <span className="text-xs font-semibold text-sp-coral hover:underline">
          3 stars to Junior →
        </span>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-sp-border-soft">
          <div className="h-full rounded-full bg-sp-gold" style={{ width: '70%' }} />
        </div>
      </div>
      <p className="mt-2 text-xs text-sp-text-muted">
        {CURRENT_USER.totalStars} of 10 stars in Chef · Baby Level
      </p>
    </div>
  )
}

/* ─── Card C — My Categories ─── */

const CATEGORY_LIST = [
  { slug: 'chef' as const, name: 'Chef', emoji: '🍳', stars: 7 },
  { slug: 'farm' as const, name: 'Farm', emoji: '🌱', stars: 0 },
  { slug: 'community' as const, name: 'Community', emoji: '🤝', stars: 0 },
]

function CategoriesCard() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
      <h3 className="font-serif text-base font-semibold text-sp-primary">My Categories</h3>

      <div className="mt-4 divide-y divide-sp-border-soft">
        {CATEGORY_LIST.map((cat) => {
          const info = CATEGORIES[cat.slug]
          return (
            <div
              key={cat.slug}
              className="flex items-center justify-between py-2 last:border-0"
            >
              <span className="text-sm text-sp-text-primary">{info.emoji} {info.label}</span>
              <span className="text-sm" style={{ color: '#C9A063' }}>
                ⭐ {cat.stars}
              </span>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-sp-border-input bg-white py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
      >
        + Add Category
      </button>
    </div>
  )
}

/* ─── Card D — Pending Invitations ─── */

const INVITATIONS = [
  {
    icon: '🍦',
    tint: 'chef' as const,
    title: 'The Ice Cream Project — Round 2',
    detail: 'From Sophie K. (SP-2026-0052) · Chef · Tiny · Expires in 3 days',
  },
  {
    icon: '🌱',
    tint: 'farm' as const,
    title: 'Mini Greenhouse Build',
    detail: 'From Emma B. (SP-2026-0117) · Farm · Junior · Expires in 5 days',
  },
]

function InvitationsCard() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
            Pending Invitations
          </h3>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sp-coral text-xs font-bold text-white">
            2
          </span>
        </div>
        <span className="text-xs font-semibold text-sp-coral hover:underline">View All</span>
      </div>

      <div className="-mx-5 mt-4 divide-y divide-sp-border-soft md:-mx-6">
        {INVITATIONS.map((inv) => (
          <div key={inv.title} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4 md:px-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <IconTile size="md" tint={inv.tint}>{inv.icon}</IconTile>
                <p className="text-sm font-semibold text-sp-primary">{inv.title}</p>
              </div>
              <p className="mt-1 text-xs text-sp-text-muted">{inv.detail}</p>
            </div>
            <div className="flex gap-2 md:flex-shrink-0">
              <button
                type="button"
                className="rounded-lg border border-sp-border-input bg-white px-4 py-2 text-sm font-semibold text-sp-text-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                Decline
              </button>
              <button
                type="button"
                className="rounded-lg bg-sp-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Card E — Recent Achievements ─── */

function AchievementsCard() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
          Recent Achievements
        </h3>
        <span className="text-xs font-semibold text-sp-coral hover:underline">View All →</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {RECENT_ACHIEVEMENTS.map((a) => {
          const isLocked = a.isLocked
          return (
            <div
              key={a.id}
              className={`flex flex-col items-center justify-center rounded-xl bg-sp-bg-card-muted p-4 text-center ${
                isLocked ? 'opacity-60' : ''
              }`}
            >
              <span className="text-3xl" aria-hidden="true">{a.emoji}</span>
              <p className="mt-2 text-xs font-semibold leading-tight text-sp-primary">{a.title}</p>
              <p className="mt-1 text-[10px] text-sp-text-muted">
                {a.type === 'project' && a.date
                  ? `⭐ ${a.starsEarned} · ${a.date}`
                  : a.type === 'special' && a.date
                    ? `Special · ${a.date}`
                    : a.type === 'milestone'
                      ? 'Milestone'
                      : a.type === 'locked' && a.progressNote
                        ? a.progressNote
                        : ''}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Section 3 — Currently Active ─── */

function ActiveSection() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-4">
          <IconTile size="lg" tint="chef">🍝</IconTile>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <SectionEyebrow color="primary">🔥 CURRENTLY ACTIVE</SectionEyebrow>
              <Pill variant="pending" size="sm">ONGOING</Pill>
            </div>
            <h3 className="font-serif mt-2 text-lg font-semibold text-sp-primary md:text-xl">
              Pasta from Scratch
            </h3>
            <p className="mt-1 text-xs text-sp-text-muted">
              Chef · Baby Level · Week 3 of 4 · Team: You + Sophie K.
            </p>
            <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-sp-border-soft">
              <div className="h-full rounded-full bg-sp-gold" style={{ width: '72%' }} />
            </div>
          </div>
        </div>
        <Link
          to="/projects/pasta-from-scratch/workspace"
          className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg bg-sp-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
        >
          Open Project →
        </Link>
      </div>
    </div>
  )
}

/* ─── Page export ─── */

export function AccountPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader />

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-6">
          <ProfileCard />
          <LevelProgressCard />
          <CategoriesCard />
        </div>

        <div className="space-y-6">
          <InvitationsCard />
          <AchievementsCard />
        </div>
      </div>

      <ActiveSection />
    </div>
  )
}