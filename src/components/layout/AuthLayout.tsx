import { Link, Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-sp-bg-page">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT PANEL — green welcome panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-sp-bg-auth p-12 text-white lg:flex">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/5" aria-hidden="true" />
          <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-white/5" aria-hidden="true" />

          <Link to="/" className="relative z-10 text-lg font-bold">
            <span className="text-sp-coral">★</span> Star Project
          </Link>

          <div className="relative z-10 max-w-md">
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] tracking-normal">
              Welcome.<br />
              Let&apos;s set up your<br />
              <span className="italic text-sp-coral">family account.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/75">
              One guardian + one child. Built for safety. GDPR-compliant from day one. The whole
              journey starts here.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                'Parent-managed account — you stay in control of consent, data, and payments.',
                'Private by default — your child\'s photos and videos never go public without you.',
                'Cancel anytime. €29/month flat. No tricks. No upsells.',
                '14-day satisfaction guarantee on your first project.',
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sp-coral text-xs text-white">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-white/85">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10" />
        </aside>

        {/* RIGHT PANEL — form area */}
        <main className="flex flex-col bg-white">
          {/* Mobile green banner */}
          <div className="bg-sp-bg-auth px-6 py-8 text-white lg:hidden">
            <Link to="/" className="text-sm font-bold">
              <span className="text-sp-coral">★</span> Star Project
            </Link>
            <h1 className="font-serif mt-3 text-3xl font-semibold leading-tight">
              Welcome.<br />
              <span className="italic text-sp-coral">Let&apos;s set up your family account.</span>
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}