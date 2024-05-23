'use client'

import LoginForm from "./LoginForm";
import { useUserProfileStore } from "@/store";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { webPaths } from "@/constant/webPaths";
import ProjectCoverLayout from "@/components/ProjectCoverLayout";
import { getCookie} from "cookies-next";


const LoginModule = () => {
  const { data, resetUserProfile } = useUserProfileStore()
  const {id, passwordChanged } = data
  const router = useRouter()
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if(accessToken) {
      router.replace(webPaths.home)
    }
  }, []);
  useEffect(() => {
    if (id && passwordChanged === false) {
      router.replace(webPaths.setNewPassword)
    }
  }, [id, passwordChanged])
  return (
    <>
      <ProjectCoverLayout>
        <LoginForm />
      </ProjectCoverLayout>
      
    </>
  )
}
export default LoginModule