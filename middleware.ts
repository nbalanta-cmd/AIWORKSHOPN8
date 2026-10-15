import { type NextRequest } from "next/server";
import { updateSession } from "./app/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only the pages that use Supabase; the homepage does not need it.
  matcher: ["/login", "/tasks/:path*"],
};
