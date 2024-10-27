import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const userType = request.cookies.get("user-type");

  // Protected business routes
  if (request.nextUrl.pathname.startsWith("/business/dashboard")) {
    if (!token || userType?.value !== "business") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protected customer routes
  if (
    request.nextUrl.pathname.startsWith("/account") ||
    request.nextUrl.pathname.startsWith("/gift-cards")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/business/dashboard/:path*", "/gift-cards/:path*"],
};