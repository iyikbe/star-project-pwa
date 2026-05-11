export type NotificationType =
  | 'invitation'
  | 'project_update'
  | 'payment'
  | 'achievement'
  | 'system'

export type MockNotification = {
  id: string
  type: NotificationType
  emoji: string
  body: string
  timestamp: string
  isUnread?: boolean
  hasAcceptDecline?: boolean
  hasViewAction?: boolean
  hasOpenProjectAction?: boolean
  hasViewReceiptAction?: boolean
  fromUser?: string
  expiresIn?: string
}

export const NOTIFICATIONS: MockNotification[] = [
  {
    id: 'n-1',
    type: 'invitation',
    emoji: '🤝',
    body: 'Sophie K. invited you to "The Ice Cream Project — Round 2". Expires in 3 days.',
    timestamp: '2 hours ago',
    isUnread: true,
    hasAcceptDecline: true,
    fromUser: 'Sophie K.',
    expiresIn: '3 days',
  },
  {
    id: 'n-2',
    type: 'invitation',
    emoji: '🌱',
    body: 'Emma B. invited you to "Mini Greenhouse Build". Expires in 5 days.',
    timestamp: 'Yesterday',
    isUnread: true,
    hasAcceptDecline: true,
    fromUser: 'Emma B.',
    expiresIn: '5 days',
  },
  {
    id: 'n-3',
    type: 'project_update',
    emoji: '⏰',
    body: 'Deadline reminder: "Pasta from Scratch" final submission is due in 4 days. Don\'t forget to upload your report and video.',
    timestamp: '1 day ago',
    isUnread: true,
    hasOpenProjectAction: true,
  },
  {
    id: 'n-4',
    type: 'achievement',
    emoji: '⭐',
    body: 'Achievement unlocked: "Healthy Salad Designer" · You earned ⭐ 1 star! Now at 7 stars in Chef · Baby Level.',
    timestamp: '3 days ago',
    hasViewAction: true,
  },
  {
    id: 'n-5',
    type: 'project_update',
    emoji: '✓',
    body: 'Submission accepted: "Healthy Salad Designer" — your report passed AI review and your video was approved by an admin.',
    timestamp: '3 days ago',
    hasViewAction: true,
  },
  {
    id: 'n-6',
    type: 'payment',
    emoji: '💳',
    body: 'Subscription renewed: Your monthly subscription of €29.00 was successfully processed via Flipflop. Next billing: April 5, 2026.',
    timestamp: '5 days ago',
    hasViewReceiptAction: true,
  },
  {
    id: 'n-7',
    type: 'system',
    emoji: '📢',
    body: 'New project released: "Brezel Workshop" is now available in Chef · Baby Level. Perfect for your current skill level.',
    timestamp: '1 week ago',
    hasViewAction: true,
  },
  {
    id: 'n-8',
    type: 'system',
    emoji: '📋',
    body: 'Welcome to Star Project! Your account is active. Start your first project anytime — minimum 2 team members required to begin.',
    timestamp: '2 weeks ago',
  },
]