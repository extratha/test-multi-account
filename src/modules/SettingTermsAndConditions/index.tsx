"use client";

import { Box, Divider, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { getTermsAndConditionsLatest } from "@/api/api";
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

const SettingTermsAndConditions = () => {
  const { translation } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const [consent, setConsent] = useState<ConsentResultLatest>();

  const fetchTermsAndConditions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTermsAndConditionsLatest();
      setConsent(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //TODO : handle error
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <DashboardPage>
          {consent && (
            <Content>
              <Typography variant="titleLargeBold">{translation("Common.settingTermsAndConditions.title")}</Typography>
              <TitleDivider />
              <ConsentContent name="term-and-conditions" data={consent.consent} />
            </Content>
          )}
        </DashboardPage>
      )}
    </>
  );
};

export default SettingTermsAndConditions;
