'use client'

import { ImaagePlaygrondLogo, ImageCarivaLogo, ImageLandingBg } from "@/assets"
import { Button, IconButton, Stack, Typography } from "@mui/material"
import Image from "next/image"
import LoginForm from "./LoginForm";
import { useUserProfileStore } from "@/store";
import { useEffect, useMemo } from "react";
import SetNewPassword from "./SetNewPassword";


const LoginModule = () => {
  const { id, passwordChanged } = useUserProfileStore()
  const isDisplaySetNewPassword = useMemo(() => {
    return id && passwordChanged === false ? true : false
  }, [id, passwordChanged])
  return (
    <>
      <Stack direction='row' width={'100vw'} height={"100vh"}>
        <Stack position="relative" flex={1}>
          <Image style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100%' }} alt='' src={ImageLandingBg}>
          </Image>
          <Image style={{ margin: '40vh auto 0' }} alt='' src={ImaagePlaygrondLogo} />
          <Image style={{ margin: 'auto auto 3rem' }} alt='' src={ImageCarivaLogo} />

        </Stack>
        <Stack flex={1}>
          {!isDisplaySetNewPassword ?
            <LoginForm></LoginForm>
            :
            <SetNewPassword />
          }
        </Stack>
      </Stack>
    </>
  )
}
export default LoginModule