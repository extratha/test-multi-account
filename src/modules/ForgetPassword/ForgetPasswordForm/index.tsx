"use client";
import { SubmitButtonStyle } from "@/components/Button/styled";
import { API } from "@/constant/api";
import { webPaths } from "@/constant/webPaths";
import { CustomTextField } from "@/modules/LoginModule/styled";
import { usePageLoadingStore } from "@/store";
import axiosPublicInstance from "@/utils/axios/login";
import { validateEmail } from "@/utils/validation";
import { Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ForgetPasswordForm {
  email: string;
}
const EMAIL = "email";
const ForgetPasswordForm = () => {
  const t = useTranslations("Common");
  const theme = useTheme();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setPageLoading } = usePageLoadingStore();
  const [newPassword, setNewPassword] = useState<string>("");
  const [isDisableSubmit, setIsDisabledSubmit] = useState<boolean>(true);
  const { handleSubmit, control, getValues, setError } = useForm<ForgetPasswordForm>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ForgetPasswordForm> = async (data) => {
    setPageLoading(true);
    try {
      const response = await axiosPublicInstance.post(API.PATH.forgotPassword, {
        email: data.email,
      });
      if (response?.status === 204) {
        setShowSuccess(true);
      }
    } catch (error: any) {
      if (error.status === 404) {
        setShowSuccess(true);
        return;
      }
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.error);
      }
    } finally {
      setPageLoading(false);
    }
  };
  return (
    <Stack
      sx={{
        width: "66%",
        margin: "auto",
      }}
    >
      {!showSuccess ? (
        <Stack>
          <Typography variant="headlineLargeSemiBold" mb={2}>
            {t("title.resetPassword")}
          </Typography>
          <Typography variant="headlineSmall" color={theme.palette.grey[600]} mb={2}>
            {t("message.resetPassword")}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} autoFocus>
            <Controller
              name={EMAIL as keyof ForgetPasswordForm}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Stack direction="column" spacing={2} mt={1}>
                  <CustomTextField
                    {...field}
                    fullWidth
                    autoFocus
                    data-testid={EMAIL}
                    id={EMAIL}
                    placeholder={!getValues(EMAIL) ? t("placeholder.completeYourEmail") : ""}
                    name={EMAIL}
                    value={(newPassword as unknown) ?? ""}
                    onChange={(event) => {
                      const value = event?.target?.value;
                      setError(EMAIL, { type: "", message: "" });
                      field.onChange(event);
                      setNewPassword(value);
                      const errorKey = validateEmail(value);
                      if (errorKey) {
                        setError(EMAIL, { type: "validate", message: t(errorKey) });
                        setIsDisabledSubmit(true);
                      } else {
                        setIsDisabledSubmit(false);
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography
                    data-testid="error"
                    variant="bodyLarge"
                    mt={0}
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
              variant="bodyLarge"
              sx={{
                textAlign: "left",
                color: theme.palette.error.main,
              }}
            >
              {errorMessage || ""}
            </Typography>

            <SubmitButtonStyle data-testid={"button-submit"} type="submit" disabled={isDisableSubmit}>
              <Typography variant="labelExtraLargeSemiBold">{t("button.submitRequest")}</Typography>
            </SubmitButtonStyle>
          </form>
        </Stack>
      ) : (
        <Stack>
          <Typography variant="headlineLargeSemiBold" color={theme.palette.success.light} mb={2}>
            {t("status.resetPasswordSuccess")}
          </Typography>
          <Typography variant="titleLarge" color={theme.palette.grey[600]} mb={2}>
            {t("message.resetPasswordSuccess")}
          </Typography>
          <Typography variant="titleLargeSemiBold" color={theme.palette.grey[600]} mb={2}>
            {getValues(EMAIL)}
          </Typography>
          <SubmitButtonStyle
            data-testid={"button-go-login"}
            onClick={() => {
              setPageLoading(true);
              router.replace(webPaths.login);
            }}
          >
            <Typography variant="labelExtraLargeSemiBold">{t("text.login")}</Typography>
          </SubmitButtonStyle>
        </Stack>
      )}
    </Stack>
  );
};

export default ForgetPasswordForm;
