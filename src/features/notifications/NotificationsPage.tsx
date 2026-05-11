import { useState } from 'react'
import { Link } from 'react-router-dom'

type NotificationType = 'Invitation' | 'Project Update' | 'Achievement' | 'Payment' | 'System Message'

type NotificationAction =
  | { kind: 'accept_decline' }
  | { kind: 'link'; label: string; to: string }
  | { kind: 'none' }

type Notification = {
  id: string
  icon: string
  message: string
  time: string
  type: NotificationType
  action: NotificationAction
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'invite-sophie',
    icon: '🤝',
    message:
      'Sophie K. invited you to "The Ice Cream Project — Round 2". Expires in 3 days.',
    time: '2 hours ago',
    type: 'Invitation',
    action: { kind: 'accept_decline' },
  },
  {
    id: 'invite-emma',
    icon: '🌱',
    message:
      'Emma B. invited you to "Mini Greenhouse Build". Expires in 5 days.',
    time: 'Yesterday',
    type: 'Invitation',
    action: { kind: 'accept_decline' },
  },
  {
    id: 'deadline-pasta',
    icon: '⏰',
    message:
      'Deadline reminder: "Pasta from Scratch" final submission is due in 4 days. Don\'t forget to upload your report and video.',
    time: '1 day ago',
    type: 'Project Update',
    action: { kind: 'link', label: 'Open Project', to: '/projects/1/workspace' },
  },
  {
    id: 'achievement-salad',
    icon: '⭐',
    message:
      'Achievement unlocked: "Healthy Salad Designer" · You earned ⭐ 1 star! Now at 7 stars in Chef · Baby Level.',
    time: '3 days ago',
    type: 'Achievement',
    action: { kind: 'link', label: 'View', to: '/achievements' },
  },
  {
    id: 'submission-accepted',
    icon: '✓',
    message:
      'Submission accepted: "Healthy Salad Designer" — your report passed AI review and your video was approved by an admin.',
    time: '3 days ago',
    type: 'Project Update',
    action: { kind: 'link', label: 'View', to: '/projects/1/result' },
  },
  {
    id: 'payment-renewal',
    icon: '💳',
    message:
      'Subscription renewed: Your monthly subscription of €29.00 was successfully processed via Flipflop. Next billing: April 5, 2026.',
    time: '5 days ago',
    type: 'Payment',
    action: { kind: 'link', label: 'View Receipt', to: '/subscription' },
  },
  {
    id: 'new-project-brezel',
    icon: '📢',
    message:
      'New project released: "Brezel Workshop" is now available in Chef · Baby Level. Perfect for your current skill level.',
    time: '1 week ago',
    type: 'System Message',
    action: { kind: 'link', label: 'View', to: '/categories/chef' },
  },
  {
    id: 'welcome',
    icon: '📋',
    message:
      'Welcome to Star Project! Your account is active. Start your first project anytime — minimum 2 team members required to begin.',
    time: '2 weeks ago',
    type: 'System Message',
    action: { kind: 'none' },
  },
]

type FilterTab = 'All' | 'Invitation' | 'Project Update' | 'Achievement' | 'Payment' | 'System Message'

const FILTER_TABS: { label: string; key: FilterTab; count?: number }[] = [
  { label: 'All', key: 'All' },
  { label: 'Invitations', key: 'Invitation', count: 2 },
  { label: 'Project Updates', key: 'Project Update' },
  { label: 'Payments', key: 'Payment' },
  { label: 'Achievements', key: 'Achievement' },
  { label: 'System Messages', key: 'System Message' },
]

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › Notifications</p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Baby · ⭐ 7</p>
        </div>
        <button
          type="button"
          className="relative rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          🔔
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C96B5A] text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          ✉️
        </button>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
          Notifications &amp; Messages
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-[#5B6472]">
          System messages only. Star Project does not allow free-form chat between children.
        </p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E8E1D8] bg-[#FFFDF8] px-5 py-2.5 text-sm font-medium text-[#5B6472] shadow-sm transition-all hover:border-[#26483E] hover:text-[#26483E]"
      >
        ✓ Mark all as read
      </button>
    </div>
  )
}

function FilterTabs({
  active,
  onChange,
}: {
  active: FilterTab
  onChange: (tab: FilterTab) => void
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
            active === tab.key
              ? 'border-[#26483E] bg-[#DDEBDD] text-[#26483E]'
              : 'border-[#E8E1D8] bg-[#FFFDF8] text-[#5B6472] hover:border-[#D8D3CA]'
          }`}
        >
          {tab.label}
          {tab.count != null && (
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                active === tab.key
                  ? 'bg-[#26483E] text-white'
                  : 'bg-[#C96B5A] text-white'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function NotificationRow({
  notification,
}: {
  notification: Notification
}) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4EFE7] text-lg">
          {notification.icon}
        </span>
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex-1 text-sm leading-relaxed text-[#172033]">
              {notification.message}
            </p>
            <span className="shrink-0 rounded-full border border-[#E8E1D8] bg-[#F4EFE7] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#5B6472]">
              {notification.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-[#8A8F98]">{notification.time}</span>
            <NotificationActions action={notification.action} />
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationActions({ action }: { action: NotificationAction }) {
  if (action.kind === 'accept_decline') {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-full border border-[#C96B5A] px-4 py-1 text-xs font-medium text-[#C96B5A] transition-colors hover:bg-[#C96B5A] hover:text-white"
        >
          Decline
        </button>
        <button
          type="button"
          className="rounded-full bg-[#26483E] px-4 py-1 text-xs font-medium text-white transition-colors hover:bg-[#1F3D35]"
        >
          Accept
        </button>
      </div>
    )
  }

  if (action.kind === 'link') {
    return (
      <Link
        to={action.to}
        className="text-xs font-semibold text-[#26483E] underline underline-offset-2 transition-colors hover:text-[#547C6A]"
      >
        {action.label}
      </Link>
    )
  }

  return (
    <span className="text-xs text-[#8A8F98]">No action required</span>
  )
}

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const filtered =
    activeFilter === 'All'
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.type === activeFilter)

  return (
    <div>
      <TopBar />
      <PageHeader />
      <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      <div className="space-y-3">
        {filtered.map((n) => (
          <NotificationRow key={n.id} notification={n} />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8A8F98]">
            No {activeFilter.toLowerCase()} notifications.
          </p>
        )}
      </div>
    </div>
  )
}