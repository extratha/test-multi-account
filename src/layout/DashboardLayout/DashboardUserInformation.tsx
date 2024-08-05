import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { IconCreditCoin, IconSparkle, PlaygroundLogoOverlay } from "@/assets";
import { useUserProfileStore } from "@/store";
import { getVersion } from "@/utils/common";
import useTranslation from "@/locales/useLocale";

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
          {"Admin Officer"}
        </Typography>
        <Typography variant="labelExtraSmall">{data.email}</Typography>
        <Box flex="1" />
        <Typography variant="labelExtraSmallMedium">{"เครดิตของฉัน"}</Typography>
        <Stack direction="row" alignItems="center" spacing="4px" color="emberShade.300">
          <IconCreditCoin />
          <Typography variant="bodyBold" color="amber.300">
            {"ใช้ได้ไม่จำกัด"}
          </Typography>
        </Stack>
      </Content>
    </Wrapper>
  );
};

export default DashboardUserInformation;
