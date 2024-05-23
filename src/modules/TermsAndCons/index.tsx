'use client'

import { Button, Checkbox, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TermsAndConsHeader, TermsAndConsContent, TermsAndConstMessage } from "./styled";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePageLoadingStore } from "@/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { webPaths } from "@/constant/webPaths";

interface TermsAndConsForm {
  agreement: boolean
}

const fieldname = {
  AGREEMENT: "agreement"
}

const TermsAndConsModules = () => {
  const theme = useTheme()
  const t = useTranslations('Common')
  const router = useRouter()
  const [agreement, setAgreement] = useState<unknown>(false)
  const { setPageLoading } = usePageLoadingStore()
  const { handleSubmit, control, getValues, setError } = useForm<TermsAndConsForm>();
  const termsAndConsRef = useRef<HTMLDivElement>(null);
  const [isDisableAgreement, setIsDisabledAgreement] = useState(true)

  const handleScroll = () => {
    if (termsAndConsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsAndConsRef.current;
      const isScrollEnd = Math.floor(scrollTop + clientHeight) === scrollHeight;
      if (isScrollEnd)
        setIsDisabledAgreement(!isScrollEnd);
    }
  };
  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onSubmit: SubmitHandler<TermsAndConsForm> = async (data) => {
    setPageLoading(true)
    try {
      router.push(webPaths.home)
      setPageLoading(false)
    }
    catch (error: any) {
      if (error.message) {
        console.log(error.message)
      }
    }
  }
  return (
    <Stack height='100vh' width="100%" overflow='hidden' >
      <TermsAndConsHeader flex={1}>
        <Typography variant="titleMediumSemiBold" textAlign={'center'}>
          {t('title.termsAndCons')}
        </Typography>
      </TermsAndConsHeader>
      <Stack direction='row' justifyContent={'center'}>
        <TermsAndConsContent flex={2}>
          <Typography variant='titleLargeSemiBold'>
            {t('pages.termsAndCons')}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <TermsAndConstMessage ref={termsAndConsRef} onScroll={handleScroll}>
            {t('text.termsAndConsContent')}
          </TermsAndConstMessage>
          <Stack flex={1} mt={1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack>
                <Controller
                  name={fieldname.AGREEMENT as keyof TermsAndConsForm}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Stack direction="row" justifyContent={'start'}>
                      <Checkbox
                        {...field}
                        id={fieldname.AGREEMENT}
                        name={fieldname.AGREEMENT}
                        onChange={(event) => { setAgreement(event?.target?.checked) }}
                        disabled={isDisableAgreement}
                      />
                      <Typography variant='bodyLargeSemiBold' margin="auto 0">
                        {t('field.agreement')}
                      </Typography>
                    </Stack>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!agreement}
                  style={{
                    width: "70%",
                    height: "52px",
                    margin: "2em auto 0",
                    backgroundColor: !agreement ? theme.palette.grey[200] : "#2196F3",
                    color: !agreement ? theme.palette.grey[500] : theme.palette.background.paper,
                  }}
                >
                  <Typography variant="labelExtraLargeSemiBold" >
                    {t('button.next')}
                  </Typography>
                </Button>
              </Stack>

            </form>
          </Stack>
        </TermsAndConsContent>
      </Stack>


    </Stack>
  )
}

export default TermsAndConsModules;