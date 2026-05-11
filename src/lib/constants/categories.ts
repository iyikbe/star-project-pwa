export type CategorySlug =
  | 'chef'
  | 'automotive'
  | 'farm'
  | 'robotics'
  | 'media'
  | 'community'
  | 'software'
  | 'fashion'
  | 'music'

export type CategoryInfo = {
  slug: CategorySlug
  label: string
  shortLabel: string
  emoji: string
  description: string
  tintClass: string
  accentClass: string
}

export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  chef: {
    slug: 'chef',
    label: 'Chef',
    shortLabel: 'CHEF',
    emoji: '🍳',
    description: 'Cooking, baking, taste tests, hygiene. Perfect for hands-on kids who love food.',
    tintClass: 'bg-category-chef-bg',
    accentClass: 'text-category-chef',
  },
  automotive: {
    slug: 'automotive',
    label: 'Automotive',
    shortLabel: 'AUTOMOTIVE',
    emoji: '🚗',
    description: 'Vehicles, mobility, mechanics, future transport concepts.',
    tintClass: 'bg-category-automotive-bg',
    accentClass: 'text-category-automotive',
  },
  farm: {
    slug: 'farm',
    label: 'Farm',
    shortLabel: 'FARM',
    emoji: '🌱',
    description: 'Nature, food growth, sustainability, small experiments outdoors.',
    tintClass: 'bg-category-farm-bg',
    accentClass: 'text-category-farm',
  },
  robotics: {
    slug: 'robotics',
    label: 'Robotics',
    shortLabel: 'ROBOTICS',
    emoji: '🤖',
    description: 'Sensors, automation, simple robot logic, building moving machines.',
    tintClass: 'bg-category-robotics-bg',
    accentClass: 'text-category-robotics',
  },
  media: {
    slug: 'media',
    label: 'Media Creator',
    shortLabel: 'MEDIA',
    emoji: '🎬',
    description: 'Video, storytelling, presentation, project review and editing.',
    tintClass: 'bg-category-media-bg',
    accentClass: 'text-category-media',
  },
  community: {
    slug: 'community',
    label: 'Community Builder',
    shortLabel: 'COMMUNITY',
    emoji: '🤝',
    description: 'Local impact, social problem-solving, service projects.',
    tintClass: 'bg-category-community-bg',
    accentClass: 'text-category-community',
  },
  software: {
    slug: 'software',
    label: 'Software Creator',
    shortLabel: 'SOFTWARE',
    emoji: '💻',
    description: 'Logic, algorithms, simple apps, digital project concepts.',
    tintClass: 'bg-category-software-bg',
    accentClass: 'text-category-software',
  },
  fashion: {
    slug: 'fashion',
    label: 'Fashion',
    shortLabel: 'FASHION',
    emoji: '👗',
    description: 'Design, materials, sustainable style, textile projects.',
    tintClass: 'bg-category-fashion-bg',
    accentClass: 'text-category-fashion',
  },
  music: {
    slug: 'music',
    label: 'Music',
    shortLabel: 'MUSIC',
    emoji: '🎵',
    description: 'Rhythm, recording, audio production, creative sound projects.',
    tintClass: 'bg-category-music-bg',
    accentClass: 'text-category-music',
  },
}

export const CATEGORY_LIST: CategoryInfo[] = Object.values(CATEGORIES)