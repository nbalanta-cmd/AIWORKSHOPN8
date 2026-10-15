# Study Tasks

## Stack
- Next.js (App Router), TypeScript, plain CSS in app/globals.css.
- Supabase for sign-in and data. Deployed on Vercel; merging to main deploys the live site.

## Commands
- npm install
- npm run dev
- npm run build (must pass before any pull request)

## Never
- Add a dependency without asking first.
- Edit .env or any environment variable, or print a key's value.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders. Shared code goes in app/lib/.
- Create database tables or add migration files. Put SQL in your reply for me to run in the Supabase SQL Editor.
- Merge a feature pull request. Open it as a draft; I merge.
- Add Tailwind or any UI library. Plain CSS only.
- Put real personal data in the app. Fake names and fake content only.

## Conventions
- The homepage at / stays my personal page. The app lives at /tasks, with /login for signing up and logging in. The homepage links to it with the words Study tasks.
- Reuse the CSS variables already in app/globals.css. No new colors or fonts. The rainbow binary wave background on the homepage stays as it is: do not remove, restyle or tone it down.
- Every form shows Supabase's own error message, not a generic one.
- Every new table gets row level security in the same SQL, scoped to the row's owner, and you say which of read, create, update and delete each rule covers.
- Before opening a pull request, update roadmap.md and project-state.md to match the work in it.
- Explain what you did in plain language in the pull request description.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.
