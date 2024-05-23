import { Page } from "@/components/page"
import { useTranslations } from "next-intl"

const ForgetPasswordPage = () => {
  const t = useTranslations('Common')
  return (
    <Page title={t('pages.forgetPassword')}>
      {t('pages.forgetPassword')}
    </Page>
  )
}

export default ForgetPasswordPage 