"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import SettingTermsAndConditions from "@/modules/SettingTermsAndConditions";

const SettingTermsAndConditionsPage = () => {
  const { translation } = useTranslation();

  return (
    <Page title={translation("Common.settingTermsAndConditions.title")}>
      <SettingTermsAndConditions />
    </Page>
  );
};

export default SettingTermsAndConditionsPage;
