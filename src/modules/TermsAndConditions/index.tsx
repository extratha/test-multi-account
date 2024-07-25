"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Divider, Paper, Stack, Typography, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { getTermsAndConditions, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import ConsentHeader from "@/components/ConsentHeader";
import FormCheckbox from "@/components/Form/FormCheckbox";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { CONSENT_TYPE, NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { ConsentResult } from "@/types/model.api";

interface TermsAndConsFormValues {
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
});

const initialFormValue: TermsAndConsFormValues = {
  agreement: false,
};

const TermsAndConsModules = () => {
  const { translation } = useTranslation();
  const router = useRouter();

  const [consent, setConsent] = useState<ConsentResult>();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const response = await getTermsAndConditions();

      if (response.data.isConsent) {
        router.replace(NAVIGATION.PRIVACY_POLICY);
      } else {
        setConsent(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      //TODO : handle error
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await submitConsent(CONSENT_TYPE.TERMS_AND_CONDITIONS, consent?.version || "");
      router.replace(NAVIGATION.PRIVACY_POLICY);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  return (
    <>
      {isLoading && <FullScreenLoading />}
      {consent && (
        <>
          <ConsentHeader title={translation("Common.title.termsAndConditions")} />
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

export default TermsAndConsModules;
