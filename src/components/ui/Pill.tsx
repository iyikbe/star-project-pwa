import type { ReactNode } from 'react'

export type PillVariant =
  | 'active'
  | 'pending'
  | 'level'
  | 'locked'
  | 'mythical'
  | 'neutral'
  | 'danger'

export type PillSize = 'sm' | 'md'

type PillProps = {
  variant?: PillVariant
  size?: PillSize
  children: ReactNode
  className?: string
}

const variantStyles: Record<PillVariant, string> = {
  active: 'bg-sp-accent-green-bg text-sp-accent-green',
  pending: 'bg-sp-coral-bg-soft text-sp-coral',
  level: 'bg-sp-gold-bg-soft text-sp-gold',
  locked: 'bg-sp-border-soft text-sp-text-muted',
  mythical: 'bg-sp-primary text-sp-gold border border-sp-gold',
  neutral: 'bg-sp-bg-card-muted text-sp-text-muted',
  danger: 'bg-red-100 text-sp-danger',
}

const sizeStyles: Record<PillSize, string> = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export function Pill({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}