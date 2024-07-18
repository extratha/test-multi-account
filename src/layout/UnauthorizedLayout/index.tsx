"use client";
import { Stack, styled } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

import { ImageCarivaLogo, ImageCoverBg, PlaygroundLogo } from "@/assets";

interface ProjectCoverLayoutProps {
  children: ReactNode;
}

const LogoPlayground = styled(PlaygroundLogo)({
  position: "relative",
});

const CarivaLogo = styled(ImageCarivaLogo)({
  position: "relative",
});

const FormSection = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const UnauthorizedLayout = ({ children }: ProjectCoverLayoutProps) => {
  return (
    <Stack flex="1" direction="row">
      <Stack position="relative" direction="column" flex="1">
        <Image src={ImageCoverBg} alt="login-background" fill objectFit="cover" />
        <Stack flex="1" justifyContent="center" alignItems="center">
          <LogoPlayground />
        </Stack>
        <Stack padding="32px 16px 32px" alignItems="center" justifyContent="center">
          <CarivaLogo />
        </Stack>
      </Stack>
      <FormSection flex="1">{children}</FormSection>
    </Stack>
  );
};

export default UnauthorizedLayout;
