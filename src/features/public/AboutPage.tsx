type StatCard = {
  value: string
  label: string
}

const FOUNDER_STATS: StatCard[] = [
  { value: '2026', label: 'Founded in Kassel' },
  { value: '9', label: 'Career categories' },
  { value: '7', label: 'Progressive levels' },
  { value: '100%', label: 'GDPR-ready direction' },
]

function HeroSection() {
  return (
    <section className="bg-[#26483E] px-6 py-20 text-[#FFFDF8] md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">
          About Star Project
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl md:leading-[1.15]">
          We help children become
          <br />
          creators of their future.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D8D3CA] md:text-lg">
          Star Project is an education technology company building real-world project experiences
          that prepare children for a rapidly changing world — through doing, not just watching.
        </p>
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#26483E]/10 text-2xl">
            🔭
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
            Our Vision
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
            A generation of children who know how to build, test, and improve.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#5B6472]">
            We believe every child deserves to discover what they are capable of before they have to
            choose a career. By engaging in real projects — not simulated exercises — children develop
            the confidence to try, the resilience to fail, and the skills to build things they can be
            proud of. Through real projects, real teams, and real outcomes, we help children discover
            their future careers early — on their own terms.
          </p>
        </div>
      </div>
    </section>
  )
}

function MissionSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#26483E]/10 text-2xl">
            🎯
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
            Our Mission
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
            Provide safe, real-world project challenges that teach what schools can&apos;t.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#5B6472]">
            Schools give children theory. We give them practice. Through structured 4–5 week project
            experiences, children learn research, teamwork, project management, discipline, and
            creative execution. Every project is designed to be completed with a partner, reviewed by
            real people, and celebrated with recognition that builds a lasting achievement profile.
          </p>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">
          Our Story
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Started in Kassel. Built for European families.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#5B6472]">
          Star Project was founded in 2026 by Aldy YK and Yeedi J., two builders who saw that
          traditional education was not keeping pace with a changing world. They chose Kassel,
          Germany as the launch city — a place where innovation meets community. Today, Star Project
          is building a platform where European families can help their children discover careers
          through real projects, real teamwork, and real recognition.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDER_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-7 text-center shadow-sm"
            >
              <p className="text-4xl font-bold text-[#26483E]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#5B6472]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B6472]">Contact</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172033] md:text-4xl">
          Visit us, write us, or just say hi.
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8F98]">
                Email
              </p>
              <p className="text-sm font-medium text-[#172033]">hello@starproject.de</p>
            </div>
            <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8F98]">
                Phone
              </p>
              <p className="text-sm font-medium text-[#172033]">+49 561 000 0000</p>
            </div>
            <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8F98]">
                Address
              </p>
              <p className="text-sm font-medium text-[#172033]">
                Königsplatz 12, 34117 Kassel, Germany
              </p>
            </div>
            <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8F98]">
                Legal
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium text-[#26483E]">
                <a href="#" className="transition-colors hover:text-[#547C6A]">
                  Impressum
                </a>
                <a href="#" className="transition-colors hover:text-[#547C6A]">
                  Datenschutz
                </a>
                <a href="#" className="transition-colors hover:text-[#547C6A]">
                  AGB
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-7 shadow-sm lg:col-span-1">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#172033]">
              Send us a message
            </p>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-[#5B6472]">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1.5 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none transition-colors focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#5B6472]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1.5 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none transition-colors focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#5B6472]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-[#D8D3CA] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#172033] placeholder-[#8A8F98] outline-none transition-colors focus:border-[#26483E] focus:ring-1 focus:ring-[#26483E]"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#26483E] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1F3D35] hover:shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-[#E8E1D8] bg-[#FFFDF8] p-7 shadow-sm lg:col-span-1">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#172033]">
              Office Hours
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-[#F4EFE7] px-4 py-3">
                <span className="text-[#5B6472]">Mon – Fri</span>
                <span className="font-medium text-[#172033]">09:00 – 18:00</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F4EFE7] px-4 py-3">
                <span className="text-[#5B6472]">Saturday</span>
                <span className="font-medium text-[#172033]">10:00 – 14:00</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F4EFE7] px-4 py-3">
                <span className="text-[#5B6472]">Sunday</span>
                <span className="font-medium text-[#8A8F98]">Closed</span>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#8A8F98]">
              Our office is open for visits by appointment. We are happy to meet families, educators,
              and partners who share our vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <MissionSection />
      <StorySection />
      <ContactSection />
    </>
  )
}