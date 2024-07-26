"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { submitChangePassword } from "@/api/api";
import { getValidateResetPasswordToken, submitSetNewPassword } from "@/api/apiUnauthorize";
import { IconExclamation } from "@/assets";
import { SubmitButtonStyle } from "@/components/Button/styled";
import Dialog from "@/components/Dialog";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { CustomTextField } from "@/modules/LoginModule/styled";
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

const DialogExpired = styled(Dialog)({
  "& .content-dialog": {
    width: "400px",
  },
});

const SetNewPasswordModule = () => {
  const { translation } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { setToastOpen } = useToastStore();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const { handleSubmit, control, getValues, setError } = useForm<SetNewPasswordForm>();

  const fetchValidateToken = async () => {
    try {
      if (token) {
        setIsLoading(true);
        const response = await getValidateResetPasswordToken(token);
        setIsLoading(false);
        if (response.data.valid === false) {
          setIsExpired(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsExpired(true);
    }
  };

  const onSubmit: SubmitHandler<SetNewPasswordForm> = async () => {
    try {
      setIsLoading(true);

      if (token) {
        await submitSetNewPassword({
          passwordResetToken: token,
          password: newPassword,
          confirmPassword: confirmNewPassword,
        });
      } else {
        await submitChangePassword({ newPassword });
      }

      setToastOpen(true, {
        message: translation("setNewPassword.toast.resetPasswordSuccess"),
        severity: "success",
        icon: <div />,
      });

      router.replace(NAVIGATION.LOGIN);
    } catch (error: any) {
      if (error.message) {
        setIsExpired(true);
      } else {
        setErrorMessage(error.error);
      }
      setIsLoading(false);
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

  useEffect(() => {
    fetchValidateToken();
  }, []);

  return (
    <>
      {isLoading && <FullScreenLoading />}
      <SetNewPasswordWrapper>
        <Stack>
          <Typography variant="headerBold" mb={2}>
            {translation("setNewPassword.pages")}
          </Typography>
          <Typography variant="bodySmall" color="text.medium" mb={2}>
            {translation("setNewPassword.text.inputSetNewPassword")}
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
                    placeholder={!newPassword ? translation("setNewPassword.placeholder.newPassword") : ""}
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
                  <Typography
                    data-testid="error"
                    variant="labelExtraSmallMedium"
                    marginTop="0px"
                    textAlign="left"
                    color="error"
                  >
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
                    placeholder={!confirmNewPassword ? translation("setNewPassword.placeholder.newPasswordAgain") : ""}
                    value={confirmNewPassword}
                    onChange={(event) => {
                      const value = event?.target?.value;
                      field.onChange(event);
                      validateConfirmNewPasswordField(value, fieldName.CONFIRM_NEW_PASSWORD);
                      setConfirmNewPassword(value);
                    }}
                    InputProps={{
                      endAdornment: (
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
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
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
              <Typography variant="labelExtraSmallBold">{translation("setNewPassword.validate.title")}</Typography>
              <Typography variant="labelExtraSmall" whiteSpace={"break-spaces"}>
                {translation("setNewPassword.validate.message")}
              </Typography>
            </Stack>
            <SubmitButtonStyle data-testid="button-set-new-password" type="submit" disabled={isDisableSubmit}>
              {translation("setNewPassword.button.setNewPassword")}
            </SubmitButtonStyle>
          </form>
        </Stack>
      </SetNewPasswordWrapper>
      <DialogExpired
        open={isExpired}
        name="expired"
        logo={<IconExclamation />}
        title={translation("setNewPassword.dialog.title")}
        description={translation("setNewPassword.dialog.message")}
        confirm={translation("setNewPassword.dialog.button")}
        onConfirm={() => router.replace(NAVIGATION.LOGIN)}
      />
    </>
  );
};

export default SetNewPasswordModule;
