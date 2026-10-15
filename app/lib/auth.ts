import { createClient } from "./supabase/server";

type AuthResult = { error: string } | { ok: true };

export async function signUp(email: string, password: string): Promise<AuthResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  if (!data.session) {
    return {
      error:
        "Supabase created the account but did not sign it in. Email confirmation may be turned on in Supabase.",
    };
  }
  return { ok: true };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  return { ok: true };
}

// Returns the signed-in user's email, or null if there is no valid session.
// getClaims verifies the session token, so it is safe for protecting pages.
export async function currentUserEmail(): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;
  const email = data.claims.email;
  return typeof email === "string" ? email : null;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
