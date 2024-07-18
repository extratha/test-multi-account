import { NextRequest, NextResponse } from "next/server";

import { COOKIE } from "./constant/constant";
import { webPaths } from "./constant/webPaths";

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const accessToken = req.cookies.get(COOKIE.ACCESS_TOKEN)?.value;
  const passwordChanged = req.cookies.get(COOKIE.PASSWORD_CHANGED)?.value;
  const resetPasswordToken = req.cookies.get(COOKIE.RESET_PASSWORD_TOKEN)?.value;

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
      return redirectTo(`${webPaths.login}`);
    }
    if (passwordChanged === "false" && pathSegments.every((path) => `/${path}` !== webPaths.setNewPassword)) {
      return redirectTo(`${webPaths.setNewPassword}`);
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
