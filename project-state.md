# Project state

Last updated: 2026-10-15

## Works
- The homepage at / shows my name, an About section, a This semester list and a footer, over a rainbow binary wave background.
- Slice 1 is built in the pull request "Slice 1: sign up and log in", waiting to be checked on its Vercel preview: /login creates an account or logs in, /tasks shows "Signed in as" and the email with a Log out button, and /tasks sends anyone not signed in to /login.

## Broken or flaky
- /login and /tasks on the slice 1 preview return a 500 error ("Your project's URL and Key are required") until those two variables exist on aiworkshopn8vercel and the preview is redeployed.
- Not yet checked against the real Supabase project. Locally it was tested only against a stand-in that copies Supabase Auth's responses.

## Environment notes
- Next.js App Router, TypeScript, plain CSS in app/globals.css, deployed on Vercel from main. Every pull request gets a Vercel preview link.
- The live site is https://aiworkshopn8vercel.vercel.app (Vercel project aiworkshopn8vercel).
- The Supabase project was created from Vercel's Storage tab on aiworkshopn8vercel on 2026-10-15.
- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set on aiworkshopn8vercel for Production and Preview; on 2026-10-15 the project had no environment variables yet. They are read by @supabase/ssr and @supabase/supabase-js, set up as in Supabase's official Next.js App Router example: app/lib/supabase/server.ts creates the server client, and middleware.ts (using app/lib/supabase/middleware.ts) refreshes the session on /login and /tasks so people stay signed in past one hour.
- Supabase Auth: Confirm email is off, Site URL is the live address, and there is one Redirect URL ending in /**.

## Next session
- Check slice 1 on the preview link. Once it passes and is merged, mark it done in roadmap.md and make slice 2 ACTIVE.
