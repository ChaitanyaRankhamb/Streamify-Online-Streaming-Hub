import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const url = request.nextUrl;

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (
    token &&
    (url.pathname.includes("/login") ||
      url.pathname.includes("/signup") ||
      url.pathname.includes("/verify-code") ||
      url.pathname.includes("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to sign-in
  if (
    !token &&
    (url.pathname.includes("/dashboard") ||
      url.pathname.includes("/verify"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
