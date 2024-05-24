
import { Button, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axiosPublicInstance from "@/utils/axios/login";
import { CustomTextField } from "../styled";
import { Controller, DeepMap, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { API } from '@/constant/api';
import { setCookie } from 'cookies-next';
import { usePageLoadingStore, useUserProfileStore } from '@/store';
import { webPaths } from '@/constant/webPaths';
import useFieldValidation from '@/hooks/useFieldValidation';

type LoginForm = {
  email: string | null;
  password: string | null;
}

const validateEmail = (value: string) => {
  if (!value) return 'validation.require';
  if (!/^\S+@\S+\.\S+$/.test(value.trim())) return 'validation.invalidEmail';
  return null;
};

const validatePassword = (value: string) => {
  if (!value) return 'validation.require';
  if (value.length < 8) return 'validation.invalidPassword';
  return null;
};
const LoginForm = () => {
  const theme = useTheme()
  const { setUserProfile } = useUserProfileStore()
  const [isDisableSubmit, setIsDisabledSubmit] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState(false)
  const { setPageLoading } = usePageLoadingStore()
  const router = useRouter()
  const { control, setError, handleSubmit, formState: { touchedFields } } = useForm<LoginForm>()
  const t = useTranslations('Common')
  const [errorMessage, setErrorMessage] = useState('')

  const EMAIL_FIELD_NAME = 'email';
  const PASSWORD_FIELD_NAME = 'password';
  const {
    isValid: isEmailValid,
    value: emailValue,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    isDirty: isEmailDirty,
    ref: emailRef,
    errorMessage: emailErrorMessage,
  } = useFieldValidation(control, EMAIL_FIELD_NAME, validateEmail, setError);

  const {
    isValid: isPasswordValid,
    value: passwordValue,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    isDirty: isPasswordDirty,
    ref: passwordRef,
    errorMessage: passwordErrorMessage,
  } = useFieldValidation(control, PASSWORD_FIELD_NAME, validatePassword, setError);

  useEffect(() => {
    if(!isEmailDirty || !isPasswordDirty) return
    if (!(isEmailValid && isPasswordValid)) {
      setIsDisabledSubmit(true)
    } else {
      setIsDisabledSubmit(false)
    }
  }, [emailValue, passwordValue]);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setPageLoading(true);
    setErrorMessage('')
    try {
      const response = await axiosPublicInstance.post(API.PATH.login, { email: emailValue, password: passwordValue }, { headers: { Authorization: undefined } });
      if (response.data) {
        const { accessToken, refreshToken, user, userProfile } = response.data;
        if (accessToken) setCookie("accessToken", accessToken);
        if (refreshToken) setCookie('refreshToken', refreshToken);
        if (user) {
          setCookie('passwordChanged', user.passwordChanged);
          setUserProfile({ ...user, ...userProfile });
          router.push(user.passwordChanged ? webPaths.home : webPaths.setNewPassword);
        }
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || t('responseError.invalidEmailOrPassword'));
      setPageLoading(false)
    }
  }
  return (
    <Stack
      useFlexGap
      spacing={2}
      sx={{
        width: "66%",
        margin: 'auto'
      }}
    >
      <Stack>
        <Typography variant="headlineSmallSemiBold" color={theme.palette.grey[600]} mb={2}>{t('text.login')}</Typography>
        <Typography variant="headlineLargeSemiBold" mb={2}>Cariva Playground</Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name={EMAIL_FIELD_NAME}
            control={control}
            render={({ fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  fullWidth
                  id={EMAIL_FIELD_NAME}
                  placeholder={!emailValue ? "อีเมล" : ""}
                  name={EMAIL_FIELD_NAME}
                  value={emailValue ?? ''}
                  onChange={onEmailChange}
                  onBlur={onEmailBlur}
                  inputRef={emailRef}
                  InputLabelProps={{ shrink: true }}
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

          <Controller
            name={PASSWORD_FIELD_NAME}
            control={control}
            render={({ fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  fullWidth
                  name={PASSWORD_FIELD_NAME}
                  type={showPassword ? "text" : "password"}
                  id={PASSWORD_FIELD_NAME}
                  placeholder={!passwordValue ? "รหัสผ่าน" : ""}
                  value={passwordValue ?? ''}
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

          <Button
            type="submit"
            disabled={isDisableSubmit}
            style={{
              width: "100%",
              height: "52px",
              margin: "2em 0 0",
              backgroundColor: isDisableSubmit ? theme.palette.grey[400] : "#2196F3",
              color: theme.palette.background.paper,
            }}
          >
            <Typography variant="labelExtraLargeSemiBold" >
              {t('text.login')}
            </Typography>
          </Button>
        </form>
        <Typography
          variant='titleSmallSemiBold'
          textTransform={'none'}
          color={theme.palette.text.primary}
          sx={{
            textDecoration: 'underline',
            margin: '16px auto 0',
            cursor: 'pointer'
          }} >
          {t('button.forgetPassword')}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default LoginForm;