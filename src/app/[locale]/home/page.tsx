import { Page } from "@/components/Page"
import HomePageModule from "@/modules/HomePageModule"
import { useTranslations } from "next-intl"

const HomePage = () => {
  const t = useTranslations('Common')
  return (
    <Page title={t('pages.home')}>
      <HomePageModule></HomePageModule>
    </Page>
  )
}

export default HomePage