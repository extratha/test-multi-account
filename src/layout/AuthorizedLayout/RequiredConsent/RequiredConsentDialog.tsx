"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  AppBar,
  Button,
  Divider,
  Backdrop as MuiBackdrop,
  Container as MuiContainer,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { CONSENT_TYPE, ERROR_CODE, SUBMIT_CONSENT_TYPE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { RequiredConsentData } from "@/types/model.ui";
import useRequiredConsentSchema from "./RequiredConsentSchema";

interface RequiredConsentsProps {
  consent: RequiredConsentData;
  onSubmitted?: () => void;
}

interface ConsentFormValues {
  agreement: boolean;
}

const Backdrop = styled(MuiBackdrop)({
  alignItems: "unset",
  overflowY: "auto",
});

const HeaderBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.hight,
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 4px 6px -1px ${alpha(theme.palette.common.black, 0.1)}`,
  "& > .MuiToolbar-root": {
    justifyContent: "center",
  },
}));

const Container = styled(MuiContainer)({
  margin: "auto 0",
  padding: "72px 0px 32px",
  "& > .MuiPaper-root": {
    padding: "40px",
    borderRadius: "16px",
  },
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
  agreement: true,
};

// TODO: unit test
const RequiredConsentDialog = ({ consent, onSubmitted }: RequiredConsentsProps) => {
  const { translation } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const schema = useRequiredConsentSchema();

  const methods = useForm<ConsentFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialFormValue,
    mode: "onChange",
  });

  const isDisabled = methods.formState.isDirty && !methods.formState.isValid;

  const getTitle = (type: string) => {
    switch (type) {
      case CONSENT_TYPE.TERMS_CONDITIONS:
        return translation("Common.pages.termsAndConditions");
      case CONSENT_TYPE.PRIVACY_POLICIES:
        return translation("Common.pages.privacyPolicy");
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await submitConsent(SUBMIT_CONSENT_TYPE[consent.type], consent.data.version || "");

      setIsLoading(false);
      if (onSubmitted) onSubmitted();
    } catch (error) {
      const errorCode = error?.response?.data?.code || "";
      setIsLoading(false);

      if (errorCode === ERROR_CODE.CONFLICT) {
        if (onSubmitted) onSubmitted();
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Backdrop open>
          <HeaderBar>
            <Toolbar variant="dense">
              <Typography variant="bodyBold" textAlign="center">
                {translation("dashboard.requiredConsentDialog.titleBar")}
              </Typography>
            </Toolbar>
          </HeaderBar>
          <Container>
            <Paper elevation={0}>
              <Typography variant="titleLargeBold">{getTitle(consent.type)}</Typography>
              <TitleDivider />
              <ConsentContent name="consent-type" data={consent.data.consent} />
              <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <Checkbox name="agreement" label={translation("Common.field.agreement")} />
                  <ButtonGroup>
                    <SubmitButton type="submit" variant="contained" disabled={isDisabled} data-testid="submit-button">
                      {translation("Common.button.next")}
                    </SubmitButton>
                  </ButtonGroup>
                </Form>
              </FormProvider>
            </Paper>
          </Container>
        </Backdrop>
      )}
    </>
  );
};

export default RequiredConsentDialog;
