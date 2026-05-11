import { useState } from 'react'
import { Link } from 'react-router-dom'

type Category = {
  id: string
  label: string
  icon: string
  description: string
  bg: string
  accent: string
}

const CAREER_CATEGORIES: Category[] = [
  {
    id: 'chef',
    label: 'Chef',
    icon: '🍳',
    description: 'Cooking, baking, taste tests, hygiene. Perfect for hands-on kids who love food.',
    bg: '#FCE1D8',
    accent: '#E98A6A',
  },
  {
    id: 'automotive',
    label: 'Automotive',
    icon: '🚗',
    description: 'Vehicles, mobility, mechanics, future transport concepts.',
    bg: '#DDE7F2',
    accent: '#5A7FA3',
  },
  {
    id: 'farm',
    label: 'Farm',
    icon: '🌱',
    description: 'Nature, food growth, sustainability, small experiments outdoors.',
    bg: '#DDEBDD',
    accent: '#6C9A63',
  },
  {
    id: 'robotics',
    label: 'Robotics',
    icon: '🤖',
    description: 'Sensors, automation, simple robot logic, building moving machines.',
    bg: '#DCEAF2',
    accent: '#5D8AA8',
  },
  {
    id: 'media',
    label: 'Media Creator',
    icon: '🎬',
    description: 'Video, storytelling, presentation, project review and editing.',
    bg: '#E8E1F2',
    accent: '#7E6BA8',
  },
  {
    id: 'community',
    label: 'Community Builder',
    icon: '🤝',
    description: 'Local impact, social problem-solving, service projects.',
    bg: '#F2E2B8',
    accent: '#B88A3A',
  },
  {
    id: 'software',
    label: 'Software Creator',
    icon: '💻',
    description: 'Logic, algorithms, simple apps, digital project concepts.',
    bg: '#DDE9F4',
    accent: '#4F7EA8',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: '👗',
    description: 'Design, materials, sustainable style, textile projects.',
    bg: '#F1DDE8',
    accent: '#A85F86',
  },
  {
    id: 'music',
    label: 'Music',
    icon: '🎵',
    description: 'Rhythm, recording, audio production, creative sound projects.',
    bg: '#E6DDF4',
    accent: '#7B61A8',
  },
]

const INITIAL_SELECTED = new Set(['chef', 'farm', 'community'])

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">
        Star Project › Start Your Career › Preference Input
      </p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Guardian: Anna M.</p>
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

function StepLabel() {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F29B7F]">
      Step 1 of 2
    </p>
  )
}

function PageHeader() {
  return (
    <div className="mt-2">
      <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
        What career paths interest Lukas?
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5B6472]">
        Choose at least 2 categories. We&apos;ll use these to recommend projects suited to age,
        level, and interests. You can change them anytime.
      </p>
    </div>
  )
}

function CategoryCard({
  category,
  isSelected,
  onToggle,
}: {
  category: Category
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
        isSelected
          ? 'border-[#26483E] ring-1 ring-[#26483E]'
          : 'border-[#E8E1D8] hover:border-[#D8D3CA]'
      }`}
      style={{ background: isSelected ? category.bg : '#FFFDF8' }}
    >
      {isSelected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#26483E] text-[10px] font-bold text-white">
          ✓
        </span>
      )}

      <span className="text-2xl">{category.icon}</span>
      <p className="mt-3 text-sm font-bold text-[#172033]">{category.label}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-[#5B6472]">{category.description}</p>
    </button>
  )
}

function CategoryGrid() {
  const [selected, setSelected] = useState<Set<string>>(INITIAL_SELECTED)

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div>
      <p className="text-sm text-[#5B6472]">
        {selected.size} of 9 selected · Minimum 2 required
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAREER_CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isSelected={selected.has(cat.id)}
            onToggle={() => toggle(cat.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link
          to="/account"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#5B6472] transition-colors hover:text-[#26483E]"
        >
          ← Back
        </Link>
        <Link
          to="/start"
          className="inline-flex items-center gap-1 rounded-full bg-[#26483E] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1F3D35] hover:shadow-md"
        >
          Continue to Project Listing →
        </Link>
      </div>
    </div>
  )
}

export function StartPreferencePage() {
  return (
    <div>
      <TopBar />
      <StepLabel />
      <PageHeader />
      <div className="mt-8">
        <CategoryGrid />
      </div>
    </div>
  )
}