"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { AppBar, Button, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getConsent, submitConsent } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import FormCheckbox from "@/components/Form/FormCheckbox";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ConsentPage from "@/components/Page/ConsentPage";
import { CONSENT_TYPE, ERROR_CODE, NAVIGATION, SEARCH_PARAMS, SUBMIT_CONSENT_TYPE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { ConsentResult } from "@/types/model.api";
import useConsentTypeSchema from "./RequiredConsentSchema";

export interface ConsentTypeParams {
  type: string;
  [key: string]: string | string[];
}

interface RequiredConsentFormValues {
  agreement: boolean;
}

const PageContainer = styled(ConsentPage)({
  padding: "72px 0px 32px",
});

const HeaderBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.hight,
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 4px 6px -1px ${alpha(theme.palette.common.black, 0.1)}`,
  "& > .MuiToolbar-root": {
    justifyContent: "center",
  },
}));

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

const initialFormValue: RequiredConsentFormValues = {
  agreement: false,
};

// TODO: unit test
const ConsentType = () => {
  const router = useRouter();
  const params = useParams<ConsentTypeParams>();
  const searchParams = useSearchParams();

  const { translation } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [requiredConsent, setRequiredConsent] = useState<ConsentResult>();

  const schema = useConsentTypeSchema();

  const methods = useForm<RequiredConsentFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialFormValue,
    mode: "onChange",
  });

  const isDisabled = !methods.formState.isValid;

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

  const redirectNextPage = () => {
    if (params.type === CONSENT_TYPE.TERMS_CONDITIONS) {
      router.replace(`${NAVIGATION.CONSENT_PRIVACY_POLICIES}?${searchParams.toString()}`);
    } else {
      router.replace(searchParams.get(SEARCH_PARAMS.REDIRECT) || NAVIGATION.HOME);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getConsent(params.type);

      if (data.isConsent) {
        redirectNextPage();
      } else {
        setRequiredConsent(data);
        setIsLoading(false);
      }
    } catch (error) {
      // TODO: error
    }
  };

  const handleSubmit = async () => {
    try {
      if (!requiredConsent) return;

      setIsLoading(true);
      await submitConsent(SUBMIT_CONSENT_TYPE[params.type], requiredConsent.version || "");
      redirectNextPage();
    } catch (error) {
      const errorCode = error?.response?.data?.code || "";

      if (errorCode === ERROR_CODE.CONFLICT) {
        redirectNextPage();
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <>
      {isLoading && <FullScreenLoading />}
      {requiredConsent && (
        <PageContainer>
          <HeaderBar>
            <Toolbar variant="dense">
              <Typography variant="bodyBold" textAlign="center" data-testid="consent-required-dialog-title-bar">
                {translation("dashboard.requiredConsentDialog.titleBar")}
              </Typography>
            </Toolbar>
          </HeaderBar>
          <Typography variant="titleLargeBold" data-testid="consent-required-dialog-title">
            {getTitle(params.type)}
          </Typography>
          <TitleDivider />
          <ConsentContent name="consent-type" data={requiredConsent.consent} />
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
        </PageContainer>
      )}
    </>
  );
};

export default ConsentType;
