"use client";

import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SubmitButtonStyle } from "@/components/Button/styled";
import { API } from "@/constant/api";
import { webPaths } from "@/constant/webPaths";
import useTranslation from "@/locales/useLocale";
import { CustomTextField } from "@/modules/LoginModule/styled";
import { usePageLoadingStore } from "@/store";
import axiosPublicInstance from "@/utils/axios/login";
import { validateEmail } from "@/utils/validation";

interface ForgetPasswordForm {
  email: string;
}

const EMAIL = "email";

const ForgetPassword = () => {
  const { translation } = useTranslation();
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
          <Typography variant="headerBold" mb={2}>
            {translation("Common.title.resetPassword")}
          </Typography>
          <Typography variant="bodySmall" color="text.medium" mb={2}>
            {translation("Common.message.resetPassword")}
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
                    placeholder={!getValues(EMAIL) ? translation("Common.placeholder.completeYourEmail") : ""}
                    name={EMAIL}
                    value={(newPassword as unknown) ?? ""}
                    onChange={(event) => {
                      const value = event?.target?.value;
                      setError(EMAIL, { type: "", message: "" });
                      field.onChange(event);
                      setNewPassword(value);
                      const errorKey = validateEmail(value);
                      if (errorKey) {
                        setError(EMAIL, { type: "validate", message: translation(errorKey) });
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
                    variant="labelExtraSmallMedium"
                    mt={0}
                    color="error"
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {error?.message || ""}
                  </Typography>
                </Stack>
              )}
            />
            <Typography
              variant="labelExtraSmallMedium"
              color="error"
              sx={{
                textAlign: "left",
              }}
            >
              {errorMessage || ""}
            </Typography>
            <SubmitButtonStyle data-testid="button-submit" type="submit" disabled={isDisableSubmit}>
              {translation("Common.button.submitRequest")}
            </SubmitButtonStyle>
          </form>
        </Stack>
      ) : (
        <Stack>
          <Typography variant="headerBold" color="text.success" marginBottom="8px">
            {translation("Common.status.resetPasswordSuccess")}
          </Typography>
          <Typography>{translation("Common.message.resetPasswordSuccess")}</Typography>
          <Typography variant="bodyBold">{getValues(EMAIL)}</Typography>
          <SubmitButtonStyle
            data-testid="button-go-login"
            onClick={() => {
              setPageLoading(true);
              router.replace(webPaths.login);
            }}
          >
            {translation("Common.text.login")}
          </SubmitButtonStyle>
        </Stack>
      )}
    </Stack>
  );
};

export default ForgetPassword;
