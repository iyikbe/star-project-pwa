import { CURRENT_USER } from '../../data/mock/users'
import { LEVELS } from '../../lib/constants/levels'

type UserChipProps = {
  variant?: 'default' | 'compact'
  showGuardian?: boolean
}

export function UserChip({ variant = 'default', showGuardian = false }: UserChipProps) {
  const level = LEVELS[CURRENT_USER.currentLevel]
  const secondLine = showGuardian
    ? `Guardian: ${CURRENT_USER.guardianName}`
    : `${level.label} · ⭐ ${CURRENT_USER.totalStars}`

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sp-coral flex items-center justify-center text-white font-bold text-[11px]">
          {CURRENT_USER.childInitials}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden md:block">
        <p className="text-sm font-semibold text-sp-primary leading-tight">
          {CURRENT_USER.childName}
        </p>
        <p className="text-xs text-sp-text-muted leading-tight">{secondLine}</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-sp-coral flex items-center justify-center text-white font-bold text-xs">
        {CURRENT_USER.childInitials}
      </div>
    </div>
  )
}