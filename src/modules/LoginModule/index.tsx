'use client'

import { ImaagePlaygrondLogo, ImageCarivaLogo, ImageLandingBg } from "@/assets"
import { Stack, } from "@mui/material"
import Image from "next/image"
import LoginForm from "./LoginForm";
import { useUserProfileStore } from "@/store";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { webPaths } from "@/constant/webPaths";
import ProjectCoverLayout from "@/components/ProjectCoverLayout";


const LoginModule = () => {
  const { id, passwordChanged, resetUserProfile } = useUserProfileStore()
  const router = useRouter()
  useEffect(() => {
    resetUserProfile();
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