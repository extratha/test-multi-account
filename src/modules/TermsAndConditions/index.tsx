"use client";

import { Button, Container, Divider, Paper, Stack, Typography, alpha, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { getTermsAndConditions, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { CONSENT_TYPE } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { usePageLoadingStore } from "@/store";
import { ConsentResult } from "@/types/model.api";
import useTranslation from "@/locales/useLocale";

interface TermsAndConsFormValues {
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

const initialFormValue: TermsAndConsFormValues = {
  agreement: false,
};

const TermsAndConsModules = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const { setPageLoading } = usePageLoadingStore();

  const [consent, setConsent] = useState<ConsentResult>();

  const validateSchema = yup.object().shape({
    agreement: yup.boolean().defined(),
  });

  const methods = useForm<TermsAndConsFormValues>({
    resolver: yupResolver(validateSchema),
    defaultValues: initialFormValue,
    mode: "onChange",
  });

  const agreement = methods.watch("agreement");

  const fetchTermsAndConditions = async () => {
    try {
      setPageLoading(true);
      const response = await getTermsAndConditions();

      if (response.data.isConsent) {
        router.replace(webPaths.privacyPolicy);
      } else {
        setConsent(response.data);
        setPageLoading(false);
      }
    } catch (error) {
      //TODO : handle error
    }
  };

  const onSubmit = async () => {
    try {
      setPageLoading(true);
      await submitConsent(CONSENT_TYPE.TERMS_AND_CONDITIONS, consent?.version || "");
      router.push(webPaths.privacyPolicy);
    } catch (error) {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  return (
    <>
      {consent && (
        <>
          <HeaderBar>
            <Typography variant="titleMediumSemiBold" textAlign="center">
              {translation("Common.title.termsAndConditions")}
            </Typography>
          </HeaderBar>
          <Wrapper>
            <Content data-testid="terms-and-conditions-consent">
              <Typography variant="titleLargeSemiBold">{translation("Common.pages.termsAndConditions")}</Typography>
              <TitleDivider />
              <ConsentContent name="term-and-conditions" data={consent.consent} />
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

export default TermsAndConsModules;
