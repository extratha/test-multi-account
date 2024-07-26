"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Stack, Typography, styled } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getConsent, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
import ConsentPage from "@/components/Page/ConsentPage";
import PageNotFound from "@/components/Page/PageNotFound";
import { CONSENT_TYPE, NAVIGATION, SUBMIT_CONSENT_TYPE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { ConsentResult } from "@/types/model.api";
import ConsentHeader from "./ConsentHeader";
import useSubmitConsentSchema from "./ConsentTypeSchema";

interface ConsentFormValues {
  agreement: boolean;
}

export interface ConsentTypeParams {
  [key: string]: string | string[];
  consentType: string;
}

const PageContainer = styled(ConsentPage)({
  paddingTop: "72px",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const Form = styled("form")({
  marginTop: "24px",
});

const Checkbox = styled(FormCheckbox)(({ theme }) => ({
  "& > .MuiCheckbox-root": {
    color: theme.palette.blueGrey[100],
  },
  "& > .Mui-checked": {
    color: theme.palette.primary.main,
  },
  "& > .MuiTypography-root": {
    fontWeight: 500,
    color: theme.palette.blueGrey[400],
  },
}));

const ButtonGroup = styled(Stack)({
  alignItems: "center",
  margin: "16px 0px",
});

const SubmitButton = styled(Button)({
  height: "44px",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "8px",
  fontSize: "14px",
});

const initialFormValue: ConsentFormValues = {
  agreement: false,
};

const ConsentType = () => {
  const { translation } = useTranslation();
  const { consentType } = useParams<ConsentTypeParams>();
  const router = useRouter();

  const [consent, setConsent] = useState<ConsentResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const validateSchema = useSubmitConsentSchema();

  const methods = useForm<ConsentFormValues>({
    resolver: yupResolver(validateSchema),
    defaultValues: initialFormValue,
    mode: "onChange",
  });

  const agreement = methods.watch("agreement");

  const title = useMemo(() => {
    switch (consentType) {
      case CONSENT_TYPE.TERMS_CONDITIONS:
        return translation("Common.pages.termsAndConditions");
      case CONSENT_TYPE.PRIVACY_POLICIES:
        return translation("Common.pages.privacyPolicy");
      default:
        return "";
    }
  }, []);

  const fetchConsent = async () => {
    try {
      setIsLoading(true);
      const response = await getConsent(consentType);

      if (response.data.isConsent) {
        if (consentType === CONSENT_TYPE.TERMS_CONDITIONS) {
          router.replace(NAVIGATION.CONSENT_PRIVACY_POLICIES);
        } else {
          router.replace(NAVIGATION.HOME);
        }
      } else {
        setConsent(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      const statusCode = error?.response?.status;

      setIsNotFound(statusCode === 404);
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await submitConsent(SUBMIT_CONSENT_TYPE[consentType], consent?.version || "");
      router.replace(NAVIGATION.HOME);
    } catch (error) {
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
        <PageContainer>
          <ConsentHeader title={title} />
          <Typography variant="titleLargeBold">{title}</Typography>
          <TitleDivider />
          <ConsentContent name="consent-type" data={consent.consent} />
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Checkbox name="agreement" label={translation("Common.field.agreement")} />
              <ButtonGroup>
                <SubmitButton type="submit" variant="contained" disabled={!agreement} data-testid="submit-button">
                  {translation("Common.button.next")}
                </SubmitButton>
              </ButtonGroup>
            </Form>
          </FormProvider>
        </PageContainer>
      )}
    </Page>
  );
};

export default ConsentType;
