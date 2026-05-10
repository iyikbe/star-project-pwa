import { useState } from 'react'
import { Link } from 'react-router-dom'

type Category = {
  id: string
  label: string
  icon: string
  bg: string
  accent: string
}

const CAREER_CATEGORIES: Category[] = [
  { id: 'chef', label: 'Chef', icon: '🍳', bg: '#FCE1D8', accent: '#E98A6A' },
  { id: 'automotive', label: 'Automotive', icon: '🚗', bg: '#DDE7F2', accent: '#5A7FA3' },
  { id: 'farm', label: 'Farm', icon: '🌱', bg: '#DDEBDD', accent: '#6C9A63' },
  { id: 'robotics', label: 'Robotics', icon: '🤖', bg: '#DCEAF2', accent: '#5D8AA8' },
  { id: 'media', label: 'Media Creator', icon: '🎬', bg: '#E8E1F2', accent: '#7E6BA8' },
  { id: 'community', label: 'Community', icon: '🤝', bg: '#F2E2B8', accent: '#B88A3A' },
  { id: 'software', label: 'Software', icon: '💻', bg: '#DDE9F4', accent: '#4F7EA8' },
  { id: 'fashion', label: 'Fashion', icon: '👗', bg: '#F1DDE8', accent: '#A85F86' },
  { id: 'music', label: 'Music', icon: '🎵', bg: '#E6DDF4', accent: '#7B61A8' },
]

const INITIAL_SELECTED = new Set(['chef', 'farm', 'community'])

function MobileValueBanner() {
  return (
    <div className="mb-8 rounded-2xl border border-[#E8E1D8] bg-[#26483E] p-6 text-white lg:hidden">
      <p className="text-lg font-bold">★ Star Project</p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">
        Parent-managed, private by default, and designed for safe project-based career discovery.
      </p>
      <div className="mt-4 space-y-1.5 text-xs text-white/70">
        <p>✓ One guardian + one child account</p>
        <p>✓ GDPR-ready direction</p>
        <p>✓ No free-form child chat in MVP</p>
      </div>
    </div>
  )
}

function PageHeadline() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
        Create your family account
      </h1>
      <p className="mt-2 text-sm text-[#5B6472]">
        Already have one?{' '}
        <Link to="/login" className="font-semibold text-[#26483E] underline underline-offset-2">
          Log in here
        </Link>
      </p>
    </div>
  )
}

function GuardianSection() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#172033]">
        Guardian Information
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="guardian-name" className="block text-xs font-medium text-[#5B6472]">
            Full name
          </label>
          <input
            id="guardian-name"
            type="text"
            defaultValue="Anna Müller"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>

        <div>
          <label htmlFor="guardian-email" className="block text-xs font-medium text-[#5B6472]">
            Email address
          </label>
          <input
            id="guardian-email"
            type="email"
            defaultValue="anna.mueller@example.de"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>

        <div>
          <label htmlFor="guardian-password" className="block text-xs font-medium text-[#5B6472]">
            Password
          </label>
          <input
            id="guardian-password"
            type="password"
            defaultValue="password123"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
          <p className="mt-1 text-xs text-[#8A8F98]">At least 10 characters with one number</p>
        </div>

        <div>
          <label htmlFor="guardian-region" className="block text-xs font-medium text-[#5B6472]">
            Region
          </label>
          <input
            id="guardian-region"
            type="text"
            defaultValue="Kassel, Hessen"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>
      </div>
    </div>
  )
}

function ChildSection() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#172033]">
        Child Information
      </p>
      <p className="mb-5 text-xs text-[#8A8F98]">One child per account</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="child-name" className="block text-xs font-medium text-[#5B6472]">
            Child name
          </label>
          <input
            id="child-name"
            type="text"
            defaultValue="Lukas Müller"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>

        <div>
          <label htmlFor="child-birthdate" className="block text-xs font-medium text-[#5B6472]">
            Birthdate
          </label>
          <input
            id="child-birthdate"
            type="date"
            defaultValue="2017-03-15"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
          <p className="mt-2 rounded-lg bg-[#DDEBDD] px-3 py-2 text-xs text-[#26483E]">
            Your child is currently 9 years old — eligible for Tiny, Baby, and Junior level projects.
          </p>
        </div>
      </div>
    </div>
  )
}

function CategorySelection() {
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
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#172033]">
        Choose at least 2 career categories
      </p>
      <p className="mb-5 text-xs text-[#8A8F98]">
        {selected.size} of 9 selected · You can change these later.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CAREER_CATEGORIES.map((cat) => {
          const isActive = selected.has(cat.id)
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                isActive
                  ? 'border-[#26483E] ring-1 ring-[#26483E]'
                  : 'border-[#E8E1D8] hover:border-[#D8D3CA]'
              }`}
              style={{ background: isActive ? cat.bg : '#FFFDF8' }}
            >
              <span className="text-lg">{cat.icon}</span>
              <span style={{ color: isActive ? cat.accent : '#5B6472' }}>{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ConsentSection() {
  const [checked, setChecked] = useState({
    dataProcessing: false,
    guardian: false,
    lateFee: false,
    publicSharing: false,
  })

  function toggle(key: keyof typeof checked) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const checkClass =
    'h-4 w-4 mt-0.5 shrink-0 cursor-pointer rounded border-[#D8D3CA] accent-[#26483E]'

  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#172033]">
        Parental Consent &amp; Privacy
      </p>

      <div className="space-y-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-[#172033]">
          <input
            type="checkbox"
            checked={checked.dataProcessing}
            onChange={() => toggle('dataProcessing')}
            className={checkClass}
          />
          <span>
            I consent to data processing for my child&apos;s account in accordance with{' '}
            <a href="#" className="underline underline-offset-2">
              Datenschutzerklärung
            </a>{' '}
            (GDPR-compliant).
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-[#172033]">
          <input
            type="checkbox"
            checked={checked.guardian}
            onChange={() => toggle('guardian')}
            className={checkClass}
          />
          <span>
            I confirm I am the legal guardian and accept responsibility for project supervision and
            safety.
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-[#172033]">
          <input
            type="checkbox"
            checked={checked.lateFee}
            onChange={() => toggle('lateFee')}
            className={checkClass}
          />
          <span>
            I understand the late-submission fee policy (€0.50 per missed deadline, capped at
            €2/month).
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-[#5B6472]">
          <input
            type="checkbox"
            checked={checked.publicSharing}
            onChange={() => toggle('publicSharing')}
            className={checkClass}
          />
          <span>
            I optionally allow public sharing of my child&apos;s project videos.{' '}
            <span className="font-semibold text-[#8A8F98]">Default: PRIVATE</span>
          </span>
        </label>
      </div>
    </div>
  )
}

function SubmitSection() {
  return (
    <div>
      <button
        type="button"
        className="w-full rounded-full bg-[#26483E] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1F3D35]"
      >
        Create Account &amp; Continue →
      </button>
      <p className="mt-4 text-center text-xs text-[#8A8F98]">
        By creating an account, you agree to our{' '}
        <a href="#" className="underline underline-offset-2">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

export function RegisterPage() {
  return (
    <div>
      <MobileValueBanner />
      <PageHeadline />

      <div className="space-y-6">
        <GuardianSection />
        <ChildSection />
        <CategorySelection />
        <ConsentSection />
        <SubmitSection />
      </div>
    </div>
  )
}