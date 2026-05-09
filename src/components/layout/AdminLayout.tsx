import { NavLink, Outlet } from 'react-router-dom'

const adminItems = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/users', label: '👥 Users' },
  { to: '/admin/projects', label: '📁 Projects' },
  { to: '/admin/projects/new', label: '➕ Upload Project' },
  { to: '/admin/categories', label: '🏷️ Categories' },
  { to: '/admin/levels', label: '⭐ Levels' },
  { to: '/admin/payments', label: '💳 Payment Approvals' },
  { to: '/admin/submissions', label: '📋 Submission Reviews' },
  { to: '/admin/notifications', label: '📢 Notifications' },
  { to: '/admin/audit-logs', label: '📜 Audit Logs' },
  { to: '/admin/settings', label: '⚙️ Settings' },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172033]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden bg-[#26483E] p-6 text-white lg:block">
          <div className="mb-10 font-bold">★ Star Project</div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Admin Panel
          </p>

          <nav className="space-y-2">
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
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
