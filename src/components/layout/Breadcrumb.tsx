import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-sp-text-muted hover:text-sp-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-sp-primary font-semibold' : 'text-sp-text-muted'}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className="text-sp-text-muted" aria-hidden="true">
                ›
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}