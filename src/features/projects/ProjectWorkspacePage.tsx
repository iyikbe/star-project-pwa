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

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › My Projects › Brezel Workshop</p>
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

function ProjectHeader() {
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

function StatusCard() {
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

function VideoPlaceholder() {
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

function ReportTemplate() {
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

function TeamMembers() {
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

function InviteMember() {
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

function PendingInvitations() {
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

function TaskCard({ task }: { task: Task }) {
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

function WeeklyTasks() {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-[#172033]">Weekly Tasks</p>
      <div className="space-y-3">
        {TASKS.map((task) => (
          <TaskCard key={task.number} task={task} />
        ))}
      </div>
    </div>
  )
}

export function ProjectWorkspacePage() {
  return (
    <div>
      <TopBar />
      <ProjectHeader />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <VideoPlaceholder />
          <ReportTemplate />
          <WeeklyTasks />
        </div>

        <div className="space-y-5">
          <StatusCard />
          <TeamMembers />
          <InviteMember />
          <PendingInvitations />
        </div>
      </div>
    </div>
  )
}