"use client";

import ProjectCoverLayout from "@/components/ProjectCoverLayout";
import { webPaths } from "@/constant/webPaths";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

const LoginModule = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      router.replace(webPaths.home);
    }
  }, []);

  return (
    <ProjectCoverLayout>
      <LoginForm />
    </ProjectCoverLayout>
  );
};
export default LoginModule;
