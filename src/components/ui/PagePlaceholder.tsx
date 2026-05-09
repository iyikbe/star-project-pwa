type PagePlaceholderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7A90]">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-[#172033] md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#5B6472]">
          {description}
        </p>
      ) : null}
    </section>
  )
}
