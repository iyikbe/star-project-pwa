import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const mainNav = [
  { to: '/', label: 'Home' },
  { to: '/account', label: 'My Account' },
  { to: '/start', label: 'Start Your Career' },
]

const secondaryNav = [
  { to: '/achievements', label: 'Achievements' },
]

const commNav = [
  { to: '/notifications', label: 'Notifications', badge: 3 },
  { to: '/messages', label: 'Messages' },
]

const accountNav = [
  { to: '/subscription', label: 'Subscription' },
  { to: '/settings', label: 'Settings' },
]

function Sidebar() {
  return (
    <aside className="flex h-screen flex-col border-r border-[#E8E1D8] bg-[#FFFDF8] p-6">
      <Link to="/" className="mb-8 text-lg font-bold tracking-tight text-[#26483E]">
        ★ Star Project
      </Link>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DDEBDD] text-[#26483E]'
                    : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/start"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
              }`
            }
          >
            My Projects
          </NavLink>
          {secondaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DDEBDD] text-[#26483E]'
                    : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div>
          <p className="mb-1.5 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#8A8F98]">
            Communication
          </p>
          <div className="space-y-1">
            {commNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#DDEBDD] text-[#26483E]'
                      : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C96B5A] text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#8A8F98]">
            Account
          </p>
          <div className="space-y-1">
            {accountNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#DDEBDD] text-[#26483E]'
                      : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-[#E8E1D8] pt-4">
          <Link
            to="/login"
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#5B6472] transition-colors hover:bg-[#F4EFE7]"
          >
            Log Out
          </Link>
        </div>
      </nav>
    </aside>
  )
}

function MobileHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#E8E1D8] bg-[#FFFDF8] lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-base font-bold tracking-tight text-[#26483E]">
          ★ Star Project
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl px-3 py-2 text-sm font-medium text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#E8E1D8] px-4 pb-4 pt-2">
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/start"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                }`
              }
            >
              My Projects
            </NavLink>
            {secondaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <hr className="my-2 border-[#E8E1D8]" />
            {commNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C96B5A] text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
            <hr className="my-2 border-[#E8E1D8]" />
            {accountNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#DDEBDD] text-[#26483E]' : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <hr className="my-2 border-[#E8E1D8]" />
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#5B6472] hover:bg-[#F4EFE7]"
            >
              Log Out
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex flex-col">
          <MobileHeader />
          <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}