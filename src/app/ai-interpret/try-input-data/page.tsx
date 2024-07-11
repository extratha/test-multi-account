"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import InputDataModule from "@/modules/InputDataModule";

const TryInputDataPage = () => {
  const { translation } = useTranslation();
  return (
    <>
      <Page title={translation("AiInterpret.pages.tryInputData")}>
        <InputDataModule />
      </Page>
    </>
  );
};
export default TryInputDataPage;
