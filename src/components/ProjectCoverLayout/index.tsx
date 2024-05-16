import { ImaagePlaygrondLogo, ImageCarivaLogo, ImageLandingBg } from "@/assets"
import { Stack } from "@mui/material"
import Image from "next/image"
import { ReactNode } from "react"

interface ProjectCoverLayoutProps {
  children: ReactNode
}
const ProjectCoverLayout = ({ children }: ProjectCoverLayoutProps) => {
  return (
    <Stack direction='row' width={'100vw'} height={"100vh"}>
      <Stack position="relative" flex={1}>
        <Image style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100%' }} alt='' src={ImageLandingBg}>
        </Image>
        <Image style={{ margin: '40vh auto 0' }} alt='' src={ImaagePlaygrondLogo} />
        <Image style={{ margin: 'auto auto 3rem' }} alt='' src={ImageCarivaLogo} />

      </Stack>
      <Stack flex={1}>
        {children}
      </Stack>
    </Stack>
  )
};

export default ProjectCoverLayout;