import { NextResponse } from "next/server";

export function middleware(req: any) {
  // Ví dụ: Middleware kiểm tra và điều hướng nếu cần
  const { pathname } = req.nextUrl;

  if (pathname === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected"],
};
