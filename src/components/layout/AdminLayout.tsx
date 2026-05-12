import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'

type AdminNavItem = {
  to: string
  label: string
  icon: string
  end?: boolean
}

const adminNavGroup1: AdminNavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/projects', label: 'Projects', icon: '📁' },
  { to: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { to: '/admin/levels', label: 'Levels', icon: '⭐' },
]

const adminNavGroup2: AdminNavItem[] = [
  { to: '/admin/payments', label: 'Payment Approvals', icon: '💳' },
  { to: '/admin/submissions', label: 'Submission Reviews', icon: '📋' },
  { to: '/admin/notifications', label: 'Notifications', icon: '📢' },
]

const adminNavGroup3: AdminNavItem[] = [
  { to: '/admin/audit-logs', label: 'Audit Logs', icon: '📜' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

function getAdminBreadcrumb(pathname: string): { label: string; to?: string }[] {
  const root = { label: 'Admin', to: '/admin' }
  if (pathname === '/admin') return [{ label: 'Dashboard' }]
  if (pathname === '/admin/users') return [root, { label: 'Users' }]
  if (pathname === '/admin/projects') return [root, { label: 'Projects' }]
  if (pathname === '/admin/projects/new')
    return [root, { label: 'Projects', to: '/admin/projects' }, { label: 'Upload New' }]
  if (pathname === '/admin/categories') return [root, { label: 'Categories' }]
  if (pathname === '/admin/levels') return [root, { label: 'Levels' }]
  if (pathname === '/admin/payments') return [root, { label: 'Payment Approvals' }]
  if (pathname === '/admin/submissions') return [root, { label: 'Submission Reviews' }]
  if (pathname.match(/^\/admin\/submissions\/.+/))
    return [root, { label: 'Submissions', to: '/admin/submissions' }, { label: 'Review' }]
  if (pathname === '/admin/notifications') return [root, { label: 'Notifications' }]
  if (pathname === '/admin/audit-logs') return [root, { label: 'Audit Logs' }]
  if (pathname === '/admin/settings') return [root, { label: 'Settings' }]
  return [root]
}

export function AdminLayout() {
  const location = useLocation()
  const breadcrumb = getAdminBreadcrumb(location.pathname)

  return (
    <div className="flex min-h-screen bg-sp-bg-page">
      {/* SIDEBAR — dark green admin theme */}
      <aside className="hidden flex-col border-r border-white/10 bg-sp-primary text-white lg:flex lg:w-60 lg:flex-shrink-0">
        {/* Logo */}
        <div className="border-b border-white/10 px-5 py-5">
          <div className="text-base font-bold">
            <span className="text-sp-gold">★</span> Star Project
          </div>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sp-gold">
            ⚡ ADMIN PANEL
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {adminNavGroup1.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-sp-gold">
            OPERATIONS
          </div>
          <ul className="space-y-0.5">
            {adminNavGroup2.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-sp-gold">
            SYSTEM
          </div>
          <ul className="space-y-0.5">
            {adminNavGroup3.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 px-3 py-4">
          <Link
            to="/account"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden="true">↩</span>
            <span>Exit Admin View</span>
          </Link>
          <button
            type="button"
            onClick={() => console.log('Admin logout')}
            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sp-coral transition-colors hover:bg-white/10"
          >
            <span aria-hidden="true">🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TOP BAR */}
        <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-sp-border-soft bg-white px-4 py-3 md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex-shrink-0 text-sm font-bold text-sp-primary lg:hidden">
              <span className="text-sp-gold">★</span> Admin
            </div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto text-sm">
              {breadcrumb.map((item, i) => {
                const isLast = i === breadcrumb.length - 1
                return (
                  <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                    {item.to && !isLast ? (
                      <Link to={item.to} className="text-sp-text-muted hover:text-sp-primary">
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'font-semibold text-sp-primary' : 'text-sp-text-muted'}>
                        {item.label}
                      </span>
                    )}
                    {!isLast && (
                      <span className="text-sp-text-muted" aria-hidden="true">
                        ›
                      </span>
                    )}
                  </span>
                )
              })}
            </nav>
          </div>

          {/* Right: admin chip */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-sp-gold-bg-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sp-gold sm:inline-flex">
              ⚡ SUPER ADMIN
            </span>
            <div className="flex items-center gap-2">
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold leading-tight text-sp-primary">Aldy YK</p>
                <p className="text-xs leading-tight text-sp-text-muted">aldy@starproject.de</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sp-primary text-xs font-bold text-white">
                AY
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-sp-bg-page">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}