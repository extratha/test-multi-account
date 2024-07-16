import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Stack, styled, Typography, useTheme } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SubmitButtonStyle } from "@/components/Button/styled";
import { API } from "@/constant/api";
import { COOKIE } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import useFieldValidation from "@/hooks/useFieldValidation";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore, useUserProfileStore } from "@/store";
import axiosPublicInstance from "@/utils/axios/login";
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
    setPageLoading(true);
    setErrorMessage("");
    try {
      const response = await axiosPublicInstance.post(
        API.PATH.login,
        { email: emailValue, password: passwordValue },
        { headers: { Authorization: undefined } }
      );
      if (response.data) {
        const { accessToken, refreshToken, user, userProfile } = response.data;
        setCookie(COOKIE.ACCESS_TOKEN, accessToken || "");
        setCookie(COOKIE.REFRESH_TOKEN, refreshToken || "");
        if (user) {
          setCookie(COOKIE.PASSWORD_CHANGED, user.passwordChanged);
          setUserProfile({ ...user, ...userProfile });

          if (!user.passwordChanged) {
            router.replace(webPaths.setNewPassword);
          } else {
            router.replace(webPaths.termsAndConditions);
          }
        }
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || translation("Common.responseError.invalidEmailOrPassword"));
      setPageLoading(false);
    }
  };

  return (
    <Stack flex="1" alignItems="center">
      <Container>
        <Stack spacing="8px" marginBottom="32px">
          <Typography variant="titleBold" color="text.medium">
            {translation("Common.text.login")}
          </Typography>
          <Typography variant="headerBold">{translation("Common.title.carivaPlayground")}</Typography>
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
                  placeholder={!emailValue ? "อีเมล" : ""}
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
                  placeholder={!passwordValue ? "รหัสผ่าน" : ""}
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
            {translation("Common.text.login")}
          </SubmitButtonStyle>
        </form>
        <Typography
          variant="bodySmallMedium"
          textTransform={"none"}
          color={theme.palette.text.primary}
          sx={{
            textDecoration: "underline",
            margin: "16px auto 0",
            cursor: "pointer",
          }}
          onClick={() => router.replace(webPaths.forgetPassword)}
        >
          {translation("Common.button.forgetPassword")}
        </Typography>
      </Container>
    </Stack>
  );
};

export default LoginForm;
