'use client'

import LoginForm from "./LoginForm";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { webPaths } from "@/constant/webPaths";
import ProjectCoverLayout from "@/components/ProjectCoverLayout";
import { getCookie } from "cookies-next";


const LoginModule = () => {
  const router = useRouter()
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if(accessToken) {
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