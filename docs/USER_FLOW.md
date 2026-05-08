# Star Project User Flow

## Primary End-to-End Flow

1. Visitor opens Home Page.
2. Visitor sees hero, research facts, why choose us, projects, testimonials, and CTA.
3. Visitor clicks Start Your Career or Create Account.
4. If not logged in, visitor is asked to register or log in.
5. Guardian creates a family account.
6. Guardian enters guardian information.
7. Guardian enters child information.
8. Guardian selects at least 2 career categories.
9. Guardian accepts parental consent, privacy rules, safety responsibility, and deadline fee disclosure.
10. System creates account and generates Student ID.
11. User lands on My Account.
12. User sees profile, categories, stars, invitations, achievements, and active project.
13. User clicks Start a New Journey or Start Your Career.
14. User edits or confirms category preferences.
15. User views project listing.
16. User filters or browses projects.
17. User clicks a project card.
18. System checks age, level, stars, subscription, and premium status.
19. User opens unlocked project workspace or sees locked reason.
20. User invites another registered user by Student ID.
21. Project stays Waiting for Member until minimum 2 members join.
22. User starts the project.
23. Project timer begins.
24. User follows weekly tasks.
25. User uploads weekly files/photos when needed.
26. User submits final report and video proof.
27. AI checks report completeness.
28. Admin manually reviews video when required.
29. Admin approves, rejects, or requests resubmission.
30. If approved, system issues stars, achievement, and certificate.
31. User receives notification and sees updated Account progress.
32. Next level or project may unlock.

## Public Website Flow

### Home Page

Path:

- `/`

Sections:

1. Header navigation
2. Hero: "Let's Create Something Real"
3. CTA: Start Your Career
4. CTA: Watch How It Works
5. Research facts
6. Why Choose Us
7. Newly Released projects
8. Testimonials
9. CTA banner
10. Footer

Actions:

1. Click Start Your Career
2. Click Create Account
3. Click Log In
4. Click About Us
5. View project preview

### About Us Page

Path:

- `/about`

Sections:

1. About Star Project
2. Vision
3. Mission
4. Story
5. Contact information
6. Contact form
7. Office hours
8. Legal links

Actions:

1. Send contact message
2. Navigate to Create Account
3. Navigate to Start Your Career

## Authentication Flow

### Register

Path:

- `/register`

Required sections:

1. Guardian information
2. Child information
3. Career category selection
4. Parental consent and privacy
5. Create account CTA

Required fields:

1. Guardian full name
2. Email
3. Password
4. Region
5. Child name
6. Child birthdate
7. Minimum 2 selected categories
8. Data processing consent
9. Legal guardian confirmation
10. Safety responsibility confirmation
11. Deadline fee policy acknowledgment
12. Optional public sharing consent

Validation:

1. Email must be unique.
2. Password minimum 10 characters and one number.
3. Birthdate must produce child age between 4 and 18 for normal platform access.
4. At least 2 categories required.
5. Required consent checkboxes must be checked.
6. Optional public sharing must default to private/off.

After success:

1. Create auth user.
2. Create guardian profile.
3. Create child profile.
4. Generate Student ID.
5. Save category preferences.
6. Save consent records.
7. Redirect to `/account`.

### Login

Path:

- `/login`

Fields:

1. Email
2. Password

After success:

1. If normal user, redirect to `/account`.
2. If admin, redirect to `/admin`.

## Logged-In User Flow

### My Account

Path:

- `/account`

Purpose:

The user's main status center.

Displays:

1. Child name
2. Student ID
3. Guardian name
4. Age
5. Current main category
6. Current level
7. Stars
8. Projects completed
9. About me
10. Category progress
11. Pending invitations
12. Recent achievements
13. Currently active project
14. Start a New Journey CTA
15. Notifications and messages icons

Actions:

1. Accept invitation
2. Decline invitation
3. Open active project
4. Start new journey
5. Add category
6. View achievements
7. Open notifications
8. Open subscription

### Start Your Career Preference Input

Path:

- `/start/preference`

Purpose:

Let user select career categories and update recommendations.

Rules:

1. At least 2 categories must be selected.
2. User can change categories later.
3. Selection affects recommended projects.

Actions:

1. Select category
2. Deselect category
3. Continue to project listing
4. Back to account

### Start Your Career Project Listing

Path:

- `/start`

Sections:

1. Filters
2. Popular Right Now
3. New Stars
4. Recommended for You
5. Mythical Projects

Filters:

1. Category
2. Level
3. Availability
4. Search

Project card actions:

1. Open project/category detail
2. See locked reason
3. See premium status

### Category Page

Path:

- `/categories/:categorySlug`

Purpose:

Show category context, level structure, projects, and lock/unlock state.

Displays:

1. Category name
2. Category description
3. Total projects
4. Age range
5. Average duration
6. Current level
7. Stars in category
8. Stars needed to next level
9. Level navigation
10. Project thumbnails
11. Locked reason

Actions:

1. Open available project
2. Replay completed project
3. Continue ongoing project
4. Preview locked project
5. Navigate between levels

### Project Workspace — Pre-Start

Path:

- `/projects/:projectId/workspace`

Status:

- Waiting for Member
- Not Started

Displays:

1. Project title
2. Category
3. Level
4. Duration
5. Star reward
6. Minimum members
7. Safety labels
8. Instruction video
9. Report template
10. Weekly tasks
11. Team members
12. Invite by Student ID
13. Pending invitations
14. Start Project button

Rules:

1. Project cannot start with fewer than 2 joined members.
2. Start button is disabled until minimum team is reached.
3. Invitations expire after 7 days.

Actions:

1. Invite member by Student ID
2. Cancel invitation
3. Download report template
4. Watch instruction video
5. Start project when allowed

### Project Workspace — In Progress

Path:

- `/projects/:projectId/workspace`

Status:

- Ongoing

Displays:

1. Timer
2. Final deadline
3. Progress percentage
4. Weekly tasks
5. Current active week
6. Team activity
7. Uploaded files
8. Team list
9. Submission CTA

Actions:

1. Mark task complete
2. Upload weekly files
3. View team activity
4. Go to submission when allowed

### Submission Upload

Path:

- `/projects/:projectId/submit`

Required:

1. Report document
2. Video proof

Optional:

1. Supporting photos

Displays:

1. Deadline status
2. Report upload
3. Video upload
4. Photo selection
5. AI pre-check panel
6. Submission checklist
7. Submit for Final Review CTA

Rules:

1. Report file format: .docx or .pdf
2. Video file format: MP4, MOV, or WebM
3. Suggested video length: 2–5 minutes
4. Video max size: 200MB
5. Submit button disabled until required files are uploaded

### Submission Status / Review Result

Path:

- `/projects/:projectId/result`

Displays:

1. Project completion status
2. Report AI review result
3. Video admin review result
4. Team participation verification
5. Achievement issued
6. Reviewer notes
7. Certificate preview
8. Download certificate CTA
9. Browse next projects CTA

## Notifications and Messages Flow

Path:

- `/notifications`

Rules:

1. System messages only.
2. No free-form chat between children.
3. Notifications can be filtered by type.

Notification types:

1. Invitation
2. Project update
3. Payment
4. Achievement
5. System message

Actions:

1. Mark all as read
2. Accept invitation
3. Decline invitation
4. Open project
5. View receipt
6. View achievement

## Subscription Flow

Path:

- `/subscription`

Displays:

1. Family Plan status
2. Monthly price
3. Renewal date
4. Payment method
5. Late fee status
6. Billing history
7. Mythical one-time purchases

Actions:

1. Manage payment method
2. Download receipt
3. Browse Mythical
4. Cancel subscription
5. Change plan

## Mythical Project Flow

Path:

- `/mythical/:projectId` or `/projects/:projectId`

Displays:

1. Premium label
2. Expert-led description
3. Duration
4. Star reward
5. Age requirement
6. Recommended level
7. Expert profile
8. What you will learn
9. Syllabus
10. Safety and privacy
11. Pricing
12. Purchase CTA

Rules:

1. Mythical is premium.
2. Price is based on EUR 50 per star.
3. Access activates after payment approval.
4. Expert does not access child personal data in MVP.

## Admin Flow

### User Management

Path:

- `/admin/users`

Displays:

1. Total accounts
2. Active subscriptions
3. Pending activation
4. MRR
5. User table
6. Search and filters

Actions:

1. Search user
2. Filter by status/region
3. Export CSV
4. Add admin
5. Open user detail

### Upload New Project

Path:

- `/admin/projects/new`

Fields:

1. Project title
2. Category
3. Level
4. Recommended age
5. Star reward
6. Duration
7. Short description
8. Long description
9. Cover thumbnail
10. Instruction video
11. Report template
12. Weekly tasks
13. Publish status
14. Featured flag
15. New Stars flag
16. Safety labels
17. Materials list

Actions:

1. Save as draft
2. Publish
3. Replace media
4. Add material
5. Add optional week

### Payment Approval

Path:

- `/admin/payments`

Displays:

1. Pending approval metric
2. Received today metric
3. This week metric
4. Late fees collected metric
5. Pending transactions table
6. Transaction detail panel
7. Automated checks
8. Admin notes

Actions:

1. Approve payment
2. Request info
3. Reject payment
4. Export CSV
5. Manual entry

### Submission Review

Path:

- `/admin/submissions/:submissionId`

Displays:

1. Submission status
2. Project context
3. Team members
4. AI report pre-check
5. Report preview
6. Video proof
7. Manual review checklist
8. Reviewer notes
9. Decision panel

Actions:

1. Approve and issue stars
2. Request resubmission
3. Reject submission
4. Generate certificate
5. Feature on homepage
6. Log super-admin override reason

## Route Map

### Public

- `/`
- `/about`
- `/login`
- `/register`

### User App

- `/account`
- `/start/preference`
- `/start`
- `/categories/:categorySlug`
- `/projects/:projectId`
- `/projects/:projectId/workspace`
- `/projects/:projectId/submit`
- `/projects/:projectId/result`
- `/notifications`
- `/messages`
- `/achievements`
- `/subscription`
- `/settings`

### Admin

- `/admin`
- `/admin/users`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/categories`
- `/admin/levels`
- `/admin/payments`
- `/admin/submissions`
- `/admin/submissions/:submissionId`
- `/admin/notifications`
- `/admin/audit-logs`
- `/admin/settings`