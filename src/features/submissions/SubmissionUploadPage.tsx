import { useState } from 'react'

type Photo = {
  id: string
  icon: string
  label: string
}

const PHOTOS: Photo[] = [
  { id: 'egg', icon: '🥚', label: 'egg_prep.jpg' },
  { id: 'pasta', icon: '🍝', label: 'pasta_dough.jpg' },
  { id: 'tomato', icon: '🍅', label: 'tomato_sauce.jpg' },
  { id: 'salt', icon: '🧂', label: 'salt_test.jpg' },
]

const INITIAL_SELECTED = new Set(['egg', 'pasta', 'tomato'])

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">
        Star Project › My Projects › Pasta from Scratch › Submit for Review
      </p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Baby · ⭐ 7</p>
        </div>
        <button
          type="button"
          className="relative rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          🔔
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C96B5A] text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          className="rounded-xl border border-[#E8E1D8] bg-[#FFFDF8] px-3 py-2 text-sm text-[#5B6472] hover:bg-[#F4EFE7]"
        >
          ✉️
        </button>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
        Submit your project for review
      </h1>
      <p className="mt-1 text-sm text-[#5B6472]">
        Pasta from Scratch · Final submission before deadline (Apr 12, 23:59 CET)
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FCE1D8] px-3.5 py-1.5 text-xs font-semibold text-[#C96B5A]">
        ⏰ 11 days · 4 hours remaining
      </p>
    </div>
  )
}

function StepReport() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#172033]">Step 1 · Report Document</p>
      <p className="mt-1 text-xs text-[#5B6472]">
        Upload your completed report (.docx or .pdf). It will be reviewed automatically by our AI
        for completeness.
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#DDEBDD] bg-[#DDEBDD]/30 p-4">
        <span className="text-xl">📄</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#172033] truncate">
            Pasta_Project_Final_Report.docx
          </p>
          <p className="text-xs text-[#5B6472]">
            2.4 MB · Uploaded just now · All 4 weekly sections present
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            className="rounded-full border border-[#E8E1D8] px-3.5 py-1.5 text-xs font-medium text-[#5B6472] transition-colors hover:border-[#26483E] hover:text-[#26483E]"
          >
            Preview
          </button>
          <button
            type="button"
            className="rounded-full border border-[#C96B5A] px-3.5 py-1.5 text-xs font-medium text-[#C96B5A] transition-colors hover:bg-[#C96B5A] hover:text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

function StepVideo() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#172033]">Step 2 · Video Proof</p>
      <p className="mt-1 text-xs text-[#5B6472]">
        Upload a 2–5 minute video showing your final result. Reviewed manually by an admin if
        needed. Maximum 200MB.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D8D3CA] bg-[#FAF7F2] px-6 py-10 text-center">
        <span className="text-4xl">🎥</span>
        <p className="mt-4 text-sm font-medium text-[#172033]">
          Drop your video here or click to browse
        </p>
        <p className="mt-1 text-xs text-[#8A8F98]">
          MP4 · MOV · WebM · max 200 MB · 2–5 minutes recommended
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-[#26483E] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1F3D35]"
        >
          Browse Files
        </button>
      </div>
    </div>
  )
}

function StepPhotos() {
  const [selected, setSelected] = useState<Set<string>>(INITIAL_SELECTED)

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#172033]">
        Step 3 · Optional Photos — from your weekly task uploads
      </p>
      <p className="mt-1 text-xs text-[#5B6472]">
        Already uploaded during weekly tasks. Select which to include with your final submission.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {PHOTOS.map((photo) => {
          const isSelected = selected.has(photo.id)
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => toggle(photo.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all ${
                isSelected
                  ? 'border-[#26483E] bg-[#DDEBDD] ring-1 ring-[#26483E]'
                  : 'border-[#E8E1D8] bg-[#FFFDF8] hover:border-[#D8D3CA]'
              }`}
            >
              <span>{photo.icon}</span>
              <span className="text-xs text-[#5B6472]">{photo.label}</span>
              {isSelected && <span className="text-xs font-bold text-[#26483E]">✓</span>}
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-[#8A8F98]">{selected.size} of 4 photos selected</p>
    </div>
  )
}

function Checklist() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Submission Checklist</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDEBDD] text-[10px] font-bold text-[#26483E]">
            ✓
          </span>
          <span className="text-sm text-[#172033]">Report document uploaded</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E8E1D8] text-[10px] text-[#8A8F98]">
            ✗
          </span>
          <span className="text-sm text-[#8A8F98]">Video proof uploaded</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDEBDD] text-[10px] font-bold text-[#26483E]">
            ✓
          </span>
          <span className="text-sm text-[#172033]">3 of 4 photos selected</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDEBDD] text-[10px] font-bold text-[#26483E]">
            ✓
          </span>
          <span className="text-sm text-[#172033]">Both team members confirmed</span>
        </div>
      </div>
    </div>
  )
}

function AiPreCheck() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">
        🤖 AI Pre-Check <span className="text-[#26483E]">PASSED</span>
      </p>
      <p className="mb-4 text-xs text-[#5B6472]">
        Our AI checks your report for completeness and structure before final submission.
      </p>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#26483E]">✓</span>
          <span className="text-[#5B6472]">Required sections complete</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#26483E]">✓</span>
          <span className="text-[#5B6472]">Week 1 research present</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#26483E]">✓</span>
          <span className="text-[#5B6472]">Week 2 build documented</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#26483E]">✓</span>
          <span className="text-[#5B6472]">Week 3 testing evidence</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#26483E]">✓</span>
          <span className="text-[#5B6472]">Week 4 reflection present</span>
        </div>
      </div>
    </div>
  )
}

function SubmitButton() {
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-full bg-[#8A8F98] px-10 py-3.5 text-sm font-bold text-white opacity-60 shadow-sm"
      >
        📤 Submit for Final Review
      </button>
      <p className="mt-2 text-xs text-[#8A8F98]">Upload video to enable submit</p>
    </div>
  )
}

export function SubmissionUploadPage() {
  return (
    <div>
      <TopBar />
      <PageHeader />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <StepReport />
          <StepVideo />
          <StepPhotos />
        </div>

        <div className="space-y-5">
          <Checklist />
          <AiPreCheck />
        </div>
      </div>

      <SubmitButton />
    </div>
  )
}