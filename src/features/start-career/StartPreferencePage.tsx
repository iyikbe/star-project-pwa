import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORY_LIST } from '../../lib/constants/categories'

export function StartPreferencePage() {
  const navigate = useNavigate()

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(['chef', 'farm', 'community']),
  )

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const canContinue = selectedCategories.size >= 2

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="inline-flex w-fit rounded-full bg-sp-coral-bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sp-coral">
            STEP 1 OF 2
          </span>
          <p className="text-sm text-sp-text-muted">
            <span className="font-semibold text-sp-primary">{selectedCategories.size} of 9 selected</span>
            {' · Minimum 2 required'}
          </p>
        </div>
        <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
          What career paths interest Lukas?
        </h1>
        <p className="max-w-2xl text-sm text-sp-text-muted">
          Choose at least 2 categories. We&apos;ll use these to recommend projects suited to age,
          level, and interests. You can change them anytime.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {CATEGORY_LIST.map((cat) => {
          const isSelected = selectedCategories.has(cat.slug)
          return (
            <button
              key={cat.slug}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleCategory(cat.slug)}
              className={`relative flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? 'border-sp-accent-green bg-sp-accent-green-bg'
                  : 'border-sp-border-soft bg-white hover:border-sp-primary/30'
              }`}
            >
              {isSelected && (
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-sp-accent-green text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
              <span className="text-4xl" aria-hidden="true">{cat.emoji}</span>
              <h3 className="text-base font-semibold text-sp-primary">{cat.label}</h3>
              <p className="text-sm leading-relaxed text-sp-text-muted">{cat.description}</p>
            </button>
          )
        })}
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between border-t border-sp-border-soft pt-4">
        <Link
          to="/account"
          className="text-sm font-semibold text-sp-text-muted transition-colors hover:text-sp-primary"
        >
          ← Back
        </Link>
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => navigate('/start')}
          className="rounded-lg bg-sp-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Project Listing →
        </button>
      </div>
    </div>
  )
}