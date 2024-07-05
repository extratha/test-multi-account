import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";
import SettingTermsAndConditions from "@/modules/SettingTermsAndConditions";

const SettingTermsAndConditionsPage = () => {
  const t = useTranslations("Common");

  return (
    <Page title={t("settingTermsAndConditions.title")}>
      <SettingTermsAndConditions />
    </Page>
  );
};

export default SettingTermsAndConditionsPage;
