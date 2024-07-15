"use client";

import { Box, Divider, Paper as MuiPaper, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { IconAiInterpret, IosDeviceFrame } from "@/assets";
import PageTitle from "@/components/Typography/PageTitle";
import useTranslation from "@/locales/useLocale";
import { SymptomCheckerConfigResult } from "@/types/model.ui";
import { getSymptomCheckerConfig } from "@/utils/firebase";

const Wrapper = styled(Stack)({
  flex: 1,
  width: "100%",
  padding: "24px",
});

const Paper = styled(MuiPaper)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
});

const Header = styled(Stack)({
  padding: "32px 40px 0px",
  "& .MuiDivider-root": {
    marginTop: "8px",
  },
});

const Content = styled(Stack)({
  position: "relative",
  flex: 1,
  padding: "8px 40px",
  overflow: "hidden",
});

const DeviceWrapper = styled(Stack)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const DeviceFrameSection = styled(Box)({
  position: "absolute",
  width: "0px",
  height: "0px",
});

const ContentIframe = styled("iframe")({
  position: "absolute",
  width: "100%",
  height: "100%",
  padding: "16px",
  border: "0px",
});

const DeviceImage = styled(Image)({
  pointerEvents: "none",
});

const initialConfig: SymptomCheckerConfigResult = {
  url: "",
};

const SymptomChecker = () => {
  const { translation } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState(initialConfig);

  const refContent = useRef<HTMLDivElement>(null);
  const refDeviceSection = useRef<HTMLDivElement>(null);
  const refContentIframe = useRef<HTMLIFrameElement>(null);

  const calculateDeviceFrame = () => {
    if (!refContent.current || !refDeviceSection.current || !refContentIframe.current) return;
    const contentHeight = refContent.current.offsetHeight;
    const margin = 24;
    const maxHeight = 900;

    let height = contentHeight - margin;

    if (height > maxHeight) height = maxHeight;

    const width = height * 0.5;

    refDeviceSection.current.style.width = `${width}px`;
    refDeviceSection.current.style.height = `${height - margin}px`;
    refContentIframe.current.style.borderRadius = `${height * 0.075}px`;
  };

  const fetchConfigData = async () => {
    setIsLoading(true);
    const remoteConfig = await getSymptomCheckerConfig();
    setConfig(remoteConfig);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchConfigData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    calculateDeviceFrame();

    window.addEventListener("resize", calculateDeviceFrame);
    return () => {
      window.removeEventListener("resize", calculateDeviceFrame);
    };
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <Wrapper>
          <Paper>
            <Header>
              <Stack direction="row" alignItems="center">
                <Box marginRight="12px">
                  <IconAiInterpret />
                </Box>
                <PageTitle>{translation("Common.symptomChecker.title")}</PageTitle>
                <Box flex="1" />
                <Typography variant="bodyMedium">{translation("Common.symptomChecker.subtitle")}</Typography>
              </Stack>
              <Divider />
            </Header>
            <Content ref={refContent}>
              <DeviceWrapper>
                <DeviceFrameSection ref={refDeviceSection}>
                  <DeviceImage src={IosDeviceFrame} fill alt="check" />
                  <ContentIframe ref={refContentIframe} src={config.url} />
                </DeviceFrameSection>
              </DeviceWrapper>
            </Content>
          </Paper>
        </Wrapper>
      )}
    </>
  );
};

export default SymptomChecker;
