import { NextResponse } from "next/server";

export function proxy(req) {
  const at = req.cookies.get("IPM_AT")?.value;
  // const rt = req.cookies.get("IPM_RT")?.value;

  // Protect /music routes
  if (req.nextUrl.pathname.startsWith("/music") && (!at)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/music/:path*"],
};

