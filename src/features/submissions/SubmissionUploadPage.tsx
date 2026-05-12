import { useState } from 'react'
import { useParams } from 'react-router-dom'

const REPORT_DOC = {
  name: 'Pasta_Project_Final_Report.docx',
  size: '2.4 MB',
  uploadedAt: 'Uploaded just now',
  sectionsNote: 'All 4 weekly sections present',
}

const PHOTOS = [
  { id: 'p1', emoji: '🥚', label: 'Eggs cracking', defaultSelected: true },
  { id: 'p2', emoji: '🍝', label: 'Final pasta', defaultSelected: true },
  { id: 'p3', emoji: '🍅', label: 'Sauce prep', defaultSelected: true },
  { id: 'p4', emoji: '🧂', label: 'Seasoning', defaultSelected: false },
]

const AI_CHECKS = [
  { icon: '📋', label: 'Required sections complete', passed: true },
  { icon: '🔍', label: 'Week 1 research present', passed: true },
  { icon: '🛠', label: 'Week 2 build documented', passed: true },
  { icon: '👥', label: 'Week 3 testing evidence', passed: true },
  { icon: '⭐', label: 'Week 4 reflection present', passed: true },
]

export function SubmissionUploadPage() {
  useParams<{ projectId: string }>()

  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(
    new Set(PHOTOS.filter((p) => p.defaultSelected).map((p) => p.id)),
  )
  const [videoUploaded, setVideoUploaded] = useState(false)
  const reportUploaded = true

  const photosCount = selectedPhotos.size

  const checklistItems = [
    { label: 'Report document uploaded', passed: reportUploaded },
    { label: 'Video proof uploaded', passed: videoUploaded },
    { label: `${photosCount} of 4 photos selected`, passed: photosCount > 0 },
    { label: 'Both team members confirmed', passed: true },
  ]

  const canSubmit = reportUploaded && videoUploaded && photosCount > 0

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Section 1 — Page header */}
        <section>
          <h1 className="font-serif text-3xl font-semibold tracking-normal text-sp-primary md:text-4xl">
            Submit your project for review
          </h1>
          <p className="mt-2 text-sm text-sp-text-muted">
            Pasta from Scratch · Final submission before deadline (Apr 12, 23:59 CET)
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sp-coral-bg-soft px-4 py-2 text-sm font-semibold text-sp-coral">
            <span aria-hidden="true">⏰</span>
            11 days · 4 hours remaining
          </div>
        </section>

        {/* Section 2 — Step 1 Report Document */}
        <section>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sp-primary font-serif text-sm font-semibold text-white">
              1
            </span>
            <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
              Report Document
            </h2>
          </div>
          <p className="mb-4 ml-10 text-sm text-sp-text-muted">
            Upload your completed report (.docx or .pdf). It will be reviewed automatically by our
            AI for completeness.
          </p>

          <div className="ml-10 flex flex-col gap-3 rounded-xl border border-sp-accent-green/30 bg-sp-accent-green-bg/30 p-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-sp-border-soft bg-white text-2xl">
              📄
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-sp-primary">
                  {REPORT_DOC.name}
                </p>
                <span className="inline-flex items-center rounded-full bg-sp-accent-green px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  ✓ UPLOADED
                </span>
              </div>
              <p className="mt-0.5 text-xs text-sp-text-muted">
                {REPORT_DOC.size} · {REPORT_DOC.uploadedAt} · {REPORT_DOC.sectionsNote}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <button
                type="button"
                className="rounded-md border border-sp-border-input bg-white px-3 py-1.5 text-xs font-semibold text-sp-text-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                Preview
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-sp-danger hover:text-sp-danger/80"
              >
                Remove
              </button>
            </div>
          </div>
        </section>

        {/* Section 3 — Step 2 Video Proof */}
        <section>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sp-primary font-serif text-sm font-semibold text-white">
              2
            </span>
            <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
              Video Proof
            </h2>
          </div>
          <p className="mb-4 ml-10 text-sm text-sp-text-muted">
            Upload a 2–5 minute video showing your final result. Reviewed manually by an admin if
            needed. Maximum 200MB.
          </p>

          <div
            onClick={() => setVideoUploaded(true)}
            className="ml-10 cursor-pointer rounded-xl border-2 border-dashed border-sp-border-input p-8 text-center transition-all hover:border-sp-coral hover:bg-sp-coral-bg-soft/20 md:p-12"
          >
            <div className="mb-3 text-5xl" aria-hidden="true">
              🎥
            </div>
            <p className="text-sm font-semibold text-sp-primary md:text-base">
              {videoUploaded ? 'Video uploaded ✓' : 'Drop your video here or click to browse'}
            </p>
            <p className="mt-1 text-xs text-sp-text-muted">
              MP4 · MOV · WebM · max 200 MB · 2–5 minutes recommended
            </p>
            {!videoUploaded && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setVideoUploaded(true)
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-sp-border-input bg-white px-4 py-2 text-sm font-semibold text-sp-primary transition-colors hover:bg-sp-bg-card-muted"
              >
                Browse Files
              </button>
            )}
          </div>
        </section>

        {/* Section 4 — Step 3 Optional Photos */}
        <section>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sp-primary font-serif text-sm font-semibold text-white">
              3
            </span>
            <h2 className="font-serif text-lg font-semibold text-sp-primary md:text-xl">
              Optional Photos
              <span className="ml-2 text-sm font-normal text-sp-text-muted">
                — from your weekly task uploads
              </span>
            </h2>
          </div>
          <p className="mb-4 ml-10 text-sm text-sp-text-muted">
            Already uploaded during weekly tasks. Select which to include with your final
            submission.
          </p>

          <div className="ml-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {PHOTOS.map((photo) => {
              const isSelected = selectedPhotos.has(photo.id)
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => {
                    setSelectedPhotos((prev) => {
                      const next = new Set(prev)
                      if (next.has(photo.id)) next.delete(photo.id)
                      else next.add(photo.id)
                      return next
                    })
                  }}
                  className={`relative flex aspect-square items-center justify-center rounded-xl border-2 text-5xl transition-all ${
                    isSelected
                      ? 'border-sp-accent-green bg-sp-accent-green-bg'
                      : 'border-sp-border-soft bg-sp-bg-card-muted opacity-70 hover:opacity-100'
                  }`}
                >
                  <span aria-hidden="true">{photo.emoji}</span>
                  {isSelected && (
                    <span
                      className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sp-accent-green text-[10px] font-bold text-white"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <p className="ml-10 mt-3 text-xs text-sp-text-muted">
            {photosCount} of 4 photos selected
          </p>
        </section>

        {/* Submit button */}
        <section className="ml-10">
          <button
            type="button"
            disabled={!canSubmit}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold transition-colors ${
              canSubmit
                ? 'bg-sp-primary text-white hover:bg-sp-primary-hover'
                : 'cursor-not-allowed bg-sp-border-soft text-sp-text-muted'
            }`}
          >
            📤 Submit for Final Review
          </button>
          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-sp-text-muted">
              {!videoUploaded
                ? 'Upload video to enable submit'
                : 'Complete all required items to submit'}
            </p>
          )}
        </section>
      </div>

      {/* RIGHT COLUMN — Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Submission Checklist */}
        <section className="rounded-xl border border-sp-border-soft bg-white p-5">
          <h3 className="font-serif mb-4 text-base font-semibold text-sp-primary">
            Submission Checklist
          </h3>

          <ul className="flex flex-col gap-3">
            {checklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    item.passed
                      ? 'bg-sp-accent-green text-white'
                      : 'bg-sp-border-soft text-sp-text-muted'
                  }`}
                >
                  <span className="text-[10px] font-bold" aria-hidden="true">
                    {item.passed ? '✓' : '○'}
                  </span>
                </div>
                <span
                  className={`text-sm leading-relaxed ${
                    item.passed ? 'text-sp-primary' : 'font-medium text-sp-text-primary'
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* AI Pre-Check */}
        <section className="rounded-xl border border-sp-accent-green/30 bg-sp-accent-green-bg/40 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🤖
              </span>
              <h3 className="font-serif text-base font-semibold text-sp-primary">
                AI Pre-Check
              </h3>
            </div>
            <span className="inline-flex items-center rounded-full bg-sp-accent-green px-2.5 py-1 text-[10px] font-bold uppercase text-white">
              PASSED
            </span>
          </div>

          <p className="mb-4 text-xs leading-relaxed text-sp-text-muted">
            Our AI checks your report for completeness and structure before final submission.
          </p>

          <ul className="flex flex-col gap-2">
            {AI_CHECKS.map((check, i) => (
              <li key={i} className="flex items-center gap-2 text-xs">
                <span className="flex-shrink-0" aria-hidden="true">
                  {check.icon}
                </span>
                <span className="flex-1 text-sp-text-primary">{check.label}</span>
                <span className="font-bold text-sp-accent-green" aria-hidden="true">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}