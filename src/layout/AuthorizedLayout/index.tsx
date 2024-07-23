"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { NAVIGATION } from "@/constant";
import { useUserProfileStore } from "@/store";

interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const router = useRouter();
  const { data } = useUserProfileStore();
  const isUnauthorized = !data;

  useEffect(() => {
    if (isUnauthorized) {
      router.replace(NAVIGATION.LOGIN);
    }
  }, []);

  return isUnauthorized ? null : children;
};

export default AuthorizedLayout;
