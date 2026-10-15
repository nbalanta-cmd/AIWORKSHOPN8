import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUserEmail } from "../lib/auth";
import { logOut } from "./actions";

export const metadata: Metadata = { title: "Study tasks" };

export default async function TasksPage() {
  const email = await currentUserEmail();
  if (!email) redirect("/login");

  return (
    <div className="page">
      <main>
        <h1>Study tasks</h1>
        <p className="lede">
          Signed in as <strong>{email}</strong>
        </p>
        <form action={logOut} className="actions">
          <button type="submit" className="button button-secondary">
            Log out
          </button>
        </form>
      </main>
    </div>
  );
}
