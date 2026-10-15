import { cookies } from "next/headers";

// Talks to Supabase Auth over its HTTP API, so the app needs no extra packages.
// https://supabase.com/docs/reference/api (Auth: /auth/v1)

const SESSION_COOKIE = "sb-access-token";

type AuthResult = { error: string } | { accessToken: string; expiresIn: number };

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set.",
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

// Supabase returns its message under different keys depending on the endpoint.
function supabaseMessage(body: Record<string, unknown>, status: number): string {
  for (const field of ["msg", "error_description", "message", "error"]) {
    const value = body[field];
    if (typeof value === "string" && value) return value;
  }
  return `Supabase returned an error (HTTP ${status}).`;
}

async function authRequest(
  path: string,
  init: { body?: unknown; token?: string; method?: string },
): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1${path}`, {
    method: init.method ?? "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const text = await response.text();
  let body: Record<string, unknown> = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { message: text };
  }
  return { ok: response.ok, status: response.status, body };
}

function toSession(body: Record<string, unknown>): AuthResult | null {
  const accessToken = body.access_token;
  if (typeof accessToken !== "string") return null;
  const expiresIn = typeof body.expires_in === "number" ? body.expires_in : 3600;
  return { accessToken, expiresIn };
}

export async function signUp(email: string, password: string): Promise<AuthResult> {
  const res = await authRequest("/signup", { body: { email, password } });
  if (!res.ok) return { error: supabaseMessage(res.body, res.status) };
  return (
    toSession(res.body) ?? {
      error:
        "Supabase created the account but did not sign it in. Email confirmation may be turned on in Supabase.",
    }
  );
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const res = await authRequest("/token?grant_type=password", {
    body: { email, password },
  });
  if (!res.ok) return { error: supabaseMessage(res.body, res.status) };
  return toSession(res.body) ?? { error: "Supabase did not return a session." };
}

export async function saveSession(accessToken: string, expiresIn: number) {
  (await cookies()).set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn,
  });
}

// Returns the signed-in user's email, or null if there is no valid session.
export async function currentUserEmail(): Promise<string | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const res = await authRequest("/user", { method: "GET", token });
  if (!res.ok) return null;
  return typeof res.body.email === "string" ? res.body.email : null;
}

export async function signOut() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    // Ends the session on Supabase too; the cookie is cleared either way.
    await authRequest("/logout", { token }).catch(() => undefined);
  }
  store.delete(SESSION_COOKIE);
}
