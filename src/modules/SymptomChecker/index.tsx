"use client";

import { Box, Button, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { IconAiInterpret, IconReload } from "@/assets";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
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
  flex: 1,
  padding: "16px 40px",
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
  "& > .MuiPaper-root": {
    position: "relative",
    flex: 1,
    width: "100%",
    maxWidth: "480px",
    padding: "0px",
    boxShadow: "none",
  },
});

const ContentIframe = styled("iframe")(({ theme }) => ({
  height: "100%",
  width: "100%",
  border: `4px solid ${theme.palette.background.borderLight}`,
  borderRadius: "12px",
}));

const ReloadButton = styled(Button)({
  position: "absolute",
  top: "8px",
  left: "100%",
  height: "40px",
  marginLeft: "24px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
});

const initialConfig: SymptomCheckerConfig = {
  url: "",
};

const SymptomChecker = () => {
  const { translation } = useTranslation();

  const [config, setConfig] = useState(initialConfig);
  const [isLoading, setIsLoading] = useState(true);

  const refContentIframe = useRef<HTMLIFrameElement>(null);

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

  return (
    <Page title={translation("Common.symptomChecker.title")}>
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
          <Content>
            <Paper>
              <ContentIframe ref={refContentIframe} src={config.url} />
              <ReloadButton variant="outlined" color="secondary" startIcon={<IconReload />} onClick={handleClickReload}>
                {translation("Common.symptomChecker.button.reload")}
              </ReloadButton>
            </Paper>
          </Content>
        </DashboardPage>
      )}
    </Page>
  );
};

export default SymptomChecker;
