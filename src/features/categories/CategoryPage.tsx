import { ProjectCard } from '../../components/cards'
import { LEVELS, LEVEL_LIST } from '../../lib/constants/levels'
import { CHEF_BABY_PROJECTS } from '../../data/mock/projects'
import { CURRENT_USER } from '../../data/mock/users'

export function CategoryPage() {
  const userLevelOrder = LEVELS[CURRENT_USER.currentLevel].sortOrder

  return (
    <div className="flex flex-col gap-8">
      {/* Section 1 — Hero card */}
      <section
        className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, #F4D9CC 0%, #D26B4A 100%)',
        }}
      >
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl">
                🍳
              </div>
              <h1 className="font-serif text-4xl font-semibold tracking-normal text-white md:text-5xl">
                Chef
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Cooking, baking, taste tests, hygiene. Children explore food science, nutrition, and
              the basics of running a real kitchen.
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-6 md:gap-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  TOTAL PROJECTS
                </p>
                <p className="font-serif mt-1 text-2xl font-semibold text-white md:text-3xl">28</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  AGE RANGE
                </p>
                <p className="font-serif mt-1 text-2xl font-semibold text-white md:text-3xl">4–18</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  AVG. DURATION
                </p>
                <p className="font-serif mt-1 text-2xl font-semibold text-white md:text-3xl">4 wks</p>
              </div>
            </div>
          </div>

          <div className="min-w-[200px] flex-shrink-0 rounded-xl bg-white/95 p-4 backdrop-blur-sm md:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-sp-text-muted">
              YOUR STATUS
            </p>
            <p className="font-serif mt-2 flex items-center gap-2 text-lg font-semibold text-sp-primary">
              <span className="text-sp-gold">⭐⭐</span> Baby Level
            </p>
            <p className="mt-1 text-xs text-sp-text-muted">
              7 stars in Chef · 5 projects done
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sp-border-soft">
              <div className="h-full rounded-full bg-sp-gold" style={{ width: '70%' }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-sp-coral hover:underline">
              3 stars to Junior →
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Level tabs */}
      <div className="overflow-x-auto rounded-xl border border-sp-border-soft bg-white p-2">
        <div className="flex min-w-max items-center gap-1">
          {LEVEL_LIST.map((level) => {
            const isActive = level.slug === 'baby'
            const isCompleted = level.sortOrder < userLevelOrder
            const isLocked = level.sortOrder > userLevelOrder
            const isPremium = level.isPremium

            return (
              <button
                key={level.slug}
                type="button"
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors md:px-4 md:text-sm ${
                  isActive
                    ? 'bg-sp-primary text-white'
                    : isCompleted
                      ? 'bg-sp-accent-green-bg text-sp-accent-green hover:bg-sp-accent-green/20'
                      : isPremium
                        ? 'bg-sp-gold-bg-soft text-sp-gold'
                        : isLocked
                          ? 'bg-sp-bg-card-muted text-sp-text-muted'
                          : 'bg-white text-sp-text-muted'
                }`}
              >
                <span aria-hidden="true">{level.starsDisplay}</span>
                <span>{level.label}</span>
                {isCompleted && <span className="text-[10px]">5/5</span>}
                {isActive && <span className="text-[10px]">5/7</span>}
                {isLocked && !isPremium && (
                  <span className="text-[10px]">🔒 {level.minAge}+</span>
                )}
                {isPremium && <span className="text-[10px]">🔒 PREMIUM</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section 3 — Project list */}
      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-xl font-semibold tracking-normal text-sp-primary md:text-2xl">
            Baby Level Projects · Chef
          </h2>
          <p className="whitespace-nowrap text-xs text-sp-text-muted">
            7 projects · need 10 stars to advance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {CHEF_BABY_PROJECTS.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              href={`/projects/${p.slug}${p.status === 'ongoing' ? '/workspace' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Section 4 — Junior locked banner */}
      <section className="flex flex-col gap-4 rounded-xl border border-sp-border-soft bg-white p-5 md:flex-row md:items-center md:p-6">
        <div className="flex flex-1 items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sp-bg-card-muted text-2xl">
            🔒
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-sp-primary md:text-lg">
              Junior Level is locked
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-sp-text-muted">
              Earn 3 more stars at Baby Level to unlock Junior. Recommended age: 8+ (Lukas is 9 ✓
              age-eligible).
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex-shrink-0 whitespace-nowrap rounded-lg bg-sp-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
        >
          View Baby Projects
        </button>
      </section>
    </div>
  )
}