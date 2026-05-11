# Star Project Design System

## Design Direction

Star Project should feel warm, trustworthy, calm, educational, premium, family-friendly, and European.

The UI must not feel like a noisy children's game. It should be friendly enough for children, but credible enough for parents in Germany.

## Visual Keywords

1. Calm
2. Warm
3. Parent-friendly
4. Safe
5. Educational
6. Practical
7. Premium but simple
8. Soft
9. Trustworthy
10. Light European editorial feel

## Design References From Mockup

The UI mockups use:

1. Warm cream background
2. Deep green sidebar/header
3. White cards with soft borders
4. Muted category colors
5. Rounded corners
6. Soft shadows
7. Icon/emoji-assisted project cards
8. Large readable section titles
9. Clear information hierarchy
10. Desktop admin layout with left sidebar
11. Mobile/PWA-friendly logged-in app structure

## Core Colors

> **Source of truth**: These tokens are defined as Tailwind v4 `@theme` tokens in `src/index.css` and are also available as CSS custom properties via `var(--color-name)`.
> Tailwind utility classes available: `bg-sp-primary`, `text-sp-coral`, `border-sp-border-soft`, `bg-category-chef-bg`, etc.
> The hex values below are canonical — extracted from the actual UI mockup. If any code uses different inline hex values (`bg-[#...]`), it should be migrated to use these tokens over time.

### Page & Surface

| Token | Hex | Use |
|---|---|---|
| `sp-bg-page` / `--color-bg-page` | #FAF7F2 | Warm cream background, all logged-in + public pages |
| `sp-bg-auth` / `--color-bg-auth` | #4A5D4E | Muted forest green, AuthLayout left panel |
| `sp-bg-card-muted` / `--color-bg-card-muted` | #F5EFE4 | Warm beige inset (info boxes, late-fee panels) |
| `sp-border-soft` / `--color-border-soft` | #EFE7D9 | 1px card border, hairline dividers |
| `sp-border-input` / `--color-border-input` | #D9D0BE | Form input border |

### Brand Greens

| Token | Hex | Use |
|---|---|---|
| `sp-primary` / `--color-primary` | #1F3D2E | Deep forest green — sidebar, dark panels, primary buttons, H1 titles |
| `sp-primary-hover` / `--color-primary-hover` | #2A4F3D | Primary button/panel hover state |
| `sp-accent-green` / `--color-accent-green` | #2E6B4A | Success pill text (ACTIVE, PAID, JOINED, DONE), checkmarks (✓) |
| `sp-accent-green-bg` / `--color-accent-green-bg` | #E6F0E8 | Success pill background |

### Brand Coral (CTA)

| Token | Hex | Use |
|---|---|---|
| `sp-coral` / `--color-coral` | #D26B4A | Primary CTA buttons (Create Account, Send Invitation, Browse Mythical) |
| `sp-coral-hover` / `--color-coral-hover` | #B85839 | Coral button hover state |
| `sp-coral-bg-soft` / `--color-coral-bg-soft` | #F4D9CC | Pending/warning pill background (PENDING, WAITING) |

### Brand Gold

| Token | Hex | Use |
|---|---|---|
| `sp-gold` / `--color-gold` | #C9A063 | Stars, progress bar fill, Mythical accents |
| `sp-gold-bg-soft` / `--color-gold-bg-soft` | #F2E6CC | Level pill background (BABY, JUNIOR, etc.) |

### Text

| Token | Hex | Use |
|---|---|---|
| `sp-text-primary` / `--color-text-primary` | #3A3A36 | Body text |
| `sp-text-muted` / `--color-text-muted` | #8A8275 | Labels, metadata, eyebrow uppercase |
| `sp-text-on-dark` / `--color-text-on-dark` | #FAF7F2 | Text on dark green / coral backgrounds |

### Status

| Token | Hex | Use |
|---|---|---|
| `sp-danger` / `--color-danger` | #B85450 | Destructive actions only (Reject, Cancel Subscription text) |
| `sp-info` / `--color-info` | #5A7AA0 | Informational |

## Category Colors

Use category colors as soft card headers or badges, not full-page dominant colors.
Each category has a background token (`category-{name}-bg`) and an accent token (`category-{name}`).

| Category | Background Token | Background Hex | Accent Token | Accent Hex | Icon |
|---|---|---|---|---|---|
| Chef | `category-chef-bg` | #F4D9CC | `category-chef` | #D26B4A | 🍳 or 🍦 or 🥨 |
| Farm | `category-farm-bg` | #E0E8D4 | `category-farm` | #6B8E4E | 🌱 or 🌻 or 🍅 |
| Robotics | `category-robotics-bg` | #D9E0E8 | `category-robotics` | #4A6B8E | 🤖 |
| Community | `category-community-bg` | #EBE3D4 | `category-community` | #8A7548 | 🤝 or 🎨 or 📦 |
| Automotive | `category-automotive-bg` | #E8D9D4 | `category-automotive` | #A0524A | 🚗 |
| Media Creator | `category-media-bg` | #E0D9E8 | `category-media` | #6E5A8E | 🎬 or 🎤 |
| Software Creator | `category-software-bg` | #D4E0E0 | `category-software` | #4A8E8A | 💻 |
| Fashion | `category-fashion-bg` | #E8D4DE | `category-fashion` | #A04A6E | 👗 |
| Music | `category-music-bg` | #D4DCE8 | `category-music` | #5A7AA0 | 🎵 |
| Mythical | — | gradient from `#F4D9CC` to `#D26B4A` | `sp-gold` | #C9A063 | ✨ |

## Spacing & Radii

| Rule | Value | Tailwind |
|---|---|---|
| Card radius | 12px | `rounded-xl` |
| Pill radius | 9999px | `rounded-full` |
| Card padding desktop | 24px | `p-6` |
| Card padding mobile | 20px | `p-5` |
| Section gap desktop | 32px | `gap-8` |
| Section gap mobile | 24px | `gap-6` |
| Card-grid gap desktop | 24px | `gap-6` |
| Card-grid gap tablet | 16px | `gap-4` |

## Tailwind Token Mapping

All hex values are available as Tailwind utility classes via the `@theme` directive in `src/index.css`.
They follow the pattern `{property}-sp-{token}` for brand colors and `{property}-category-{name}{-bg}` for category colors.

| Use case | Tailwind class |
|---|---|
| Page background | `bg-sp-bg-page` |
| Auth left panel | `bg-sp-bg-auth` |
| Muted card inset | `bg-sp-bg-card-muted` |
| Card border | `border-sp-border-soft` |
| Input border | `border-sp-border-input` |
| Primary text / bg | `text-sp-primary` / `bg-sp-primary` |
| Primary hover | `hover:bg-sp-primary-hover` |
| Accent green text | `text-sp-accent-green` |
| Accent green bg | `bg-sp-accent-green-bg` |
| Coral CTA | `bg-sp-coral` |
| Coral hover | `hover:bg-sp-coral-hover` |
| Pending/warning pill bg | `bg-sp-coral-bg-soft` |
| Gold accent | `text-sp-gold` |
| Level pill bg | `bg-sp-gold-bg-soft` |
| Body text | `text-sp-text-primary` |
| Muted text | `text-sp-text-muted` |
| Text on dark BG | `text-sp-text-on-dark` |
| Danger text | `text-sp-danger` |
| Info text | `text-sp-info` |
| Chef card top | `bg-category-chef-bg` |
| Chef badge text | `text-category-chef` |
| (same pattern for all 9 categories) | `bg-category-{name}-bg` / `text-category-{name}` |

**CSS variable fallback**: When you need to use a token in an inline `style` prop, gradient, or complex value where Tailwind classes don't reach, use the CSS custom property:
```tsx
style={{ background: 'var(--color-coral)' }}
style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-coral))' }}
style={{ borderColor: 'var(--color-border-soft)' }}
```

## Typography

Use system sans-serif or Inter-like font for app UI.

Use a refined serif-like style only for marketing hero headlines if implemented carefully.

### Recommended Scale

- Hero title: 48–72px desktop, 36–44px mobile
- Page title: 32–44px desktop, 28–36px mobile
- Section title: 22–30px
- Card title: 16–20px
- Body text: 14–17px
- Caption: 11–13px
- Badge: 10–12px uppercase

## Layout Principles

1. Mobile-first for user app.
2. Desktop-first for admin dashboard.
3. Use left sidebar for logged-in user and admin desktop.
4. Use bottom navigation or collapsible menu for mobile.
5. Keep content width readable.
6. Use card-based layouts.
7. Avoid dense pages for child-facing flows.
8. Use clear CTA hierarchy.
9. Use breadcrumb for logged-in project flows.
10. Use sticky action panels for admin review/payment pages when useful.

## Component Guidelines

### Buttons

Primary button:
- Deep Green background
- White text
- Rounded-lg or rounded-full
- Medium font weight
- Clear hover state

Secondary button:
- White or cream background
- Soft border
- Deep Green or dark text

Danger button:
- White background
- Danger border/text or soft red background

Disabled button:
- Low opacity
- Cursor disabled
- Clear locked reason nearby

### Cards

Default card:
- White background
- Soft border
- Rounded-2xl
- Subtle shadow
- Comfortable padding

Project card:
- Category-colored header
- Icon or thumbnail
- Category badge
- Level badge
- Title
- Short description
- Star reward
- Age requirement
- Lock/availability status

Stat card:
- White background
- Big number
- Small label
- Source or helper text when public/research-related

### Forms

Form fields:
- Large touch-friendly inputs
- Clear labels
- Helper text below field
- Inline validation
- Avoid too many fields in one screen on mobile

Register form must include:
- Guardian information
- Child information
- Category selection
- Parental consent and privacy checkboxes

### Badges

Use badges for:
- Category
- Level
- Status
- Payment
- Review state
- Safety label
- Premium/Mythical

### Sidebar

Logged-in sidebar should contain:
- Home
- My Account
- Start Your Career
- My Projects
- Achievements
- Notifications
- Messages
- Subscription
- Settings
- Log Out

Admin sidebar should contain:
- Dashboard
- Users
- Projects
- Categories
- Levels
- Payment Approvals
- Submission Reviews
- Notifications
- Audit Logs
- Settings
- Log Out

## Page Design Rules

### Public Home

Must include:
- Hero
- Research facts
- Why Choose Us
- Newly Released projects
- Testimonials with explicit consent
- CTA section
- Footer with legal links

### Register

Must feel safe and parent-managed.

Must highlight:
- One guardian + one child
- Private by default
- GDPR-compliant direction
- €29/month family plan
- Deadline fee disclosure
- Public sharing is optional

### Account

Must be a status center.

Show:
- Child identity
- Student ID
- Guardian
- Category progress
- Stars
- Pending invitations
- Achievements
- Active project
- CTA to Start Your Career

### Start Your Career

Must feel like discovery.

Show:
- Preferences
- Filters
- Popular projects
- New Stars
- Recommended projects
- Mythical premium section

### Project Workspace

Must feel like project management for children.

Show:
- Project status
- Team members
- Invitation status
- Weekly tasks
- Timer
- Report template
- Uploads
- Submission CTA

### Admin

Must be dense but readable.

Use:
- Left sidebar
- Metric cards
- Tables
- Filters
- Detail panel
- Audit notes
- Clear approve/reject actions

## Copywriting Tone

Use English for MVP.

Tone:
- Clear
- Warm
- Encouraging
- Trustworthy
- Practical
- Not childish
- Not overly salesy

Avoid:
- Overpromising
- Unsupported education claims
- Aggressive gamification language
- Excessive exclamation marks

## Accessibility

1. Text contrast must be readable.
2. Buttons must be large enough for touch.
3. Do not rely on color alone for status.
4. Use labels for form inputs.
5. Use semantic HTML where possible.
6. Ensure keyboard navigation works.
7. Use alt text for images.
8. Avoid flashing animations.

## Responsive Rules

### Mobile

- Single-column layout
- Bottom or collapsible navigation
- Large CTAs
- Minimal table usage
- Cards instead of dense grids

### Tablet

- Two-column cards
- Sidebar can collapse

### Desktop

- Sidebar + content layout
- 3–4 column project grid
- Admin tables allowed
- Detail panels allowed