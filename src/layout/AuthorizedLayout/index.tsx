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
  const accessToken = storage(SESSION.ACCESS_TOKEN);

  useEffect(() => {
    setIsAuthorized(!!accessToken);

    if (!accessToken) {
      router.replace(NAVIGATION.LOGIN);
    }
  }, []);

  return isAuthorized ? children : null;
};

export default AuthorizedLayout;
