import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionEyebrow } from '../../components/ui'
import { CATEGORY_LIST } from '../../lib/constants/categories'
import { LEVEL_LIST } from '../../lib/constants/levels'

const SAFETY_LABELS = [
  { id: 'adult_supervision', label: 'Adult Supervision Required', icon: '👨‍👩‍👧' },
  { id: 'no_knife', label: 'No Knife', icon: '🔪' },
  { id: 'no_open_fire', label: 'No Open Fire', icon: '🔥' },
  { id: 'allergy_check', label: 'Allergy Check Required', icon: '⚠️' },
  { id: 'private_submission', label: 'Private Submission Only', icon: '🔒' },
]

export function AdminProjectNewPage() {
  const [title, setTitle] = useState('Brezel Workshop')
  const [category, setCategory] = useState('chef')
  const [level, setLevel] = useState('baby')
  const [ageMin, setAgeMin] = useState(6)
  const [duration, setDuration] = useState(4)
  const [starReward, setStarReward] = useState(1)
  const [shortDescription, setShortDescription] = useState(
    'The classic German pretzel — learn the dough, the boil, and the bake.',
  )
  const [longDescription, setLongDescription] = useState(
    'A research-driven 4-week project on tradition, food chemistry, and craft. Children interview locals, document the process, and bake their own version.',
  )

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Research & Validation', estimatedHours: '3-4 hours' },
    { id: 't2', title: 'Build & Create', estimatedHours: '4-5 hours' },
    { id: 't3', title: 'Test & Validate', estimatedHours: '2-3 hours' },
    { id: 't4', title: 'Improve & Finalize', estimatedHours: '4 hours' },
  ])

  const [materials, setMaterials] = useState([
    { id: 'm1', name: 'Flour (500g)' },
    { id: 'm2', name: 'Yeast (1 sachet)' },
    { id: 'm3', name: 'Baking soda / lye (food-grade)' },
    { id: 'm4', name: 'Coarse salt' },
  ])

  const [isFeatured, setIsFeatured] = useState(false)
  const [isNewStars, setIsNewStars] = useState(true)
  const [isMythical, setIsMythical] = useState(false)

  const [selectedSafety, setSelectedSafety] = useState<Set<string>>(
    new Set(['adult_supervision', 'no_open_fire']),
  )

  const toggleSafety = (id: string) => {
    setSelectedSafety((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* LEFT — Form */}
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Form submitted')
        }}
      >
        {/* Page header */}
        <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
              Upload New Project
            </h1>
            <p className="mt-1 text-sm text-sp-text-muted">
              Create a new project for children. All fields are required unless marked optional.
            </p>
          </div>
          <Link
            to="/admin/projects"
            className="whitespace-nowrap text-sm font-semibold text-sp-text-muted hover:text-sp-primary"
          >
            ← Back to Projects
          </Link>
        </section>

        {/* Basic Info */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <SectionEyebrow color="muted">BASIC INFO</SectionEyebrow>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="mb-4">
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-sp-text-primary">
              Project title <span className="text-sp-coral">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Brezel Workshop"
              className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
            />
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Category <span className="text-sp-coral">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              >
                {CATEGORY_LIST.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Level <span className="text-sp-coral">*</span>
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              >
                {LEVEL_LIST.map((lv) => (
                  <option key={lv.slug} value={lv.slug}>
                    {lv.starsDisplay} {lv.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="ageMin" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Recommended age <span className="text-sp-coral">*</span>
              </label>
              <input
                id="ageMin"
                type="number"
                min={4}
                max={18}
                value={ageMin}
                onChange={(e) => setAgeMin(parseInt(e.target.value) || 4)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
            </div>
            <div>
              <label htmlFor="duration" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Duration <span className="text-sp-coral">*</span>
              </label>
              <input
                id="duration"
                type="number"
                min={1}
                max={8}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 4)}
                className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
              />
              <p className="mt-0.5 text-xs text-sp-text-muted">weeks</p>
            </div>
            <div>
              <label htmlFor="starReward" className="mb-1 block text-sm font-medium text-sp-text-primary">
                Star reward <span className="text-sp-coral">*</span>
              </label>
              <div className="relative">
                <input
                  id="starReward"
                  type="number"
                  min={1}
                  max={3}
                  value={starReward}
                  onChange={(e) => setStarReward(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-sp-gold">
                  ⭐
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <SectionEyebrow color="muted">DESCRIPTION</SectionEyebrow>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="mb-4">
            <label htmlFor="shortDesc" className="mb-1 block text-sm font-medium text-sp-text-primary">
              Short description{' '}
              <span className="text-xs font-normal text-sp-text-muted">(shown on cards)</span>
            </label>
            <textarea
              id="shortDesc"
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="One sentence summary..."
              className="w-full resize-none rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
            />
            <p className="mt-1 text-xs text-sp-text-muted">
              {shortDescription.length} / 150 characters
            </p>
          </div>

          <div>
            <label htmlFor="longDesc" className="mb-1 block text-sm font-medium text-sp-text-primary">
              Long description{' '}
              <span className="text-xs font-normal text-sp-text-muted">(shown on project detail)</span>
            </label>
            <textarea
              id="longDesc"
              rows={4}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Detailed project narrative..."
              className="w-full resize-none rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
            />
          </div>
        </section>

        {/* Media Uploads */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <SectionEyebrow color="muted">MEDIA</SectionEyebrow>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="mb-2 text-sm font-medium text-sp-text-primary">Cover thumbnail</p>
              <button
                type="button"
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-sp-border-input text-sp-text-muted transition-all hover:border-sp-coral hover:bg-sp-coral-bg-soft/20 aspect-[4/3]"
              >
                <span className="mb-1 text-3xl" aria-hidden="true">
                  🖼️
                </span>
                <span className="text-xs font-semibold">Upload image</span>
                <span className="mt-1 text-[10px]">JPG, PNG · max 2MB</span>
              </button>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-sp-text-primary">Instruction video</p>
              <button
                type="button"
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-sp-border-input text-sp-text-muted transition-all hover:border-sp-coral hover:bg-sp-coral-bg-soft/20 aspect-[4/3]"
              >
                <span className="mb-1 text-3xl" aria-hidden="true">
                  🎥
                </span>
                <span className="text-xs font-semibold">Upload video</span>
                <span className="mt-1 text-[10px]">MP4 · max 100MB</span>
              </button>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-sp-text-primary">Report template</p>
              <button
                type="button"
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-sp-border-input text-sp-text-muted transition-all hover:border-sp-coral hover:bg-sp-coral-bg-soft/20 aspect-[4/3]"
              >
                <span className="mb-1 text-3xl" aria-hidden="true">
                  📄
                </span>
                <span className="text-xs font-semibold">Upload .docx</span>
                <span className="mt-1 text-[10px]">max 1MB</span>
              </button>
            </div>
          </div>
        </section>

        {/* Weekly Tasks */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5 md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <SectionEyebrow color="muted">WEEKLY TASKS</SectionEyebrow>
            <span className="text-xs text-sp-text-muted">{tasks.length} tasks</span>
          </div>
          <hr className="mb-5 mt-2 border-sp-border-soft" />

          <div className="flex flex-col gap-3">
            {tasks.map((task, idx) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border border-sp-border-soft bg-sp-bg-card-muted p-4"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-sp-border-input bg-white font-serif text-sm font-semibold text-sp-primary">
                  {idx + 1}
                </div>
                <div className="grid flex-1 gap-3 md:grid-cols-[2fr_1fr]">
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => {
                      const next = [...tasks]
                      next[idx] = { ...next[idx], title: e.target.value }
                      setTasks(next)
                    }}
                    placeholder="Task title (e.g. Research & Validation)"
                    className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2 text-sm outline-none focus:border-sp-primary"
                  />
                  <input
                    type="text"
                    value={task.estimatedHours}
                    onChange={(e) => {
                      const next = [...tasks]
                      next[idx] = { ...next[idx], estimatedHours: e.target.value }
                      setTasks(next)
                    }}
                    placeholder="3-4 hours"
                    className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2 text-sm outline-none focus:border-sp-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sp-danger transition-colors hover:bg-red-50"
                  aria-label={`Remove task ${idx + 1}`}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setTasks((prev) => [...prev, { id: `t${Date.now()}`, title: '', estimatedHours: '' }])
            }
            className="mt-3 w-full rounded-lg border border-dashed border-sp-border-input bg-white px-3 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
          >
            + Add Weekly Task
          </button>
        </section>
      </form>

      {/* RIGHT — Sidebar */}
      <aside className="flex flex-col gap-4">
        {/* Publish Status */}
        <section className="sticky top-6 rounded-xl border border-sp-border-soft bg-white p-5">
          <SectionEyebrow color="muted">PUBLISH</SectionEyebrow>
          <hr className="mb-4 mt-2 border-sp-border-soft" />

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => console.log('Publish project')}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-sp-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
            >
              ✓ Publish Project
            </button>
            <button
              type="button"
              onClick={() => console.log('Save as draft')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-sp-border-input bg-white px-4 py-2.5 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
            >
              💾 Save as Draft
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-sp-text-muted">
            Drafts are not visible to users. Publishing makes the project available based on level +
            age rules.
          </p>
        </section>

        {/* Visibility Flags */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <SectionEyebrow color="muted">VISIBILITY</SectionEyebrow>
          <hr className="mb-4 mt-2 border-sp-border-soft" />

          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-sp-primary">🔥 Featured on Home</p>
                <p className="mt-0.5 text-xs leading-relaxed text-sp-text-muted">
                  Show in &ldquo;Newly Released&rdquo; carousel on homepage.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isNewStars}
                onChange={(e) => setIsNewStars(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-accent-green"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-sp-primary">✨ New Stars badge</p>
                <p className="mt-0.5 text-xs leading-relaxed text-sp-text-muted">
                  Mark as recently launched for 30 days.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isMythical}
                onChange={(e) => setIsMythical(e.target.checked)}
                className="mt-1 h-4 w-4 accent-sp-gold"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-sp-primary">⭐ Mythical (premium expert-led)</p>
                <p className="mt-0.5 text-xs leading-relaxed text-sp-text-muted">
                  One-time purchase. Sets pricing at €50/star.
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* Safety Labels */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <SectionEyebrow color="muted">SAFETY LABELS</SectionEyebrow>
          <hr className="mb-4 mt-2 border-sp-border-soft" />

          <p className="mb-3 text-xs leading-relaxed text-sp-text-muted">
            Select all relevant safety requirements. Shown to parents before project starts.
          </p>

          <div className="space-y-2">
            {SAFETY_LABELS.map((label) => {
              const isSelected = selectedSafety.has(label.id)
              return (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => toggleSafety(label.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  className={`flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-sp-coral bg-sp-coral-bg-soft'
                      : 'border-sp-border-soft bg-white hover:border-sp-primary/30'
                  }`}
                >
                  <span className="flex-shrink-0 text-lg" aria-hidden="true">
                    {label.icon}
                  </span>
                  <span
                    className={`flex-1 text-xs font-medium ${
                      isSelected ? 'text-sp-coral' : 'text-sp-text-primary'
                    }`}
                  >
                    {label.label}
                  </span>
                  {isSelected && (
                    <span
                      className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-sp-coral text-[9px] font-bold text-white"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Materials List */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <div className="mb-2 flex items-center justify-between">
            <SectionEyebrow color="muted">MATERIALS</SectionEyebrow>
            <span className="text-xs text-sp-text-muted">{materials.length} items</span>
          </div>
          <hr className="mb-4 mt-2 border-sp-border-soft" />

          <div className="space-y-2">
            {materials.map((material, idx) => (
              <div key={material.id} className="flex items-center gap-2">
                <span className="w-5 text-xs text-sp-text-muted">{idx + 1}.</span>
                <input
                  type="text"
                  value={material.name}
                  onChange={(e) => {
                    const next = [...materials]
                    next[idx] = { ...next[idx], name: e.target.value }
                    setMaterials(next)
                  }}
                  placeholder="e.g. Flour (500g)"
                  className="flex-1 rounded-lg border border-sp-border-input bg-white px-3 py-1.5 text-sm outline-none focus:border-sp-primary"
                />
                <button
                  type="button"
                  onClick={() => setMaterials((prev) => prev.filter((m) => m.id !== material.id))}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-sm text-sp-danger transition-colors hover:bg-red-50"
                  aria-label={`Remove material ${idx + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setMaterials((prev) => [...prev, { id: `m${Date.now()}`, name: '' }])
            }
            className="mt-3 w-full rounded-lg border border-dashed border-sp-border-input bg-white px-3 py-2 text-xs font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
          >
            + Add Material
          </button>
        </section>
      </aside>
    </div>
  )
}