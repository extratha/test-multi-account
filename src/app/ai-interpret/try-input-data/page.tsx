"use client";
import { Suspense } from "react";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import InputDataModule from "@/modules/InputDataModule";

const TryInputDataPage = () => {
  const { translation } = useTranslation();
  return (
    <Suspense>
      <Page title={translation("AiInterpret.pages.tryInputData")}>{<InputDataModule />}</Page>
    </Suspense>
  );
};

export default TryInputDataPage;
