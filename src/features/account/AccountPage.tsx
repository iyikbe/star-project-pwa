import { Link } from 'react-router-dom'

type Invitation = {
  icon: string
  title: string
  from: string
  fromId: string
  category: string
  level: string
  expiresIn: string
}

type Achievement = {
  icon: string
  title: string
  label: string
  date: string
}

const INVITATIONS: Invitation[] = [
  {
    icon: '🍦',
    title: 'The Ice Cream Project — Round 2',
    from: 'Sophie K.',
    fromId: 'SP-2026-0052',
    category: 'Chef',
    level: 'Tiny',
    expiresIn: '3 days',
  },
  {
    icon: '🌱',
    title: 'Mini Greenhouse Build',
    from: 'Emma B.',
    fromId: 'SP-2026-0117',
    category: 'Farm',
    level: 'Junior',
    expiresIn: '5 days',
  },
]

const ACHIEVEMENTS: Achievement[] = [
  { icon: '🍦', title: 'Ice Cream Master', label: '⭐ 1', date: 'Mar 12' },
  { icon: '🥗', title: 'Healthy Salad Chef', label: '⭐ 1', date: 'Feb 22' },
  { icon: '🥐', title: 'Brötchen Baker', label: '⭐ 1', date: 'Feb 08' },
  { icon: '🍪', title: 'Cookie Chemist', label: '⭐ 1', date: 'Jan 24' },
  { icon: '🍕', title: 'Pizza Designer', label: '⭐ 1', date: 'Jan 12' },
  { icon: '🏅', title: 'First Star', label: 'Special', date: 'Jan 10' },
  { icon: '🎯', title: '5 Projects Done', label: 'Milestone', date: '' },
]

function TopBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#8A8F98]">Star Project › My Account</p>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs">
          <p className="font-semibold text-[#172033]">LM Lukas Müller</p>
          <p className="text-[#8A8F98]">Guardian: Anna M.</p>
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

function HeaderSection() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
          My Account
        </h1>
        <p className="mt-1 text-sm text-[#5B6472]">
          Your profile, progress, invitations, and achievements — all in one place.
        </p>
      </div>
      <Link
        to="/start"
        className="inline-flex items-center gap-1.5 rounded-full bg-[#26483E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1F3D35] hover:shadow-md"
      >
        🚀 Start a New Journey
      </Link>
    </div>
  )
}

function ProfileCard() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#26483E] text-xl font-bold text-white">
          LM
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#172033]">Lukas Müller</h2>
              <p className="text-xs text-[#8A8F98]">ID: SP-2026-0048</p>
            </div>
            <span className="inline-block self-start rounded-full bg-[#FCE1D8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E98A6A] sm:self-auto">
              CHEF ⭐⭐ BABY
            </span>
          </div>

          <div className="mt-4 flex gap-6">
            <div className="text-center">
              <p className="text-xl font-bold text-[#26483E]">7</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                ⭐ STARS
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#26483E]">5</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                PROJECTS
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#26483E]">9</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                YEARS
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#F4EFE7] px-4 py-3">
            <p className="text-xs font-medium text-[#5B6472]">About Me</p>
            <p className="mt-1 text-sm leading-relaxed text-[#172033]">
              I love cooking with my mom and growing tomatoes in our garden. My favorite project so
              far was the Ice Cream Project!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressCard() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#172033]">⭐⭐ Baby Level</p>
      <p className="mt-0.5 text-xs text-[#5B6472]">3 stars to Junior →</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-[#8A8F98]">
          <span>7 of 10 stars in Chef · Baby Level</span>
          <span>70%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F4EFE7]">
          <div className="h-full w-[70%] rounded-full bg-[#26483E]" />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#E8E1D8] px-4 py-3">
        <p className="text-center text-xs text-[#8A8F98]">
          <span className="font-semibold text-[#172033]">10 Stars</span>
          <br />
          3 to go
        </p>
      </div>
    </div>
  )
}

function CategoriesCard() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#172033]">My Categories</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-[#FCE1D8] px-4 py-2.5">
          <span className="text-sm font-medium text-[#172033]">🍳 Chef</span>
          <span className="text-sm font-bold text-[#E98A6A]">⭐ 7</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#DDEBDD] px-4 py-2.5">
          <span className="text-sm font-medium text-[#172033]">🌱 Farm</span>
          <span className="text-sm font-bold text-[#6C9A63]">⭐ 0</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#F2E2B8] px-4 py-2.5">
          <span className="text-sm font-medium text-[#172033]">🤝 Community</span>
          <span className="text-sm font-bold text-[#B88A3A]">⭐ 0</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-xl border border-dashed border-[#D8D3CA] px-4 py-2.5 text-sm font-medium text-[#5B6472] transition-colors hover:border-[#26483E] hover:text-[#26483E]"
      >
        + Add Category
      </button>
    </div>
  )
}

function InvitationCard({ invitation }: { invitation: Invitation }) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-xl">{invitation.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#172033]">{invitation.title}</p>
          <p className="mt-1 text-xs text-[#5B6472]">
            From {invitation.from} ({invitation.fromId}) · {invitation.category} · {invitation.level}{' '}
            · Expires in {invitation.expiresIn}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-full border border-[#C96B5A] px-4 py-1.5 text-xs font-medium text-[#C96B5A] transition-colors hover:bg-[#C96B5A] hover:text-white"
            >
              Decline
            </button>
            <button
              type="button"
              className="rounded-full bg-[#26483E] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1F3D35]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InvitationsSection() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[#172033]">Pending Invitations</h2>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C96B5A] text-[10px] font-bold text-white">
            2
          </span>
        </div>
        <a href="#" className="text-xs font-medium text-[#26483E] underline underline-offset-2">
          View All
        </a>
      </div>
      <div className="space-y-3">
        {INVITATIONS.map((inv) => (
          <InvitationCard key={inv.fromId} invitation={inv} />
        ))}
      </div>
    </div>
  )
}

function AchievementsSection() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#172033]">Recent Achievements</h2>
        <a href="#" className="text-xs font-medium text-[#26483E] underline underline-offset-2">
          View All
        </a>
      </div>

      <div className="space-y-3">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.title}
            className="flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-[#F4EFE7]"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{a.icon}</span>
              <div>
                <p className="text-sm font-medium text-[#172033]">{a.title}</p>
                {a.label && (
                  <p className="text-[11px] text-[#8A8F98]">{a.label}</p>
                )}
              </div>
            </div>
            {a.date && <span className="text-xs text-[#8A8F98]">{a.date}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ActiveSection() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm">🔥</span>
        <h2 className="text-sm font-semibold text-[#172033]">Currently Active</h2>
        <span className="rounded-full bg-[#DDEBDD] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#26483E]">
          ONGOING
        </span>
      </div>

      <div className="flex items-start gap-3">
        <span className="text-xl">🍝</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#172033]">Pasta from Scratch</p>
          <p className="mt-0.5 text-xs text-[#5B6472]">
            Chef · Baby Level · Week 3 of 4 · Team: You + Sophie K.
          </p>
          <Link
            to="/projects/1/workspace"
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#26483E] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1F3D35]"
          >
            Open Project →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AccountPage() {
  return (
    <div>
      <TopBar />
      <HeaderSection />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProfileCard />
          <InvitationsSection />
          <ActiveSection />
        </div>

        <div className="space-y-6">
          <ProgressCard />
          <CategoriesCard />
          <AchievementsSection />
        </div>
      </div>
    </div>
  )
}