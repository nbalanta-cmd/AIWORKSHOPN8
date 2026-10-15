"use server";

import { redirect } from "next/navigation";
import { signIn, signUp } from "../lib/auth";

export type LoginState = { error: string; email: string } | null;

export async function authenticate(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const intent = formData.get("intent");

  const result =
    intent === "create" ? await signUp(email, password) : await signIn(email, password);

  if ("error" in result) return { error: result.error, email };

  redirect("/tasks");
}
