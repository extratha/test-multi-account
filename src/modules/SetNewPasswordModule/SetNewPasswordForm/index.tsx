import { SubmitButtonStyle } from "@/components/Button/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { API } from "@/constant/api";
import { webPaths } from "@/constant/webPaths";
import { CustomTextField } from "@/modules/LoginModule/styled";
import { usePageLoadingStore, useUserProfileStore } from "@/store";
import useToastStore from "@/store/useToastStore";
import axiosInstance, { AxiosInstance } from "@/utils/axios";
import axiosPublicInstance from "@/utils/axios/login";
import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface SetNewPasswordForm {
  newPassword: string,
  confirmNewPassword: string,
}
const fieldname: Record<string, keyof SetNewPasswordForm> = {
  NEW_PASSWORD: "newPassword",
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword'
}

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/;

const SetNewPasswordForm = () => {
  const t = useTranslations('Common');
  const theme = useTheme();
  const router = useRouter();
  const { data } = useUserProfileStore()
  const { setToastOpen } = useToastStore()
  // const { passwordChanged } = data
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowComfirmPassword] = useState<boolean>(false)
  const { setPageLoading } = usePageLoadingStore()
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [isDisableSubmit, setIsDisabledSubmit] = useState<boolean>(true)
  const { handleSubmit, control, getValues, setError } = useForm<SetNewPasswordForm>();
  const resetPasswordToken = getCookie('resetPasswordToken')
  const fetcher: AxiosInstance = resetPasswordToken ? axiosPublicInstance : axiosInstance
  const apiUrl: string = resetPasswordToken ? API.PATH.setNewPassword : API.PATH.changePassword
  let submitParams = {}
  if (resetPasswordToken) {
    submitParams = {
      passwordResetToken: resetPasswordToken,
      password: newPassword,
      confirmPassword: confirmNewPassword
    }
  } else {
    submitParams = {
      newPassword: newPassword
    }
  }
  const onSubmit: SubmitHandler<SetNewPasswordForm> = async (data) => {
    setPageLoading(true)
    try {
      const response = await fetcher.post(
        apiUrl,
        submitParams,
      )
      if (response.data) {
        const { data } = response.data
        console.log(data)
      }
      if (response?.status === 204) {
        setCookie('passwordChanged', true) // necessary
        if (resetPasswordToken) {
          router.push(webPaths.home)
          deleteCookie('resetPasswordToken')
          setToastOpen(true, {
            message: t('toast.resetPasswordSuccess'),
            severity: "success",
            icon: <div />
          });
        } else {
          router.push(webPaths.termsAndCons)
        }
      }
    }
    catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(error.error)
      }
      setPageLoading(false)
    }
  }
  const isValidPassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return false;
    }
    return true;
  };
  const validateConfirmNewPasswordField = (value: unknown, _fieldname: keyof SetNewPasswordForm) => {
    const siblingFieldname = _fieldname === fieldname.NEW_PASSWORD ?
      fieldname.CONFIRM_NEW_PASSWORD : fieldname.NEW_PASSWORD
    const siblingValue = getValues(siblingFieldname);
    setError(_fieldname, { type: '', message: '' })
    setIsDisabledSubmit(true)
    if (!value) {
      setError(_fieldname, { type: 'validate', message: t('validation.require') });
      return true
    }
    if (typeof value === 'string' && !isValidPassword(value)) {
      setError(_fieldname, { type: 'validate', message: t('validation.invalidPasswordFormat') })
      return true
    }
    const isPasswordMatched = value === siblingValue
    if (value && siblingValue && !isPasswordMatched) {
      setError(_fieldname, { type: 'validate', message: t('validation.passwordIsNotMatch') });
      setError(siblingFieldname, { type: 'validate', message: t('validation.passwordIsNotMatch') });
      return true;
    } else {
      setError(siblingFieldname, { type: '', message: '' });
    }
    if (value && siblingValue) {
      setIsDisabledSubmit(false)
    }
    return false;
  }
  return (
    <Stack
      sx={{
        width: "66%",
        margin: 'auto'
      }}
    >
      <Stack>
        <Typography variant="headlineLargeSemiBold" mb={2}>{t('pages.setNewPassword')}</Typography>
        <Typography variant="headlineSmall" color={theme.palette.grey[600]} mb={2}>{t('text.setNewPassword')}</Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoFocus
        >
          <Controller
            name={fieldname.NEW_PASSWORD as keyof SetNewPasswordForm}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  {...field}
                  fullWidth
                  autoFocus
                  id={fieldname.NEW_PASSWORD}
                  type={showPassword ? "text" : "password"}
                  placeholder={!newPassword ? "ตั้งค่ารหัสผ่าน" : ""}
                  name={fieldname.NEW_PASSWORD}
                  value={(newPassword as unknown) ?? ''}
                  onChange={(event) => {
                    const value = event?.target?.value
                    field.onChange(event)
                    setNewPassword(value)
                    validateConfirmNewPasswordField(value, fieldname.NEW_PASSWORD)
                  }}
                  InputProps={{
                    endAdornment: (
                      <a>
                        <IconButton
                          aria-label="Toggle show password"
                          onClick={() => setShowPassword((prev) => !prev)}
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
                    shrink: true
                  }}
                  sx={{
                    marginTop: "2em",
                  }}
                />
                <Typography
                  data-testid="error"
                  variant="bodyLarge"
                  mt={0}
                  sx={{
                    textAlign: 'left',
                    color: theme.palette.error.main,
                  }}
                >
                  {error?.message || ''}
                </Typography>
              </Stack>
            )}
          />

          <Controller
            name={fieldname.CONFIRM_NEW_PASSWORD as keyof SetNewPasswordForm}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  {...field}
                  fullWidth
                  autoFocus
                  name={fieldname.CONFIRM_NEW_PASSWORD}
                  type={showConfirmPassword ? "text" : "password"}
                  id={fieldname.CONFIRM_NEW_PASSWORD}
                  placeholder={!confirmNewPassword ? "ตั้งรหัสผ่านใหม่อีกครั้ง" : ""}
                  value={(confirmNewPassword as unknown) ?? ''}
                  onChange={(event) => {
                    const value = event?.target?.value
                    field.onChange(event)
                    validateConfirmNewPasswordField(value, fieldname.CONFIRM_NEW_PASSWORD)
                    setConfirmNewPassword(value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <a>
                        <IconButton
                          aria-label="Toggle show password"
                          onClick={() => setShowComfirmPassword((prev) => !prev)}
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
                    shrink: true
                  }}
                  sx={{
                    marginTop: "2em",
                  }}
                />
                <Typography
                  data-testid="error"
                  variant="bodyLarge"
                  sx={{
                    textAlign: 'left',
                    color: theme.palette.error.main,
                  }}
                >
                  {error?.message || ''}
                </Typography>
              </Stack>
            )}
          />

          <Typography
            variant="bodyLarge"
            sx={{
              textAlign: 'left',
              color: theme.palette.error.main,
            }}
          >
            {errorMessage || ''}
          </Typography>

          <Stack color={theme.palette.grey[300]} mt={1}>
            <Typography variant='bodyLargeSemiBold'>
              {t('text.setNewPasswordValidateTitle')}
            </Typography>

            <Typography variant="bodyLarge" whiteSpace={'break-spaces'}>
              {t('text.setNewPasswordValidateMessage')}
            </Typography>
          </Stack>
          <SubmitButtonStyle
            type="submit"
            disabled={isDisableSubmit}
          >
            <Typography variant="labelExtraLargeSemiBold" >
              {t('button.setNewPassword')}
            </Typography>
          </SubmitButtonStyle>
        </form>
      </Stack>
    </Stack>
  )
}

export default SetNewPasswordForm;