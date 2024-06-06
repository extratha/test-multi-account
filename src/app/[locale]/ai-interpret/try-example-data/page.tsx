import { Page } from "@/components/Page"
import ExampleDataList from "@/modules/ExampleDataList";
import { useTranslations } from "next-intl"

const TryExampleDataPage = () => {
  const tAi = useTranslations('AiInterpret');
  return (
    <>
      <Page title={tAi('pages.tryExampleData')}>
        <ExampleDataList></ExampleDataList>
      </Page>
    </>
  )
}
export default TryExampleDataPage;