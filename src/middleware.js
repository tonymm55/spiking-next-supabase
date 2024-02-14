import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (user && req.nextUrl.pathname === "/") {
      console.log("Redirecting authenticated user to watch-list");
      return NextResponse.redirect(new URL("/watch-list", req.url));
    } else if (!user && req.nextUrl.pathname !== "/") {
      console.log("Redirecting unauthenticated user to home");
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.error("Error in middleware:", error);
  }

  return res;
}

export const config = {
  matcher: ["/", "/watch-list"],
};