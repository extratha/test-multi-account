"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { submitChangePassword } from "@/api/api";
import { submitSetNewPassword } from "@/api/apiUnauthorize";
import { SubmitButtonStyle } from "@/components/Button/styled";
import { NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { CustomTextField } from "@/modules/LoginModule/styled";
import { usePageLoadingStore } from "@/store";
import useToastStore from "@/store/useToastStore";

interface SetNewPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}
const fieldName: Record<string, keyof SetNewPasswordForm> = {
  NEW_PASSWORD: "newPassword",
  CONFIRM_NEW_PASSWORD: "confirmNewPassword",
};

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/;

const SetNewPasswordWrapper = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.medium,
  width: "66%",
  margin: "auto",
}));

const SetNewPasswordModule = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setToastOpen } = useToastStore();
  const { setPageLoading } = usePageLoadingStore();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);

  const { handleSubmit, control, getValues, setError } = useForm<SetNewPasswordForm>();

  const onSubmit: SubmitHandler<SetNewPasswordForm> = async () => {
    try {
      setPageLoading(true);
      const passwordResetToken = searchParams.get("token");

      if (passwordResetToken) {
        await submitSetNewPassword({
          passwordResetToken,
          password: newPassword,
          confirmPassword: confirmNewPassword,
        });
      } else {
        await submitChangePassword({ newPassword });
      }

      setToastOpen(true, {
        message: translation("Common.toast.resetPasswordSuccess"),
        severity: "success",
        icon: <div />,
      });

      router.replace(NAVIGATION.LOGIN);
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.error);
      }
      setPageLoading(false);
    }
  };

  const isValidPassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return false;
    }
    return true;
  };

  const validateConfirmNewPasswordField = (value: unknown, fieldNameProp: keyof SetNewPasswordForm) => {
    const siblingFieldName =
      fieldNameProp === fieldName.NEW_PASSWORD ? fieldName.CONFIRM_NEW_PASSWORD : fieldName.NEW_PASSWORD;
    const siblingValue = getValues(siblingFieldName);
    setError(fieldNameProp, { type: "", message: "" });
    setIsDisableSubmit(true);
    if (!value) {
      setError(fieldNameProp, { type: "validate", message: translation("Common.validation.require") });
      return true;
    }
    if (typeof value === "string" && !isValidPassword(value)) {
      setError(fieldNameProp, { type: "validate", message: translation("Common.validation.invalidPasswordFormat") });
      return true;
    }
    const isPasswordMatched = value === siblingValue;
    if (value && siblingValue && !isPasswordMatched) {
      setError(fieldNameProp, { type: "validate", message: translation("Common.validation.passwordIsNotMatch") });
      setError(siblingFieldName, { type: "validate", message: translation("Common.validation.passwordIsNotMatch") });
      return true;
    } else {
      setError(siblingFieldName, { type: "", message: "" });
    }
    if (value && siblingValue) {
      setIsDisableSubmit(false);
    }
    return false;
  };

  return (
    <SetNewPasswordWrapper>
      <Stack>
        <Typography variant="headerBold" mb={2}>
          {translation("Common.pages.setNewPassword")}
        </Typography>
        <Typography variant="bodySmall" color="text.medium" mb={2}>
          {translation("Common.text.setNewPassword")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoFocus>
          <Controller
            name={fieldName.NEW_PASSWORD}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  {...field}
                  fullWidth
                  autoFocus
                  id={fieldName.NEW_PASSWORD}
                  data-testid={fieldName.NEW_PASSWORD}
                  type={showPassword ? "text" : "password"}
                  placeholder={!newPassword ? "ตั้งค่ารหัสผ่าน" : ""}
                  name={fieldName.NEW_PASSWORD}
                  value={(newPassword as unknown) ?? ""}
                  onChange={(event) => {
                    const value = event?.target?.value;
                    field.onChange(event);
                    setNewPassword(value);
                    validateConfirmNewPasswordField(value, fieldName.NEW_PASSWORD);
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="Toggle show password"
                        data-testid="button-toggle-show-new-password"
                        onClick={() => setShowPassword((prev) => !prev)}
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
                  sx={{
                    marginTop: "2em",
                  }}
                />
                <Typography data-testid="error" variant="labelExtraSmallMedium" mt={0} textAlign="left" color="error">
                  {error?.message || ""}
                </Typography>
              </Stack>
            )}
          />

          <Controller
            name={fieldName.CONFIRM_NEW_PASSWORD}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  {...field}
                  fullWidth
                  autoFocus
                  name={fieldName.CONFIRM_NEW_PASSWORD}
                  type={showConfirmPassword ? "text" : "password"}
                  id={fieldName.CONFIRM_NEW_PASSWORD}
                  data-testid={fieldName.CONFIRM_NEW_PASSWORD}
                  placeholder={!confirmNewPassword ? "ตั้งรหัสผ่านใหม่อีกครั้ง" : ""}
                  value={confirmNewPassword}
                  onChange={(event) => {
                    const value = event?.target?.value;
                    field.onChange(event);
                    validateConfirmNewPasswordField(value, fieldName.CONFIRM_NEW_PASSWORD);
                    setConfirmNewPassword(value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <a>
                        <IconButton
                          data-testid="button-toggle-show-confirm-password"
                          aria-label="Toggle show password"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                          {showConfirmPassword ? (
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
                  sx={{ marginTop: "2em" }}
                />
                <Typography data-testid="error" variant="labelExtraSmallMedium" textAlign="left" color="error">
                  {error?.message || ""}
                </Typography>
              </Stack>
            )}
          />

          <Typography variant="labelExtraSmallMedium" textAlign="left" color="error">
            {errorMessage || ""}
          </Typography>
          <Stack mt={1}>
            <Typography variant="labelExtraSmallBold">
              {translation("Common.text.setNewPasswordValidateTitle")}
            </Typography>
            <Typography variant="labelExtraSmall" whiteSpace={"break-spaces"}>
              {translation("Common.text.setNewPasswordValidateMessage")}
            </Typography>
          </Stack>
          <SubmitButtonStyle data-testid="button-set-new-password" type="submit" disabled={isDisableSubmit}>
            {translation("Common.button.setNewPassword")}
          </SubmitButtonStyle>
        </form>
      </Stack>
    </SetNewPasswordWrapper>
  );
};

export default SetNewPasswordModule;
