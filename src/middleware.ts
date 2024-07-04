import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { COOKIE } from "./constant/constant";
import { webPaths } from "./constant/webPaths";

const defaultLang = "th";
const LOCALES = ["th", "en"];

const handleI18nRouting = createMiddleware({
  locales: LOCALES,
  defaultLocale: defaultLang,
  alternateLinks: false,
});

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const accessToken = req.cookies.get(COOKIE.ACCESS_TOKEN)?.value;
  const passwordChanged = req.cookies.get(COOKIE.PASSWORD_CHANGED)?.value;
  const resetPasswordToken = req.cookies.get(COOKIE.RESET_PASSWORD_TOKEN)?.value;
  const lang = req.cookies.get("NEXT_LOCALE")?.value;

  const urlToken = searchParams.get("token");

  const pathSegments = pathname.split("/");
  const publicPaths = [webPaths.login, webPaths.forgetPassword];

  const redirectTo = (destination: string) => {
    return NextResponse.redirect(new URL(`${destination}`, req.url));
  };

  if (pathname.includes(webPaths.setNewPassword) && urlToken?.length && urlToken?.length > 0) {
    const res = NextResponse.redirect(new URL(pathname, req.url));
    res.cookies.set({ name: COOKIE.RESET_PASSWORD_TOKEN, value: urlToken });
    return res;
  }
  try {
    if (!accessToken && !resetPasswordToken && pathSegments.every((path) => !publicPaths.includes(`/${path}`))) {
      return redirectTo(`/${lang}${webPaths.login}`);
    }
    if (passwordChanged === "false" && pathSegments.every((path) => `/${path}` !== webPaths.setNewPassword)) {
      return redirectTo(`/${lang}${webPaths.setNewPassword}`);
    }
  } catch (error) {
    console.log(error);
  }
  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
