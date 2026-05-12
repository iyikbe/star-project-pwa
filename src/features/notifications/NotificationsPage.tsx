import { useState } from 'react'
import { IconTile } from '../../components/ui'
import { NOTIFICATIONS, type NotificationType } from '../../data/mock/notifications'

type TabFilter = 'all' | NotificationType

function getIconTint(type: NotificationType): 'farm' | 'coral' | 'gold' | 'community' | 'neutral' {
  switch (type) {
    case 'invitation':
      return 'farm'
    case 'project_update':
      return 'coral'
    case 'achievement':
      return 'gold'
    case 'payment':
      return 'coral'
    case 'system':
      return 'community'
    default:
      return 'neutral'
  }
}

function getTypeLabel(type: NotificationType): string {
  switch (type) {
    case 'invitation':
      return 'Invitation'
    case 'project_update':
      return 'Project Update'
    case 'achievement':
      return 'Achievement'
    case 'payment':
      return 'Payment'
    case 'system':
      return 'System Message'
  }
}

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all')

  const unreadCount = NOTIFICATIONS.filter((n) => n.isUnread).length
  const invitationCount = NOTIFICATIONS.filter((n) => n.type === 'invitation').length

  const filtered =
    activeTab === 'all'
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.type === activeTab)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            Notifications &amp; Messages
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-sp-text-muted">
            System messages only. Star Project does not allow free-form chat between children.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-sp-coral hover:underline"
        >
          ✓ Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="overflow-x-auto rounded-xl border border-sp-border-soft bg-white p-2">
        <div className="flex min-w-max items-center gap-1">
          {([
            { id: 'all', label: 'All', count: unreadCount },
            { id: 'invitation', label: 'Invitations', count: invitationCount },
            { id: 'project_update', label: 'Project Updates', count: 0 },
            { id: 'payment', label: 'Payments', count: 0 },
            { id: 'achievement', label: 'Achievements', count: 0 },
            { id: 'system', label: 'System Messages', count: 0 },
          ] as const).map((tab) => {
            const badgeCount = tab.count
            const showBadge = badgeCount > 0
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabFilter)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-sp-primary text-white'
                    : 'text-sp-text-muted hover:bg-sp-bg-card-muted hover:text-sp-primary'
                }`}
              >
                <span>{tab.label}</span>
                {showBadge && (
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-sp-coral text-white'
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Notification list */}
      <div className="divide-y divide-sp-border-soft overflow-hidden rounded-xl border border-sp-border-soft bg-white">
        {filtered.map((n) => (
          <article
            key={n.id}
            className={`flex flex-col gap-3 p-4 md:flex-row md:gap-4 md:p-5 ${
              n.isUnread ? 'bg-sp-bg-card-muted/30' : ''
            }`}
          >
            <div className="flex-shrink-0">
              <IconTile size="md" tint={getIconTint(n.type)}>
                <span aria-hidden="true">{n.emoji}</span>
              </IconTile>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                {n.isUnread && (
                  <span
                    className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-sp-coral"
                    aria-label="Unread"
                  />
                )}
                <p
                  className={`text-sm leading-relaxed ${
                    n.isUnread ? 'font-medium text-sp-primary' : 'text-sp-text-primary'
                  }`}
                >
                  {n.body}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-xs text-sp-text-muted">{n.timestamp}</span>
                <span className="text-xs text-sp-text-muted" aria-hidden="true">·</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted">
                  {getTypeLabel(n.type)}
                </span>

                {n.hasAcceptDecline && (
                  <div className="ml-auto flex gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-sp-border-input bg-white px-3 py-1.5 text-xs font-semibold text-sp-text-primary transition-colors hover:bg-sp-bg-card-muted"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-sp-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sp-primary-hover"
                    >
                      Accept
                    </button>
                  </div>
                )}
                {n.hasOpenProjectAction && (
                  <button
                    type="button"
                    className="ml-auto rounded-md border border-sp-border-input bg-white px-3 py-1.5 text-xs font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
                  >
                    Open Project
                  </button>
                )}
                {n.hasViewAction && (
                  <button
                    type="button"
                    className="ml-auto text-xs font-semibold text-sp-coral hover:underline"
                  >
                    View
                  </button>
                )}
                {n.hasViewReceiptAction && (
                  <button
                    type="button"
                    className="ml-auto text-xs font-semibold text-sp-coral hover:underline"
                  >
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-sp-text-muted">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  )
}