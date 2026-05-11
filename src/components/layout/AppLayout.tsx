import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'
import type { BreadcrumbItem } from './Breadcrumb'
import { UserChip } from './UserChip'

type NavItem = {
  to: string
  label: string
  icon: string
  end?: boolean
  badge?: number
}

const navGroup1: NavItem[] = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/account', label: 'My Account', icon: '👤' },
  { to: '/start', label: 'Start Your Career', icon: '🚀' },
  { to: '/achievements', label: 'Achievements', icon: '🏆' },
]

const navGroup2: NavItem[] = [
  { to: '/notifications', label: 'Notifications', icon: '🔔', badge: 3 },
  { to: '/messages', label: 'Messages', icon: '✉️' },
]

const navGroup3: NavItem[] = [
  { to: '/subscription', label: 'Subscription', icon: '💳' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

function getBreadcrumb(pathname: string): BreadcrumbItem[] {
  const root: BreadcrumbItem = { label: 'Star Project', to: '/account' }

  if (pathname === '/account') return [root, { label: 'My Account' }]
  if (pathname === '/start') return [root, { label: 'Start Your Career' }]
  if (pathname === '/start/preference')
    return [root, { label: 'Start Your Career', to: '/start' }, { label: 'Preference Input' }]
  if (pathname.startsWith('/categories/'))
    return [root, { label: 'Start Your Career', to: '/start' }, { label: 'Chef' }]
  if (pathname === '/notifications') return [root, { label: 'Notifications' }]
  if (pathname === '/messages') return [root, { label: 'Messages' }]
  if (pathname === '/achievements') return [root, { label: 'Achievements' }]
  if (pathname === '/subscription') return [root, { label: 'Subscription & Payment' }]
  if (pathname === '/settings') return [root, { label: 'Settings' }]
  if (pathname.match(/^\/projects\/[^/]+\/workspace$/))
    return [root, { label: 'My Projects' }, { label: 'Project Workspace' }]
  if (pathname.match(/^\/projects\/[^/]+\/submit$/))
    return [root, { label: 'My Projects' }, { label: 'Submit for Review' }]
  if (pathname.match(/^\/projects\/[^/]+\/result$/))
    return [root, { label: 'My Projects' }, { label: 'Review Result' }]
  if (pathname.match(/^\/projects\/[^/]+$/))
    return [root, { label: 'Start Your Career', to: '/start' }, { label: 'Project Detail' }]
  return [root]
}

export function AppLayout() {
  const location = useLocation()
  const breadcrumbItems = getBreadcrumb(location.pathname)
  const showGuardianOnChip =
    location.pathname === '/account' || location.pathname === '/subscription'

  return (
    <div className="flex min-h-screen bg-sp-bg-page">
      {/* SIDEBAR — hidden on mobile, visible from lg */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-sp-border-soft lg:bg-white">
        <div className="border-b border-sp-border-soft px-5 py-5">
          <div className="text-base font-bold text-sp-primary">
            <span className="text-sp-coral">★</span> Star Project
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navGroup1.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-sp-accent-green-bg font-semibold text-sp-accent-green'
                        : 'text-sp-text-muted hover:bg-sp-bg-card-muted hover:text-sp-primary'
                    }`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-sp-text-muted">
            COMMUNICATION
          </div>
          <ul className="space-y-0.5">
            {navGroup2.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-sp-accent-green-bg font-semibold text-sp-accent-green'
                        : 'text-sp-text-muted hover:bg-sp-bg-card-muted hover:text-sp-primary'
                    }`
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sp-coral text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-sp-text-muted">
            ACCOUNT
          </div>
          <ul className="space-y-0.5">
            {navGroup3.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-sp-accent-green-bg font-semibold text-sp-accent-green'
                        : 'text-sp-text-muted hover:bg-sp-bg-card-muted hover:text-sp-primary'
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

        <div className="border-t border-sp-border-soft px-3 py-4">
          <button
            type="button"
            onClick={() => {
              console.log('Logout clicked')
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sp-danger transition-colors hover:bg-red-50"
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
              <span className="text-sp-coral">★</span> SP
            </div>
            <div className="overflow-x-auto">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-sp-border-soft bg-white text-sm transition-colors hover:bg-sp-bg-card-muted"
            >
              <span aria-hidden="true">🔔</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sp-coral text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <button
              type="button"
              aria-label="Messages"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-sp-border-soft bg-white text-sm transition-colors hover:bg-sp-bg-card-muted"
            >
              <span aria-hidden="true">✉️</span>
            </button>
            <div className="ml-1 hidden border-l border-sp-border-soft pl-2 sm:block">
              <UserChip showGuardian={showGuardianOnChip} />
            </div>
            <div className="sm:hidden">
              <UserChip showGuardian={showGuardianOnChip} variant="compact" />
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