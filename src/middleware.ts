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
  const pathSegments = pathname.split('/')
  try {
    if (!accessToken && pathSegments.every((path) => `/${path}` !== webPaths.login)) {
      // redirect to login if no accessToken and the path is not public
      const redirectUrl = new URL(`/${lang}${webPaths.login}`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
    if (pathSegments.some((path) => `/${path}` === webPaths.login) && accessToken?.value) {
      const redirectUrl = new URL(`/${lang}${webPaths.home}`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
    if (passwordChanged?.value === 'false' && pathSegments.every((path) => `/${path}` !== webPaths.setNewPassword)) {
      const redirectUrl = new URL(`/${lang}${webPaths.setNewPassword}`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.log(error)
  }
  
  return handleI18nRouting(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
