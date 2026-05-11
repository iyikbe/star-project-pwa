export type LevelSlug =
  | 'tiny'
  | 'baby'
  | 'junior'
  | 'young'
  | 'senior'
  | 'legendary'
  | 'mythical'

export type LevelInfo = {
  slug: LevelSlug
  label: string
  shortLabel: string
  stars: number
  starsDisplay: string
  minAge: number
  isPremium: boolean
  sortOrder: number
}

export const LEVELS: Record<LevelSlug, LevelInfo> = {
  tiny: {
    slug: 'tiny',
    label: 'Tiny',
    shortLabel: 'TINY',
    stars: 1,
    starsDisplay: '⭐',
    minAge: 4,
    isPremium: false,
    sortOrder: 1,
  },
  baby: {
    slug: 'baby',
    label: 'Baby',
    shortLabel: 'BABY',
    stars: 2,
    starsDisplay: '⭐⭐',
    minAge: 6,
    isPremium: false,
    sortOrder: 2,
  },
  junior: {
    slug: 'junior',
    label: 'Junior',
    shortLabel: 'JUNIOR',
    stars: 3,
    starsDisplay: '⭐⭐⭐',
    minAge: 8,
    isPremium: false,
    sortOrder: 3,
  },
  young: {
    slug: 'young',
    label: 'Young',
    shortLabel: 'YOUNG',
    stars: 4,
    starsDisplay: '⭐⭐⭐⭐',
    minAge: 10,
    isPremium: false,
    sortOrder: 4,
  },
  senior: {
    slug: 'senior',
    label: 'Senior',
    shortLabel: 'SENIOR',
    stars: 5,
    starsDisplay: '⭐⭐⭐⭐⭐',
    minAge: 13,
    isPremium: false,
    sortOrder: 5,
  },
  legendary: {
    slug: 'legendary',
    label: 'Legendary',
    shortLabel: 'LEGENDARY',
    stars: 6,
    starsDisplay: '🏆',
    minAge: 15,
    isPremium: false,
    sortOrder: 6,
  },
  mythical: {
    slug: 'mythical',
    label: 'Mythical',
    shortLabel: 'MYTHICAL',
    stars: 0,
    starsDisplay: '✨',
    minAge: 13,
    isPremium: true,
    sortOrder: 7,
  },
}

export const LEVEL_LIST: LevelInfo[] = Object.values(LEVELS).sort(
  (a, b) => a.sortOrder - b.sortOrder,
)