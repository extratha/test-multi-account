"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { NAVIGATION, SESSION } from "@/constant";
import { storage } from "@/utils/common";

interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = storage(SESSION.ACCESS_TOKEN);

    if (accessToken) {
      setIsLoading(false);
    } else {
      router.replace(NAVIGATION.LOGIN);
    }
  }, []);

  return <>{isLoading ? <FullScreenLoading /> : children}</>;
};

export default AuthorizedLayout;
