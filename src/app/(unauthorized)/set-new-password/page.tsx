"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import SetNewPasswordModule from "@/modules/SetNewPasswordModule";

const SetNewPasswordPage = () => {
  const { translation } = useTranslation();
  return (
    <Page title={translation("Common.pages.setNewPassword")}>
      <SetNewPasswordModule />
    </Page>
  );
};

export default SetNewPasswordPage;
