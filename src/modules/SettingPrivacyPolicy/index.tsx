"use client";

import { Box, Divider, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { getPrivacyPolicyLatest } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import DashboardPage from "@/components/Page/DashboardPage";
import useTranslation from "@/locales/useLocale";
import { ConsentResultLatest } from "@/types/model.api";

const Content = styled(Box)({
  padding: "36px 40px",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const SettingPrivacyPolicy = () => {
  const { translation } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const [consent, setConsent] = useState<ConsentResultLatest>();

  const fetchPrivacyPolicy = async () => {
    try {
      setIsLoading(true);
      const { data } = await getPrivacyPolicyLatest();
      setConsent(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //TODO : handle error
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <DashboardPage>
          {consent && (
            <Content data-testid="privacy-policy-consent">
              <Typography variant="titleLargeBold">{translation("Common.settingPrivacyPolicy.title")}</Typography>
              <TitleDivider />
              <ConsentContent name="privacy-policy" data={consent.consent} />
            </Content>
          )}
        </DashboardPage>
      )}
    </>
  );
};

export default SettingPrivacyPolicy;
