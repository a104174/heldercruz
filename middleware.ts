import { NextResponse, type NextRequest } from "next/server";
import {
  getLocaleFromAcceptLanguage,
  isValidLocale,
  localizePathname
} from "@/i18n/locales";

const PUBLIC_FILE = /\.(.*)$/;

function shouldIgnorePath(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldIgnorePath(pathname)) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  if (firstSegment && /^[a-z]{2}$/i.test(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  const locale = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = localizePathname(pathname, locale);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
