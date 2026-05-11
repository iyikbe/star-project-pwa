import { Link } from 'react-router-dom'

type Project = {
  id: string
  category: string
  icon: string
  level: string
  cardCategoryBg: string
  title: string
  description: string
  footerLeft: string
  footerRight: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  avatarBg: string
  avatarColor: string
}

type Stat = {
  value: string
  label: string
  source: string
}

type Feature = {
  icon: string
  title: string
  description: string
}

const HERO_STATS: Stat[] = [
  { value: '9', label: 'Career Paths', source: '' },
  { value: '4–5', label: 'Week Projects', source: '' },
  { value: '€29', label: '/month Family', source: '' },
]

const RESEARCH_STATS: Stat[] = [
  {
    value: '39%',
    label: 'of teens uncertain about their future career',
    source: 'OECD/PISA 2022',
  },
  {
    value: '70K',
    label: 'vacant apprenticeship positions in Germany',
    source: 'end of 2023',
  },
  {
    value: '39%',
    label: 'of key job skills expected to change by 2030',
    source: 'WEF Future of Jobs',
  },
  {
    value: '66',
    label: 'studies support project-based learning outcomes',
    source: 'meta-analysis',
  },
]

const FEATURES: Feature[] = [
  {
    icon: '🔨',
    title: 'Real-World Projects',
    description:
      'Children build, cook, code, design, and create real things — not just worksheets. Each project follows a research-to-completion cycle.',
  },
  {
    icon: '👥',
    title: 'Teamwork by Design',
    description:
      'Projects require a partner. Children learn to collaborate, share tasks, and celebrate together. No solo sprints.',
  },
  {
    icon: '🧭',
    title: 'Career Path Orientation',
    description:
      'Nine career categories from Chef to Robotics. Children explore different fields, discover what they love, and build real skills early.',
  },
]

const PROJECTS: Project[] = [
  {
    id: 'ice-cream',
    category: 'CHEF',
    icon: '🍦',
    level: 'TINY',
    cardCategoryBg: '#FCE1D8',
    title: 'The Ice Cream Project',
    description:
      'Survey, build, test, improve — make your own ice cream from scratch.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 4+',
  },
  {
    id: 'greenhouse',
    category: 'FARM',
    icon: '🌱',
    level: 'JUNIOR',
    cardCategoryBg: '#DDEBDD',
    title: 'Mini Greenhouse Build',
    description:
      'Design, build, and monitor a small greenhouse with sensors.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 8+',
  },
  {
    id: 'line-bot',
    category: 'ROBOTICS',
    icon: '🤖',
    level: 'YOUNG',
    cardCategoryBg: '#DCEAF2',
    title: 'Line-Following Bot',
    description:
      'Build a small robot that follows a path using sensors and code.',
    footerLeft: '★ 1 Star',
    footerRight: 'AGE 10+',
  },
  {
    id: 'song',
    category: 'MYTHICAL',
    icon: '✨',
    level: 'PREMIUM',
    cardCategoryBg: 'linear-gradient(135deg, #26483E, #C9785A)',
    title: 'Compose & Record an Original Song',
    description:
      'Premium expert-led: compose, arrange, and record a track end-to-end.',
    footerLeft: '€50 / star',
    footerRight: 'AGE 13+',
  },
]

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'My daughter went from watching videos all day to actually building a small herb garden. She\'s proud of it. That\'s worth €29 a month.',
    name: 'Anna M.',
    role: 'Parent · Kassel',
    initials: 'AM',
    avatarBg: '#FCE1D8',
    avatarColor: '#E98A6A',
  },
  {
    quote:
      'I learned how to interview real people for my chef project. Now I want to open my own ice cream shop someday.',
    name: 'Lukas S., age 9',
    role: 'Chef · Tiny Level',
    initials: 'LS',
    avatarBg: '#DDEBDD',
    avatarColor: '#6C9A63',
  },
  {
    quote:
      'The team requirement felt strange at first, but it\'s the best part. My son and his cousin actually plan things together now.',
    name: 'Thomas K.',
    role: 'Parent · Hessen',
    initials: 'TK',
    avatarBg: '#DCEAF2',
    avatarColor: '#5D8AA8',
  },
]

function HeroSection() {
  return (
    <section className="bg-[#26483E] px-6 py-20 text-[#FFFDF8] md:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#547C6A] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F4C542]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F4C542]" />
          Now Live in Kassel
        </span>

        <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          Let&apos;s Create
          <br />
          Something Real.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D8D3CA] md:text-lg">
          Star Project helps children ages 4–18 discover future careers by completing real-world
          projects, working in teams, and earning recognition for their work. No passive videos.
          Just real creating.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-[#F29B7F] px-8 py-3.5 text-sm font-bold text-[#1F3D35] shadow-md transition-all hover:bg-[#F7B98D] hover:shadow-lg"
          >
            Start Your Career
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#547C6A] px-8 py-3.5 text-sm font-semibold text-[#FFFDF8] transition-colors hover:bg-[#1F3D35]"
          >
            Watch How It Works
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
          {HERO_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-x-10">
              <div>
                <span className="text-2xl font-bold text-[#F4C542]">{stat.value}</span>
                <span className="ml-1.5 text-sm text-[#D8D3CA]">{stat.label}</span>
              </div>
              {i < HERO_STATS.length - 1 && (
                <span className="hidden h-8 w-px bg-[#547C6A] sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResearchSection() {
  const icons = ['📊', '🔧', '📈', '📚']
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Why It Matters
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Career uncertainty is real.
          <br />
          Project-based learning helps.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EFE7] text-lg">
                {icons[i]}
              </div>
              <p className="text-4xl font-bold text-[#26483E]">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#172033]">{stat.label}</p>
              <p className="mt-3 text-xs text-[#8A8F98]">Source: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Why Choose Us
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Built for real discovery
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EFE7] text-2xl transition-colors group-hover:bg-[#26483E]/10">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#172033]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, isMythical }: { project: Project; isMythical?: boolean }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] shadow-sm transition-shadow hover:shadow-md">
      <div
        className="relative flex h-[120px] items-center justify-center"
        style={{ background: project.cardCategoryBg }}
      >
        <span
          className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: isMythical ? '#F4C542' : '#5B6472' }}
        >
          {project.category}
        </span>

        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            isMythical
              ? 'bg-white/20 text-white'
              : 'bg-white/80 text-[#172033]'
          }`}
        >
          {project.level === 'TINY'
            ? '⭐ TINY'
            : project.level === 'JUNIOR'
              ? '⭐⭐⭐ JUNIOR'
              : project.level === 'YOUNG'
                ? '⭐⭐⭐⭐ YOUNG'
                : '⭐⭐⭐ × 3'}
        </span>

        <span className="text-4xl">{project.icon}</span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-base font-semibold tracking-tight text-[#172033]">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#8A8F98]">
          {project.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-[#E8E1D8] pt-3">
          <span className="text-xs text-[#5B6472]">{project.footerLeft}</span>
          <span className="text-xs font-medium text-[#172033]">{project.footerRight}</span>
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F29B7F]">
              NEWLY RELEASED
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
              Fresh projects, ready to start.
            </h2>
          </div>
          <Link
            to="/start"
            className="hidden shrink-0 text-sm font-medium text-[#26483E] transition-colors hover:text-[#547C6A] md:inline-flex md:items-center md:gap-1"
          >
            View All Projects →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isMythical={project.id === 'song'}
            />
          ))}
        </div>

        <Link
          to="/start"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#26483E] transition-colors hover:text-[#547C6A] md:hidden"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F29B7F]">
          FROM OUR FAMILIES
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          What parents and children say.
        </h2>
        <p className="mt-2 text-sm text-[#5B6472]">
          Public testimonials shared with explicit parent consent.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-5 shadow-sm"
            >
              <p className="text-sm italic leading-relaxed text-[#5B6472]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: t.avatarBg, color: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#172033]">{t.name}</p>
                  <p className="text-xs text-[#8A8F98]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="bg-[#26483E] px-6 py-20 text-center text-[#FFFDF8] md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to start your child&apos;s real-world journey?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#D8D3CA]">
          Join families in Kassel who are helping their children discover careers through real
          projects, teamwork, and guided discovery.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#F29B7F] px-10 py-3.5 text-sm font-bold text-[#1F3D35] shadow-md transition-all hover:bg-[#F7B98D] hover:shadow-lg"
        >
          Create Account
        </Link>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ResearchSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  )
}