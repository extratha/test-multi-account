"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Divider, Paper, Stack, Typography, alpha, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getPrivacyPolicy, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { CONSENT_TYPE } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { usePageLoadingStore } from "@/store";
import { ConsentResult } from "@/types/model.api";
import usePrivacyPolicySchema from "./PrivacyPolicySchema";
import useTranslation from "@/locales/useLocale";

interface PrivacyPolicyFormValues {
  agreement: boolean;
}

const HeaderBar = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  padding: "12px 24px",
  borderRadius: "0px",
  boxShadow: `0px 4px 6px -1px ${alpha(theme.palette.common.black, 0.1)}`,
  overflow: "hidden",
}));

const Wrapper = styled(Container)({
  maxWidth: "1024px",
  margin: "72px 0 31px",
});

const Content = styled(Paper)({
  padding: "36px 40px",
  borderRadius: "16px",
  boxShadow: "none",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const Form = styled("form")({
  marginTop: "24px",
});

const ButtonGroup = styled(Stack)({
  alignItems: "center",
  margin: "16px 0px",
});

const SubmitButton = styled(Button)(({ theme }) => [
  {
    height: "44px",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      opacity: 0.9,
    },
    "&:disabled": {
      backgroundColor: NEUTRAL[97],
      color: CUSTOM_COLORS.buttonTextDisabled,
    },
  },
]);

const initialFormValue: PrivacyPolicyFormValues = {
  agreement: false,
};

const PrivacyPolicyModule = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const { setPageLoading } = usePageLoadingStore();

  const [consent, setConsent] = useState<ConsentResult>();

  const validateSchema = usePrivacyPolicySchema();

  const methods = useForm<PrivacyPolicyFormValues>({
    resolver: yupResolver(validateSchema),
    defaultValues: initialFormValue,
    mode: "onChange",
  });

  const agreement = methods.watch("agreement");

  const fetchPrivacyPolicy = async () => {
    try {
      setPageLoading(true);
      const response = await getPrivacyPolicy();
      if (response.data.isConsent) {
        router.replace(webPaths.home);
      } else {
        setConsent(response.data);
        setPageLoading(false);
      }
    } catch (error) {
      setPageLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setPageLoading(true);
      await submitConsent(CONSENT_TYPE.PRIVACY_AND_POLICY, consent?.version || "");
      router.push(webPaths.home);
    } catch (error) {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      {consent && (
        <>
          <HeaderBar>
            <Typography variant="titleMediumSemiBold" textAlign="center">
              {translation("Common.title.privacyPolicy")}
            </Typography>
          </HeaderBar>
          <Wrapper>
            <Content data-testid="privacy-policy-consent">
              <Typography variant="titleLargeSemiBold">{translation("Common.pages.privacyPolicy")}</Typography>
              <TitleDivider />
              <ConsentContent name="privacy-policy" data={consent.consent} />
              <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                  <FormCheckbox name="agreement" label={translation("Common.field.agreement")} />
                  <ButtonGroup>
                    <SubmitButton type="submit" variant="contained" disabled={!agreement} data-testid="submit-button">
                      <Typography variant="labelExtraLargeSemiBold">{translation("Common.button.next")}</Typography>
                    </SubmitButton>
                  </ButtonGroup>
                </Form>
              </FormProvider>
            </Content>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default PrivacyPolicyModule;
