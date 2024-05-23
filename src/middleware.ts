import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const defaultLang = 'th';
const LOCALES = ['th', 'en'];
const handleI18nRouting = createMiddleware({
  locales: LOCALES,
  defaultLocale: defaultLang,
  alternateLinks: false,
});

export async function middleware(req: NextRequest) {
  let { pathname } = req.nextUrl;
  const res = NextResponse.redirect(new URL(pathname, req.url));

  return handleI18nRouting(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
