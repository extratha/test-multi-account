"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getPublicConsent } from "@/api/apiUnauthorize";
import ConsentContent from "@/components/ConsentContent";
import { Page } from "@/components/Page";
import { CONSENT_PATH_TYPE, NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";
import { ConsentResult } from "@/types/model.api";
import { Container, Divider, Paper, Stack, styled, Typography } from "@mui/material";

export interface PublicConsentTypeParams {
  [key: string]: string | string[];
  consentType: string;
}

const Backdrop = styled(Stack)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.blueGrey[50],
  zIndex: -1,
}));

const Wrapper = styled(Container)({
  maxWidth: "1024px",
  margin: "0px auto",
  padding: "24px 16px",
});

const Content = styled(Paper)({
  padding: "36px 40px",
  borderRadius: "16px",
  boxShadow: "none",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const PublicConsentType = () => {
  const { consentType } = useParams<PublicConsentTypeParams>();
  const router = useRouter();
  const { translation } = useTranslation();
  const { setPageLoading } = usePageLoadingStore();
  const [consent, setConsent] = useState<ConsentResult>();

  const title = useMemo(() => {
    return consentType == CONSENT_PATH_TYPE.TERMS_AND_CONDITIONS
      ? translation("Common.pages.termsAndConditions")
      : translation("Common.pages.privacyPolicy");
  }, []);

  const fetchConsent = async () => {
    try {
      setPageLoading(true);
      const response = await getPublicConsent(consentType);

      setConsent(response.data);
      setPageLoading(false);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 404) {
        router.replace(NAVIGATION.NOT_FOUND);
      } else {
        setPageLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchConsent();
  }, []);

  return (
    <>
      {consent && (
        <Page title={title}>
          <Backdrop />
          <Wrapper>
            <Content data-testid="public-consent-type-content">
              <Typography variant="titleLargeBold" data-testid="public-consent-type-title">
                {title}
              </Typography>
              <TitleDivider />
              <ConsentContent name="public-consent-type" data={consent.consent} />
            </Content>
          </Wrapper>
        </Page>
      )}
    </>
  );
};

export default PublicConsentType;
