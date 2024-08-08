import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import { IconCreditCoin, IconSparkle, PlaygroundLogoOverlay } from "@/assets";
import useTranslation from "@/locales/useLocale";
import { useUserProfileStore } from "@/store";
import { getVersion } from "@/utils/common";

const Wrapper = styled(Box)({
  padding: "20px",
});

const Content = styled(Stack)(({ theme }) => ({
  position: "relative",
  height: "220px",
  padding: "16px",
  borderRadius: "16px",
  background: theme.palette.background.gradient,
  overflow: "hidden",
  color: theme.palette.common.white,
}));

const LogoBackground = styled(PlaygroundLogoOverlay)({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "100px",
  height: "100px",
});

const DashboardUserInformation = () => {
  const { data } = useUserProfileStore();
  const { translation } = useTranslation();
  const [userProfile, setUserProfile] = useState({ firstName: "", lastName: "" });

  //TODO refactor with NV-344
  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) {
      const rawUserProfile = JSON.parse(data);
      setUserProfile({ ...userProfile, ...rawUserProfile.state.data });
    }
  }, []);

  return (
    <Wrapper>
      <Content>
        <LogoBackground />
        <Stack direction="row" justifyContent="space-between">
          <IconSparkle width="16px" height="16px" />
          <Typography variant="labelExtraSmallMedium" color="common.white">
            {translation("dashboard.userInformation.version", { version: getVersion() })}
          </Typography>
        </Stack>
        <Typography variant="bodySmallMedium" marginTop="32px">
          {`${userProfile.firstName} ${userProfile.lastName}`}
        </Typography>
        <Typography variant="labelExtraSmall">{data.email}</Typography>
        <Box flex="1" />
        <Typography variant="labelExtraSmallMedium">{translation("AiInterpret.text.myCredit")}</Typography>
        <Stack direction="row" alignItems="center" spacing="4px" color="emberShade.300">
          <IconCreditCoin />
          <Typography variant="bodyBold" color="amber.300">
            {translation("AiInterpret.text.unlimited")}
          </Typography>
        </Stack>
      </Content>
    </Wrapper>
  );
};

export default DashboardUserInformation;
