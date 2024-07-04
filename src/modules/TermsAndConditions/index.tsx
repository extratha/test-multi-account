"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Divider, Paper, Stack, Typography, alpha, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { getTermsAndConditions, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { CONSENT_TYPE } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { usePageLoadingStore } from "@/store";
import { ConsentResult } from "@/types/model.api";

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

const SubmitButton = styled(Button)(({ theme, disabled }) => [
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
  },
  disabled && {
    backgroundColor: theme.palette.grey[200],
  },
]);

const initialFormValue: TermsAndConsFormValues = {
  agreement: false,
};

const TermsAndConsModules = () => {
  const t = useTranslations("Common");
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
      const response = await getTermsAndConditions();
      setConsent(response.data);
    } catch (error) {
      //TODO : handle error
    }
  };

  const onSubmit = async () => {
    try {
      setPageLoading(true);
      await submitConsent(CONSENT_TYPE.TERMS_AND_CONDITIONS, consent?.version || "");
      router.push(webPaths.home);
    } catch (error) {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  return (
    <>
      <HeaderBar>
        <Typography variant="titleMediumSemiBold" textAlign="center">
          {t("title.termsAndConditions")}
        </Typography>
      </HeaderBar>
      <Wrapper>
        {consent && (
          <Content data-testid="terms-and-conditions-consent">
            <Typography variant="titleLargeSemiBold">{t("pages.termsAndConditions")}</Typography>
            <TitleDivider />
            <ConsentContent name="term-and-conditions" data={consent.consent} />
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormCheckbox name="agreement" label={t("field.agreement")} />
                <ButtonGroup>
                  <SubmitButton type="submit" variant="contained" disabled={!agreement} data-testid="submit-button">
                    <Typography variant="labelExtraLargeSemiBold">{t("button.next")}</Typography>
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </FormProvider>
          </Content>
        )}
      </Wrapper>
    </>
  );
};

export default TermsAndConsModules;
