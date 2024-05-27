import { Page } from "@/components/Page"
import ForgetPasswordModule from "@/modules/Forgetpassword"
import { useTranslations } from "next-intl"

const ForgetPasswordPage = () => {
  const t = useTranslations('Common')
  return (
    <Page title={t('pages.forgetPassword')}>
      <ForgetPasswordModule></ForgetPasswordModule>
    </Page>
  )
}

export default ForgetPasswordPage 