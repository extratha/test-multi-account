'use client'

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ImaagePlaygrondLogo, ImageCarivaLogo, ImageLandingBg } from "@/assets"
import { Button, IconButton, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { API } from "@/constant/api";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";
import axiosForLoginPage from "@/utils/axios/login";
import { CustomTextField } from "./styled";
import { useTranslations } from "next-intl";

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

const LoginModule = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [isDisableSubmit, setIsDisabledSubmit] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { control, setError, register, handleSubmit } = useForm<LoginForm>()
  const theme = useTheme()
  const t = useTranslations('Common')
  const redirectToCheckupReport = () => {
    router.replace('/checkup-report')
  }
  const EMAIL_FIELD_NAME = 'email'
  const PASSWORD_FIELD_NAME = 'password'
  useEffect(() => {
    if (!email || !password) {
      return setIsDisabledSubmit(true)
    }
    else
      if (
        !isValidField(
          EMAIL_FIELD_NAME,
          email,
          isValidEmail,
          setError,
          t('validation.invalidEmail')
        ) ||
        !isValidField(
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
      ) {
        return setIsDisabledSubmit(true)
      }
    setIsDisabledSubmit(false)
  }, [email, password])

  const isValidField = <T extends Record<string, any>>(
    fieldName: keyof T,
    value: unknown,
    isValidLogic: (value: any) => boolean,
    setError: (fieldName: keyof T, error: { type: string; message: string }) => void,
    errorMessage: string,
  ) => {
    if (isValidLogic(value)) {
      setError(fieldName, { type: '', message: '' });
      return true
    } else {
      console.log('set error ', fieldName, value, errorMessage)
      setError(fieldName, {
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
    setIsLoading(true)
    try {
      const response = await axiosForLoginPage.post(
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
        const { accessToken } = response.data
        if (accessToken) {
          setCookie("accessToken", accessToken)
        }
      }
    }
    catch (error: any) {
      if (error?.message) {
        console.log(error)
      }
      setIsLoading(false)
    }
  }
  return (
    <>
      <Stack direction='row' width={'100vw'} height={"100vh"}>
        <Stack position="relative" flex={1}>
          <Image style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100%' }} alt='' src={ImageLandingBg}>
          </Image>
          <Image style={{ margin: '40vh auto 0' }} alt='' src={ImaagePlaygrondLogo} />
          <Image style={{ margin: 'auto auto 3rem' }} alt='' src={ImageCarivaLogo} />

        </Stack>
        <Stack flex={1}>
          <Stack
            useFlexGap
            spacing={2}
            sx={{
              maxWidth: "70%",
              margin: 'auto'
            }}
          >
            <Stack>
              <Typography variant="headlineSmallSemiBold" color={theme.palette.grey[600]} mb={2}>เข้าสู่ระบบ</Typography>
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
                    เข้าสู่ระบบ
                  </Typography>
                </Button>
              </form>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
export default LoginModule