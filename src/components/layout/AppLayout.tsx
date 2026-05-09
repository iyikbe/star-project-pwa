import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/account', label: '👤 My Account' },
  { to: '/start', label: '🚀 Start Your Career' },
  { to: '/achievements', label: '🏆 Achievements' },
  { to: '/notifications', label: '🔔 Notifications' },
  { to: '/messages', label: '✉️ Messages' },
  { to: '/subscription', label: '💳 Subscription' },
  { to: '/settings', label: '⚙️ Settings' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-[#E8E1D8] bg-[#FFFDF8] p-6 lg:block">
          <div className="mb-10 font-bold text-[#26483E]">★ Star Project</div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-[#DDEBDD] text-[#26483E]'
                      : 'text-[#5B6472] hover:bg-[#F4EFE7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
