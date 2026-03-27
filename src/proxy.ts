import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/courses/") && !token) {
  return NextResponse.redirect(new URL("/login", request.url));
}
  if (pathname.startsWith("/enroll%now/") && !token) {
  return NextResponse.redirect(new URL("/login", request.url));
}

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:path*", "/dashboard/:path*", "/login", "/enroll%now/:path*"],
};