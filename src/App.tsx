function App() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-[#172033]">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7A90]">
            Star Project MVP
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Project-based learning platform for children and parents.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5B6472]">
            This is the first deployable foundation for Star Project. Next, we
            will add routing, design system components, PWA installation, and
            Supabase integration step by step.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#172033] px-6 py-3 text-sm font-semibold text-white shadow-sm">
              Start Project
            </button>
            <button className="rounded-full border border-[#D8D3CA] bg-white px-6 py-3 text-sm font-semibold text-[#172033]">
              View MVP Plan
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Parent dashboard",
            "Child project profile",
            "Project submission flow",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#172033]">{item}</p>
              <p className="mt-2 text-sm leading-6 text-[#6B7A90]">
                Coming soon in the MVP implementation phase.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App