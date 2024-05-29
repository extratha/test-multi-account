import { Page } from "@/components/Page";
import TermsAndConsModules from "@/modules/TermsAndCons";
import { useTranslations } from "next-intl";

const TermsAndConsPage = () => {
  const t = useTranslations('pages.termAndCons')
  return (
    <Page title={t('pages.termsAndCons')} >
      <TermsAndConsModules/>
    </Page>
  )
}

export default TermsAndConsPage ;