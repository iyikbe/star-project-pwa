import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../../components/cards'
import {
  LISTING_POPULAR,
  LISTING_NEW_STARS,
  LISTING_RECOMMENDED,
  LISTING_MYTHICAL,
} from '../../data/mock/projects'
import type { ProjectCardData } from '../../components/cards/ProjectCard'

type FilterState = 'all' | 'chef' | 'farm' | 'community'

function renderSection(
  emoji: string,
  title: string,
  subtitle: string | null,
  rightBadge: ReactNode | null,
  projects: ProjectCardData[],
) {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
              <span aria-hidden="true">{emoji}</span> {title}
            </h2>
            {rightBadge}
          </div>
          {subtitle && <p className="mt-1 text-xs text-sp-text-muted">{subtitle}</p>}
        </div>
        <a href="#" className="whitespace-nowrap text-sm font-semibold text-sp-coral hover:underline">
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} href={`/projects/${p.slug}`} />
        ))}
      </div>
    </section>
  )
}

export function ProjectListingPage() {
  const [activeCategory, setActiveCategory] = useState<FilterState>('all')
  const [activeLevel, setActiveLevel] = useState<string>('all')

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            Start Your Career
          </h1>
          <p className="mt-1 text-sm text-sp-text-muted">
            Discover projects suited to your age, level, and interests.
          </p>
        </div>
        <Link
          to="/start/preference"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
        >
          ⚙️ Edit Preferences
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sp-border-soft bg-white p-3 md:p-4">
        <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-sp-text-muted">
          FILTER:
        </span>

        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeCategory === 'all'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          All Categories
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('chef')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeCategory === 'chef'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          🍳 Chef
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('farm')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeCategory === 'farm'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          🌱 Farm
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('community')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeCategory === 'community'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          🤝 Community
        </button>
        <button
          type="button"
          className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-sp-text-muted transition-colors hover:bg-sp-border-soft hover:text-sp-primary"
          style={{ background: '#F5EFE4' }}
        >
          + Add
        </button>

        <span className="mx-1 h-5 w-px bg-sp-border-soft" />

        <button
          type="button"
          onClick={() => setActiveLevel('all')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeLevel === 'all'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          All Levels
        </button>
        <button
          type="button"
          onClick={() => setActiveLevel('available')}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeLevel === 'available'
              ? 'bg-sp-primary text-white'
              : 'bg-sp-bg-card-muted text-sp-text-muted hover:bg-sp-border-soft hover:text-sp-primary'
          }`}
        >
          Available Only
        </button>

        <div className="relative ml-auto w-full sm:w-auto">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-sp-text-muted"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full rounded-full border border-sp-border-input bg-white py-1.5 pl-9 pr-4 text-sm outline-none focus:border-sp-primary sm:w-48"
          />
        </div>
      </div>

      {/* 4 sections */}
      {renderSection('🔥', 'Popular Right Now', null, null, LISTING_POPULAR)}

      {renderSection('✨', 'New Stars · Just Released', null, null, LISTING_NEW_STARS)}

      {renderSection(
        '🎯',
        'Recommended for You',
        'based on your level & preferences',
        null,
        LISTING_RECOMMENDED,
      )}

      {/* Mythical section — manual render for PREMIUM badge */}
      <section>
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
                <span aria-hidden="true">✨</span> Mythical Projects
              </h2>
              <span className="inline-flex items-center rounded-full bg-sp-gold-bg-soft px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-sp-gold">
                PREMIUM
              </span>
            </div>
          </div>
          <p className="whitespace-nowrap text-xs text-sp-text-muted">
            Expert-led · €50 per star
          </p>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {LISTING_MYTHICAL.map((p) => (
            <ProjectCard key={p.id} project={p} href={`/projects/${p.slug}`} />
          ))}
        </div>
      </section>
    </div>
  )
}