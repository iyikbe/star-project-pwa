import { Link } from 'react-router-dom'

function MobileValueBanner() {
  return (
    <div className="mb-8 rounded-2xl border border-[#E8E1D8] bg-[#26483E] p-6 text-white lg:hidden">
      <p className="text-lg font-bold">★ Star Project</p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">
        Parent-managed, private by default, and designed for safe project-based career discovery.
      </p>
    </div>
  )
}

function Headline() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-[#5B6472]">
        Continue your child&apos;s project-based career discovery journey.
      </p>
    </div>
  )
}

function LoginForm() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-xs font-medium text-[#5B6472]">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="anna.mueller@example.de"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-xs font-medium text-[#5B6472]">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#5B6472]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#D8D3CA] accent-[#26483E]"
            />
            Remember me
          </label>
          <a href="#" className="text-sm font-medium text-[#26483E] underline underline-offset-2">
            Forgot password?
          </a>
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-[#26483E] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1F3D35]"
        >
          Log In
        </button>
      </div>

      <div className="mt-6 space-y-2 text-center text-sm">
        <p className="text-[#5B6472]">
          New to Star Project?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#26483E] underline underline-offset-2"
          >
            Create account
          </Link>
        </p>
        <p>
          <Link to="/" className="text-sm text-[#8A8F98] underline underline-offset-2">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}

function TrustSection() {
  return (
    <div className="mt-6 rounded-xl border border-[#E8E1D8] bg-[#F4EFE7] p-4">
      <div className="space-y-1.5 text-xs text-[#5B6472]">
        <p>✓ Parent-managed account</p>
        <p>✓ Private-by-default child media</p>
        <p>✓ System messages only, no free-form child chat in MVP</p>
      </div>
    </div>
  )
}

function PrototypeNote() {
  return (
    <p className="mt-6 text-center text-xs italic text-[#8A8F98]">
      MVP prototype screen only. Authentication will be connected in the Supabase phase.
    </p>
  )
}

export function LoginPage() {
  return (
    <div>
      <MobileValueBanner />
      <Headline />
      <LoginForm />
      <TrustSection />
      <PrototypeNote />
    </div>
  )
}