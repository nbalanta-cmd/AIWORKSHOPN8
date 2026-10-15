"use client";

import { useActionState } from "react";
import { authenticate, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    authenticate,
    null,
  );

  return (
    <form action={formAction} className="form">
      <label className="field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          defaultValue={state?.email}
        />
      </label>
      <label className="field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" required />
      </label>

      {state?.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}

      <div className="actions">
        <button type="submit" name="intent" value="login" className="button" disabled={pending}>
          Log in
        </button>
        <button
          type="submit"
          name="intent"
          value="create"
          className="button button-secondary"
          disabled={pending}
        >
          Create account
        </button>
      </div>
    </form>
  );
}
