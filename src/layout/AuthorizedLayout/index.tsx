"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { NAVIGATION, SESSION } from "@/constant";
import { storage } from "@/utils/common";

interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = storage(SESSION.ACCESS_TOKEN);

    if (accessToken) {
      setIsAuthorized(true);
    } else {
      router.replace(NAVIGATION.HOME);
    }
  }, []);

  return isAuthorized ? children : null;
};

export default AuthorizedLayout;
