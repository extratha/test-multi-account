"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { NAVIGATION, SESSION } from "@/constant";
import { storage } from "@/utils/common";
import RequiredConsent from "./RequiredConsent";

interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!storage(SESSION.ACCESS_TOKEN)) {
      router.replace(NAVIGATION.LOGIN);
    }
  }, []);

  return <RequiredConsent>{children}</RequiredConsent>;
};

export default AuthorizedLayout;
