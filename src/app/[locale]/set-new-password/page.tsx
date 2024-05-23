import { Page } from "@/components/page";
import SetNewPasswordModule from "@/modules/SetNewPasswordModule";
import { useTranslations } from "next-intl";

const SetNewPasswordPage = () => {
  const t = useTranslations("Common")
  return (
    <Page title={t('pages.setNewPassword')}>
      <SetNewPasswordModule/>
    </Page>
  )
}

export default SetNewPasswordPage;