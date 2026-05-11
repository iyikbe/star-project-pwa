import { useParams } from 'react-router-dom'

type Task = {
  number: number
  title: string
  meta: string
  description: string
}

const TASKS: Task[] = [
  {
    number: 1,
    title: 'Research & Validation',
    meta: 'Week 1 · Estimated 3–4 hours',
    description:
      'Interview 5 people about their favorite pretzel. Research the history of Brezel in Hessen. Compare 3 local bakeries\' prices. Document allergies and dietary restrictions among testers.',
  },
  {
    number: 2,
    title: 'Build & Create',
    meta: 'Week 2 · Estimated 4–5 hours',
    description:
      'Make your first batch of Brezel based on Week 1 findings. Document each step with photos. Note variations from the standard recipe.',
  },
  {
    number: 3,
    title: 'Test & Validate',
    meta: 'Week 3 · Estimated 2–3 hours',
    description:
      'Give samples to 5 testers. Collect structured feedback on taste, texture, salt level, and appearance using the provided template.',
  },
  {
    number: 4,
    title: 'Improve & Finalize',
    meta: 'Week 4 · Estimated 4 hours · Final deadline ⏰',
    description:
      'Make a second batch with improvements. Prepare your final report and a 3-minute video proof. Submit for review.',
  },
]

type InProgressTask = {
  number: number
  title: string
  status: 'DONE' | 'ACTIVE' | 'LOCKED'
  meta: string
  description: string
}

const IN_PROGRESS_TASKS: InProgressTask[] = [
  {
    number: 1,
    title: 'Research & Validation',
    status: 'DONE',
    meta: 'Week 1 · Completed Mar 22',
    description:
      'You interviewed 6 family members about their favorite pasta dishes. Compared sauce prices at 3 supermarkets. Documented allergies of testers.',
  },
  {
    number: 2,
    title: 'Build & Create',
    status: 'DONE',
    meta: 'Week 2 · Completed Mar 29',
    description:
      'You and Sophie made fresh tagliatelle from scratch. Tomato-basil sauce based on Nonna\'s recipe research. 8 photos uploaded.',
  },
  {
    number: 3,
    title: 'Test & Validate',
    status: 'ACTIVE',
    meta: 'Week 3 · In progress · Due Apr 5',
    description:
      'Give samples to 5 testers. Collect feedback. Document reactions and improvement notes.\nSophie has uploaded 2 photos. You haven\'t logged tester feedback yet.',
  },
  {
    number: 4,
    title: 'Improve & Finalize',
    status: 'LOCKED',
    meta: 'Week 4 · Final deadline Apr 12 ⏰',
    description:
      'Make improved version. Submit final report + 3-minute video proof for review.',
  },
]

type ActivityItem = {
  icon: string
  initials: string
  label: string
  time: string
}

const ACTIVITY: ActivityItem[] = [
  {
    icon: '📸',
    initials: 'SK',
    label: 'Sophie K. uploaded 2 photos for Week 3 — Test & Validate',
    time: '2h ago',
  },
  {
    icon: '✓',
    initials: 'LM',
    label: 'You marked Week 2 as complete',
    time: 'Yesterday',
  },
  {
    icon: '📸',
    initials: 'SK',
    label: 'Sophie K. uploaded 4 photos for Week 2 — Build & Create',
    time: '2 days ago',
  },
  {
    icon: '⭐',
    initials: '',
    label: 'System: Project officially started · Timer began Mar 15',
    time: '',
  },
]

type FileItem = {
  name: string
  size: string
  by: string
}

const FILES: FileItem[] = [
  { name: 'week2_pasta_dough.jpg', size: '2.3 MB', by: 'Sophie' },
  { name: 'week2_final_dish.jpg', size: '1.8 MB', by: 'Sophie' },
  { name: 'week1_research.docx', size: '245 KB', by: 'you' },
]

/* ─── Pre-Start (Brezel Workshop) components ─── */

function PreStartTopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › My Projects › Brezel Workshop</p>
      <UserSummary />
    </div>
  )
}

function UserSummary() {
  return (
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
  )
}

function PreStartProjectHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE1D8] text-2xl">
          🥨
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
          Brezel Workshop
        </h1>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5B6472]">
        The classic German pretzel — knead the dough, master the lye boil, and bake. A research-driven
        4-week project on tradition, food chemistry, and craft.
      </p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5B6472]">
        <span>⏱ 4 weeks</span>
        <span>⭐ 1 Star reward</span>
        <span>👥 Min 2 members</span>
        <span className="rounded-full bg-[#FCE1D8] px-2 py-0.5 text-[10px] font-medium text-[#E98A6A]">
          Adult supervision
        </span>
        <span className="rounded-full bg-[#F4EFE7] px-2 py-0.5 text-[10px] font-medium text-[#5B6472]">
          🚫 No open fire
        </span>
      </div>
    </div>
  )
}

function PreStartStatusCard() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <span className="rounded-full bg-[#F2E2B8] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B88A3A]">
        WAITING FOR MEMBER
      </span>
      <p className="mt-3 text-sm font-semibold text-[#172033]">Need 1 more member to start</p>

      <div className="my-4 rounded-xl bg-[#FCE1D8] px-4 py-3 text-center">
        <span className="text-2xl">🥨</span>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#E98A6A]">
          CHEF ⭐⭐ BABY
        </p>
      </div>

      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-full bg-[#8A8F98] px-6 py-3 text-sm font-bold text-white opacity-60"
      >
        ▶ Start Project
      </button>
      <p className="mt-2 text-center text-xs text-[#8A8F98]">
        Need at least 2 members to begin
      </p>
    </div>
  )
}

function PreStartVideoPlaceholder() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Project Introduction</p>
      <div className="flex aspect-video items-center justify-center rounded-xl bg-[#26483E]/5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#26483E] text-white">
            ▶
          </div>
          <p className="mt-3 text-sm font-medium text-[#172033]">
            How to Make a Real Brezel — 4-week project intro
          </p>
          <p className="mt-1 text-xs text-[#8A8F98]">
            12:34 · Chef Anna walks you through the project
          </p>
        </div>
      </div>
    </div>
  )
}

function PreStartReportTemplate() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">📄 Brezel Project Report Template</p>
      <p className="text-xs text-[#5B6472]">.docx · 245 KB · 4 sections matching weekly tasks</p>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#26483E] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1F3D35]"
      >
        ⬇ Download
      </button>
    </div>
  )
}

function PreStartTeamMembers() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#172033]">Team Members</p>
        <span className="text-xs text-[#8A8F98]">1 / 2 minimum</span>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-[#F4EFE7] p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#26483E] text-xs font-bold text-white">
          LM
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#172033]">Lukas Müller (You)</p>
          <p className="text-xs text-[#8A8F98]">SP-2026-0048 · Owner</p>
        </div>
        <span className="rounded-full bg-[#DDEBDD] px-2.5 py-0.5 text-[10px] font-semibold text-[#26483E]">
          JOINED
        </span>
      </div>
    </div>
  )
}

function PreStartInviteMember() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-2 text-sm font-semibold text-[#172033]">Invite a Team Member</p>
      <p className="text-xs text-[#5B6472]">
        Only registered users can be invited. Use their Student ID — no email or phone.
      </p>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          defaultValue="SP-2026-0052"
          className="flex-1 rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] outline-none transition-colors focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
        />
        <button
          type="button"
          className="rounded-full bg-[#26483E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1F3D35]"
        >
          📩 Send
        </button>
      </div>
    </div>
  )
}

function PreStartPendingInvitations() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Pending Invitations</p>

      <div className="flex items-center gap-3 rounded-xl bg-[#F4EFE7] p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5B6472] text-xs font-bold text-white">
          SK
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#172033]">Sophie K.</p>
          <p className="text-xs text-[#8A8F98]">SP-2026-0052 · Sent 2h ago</p>
        </div>
        <span className="rounded-full bg-[#F2E2B8] px-2.5 py-0.5 text-[10px] font-semibold text-[#B88A3A]">
          PENDING
        </span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#8A8F98]">
        Invitations expire after 7 days. Project cannot start until at least 2 members have joined.
      </p>
    </div>
  )
}

function PreStartTaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#26483E] text-xs font-bold text-white">
          {task.number}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-[#172033]">{task.title}</h3>
            <span className="rounded-full bg-[#F4EFE7] px-2.5 py-0.5 text-[10px] font-medium text-[#5B6472]">
              UPCOMING
            </span>
          </div>
          <p className="mt-1 text-xs text-[#8A8F98]">{task.meta}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{task.description}</p>
        </div>
      </div>
    </div>
  )
}

function PreStartWeeklyTasks() {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-[#172033]">Weekly Tasks</p>
      <div className="space-y-3">
        {TASKS.map((task) => (
          <PreStartTaskCard key={task.number} task={task} />
        ))}
      </div>
    </div>
  )
}

function PreStartView() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <PreStartVideoPlaceholder />
        <PreStartReportTemplate />
        <PreStartWeeklyTasks />
      </div>

      <div className="space-y-5">
        <PreStartStatusCard />
        <PreStartTeamMembers />
        <PreStartInviteMember />
        <PreStartPendingInvitations />
      </div>
    </div>
  )
}

/* ─── In Progress (Pasta from Scratch) components ─── */

function InProgressTopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › My Projects › Pasta from Scratch</p>
      <UserSummary />
    </div>
  )
}

function InProgressProjectHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE1D8] text-2xl">
          🍝
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
          Pasta from Scratch
        </h1>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5B6472]">
        Make handmade pasta with traditional techniques + your own sauce. Document each step. Test
        with family.
      </p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5B6472]">
        <span>⏱ Started Mar 15</span>
        <span>📅 Final deadline Apr 12</span>
        <span>👥 Team of 2</span>
        <span className="rounded-full bg-[#DDEBDD] px-2 py-0.5 text-[10px] font-medium text-[#26483E]">
          📈 72% complete
        </span>
      </div>
    </div>
  )
}

function InProgressStatusCard({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm ${className ?? ''}`}>
      <div className="mb-4 rounded-xl bg-[#FCE1D8] px-4 py-3 text-center">
        <span className="text-2xl">🍝</span>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#E98A6A]">
          CHEF ⭐⭐ BABY
        </p>
      </div>

      <span className="rounded-full bg-[#FCE1D8] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C96B5A]">
        🔥 ONGOING · WEEK 3
      </span>

      <div className="my-4 text-center">
        <p className="text-3xl font-bold text-[#172033]">11 days</p>
        <p className="text-xl font-bold text-[#172033]">4 hours</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
          Time Remaining
        </p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4EFE7]">
        <div className="h-full w-[72%] rounded-full bg-[#26483E]" />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#8A8F98]">
        Final deadline: April 12, 2026 · 23:59 CET · Late fee applies if missed
      </p>
    </div>
  )
}

function InProgressTaskCard({ task }: { task: InProgressTask }) {
  const statusStyles: Record<string, { circle: string; badge: string; border: string }> = {
    DONE: {
      circle: 'bg-[#DDEBDD] text-[#26483E]',
      badge: 'bg-[#DDEBDD] text-[#26483E]',
      border: 'border-[#DDEBDD]',
    },
    ACTIVE: {
      circle: 'bg-[#26483E] text-white',
      badge: 'bg-[#FCE1D8] text-[#C96B5A]',
      border: 'border-[#26483E] ring-1 ring-[#26483E]',
    },
    LOCKED: {
      circle: 'bg-[#F4EFE7] text-[#8A8F98]',
      badge: 'bg-[#F4EFE7] text-[#8A8F98]',
      border: 'border-[#E8E1D8] opacity-70',
    },
  }

  const s = statusStyles[task.status]

  return (
    <div className={`rounded-2xl border bg-[#FFFDF8] p-5 shadow-sm ${s.border}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.circle}`}
        >
          {task.status === 'DONE' ? '✓' : task.number}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-[#172033]">{task.title}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${s.badge}`}
            >
              {task.status}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#8A8F98]">{task.meta}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">{task.description}</p>
        </div>
      </div>
    </div>
  )
}

function InProgressWeeklyTasks() {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-[#172033]">Weekly Progress</p>
      <div className="space-y-3">
        {IN_PROGRESS_TASKS.map((task) => (
          <InProgressTaskCard key={task.number} task={task} />
        ))}
      </div>
    </div>
  )
}

function InProgressTeamActivity() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Team Activity</p>
      <div className="space-y-4">
        {ACTIVITY.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                item.initials ? 'bg-[#F4EFE7] text-[#5B6472]' : 'bg-[#26483E] text-white'
              }`}
            >
              {item.initials || '⭐'}
            </div>
            <div className="flex-1">
              <p className="text-xs leading-relaxed text-[#172033]">{item.label}</p>
              {item.time && <p className="mt-0.5 text-[10px] text-[#8A8F98]">{item.time}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InProgressTeam() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Team</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-[#F4EFE7] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#26483E] text-xs font-bold text-white">
            LM
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#172033]">Lukas (You)</p>
            <p className="text-xs text-[#8A8F98]">SP-2026-0048</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26483E]">
            OWNER
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F4EFE7] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5B6472] text-xs font-bold text-white">
            SK
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#172033]">Sophie K.</p>
            <p className="text-xs text-[#8A8F98]">SP-2026-0052</p>
          </div>
          <span className="rounded-full bg-[#DDEBDD] px-2.5 py-0.5 text-[10px] font-semibold text-[#26483E]">
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  )
}

function InProgressFiles() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">Files Uploaded</p>
      <div className="space-y-2.5">
        {FILES.map((f) => (
          <div key={f.name} className="flex items-center justify-between rounded-xl px-2 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 text-sm">
                {f.name.endsWith('.jpg') ? '🖼️' : '📄'}
              </span>
              <span className="truncate text-xs text-[#172033]">{f.name}</span>
            </div>
            <span className="shrink-0 text-[10px] text-[#8A8F98]">
              {f.size} · by {f.by}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#8A8F98]">+ 5 more files</p>
    </div>
  )
}

function InProgressSubmissionCta() {
  return (
    <button
      type="button"
      disabled
      className="w-full cursor-not-allowed rounded-full bg-[#8A8F98] px-6 py-3 text-sm font-bold text-white opacity-60"
    >
      📤 Go to Submission
    </button>
  )
}

function InProgressView() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <InProgressStatusCard className="lg:hidden" />
        <InProgressWeeklyTasks />
      </div>

      <div className="space-y-5">
        <div className="hidden lg:block">
          <InProgressStatusCard />
        </div>
        <InProgressTeamActivity />
        <InProgressTeam />
        <InProgressFiles />
        <div className="text-center">
          <InProgressSubmissionCta />
          <p className="mt-2 text-xs text-[#8A8F98]">Available after Week 4 begins</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main export ─── */

export function ProjectWorkspacePage() {
  const { projectId } = useParams()

  if (projectId === 'pasta-from-scratch') {
    return (
      <div>
        <InProgressTopBar />
        <InProgressProjectHeader />
        <InProgressView />
      </div>
    )
  }

  return (
    <div>
      <PreStartTopBar />
      <PreStartProjectHeader />
      <PreStartView />
    </div>
  )
}