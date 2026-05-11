import { Link } from 'react-router-dom'

type Level = {
  id: string
  label: string
  icon: string
  progress: string
  status: 'active' | 'current' | 'locked'
  unlockNote?: string
}

type Project = {
  id: string
  icon: string
  title: string
  statusLabel: string
  statusStyle: 'done' | 'ongoing' | 'available'
  description: string
  footerLeft: string
  cta: string
  ctaLink: string
}

const LEVELS: Level[] = [
  { id: 'tiny', label: 'Tiny', icon: '⭐', progress: '5/5', status: 'active' },
  { id: 'baby', label: 'Baby', icon: '⭐⭐', progress: '5/7', status: 'current' },
  { id: 'junior', label: 'Junior', icon: '⭐⭐⭐', progress: '🔒 8+', status: 'locked' },
  { id: 'young', label: 'Young', icon: '⭐⭐⭐⭐', progress: '🔒 10+', status: 'locked' },
  { id: 'senior', label: 'Senior', icon: '⭐⭐⭐⭐⭐', progress: '🔒 13+', status: 'locked' },
  { id: 'legendary', label: 'Legendary', icon: '🏆', progress: '🔒 15+', status: 'locked' },
  { id: 'mythical', label: 'Mythical', icon: '✨', progress: '🔒 PREMIUM', status: 'locked' },
]

const PROJECTS: Project[] = [
  {
    id: 'ice-cream',
    icon: '🍦',
    title: 'The Ice Cream Project',
    statusLabel: '✓ DONE',
    statusStyle: 'done',
    description: 'Completed Mar 12, 2026 with Sophie K.',
    footerLeft: '⭐ Earned',
    cta: 'REPLAY',
    ctaLink: '#',
  },
  {
    id: 'salad',
    icon: '🥗',
    title: 'Healthy Salad Designer',
    statusLabel: '✓ DONE',
    statusStyle: 'done',
    description: 'Completed Feb 22, 2026 with Sophie K.',
    footerLeft: '⭐ Earned',
    cta: 'REPLAY',
    ctaLink: '#',
  },
  {
    id: 'pasta',
    icon: '🍝',
    title: 'Pasta from Scratch',
    statusLabel: '🔥 ONGOING',
    statusStyle: 'ongoing',
    description: 'Week 3 of 4 · You + Sophie K. · Continue project',
    footerLeft: '1 Star',
    cta: 'CONTINUE →',
    ctaLink: '/projects/1/workspace',
  },
  {
    id: 'brezel',
    icon: '🥨',
    title: 'Brezel Workshop',
    statusLabel: '⭐⭐ BABY',
    statusStyle: 'available',
    description: 'The classic German pretzel — dough, boil, bake.',
    footerLeft: '1 Star',
    cta: 'AGE 6+',
    ctaLink: '#',
  },
  {
    id: 'apfelkuchen',
    icon: '🥧',
    title: 'Apfelkuchen Challenge',
    statusLabel: '⭐⭐ BABY',
    statusStyle: 'available',
    description: 'Bake a classic German apple pie with seasonal apples.',
    footerLeft: '1 Star',
    cta: 'AGE 6+',
    ctaLink: '#',
  },
  {
    id: 'pizza',
    icon: '🍕',
    title: 'Family Pizza Night',
    statusLabel: '⭐⭐ BABY',
    statusStyle: 'available',
    description: 'Dough from scratch + 3 family-pleasing toppings.',
    footerLeft: '1 Star',
    cta: 'AGE 6+',
    ctaLink: '#',
  },
  {
    id: 'pancake',
    icon: '🥞',
    title: 'Pancake Breakfast Service',
    statusLabel: '⭐⭐ BABY',
    statusStyle: 'available',
    description: 'Run a Saturday breakfast for your family — plan, cook, serve.',
    footerLeft: '1 Star',
    cta: 'AGE 6+',
    ctaLink: '#',
  },
]

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › Start Your Career › Chef</p>
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

function CategoryHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE1D8] text-2xl">
          🍳
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">Chef</h1>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5B6472]">
        Cooking, baking, taste tests, hygiene. Children explore food science, nutrition, and the
        basics of running a real kitchen.
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <div className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-4 py-2.5 text-center shadow-sm">
          <p className="text-sm font-bold text-[#26483E]">28</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
            TOTAL PROJECTS
          </p>
        </div>
        <div className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-4 py-2.5 text-center shadow-sm">
          <p className="text-sm font-bold text-[#26483E]">4–18</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
            AGE RANGE
          </p>
        </div>
        <div className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-4 py-2.5 text-center shadow-sm">
          <p className="text-sm font-bold text-[#26483E]">4 wks</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
            AVG. DURATION
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-5 py-3 shadow-sm">
        <p className="text-sm font-semibold text-[#172033]">⭐⭐ Baby Level</p>
        <p className="mt-0.5 text-xs text-[#5B6472]">
          7 stars in Chef · 5 projects done
        </p>
        <p className="mt-0.5 text-xs font-medium text-[#26483E]">3 stars to Junior →</p>
      </div>
    </div>
  )
}

function LevelNav() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#8A8F98]">
        Levels
      </p>
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
        {LEVELS.map((level) => {
          const isActive = level.status === 'active'
          const isCurrent = level.status === 'current'
          const isLocked = level.status === 'locked'

          return (
            <button
              key={level.id}
              type="button"
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors lg:w-full ${
                isCurrent
                  ? 'bg-[#DDEBDD] text-[#26483E] ring-1 ring-[#26483E]'
                  : isActive
                    ? 'bg-[#F4EFE7] text-[#172033]'
                    : 'text-[#8A8F98] hover:bg-[#F4EFE7]'
              }`}
            >
              <span className="w-12 text-xs">{level.icon}</span>
              <span className="flex-1 text-sm font-medium">{level.label}</span>
              <span className={`text-xs ${isLocked ? 'text-[#C96B5A]' : 'text-[#5B6472]'}`}>
                {level.progress}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const statusColors: Record<string, string> = {
    done: 'bg-[#DDEBDD] text-[#26483E]',
    ongoing: 'bg-[#FCE1D8] text-[#C96B5A]',
    available: 'bg-[#F4EFE7] text-[#5B6472]',
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4EFE7] text-lg">
        {project.icon}
      </span>
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-[#172033]">{project.title}</h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColors[project.statusStyle]}`}
          >
            {project.statusLabel}
          </span>
        </div>
        <p className="text-xs text-[#5B6472]">{project.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-[#8A8F98]">{project.footerLeft}</span>
          {project.statusStyle === 'available' ? (
            <span className="text-xs font-medium text-[#8A8F98]">{project.cta}</span>
          ) : (
            <Link
              to={project.ctaLink}
              className={`text-xs font-semibold underline underline-offset-2 ${
                project.statusStyle === 'done'
                  ? 'text-[#5B6472]'
                  : 'text-[#26483E]'
              }`}
            >
              {project.cta}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function LockedLevelCard() {
  return (
    <div className="mt-8 rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#172033]">🔒 Junior Level is locked</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5B6472]">
            Earn 3 more stars at Baby Level to unlock Junior. Recommended age: 8+ (Lukas is 9 ✓
            age-eligible).
          </p>
        </div>
        <Link
          to="#"
          className="shrink-0 rounded-full border border-[#E8E1D8] bg-[#FFFDF8] px-5 py-2 text-xs font-medium text-[#5B6472] transition-colors hover:border-[#26483E] hover:text-[#26483E]"
        >
          View Baby Projects
        </Link>
      </div>
    </div>
  )
}

export function CategoryPage() {
  return (
    <div>
      <TopBar />
      <CategoryHeader />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div>
          <LevelNav />
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-base font-bold text-[#172033]">Baby Level Projects · Chef</h2>
            <p className="mt-0.5 text-xs text-[#5B6472]">
              7 projects · need 10 stars to advance
            </p>
          </div>

          <div className="space-y-3">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <LockedLevelCard />
        </div>
      </div>
    </div>
  )
}