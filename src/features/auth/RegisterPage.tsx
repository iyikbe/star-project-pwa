import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORY_LIST } from '../../lib/constants/categories'

export function RegisterPage() {
  const navigate = useNavigate()

  const [guardianName, setGuardianName] = useState('Anna Müller')
  const [email, setEmail] = useState('anna.mueller@example.de')
  const [password, setPassword] = useState('••••••••••••')
  const [region, setRegion] = useState('kassel-hessen')
  const [childName, setChildName] = useState('Lukas Müller')
  const [birthdate, setBirthdate] = useState('2017-03-15')

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(['chef', 'farm', 'community']),
  )

  const [consent1, setConsent1] = useState(true)
  const [consent2, setConsent2] = useState(true)
  const [consent3, setConsent3] = useState(true)
  const [consentPublic, setConsentPublic] = useState(false)

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const canSubmit = selectedCategories.size >= 2 && consent1 && consent2 && consent3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register form submitted', {
      guardianName,
      email,
      region,
      childName,
      birthdate,
      selectedCategories: Array.from(selectedCategories),
      consents: { consent1, consent2, consent3, consentPublic },
    })
    navigate('/account')
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
          Create your family account
        </h1>
        <p className="mt-2 text-sm text-sp-text-muted">
          Already have one?{' '}
          <Link to="/login" className="font-semibold text-sp-coral underline hover:text-sp-coral-hover">
            Log in here
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* GUARDIAN INFORMATION */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-text-muted">
            GUARDIAN INFORMATION
          </p>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="guardian-name" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Full name
              </label>
              <input
                id="guardian-name"
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Anna Müller"
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna.mueller@example.de"
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
              <p className="mt-1 text-xs text-sp-text-muted">At least 10 characters with one number</p>
            </div>
            <div>
              <label htmlFor="region" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Region
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              >
                <option value="kassel-hessen">Kassel, Hessen 🇩🇪</option>
                <option value="other-hessen">Other Hessen</option>
                <option value="other-de">Other Germany</option>
                <option value="other-eu">Other EU</option>
              </select>
            </div>
          </div>
        </section>

        {/* CHILD INFORMATION */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-text-muted">
            CHILD INFORMATION (ONE CHILD PER ACCOUNT)
          </p>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="child-name" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Child&apos;s name{' '}
                <span className="font-normal text-sp-text-muted">(used on certificates)</span>
              </label>
              <input
                id="child-name"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Lukas Müller"
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
            </div>
            <div>
              <label htmlFor="birthdate" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Birthdate
              </label>
              <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted px-4 py-3">
            <span aria-hidden="true">ℹ️</span>
            <p className="text-sm leading-relaxed text-sp-text-primary">
              Your child is currently <span className="font-semibold">9 years old</span> — eligible
              for Tiny, Baby, and Junior level projects.
            </p>
          </div>
        </section>

        {/* CAREER CATEGORIES */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-text-muted">
            CHOOSE AT LEAST 2 CAREER CATEGORIES
          </p>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {CATEGORY_LIST.map((cat) => {
              const isSelected = selectedCategories.has(cat.slug)
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  onClick={() => toggleCategory(cat.slug)}
                  className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 px-3 py-4 transition-all ${
                    isSelected
                      ? 'border-sp-accent-green bg-sp-accent-green-bg'
                      : 'border-sp-border-soft bg-white hover:border-sp-primary/30'
                  }`}
                >
                  {isSelected && (
                    <span
                      className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sp-accent-green text-[10px] font-bold text-white"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                  <span className="text-3xl" aria-hidden="true">{cat.emoji}</span>
                  <span className="text-sm font-semibold text-sp-primary">{cat.label}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-3 text-sm text-sp-text-muted">
            <span className="font-semibold text-sp-primary">{selectedCategories.size} of 9 selected</span>
            {' · You can change these later.'}
          </p>
        </section>

        {/* CONSENT */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-text-muted">
            PARENTAL CONSENT &amp; PRIVACY
          </p>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent1}
                onChange={(e) => setConsent1(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <span className="text-sm leading-relaxed text-sp-text-primary">
                I consent to data processing for my child&apos;s account in accordance with{' '}
                <a href="#" className="text-sp-coral underline">
                  Datenschutzerklärung
                </a>{' '}
                (GDPR-compliant).
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent2}
                onChange={(e) => setConsent2(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <span className="text-sm leading-relaxed text-sp-text-primary">
                I confirm I am the legal guardian and accept responsibility for project supervision
                and safety.
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent3}
                onChange={(e) => setConsent3(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <span className="text-sm leading-relaxed text-sp-text-primary">
                I understand the late-submission fee policy (€0.50 per missed deadline, capped at
                €2/month).
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consentPublic}
                onChange={(e) => setConsentPublic(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <span className="text-sm leading-relaxed text-sp-text-primary">
                I optionally allow public sharing of my child&apos;s project videos (e.g., for
                testimonials). <span className="font-semibold">Default: PRIVATE.</span>
              </span>
            </label>
          </div>
        </section>

        {/* SUBMIT */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-sp-primary px-5 py-3.5 font-semibold text-white transition-colors hover:bg-sp-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Account &amp; Continue →
          </button>
          <p className="mt-3 text-center text-xs text-sp-text-muted">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline hover:text-sp-primary">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-sp-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  )
}