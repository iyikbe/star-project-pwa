type Project = {
  id: string
  category: string
  icon: string
  categoryBg: string
  categoryAccent: string
  title: string
  description: string
  stars: number
  ageRange: string
  duration: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
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
      'Projects require a partner. Children learn to collaborate, share tasks, and celebrate共同成就 together. No solo sprints.',
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
    category: 'Chef',
    icon: '🍳',
    categoryBg: '#FCE1D8',
    categoryAccent: '#E98A6A',
    title: 'The Ice Cream Project',
    description:
      'Research, create, and present your own original ice cream flavour. Learn about ingredients, freezing techniques, and taste testing.',
    stars: 1,
    ageRange: '6–10',
    duration: '4 weeks',
  },
  {
    id: 'greenhouse',
    category: 'Farm',
    icon: '🌱',
    categoryBg: '#DDEBDD',
    categoryAccent: '#6C9A63',
    title: 'Mini Greenhouse Build',
    description:
      'Design and build a working mini greenhouse. Learn about plant biology, temperature control, and sustainable growing.',
    stars: 1,
    ageRange: '8–12',
    duration: '4 weeks',
  },
  {
    id: 'line-bot',
    category: 'Robotics',
    icon: '🤖',
    categoryBg: '#DCEAF2',
    categoryAccent: '#5D8AA8',
    title: 'Line-Following Bot',
    description:
      'Build and program a robot that follows a line. Learn about sensors, logic, and iterative testing.',
    stars: 1,
    ageRange: '10–14',
    duration: '5 weeks',
  },
  {
    id: 'song',
    category: 'Music',
    icon: '🎵',
    categoryBg: '#E6DDF4',
    categoryAccent: '#7B61A8',
    title: 'Compose & Record an Original Song',
    description:
      'Write lyrics, compose a melody, and record your own original song. Learn about song structure and digital recording.',
    stars: 1,
    ageRange: '8–14',
    duration: '4 weeks',
  },
]

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'My daughter used to think she wasn\'t good at anything. After the Ice Cream Project, she can\'t stop talking about being a chef. It\'s incredible to see her confidence grow.',
    name: 'Sarah M.',
    role: 'Parent of a 9-year-old',
    initials: 'SM',
  },
  {
    quote:
      'The team project requirement was a genius idea. My son learned more about collaboration in one project than in a whole semester of group work at school.',
    name: 'Thomas K.',
    role: 'Parent of an 11-year-old',
    initials: 'TK',
  },
  {
    quote:
      'As a teacher, I wish every child had access to this approach. It\'s hands-on, structured, and actually prepares them for the real world.',
    name: 'Dr. Elena V.',
    role: 'Education researcher, Kassel',
    initials: 'EV',
  },
]

function HeroSection() {
  return (
    <section className="bg-[#26483E] px-6 py-16 text-[#FFFDF8] md:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="inline-block rounded-full border border-[#547C6A] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F4C542]">
          Now Live in Kassel
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-tight">
          Let&apos;s Create
          <br />
          Something Real.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#D8D3CA] md:text-lg">
          Star Project helps children ages 4–18 discover future careers by completing real-world
          projects, working in teams, and earning recognition for their work. No passive videos.
          Just real creating.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-[#F29B7F] px-8 py-3 text-sm font-bold text-[#1F3D35] transition-colors hover:bg-[#F7B98D]"
          >
            Start Your Career
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#547C6A] px-8 py-3 text-sm font-semibold text-[#FFFDF8] transition-colors hover:bg-[#1F3D35]"
          >
            Watch How It Works
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-8">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <span className="text-2xl font-bold text-[#F4C542]">{stat.value}</span>
              <span className="ml-1.5 text-sm text-[#D8D3CA]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResearchSection() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Why It Matters
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Career uncertainty is real.
          <br />
          Project-based learning helps.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm"
            >
              <p className="text-4xl font-bold text-[#26483E]">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#172033]">{stat.label}</p>
              <p className="mt-2 text-xs text-[#8A8F98]">Source: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Why Choose Us
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Built for real discovery
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-8 shadow-sm"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-5 text-lg font-bold text-[#172033]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5B6472]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: project.categoryBg }}>
        <span className="text-2xl">{project.icon}</span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ background: project.categoryAccent }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-base font-bold text-[#172033]">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5B6472]">{project.description}</p>

        <div className="mt-4 flex items-center justify-between border-t border-[#E8E1D8] pt-4 text-xs text-[#8A8F98]">
          <span className="flex items-center gap-1">
            <span className="text-[#F4C542]">★</span> {project.stars} Star
          </span>
          <span>{project.ageRange} years</span>
          <span>{project.duration}</span>
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Newly Released
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Start your next adventure
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Trusted by parents and educators
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-[#5B6472]">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26483E] text-sm font-bold text-white">
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

        <p className="mt-8 text-center text-xs text-[#8A8F98]">
          All testimonials are shared with explicit parent consent.
        </p>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="bg-[#26483E] px-6 py-16 text-center text-[#FFFDF8] md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to start your child&apos;s real-world journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#D8D3CA]">
          Join families in Kassel who are helping their children discover careers through real
          projects, teamwork, and guided discovery.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#F29B7F] px-10 py-3.5 text-sm font-bold text-[#1F3D35] transition-colors hover:bg-[#F7B98D]"
        >
          Create Account
        </Link>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

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