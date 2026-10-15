# Project state

Last updated: 2026-10-15

## Works
- The homepage at / shows my name, an About section, a This semester list and a footer.

## Broken or flaky
- Nothing known.

## Environment notes
- Next.js App Router, TypeScript, plain CSS in app/globals.css, deployed on Vercel from main. Every pull request gets a Vercel preview link.
- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in Vercel for Production and Preview. Nothing reads them yet.
- Supabase Auth: Confirm email is off, Site URL is the live address, and there is one Redirect URL ending in /**.

## Next session
- Build slice 1, sign up and log in, the slice marked ACTIVE in roadmap.md.
