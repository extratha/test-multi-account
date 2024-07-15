'use client'

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import SettingPrivacyPolicy from "@/modules/SettingPrivacyPolicy";

const SettingPrivacyPolicyPage = () => {
  const { translation } = useTranslation()

  return (
    <Page title={translation("Common.settingPrivacyPolicy.title")}>
      <SettingPrivacyPolicy />
    </Page>
  );
};

export default SettingPrivacyPolicyPage;
