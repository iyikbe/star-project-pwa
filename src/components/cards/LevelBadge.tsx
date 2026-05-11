import type { LevelSlug } from '../../lib/constants/levels'
import { LEVELS } from '../../lib/constants/levels'
import { Pill } from '../ui/Pill'

type LevelBadgeProps = {
  level: LevelSlug
  showStars?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function LevelBadge({
  level,
  showStars = true,
  size = 'sm',
  className = '',
}: LevelBadgeProps) {
  const info = LEVELS[level]
  const variant = level === 'mythical' ? 'mythical' : 'level'

  return (
    <Pill variant={variant} size={size} className={className}>
      {showStars && <span aria-hidden="true">{info.starsDisplay}</span>}
      <span>{info.shortLabel}</span>
    </Pill>
  )
}