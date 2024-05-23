import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { webPaths } from "./constant/webPaths";

const defaultLang = 'th';
const LOCALES = ['th', 'en'];
const handleI18nRouting = createMiddleware({
  locales: LOCALES,
  defaultLocale: defaultLang,
  alternateLinks: false,
});

export async function middleware(req: NextRequest) {
  let { pathname } = req.nextUrl;
  const passwordChanged = req.cookies.get('passwordChanged')
  const accessToken = req.cookies.get('accessToken')
  const lang = req.cookies.get('NEXT_LOCALE')?.value
  const pathnameExcludeLang = pathname.split(`/${lang}`)[1]
  const publicPaths = [
    webPaths.login,
    webPaths.setNewPassword,
  ]
  if (!accessToken && pathnameExcludeLang!==webPaths.login ) {
    // redirect to login if no accessToken and the path is not public
    const redirectUrl = new URL(`/${lang}${webPaths.login}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
  if (pathnameExcludeLang === webPaths.login && accessToken?.value) {
    const redirectUrl = new URL(`/${lang}${webPaths.home}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
  if (passwordChanged?.value === 'false' && !publicPaths.includes(pathnameExcludeLang)) {
    const redirectUrl = new URL(`/${lang}${webPaths.setNewPassword}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return handleI18nRouting(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
