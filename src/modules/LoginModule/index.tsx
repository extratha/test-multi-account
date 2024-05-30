'use client'

import LoginForm from "./LoginForm";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { webPaths } from "@/constant/webPaths";
import ProjectCoverLayout from "@/components/ProjectCoverLayout";
import { getCookie } from "cookies-next";
import useToastStore from "@/store/useToastStore";


const LoginModule = () => {
  const router = useRouter()
  const { setToastOpen } = useToastStore()
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    setToastOpen(true,
      {
        severity: 'success',
        message: 'test',
        icon: null
      }
    );
    if (accessToken) {
      router.replace(webPaths.home)
    }
  }, []);
  return (
    <>
      <ProjectCoverLayout>
        <LoginForm />
      </ProjectCoverLayout>

    </>
  )
}
export default LoginModule