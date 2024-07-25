"use client";

import { Box, Button, Divider, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { IconAiInterpret, IconReload, IosDeviceFrame } from "@/assets";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import DashboardPage from "@/components/Page/DashboardPage";
import PageTitle from "@/components/Typography/PageTitle";
import useTranslation from "@/locales/useLocale";
import { SymptomCheckerConfig } from "@/types/model.ui";
import { getDashboardMenuConfig } from "@/utils/firebase";

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
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const DeviceFrameSection = styled(Box)({
  position: "relative",
  width: "0px",
  height: "0px",
});

const ContentIframe = styled("iframe")({
  width: "100%",
  height: "100%",
  padding: "16px",
  border: "0px",
});

const DeviceImage = styled(Image)({
  position: "absolute",
  pointerEvents: "none",
});

const ReloadButton = styled(Button)({
  position: "absolute",
  top: "24px",
  left: "100%",
  marginLeft: "24px",
  whiteSpace: "nowrap",
});

const initialConfig: SymptomCheckerConfig = {
  url: "",
};

const SymptomChecker = () => {
  const { translation } = useTranslation();

  const [config, setConfig] = useState(initialConfig);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleClickReload = () => {
    if (refContentIframe.current) {
      refContentIframe.current.src = config.url;
    }
  };

  const fetchConfigData = async () => {
    setIsLoading(true);
    const remoteConfig = await getDashboardMenuConfig();
    setConfig(remoteConfig.symptomChecker);
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
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <DashboardPage>
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
                <ReloadButton
                  variant="outlined"
                  color="secondary"
                  startIcon={<IconReload />}
                  onClick={handleClickReload}
                >
                  {translation("Common.symptomChecker.button.reload")}
                </ReloadButton>
              </DeviceFrameSection>
            </DeviceWrapper>
          </Content>
        </DashboardPage>
      )}
    </>
  );
};

export default SymptomChecker;
