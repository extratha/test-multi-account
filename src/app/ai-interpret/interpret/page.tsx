"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import AiInterpretResult from "@/modules/AiInterpretResult";

const AiInterpretResultPage = () => {
  const { translation } = useTranslation();
  return (
    <Page title={translation("AiInterpret.pages.aiInterpretResult")}>
      <AiInterpretResult />
    </Page>
  );
};

export default AiInterpretResultPage;
