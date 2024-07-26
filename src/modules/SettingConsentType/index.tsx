"use client";

import { Box, Divider, Typography, styled } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getConsentLatest } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
import DashboardPage from "@/components/Page/DashboardPage";
import { CONSENT_TYPE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { ConsentResultLatest } from "@/types/model.api";

export interface SettingConsentTypeParams {
  [key: string]: string | string[];
  consentType: string;
}

const Content = styled(Box)({
  padding: "36px 40px",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const SettingConsentType = () => {
  const { translation } = useTranslation();
  const { consentType } = useParams<SettingConsentTypeParams>();

  const [consent, setConsent] = useState<ConsentResultLatest>();
  const [isLoading, setIsLoading] = useState(true);

  const title = useMemo(() => {
    switch (consentType) {
      case CONSENT_TYPE.TERMS_CONDITIONS:
        return translation("Common.settingTermsAndConditions.title");
      case CONSENT_TYPE.PRIVACY_POLICIES:
        return translation("Common.settingPrivacyPolicy.title");
      default:
        return "";
    }
  }, [consentType]);

  const fetchConsent = async () => {
    try {
      setIsLoading(true);
      const { data } = await getConsentLatest(consentType);

      setConsent(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsent();
  }, []);

  return (
    <Page title={title}>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <DashboardPage>
          {consent && (
            <Content>
              <Typography variant="titleLargeBold">{title}</Typography>
              <TitleDivider />
              <ConsentContent name="term-and-conditions" data={consent.consent} />
            </Content>
          )}
        </DashboardPage>
      )}
    </Page>
  );
};

export default SettingConsentType;
