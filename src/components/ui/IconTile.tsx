import type { ReactNode } from 'react'

type IconTileProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tint?:
    | 'chef'
    | 'farm'
    | 'robotics'
    | 'community'
    | 'automotive'
    | 'media'
    | 'software'
    | 'fashion'
    | 'music'
    | 'primary'
    | 'coral'
    | 'gold'
    | 'neutral'
  shape?: 'rounded' | 'circle'
  className?: string
}

const sizeStyles: Record<string, string> = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-14 h-14 text-2xl',
  xl: 'w-20 h-20 text-4xl',
}

const tintStyles: Record<string, string> = {
  chef: 'bg-category-chef-bg',
  farm: 'bg-category-farm-bg',
  robotics: 'bg-category-robotics-bg',
  community: 'bg-category-community-bg',
  automotive: 'bg-category-automotive-bg',
  media: 'bg-category-media-bg',
  software: 'bg-category-software-bg',
  fashion: 'bg-category-fashion-bg',
  music: 'bg-category-music-bg',
  primary: 'bg-sp-primary text-sp-text-on-dark',
  coral: 'bg-sp-coral-bg-soft text-sp-coral',
  gold: 'bg-sp-gold-bg-soft text-sp-gold',
  neutral: 'bg-sp-bg-card-muted',
}

export function IconTile({
  children,
  size = 'md',
  tint = 'neutral',
  shape = 'rounded',
  className = '',
}: IconTileProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl'
  return (
    <div
      className={`flex items-center justify-center ${sizeStyles[size]} ${tintStyles[tint]} ${shapeClass} ${className}`}
    >
      {children}
    </div>
  )
}