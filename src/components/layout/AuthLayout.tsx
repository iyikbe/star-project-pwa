import { Link, Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden rounded-3xl bg-[#26483E] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="text-lg font-bold">
              ★ Star Project
            </Link>
            <h1 className="mt-16 text-5xl font-bold tracking-tight">
              Welcome. Let&apos;s build your child&apos;s future through real projects.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
              Parent-managed, private by default, and designed for safe project-based career discovery.
            </p>
          </div>

          <div className="space-y-3 text-sm text-white/80">
            <p>✓ One guardian + one child account</p>
            <p>✓ GDPR-ready direction</p>
            <p>✓ No free-form child chat in MVP</p>
          </div>
        </aside>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  )
}
