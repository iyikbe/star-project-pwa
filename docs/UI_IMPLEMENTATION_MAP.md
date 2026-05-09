# Star Project UI Implementation Map

## Purpose

This file maps the uploaded UI mockups into engineering routes, layouts, components, and implementation priority.

The AI coding agent must use this file together with:

- PRD.md
- DESIGN_SYSTEM.md
- USER_FLOW.md
- DATABASE_SCHEMA.md
- AI_CODING_RULES.md

## Important Clarification

This file is a planning document. It does not create code by itself.

Recommended files listed in this document are files that should be created later during implementation, not immediately.

Build Order is the recommended sequence for building the Star Project MVP.

## Implementation Strategy

Build the UI in phases:

1. Public marketing pages
2. Auth pages
3. Logged-in app shell
4. Discovery and project cards
5. Project workspace
6. Submission and review UI
7. Subscription UI
8. Admin UI
9. Supabase integration
10. Real business logic

Use mock data first. Do not connect Supabase until UI routes and component structure are stable.

## Mockup to Route Mapping

| Mockup Page | Screen Name | Route | Layout | Priority |
|---|---|---|---|---|
| 01 | Home Page Public Marketing | `/` | PublicLayout | P1 |
| 02 | About Us Public Page | `/about` | PublicLayout | P1 |
| 03 | Register Parent-Managed Account | `/register` | AuthLayout | P1 |
| Login | Login Page | `/login` | AuthLayout | P1 |
| 04 | My Account | `/account` | AppLayout | P2 |
| 05 | Start Your Career Preference Input | `/start/preference` | AppLayout | P2 |
| 06 | Start Your Career Project Listing | `/start` | AppLayout | P2 |
| 07 | Category Page | `/categories/:categorySlug` | AppLayout | P2 |
| 08 | Notifications & Messages | `/notifications` | AppLayout | P3 |
| 09 | Project Workspace Pre-Start | `/projects/:projectId/workspace` | AppLayout | P3 |
| 10 | Project Workspace In Progress | `/projects/:projectId/workspace` | AppLayout | P3 |
| 11 | Submission Upload | `/projects/:projectId/submit` | AppLayout | P4 |
| 12 | Submission Status / Review Result | `/projects/:projectId/result` | AppLayout | P4 |
| 13 | Mythical Project Detail | `/projects/:projectId` | AppLayout | P4 |
| 14 | Subscription & Billing | `/subscription` | AppLayout | P4 |
| 15 | Admin User Management | `/admin/users` | AdminLayout | P5 |
| 16 | Admin Upload New Project | `/admin/projects/new` | AdminLayout | P5 |
| 17 | Admin Payment Approval | `/admin/payments` | AdminLayout | P5 |
| 18 | Admin Submission Review | `/admin/submissions/:submissionId` | AdminLayout | P5 |

## Layouts

### PublicLayout

Used for public marketing pages.

Includes:

- Top navigation
- Star Project logo
- Home link
- Start Your Career link
- About Us link
- Login link
- Create Account CTA
- Footer

### AuthLayout

Used for login/register.

Includes:

- Split layout on desktop
- Brand/value panel
- Form panel
- Safety/privacy messaging

### AppLayout

Used for logged-in child/guardian app.

Includes:

- Sidebar navigation on desktop
- Mobile navigation for smaller screens
- Breadcrumb
- Top profile summary
- Notification icon
- Message icon

### AdminLayout

Used for internal admin pages.

Includes:

- Dark green left sidebar
- Admin breadcrumb
- Admin profile
- Metric cards
- Tables
- Detail panels

## Core Components

### UI Components

- Button
- Card
- Badge
- Input
- Textarea
- Select
- Checkbox
- ProgressBar
- StatCard
- SectionHeader
- EmptyState
- PageShell

### Product Components

- PublicNavbar
- PublicFooter
- AppSidebar
- AdminSidebar
- ProjectCard
- CategoryCard
- LevelBadge
- StarBadge
- StatusBadge
- SafetyLabel
- StudentIdBadge
- AchievementCard
- InvitationCard
- WeeklyTaskCard
- SubmissionChecklist
- BillingHistoryTable
- AdminMetricCard
- AdminDataTable

## Mock Data Strategy

Use mock data first for all UI pages.

Create mock data later in this folder:

src/data/mock/

Recommended mock data files to create later:

- categories.ts
- levels.ts
- projects.ts
- users.ts
- achievements.ts
- invitations.ts
- notifications.ts
- payments.ts
- submissions.ts

Do not create these files yet unless the current implementation task requires them.

## Build Order

### Phase 1

1. Setup folder structure
2. Setup React Router
3. Setup PublicLayout
4. Build Home Page
5. Build About Page
6. Build Register Page
7. Build Login Page

### Phase 2

1. Setup AppLayout
2. Build My Account page
3. Build Start Preference page
4. Build Project Listing page
5. Build Category page

### Phase 3

1. Build Project Workspace pre-start
2. Build Project Workspace in-progress
3. Build Notifications page

### Phase 4

1. Build Submission Upload
2. Build Submission Result
3. Build Subscription page
4. Build Mythical project detail

### Phase 5

1. Setup AdminLayout
2. Build Admin User Management
3. Build Admin Upload Project
4. Build Admin Payment Approval
5. Build Admin Submission Review

### Phase 6

1. Setup Supabase Auth
2. Setup database schema
3. Connect real data gradually
4. Add Row Level Security
5. Add storage upload
6. Add production environment variables

## Current Development Rule

The next engineering step after this document is:

1. Setup frontend folder structure.
2. Setup React Router.
3. Create layout shells.
4. Create placeholder pages.
5. Build Home Page first.

Do not start Supabase integration yet.

Do not build admin logic yet.

Do not build payment logic yet.

Do not build all pages at once.

## First Kilo Code Task

After all documentation files are committed, the first AI coding task should be:

Create routing and layout shells only.

Scope:

- Read all files in `/docs`.
- Setup React Router.
- Create PublicLayout.
- Create AuthLayout.
- Create AppLayout.
- Create AdminLayout.
- Create placeholder pages for all routes.
- Do not connect Supabase.
- Do not implement real business logic.
- Do not create payment logic.
- Do not create AI review logic.
- Do not modify unrelated files.