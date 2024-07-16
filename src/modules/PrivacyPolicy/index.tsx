"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Divider, Paper, Stack, Typography, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getPrivacyPolicy, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import ConsentHeader from "@/components/ConsentHeader";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { CONSENT_TYPE } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";
import { ConsentResult } from "@/types/model.api";
import usePrivacyPolicySchema from "./PrivacyPolicySchema";

interface PrivacyPolicyFormValues {
  agreement: boolean;
}

const Wrapper = styled(Container)({
  maxWidth: "1024px",
  margin: "72px auto 31px",
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
      router.replace(webPaths.home);
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
          <ConsentHeader title={translation("Common.title.privacyPolicy")} />
          <Wrapper>
            <Content data-testid="terms-and-conditions-consent">
              <Typography variant="titleLargeBold">{translation("Common.pages.termsAndConditions")}</Typography>
              <TitleDivider />
              <ConsentContent name="term-and-conditions" data={consent.consent} />
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
            </Content>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default PrivacyPolicyModule;
