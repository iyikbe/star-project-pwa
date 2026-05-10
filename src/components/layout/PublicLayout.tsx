import { Link, Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <header className="sticky top-0 z-50 border-b border-[#E8E1D8] bg-[#FFFDF8]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="text-lg font-bold tracking-tight text-[#26483E]">
            ★ Star Project
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5B6472] md:flex">
            <Link to="/" className="transition-colors hover:text-[#26483E]">
              Home
            </Link>
            <Link to="/start" className="transition-colors hover:text-[#26483E]">
              Start Your Career
            </Link>
            <Link to="/about" className="transition-colors hover:text-[#26483E]">
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-[#26483E] transition-colors hover:text-[#547C6A]"
            >
              Log In
            </Link>
            <span className="hidden h-4 w-px bg-[#D8D3CA] sm:block" />
            <Link
              to="/register"
              className="rounded-full bg-[#26483E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1F3D35] hover:shadow-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-[#26483E] bg-[#1F3D35] text-[#FFFDF8]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="mb-4 text-lg font-bold tracking-tight">★ Star Project</p>
              <p className="max-w-xs text-sm leading-relaxed text-[#D8D3CA]">
                Helping children discover future careers through real-world projects, teamwork, and
                guided discovery.
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#F4C542]">
                Product
              </p>
              <ul className="space-y-2.5 text-sm text-[#D8D3CA]">
                <li>
                  <Link to="/start" className="transition-colors hover:text-white">
                    Start Your Career
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="transition-colors hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="transition-colors hover:text-white">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#F4C542]">
                Company
              </p>
              <ul className="space-y-2.5 text-sm text-[#D8D3CA]">
                <li>
                  <Link to="/about" className="transition-colors hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#F4C542]">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-[#D8D3CA]">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Impressum
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#26483E] pt-8 text-sm text-[#8A8F98] md:flex-row">
            <p>Contact: hello@starproject.de</p>
            <p>Made with love in Kassel, Germany</p>
            <p>&copy; {new Date().getFullYear()} Star Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}