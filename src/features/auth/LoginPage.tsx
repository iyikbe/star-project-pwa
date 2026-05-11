import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('anna.mueller@example.de')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted', { email, rememberMe })
    navigate('/account')
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-sp-text-muted">
          Continue your child&apos;s project-based career discovery journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
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
            autoComplete="email"
            required
            className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-sp-text-primary">
              Password
            </label>
            <a href="#" className="text-xs font-semibold text-sp-coral hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
          />
        </div>

        {/* Remember me */}
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 accent-sp-accent-green"
          />
          <span className="text-sm text-sp-text-primary">Remember me on this device</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-sp-primary px-5 py-3.5 font-semibold text-white transition-colors hover:bg-sp-primary-hover"
        >
          Log In →
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <hr className="flex-1 border-sp-border-soft" />
          <span className="text-xs text-sp-text-muted">or</span>
          <hr className="flex-1 border-sp-border-soft" />
        </div>

        <p className="text-center text-sm text-sp-text-muted">
          New to Star Project?{' '}
          <Link
            to="/register"
            className="font-semibold text-sp-coral underline hover:text-sp-coral-hover"
          >
            Create a family account
          </Link>
        </p>

        {/* Safety note */}
        <div className="mt-6 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-text-muted">
            STAR PROJECT SAFETY
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-sp-text-primary">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sp-accent-green">✓</span>
              <span>Parent-managed account — guardian stays in control</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sp-accent-green">✓</span>
              <span>Private-by-default child media</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sp-accent-green">✓</span>
              <span>System messages only — no free-form child chat in MVP</span>
            </li>
          </ul>
        </div>

        {/* MVP note */}
        <p className="text-center text-[11px] italic text-sp-text-muted">
          MVP prototype screen — authentication will be connected in the Supabase phase.
        </p>

        {/* Back link */}
        <p className="text-center">
          <Link to="/" className="text-sm text-sp-text-muted hover:text-sp-primary">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}