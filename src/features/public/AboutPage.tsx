import { SectionEyebrow, IconTile } from '../../components/ui'

/* ─── Section 1 – Hero ─── */

function HeroSection() {
  return (
    <section className="text-center">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow color="coral" className="text-center">
          ABOUT STAR PROJECT
        </SectionEyebrow>
        <h1 className="font-serif mt-5 text-4xl font-semibold leading-[1.1] tracking-normal text-sp-primary md:text-5xl lg:text-6xl">
          We help children become<br />
          <span className="italic text-sp-accent-green">creators of their future.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sp-text-muted">
          Star Project is an education technology company building real-world project experiences
          that prepare children for a rapidly changing world — through doing, not just watching.
        </p>
      </div>
    </section>
  )
}

/* ─── Section 2 – Vision + Mission ─── */

function VisionMissionSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {/* Vision — dark card */}
      <div className="rounded-xl border border-sp-primary bg-sp-primary p-8 text-white md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sp-coral-bg-soft">
          OUR VISION
        </p>
        <h3 className="font-serif mt-4 text-2xl font-semibold leading-tight md:text-3xl">
          A generation of children who know how to build, test, and improve.
        </h3>
        <p className="mt-4 leading-relaxed text-white/80">
          We see a future where every child has the chance to discover real careers early — by doing
          real projects, working with real teams, and building real things they can be proud of.
        </p>
      </div>

      {/* Mission — white card */}
      <div className="rounded-xl border border-sp-border-soft bg-white p-8 md:p-10">
        <SectionEyebrow color="coral">OUR MISSION</SectionEyebrow>
        <h3 className="font-serif mt-4 text-2xl font-semibold leading-tight text-sp-primary md:text-3xl">
          Provide safe, real-world project challenges that teach what schools can&apos;t.
        </h3>
        <p className="mt-4 leading-relaxed text-sp-text-primary">
          We deliver structured 4–5 week project experiences that teach research, teamwork, project
          management, discipline, and creative execution — wrapped in a safe, parent-managed
          platform.
        </p>
      </div>
    </section>
  )
}

/* ─── Section 3 – Our Story + Stats ─── */

function StorySection() {
  return (
    <section className="rounded-xl border border-sp-border-soft bg-white p-6 md:p-10">
      <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        {/* Left — story */}
        <div>
          <SectionEyebrow color="coral">OUR STORY</SectionEyebrow>
          <h3 className="font-serif mt-4 text-2xl font-semibold text-sp-primary md:text-3xl">
            Started in Kassel. Built for European families.
          </h3>
          <p className="mt-4 leading-relaxed text-sp-text-primary">
            Star Project was founded in 2026 by Aldy YK and Yeedi J after watching children —
            including our own — graduate from years of screen-based learning without confidence in
            any real skill.
          </p>
          <p className="mt-4 leading-relaxed text-sp-text-primary">
            We chose Kassel as our launch city because it sits at the heart of Germany&apos;s
            apprenticeship and craftsmanship tradition — a place where building real things has
            always mattered.
          </p>
        </div>

        {/* Right — 2x2 stat grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="rounded-lg bg-sp-bg-card-muted p-5">
            <p className="font-serif text-3xl font-semibold text-sp-primary md:text-4xl">2026</p>
            <p className="mt-1 text-xs text-sp-text-muted">Founded in Kassel</p>
          </div>
          <div className="rounded-lg bg-sp-bg-card-muted p-5">
            <p className="font-serif text-3xl font-semibold text-sp-coral md:text-4xl">9</p>
            <p className="mt-1 text-xs text-sp-text-muted">Career categories</p>
          </div>
          <div className="rounded-lg bg-sp-bg-card-muted p-5">
            <p className="font-serif text-3xl font-semibold text-sp-primary md:text-4xl">7</p>
            <p className="mt-1 text-xs text-sp-text-muted">Progressive levels</p>
          </div>
          <div className="rounded-lg bg-sp-bg-card-muted p-5">
            <p className="font-serif text-3xl font-semibold text-sp-coral md:text-4xl">100%</p>
            <p className="mt-1 text-xs text-sp-text-muted">GDPR-ready</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 4 – Get in Touch header ─── */

function ContactHeader() {
  return (
    <section className="text-center">
      <SectionEyebrow color="coral" className="text-center">
        GET IN TOUCH
      </SectionEyebrow>
      <h2 className="font-serif mt-3 text-3xl font-semibold text-sp-primary md:text-4xl">
        Visit us, write us, or just say hi.
      </h2>
    </section>
  )
}

/* ─── Section 5 – Contact ─── */

function ContactFormCard() {
  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-6 md:p-8">
      <h3 className="font-serif text-xl font-semibold text-sp-primary md:text-2xl">
        Contact Information
      </h3>

      {/* Info rows */}
      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <IconTile size="sm" tint="coral">📧</IconTile>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted">
              EMAIL
            </p>
            <a href="mailto:hello@starproject.de" className="font-medium text-sp-primary hover:underline">
              hello@starproject.de
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <IconTile size="sm" tint="coral">📞</IconTile>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted">
              PHONE
            </p>
            <a href="tel:+495610000000" className="font-medium text-sp-primary hover:underline">
              +49 561 000 0000
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <IconTile size="sm" tint="coral">📍</IconTile>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted">
              ADDRESS
            </p>
            <p className="font-medium text-sp-primary">Königsplatz 12, 34117 Kassel, Germany</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <IconTile size="sm" tint="coral">⚖️</IconTile>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sp-text-muted">
              LEGAL
            </p>
            <p className="font-medium text-sp-primary">
              <a href="#" className="hover:underline">Impressum</a>
              <span className="mx-1.5 text-sp-text-muted">·</span>
              <a href="#" className="hover:underline">Datenschutz</a>
              <span className="mx-1.5 text-sp-text-muted">·</span>
              <a href="#" className="hover:underline">AGB</a>
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-sp-border-soft" />

      {/* Form */}
      <h4 className="font-semibold text-sp-primary">Send us a message</h4>
      <form className="mt-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you — message logged.'); }}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-sp-text-primary">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Anna Müller"
              className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-sp-text-primary">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="anna@example.com"
              className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-sp-text-primary">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Tell us how we can help..."
            className="w-full rounded-lg border border-sp-border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-sp-primary"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-sp-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-primary-hover"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

/* ─── Office Hours Card ─── */

function OfficeHoursCard() {
  const hours = [
    { day: 'Mon–Fri', time: '09:00 – 18:00', highlight: true },
    { day: 'Saturday', time: '10:00 – 14:00', highlight: true },
    { day: 'Sunday', time: 'Closed', highlight: false },
  ]

  return (
    <div className="rounded-xl border border-sp-border-soft bg-white p-6">
      <h3 className="font-serif text-xl font-semibold text-sp-primary">Office Hours</h3>
      <div className="mt-4">
        {hours.map((h) => (
          <div
            key={h.day}
            className="flex items-center justify-between border-b border-sp-border-soft py-2 last:border-0"
          >
            <span className="text-sm text-sp-text-primary">{h.day}</span>
            <span className={`text-sm font-medium ${h.highlight ? 'text-sp-primary' : 'text-sp-text-muted'}`}>
              {h.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Map Card ─── */

function MapCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-sp-border-soft" style={{ background: '#E0E8D4' }}>
      <div className="aspect-[16/10]">
        <svg
          viewBox="0 0 400 250"
          className="h-full w-full"
          aria-label="Approximate location of Star Project Kassel office"
        >
          {/* Horizontal streets */}
          <line x1="0" y1="60" x2="400" y2="60" stroke="#F5EFE4" strokeWidth="3" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#F5EFE4" strokeWidth="3" />
          <line x1="0" y1="180" x2="400" y2="180" stroke="#F5EFE4" strokeWidth="3" />

          {/* Vertical streets */}
          <line x1="80" y1="0" x2="80" y2="250" stroke="#F5EFE4" strokeWidth="3" />
          <line x1="200" y1="0" x2="200" y2="250" stroke="#F5EFE4" strokeWidth="3" />
          <line x1="320" y1="0" x2="320" y2="250" stroke="#F5EFE4" strokeWidth="3" />

          {/* Parks */}
          <rect x="10" y="10" width="50" height="40" rx="4" fill="#6B8E4E" opacity="0.4" />
          <rect x="340" y="190" width="50" height="50" rx="4" fill="#6B8E4E" opacity="0.4" />
          <rect x="250" y="10" width="50" height="40" rx="4" fill="#6B8E4E" opacity="0.4" />

          {/* Pin */}
          <g transform="translate(200, 100)">
            <path d="M0,-30 C-18,-30 -30,-18 -30,0 C-30,25 0,50 0,50 C0,50 30,25 30,0 C30,-18 18,-30 0,-30Z" fill="#D26B4A" />
            <circle cx="0" cy="-5" r="10" fill="white" />
          </g>

          {/* Label */}
          <text x="200" y="175" textAnchor="middle" className="text-xs font-semibold" fill="#1F3D2E">
            Kassel HQ
          </text>
        </svg>
      </div>
    </div>
  )
}

/* ─── Page export ─── */

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-12 md:gap-24 md:px-6 md:py-16">
      <HeroSection />
      <VisionMissionSection />
      <StorySection />
      <ContactHeader />
      <section className="grid gap-6 md:grid-cols-2">
        <ContactFormCard />
        <div className="flex flex-col gap-6">
          <MapCard />
          <OfficeHoursCard />
        </div>
      </section>
    </div>
  )
}