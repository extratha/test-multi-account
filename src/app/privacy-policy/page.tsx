"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import PrivacyPolicyModule from "@/modules/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  const { translation } = useTranslation();
  return (
    <Page title={translation("Common.pages.privacyPolicy")}>
      <PrivacyPolicyModule />
    </Page>
  );
};

export default PrivacyPolicyPage;
