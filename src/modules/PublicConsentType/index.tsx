"use client";

import { Divider, styled, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getPublicConsent } from "@/api/apiUnauthorize";
import ConsentContent from "@/components/ConsentContent";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
import ConsentPage from "@/components/Page/ConsentPage";
import PageNotFound from "@/components/Page/PageNotFound";
import { CONSENT_TYPE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { ConsentResult } from "@/types/model.api";

export interface PublicConsentTypeParams {
  [key: string]: string | string[];
  consentType: string;
}

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const PublicConsentType = () => {
  const { consentType } = useParams<PublicConsentTypeParams>();
  const { translation } = useTranslation();

  const [consent, setConsent] = useState<ConsentResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const title = useMemo(() => {
    switch (consentType) {
      case CONSENT_TYPE.TERMS_CONDITIONS:
        return translation("Common.pages.termsAndConditions");
      case CONSENT_TYPE.PRIVACY_POLICIES:
        return translation("Common.pages.privacyPolicy");
      default:
        return "";
    }
  }, [consentType]);

  const fetchConsent = async () => {
    try {
      setIsLoading(true);
      const response = await getPublicConsent(consentType);

      setConsent(response.data);
      setIsLoading(false);
    } catch (error) {
      const statusCode = error?.response?.status;
      setIsNotFound(statusCode === 404);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsent();
  }, []);

  return (
    <Page title={title}>
      {isLoading && <FullScreenLoading />}
      {isNotFound && <PageNotFound />}
      {consent && (
        <ConsentPage>
          <Typography variant="titleLargeBold" data-testid="public-consent-type-title">
            {title}
          </Typography>
          <TitleDivider />
          <ConsentContent name="public-consent-type" data={consent.consent} />
        </ConsentPage>
      )}
    </Page>
  );
};

export default PublicConsentType;
