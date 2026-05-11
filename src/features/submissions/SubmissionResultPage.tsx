import { Link } from 'react-router-dom'

type ReviewItem = {
  icon: string
  title: string
  description: string
  success: boolean
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    icon: '✓',
    title: 'Report Document — Passed AI Review',
    description:
      'All 4 weekly sections complete · Strong testing evidence (Week 3) · Excellent reflection',
    success: true,
  },
  {
    icon: '✓',
    title: 'Video Proof — Approved by Admin',
    description:
      'Reviewed by Maria S. (Star Project Team) · 3:42 video shows full process clearly',
    success: true,
  },
  {
    icon: '✓',
    title: 'Team Participation — Both members verified',
    description: 'Lukas Müller and Sophie K. both contributed to weekly tasks',
    success: true,
  },
  {
    icon: '★',
    title: 'Achievement Issued — Pasta Master Baby',
    description: 'Added to your Achievements list · Certificate generated',
    success: true,
  },
]

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">
        Star Project › My Projects › Pasta from Scratch › Review Result
      </p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Baby · ⭐ 8</p>
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

function SuccessHeader() {
  return (
    <div className="rounded-2xl border border-[#DDEBDD] bg-[#FFFDF8] p-7 shadow-sm">
      <span className="inline-block rounded-full bg-[#DDEBDD] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#26483E]">
        ⭐ Project Completed
      </span>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
        Excellent work, Lukas!
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5B6472]">
        Your Pasta from Scratch project has been accepted. You&apos;ve earned 1 star in Chef · Baby
        Level. You now have 8 of 10 stars needed to unlock Junior!
      </p>
    </div>
  )
}

function ReviewBreakdown() {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-[#172033]">Review Breakdown</p>
      <p className="mb-4 text-xs text-[#5B6472]">
        Your submission was reviewed automatically by our AI for the report and manually by an admin
        for the video.
      </p>

      <div className="space-y-3">
        {REVIEW_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  item.success
                    ? 'bg-[#DDEBDD] text-[#26483E]'
                    : 'bg-[#FCE1D8] text-[#C96B5A]'
                }`}
              >
                {item.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#172033]">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5B6472]">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewerNote() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#26483E] text-xs font-bold text-white">
          MS
        </div>
        <div>
          <p className="text-sm font-semibold text-[#172033]">Note from Maria S. · Reviewer</p>
        </div>
      </div>
      <p className="mt-4 text-sm italic leading-relaxed text-[#5B6472]">
        &ldquo;Beautifully documented project, Lukas! Your reflection on what went wrong with the
        first batch and how you improved the salt level was very mature. Sophie&apos;s photography
        is fantastic. Keep going!&rdquo;
      </p>
    </div>
  )
}

function Certificate() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-7 shadow-sm">
      <div className="rounded-xl border-2 border-[#26483E]/30 bg-[#FAF7F2] p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#26483E]">
          Certificate of Completion
        </p>

        <p className="mt-6 text-xs text-[#5B6472]">This certifies that</p>
        <p className="mt-1 text-xl font-bold text-[#172033]">Lukas Müller</p>

        <p className="mt-4 text-xs text-[#5B6472]">
          has successfully completed the project
        </p>
        <p className="mt-1 text-base font-semibold text-[#172033]">&ldquo;Pasta from Scratch&rdquo;</p>

        <p className="mt-1 text-xs text-[#5B6472]">at Chef · Baby Level</p>
        <p className="mt-3 text-xs text-[#5B6472]">with team member Sophie K.</p>

        <div className="my-6 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C542] text-2xl shadow-sm">
            ★
          </span>
        </div>

        <p className="mt-6 text-xs text-[#8A8F98]">
          Issued April 4, 2026 · Star Project Kassel
        </p>
      </div>
    </div>
  )
}

function ProgressNote() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#172033]">Progress to Junior</p>
          <p className="mt-1 text-xs text-[#5B6472]">8 of 10 stars in Chef · Baby Level</p>
        </div>
        <span className="text-sm font-bold text-[#26483E]">80%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F4EFE7]">
        <div className="h-full w-[80%] rounded-full bg-[#26483E]" />
      </div>
      <p className="mt-3 text-center text-xs font-medium text-[#26483E]">
        2 more stars to unlock Junior Level
      </p>
    </div>
  )
}

function ActionButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#26483E] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1F3D35] hover:shadow-md"
      >
        ⬇ Download Certificate (PDF)
      </button>
      <Link
        to="/start"
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8E1D8] bg-[#FFFDF8] px-7 py-3 text-sm font-bold text-[#26483E] shadow-sm transition-all hover:border-[#26483E] hover:shadow-md"
      >
        🚀 Browse Next Projects
      </Link>
    </div>
  )
}

export function SubmissionResultPage() {
  return (
    <div>
      <TopBar />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SuccessHeader />
          <ReviewBreakdown />
          <ReviewerNote />
          <ActionButtons />
        </div>

        <div className="space-y-5">
          <Certificate />
          <ProgressNote />
        </div>
      </div>
    </div>
  )
}