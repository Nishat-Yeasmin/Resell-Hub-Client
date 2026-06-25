import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const role = req.cookies.get("role")?.value;

  if (path.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/dashboard/seller") && role !== "seller") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/dashboard/buyer") && role !== "buyer") {
    return NextResponse.redirect(new URL("/", req.url));
  }
console.log("MIDDLEWARE RUNNING:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [ ],
};