type SectionEyebrowProps = {
  children: string
  color?: 'coral' | 'primary' | 'muted'
  className?: string
}

const colorStyles: Record<string, string> = {
  coral: 'text-sp-coral',
  primary: 'text-sp-primary',
  muted: 'text-sp-text-muted',
}

export function SectionEyebrow({
  children,
  color = 'coral',
  className = '',
}: SectionEyebrowProps) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.08em] font-semibold ${colorStyles[color]} ${className}`}
    >
      {children}
    </p>
  )
}