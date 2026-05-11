import { Link } from 'react-router-dom'

type ProjectCardData = {
  id: string
  category: string
  icon: string
  level: string
  title: string
  description: string
  footerLeft: string
  footerRight: string
  locked?: boolean
  mythical?: boolean
}

const popularProjects: ProjectCardData[] = [
  {
    id: 'ice-cream-popular',
    category: 'CHEF',
    icon: '🍦',
    level: 'TINY',
    title: 'The Ice Cream Project',
    description: 'Survey, build, test, improve — make your own ice cream from scratch.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 4+',
  },
  {
    id: 'pasta-popular',
    category: 'CHEF',
    icon: '🍝',
    level: 'BABY',
    title: 'Pasta from Scratch',
    description: 'Make handmade pasta with traditional techniques + your own sauce.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 6+',
  },
  {
    id: 'sunflower-popular',
    category: 'FARM',
    icon: '🌻',
    level: 'BABY',
    title: 'Sunflower Garden',
    description: 'Plan, plant, and document a small sunflower garden over 4 weeks.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 6+',
  },
  {
    id: 'art-wall-popular',
    category: 'COMMUNITY',
    icon: '🎨',
    level: 'BABY',
    title: 'Neighborhood Art Wall',
    description: 'Plan and create a small neighborhood art wall together.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 7+',
  },
]

const newStarsProjects: ProjectCardData[] = [
  {
    id: 'brezel-new',
    category: 'CHEF',
    icon: '🥨',
    level: 'BABY',
    title: 'Brezel Workshop',
    description: 'The classic German pretzel — learn the dough, the boil, and the bake.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 6+',
  },
  {
    id: 'pollinator-new',
    category: 'FARM',
    icon: '🐝',
    level: 'JUNIOR',
    title: 'Pollinator Garden Map',
    description: 'Survey local bees, plan, plant, and track a pollinator-friendly garden.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 8+',
  },
  {
    id: 'linebot-new',
    category: 'ROBOTICS',
    icon: '🤖',
    level: 'YOUNG',
    title: 'Line-Following Bot',
    description: 'Build a small robot that follows a path using sensors and code.',
    footerLeft: '★ 1 Star',
    footerRight: 'LOCKED · AGE 10+',
    locked: true,
  },
  {
    id: 'podcast-new',
    category: 'COMMUNITY',
    icon: '🎤',
    level: 'BABY',
    title: 'Family Story Podcast',
    description: 'Interview a family member; record, edit, and publish privately.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 7+',
  },
]

const recommendedProjects: ProjectCardData[] = [
  {
    id: 'apfelkuchen-rec',
    category: 'CHEF',
    icon: '🥧',
    level: 'BABY',
    title: 'Apfelkuchen Challenge',
    description: 'Bake a classic German apple pie with fresh seasonal apples.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 6+',
  },
  {
    id: 'tomatoes-rec',
    category: 'FARM',
    icon: '🍅',
    level: 'BABY',
    title: 'Window-Box Tomatoes',
    description: 'Grow your own tomatoes from seed in a window-box garden.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 6+',
  },
  {
    id: 'donation-rec',
    category: 'COMMUNITY',
    icon: '📦',
    level: 'BABY',
    title: 'Donation Drive',
    description: 'Plan and run a small donation drive for a local cause.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 7+',
  },
  {
    id: 'salad-rec',
    category: 'CHEF',
    icon: '🥗',
    level: 'JUNIOR',
    title: 'Five-Color Salad',
    description: 'Design a balanced salad with five natural colors and explain why.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 8+',
  },
]

const mythicalProjects: ProjectCardData[] = [
  {
    id: 'song-mythical',
    category: 'MYTHICAL',
    icon: '🎵',
    level: 'PREMIUM',
    title: 'Compose & Record an Original Song',
    description: 'Premium expert-led: compose, arrange, and record a track end-to-end.',
    footerLeft: '€150 · 3 stars',
    footerRight: 'AGE 13+',
    locked: true,
    mythical: true,
  },
  {
    id: 'plant-mythical',
    category: 'MYTHICAL',
    icon: '🤖',
    level: 'PREMIUM',
    title: 'AI-Powered Plant Caretaker',
    description: 'Build a smart sensor system with simple ML. Expert mentorship included.',
    footerLeft: '€100 · 2 stars',
    footerRight: 'AGE 15+',
    locked: true,
    mythical: true,
  },
  {
    id: 'film-mythical',
    category: 'MYTHICAL',
    icon: '🎬',
    level: 'PREMIUM',
    title: 'Short-Film Documentary',
    description: 'Plan, shoot, edit, and submit a 5-minute documentary with film expert.',
    footerLeft: '€150 · 3 stars',
    footerRight: 'AGE 13+',
    locked: true,
    mythical: true,
  },
  {
    id: 'fashion-mythical',
    category: 'MYTHICAL',
    icon: '👗',
    level: 'PREMIUM',
    title: 'Sustainable Fashion Capsule',
    description: 'Design, source, and produce a 3-piece sustainable wardrobe capsule.',
    footerLeft: '€100 · 2 stars',
    footerRight: 'AGE 13+',
    locked: true,
    mythical: true,
  },
]

type CardBg = {
  bg: string
  accent: string
}

const categoryStyles: Record<string, CardBg> = {
  CHEF: { bg: '#FCE1D8', accent: '#E98A6A' },
  FARM: { bg: '#DDEBDD', accent: '#6C9A63' },
  COMMUNITY: { bg: '#F2E2B8', accent: '#B88A3A' },
  ROBOTICS: { bg: '#DCEAF2', accent: '#5D8AA8' },
  MYTHICAL: { bg: 'linear-gradient(135deg, #26483E, #C9785A)', accent: '#F4C542' },
}

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › Start Your Career</p>
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

function PageHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
          Start Your Career
        </h1>
        <p className="mt-1 text-sm text-[#5B6472]">
          Discover projects suited to your age, level, and interests.
        </p>
      </div>
      <Link
        to="/start/preference"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E1D8] bg-[#FFFDF8] px-5 py-2.5 text-sm font-medium text-[#5B6472] shadow-sm transition-all hover:border-[#26483E] hover:text-[#26483E]"
      >
        ⚙️ Edit Preferences
      </Link>
    </div>
  )
}

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-[#26483E] bg-[#DDEBDD] text-[#26483E]'
          : 'border-[#E8E1D8] bg-[#FFFDF8] text-[#5B6472] hover:border-[#D8D3CA]'
      }`}
    >
      {children}
    </button>
  )
}

function FilterBar() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A8F98]">
        FILTER:
      </span>
      <FilterPill active>All Categories</FilterPill>
      <FilterPill>🍳 Chef</FilterPill>
      <FilterPill>🌱 Farm</FilterPill>
      <FilterPill>🤝 Community</FilterPill>
      <FilterPill>+ Add</FilterPill>
      <span className="hidden h-4 w-px bg-[#D8D3CA] sm:block" />
      <FilterPill>All Levels</FilterPill>
      <FilterPill>Available Only</FilterPill>
      <div className="ml-auto w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-full border border-[#E8E1D8] bg-[#FFFDF8] px-4 py-1.5 text-xs text-[#172033] placeholder-[#8A8F98] outline-none transition-colors focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E] sm:w-48"
        />
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectCardData }) {
  const style = categoryStyles[project.category] ?? categoryStyles.CHEF
  const levelDisplay =
    project.level === 'TINY'
      ? '⭐ TINY'
      : project.level === 'BABY'
        ? '⭐⭐ BABY'
        : project.level === 'JUNIOR'
          ? '⭐⭐⭐ JUNIOR'
          : project.level === 'YOUNG'
            ? '⭐⭐⭐⭐ YOUNG'
            : '⭐⭐⭐ × 3'

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] shadow-sm transition-shadow hover:shadow-md ${
        project.locked ? 'border-[#E8E1D8]' : 'border-[#E8E1D8]'
      }`}
    >
      <div
        className={`relative flex h-[110px] items-center justify-center ${
          project.locked && !project.mythical ? 'opacity-70' : ''
        }`}
        style={{ background: style.bg }}
      >
        <span
          className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: project.mythical ? '#F4C542' : '#5B6472' }}
        >
          {project.category}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            project.mythical
              ? 'bg-white/20 text-white'
              : 'bg-white/80 text-[#172033]'
          }`}
        >
          {levelDisplay}
        </span>
        <span className={`text-3xl ${project.locked ? 'opacity-50' : ''}`}>
          {project.icon}
        </span>
        {project.locked && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/5 text-lg">
            🔒
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-sm font-bold text-[#172033]">{project.title}</h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-[#8A8F98]">
          {project.description}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-[#E8E1D8] pt-2.5">
          <span className="text-xs text-[#5B6472]">{project.footerLeft}</span>
          <span className="text-xs font-medium text-[#172033]">{project.footerRight}</span>
        </div>
      </div>
    </div>
  )
}

function ProjectSection({
  title,
  note,
  badge,
  projects,
  viewAllLink,
}: {
  title: string
  note?: string
  badge?: string
  projects: ProjectCardData[]
  viewAllLink: string
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[#172033]">{title}</h2>
          {badge && (
            <span className="rounded-full bg-[#26483E] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              {badge}
            </span>
          )}
        </div>
        <a
          href={viewAllLink}
          className="text-xs font-medium text-[#26483E] underline underline-offset-2"
        >
          View all →
        </a>
      </div>
      {note && <p className="-mt-3 mb-4 text-xs text-[#8A8F98]">{note}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

export function ProjectListingPage() {
  return (
    <div>
      <TopBar />
      <PageHeader />
      <FilterBar />

      <ProjectSection
        title="🔥 Popular Right Now"
        projects={popularProjects}
        viewAllLink="#"
      />
      <ProjectSection
        title="✨ New Stars · Just Released"
        projects={newStarsProjects}
        viewAllLink="#"
      />
      <ProjectSection
        title="🎯 Recommended for You"
        note="based on your level &amp; preferences"
        projects={recommendedProjects}
        viewAllLink="#"
      />
      <ProjectSection
        title="✨ Mythical Projects"
        badge="PREMIUM"
        note="Expert-led · €50 per star"
        projects={mythicalProjects}
        viewAllLink="#"
      />
    </div>
  )
}