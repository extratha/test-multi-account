"use client";
import { Grid, Card as MuiCard, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IconAiInterpret } from "@/assets";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import DashboardPage from "@/components/Page/DashboardPage";
import PageTitle from "@/components/Typography/PageTitle";
import useTranslation from "@/locales/useLocale";
import { HomeMenuItemConfig } from "@/types/model.ui";
import { getDashboardMenuConfig } from "@/utils/firebase";

const Card = styled(MuiCard)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "16px",
  boxShadow: "none",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.background.border}`,
}));

const HomePageModule = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const [config, setConfig] = useState<HomeMenuItemConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({ firstName: "", lastName: "" });

  const handleClickMenuItem = (item: HomeMenuItemConfig) => {
    router.replace(item.path);
  };

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const configData = await getDashboardMenuConfig();

      setConfig(configData.home);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUserProfile = () => {
    const data = localStorage.getItem("userProfile");
    if (data) {
      const rawUserProfile = JSON.parse(data);
      setUserProfile({ ...userProfile, ...rawUserProfile.state.data });
    }
  };

  useEffect(() => {
    fetchConfig();
    getUserProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <DashboardPage>
          <Stack spacing="16px" alignItems="flex-start" padding="40px">
            <PageTitle>{`${translation("Common.title.hello")} ${userProfile.firstName}`}</PageTitle>
            <Typography variant="headerExtraLargeBold">{translation("Common.title.pleaseSelectMenu")} </Typography>
          </Stack>
          <Grid container padding="0px 40px" spacing="24px">
            {config.map((item, index) => (
              <Grid key={index} item width="264px">
                <Card onClick={() => handleClickMenuItem(item)}>
                  <IconAiInterpret />
                  <Typography variant="bodyBold" marginTop="16px">
                    {item.title}
                  </Typography>
                  <Typography variant="bodySmall" color="text.medium" marginTop="4px">
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DashboardPage>
      )}
    </>
  );
};
export default HomePageModule;
