export type MockAchievement = {
  id: string
  title: string
  emoji: string
  starsEarned: number
  type: 'project' | 'special' | 'milestone' | 'locked'
  date?: string
  isLocked?: boolean
  progressNote?: string
}

export const RECENT_ACHIEVEMENTS: MockAchievement[] = [
  { id: 'a-ice-cream', title: 'Ice Cream Master', emoji: '🍦', starsEarned: 1, type: 'project', date: 'Mar 12' },
  { id: 'a-salad', title: 'Healthy Salad Chef', emoji: '🥗', starsEarned: 1, type: 'project', date: 'Feb 22' },
  { id: 'a-brotchen', title: 'Brötchen Baker', emoji: '🥐', starsEarned: 1, type: 'project', date: 'Feb 08' },
  { id: 'a-cookie', title: 'Cookie Chemist', emoji: '🍪', starsEarned: 1, type: 'project', date: 'Jan 24' },
  { id: 'a-pizza', title: 'Pizza Designer', emoji: '🍕', starsEarned: 1, type: 'project', date: 'Jan 12' },
  { id: 'a-first-star', title: 'First Star', emoji: '🏅', starsEarned: 0, type: 'special', date: 'Jan 10' },
  { id: 'a-5-projects', title: '5 Projects Done', emoji: '🎯', starsEarned: 0, type: 'milestone' },
  { id: 'a-10-stars', title: '10 Stars', emoji: '🔒', starsEarned: 0, type: 'locked', isLocked: true, progressNote: '3 to go' },
]