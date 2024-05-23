import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ['th', 'en'],
  defaultLocale: 'th',
})

export async function middleware(req: NextRequest) {
  let { pathname } = req.nextUrl;
  const res = NextResponse.redirect(new URL(pathname, req.url));

  return intlMiddleware(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
