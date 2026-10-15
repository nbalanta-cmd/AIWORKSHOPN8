import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Log in · Study tasks" };

export default function LoginPage() {
  return (
    <div className="page">
      <main>
        <h1>Study tasks</h1>
        <p className="lede">Log in, or create an account with an email and a password.</p>
        <LoginForm />
      </main>
    </div>
  );
}
