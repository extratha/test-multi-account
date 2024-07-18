"use client";
// TODO: refactor
import { Suspense } from "react";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import AiInterpretResult from "@/modules/AiInterpretResult";

const AiInterpretResultPage = () => {
  const { translation } = useTranslation();
  return (
    <Suspense>
      <Page title={translation("AiInterpret.pages.aiInterpretResult")}>
        <AiInterpretResult />
      </Page>
    </Suspense>
  );
};

export default AiInterpretResultPage;
