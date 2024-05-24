
import { Button, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ImagePlaygrondLogo, ImageCarivaLogo, ImageCoverBg } from "@/assets"

import axiosPublicInstance from "@/utils/axios/login";
import { CustomTextField } from "../styled";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { API } from '@/constant/api';
import { setCookie } from 'cookies-next';
import { usePageLoadingStore, useUserProfileStore } from '@/store';
import { webPaths } from '@/constant/webPaths';

type LoginForm = {
  email: string | null;
  password: string | null;
}

const isValidEmail = (value: string) => {
  if (!value) return false
  const isValidEmailFormat = value && /^\S+@\S+\.\S+$/.test(value.trim());
  if (!isValidEmailFormat) {
    return false;
  }
  return true

}
const LoginForm = () => {

  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const theme = useTheme()
  const { setUserProfile } = useUserProfileStore()
  const [isDisableSubmit, setIsDisabledSubmit] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setPageLoading } = usePageLoadingStore()
  const router = useRouter()
  const { control, setError, handleSubmit } = useForm<LoginForm>()
  const t = useTranslations('Common')
  const [errorMessage, setErrorMessage] = useState('')

  const EMAIL_FIELD_NAME = 'email'
  const PASSWORD_FIELD_NAME = 'password'

  useEffect(() => {
    console.log(email, password)
    if (!email || !password) {
      if(!email) {
        setError(EMAIL_FIELD_NAME, {type:'validate', message: t('validation.require')})
      }else {
        setError(EMAIL_FIELD_NAME, {type:'', message: ''})
      }
      if(!password) {
        setError(PASSWORD_FIELD_NAME, {type:'validate', message: t('validation.require')})
      }else {
        setError(PASSWORD_FIELD_NAME, {type:'', message: ''})
      }
      return setIsDisabledSubmit(true)
    }
    setErrorMessage('')
    const isMailValid = isValidField(
      EMAIL_FIELD_NAME,
      email,
      isValidEmail,
      setError,
      t('validation.invalidEmail')
    )
    const isPassValid = isValidField(
      PASSWORD_FIELD_NAME,
      password,
      (value: string) => {
        if (!value) return false
        if (value.length < 8) return false
        return true
      },
      setError,
      t('validation.invalidPassword')
    )
    if (
      !isMailValid || !isPassValid
    ) {
      return setIsDisabledSubmit(true)
    }
    setIsDisabledSubmit(false)
  }, [email, password])

  const isValidField = <T extends Record<string, any>>(
    fieldname: keyof T,
    value: unknown,
    isValidLogic: (value: any) => boolean,
    setError: (fieldname: keyof T, error: { type: string; message: string }) => void,
    errorMessage: string,
  ) => {
    if (isValidLogic(value)) {
      setError(fieldname, { type: '', message: '' });
      return true
    } else {
      setError(fieldname, {
        type: 'validate',
        message: errorMessage || '',
      });
      return false
    }
  }
  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setPageLoading(true)
    try {
      const response = await axiosPublicInstance.post(
        API.PATH.login,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: undefined
          }
        }
      )
      if (response.data) {
        const { accessToken, refreshToken, user, userProfile } = response.data
        if (accessToken) {
          setCookie("accessToken", accessToken)
        }
        if (refreshToken) {
          setCookie('refreshToken', refreshToken)
        }
        let userValues
        if (user) {
          userValues = user
          setCookie('passwordChanged', user.passwordChanged)
        }
        if (userProfile) {
          userValues = { ...userValues, ...userProfile }
        }
        if (userValues) {
          setUserProfile(userValues)
        }
        if (user.passwordChanged) {
          router.push(webPaths.home)
        } else {
          router.replace(webPaths.setNewPassword)
        }
        setPageLoading(false)
      }
    }
    catch (error: any) {
      if (error?.status) {
        const errorCode: number = error.status
        let message = ''
        switch (errorCode) {
          case 400: {
            message = t('responseError.invalidEmailOrPassword')
          }
          default: break;
        }
        setErrorMessage(message)
      }
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
          autoFocus
        >
          <Controller
            name={EMAIL_FIELD_NAME}
            control={control}
            render={({ fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  fullWidth
                  autoFocus
                  id={EMAIL_FIELD_NAME}
                  placeholder={!email ? "อีเมล" : ""}
                  name={EMAIL_FIELD_NAME}
                  value={(email as unknown) ?? ''}
                  onChange={(event) => setEmail(event?.target?.value)}
                  InputLabelProps={{
                    shrink: true
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

          <Controller
            name={PASSWORD_FIELD_NAME}
            control={control}
            render={({ fieldState: { error } }) => (
              <Stack direction="column" spacing={2} mt={1}>
                <CustomTextField
                  fullWidth
                  autoFocus
                  name={PASSWORD_FIELD_NAME}
                  type={showPassword ? "text" : "password"}
                  id={PASSWORD_FIELD_NAME}
                  placeholder={!password ? "รหัสผ่าน" : ""}
                  value={(password as unknown) ?? ''}
                  onChange={(event) => setPassword(event?.target?.value)}
                  inputProps={{
                    autoComplete: "password",
                    autoFocus: true,
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