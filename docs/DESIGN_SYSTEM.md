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

### Background

- Warm Cream: #FAF7F2
- Soft Cream: #F4EFE7
- Light Surface: #FFFDF8

### Primary

- Deep Green: #26483E
- Dark Forest: #1F3D35
- Active Green: #547C6A

### Accent

- Coral: #F29B7F
- Soft Orange: #F7B98D
- Star Yellow: #F4C542

### Text

- Primary Text: #172033
- Secondary Text: #5B6472
- Muted Text: #8A8F98
- Inverse Text: #FFFFFF

### Border

- Soft Beige Border: #D8D3CA
- Light Border: #E8E1D8

### Status

- Success: #5F8F72
- Warning: #D9A441
- Danger: #C96B5A
- Info: #6A8CAF
- Locked: #9CA3AF

## Category Colors

Use category colors as soft card headers or badges, not full-page dominant colors.

### Chef

- Background: #FCE1D8
- Accent: #E98A6A
- Icon: 🍳 or 🍦 or 🥨

### Automotive

- Background: #DDE7F2
- Accent: #5A7FA3
- Icon: 🚗

### Farm

- Background: #DDEBDD
- Accent: #6C9A63
- Icon: 🌱 or 🌻 or 🍅

### Robotics

- Background: #DCEAF2
- Accent: #5D8AA8
- Icon: 🤖

### Media Creator

- Background: #E8E1F2
- Accent: #7E6BA8
- Icon: 🎬 or 🎤

### Community Builder

- Background: #F2E2B8
- Accent: #B88A3A
- Icon: 🤝 or 🎨 or 📦

### Software Creator

- Background: #DDE9F4
- Accent: #4F7EA8
- Icon: 💻

### Fashion

- Background: #F1DDE8
- Accent: #A85F86
- Icon: 👗

### Music

- Background: #E6DDF4
- Accent: #7B61A8
- Icon: 🎵

### Mythical

- Background: gradient from #26483E to #C9785A
- Accent: #F4C542
- Icon: ✨

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