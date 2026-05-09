import { Link, Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <header className="border-b border-[#E8E1D8] bg-[#FFFDF8]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-bold text-[#26483E]">
            ★ Star Project
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5B6472] md:flex">
            <Link to="/">Home</Link>
            <Link to="/start">Start Your Career</Link>
            <Link to="/about">About Us</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-[#26483E]">
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#26483E] px-4 py-2 text-sm font-semibold text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
