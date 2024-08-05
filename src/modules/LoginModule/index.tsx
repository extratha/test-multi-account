import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { submitLogin } from "@/api/apiUnauthorize";
import { SubmitButtonStyle } from "@/components/Button/styled";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { NAVIGATION, SESSION } from "@/constant";
import useFieldValidation from "@/hooks/useFieldValidation";
import useTranslation from "@/locales/useLocale";
import { useUserProfileStore } from "@/store";
import { getVersion } from "@/utils/common";
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

const ForgetPassword = styled(Typography)({
  paddingTop: "32px",
  textDecoration: "underline",
  textAlign: "center",
  cursor: "pointer",
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
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
});

const LoginModule = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const { resetUserProfile, setUserProfile } = useUserProfileStore();
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { control, setError, handleSubmit } = useForm<LoginFormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsDisableSubmit(true);
    } else {
      setIsDisableSubmit(false);
    }
  }, [emailValue, passwordValue]);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // TODO: unit after login
  const onSubmit: SubmitHandler<LoginFormValues> = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      resetUserProfile();

      const response = await submitLogin({ email: emailValue || "", password: passwordValue || "" });
      const { accessToken, refreshToken, user, userProfile } = response.data;

      localStorage.setItem(SESSION.ACCESS_TOKEN, accessToken);
      localStorage.setItem(SESSION.REFRESH_TOKEN, refreshToken);

      setUserProfile(userProfile);

      if (user.passwordChanged) {
        router.replace(NAVIGATION.CONSENT_TERMS_CONDITIONS);
      } else {
        router.replace(NAVIGATION.SET_NEW_PASSWORD);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || translation("login.text.error.invalidEmailOrPassword"));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <FullScreenLoading />}
      <Stack flex="1">
        <Stack flex="1" alignItems="center">
          <Container>
            <Stack spacing="8px" marginBottom="32px">
              <Typography variant="titleBold" color="text.medium">
                {translation("login.text.login")}
              </Typography>
              <Typography variant="headerBold">{translation("login.text.carivaPlayground")}</Typography>
              <Typography variant="labelExtraSmall" color="text.disabled">
                {translation("login.text.version", { version: getVersion() })}
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name={EMAIL_FIELD_NAME}
                control={control}
                render={({ fieldState: { error } }) => (
                  <Stack direction="column" spacing={2} mt={1}>
                    <CustomTextField
                      fullWidth
                      data-testid="email-input"
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
                      data-testid="email-error"
                      variant="labelExtraSmallMedium"
                      textAlign="left"
                      color="error"
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
                      data-testid="password-input"
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
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Typography
                      data-testid="password-error"
                      variant="labelExtraSmallMedium"
                      textAlign="left"
                      color="error"
                    >
                      {error?.message || ""}
                    </Typography>
                  </Stack>
                )}
              />
              <Typography variant="labelExtraSmallMedium" textAlign="left" color="error">
                {errorMessage || ""}
              </Typography>

              <SubmitButtonStyle type="submit" data-testid="button-login" disabled={isDisableSubmit}>
                {translation("login.button.login")}
              </SubmitButtonStyle>
            </form>
            <ForgetPassword
              variant="bodySmallMedium"
              textTransform={"none"}
              color="text.primary"
              onClick={() => router.push(NAVIGATION.FORGET_PASSWORD)}
            >
              {translation("login.button.forgetPassword")}
            </ForgetPassword>
          </Container>
        </Stack>
        <ConsentFooter direction="row" spacing="8px">
          <Link href={NAVIGATION.PUBLIC_TERMS_AND_CONDITIONS} target="_blank">
            <Typography variant="labelExtraSmallMedium" data-testid="button-term-and-conditions">
              {translation("login.button.termsAndConditions")}
            </Typography>
          </Link>
          <Link href={NAVIGATION.PUBLIC_PRIVACY_POLICY} target="_blank">
            <Typography variant="labelExtraSmallMedium" data-testid="button-privacy-policy">
              {translation("login.button.privacyPolicy")}
            </Typography>
          </Link>
        </ConsentFooter>
      </Stack>
    </>
  );
};

export default LoginModule;
