"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import TermsAndConsModules from "@/modules/TermsAndConditions";

const TermsAndConsPage = () => {
  const { translation } = useTranslation();

  return (
    <Page title={translation("Common.pages.termsAndConditions")}>
      <TermsAndConsModules />
    </Page>
  );
};

export default TermsAndConsPage;
