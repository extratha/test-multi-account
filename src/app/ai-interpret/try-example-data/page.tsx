"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import ExampleDataList from "@/modules/ExampleDataList";

const TryExampleDataPage = () => {
  const { translation } = useTranslation();
  return (
    <>
      <Page title={translation("AiInterpret.pages.tryExampleData")}>
        <ExampleDataList />
      </Page>
    </>
  );
};
export default TryExampleDataPage;
