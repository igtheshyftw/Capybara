import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * A cheap gate, not the authorisation check.
 *
 * Middleware runs on the edge where Prisma is unavailable, so all it can do is
 * see whether a session cookie exists and bounce obvious anonymous traffic. The
 * real decisions — is this session valid, is this person allowed here — happen
 * in server components through requireUser/requireRole, which every protected
 * page calls. Treat this purely as a redirect convenience.
 */

const PUBLIC_PREFIXES = ["/login", "/invite", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  // Demo mode has no accounts, so nothing to protect.
  if (!process.env.DATABASE_URL) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  if (pathname === "/" || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!request.cookies.get(SESSION_COOKIE)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    // Remember where they were headed so sign-in can return them.
    if (pathname !== "/") url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
