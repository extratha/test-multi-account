import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Stack, styled, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { submitLogin } from "@/api/apiUnauthorize";
import { SubmitButtonStyle } from "@/components/Button/styled";
import { NAVIGATION, SESSION } from "@/constant";
import useFieldValidation from "@/hooks/useFieldValidation";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore, useUserProfileStore } from "@/store";
import { validateEmail, validatePassword } from "@/utils/validation";
import { CustomTextField } from "./styled";

export interface LoginFormValues {
  email: string | null;
  password: string | null;
}

const Container = styled(Stack)({
  width: "100%",
  maxWidth: "66%",
  margin: "auto 0px",
  padding: "16px",
});

const ConsentFooter = styled(Stack)({
  justifyContent: "center",
  padding: "16px 0px 32px",
  "& .MuiTypography-root": {
    cursor: "pointer",
    minWidth: "160px",
    padding: "8px 16px",
    textAlign: "center",
  },
});

const LoginForm = () => {
  const theme = useTheme();
  const { setUserProfile } = useUserProfileStore();
  const [isDisableSubmit, setIsDisabledSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { setPageLoading } = usePageLoadingStore();
  const router = useRouter();
  const { control, setError, handleSubmit } = useForm<LoginFormValues>();
  const { translation } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");

  const EMAIL_FIELD_NAME = "email";
  const PASSWORD_FIELD_NAME = "password";
  const {
    isValid: isEmailValid,
    value: emailValue,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    isDirty: isEmailDirty,
    ref: emailRef,
  } = useFieldValidation(control, EMAIL_FIELD_NAME, validateEmail, setError);

  const {
    isValid: isPasswordValid,
    value: passwordValue,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    isDirty: isPasswordDirty,
    ref: passwordRef,
  } = useFieldValidation(control, PASSWORD_FIELD_NAME, validatePassword, setError);

  useEffect(() => {
    if (!isEmailDirty || !isPasswordDirty) return;
    if (!(isEmailValid && isPasswordValid)) {
      setIsDisabledSubmit(true);
    } else {
      setIsDisabledSubmit(false);
    }
  }, [emailValue, passwordValue]);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // TODO: unit after login
  const onSubmit: SubmitHandler<LoginFormValues> = async () => {
    try {
      setPageLoading(true);
      setErrorMessage("");

      const response = await submitLogin({ email: emailValue || "", password: passwordValue || "" });
      const { accessToken, refreshToken, user, userProfile } = response.data;

      localStorage.setItem(SESSION.ACCESS_TOKEN, accessToken);
      localStorage.setItem(SESSION.REFRESH_TOKEN, refreshToken);

      setUserProfile(userProfile);

      if (user.passwordChanged) {
        router.replace(NAVIGATION.TERMS_AND_CONDITIONS);
      } else {
        router.replace(NAVIGATION.SET_NEW_PASSWORD);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || translation("login.text.error.invalidEmailOrPassword"));
      setPageLoading(false);
    }
  };

  const onClickTermsAndPrivacy = (isTermsAndCon: boolean) => {
    isTermsAndCon
      ? router.replace(NAVIGATION.PUBLIC_TERMS_AND_CONDITIONS)
      : router.replace(NAVIGATION.PUBLIC_PRIVACY_POLICY);
  };

  return (
    <Stack flex="1">
      <Stack flex="1" alignItems="center">
        <Container>
          <Stack spacing="8px" marginBottom="32px">
            <Typography variant="titleBold" color="text.medium">
              {translation("login.text.login")}
            </Typography>
            <Typography variant="headerBold">{translation("login.text.carivaPlayground")}</Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={EMAIL_FIELD_NAME}
              control={control}
              render={({ fieldState: { error } }) => (
                <Stack direction="column" spacing={2} mt={1}>
                  <CustomTextField
                    fullWidth
                    data-testid={EMAIL_FIELD_NAME}
                    id={EMAIL_FIELD_NAME}
                    placeholder={!emailValue ? translation("login.text.placeholder.email") : ""}
                    name={EMAIL_FIELD_NAME}
                    value={emailValue ?? ""}
                    onChange={onEmailChange}
                    onBlur={onEmailBlur}
                    inputRef={emailRef}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Typography
                    data-testid="error"
                    variant="labelExtraSmallMedium"
                    sx={{
                      textAlign: "left",
                      color: theme.palette.error.main,
                    }}
                  >
                    {error?.message || ""}
                  </Typography>
                </Stack>
              )}
            />
            <Controller
              name={PASSWORD_FIELD_NAME}
              control={control}
              render={({ fieldState: { error } }) => (
                <Stack direction="column" spacing={2} mt={1}>
                  <CustomTextField
                    fullWidth
                    name={PASSWORD_FIELD_NAME}
                    type={showPassword ? "text" : "password"}
                    data-testid={PASSWORD_FIELD_NAME}
                    id={PASSWORD_FIELD_NAME}
                    placeholder={!passwordValue ? translation("login.text.placeholder.forgetPassword") : ""}
                    value={passwordValue ?? ""}
                    onChange={onPasswordChange}
                    onBlur={onPasswordBlur}
                    inputRef={passwordRef}
                    inputProps={{
                      autoComplete: "password",
                    }}
                    InputProps={{
                      endAdornment: (
                        <a>
                          <IconButton
                            data-testid="button-toggle-show-password"
                            aria-label="Toggle show password"
                            onClick={handleToggleShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon aria-label="Showing password" />
                            ) : (
                              <VisibilityOffIcon aria-label="Hiding password" />
                            )}
                          </IconButton>
                        </a>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography
                    data-testid="error"
                    variant="labelExtraSmallMedium"
                    sx={{
                      textAlign: "left",
                      color: theme.palette.error.main,
                    }}
                  >
                    {error?.message || ""}
                  </Typography>
                </Stack>
              )}
            />
            <Typography
              variant="labelExtraSmallMedium"
              sx={{
                textAlign: "left",
                color: theme.palette.error.main,
              }}
            >
              {errorMessage || ""}
            </Typography>

            <SubmitButtonStyle type="submit" data-testid="button-login" disabled={isDisableSubmit}>
              {translation("login.button.login")}
            </SubmitButtonStyle>
          </form>
        </Container>
      </Stack>
      <ConsentFooter direction="row" spacing="8px">
        <Typography
          variant="labelExtraSmallMedium"
          data-testid="button-term-and-conditions"
          onClick={() => onClickTermsAndPrivacy(true)}
        >
          {translation("login.button.termsAndConditions")}
        </Typography>
        <Typography
          variant="labelExtraSmallMedium"
          data-testid="button-privacy-policy"
          onClick={() => onClickTermsAndPrivacy(false)}
        >
          {translation("login.button.privacyPolicy")}
        </Typography>
      </ConsentFooter>
    </Stack>
  );
};

export default LoginForm;
