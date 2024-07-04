"use client";
import { Stack, styled } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

import { ImageCarivaLogo, ImageCoverBg, ImagePlaygroundLogo } from "@/assets";

interface ProjectCoverLayoutProps {
  children: ReactNode;
}

const PlaygroundLogo = styled(ImagePlaygroundLogo)({
  position: "relative",
  margin: "40vh auto 0",
});

const CarivaLogo = styled(ImageCarivaLogo)({
  position: "relative",
  margin: "auto auto 3rem",
});

const FormSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
}));

const UnauthorizedLayout = ({ children }: ProjectCoverLayoutProps) => {
  return (
    <Stack direction="row" width="100vw" height="100vh">
      <Stack position="relative" flex={1}>
        <Image fill alt="login-background" src={ImageCoverBg} />
        <PlaygroundLogo />
        <CarivaLogo />
      </Stack>
      <FormSection>{children}</FormSection>
    </Stack>
  );
};

export default UnauthorizedLayout;
