# Star Project Database Schema

## Database Provider

Supabase PostgreSQL.

## Security Baseline

1. Enable Row Level Security on all user-related tables.
2. Frontend may only use Supabase publishable/anon key.
3. Secret/service role key must never be used in frontend.
4. Parents can only access their own account, child, projects, submissions, payments, and notifications.
5. Admin-only actions must be restricted by admin role.
6. Child media is private by default.
7. Every sensitive admin action must be logged.

## Naming Conventions

Use snake_case for database tables and columns.

Use UUID primary keys unless otherwise noted.

Every core table should include:

- id
- created_at
- updated_at where relevant

## Enums

### user_role

- guardian
- super_admin

### account_status

- pending_activation
- active
- suspended
- cancelled

### project_status

- draft
- published
- archived

### child_project_status

- not_started
- waiting_for_member
- ongoing
- submitted
- needs_manual_review
- completed
- late
- retake_available

### invitation_status

- pending
- accepted
- declined
- expired
- cancelled

### submission_status

- draft
- submitted
- ai_review_passed
- needs_manual_review
- approved
- resubmission_requested
- rejected

### payment_status

- pending
- approved
- rejected
- failed
- refunded

### payment_type

- subscription
- mythical
- late_fee
- manual

### notification_type

- invitation
- project_update
- payment
- achievement
- system_message
- deadline
- review

### level_code

- tiny
- baby
- junior
- young
- senior
- legendary
- mythical

## Tables

## 1. profiles

Stores authenticated user profile.

Fields:

- id uuid primary key references auth.users.id
- role user_role not null default guardian
- full_name text not null
- email text not null
- region text
- account_status account_status not null default pending_activation
- created_at timestamptz default now()
- updated_at timestamptz

Notes:

- One guardian profile manages one child account in MVP.
- Super admin users are also stored here with role = super_admin.

## 2. child_profiles

Stores child identity linked to guardian.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- student_id text unique not null
- full_name text not null
- birthdate date not null
- age_cached int
- about text
- avatar_url text
- public_media_allowed boolean default false
- created_at timestamptz default now()
- updated_at timestamptz

Rules:

- One guardian account has one child profile in MVP.
- Student ID format example: SP-2026-0048.
- Child data is private by default.

## 3. consent_records

Stores parental consent and legal confirmations.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- child_id uuid not null references child_profiles(id)
- consent_type text not null
- accepted boolean not null default false
- accepted_at timestamptz
- version text
- ip_address text
- user_agent text
- created_at timestamptz default now()

Consent types:

- data_processing
- legal_guardian_confirmation
- safety_responsibility
- media_upload_private_default
- public_media_sharing_optional
- deadline_fee_policy
- subscription_terms

## 4. categories

Stores career categories.

Fields:

- id uuid primary key
- slug text unique not null
- name text not null
- description text
- icon text
- color_bg text
- color_accent text
- is_active boolean default true
- sort_order int default 0
- created_at timestamptz default now()
- updated_at timestamptz

Seed categories:

- chef
- automotive
- farm
- robotics
- media_creator
- community_builder
- software_creator
- fashion
- music

## 5. levels

Stores level metadata.

Fields:

- id uuid primary key
- code level_code unique not null
- name text not null
- star_label text
- recommended_min_age int
- is_premium boolean default false
- sort_order int not null
- created_at timestamptz default now()

Seed levels:

1. tiny, Tiny, 4+, regular
2. baby, Baby, 6+, regular
3. junior, Junior, 8+, regular
4. young, Young, 10+, regular
5. senior, Senior, 13+, regular
6. legendary, Legendary, 15+, regular advanced
7. mythical, Mythical, 13+/15+, premium

## 6. projects

Stores project content.

Fields:

- id uuid primary key
- category_id uuid not null references categories(id)
- level_id uuid not null references levels(id)
- title text not null
- slug text unique not null
- short_description text
- long_description text
- recommended_age_min int
- recommended_age_max int
- duration_weeks int default 4
- star_reward int default 1
- is_mythical boolean default false
- price_eur numeric(10,2)
- status project_status default draft
- is_featured boolean default false
- is_new_star boolean default false
- cover_image_url text
- instruction_video_url text
- report_template_url text
- created_by uuid references profiles(id)
- created_at timestamptz default now()
- updated_at timestamptz
- published_at timestamptz

Rules:

- Regular project usually has star_reward = 1.
- Mythical project usually has star_reward = 2 or 3.
- Mythical price may follow EUR 50 per star.

## 7. project_tasks

Stores weekly task structure.

Fields:

- id uuid primary key
- project_id uuid not null references projects(id) on delete cascade
- week_number int not null
- title text not null
- description text not null
- estimated_hours text
- order_index int not null
- is_required boolean default true
- created_at timestamptz default now()
- updated_at timestamptz

Default task pattern:

1. Research & Validation
2. Build & Create
3. Test & Validate
4. Improve & Finalize
5. Showcase & Reflection optional

## 8. project_materials

Stores material list for projects.

Fields:

- id uuid primary key
- project_id uuid not null references projects(id) on delete cascade
- name text not null
- quantity text
- is_required boolean default true
- created_at timestamptz default now()

## 9. safety_labels

Stores reusable safety labels.

Fields:

- id uuid primary key
- code text unique not null
- label text not null
- icon text
- description text
- created_at timestamptz default now()

Seed labels:

- adult_supervision_required
- no_knife
- no_open_fire
- allergy_check_required
- private_submission_only

## 10. project_safety_labels

Join table between projects and safety labels.

Fields:

- id uuid primary key
- project_id uuid not null references projects(id) on delete cascade
- safety_label_id uuid not null references safety_labels(id)
- created_at timestamptz default now()

## 11. category_preferences

Stores selected child interests.

Fields:

- id uuid primary key
- child_id uuid not null references child_profiles(id) on delete cascade
- category_id uuid not null references categories(id)
- created_at timestamptz default now()

Rules:

- Minimum 2 categories required at registration/preference update.

## 12. category_progress

Stores child stars and level progress per category.

Fields:

- id uuid primary key
- child_id uuid not null references child_profiles(id) on delete cascade
- category_id uuid not null references categories(id)
- current_level_id uuid references levels(id)
- total_stars int default 0
- completed_projects_count int default 0
- created_at timestamptz default now()
- updated_at timestamptz

## 13. child_projects

Stores project instance started by a child/team.

Fields:

- id uuid primary key
- project_id uuid not null references projects(id)
- owner_child_id uuid not null references child_profiles(id)
- status child_project_status default waiting_for_member
- started_at timestamptz
- final_deadline_at timestamptz
- submitted_at timestamptz
- completed_at timestamptz
- progress_percent int default 0
- attempt_number int default 1
- previous_attempt_id uuid references child_projects(id)
- created_at timestamptz default now()
- updated_at timestamptz

Rules:

- Cannot start until at least 2 accepted team members exist.
- Timer starts at started_at.
- Final deadline is started_at + project duration weeks.

## 14. project_team_members

Stores team members for a child project.

Fields:

- id uuid primary key
- child_project_id uuid not null references child_projects(id) on delete cascade
- child_id uuid not null references child_profiles(id)
- role text default member
- joined_at timestamptz
- status text default active
- created_at timestamptz default now()

Roles:

- owner
- member

## 15. project_invitations

Stores invitations by Student ID.

Fields:

- id uuid primary key
- child_project_id uuid not null references child_projects(id) on delete cascade
- invited_by_child_id uuid not null references child_profiles(id)
- invited_child_id uuid references child_profiles(id)
- invited_student_id text not null
- status invitation_status default pending
- expires_at timestamptz not null
- responded_at timestamptz
- created_at timestamptz default now()

Rules:

- Invitations expire after 7 days.
- Only registered Student IDs can accept.

## 16. task_progress

Tracks weekly task completion.

Fields:

- id uuid primary key
- child_project_id uuid not null references child_projects(id) on delete cascade
- project_task_id uuid not null references project_tasks(id)
- completed_by_child_id uuid references child_profiles(id)
- is_completed boolean default false
- notes text
- completed_at timestamptz
- created_at timestamptz default now()
- updated_at timestamptz

## 17. project_files

Stores uploaded weekly files and evidence.

Fields:

- id uuid primary key
- child_project_id uuid not null references child_projects(id) on delete cascade
- uploaded_by_child_id uuid references child_profiles(id)
- project_task_id uuid references project_tasks(id)
- file_url text not null
- file_name text
- file_type text
- file_size_bytes bigint
- visibility text default private
- created_at timestamptz default now()

Visibility:

- private
- public_with_consent

## 18. submissions

Stores final project submissions.

Fields:

- id uuid primary key
- child_project_id uuid not null references child_projects(id)
- submitted_by_child_id uuid references child_profiles(id)
- status submission_status default draft
- report_file_url text
- video_file_url text
- selected_photo_file_ids uuid[]
- submitted_at timestamptz
- reviewed_at timestamptz
- reviewed_by uuid references profiles(id)
- reviewer_notes text
- created_at timestamptz default now()
- updated_at timestamptz

## 19. ai_report_reviews

Stores AI report review result.

Fields:

- id uuid primary key
- submission_id uuid not null references submissions(id) on delete cascade
- status text not null
- score numeric(5,2)
- file_readable boolean default false
- week_1_present boolean default false
- week_2_present boolean default false
- week_3_present boolean default false
- week_4_present boolean default false
- relevant_to_project boolean default false
- safety_concern_flagged boolean default false
- summary text
- raw_result jsonb
- created_at timestamptz default now()

## 20. manual_reviews

Stores admin review result.

Fields:

- id uuid primary key
- submission_id uuid not null references submissions(id) on delete cascade
- reviewer_id uuid not null references profiles(id)
- both_members_visible boolean
- project_completed boolean
- audio_quality text
- video_approved boolean
- decision text not null
- reviewer_notes text
- is_super_admin_override boolean default false
- override_reason text
- created_at timestamptz default now()

Decision values:

- approved
- resubmission_requested
- rejected

## 21. achievements

Stores issued achievements.

Fields:

- id uuid primary key
- child_id uuid not null references child_profiles(id)
- project_id uuid references projects(id)
- child_project_id uuid references child_projects(id)
- category_id uuid references categories(id)
- level_id uuid references levels(id)
- title text not null
- description text
- star_value int default 1
- badge_icon text
- issued_at timestamptz default now()
- issued_by uuid references profiles(id)

## 22. certificates

Stores generated certificate metadata.

Fields:

- id uuid primary key
- achievement_id uuid not null references achievements(id)
- child_id uuid not null references child_profiles(id)
- certificate_number text unique
- pdf_url text
- issued_at timestamptz default now()

## 23. subscription_plans

Stores plans.

Fields:

- id uuid primary key
- name text not null
- price_eur numeric(10,2) not null
- billing_interval text default monthly
- description text
- is_active boolean default true
- created_at timestamptz default now()

Seed:

- Star Project Family, EUR 29/month

## 24. account_subscriptions

Stores user subscription status.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- plan_id uuid references subscription_plans(id)
- status text not null
- payment_method text
- renews_at timestamptz
- started_at timestamptz
- cancelled_at timestamptz
- created_at timestamptz default now()
- updated_at timestamptz

## 25. payment_requests

Stores payments needing approval.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- child_id uuid references child_profiles(id)
- child_project_id uuid references child_projects(id)
- payment_type payment_type not null
- provider text
- provider_reference text
- amount_eur numeric(10,2) not null
- status payment_status default pending
- submitted_at timestamptz default now()
- approved_at timestamptz
- approved_by uuid references profiles(id)
- rejected_at timestamptz
- rejected_by uuid references profiles(id)
- admin_notes text
- created_at timestamptz default now()
- updated_at timestamptz

## 26. deadline_fees

Stores late fee charges.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- child_project_id uuid not null references child_projects(id)
- amount_eur numeric(10,2) default 0.50
- month_key text not null
- status payment_status default pending
- created_at timestamptz default now()

Rules:

- Max EUR 2/month/account.
- Fee applies to late account only.

## 27. premium_purchases

Stores Mythical purchases.

Fields:

- id uuid primary key
- guardian_id uuid not null references profiles(id)
- child_id uuid not null references child_profiles(id)
- project_id uuid not null references projects(id)
- payment_request_id uuid references payment_requests(id)
- amount_eur numeric(10,2) not null
- status text default pending
- activated_at timestamptz
- created_at timestamptz default now()

## 28. notifications

Stores user notifications.

Fields:

- id uuid primary key
- profile_id uuid not null references profiles(id)
- child_id uuid references child_profiles(id)
- type notification_type not null
- title text not null
- body text
- action_url text
- is_read boolean default false
- created_at timestamptz default now()

## 29. system_messages

Stores system inbox messages.

Fields:

- id uuid primary key
- profile_id uuid not null references profiles(id)
- child_id uuid references child_profiles(id)
- title text not null
- body text not null
- category text
- action_url text
- is_read boolean default false
- created_at timestamptz default now()

Rules:

- System messages only.
- No free-form child chat in MVP.

## 30. admin_audit_logs

Stores audit trail for admin actions.

Fields:

- id uuid primary key
- admin_id uuid not null references profiles(id)
- action text not null
- entity_type text
- entity_id uuid
- before_data jsonb
- after_data jsonb
- notes text
- created_at timestamptz default now()

## Storage Buckets

### project-assets

Stores:

- cover thumbnails
- instruction videos
- report templates

Access:

- public read for published assets where safe
- admin write only

### user-uploads

Stores:

- weekly project files
- photos
- reports
- video proof

Access:

- private by default
- guardian/team access only
- admin review access
- public only if explicit consent exists

### certificates

Stores:

- generated certificate PDFs

Access:

- guardian and child owner
- admin access

## Initial Seed Data

### Categories

1. Chef
2. Automotive
3. Farm
4. Robotics
5. Media Creator
6. Community Builder
7. Software Creator
8. Fashion
9. Music

### Levels

1. Tiny
2. Baby
3. Junior
4. Young
5. Senior
6. Legendary
7. Mythical

### Safety Labels

1. Adult Supervision Required
2. No Knife
3. No Open Fire
4. Allergy Check Required
5. Private Submission Only

### Subscription Plan

1. Star Project Family — EUR 29/month

## RLS Policy Summary

### profiles

- Guardian can read/update own profile.
- Super admin can read/manage all.

### child_profiles

- Guardian can read/update own child profile.
- Super admin can read/manage all.

### projects

- Published projects are readable by authenticated users.
- Draft projects are admin-only.
- Public preview can read limited published fields if needed.

### child_projects

- Guardian can read child projects linked to own child.
- Team members can read shared project instance.
- Super admin can read/manage all.

### submissions

- Guardian can read/write own child submission.
- Team members can read shared submission status.
- Super admin can review/manage all.

### payments

- Guardian can read own payment records.
- Super admin can approve/reject all.

### notifications

- User can read/update own notifications.
- Super admin can create notifications.

## Important Engineering Notes

1. Do not overbuild payment in Phase 1.
2. Do not implement complex AI review before upload flow is stable.
3. Keep database normalized enough for future scaling.
4. Start with seed data and mock content where needed.
5. Implement RLS before public production.
6. Store consent records from the beginning.
7. Keep public sharing consent separate from upload consent.