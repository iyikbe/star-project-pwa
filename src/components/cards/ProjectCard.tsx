import { CATEGORIES } from '../../lib/constants/categories'
import type { CategorySlug } from '../../lib/constants/categories'
import type { LevelSlug } from '../../lib/constants/levels'
import { Pill } from '../ui/Pill'
import { LevelBadge } from './LevelBadge'

export type ProjectCardStatus =
  | 'available'
  | 'locked'
  | 'ongoing'
  | 'completed'
  | 'waiting'

export type ProjectCardData = {
  id: string
  slug: string
  title: string
  description: string
  category: CategorySlug
  level: LevelSlug
  ageMin: number
  starReward: number
  emoji: string
  status?: ProjectCardStatus
  isMythical?: boolean
  price?: number
  completedDate?: string
  completedWith?: string
  progressWeek?: number
  progressTotal?: number
  progressWith?: string
}

type ProjectCardProps = {
  project: ProjectCardData
  onClick?: () => void
  href?: string
  className?: string
}

export function ProjectCard({
  project,
  onClick,
  href,
  className = '',
}: ProjectCardProps) {
  const category = CATEGORIES[project.category]
  const status = project.status ?? 'available'
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isOngoing = status === 'ongoing'

  const topBg = project.isMythical
    ? 'bg-gradient-to-br from-sp-coral-bg-soft via-sp-coral to-sp-primary'
    : category.tintClass

  const Wrapper = href ? 'a' : onClick ? 'button' : 'div'
  const wrapperProps: Record<string, unknown> = {
    className: `group relative flex flex-col overflow-hidden rounded-xl border border-sp-border-soft bg-white transition-all ${
      isLocked ? 'opacity-70' : 'hover:border-sp-primary/30 hover:shadow-md cursor-pointer'
    } ${Wrapper === 'button' ? 'text-left w-full' : ''} ${className}`,
  }
  if (href) (wrapperProps as Record<string, string>).href = href
  if (onClick) wrapperProps.onClick = onClick
  if (Wrapper === 'button') (wrapperProps as Record<string, string>).type = 'button'

  return (
    <Wrapper {...wrapperProps}>
      <div className={`relative aspect-[4/3] flex items-center justify-center ${topBg}`}>
        <div className="absolute top-3 left-3">
          <Pill
            variant="neutral"
            size="sm"
            className={project.isMythical ? 'bg-white/20 text-white' : 'bg-white/80 text-sp-text-primary'}
          >
            {project.isMythical ? 'MYTHICAL' : category.shortLabel}
          </Pill>
        </div>

        <div className="absolute top-3 right-3">
          {isCompleted ? (
            <Pill variant="active" size="sm">✓ DONE</Pill>
          ) : isOngoing ? (
            <Pill variant="pending" size="sm">🔥 ONGOING</Pill>
          ) : (
            <LevelBadge level={project.level} />
          )}
        </div>

        <span className="text-5xl md:text-6xl drop-shadow-sm" aria-hidden="true">
          {project.emoji}
        </span>

        {isLocked && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-3xl" aria-label="Locked">🔒</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-sp-primary text-sm md:text-base leading-snug">
          {project.title}
        </h3>

        {isCompleted ? (
          <p className="text-xs text-sp-text-muted">
            Completed {project.completedDate}
            {project.completedWith && ` with ${project.completedWith}`}
          </p>
        ) : isOngoing ? (
          <p className="text-xs text-sp-text-muted">
            Week {project.progressWeek} of {project.progressTotal}
            {project.progressWith && ` · You + ${project.progressWith}`}
          </p>
        ) : (
          <p className="text-xs md:text-sm text-sp-text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-sp-border-soft flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-semibold">
            {isCompleted ? (
              <span className="text-sp-gold">⭐ Earned</span>
            ) : project.isMythical && project.price ? (
              <span className="text-sp-coral">
                €{project.price} · {project.starReward} stars
              </span>
            ) : (
              <span className="text-sp-gold">
                ⭐ {project.starReward} Star{project.starReward > 1 ? 's' : ''}
              </span>
            )}
          </span>
          <span className="text-sp-text-muted">
            {isCompleted
              ? 'REPLAY'
              : isOngoing
                ? 'CONTINUE →'
                : isLocked
                  ? `LOCKED · AGE ${project.ageMin}+`
                  : `AGE ${project.ageMin}+`}
          </span>
        </div>
      </div>
    </Wrapper>
  )
}