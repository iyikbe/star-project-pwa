import type { ReactNode } from 'react'

type StatCardProps = {
  value: string | number
  label: string
  source?: string
  variant?: 'default' | 'inline' | 'large'
  accentColor?: 'primary' | 'coral'
  icon?: ReactNode
  className?: string
}

export function StatCard({
  value,
  label,
  source,
  variant = 'default',
  accentColor = 'primary',
  icon,
  className = '',
}: StatCardProps) {
  const valueColor = accentColor === 'coral' ? 'text-sp-coral' : 'text-sp-primary'

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className={`flex items-baseline gap-1 ${valueColor}`}>
          {icon}
          <span className="text-2xl font-bold leading-none">{value}</span>
        </div>
        <span className="mt-1 text-[10px] uppercase tracking-wider text-sp-text-muted font-semibold">
          {label}
        </span>
      </div>
    )
  }

  if (variant === 'large') {
    return (
      <div
        className={`rounded-xl border border-sp-border-soft bg-white p-6 ${className}`}
      >
        <div className={`flex items-baseline gap-1 ${valueColor}`}>
          {icon}
          <span className="text-5xl font-bold leading-none">{value}</span>
        </div>
        <p className="mt-3 text-sm text-sp-text-primary leading-relaxed">
          {label}
        </p>
        {source && (
          <p className="mt-4 pt-3 border-t border-sp-border-soft text-[10px] uppercase tracking-wider text-sp-text-muted font-semibold">
            {source}
          </p>
        )}
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl border border-sp-border-soft bg-white p-5 ${className}`}
    >
      <div className={`flex items-baseline gap-1 ${valueColor}`}>
        {icon}
        <span className="text-3xl font-bold leading-none">{value}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-wider text-sp-text-muted font-semibold">
        {label}
      </p>
      {source && (
        <p className="mt-2 text-[10px] text-sp-text-muted">{source}</p>
      )}
    </div>
  )
}