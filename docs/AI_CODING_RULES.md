# AI Coding Rules for Star Project

## Purpose

This file is the instruction source for AI coding agents such as Kilo Code, DeepSeek, or other coding assistants.

The AI must follow this project context before writing or modifying code.

## Product Context

Star Project is a React + TypeScript + Vite PWA for a project-based career discovery platform for children aged 4–18, managed by parents/guardians.

The target MVP market is Kassel, Germany.

The product uses:

- Parent-managed accounts
- One guardian + one child per account
- Student ID invitation system
- 9 career categories
- 7 levels
- 4–5 week projects
- Team-based project start
- Report and video submission
- AI report review
- Admin video review
- Subscription and payment approval
- Private-by-default child media

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- PWA support

Backend:

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security

Deployment:

- GitHub
- Vercel

AI/Coding:

- Kilo Code
- DeepSeek API

## General Coding Rules

1. Use TypeScript.
2. Use React functional components.
3. Use Tailwind CSS for styling.
4. Use mobile-first responsive design.
5. Use semantic HTML where practical.
6. Keep components small and readable.
7. Prefer feature-based folders.
8. Do not modify unrelated files.
9. Do not delete existing files without explicit instruction.
10. Do not rewrite the whole project unless explicitly requested.
11. Do not add unnecessary libraries.
12. Do not create backend servers unless explicitly approved.
13. Do not put API keys or secrets in frontend code.
14. Do not commit `.env.local`.
15. Always preserve product decisions from `/docs`.

## Required AI Workflow

For every coding task, follow this sequence:

1. Read relevant files in `/docs`.
2. Analyze the task.
3. Identify affected files.
4. Propose a short implementation plan.
5. Ask clarification only if requirements are blocking.
6. Implement the smallest useful scope.
7. Explain what changed.
8. Provide commands to run.
9. Provide a manual test checklist.

For large tasks, stop after the plan and wait for approval.

## Prompt Interpretation Rules

If the user asks for a page, build only that page and its required components.

If the user asks for routing, do not build full page logic unless requested.

If the user asks for Supabase, do not expose secret keys.

If the user asks for admin, use mock data first unless database integration is explicitly requested.

If the user asks for UI based on mockup, prioritize matching layout, hierarchy, spacing, colors, and component behavior.

## Project Folder Structure

Recommended structure:

```txt
src/
  app/
    routes/
    providers/
  components/
    ui/
    layout/
    cards/
    forms/
    feedback/
  features/
    auth/
    public/
    account/
    start-career/
    categories/
    projects/
    submissions/
    subscription/
    notifications/
    admin/
  lib/
    supabase/
    constants/
    utils/
  data/
    mock/
  types/
  styles/